const User = require('../models/user');
const Category = require('../models/category');
const Post =require('../models/post');

module.exports.showAll = (req,res) =>{
    User.getAllUser((err,users)=>{
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Lấy danh sách danh mục
        Category.getAllCategories((err, categories) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            Post.getAllPosts((err, posts) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
            res.render('admin/home',{posts,users,categories})
        })
    })
}
)}
module.exports.viewPost = (req,res) =>{
    Post.getAllPosts((err, posts) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
    res.render('admin/showPost',{posts: posts[0]});
    })
}
module.exports.viewEditCategory = (req,res) =>{
    res.render('admin/editCategory',{ layout:false });
}
module.exports.addCategory = (req,res) =>{
    res.render('admin/addCategory', { layout:false });
}
module.exports.viewUser = (req,res) =>{
    const id = req.params.id;
    User.findById(id,(err,users)=>{
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.render('admin/showUser',{users: users[0]})
    })
}
