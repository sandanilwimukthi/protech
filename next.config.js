// next.config.js
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";

module.exports = {
  output: "export",          // generates /out :contentReference[oaicite:1]{index=1}
  basePath: `/${repo}`,      // serve under /<repo> :contentReference[oaicite:2]{index=2}
  assetPrefix: `/${repo}/`,
  trailingSlash: true,       // helps GitHub Pages routing :contentReference[oaicite:3]{index=3}
  images: { unoptimized: true }, // needed because next/image optimisation needs a server
};

