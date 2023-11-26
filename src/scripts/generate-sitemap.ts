// generate-sitemap.ts
const { SitemapStream, streamToPromise } = require("sitemap");
const { createGzip } = require("zlib");
const fs = require("fs/promises");

// Function to get all pages in the project
const getAllPages = async () => {
  const basePath = "./src/app"; // Base path for your pages

  const collectPages = async (
    currentPath: string,
    currentPages: string[] = [],
  ) => {
    const items = await fs.readdir(currentPath, { withFileTypes: true });

    for (const item of items) {
      const fullPath = `${currentPath}/${item.name}`;
      if (item.isDirectory()) {
        // Exclude API directory
        if (!fullPath.includes("/api")) {
          await collectPages(fullPath, currentPages);
        }
      } else if (
        item.isFile() &&
        item.name.endsWith(".tsx") &&
        item.name !== "index.tsx"
      ) {
        // Replace path and format for URL
        const relativePath = fullPath
          .replace(basePath, "")
          .replace(".tsx", "")
          .replace("/index", "")
          .replace(/\\/g, "/");
        currentPages.push(relativePath);
      }
    }
  };

  const pages: string[] = [];
  await collectPages(basePath, pages);
  return pages;
};

// Function to generate the sitemap
const generateSitemap = async () => {
  // Create a sitemap stream
  const stream = new SitemapStream({
    hostname: "https://finanzas-educativas.vercel.app",
  });

  // Create a gzip stream to compress the sitemap
  const gzipStream = createGzip();

  // Pipe the gzip stream to the sitemap stream
  stream.pipe(gzipStream);

  // Get all pages in the project
  const pages = await getAllPages();

  // Add each page to the sitemap
  for (const page of pages) {
    stream.write({ url: page, changefreq: "weekly", priority: 0.8 });
  }

  // Close the stream
  stream.end();

  // Save the compressed sitemap to a file
  const sm = await streamToPromise(gzipStream);
  await fs.writeFile("./public/sitemap.xml.gz", sm);

  console.log("Sitemap generated successfully.");
};

// Execute the main function to generate the sitemap
generateSitemap();
