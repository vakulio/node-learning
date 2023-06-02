const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((prod) => {
      res.render("shop/product-list", {
        prods: prod,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((prod) => {
      res.render("shop/product-detail", {
        product: prod,
        pageTitle: prod.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((prod) => {
      res.render("shop/index", {
        prods: prod,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

// exports.getCart = (req, res, next) => {
//   req.user
//     .getCart()
//     .then((cart) => {
//       return cart
//         .getProducts()
//         .then((products) => {
//           res.render("shop/cart", {
//             path: "/cart",
//             pageTitle: "Your Cart",
//             products: products,
//           });
//         })
//         .catch((err) => console.log);
//     })
//     .catch((err) => console.log);
// };

// exports.postCart = (req, res, next) => {
//   const prodId = req.body.productId;
//   let newQuantity = 1;
//   let fetchedCart;
//   req.user
//     .getCart()
//     .then((cart) => {
//       fetchedCart = cart;
//       return cart
//         .getProducts({ where: { id: prodId } })
//         .then((products) => {
//           let product;
//           if (products.length > 0) {
//             product = products[0];
//           }

//           if (product) {
//             const oldQuantity = product.cartItem.quantity;
//             newQuantity = oldQuantity + 1;
//             return product;
//           }
//           return Product.findByPk(prodId);
//         })
//         .then((product) => {
//           return fetchedCart.addProduct(product, {
//             through: { quantity: newQuantity },
//           });
//         });
//     })
//     .then(() => {
//       res.redirect("/cart");
//     })
//     .catch((err) => console.log);
// };

// exports.postCardDeleteItem = (req, res, next) => {
//   const prodId = req.body.productId;
//   req.user
//     .getCart()
//     .then((cart) => {
//       return cart.getProducts({ where: { id: prodId } });
//     })
//     .then((products) => {
//       const product = products[0];
//       return product.cartItem.destroy();
//     })
//     .then(() => {
//       res.redirect("/cart");
//     })
//     .catch((err) => console.log(err));
// };

// exports.postCreateOrder = (req, res, next) => {
//   req.user
//     .getCart()
//     .then((cart) => {
//       return cart.getProducts();
//     })
//     .then((product) => {
//       req.user
//         .createOrder()
//         .then((order) => {
//           order.addProducts(
//             products.map((item) => {
//               item.orderItem = { quantity: item.cartItem.quantity };
//               return item;
//             })
//           );
//         })
//         .catch((err) => console.log(err));
//     })
//     .then(() => res.redirect("/orders"))
//     .catch((err) => console.log(err));
// };

// exports.getOrders = (req, res, next) => {
//   res.render("shop/orders", {
//     path: "/orders",
//     pageTitle: "Your Orders",
//   });
// };

// exports.getCheckout = (req, res, next) => {
//   res.render("shop/checkout", {
//     path: "/checkout",
//     pageTitle: "Checkout",
//   });
// };
