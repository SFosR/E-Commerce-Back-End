const router = require('express').Router();
const { rmSync } = require('fs');
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
  
    Category.findAll(
        {
            include: {
                model: Product,
                attributes: ['product_name']
            }
        }
    )
      .then(categoryData => res.json(categoryData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

router.get('/:id', (req, res) => {

    Category.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
    }).then(categoryData => {
        if(!categoryData) {
            res.status(404).json({message: 'No categories found'});
            return;
        } res.json(categoryData);
    }) .catch(err => {
        res.status(500).json(err)
    })
});

router.post('/', (req, res) => {

    Category.create(req.body)
    .then(categoryData => {
        res.status(200).json(categoryData)
    }) .catch(err => {
        res.status(500).json(err);
    })

});

router.put('/:id', (req, res) => {
    
    Category.update(req.body, {
        where: {
            id: req.params.id
        }
    }) .then(categoryData => {
        if(!categoryData) {
            res.status(404).json({message:'No category found'});
            return;
        } res.json(categoryData);
    }) .catch(err => {
        res.status(500).json(err)
    })
});

router.delete('/:id', (req, res) => {

    Category.destroy({
        where: {
            id: req.params.id
        }
    }) .then(categoryData => {
        if(!categoryData) {
            res.status(404).json({message:'No category found'})
            return;
        } rmSync.json(categoryData);
    }) .catch(err => {
        res.status(500).json(err)
    })

});

module.exports = router;