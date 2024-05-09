import {CircleIcon} from '@sanity/icons'

export default {
  name: 'suite',
  title: 'Suites',
  type: 'document',
  icon: CircleIcon,
  fields: [
    {
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "info",
      title: "Info",
      type: "array",
      of: [
        {
          name: "infoRow",
          title: "Info Row",
          type: 'string',
        },
      ],
    },
    {
      name: "infoHomepage",
      title: "Info in homepage",
      type: "array",
      of: [
        {
          name: "infoRow",
          title: "Info Row",
          type: 'string',
        },
      ],
    },
    {
      name: "slider",
      title: "Slider",
      type: "array",
      of: [
        {
          name: "sliderImage",
          title: "Image",
          type: 'image',
        },
      ],
    },
    {
      name: "rentalId",
      title: "Rental ID",
      type: "string",
    },
    {
      name: "order",
      title: "Order",
      type: "number",
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'language',
    },
  }
}