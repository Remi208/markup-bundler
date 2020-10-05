import svg4everybody from 'svg4everybody';

export default () => {
  svg4everybody();
  const requireAll = (r) => {
    r.keys().forEach(r);
  };
  requireAll(require.context('../svg-sprites/', true, /\.svg$/));
};
