"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
// generate-sitemap.ts
var sitemap_1 = require("sitemap");
var zlib_1 = require("zlib");
var fs = require("fs/promises");
// Function to get all pages in the project
var getAllPages = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var basePath, collectPages, pages;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          basePath = "./src/app";
          collectPages = function (currentPath, currentPages) {
            if (currentPages === void 0) {
              currentPages = [];
            }
            return __awaiter(void 0, void 0, void 0, function () {
              var items, _i, items_1, item, fullPath, relativePath;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [
                      4 /*yield*/,
                      fs.readdir(currentPath, { withFileTypes: true }),
                    ];
                  case 1:
                    items = _a.sent();
                    (_i = 0), (items_1 = items);
                    _a.label = 2;
                  case 2:
                    if (!(_i < items_1.length)) return [3 /*break*/, 7];
                    item = items_1[_i];
                    fullPath = "".concat(currentPath, "/").concat(item.name);
                    if (!item.isDirectory()) return [3 /*break*/, 5];
                    if (!!fullPath.includes("/api")) return [3 /*break*/, 4];
                    return [4 /*yield*/, collectPages(fullPath, currentPages)];
                  case 3:
                    _a.sent();
                    _a.label = 4;
                  case 4:
                    return [3 /*break*/, 6];
                  case 5:
                    if (
                      item.isFile() &&
                      item.name.endsWith(".tsx") &&
                      item.name !== "index.tsx"
                    ) {
                      relativePath = fullPath
                        .replace(basePath, "")
                        .replace(".tsx", "")
                        .replace("/index", "")
                        .replace(/\\/g, "/");
                      currentPages.push(relativePath);
                    }
                    _a.label = 6;
                  case 6:
                    _i++;
                    return [3 /*break*/, 2];
                  case 7:
                    return [2 /*return*/];
                }
              });
            });
          };
          pages = [];
          return [4 /*yield*/, collectPages(basePath, pages)];
        case 1:
          _a.sent();
          return [2 /*return*/, pages];
      }
    });
  });
};
// Function to generate the sitemap
var generateSitemap = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var stream, gzipStream, pages, _i, pages_1, page, sm;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          stream = new sitemap_1.SitemapStream({
            hostname: "https://finanzas-educativas.vercel.app",
          });
          gzipStream = (0, zlib_1.createGzip)();
          // Pipe the gzip stream to the sitemap stream
          stream.pipe(gzipStream);
          return [4 /*yield*/, getAllPages()];
        case 1:
          pages = _a.sent();
          // Add each page to the sitemap
          for (_i = 0, pages_1 = pages; _i < pages_1.length; _i++) {
            page = pages_1[_i];
            stream.write({ url: page, changefreq: "weekly", priority: 0.8 });
          }
          // Close the stream
          stream.end();
          return [4 /*yield*/, (0, sitemap_1.streamToPromise)(gzipStream)];
        case 2:
          sm = _a.sent();
          return [4 /*yield*/, fs.writeFile("./public/sitemap.xml.gz", sm)];
        case 3:
          _a.sent();
          console.log("Sitemap generated successfully.");
          return [2 /*return*/];
      }
    });
  });
};
// Execute the main function to generate the sitemap
generateSitemap();
