/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwindui.com",
        port: "",
        pathname: "/img/logos/**",
      },
      {
        protocol: "https",
        hostname: "imagenes.20minutos.es",
        port: "",
        pathname: "/files/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/photos/**",
      },
      {
        protocol: "https",
        hostname: "reqres.in",
        port: "",
        pathname: "/img/**",
      },
      {
        protocol: "https",
        hostname: "demo.themesberg.com",
        port: "",
        pathname: "/windster/images/users/**",
      },
      {
        protocol: "https",
        hostname: "guia.itfip.edu.co",
        port: "",
        pathname: "/sgacampus/images/dynamic/**",
      },
    ],
  },
};

module.exports = nextConfig;
