#!/usr/bin/env node

import fs from 'fs';
import fg from 'fast-glob';

console.log('hello');

const content_dir = './content/**/*.{mdx,md}';
const content_files = fg.globSync(content_dir);

// eslint-disable-next-line prettier/prettier
const IMAGE_REGEX = /!\[[^\]]*\]\((?<image_path>.*?)(?=\"|\))(?<optional_part>\".*\")?\)/g;

const match_list = [];

for (const file_path of content_files) {
  const raw_text = fs
    .readFileSync(file_path, { flag: 'r', encoding: 'utf-8' })
    .toString();

  const matches = [...raw_text.matchAll(IMAGE_REGEX)];

  if (matches.length > 0) match_list.push({ file_path, matches });
}

for (const match of match_list) {
  const { matches, file_path } = match;

  console.log(matches[0].groups);
}
