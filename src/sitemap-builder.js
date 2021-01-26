const buildSitemap = require('react-build-sitemap');

buildSitemap(
  './components/Layout/Layout.tsx',
  '../../public/sitemap.xml',
  'https://www.tkswindowsanddoors.co.uk'
);
