import React, { ReactNode } from 'react';
import Head from 'next/head';
import Script from 'next/script';

import styles from './PageLayout.module.scss';

interface PageLayoutProps {
  children?: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
}: PageLayoutProps) => {
  return (
    <div>
      <div className={styles.page}>
        <div className={styles.header}>
          <p>Knowly</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
