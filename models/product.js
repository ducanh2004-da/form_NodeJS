const db = require('../utils/db');

const getAllProducts = (callback) => {
    db.query('SELECT * FROM products', callback);
};

const getProductById = (id,callback) =>{
    db.query('SELECT * FROM products WHERE ProID = ?',
        [id],callback)
}
const getProductByCat = (CatID,callback) =>{
    db.query('SELECT * FROM products WHERE CatID = ?',
        [CatID],callback)
}
const add = (newProduct,callback) =>{
    db.query('INSERT INTO products(ProName,TinyDes,FullDes,Price,Quantity) VALUE(?,?,?,?,?)',
        [newProduct.ProName,newProduct.TinyDes,newProduct.FullDes,newProduct.Price,newProduct.Quantity], callback);
}

const update = (id,Product,callback) =>{
    db.query('UPDATE products SET ProName = ?, TinyDes = ?, FullDes = ? WHERE ProID = ? ',
        [Product.ProName,Product.TinyDes,Product.FullDes,id],callback
    )
}

const deletes = (id,callback) =>{
    db.query('DELETE FROM products WHERE ProID = ?',
        [id],callback
    )
}

module.exports = {
    getAllProducts, 
    getProductById,
    getProductByCat,
    add,
    update,
    deletes
};

