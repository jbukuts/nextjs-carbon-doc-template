'use client';

import { createPortal } from 'react-dom';

export default function TOC() {
  const tocPoint = document.getElementById('table-of-contents-var-var')!;

  return createPortal(<div>Goiing through a portal</div>, tocPoint);
}
