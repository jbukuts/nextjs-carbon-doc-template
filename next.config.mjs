import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import createNextIntlPlugin from 'next-intl/plugin';
import * as packageJSON from './package.json' assert { type: 'json' };

const __dirname = dirname(fileURLToPath(import.meta.url));

const SYMLINKS = ['content', 'fragments'];
const IS_DEV = process.env.NODE_ENV === 'development';

// symlink logic
if (IS_DEV) {
  SYMLINKS.forEach((s) => {
    const target = path.join(__dirname, 'public', s);
    if (!fs.existsSync(target)) {
      console.log('creating symlink:', s);
      const source = path.join(__dirname, s);
      fs.symlinkSync(source, target, 'dir');
    }
  });
} else {
  SYMLINKS.forEach((s) => {
    const target = path.join(__dirname, 'public', s);
    if (fs.existsSync(target)) {
      console.log('removing symlink:', s);
      fs.unlinkSync(target);
    }
  });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: `/${packageJSON.name}`,
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
