import type { Collection } from 'tinacms';

const About: Collection = {
  label: '关于我们',
  name: 'about',
  path: 'content/about',
  format: 'md',
  fields: [
    {
      type: 'string',
      name: 'title',
      label: '标题',
      required: true,
    },
    {
      type: 'rich-text',
      name: 'content',
      label: '主要内容',
      required: true,
    },
    {
      type: 'object',
      name: 'sections',
      label: '内容板块',
      list: true,
      fields: [
        {
          type: 'string',
          name: 'heading',
          label: '标题',
        },
        {
          type: 'string',
          name: 'description',
          label: '描述',
          ui: {
            component: 'textarea',
          },
        },
        {
          type: 'image',
          name: 'image',
          label: '图片',
        },
      ],
    },
    {
      type: 'object',
      name: 'team',
      label: '团队成员',
      list: true,
      fields: [
        {
          type: 'string',
          name: 'name',
          label: '姓名',
        },
        {
          type: 'string',
          name: 'position',
          label: '职位',
        },
        {
          type: 'image',
          name: 'avatar',
          label: '头像',
        },
        {
          type: 'string',
          name: 'description',
          label: '介绍',
          ui: {
            component: 'textarea',
          },
        },
      ],
    },
  ],
};

export default About;
