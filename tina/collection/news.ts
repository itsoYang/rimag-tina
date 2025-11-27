import type { Collection } from 'tinacms';

const News: Collection = {
  label: '新闻',
  name: 'news',
  path: 'content/news',
  format: 'md',
  ui: {
    router: ({ document }) => {
      return `/news/${document._sys.breadcrumbs.join('/')}`;
    },
  },
  fields: [
    {
      type: 'string',
      label: '标题',
      name: 'title',
      isTitle: true,
      required: true,
    },
    {
      type: 'datetime',
      label: '发布日期',
      name: 'date',
      required: true,
      ui: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      },
    },
    {
      type: 'image',
      name: 'cover',
      label: '封面图',
      // @ts-ignore
      uploadDir: () => 'news',
    },
    {
      type: 'string',
      name: 'summary',
      label: '摘要',
      ui: {
        component: 'textarea',
      },
    },
    {
      type: 'string',
      name: 'category',
      label: '分类',
      options: ['news', 'announcement', 'event'],
    },
    {
      type: 'string',
      name: 'tags',
      label: '标签',
      list: true,
    },
    {
      type: 'rich-text',
      label: '正文',
      name: '_body',
      isBody: true,
    },
  ],
};

export default News;
