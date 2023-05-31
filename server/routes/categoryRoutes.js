const CategoryController = require('../controllers/categoryController');
const { authentication } = require('../middlewares/auth');

const router = require('express').Router();

router.get('/', CategoryController.categories);

router.get('/:id', CategoryController.categoriesWithPosts);

router.post('/',authentication, CategoryController.newCategory);

router.put('/:id',authentication,  CategoryController.editCategory);

router.delete('/:id',authentication,  CategoryController.deleteCategory);

module.exports = router;
