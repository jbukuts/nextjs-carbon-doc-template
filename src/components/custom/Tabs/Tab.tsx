'use client';

import { Tab } from '@carbon/react';

type TabProps = React.ComponentProps<typeof Tab>;

export default function CustomTab(props: TabProps) {
  return <Tab {...props} />;
}
