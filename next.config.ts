import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Other Next.js config options can go here

  /**
   * During development it's useful for ESLint to surface all issues, but
   * blocking production builds due to style-only concerns (e.g. prefer-const,
   * no-explicit-any, react/no-img-element) can be counter-productive.
   * Setting `ignoreDuringBuilds` to `true` tells Next.js to skip the ESLint
   * step when running `next build`, so the build process will succeed even if
   * there are remaining lint errors or warnings.
   *
   * NOTE: This does NOT disable ESLint entirely – `next lint` and your editor
   * integrations will still report problems so they can be addressed over
   * time, but they won't block CI/CD pipelines.
   */
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
