const Product = require('../../models/Product.model')

const createProduct = async (req, res, next) => {
    try {
        const details = req.body;
        if (!details.name || !details.description || !details.price || !details.category) {
            return res.status(400).json({
                error: 'Missing required product details',
                Msg: 'Insert all product details'
            });
        };
        let prevStock = await Product.findOne({ name: details.name });
        console.log(prevStock);
        if (prevStock) {
            return res.status(422).json({
                Msg: 'Product already exists'
            })
        }
        const product = new Product(details);
        product.save()
          .then(product => res.status(201).json({
            Msg: 'Product created successfully',
            product: {
                Name: product.name,
                Description: product.description,
                Price: product.price,
                Category: product.category,
            }
          }))
          .catch(err => next(err))
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            Msg: 'Server error, pls check back later'
        })
    }
}

const findAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}, {_id: 0, createdAt:0, updatedAt: 0, __v: 0});
        const noOfProducts = products.length // await Product.find({}).count();
        if (!products || noOfProducts < 1) {
            return res.status(404).json({
                Msg: 'No Stock available'
            });
        }
        return res.status(200).json({
            Msg: 'List of Stocks available',
            totalNoOfProducts: noOfProducts,
            allProducts: products
        })
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            Msg: 'Server error, pls check back later'
        })
    }
}

const findProduct = async (req, res) => {
    try {
        const productName = req.query.name
        const product = await Product.findOne({ name: { $regex: new RegExp(productName, 'i') }});
        if (!product) {
            return res.status(404).json({
                Msg: 'Stock not available'
            });
        }
        return res.status(200).json({
            Msg: 'Stock available',
            product: {
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
            }
        })
    } catch (error) {
        console.error(error.message);
        return res.status(404).json({
            Msg: 'Server error, pls check back later'
        })
    }
};

const editProduct = async (req, res) => {
    try {
        const productName = req.query.name
        const product = await Product.findOneAndUpdate(
            { name: { $regex: new RegExp(productName, 'i') }},
            req.body,
            { new: true });
        if (!product) {
            return res.status(404).json({
                Msg: 'Stock not available'
            });
        }
        return res.status(200).json({
            Msg: 'Stock updated',
            product: {
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
            }
        })
    } catch (error) {
        console.error(error.message);
        return res.status(404).json({
            Msg: 'Server error, pls check back later'
        })
    }
}

const delProduct = async function (req, res) {
    try {
        const productName = req.query.name
        console.log(productName);
        const product = await Product.findOneAndDelete({ name: { $regex: new RegExp(productName, 'i') }});
        if (!product) {
            return res.status(404).json({
                Msg: 'Stock not available'
            });
        }
        console.log(product);
        return res.status(200).json({
            Msg: 'Stock deleted'
        })
    } catch (error) {
        console.error(error.message);
        return res.status(404).json({
            Msg: 'Server error, pls check back later'
        })
    }
}

module.exports = {
    createProduct,
    findAllProducts,
    findProduct,
    editProduct,
    delProduct,
}
