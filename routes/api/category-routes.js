const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

  // find all categories
  // be sure to include its associated Products
  router.get('/', async (req, res) => {
    try {
      const categoryData = await Category.findAll({
        include: [{ model: Product }],
      });
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // find one category by its `id` value
  // be sure to include its associated Products
  router.get('/:id', async (req, res) => {
    try {
      const categoryData = await Category.findByPk(req.params.id, {
        include: [{ model: Product }],
      });
  
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with that id!' });
        return;
      }
  
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // create a new category
  router.post('/', async (req, res) => {
    try {
      const locationData = await Category.create({
        category_id: req.body.category_id,
      });
      res.status(200).json(locationData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // update a category by its `id` value
  // router.put('/:id', async(req, res) => {
  //   try {
  //     const categoryData = await Category.update(req.body, {
  //     where: {
  //       id: req.params.id,
  //     },
  //   })
  //   .then((Category) => {
  //     // find all associated tags from ProductTag
  //     return ProductTag.findAll({ where: { product_id: req.params.id } });
  //   })
  //   .then((productTags) => {
  //     // get list of current tag_ids
  //     const productTagIds = productTags.map(({ tag_id }) => tag_id);
  //     // create filtered list of new tag_ids
  //     const newProductTags = req.body.tagIds
  //       .filter((tag_id) => !productTagIds.includes(tag_id))
  //       .map((tag_id) => {
  //         return {
  //           product_id: req.params.id,
  //           tag_id,
  //         };
  //       });

  // delete a category by its `id` value
  router.delete('/:id', async (req, res) => {
    try {
      const categoryData = await Category.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with that id!' });
        return;
      }
  
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
