'use client';

import { IconButton as CopyButton } from '@carbon/react';
import { Copy } from '@carbon/react/icons';
import { Children } from 'react';
import styles from './CodeBlock.module.scss';
import './highlight.scss';

type CodeBlockProps = React.HTMLAttributes<HTMLElement>;

const CODE_CLASS_REGEX = new RegExp(`^language-.*`, 'i');

export default function CodeBlock(props: CodeBlockProps) {
  const { children, className } = props;

  const isInline = Children.count(children) === 1;

  const lang = className
    ?.split(' ')
    .filter((c) => CODE_CLASS_REGEX.test(c))
    .map((i) => i.split('-').slice(1).join('-'));

  return isInline ? (
    <code className={styles.inline}>{children}</code>
  ) : (
    <div className={styles.multiline}>
      <div className={styles.codeWrapper}>
        <code>{children}</code>
      </div>
      <div className={styles.panel}>
        <span className={styles.lang}>{lang}</span>
        <CopyButton
          style={{ borderLeft: '1px solid var(--cds-border-subtle-02)' }}
          size='md'
          kind='ghost'
          align='bottom-right'
          label='Copy code to clipboad'>
          <Copy />
        </CopyButton>
      </div>
    </div>
  );
}
