import React, { useState, useEffect, useRef } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());
  const styleContainerRef = useRef<HTMLDivElement>(null);

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleTags();
    return <div ref={styleContainerRef}>{styles}</div>;
  });

  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && styleContainerRef.current) {
      const styleContainer = styleContainerRef.current;
      while (styleContainer.firstChild) {
        styleContainer.removeChild(styleContainer.firstChild);
      }
    }
  }, []);

  if (typeof window !== 'undefined') return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
