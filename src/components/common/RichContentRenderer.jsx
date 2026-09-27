import React from 'react';

/**
 * Parses and renders inline markdown formatting:
 * - **bold text** -> <strong>
 */
export function renderInlineMarkdown(text) {
  if (!text) return '';
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-black text-gray-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

/**
 * Strips markdown tags (e.g. ![...](...), >) from text
 * for use in card summaries and search filters
 */
export function cleanMarkdownSnippet(text = '', placeholder = '[사진]') {
  if (!text) return '';
  return text
    .replace(/!\[.*?\]\(.*?\)/g, ` ${placeholder} `)
    .replace(/^>\s*/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Parses and renders rich content with:
 * - Inline markdown images: ![caption](url)
 * - Blockquotes: > quote
 * - Bold text: **bold**
 * - Paragraph breaks
 */
export function renderRichContent(content = '') {
  if (!content) return null;

  const lines = content.split('\n');
  const elements = [];
  let textBuffer = [];

  const flushBuffer = (keyPrefix) => {
    if (textBuffer.length === 0) return;
    const text = textBuffer.join('\n');
    elements.push(
      <p
        key={`${keyPrefix}-${elements.length}`}
        className="text-stone-700 leading-relaxed font-medium whitespace-pre-wrap"
      >
        {renderInlineMarkdown(text)}
      </p>
    );
    textBuffer = [];
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    // Markdown inline image: ![alt](url)
    const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      flushBuffer(`p-${idx}`);
      const alt = imgMatch[1] || '현장 사진';
      const src = imgMatch[2];
      elements.push(
        <figure
          key={`img-${idx}`}
          className="my-3.5 rounded-2xl overflow-hidden border border-stone-200 bg-stone-900/5 shadow-xs"
        >
          <img
            src={src}
            alt={alt}
            className="w-full max-h-[460px] object-contain mx-auto"
            loading="lazy"
          />
          {alt && alt !== '현장 사진' && (
            <figcaption className="text-center text-xs text-stone-500 py-1.5 bg-stone-100/70 border-t border-stone-200 font-medium">
              {alt}
            </figcaption>
          )}
        </figure>
      );
      return;
    }

    // Markdown blockquote: > text
    if (trimmed.startsWith('>')) {
      flushBuffer(`p-${idx}`);
      const quoteText = trimmed.replace(/^>\s*/, '');
      elements.push(
        <blockquote
          key={`quote-${idx}`}
          className="my-2.5 pl-4 py-2 border-l-4 border-[#2B7752] bg-[#EAF6EE]/60 text-stone-800 rounded-r-xl italic text-xs sm:text-sm font-medium"
        >
          {renderInlineMarkdown(quoteText)}
        </blockquote>
      );
      return;
    }

    // Empty line breaks paragraphs
    if (trimmed === '') {
      flushBuffer(`p-${idx}`);
      return;
    }

    textBuffer.push(line);
  });

  flushBuffer('final');
  return <div className="space-y-3">{elements}</div>;
}

export default function RichContentRenderer({ content, className = '' }) {
  if (!content) return null;
  return (
    <div className={`rich-content-renderer ${className}`}>
      {renderRichContent(content)}
    </div>
  );
}
