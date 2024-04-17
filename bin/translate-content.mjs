#!/usr/bin/env node

import fg from 'fast-glob';
import { simpleGit } from 'simple-git';

const content_dir = './content/**/*.{mdx,md}';
const content_files = fg.globSync(content_dir);

const git = simpleGit({
  baseDir: process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 1,
  trimmed: false
});

const { files: changed_files } = await git.diffSummary(['main^1', 'content/']);

console.log(changed_files);
