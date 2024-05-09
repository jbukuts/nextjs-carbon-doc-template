// import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import createNextIntlPlugin from 'next-intl/plugin';

const { NEXT_PUBLIC_BASE_PATH } = process.env;

const __dirname = dirname(fileURLToPath(import.meta.url));
const withNextIntl = createNextIntlPlugin('./i18n.config.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: NEXT_PUBLIC_BASE_PATH,
  output: 'export',
  images: {
    // loader: 'custom',
    // loaderFile: './src/lib/image-loader.ts',
    unoptimized: true
  },
  webpack: (config) => {
    // for tokenization applet
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      'onnxruntime-node$': false
      // manually do this
      // https://github.com/amannn/next-intl/blob/78f88d1493eb796498b7fb2c986536ac49cffda0/packages/next-intl/src/plugin.tsx#L95
      // 'next-intl/config': path.resolve(config.context, './src/i18n.ts')
    };

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
    prependData: (content, loaderContext) => {
      const { resourcePath, rootContext } = loaderContext;
      const relativePath = path.relative(rootContext, resourcePath);

      let list = [`@use 'src/styles/resources'`];
      if (relativePath.endsWith('.module.scss')) {
        list = list.concat([
          `@use 'src/styles/theme' as themes`,
          `@use '@carbon/colors'`,
          `@use '@carbon/layout'`,
          `@use '@carbon/type'`
        ]);
      }

      const imports = [...list, ''].join(';\n');
      return imports.trim() + content;
    },
    logger: {
      warn: function (message) {
        console.warn(message);
      },
      debug: function (message) {
        console.log(message);
      }
    }
  }
};

export default withNextIntl(nextConfig);
