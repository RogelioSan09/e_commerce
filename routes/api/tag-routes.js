const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // will find all tags and its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}, {model: ProductTag}],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // will find a single tag by its `id` and its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag, as: 'tag_products'}],
    });

    // the following returns a response upon failure to acquire data for tag specified by id
    if (!tagData) {
      res.status(404).json({message: 'No Product Tag found by that id.'});
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // will create a new tag
  Tag.create({
    name: req.body.name
  })
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put('/:id', (req, res) => {
  // will update a tag's name by its `id` value using the update method on the Tag Model
  Tag.update(
    {
      id: req.body.id,
      name: req.body.name,
    },
    {
      //will get the tag based on its designated id in the req parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedTag) => {
      // will send the update tag as a json response
      res.json(updatedTag);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  // will delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
