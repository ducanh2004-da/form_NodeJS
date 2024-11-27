const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin');

router.get('/',AdminController.showAll);
router.get('/post/detail',AdminController.viewPost);
// router.post('/admin/post/:id/accept',AdminController.acceptPost);
// router.post('/admin/post/:id/notaccept',AdminController.notAcceptPost);
router.get('/category/id/edit',AdminController.viewEditCategory);
// router.post('/admin/category/:id/delete',AdminController.deleteCategory);
router.get('/category/create',AdminController.addCategory);
router.get('/:id/detailUser',AdminController.viewUser);
module.exports = router;