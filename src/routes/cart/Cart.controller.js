const { Cart } = require('../../models/Cart.model');
const Product = require('../../models/Product.model');

const addToCart = async (req, res) => {
    const userId = req.session.userID//req.headers['user-id'];

    // Check if the user's cart exists
    Cart.findOne({ userId })
      .then(async (cart) => {
        if (!cart) {
          // Create a new cart for the user if it doesn't exist
          const newCart = await new Cart({ userId, products: [] });
          return await newCart.save();
        }
        return cart;
      })
      .then((cart) => {
          // Attach the cart to the request object for future use
          req.cart = cart;

          const productId = req.body.productId;
          // Find the product by ID
          Product.findById(productId)
          .then(async (product) => {
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            // Add the product to the user's cart
            req.cart.products.push(product);
            return req.cart.save();
            })
            .then(() => {
                res.json({ message: 'Product added to cart successfully' });
            });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Internal server error' });
        });
}

const getCart = async (req, res) => {
    const userId = req.session.userID//req.headers['user-id'];

    const cart = await Cart.findOne({ userId }).populate({
        path: 'products',
        select: '-createdAt -updatedAt -__v'
    });
    if (!cart || cart.products.length === 0) {
        return res.status(404).json({
            Msg: 'Cart Empty'
        });
    }
    return res.status(200).json({
        noOfItems: cart.products.length,
        Cart: cart.products
    });
}

const removeCart = async (req, res) => {
    try {
        const userId = req.session.userID;

        const cart = await Cart.findOne({ userId });
        if (!cart || cart.products.length === 0) {
            return res.status(404).json({
                Msg: 'Cart Empty'
            });
        }
        const item = req.query.product;
        const newCart = ((cart.products)).filter(product => (product).toString() !== item.toString());
        console.log(newCart);
        cart.products = newCart;
        await cart.save()
        .then(() => res.status(201).json({
            Msg: `${item} removed successfully`
        }));
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            Msg: 'Server Error'
        });
    };
}

module.exports = {
    addToCart,
    getCart,
    removeCart,
}