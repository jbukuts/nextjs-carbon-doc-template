import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkSectionize from 'remark-sectionize';
import remarkUnwrapImages from 'remark-unwrap-images';

/** @type { import('json-schema').JSONSchema7 } */
const schema = {
  title: 'Lab',
  description: 'Metadata surrounding lab content',
  type: 'object',
  properties: {
    title: {
      description: 'Title string displayed in left-hand navigation',
      type: 'string'
    },
    updated: {
      description: 'Represents last date content was updated',
      type: 'string',
      format: 'date'
    },
    timeToComplete: {
      description: 'Amount of time in minutes lab will take to complete',
      type: 'number',
      exclusiveMinimum: 0
    },
    toc: {
      description: 'Whether final lab page should render table of contents',
      type: 'boolean'
    },
    desc: {
      description: 'Short plaintext desciption of the content within',
      type: 'string'
    }
  }
};

/** @type {Record<string, any[]>} */
const config = {
  frontmatterSchema: schema,
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
