import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
});

export default withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks']
  },
  redirects() {
    return [
      // {
      //   source: '/videos',
      //   destination: '/videos/tags/all',
      //   permanent: false
      // },
      // {
      //   source: '/videos/tag',
      //   destination: '/videos/tags/all',
      //   permanent: false
      // },
      {
        source: '/business/product',
        destination: '/business/product/tags/all',
        permanent: false
      },
      {
        source: '/business/product/tags',
        destination: '/business/product/tags/all',
        permanent: false
      },
    ];
  },
});
