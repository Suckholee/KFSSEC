import { createHash } from 'node:crypto';
import { collections, inlineCollectionFiles } from './managed-content-config.js';
const digest = value => createHash('sha256').update(value).digest('hex').slice(0, 12);
export default function managedContentPlugin({ types: t }) {
  return { name: 'kfssec-managed-resources', visitor: {
    Program: { enter(path, state) {
      state.resourceFile = state.filename?.split('/src/components/')[1]?.replace(/\.jsx$/, '');
      state.config = collections[state.resourceFile] || {};
      state.resourceChanged = false; state.hoisted = new Map();
    }, exit(path, state) {
      if (state.resourceChanged) path.unshiftContainer('body', t.importDeclaration([
        t.importSpecifier(t.identifier('__useContentResource'), t.identifier('useContentResource')),
        t.importSpecifier(t.identifier('__ManagedListView'), t.identifier('ManagedListView')),
      ], t.stringLiteral('/src/content/useContentResource.jsx')));
    } },
    VariableDeclarator(path, state) {
      if (!t.isIdentifier(path.node.id) || !state.config[path.node.id.name] || !path.getFunctionParent()) return;
      const config = state.config[path.node.id.name];
      const defaults = config[2] ? t.identifier(config[2]) : path.node.init;
      // These defaults are expressions, including factory calls.
      const defaultExpression = config[2] ? t.cloneNode(path.node.init) : defaults;
      let fallback = defaultExpression;
      if (config[2] && /^[A-Z_a-z][\w]*$/.test(config[2])) fallback = t.identifier(config[2]);
      else if (config[2]?.endsWith('()')) fallback = t.callExpression(t.identifier(config[2].slice(0, -2)), []);
      path.node.init = t.callExpression(t.identifier('__useContentResource'), [t.stringLiteral(config[0]), fallback, t.objectExpression([
        t.objectProperty(t.identifier('label'), t.stringLiteral(config[1])),
        ...(config[3] ? [t.objectProperty(t.identifier('sectorId'), t.stringLiteral(config[3]))] : []),
      ])]);
      state.resourceChanged = true;
    },
    CallExpression: { exit(path, state) {
      if (!state.resourceFile || !t.isMemberExpression(path.node.callee) || path.node.callee.property.name !== 'map' || path.node.arguments.length !== 1 || !t.isArrowFunctionExpression(path.node.arguments[0])) return;
      if (!path.findParent(p => p.isJSXExpressionContainer())) return;
      if (path.findParent(p => p.isJSXElement() && p.node.openingElement.attributes.some(a => t.isJSXAttribute(a) && a.name.name === 'data-content-editor-ui'))) return;
      const object = path.node.callee.object;
      let resourcePath, resourcePathExpression;
      const code = state.file.code.slice(object.start, object.end);
      const root = code.match(/^([A-Za-z_$][\w$]*)/)?.[1];
      const aliases = { banners: 'resourceBanners', consultingFaculty: 'facultyMembers', filteredReferences: 'references', displayedFields: 'businessFields', marqueeList: 'articles' };
      const config = state.config[aliases[root] || root];
      if (config) resourcePath = config[0];
      const postViews = { 'Gallery/GalleryPage': { filteredItems: 'posts:gallery:all' }, 'Gallery/NetflixCategoryRow': { items: 'posts:gallery:all' }, 'NoticePostSection': { marqueeList: 'posts:all:all' }, 'Partners/PartnersPage': { mouPhotos: 'posts:gallery:partners' } };
      if (postViews[state.resourceFile]?.[root]) resourcePath = postViews[state.resourceFile][root];
      if (state.resourceFile === 'Community/CommunityPage' && root === 'filteredPosts') {
        resourcePath = 'posts';
        resourcePathExpression = t.binaryExpression('+', t.binaryExpression('+', t.stringLiteral('posts:'), t.identifier('activeTab')), t.stringLiteral(':all'));
      }
      let items = object;
      if (!resourcePath && t.isArrayExpression(object) && inlineCollectionFiles.has(state.resourceFile)) {
        const elements = object.elements;
        const scalarList = elements.every(el => t.isStringLiteral(el));
        const cards = elements.every(el => t.isObjectExpression(el) && el.properties.some(prop => t.isObjectProperty(prop) && /^(title|desc|question|name)$/.test(prop.key.name)));
        if (!scalarList && !cards) return;
        const component = path.findParent(p => p.isFunctionDeclaration() && /^[A-Z]/.test(p.node.id?.name || ''));
        if (!component) return;
        const hash = digest(state.resourceFile + '|' + code);
        const variable = '__resource_' + hash;
        resourcePath = 'managedLists.inline_' + hash;
        const label = state.resourceFile.startsWith('Consulting/') ? (scalarList ? '창업 준비 점검 항목' : '컨설팅 단계·프로그램 목록') : '안내·발급 자료 목록';
        const declaration = t.variableDeclaration('const', [t.variableDeclarator(t.identifier(variable), t.callExpression(t.identifier('__useContentResource'), [t.stringLiteral(resourcePath), object, t.objectExpression([t.objectProperty(t.identifier('label'), t.stringLiteral(label))])]))]);
        const added = state.hoisted.get(component.node) || [];
        if (!added.some(entry => entry.variable === variable)) added.push({ variable, declaration });
        state.hoisted.set(component.node, added);
        items = t.identifier(variable);
      }
      if (!resourcePath) return;
      state.resourceChanged = true;
      const callback = path.node.arguments[0];
      path.replaceWith(t.jsxElement(t.jsxOpeningElement(t.jsxIdentifier('__ManagedListView'), [
        t.jsxAttribute(t.jsxIdentifier('resourcePath'), resourcePathExpression ? t.jsxExpressionContainer(resourcePathExpression) : t.stringLiteral(resourcePath)),
        t.jsxAttribute(t.jsxIdentifier('items'), t.jsxExpressionContainer(items)),
        t.jsxAttribute(t.jsxIdentifier('render'), t.jsxExpressionContainer(callback)),
      ], true), null, [], true));
      path.skip();
    } },
    FunctionDeclaration: { exit(path, state) {
      const entries = state.hoisted.get(path.node);
      if (!entries?.length) return;
      const statements = path.node.body.body;
      const firstReturn = statements.findIndex(statement => t.isReturnStatement(statement) || t.isIfStatement(statement) && (t.isReturnStatement(statement.consequent) || statement.consequent?.body?.some(t.isReturnStatement)));
      statements.splice(firstReturn < 0 ? statements.length : firstReturn, 0, ...entries.map(entry => entry.declaration));
    } },
  } };
}
