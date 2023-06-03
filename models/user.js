const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
            }
        }]
    },
})

userSchema.methods.addToCart = function (product) {
    const existingProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    });
    const updatedCartItems = [...this.cart.items];

    if (existingProductIndex >= 0) {
        updatedCartItems[existingProductIndex].quantity = updatedCartItems[existingProductIndex].quantity + 1;
    } else {
        updatedCartItems.push({ productId: product._id, quantity: 1 });
    }
    const updatedCart = { items: updatedCartItems };
    this.cart = updatedCart;
    return this.save();
}

userSchema.methods.removeFromCart = function (productId) {
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString();
    })
    this.cart.items = updatedCartItems;
    return this.save();
}

userSchema.methods.clearCart = function (productId) {
    this.cart = { items: [] };
    return this.save();
}


module.exports = mongoose.model('User', userSchema);

