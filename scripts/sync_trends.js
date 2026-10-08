import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const DATA_FILE = path.join(ROOT_DIR, 'src/data/globalDiningTrends.js');
const IMAGES_DIR = path.join(ROOT_DIR, 'public/images/trends');

// Ensure image directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

function decodeHtmlEntities(str) {
  if (!str) return '';
  return str
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&middot;/g, '·')
    .replace(/&bull;/g, '•')
    .replace(/&hellip;/g, '…')
    .replace(/&lsquo;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseAuthorAndCleanSummary(rawSummary) {
  let author = '글로벌외식정보';
  let summary = rawSummary;

  // Match [글로벌 외식정보=진익준 논설위원], [글로벌외식정보｜발행인 안형상 기자], [사설] 등
  const authorMatch = rawSummary.match(/^\[([^\]]+)\]\s*(.*)$/s);
  if (authorMatch) {
    const bracketContent = authorMatch[1].trim();
    const remaining = authorMatch[2].trim();

    if (bracketContent.includes('글로벌') || bracketContent.includes('기자') || bracketContent.includes('위원') || bracketContent.includes('작가')) {
      author = bracketContent.replace(/\|/g, '｜');
      summary = remaining;
    } else {
      // e.g. [사설], [관공지 소개]
      summary = rawSummary;
    }
  }

  // Remove leading author prefixes if still lingering
  summary = summary.replace(/^(?:\[[^\]]+\]|\([^)]+\))\s*/, '');
  return { author, summary: decodeHtmlEntities(summary) };
}

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return await res.text();
}

async function downloadImage(url, destPath) {
  try {
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
      return true; // Already downloaded
    }
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.hsgdn.co.kr/',
      },
    });
    if (!res.ok) {
      console.warn(`Failed to download image ${url}: status ${res.status}`);
      return false;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (err) {
    console.warn(`Error downloading image ${url}:`, err.message);
    return false;
  }
}

function parseArticlesFromHtml(html) {
  const articles = [];
  const regex = /<li[^>]*>([\s\S]*?)<\/li>/g;
  let match;

  while ((match = regex.exec(html)) !== null) {
    const itemHtml = match[1];
    if (!itemHtml.includes('view.php?idx=')) continue;

    const idMatch = itemHtml.match(/idx=(\d+)/);
    const titleMatch = itemHtml.match(/<dt class=\"title\">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/);
    const contentMatch = itemHtml.match(/<dd class=\"content\">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/);
    const dateMatch = itemHtml.match(/<dd class=\"registDate\">([\s\S]*?)<\/dd>/);
    const imgMatch = itemHtml.match(/<img[^>]+src=[\"']([^\"']+)[\"']/);

    if (idMatch && titleMatch) {
      const id = idMatch[1];
      const rawTitle = titleMatch[1];
      const title = decodeHtmlEntities(rawTitle.replace(/<[^>]+>/g, '').trim());
      const rawContent = contentMatch ? contentMatch[1].replace(/<[^>]+>/g, '').trim() : '';
      const { author, summary } = parseAuthorAndCleanSummary(rawContent);

      let date = dateMatch ? dateMatch[1].trim().replace(/-/g, '.') : '';
      let remoteImg = null;
      if (imgMatch) {
        let imgSrc = imgMatch[1].trim();
        if (imgSrc.startsWith('/')) {
          remoteImg = `https://www.hsgdn.co.kr${imgSrc}`;
        } else if (imgSrc.startsWith('http')) {
          remoteImg = imgSrc;
        } else {
          remoteImg = `https://www.hsgdn.co.kr/news/${imgSrc}`;
        }
      }

      articles.push({
        id,
        title,
        summary: summary || title,
        author,
        date,
        imageUrl: `/images/trends/trend_${id}.jpg`,
        remoteImageUrl: remoteImg,
        linkUrl: `https://www.hsgdn.co.kr/news/view.php?idx=${id}&mcode=m247tk9`,
      });
    }
  }

  return articles;
}

async function main() {
  console.log('🔄 Fetching latest articles from HSGDN (글로벌외식정보)...');

  const page1Url = 'https://www.hsgdn.co.kr/news/list.php?mcode=m247tk9&vg=photo';
  let fetchedArticles = [];

  try {
    const html1 = await fetchPage(page1Url);
    fetchedArticles = parseArticlesFromHtml(html1);
    console.log(`✅ Parsed ${fetchedArticles.length} articles from page 1`);
  } catch (err) {
    console.error('❌ Error fetching page 1:', err);
    process.exit(1);
  }

  // Load existing articles from file to preserve custom / prior articles
  let existingArticles = [];
  try {
    const existingContent = fs.readFileSync(DATA_FILE, 'utf-8');
    const jsonMatch = existingContent.match(/export const GLOBAL_DINING_TRENDS = (\[[\s\S]*?\]);/);
    if (jsonMatch) {
      existingArticles = JSON.parse(jsonMatch[1]);
      console.log(`ℹ️ Loaded ${existingArticles.length} existing articles`);
    }
  } catch (err) {
    console.warn('⚠️ Could not parse existing trends file, creating new list:', err.message);
  }

  // Merge map by ID
  const articleMap = new Map();

  // Insert existing first
  for (const item of existingArticles) {
    articleMap.set(item.id, item);
  }

  // Overwrite/insert with newly fetched
  for (const item of fetchedArticles) {
    const prev = articleMap.get(item.id);
    if (prev) {
      // keep customized fields if any, but update date / title / remoteImageUrl
      articleMap.set(item.id, {
        ...prev,
        ...item,
        // preserve author if prev has detailed author and item has generic one
        author: prev.author && !item.author.includes('논설') && !item.author.includes('기자') ? prev.author : item.author,
      });
    } else {
      articleMap.set(item.id, item);
    }
  }

  const mergedList = Array.from(articleMap.values());

  // Sort by date descending, then id descending
  mergedList.sort((a, b) => {
    const dateComp = (b.date || '').localeCompare(a.date || '');
    if (dateComp !== 0) return dateComp;
    return parseInt(b.id, 10) - parseInt(a.id, 10);
  });

  // Limit to top 18 articles for smooth performance and rich variety
  const finalList = mergedList.slice(0, 18);

  console.log(`📥 Downloading missing images for top ${finalList.length} articles...`);
  for (const article of finalList) {
    if (article.remoteImageUrl) {
      const destPath = path.join(IMAGES_DIR, `trend_${article.id}.jpg`);
      await downloadImage(article.remoteImageUrl, destPath);
    }
  }

  // Today's date YYYY.MM.DD
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const todayStr = `${yyyy}.${mm}.${dd}`;

  const outputCode = `// Auto-synchronized from Global Dining News (글로벌외식정보) 외식 트렌드
// Source: https://www.hsgdn.co.kr/news/list.php?mcode=m247tk9&vg=photo

export const GLOBAL_DINING_TRENDS = ${JSON.stringify(finalList, null, 2)};

export const TREND_CATEGORY_INFO = {
  title: '외식 트렌드',
  subtitle: '외식업 경영 인사이트 & 푸드 트렌드 칼럼',
  sourceName: '글로벌외식정보',
  sourceUrl: 'https://www.hsgdn.co.kr/news/list.php?mcode=m247tk9&vg=photo',
  lastUpdated: '${todayStr}'
};
`;

  fs.writeFileSync(DATA_FILE, outputCode, 'utf-8');
  console.log(`🎉 Successfully updated ${DATA_FILE} with ${finalList.length} articles (lastUpdated: ${todayStr})`);
}

main().catch((err) => {
  console.error('Fatal error in sync_trends:', err);
  process.exit(1);
});
