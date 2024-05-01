import React, { ReactNode } from 'react';
import BlockQuote from '../BlockQuote';
import type { BlockQuoteProps } from '../BlockQuote/BlockQuote';

type AllowedType = BlockQuoteProps['type'];
type CalloutType = 'QuizAlert' | 'Danger' | 'Warning' | 'Persona' | 'Callout';

interface GenericCalloutProps {
  text?: string;
  children?: ReactNode;
  type: AllowedType;
}

type CalloutProps = Omit<GenericCalloutProps, 'type'>;

// defines callout names and their color types
const calloutMap: Record<CalloutType, AllowedType> = {
  QuizAlert: 'success',
  Danger: 'error',
  Warning: 'warning',
  Persona: 'caution-undefined',
  Callout: 'default'
};

const GenericCallout = (props: GenericCalloutProps) => {
  const { text = '', children = null, type } = props;

  return <BlockQuote type={type}>{text ? <p>{text}</p> : children}</BlockQuote>;
};

const callouts = Object.entries(calloutMap).reduce(
  (acc, curr) => {
    const [key, val] = curr;
    acc[key as CalloutType] = ({ text, children }) => (
      <GenericCallout type={val} text={text}>
        {children}
      </GenericCallout>
    );

    return acc;
  },
  {} as Record<CalloutType, React.FC<CalloutProps>>
);

export default callouts;
