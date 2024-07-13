import nextTranslate from "next-translate-plugin";

const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  i18n: {
    locales: ["en-US", "cn", "id"],
    defaultLocale: "en-US",
  },
};

export default nextTranslate(nextConfig);
