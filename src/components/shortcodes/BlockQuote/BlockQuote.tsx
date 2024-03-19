import {
  HelpFilled,
  InformationFilled,
  WarningAltFilled,
  WarningSquareFilled
} from '@carbon/react/icons';
import cx from 'classnames';
import { BlockquoteHTMLAttributes, createElement } from 'react';
import styles from './BlockQuote.module.scss';

type AllowedType = 'info' | 'success' | 'warning' | 'error';

export interface BlockQuoteProps
  extends BlockquoteHTMLAttributes<HTMLQuoteElement> {
  alt?: boolean;
  type?: AllowedType;
}

const iconMap: Record<AllowedType, typeof HelpFilled> = {
  info: InformationFilled,
  success: HelpFilled,
  warning: WarningSquareFilled,
  error: WarningAltFilled
};

export default function BlockQuote(props: BlockQuoteProps) {
  const { children, type = 'info' } = props;

  return (
    <blockquote className={cx(styles.blockQuote, styles[type])}>
      {createElement(iconMap[type], { size: 20 })}
      <div className={styles.blockQuoteContent}>{children}</div>
    </blockquote>
  );
}
