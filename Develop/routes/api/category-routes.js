const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


router.get('/',  async (req, res) => {
  // will find all categories by its `id` value and its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // will find one category by its `id` value and its associated Products
  try {
    const categoryData = await Category.findOne(re.params.id, {
      include: [{model: Product}],
    });

    if (!driverData) {
      res.status(404).json({ message: 'No Category found with that id.' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // created a new category
  Category.create({
    name: req.body.name
  })
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put('/:id', (req, res) => {
  // will call the updated method on the Category Model
  Category.update(
    {
      id: req.body.id,
      name: req.body.name,
    },
    {
      //will get the category based on its designated id in the req parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      // will send the update category as a json response
      res.json(updatedCategory);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  // will delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
