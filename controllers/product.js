const Product = require('../models/product');
const Category =require('../models/category');

module.exports.UserFunc = async(req,res)=>{
    res.render('products/show', { 
        title: 'Danh sách sản phẩm', 
        items: [
            { name: 'bàn', color: 'blue' },
            { name: 'ghế', color: 'red' },
            { name: 'sofa', color: 'green' }
        ]
    });
}

module.exports.getAllProducts = (req,res)=>{
    Product.getAllProducts((err,products)=>{
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Lấy danh sách danh mục
        Category.getAllCategories((err, categories) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
        res.render('products/show',{products,categories})
        })
    })
}

module.exports.getProductsByCategory = (req,res)=>{
    const CatID = req.params.CatID;
    Product.getProductByCat(CatID,(err,products)=>{
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        Category.getAllCategories((err, categories) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.render('products/show',{products,categories})
        })
    })

}

module.exports.addProduct = (req,res) =>{
    const newProduct = req.body;
    if (!newProduct || !newProduct.ProName || !newProduct.TinyDes || !newProduct.FullDes || !newProduct.Price || !newProduct.Quantity) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    Product.add(newProduct,(err)=>{
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.redirect('/product');
    })
}

module.exports.showEdit = (req,res) =>{
    const id = req.params.id;
    Product.getProductById(id,(err,product)=>{
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.render('products/edit',{product: product[0]})
    })
}
module.exports.Edit = (req,res) =>{
    const id = req.params.id;
    const product = req.body;
    Product.update(id,product,(err)=>{
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.redirect('/product');
    })
}
module.exports.Delete = (req,res) =>{
    const id = req.params.id;
    Product.deletes(id,(err)=>{
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.redirect('/product');
    })
}
module.exports.Detail = (req,res) =>{
    const id = req.params.id;
    Product.getProductById(id,(err,product)=>{
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.render('products/detail',{product: product[0]})
    })
}
