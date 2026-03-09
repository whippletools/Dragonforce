import type { RichTextBlock, RichTextContent } from '../types/api';

interface RichTextRendererProps {
  content: RichTextContent;
}

const RichTextRenderer = ({ content }: RichTextRendererProps) => {
  const renderBlock = (block: RichTextBlock, index: number) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={index} className="text-gray-700 text-lg leading-relaxed mb-6">
            {typeof block.content === 'string' ? block.content : ''}
          </p>
        );

      case 'heading':
        const headingContent = typeof block.content === 'object' && !Array.isArray(block.content) 
          ? block.content 
          : { level: 2, text: '' };
        const HeadingTag = `h${headingContent.level}` as 'h2' | 'h3' | 'h4';
        const headingClasses: Record<number, string> = {
          2: 'text-2xl font-bold text-gray-800 mt-10 mb-4',
          3: 'text-xl font-semibold text-gray-800 mt-8 mb-3',
          4: 'text-lg font-semibold text-gray-800 mt-6 mb-2',
        };
        return (
          <HeadingTag key={index} className={headingClasses[headingContent.level]}>
            {headingContent.text}
          </HeadingTag>
        );

      case 'list':
        const listItems = Array.isArray(block.content) ? block.content : [];
        const ListTag = block.metadata?.listType === 'ol' ? 'ol' : 'ul';
        const listClasses = block.metadata?.listType === 'ol' 
          ? 'list-decimal list-inside space-y-3 mb-6 ml-4' 
          : 'list-disc list-inside space-y-3 mb-6 ml-4';
        return (
          <ListTag key={index} className={listClasses}>
            {listItems.map((item, i) => (
              <li key={i} className="text-gray-700 text-lg leading-relaxed">
                {item}
              </li>
            ))}
          </ListTag>
        );

      case 'image':
        return (
          <figure key={index} className="my-8">
            <img
              src={block.metadata?.src || ''}
              alt={block.metadata?.alt || ''}
              className="w-full rounded-lg"
              loading="lazy"
            />
            {block.metadata?.caption && (
              <figcaption className="text-center text-gray-500 text-sm mt-2">
                {block.metadata.caption}
              </figcaption>
            )}
          </figure>
        );

      case 'quote':
        return (
          <blockquote key={index} className="border-l-4 border-[#1a4f8a] pl-6 py-2 my-6 bg-gray-50 rounded-r-lg">
            <p className="text-gray-700 italic text-lg leading-relaxed">
              {typeof block.content === 'string' ? block.content : ''}
            </p>
          </blockquote>
        );

      case 'embed':
        return (
          <div key={index} className="my-8">
            {block.metadata?.url ? (
              <a 
                href={block.metadata.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a4f8a] hover:text-blue-700 underline font-medium"
              >
                {typeof block.content === 'string' ? block.content : 'Ver más'}
              </a>
            ) : (
              <span className="text-gray-700">
                {typeof block.content === 'string' ? block.content : ''}
              </span>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <article className="prose prose-lg max-w-none">
      {content.blocks.map((block, index) => renderBlock(block, index))}
    </article>
  );
};

export default RichTextRenderer;
