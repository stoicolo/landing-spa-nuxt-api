const Joi = require('joi');

const createMenu = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    websiteId: Joi.number().required(),
  }),
};

const getMenu = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    websiteId: Joi.number().required(),
  }),
};

const updateMenu = {
  body: Joi.object()
    .keys({
      userId: Joi.number().required(),
      websiteId: Joi.number().required(),
    })
    .min(1),
};

const deleteMenu = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    websiteId: Joi.number().required(),
  }),
};

const createMenuPage = {
  body: Joi.object().keys({
    menuHeaderId: Joi.number().required(),
    pageId: Joi.number().required(),
    menuName: Joi.string().required(),
    href: Joi.string().required(),
    slug: Joi.string().required(),
    iconName: Joi.string(),
    order: Joi.number(),
  }),
};

const createMenuPagesBulk = {
  body: Joi.object().keys({
    menuHeaderId: Joi.number().required(),
    menuPages: Joi.array()
      .items(
        Joi.object().keys({
          pageId: Joi.number(),
          menuName: Joi.string().required(),
          href: Joi.string().required(),
          slug: Joi.string().required(),
          iconName: Joi.string(),
          order: Joi.number(),
        })
      )
      .min(1)
      .required(),
  }),
};

const createMenuWithDetails = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    websiteId: Joi.number().required(),
    menuDetails: Joi.array()
      .items(
        Joi.object().keys({
          pageId: Joi.number().required(),
          menuName: Joi.string().required(),
          href: Joi.string().required(),
          slug: Joi.string().required(),
          iconName: Joi.string(),
          order: Joi.number(),
        })
      )
      .min(1)
      .required(),
  }),
};

const getMenuWithDetails = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    websiteId: Joi.number().required(),
  }),
};

const getMenuPage = {
  body: Joi.object().keys({
    menuHeaderId: Joi.number().required(),
  }),
};

const updateMenuPage = {
  body: Joi.object()
    .keys({
      menuHeaderId: Joi.number().required(),
      pageId: Joi.number().required(),
      menuName: Joi.string().required(),
      href: Joi.string().required(),
      slug: Joi.string().required(),
      iconName: Joi.string(),
      order: Joi.number(),
    })
    .min(1),
};

const deleteMenuPage = {
  body: Joi.object().keys({
    menuHeaderId: Joi.number().required(),
  }),
};

module.exports = {
  createMenu,
  getMenu,
  updateMenu,
  deleteMenu,
  createMenuPage,
  createMenuPagesBulk,
  createMenuWithDetails,
  getMenuWithDetails,
  getMenuPage,
  updateMenuPage,
  deleteMenuPage,
};
