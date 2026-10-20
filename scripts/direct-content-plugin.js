import { createHash } from 'node:crypto';

// Instrument public JSX at build time so new sections receive the same editor.
// Admin tools, account forms and live chat are intentionally outside this pipeline.
export const excludedComponents = /\/(?:Admin\/|AuthModal|LoginMethods|MemberRegistration|CommunityEditorPage|GalleryEditorModal|VisitorChatbotWidget|AiAssistant\/)/;
export function isPublicContentFile(filename = '') {
  return /\/src\/components\/.*\.jsx$/.test(filename) && !excludedComponents.test(filename);
}

export default function directContentPlugin({ types: t }) {
  return {
    name: 'kfssec-direct-content',
    visitor: {
      Program: {
        enter(path, state) {
          state.enabled = isPublicContentFile(state.filename);
          state.changed = false;
          state.ids = new Map();
        },
        exit(path, state) {
          if (state.changed) path.unshiftContainer('body', t.importDeclaration(
            [t.importDefaultSpecifier(t.identifier('__SiteContent'))],
            t.stringLiteral('/src/components/Admin/InlineEditor/DirectContent.jsx'),
          ));
        },
      },
      JSXElement: {
        exit(path, state) {
          if (!state.enabled) return;
          const opening = path.node.openingElement;
          if (!t.isJSXIdentifier(opening.name) || !/^[a-z]/.test(opening.name.name)) return;
          const tag = opening.name.name;
          if (['svg', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'g', 'defs', 'stop', 'linearGradient', 'br', 'hr', 'script', 'style', 'option', 'select', 'textarea'].includes(tag)) return;
          if (path.findParent(p => p.isJSXElement() && t.isJSXIdentifier(p.node.openingElement.name) && ['EditableText', 'EditableImage', 'svg'].includes(p.node.openingElement.name.name))) return;
          const hasText = path.node.children.some(child =>
            t.isJSXText(child) ? Boolean(child.value.trim()) : t.isJSXExpressionContainer(child) && !t.isJSXEmptyExpression(child.expression));
          const hasMedia = ['img', 'video', 'source', 'iframe', 'a', 'input'].includes(tag) || opening.attributes.some(a => t.isJSXAttribute(a) && a.name.name === 'style');
          if (!hasText && !hasMedia) return;
          const filename = state.filename.split('/src/')[1];
          // Exclude nested markup from the identity: adding another card does not
          // invalidate the title next to it. A changed default gets a new binding.
          const directSource = path.node.children.filter(c => !t.isJSXElement(c)).map(c => state.file.code.slice(c.start, c.end)).join('');
          const attrs = opening.attributes.map(a => state.file.code.slice(a.start, a.end)).join(' ');
          const base = createHash('sha256').update(`${filename}|${tag}|${attrs}|${directSource}`).digest('hex').slice(0, 16);
          const occurrence = state.ids.get(base) || 0;
          state.ids.set(base, occurrence + 1);
          opening.name = t.jsxIdentifier('__SiteContent');
          if (path.node.closingElement) path.node.closingElement.name = t.jsxIdentifier('__SiteContent');
          opening.attributes.push(t.jsxAttribute(t.jsxIdentifier('as'), t.stringLiteral(tag)), t.jsxAttribute(t.jsxIdentifier('contentId'), t.stringLiteral(`${base}-${occurrence}`)));
          state.changed = true;
        },
      },
    },
  };
}
