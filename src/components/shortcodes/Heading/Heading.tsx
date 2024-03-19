import { FC, createElement } from 'react';
import styles from './Heading.module.scss';

const LEVELS = [1, 2, 3, 4, 5, 6] as const;

interface HeadingProps extends React.ComponentProps<'h1'> {
  level: (typeof LEVELS)[number];
}

function Heading(props: HeadingProps) {
  const { level, children, ...rest } = props;
  return createElement(
    `h${level}`,
    { ...rest, className: styles.heading },
    children
  );
}

const Headings = LEVELS.reduce(
  (acc, curr) => {
    acc[curr] = (props: Omit<HeadingProps, 'level'>) => (
      <Heading {...props} level={curr} />
    );

    return acc;
  },
  {} as Record<HeadingProps['level'], FC>
);

export default Headings;
