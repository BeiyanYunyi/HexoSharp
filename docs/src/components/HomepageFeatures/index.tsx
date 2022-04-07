import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: '代码现代化',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Hexo# 以 TypeScript 和 TSX 构建
        <br />
        开发者心智负担低
      </>
    ),
  },
  {
    title: '平台现代化',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>Hexo# 可托管在 Cloudflare Worker 上，不需要自行搭建 VPS。当然它也可以被独立托管。</>
    ),
  },
  {
    title: '架构现代化',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        重前端、轻后端
        <br />
        后端要求低、可部署性高
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
