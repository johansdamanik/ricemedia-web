const PostController = require('../controllers/postController');
const { authentication, authorization } = require('../middlewares/auth');

const router = require('express').Router();

router.get('/', PostController.posts);

router.get('/:id', PostController.postDetail);

router.post('/', authentication, PostController.newPost);

router.put('/:id', authentication, authorization, PostController.editPost);

router.delete('/:id', authentication, authorization, PostController.deletePost);

module.exports = router;
