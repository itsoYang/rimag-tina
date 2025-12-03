import { defineConfig } from "tinacms";

import Global from "./collection/global";

// 医学影像标准化官网内容
import News from "./collection/news";
import Blog from "./collection/blog";
import About from "./collection/about";
import Overview from "./collection/overview";

const config = defineConfig({
  // TinaCloud 配置（必填）
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || 
          process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || 
          'main',
  token: process.env.TINA_TOKEN,

  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "public",
    outputFolder: "admin",
    basePath: '',
  },
  schema: {
    collections: [Global, News, Blog, About, Overview],
  },
});

export default config;
