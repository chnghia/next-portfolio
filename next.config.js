const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/next-portfolio" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Giữ cấu hình build ra thư mục riêng cho GitHub Pages / static hosting
  distDir: "dist",

  // Base path/asset prefix chỉ áp dụng khi build production (deploy GitHub Pages)
  ...(isProd
    ? {
        output: "export",
        basePath,
        assetPrefix: basePath,
      }
    : {}),

  // Expose basePath để dùng trong code nếu cần (NEXT_PUBLIC_BASE_PATH)
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  /**
   * Disable server-based image optimization. Next.js does not support
   * dynamic features with static exports.
   *
   * @see https://nextjs.org/docs/app/api-reference/components/image#unoptimized
   */
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
