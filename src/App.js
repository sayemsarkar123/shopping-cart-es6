const App = {};
App.getElementById = (id) => document.getElementById(id);
App.products = [
  {
    id: 1,
    name: "Brocolli - 1 Kg",
    price: 120,
    image:
      "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/broccoli.jpg",
    category: "vegetables"
  },
  {
    id: 2,
    name: "Cauliflower - 1 Kg",
    price: 60,
    image:
      "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cauliflower.jpg",
    category: "vegetables"
  },
  {
    id: 3,
    name: "Cucumber - 1 Kg",
    price: 48,
    image:
      "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cucumber.jpg",
    category: "vegetables"
  },
  {
    id: 4,
    name: "Beetroot - 1 Kg",
    price: 32,
    image:
      "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/beetroot.jpg",
    category: "vegetables"
  },
  {
    id: 5,
    name: "Carrot - 1 Kg",
    price: 56,
    image:
      "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/carrots.jpg",
    category: "vegetables"
  },
  {
    id: 6,
    name: "Tomato - 1 Kg",
    price: 16,
    image:
      "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/tomato.jpg",
    category: "vegetables"
  },
  {
    id: 7,
    name: "Beans - 1 Kg",
    price: 82,
    image:
      "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/beans.jpg",
    category: "vegetables"
  },
  {
    id: 8,
    name: "Brinjal - 1 Kg",
    price: 35,
    image:
      "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/brinjal.jpg",
    category: "vegetables"
  },
  {
    id: 9,
    name: "Capsicum",
    price: 60,
    image:
      "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/capsicum.jpg",
    category: "vegetables"
  },
  {
    id: 10,
    name: "Mushroom - 1 Kg",
    price: 75,
    image:
      "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/button-mushroom.jpg",
    category: "vegetables"
  },
  {
    id: 11,
    name: "Potato - 1 Kg",
    price: 22,
    image:
      "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/potato.jpg",
    category: "vegetables"
  },
  {
    id: 12,
    name: "Pumpkin - 1 Kg",
    price: 48,
    image:
      "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/pumpkin.jpg",
    category: "vegetables"
  }
];
App.displayProducts = function () {
  const products = this.updateProductsFromLS();
  let productsHTMLElement = "";
  for (const { id, name, price, image, quantity = 1 } of products)
    productsHTMLElement += `
                                 <div class="col-md-4">
                                   <div>
                                    <div>
                                      <img class="img-fluid" src=${image} alt="">
                                    </div>
                                    <div class="text-center">
                                      <h6 class="text-secondary mt-2">${name}</h6>
                                      <h4 class="font-weight-bold text-secondary my-2">&#8377 ${price}</h4>
                                      <div class="d-flex align-items-center justify-content-center my-3">

                                        <button onclick="App.cartOperation(${id}, 'decrement')" style="font-size: 2rem" class="font-weight-bold bg-white border-0">-</button>
                                        <input class="form-control w-50 mx-2 font-weight-bold text-center" type="text" value=${quantity}>
                                        <button onclick="App.cartOperation(${id}, 'increment')" style="font-size: 2rem" class="font-weight-bold bg-white border-0">+</button>
                                      </div>
                                      <button onclick="App.cartOperation(${id}, 'increment')" class="btn btn-success btn-block rounded-0">ADD TO CART</button>
                                    </div>
                                  </div>
                                </div>
                               `;
  this.getElementById("products-list").innerHTML = productsHTMLElement;
};
App.getProductsFromLS = function () {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};
App.updateProductsFromLS = function () {
  const cartProducts = this.getProductsFromLS();
  return this.products.map((storeProduct) => {
    const product = cartProducts.find(
      (cartProduct) => cartProduct.id === storeProduct.id
    );
    if (product) return product;
    return storeProduct;
  });
};
App.cartOperation = function (id, operation) {
  id = +id;
  const cartProducts = this.getProductsFromLS();
  if (operation === "increment") {
    const product =
      cartProducts.find((product) => product.id === id) ||
      this.products.find((product) => product.id === id);
    product.quantity
      ? (product.quantity += 1)
      : cartProducts.push({ ...product, quantity: 1 });
  } else if (operation === "decrement") {
    const product = cartProducts.find((product) => product.id === id);
    if (product?.quantity > 1) product.quantity -= 1;
  } else if (operation === "delete") {
    cartProducts.forEach((product, index) =>
      product.id === id ? cartProducts.splice(index, 1) : null
    );
  }
  localStorage.setItem("cart", JSON.stringify(cartProducts));
  this.displayProducts();
  this.displayProductsCart();
};
App.displayProductsCart = function () {
  let cartProductsHTMLElement = "";
  const cartProducts = this.getProductsFromLS();
  for (const { id, name, price, quantity, image } of cartProducts)
    cartProductsHTMLElement += `
                                   <div class="col-md-12">
                                      <div class="row align-items-center">
                                        <div class="col-md-2">
                                          <div>
                                            <img class="img-fluid" src=${image} alt="">
                                          </div>
                                        </div>
                                        <div class="col-md-5">
                                          <div>
                                            <h6 class="text-secondary mb-1">${name}</h6>
                                            <h6 class="text-secondary mb-0">&#8377 ${price}</h6>
                                          </div>
                                        </div>
                                        <div class="col-md-3">
                                          <div>
                                            <h6 class="text-secondary mb-1">${quantity} No${
      quantity > 1 ? "s" : ""
    }.</h6>
                                            <h6 class="mb-0">&#8377 ${
                                              price * quantity
                                            }</h6>
                                          </div>
                                        </div>
                                        <div class="col-md-2">
                                          <div>
                                            <button onclick="App.cartOperation(${id}, 'delete')" class="bg-white border-0">X</button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                   `;
  this.getElementById("cart-list").innerHTML = cartProductsHTMLElement;
};
App.onload = function () {
  this.displayProducts();
  this.displayProductsCart();
};
