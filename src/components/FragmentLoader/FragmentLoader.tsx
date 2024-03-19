import path from 'path';
import { getLocale } from 'next-intl/server';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkBehead from 'remark-behead';
import shortcodes from '#/lib/mdx/shortcodes';
import { remarkImage, remarkLocalizeLinks } from '#/lib/plugins/remark';
import mdxConfig from '#mdx-config';
import { fragments } from '../../../.velite';

const { remarkPlugins, rehypePlugins } = mdxConfig;

interface FragmentLoaderProps {
  name: string;
}

/**
 * compiles given fragment from its name into a React element
 *
 * @param name name of locale specified in frontmatter data
 * @param locale locale of fragment
 * @returns React element to render
 */
async function compileFragment(name: string, locale: string) {
  const item = fragments.find((i) => i.name === name);

  if (!item) return null;

  const { raw, path: file_path } = item;

  const { dir } = path.parse(file_path);
  const imagePath = path.normalize(dir);

  const { content } = await compileMDX({
    source: raw,
    components: shortcodes,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [
          [remarkBehead, { minDepth: 2 }],
          ...remarkPlugins,
          [remarkLocalizeLinks, { locale }],
          [remarkImage, { prepend: imagePath }]
        ],
        rehypePlugins: [...rehypePlugins]
      }
    }
  });

  return content;
}

export default async function FragmentLoader(props: FragmentLoaderProps) {
  const { name } = props;
  const locale = await getLocale();

  return await compileFragment(name, locale);
}
