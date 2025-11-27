import type { Collection } from 'tinacms';

const Overview: Collection = {
  label: '标准说明',
  name: 'overview',
  path: 'content/overview',
  format: 'md',
  ui: {
    router: ({ document }) => {
      return `/overview/${document._sys.breadcrumbs.join('/')}`;
    },
  },
  fields: [
    {
      type: 'number',
      name: 'order',
      label: '排序',
      description: '数字越小排序越靠前',
      required: true,
    },
    {
      type: 'string',
      name: 'title',
      label: '标题',
      isTitle: true,
      required: true,
    },
    {
      type: 'string',
      name: 'description',
      label: '描述',
    },
    {
      type: 'datetime',
      name: 'lastUpdated',
      label: '最后更新',
    },
    {
      type: 'rich-text',
      label: '正文',
      name: '_body',
      isBody: true,
    },
  ],
};

export default Overview;
