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
      {
        source: '/dashboard',
        destination: '/dashboard/products',
        permanent: false
      },
      {
        source: '/shop',
        destination: '/shop/all',
        permanent: true,
      }
    ];
  }
});
