import type { Collection } from 'tinacms';

const Blog: Collection = {
  label: '技术博客',
  name: 'blog',
  path: 'content/blog',
  format: 'md',
  fields: [
    {
      type: 'string',
      name: 'title',
      label: '标题',
      required: true,
    },
    {
      type: 'string',
      name: 'author',
      label: '作者',
      required: true,
    },
    {
      type: 'datetime',
      name: 'date',
      label: '发布日期',
      required: true,
    },
    {
      type: 'image',
      name: 'cover',
      label: '封面图',
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
      options: ['technical', 'industry', 'research'],
    },
    {
      type: 'rich-text',
      name: 'body',
      label: '正文',
      isBody: true,
      templates: [
        {
          name: 'image',
          label: '图片',
          fields: [
            {
              name: 'src',
              label: '图片路径',
              type: 'image',
            },
            {
              name: 'alt',
              label: '图片描述',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      type: 'string',
      name: 'tags',
      label: '标签',
      list: true,
    },
  ],
};

export default Blog;
