import type { NextConfig } from 'next';

import path from 'path';

const nextConfig: NextConfig = {
   reactCompiler: true,
   output: 'standalone',
   sassOptions: {
      includePaths: [path.join(__dirname, 'src')],
   },
};

export default nextConfig;
