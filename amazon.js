import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import{products, loadProducts} from '../data/products.js';
import { formatCurrency } from './utils/money.js';

loadProducts(renderProductsGrid);

function renderProductsGrid()  {
  let productsHTML = '';

  products.forEach((product) => {
      productsHTML +=`
      <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars*10}.png">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              $${formatCurrency(product.priceCents)}
            </div>

            <div class="product-quantity-container">
              <select class= "js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            ${product.extraInfoHTML()}
            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
      `;
  });


  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  function updateCartQuantity() {

  const cartQuantity = calculateCartQuantity();

    document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
  }

  updateCartQuantity();

  function timeOut(productId, button){
  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
  addedMessage.classList.add('added-to-cart-visible');


  if (button.dataset.timeoutId) {
    clearTimeout(button.dataset.timeoutId);
  };

  const timeoutId = setTimeout(() => {
    addedMessage.classList.remove('added-to-cart-visible');
  }, 2000);

  // Store the timeoutId in the button's dataset to be cleared on the next click

  button.dataset.timeoutId = timeoutId;  // Store timeoutId in button's dataset
  }

  document.querySelectorAll('.js-add-to-cart').forEach((button) => {

  button.addEventListener('click', ()=> {

    const {productId} = button.dataset; // 1) Identify which product is being clicked (productId converts to kebab case)

    addToCart(productId); //check function definition above for step 2, 3, and 4
    updateCartQuantity();
    timeOut(productId, button);

  });
  });
}

/* 1) Each iteration of the loop creates a new addedMessageTimeoutId variable in its own local 
scope (i.e., within the scope of that specific loop iteration).

2) Even though these variables have the same name (addedMessageTimeoutId), 
they are independent from each other because they exist in different scopes 
(each event listener's scope).

3) Closure refers to the fact that the event listener function will "remember" the specific scope 
of the variable (addedMessageTimeoutId) for the particular product. So when the event listener 
is triggered, it accesses and modifies the correct addedMessageTimeoutId for that product.*/
        

        
