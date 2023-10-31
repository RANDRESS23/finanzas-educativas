/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      "images.unsplash.com",
      "tailwindui.com",
      "images.pexels.com",
      "guia.itfip.edu.co",
      "imagenes.20minutos.es",
      "demo.themesberg.com",
      "reqres.in",
    ],
  },
};

module.exports = nextConfig;
