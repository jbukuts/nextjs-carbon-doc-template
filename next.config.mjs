import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import createNextIntlPlugin from 'next-intl/plugin';

const __dirname = dirname(fileURLToPath(import.meta.url));

const IS_DEV = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental: {
    outputFileTracingExcludes: {
      '*': ['./public/content/**/*', './content/**/*']
    }
  },
  images: {
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
    unoptimized: true
  },
  webpack: (config) => {
    console.log(`Currently in ${process.env.NODE_ENV} mode.`);

    // allows symlinked content to be available in static site
    config.resolve.symlinks = !IS_DEV;

    config.module.rules?.push({
      test: /\.md/,
      loader: 'ignore-loader'
    });

    // for tokenization applet
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      'onnxruntime-node$': false
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

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
