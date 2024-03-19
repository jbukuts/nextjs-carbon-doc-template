import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkSectionize from 'remark-sectionize';
import remarkUnwrapImages from 'remark-unwrap-images';

/** @type {Record<string, any[]>} */
const config = {
  frontmatterSchema: {},
  remarkPlugins: [
    [remarkUnwrapImages],
    [remarkGfm, { tablePipeAlign: false }],
    [remarkBreaks, {}],
    [remarkSectionize]
  ],
  rehypePlugins: [
    [rehypeHighlight, {}],
    [rehypeSlug, {}],
    [
      rehypeAutolinkHeadings,
      { behavior: 'wrap', test: ['h2', 'h3', 'h4', 'h5', 'h6'] }
    ]
  ]
};

export default config;
