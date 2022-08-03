import getProductData from './api/getProductData.js';
import ProductList from './components/ProductList.js';
import ShoppingCartList from './components/ShoppingCartList.js';
// 이 곳에 정답 코드를 작성해주세요.

const $productCardGrid = document.getElementById('product-card-grid');
const $shoppingCart = document.getElementById('shopping-cart');
const $backdrop = document.getElementById('backdrop');
const $openCartBtn = document.getElementById('open-cart-btn');
const $closeCartBtn = document.getElementById('close-cart-btn');
const $cartList = document.getElementById('cart-list');
const $paymentBtn = document.getElementById('payment-btn');

let products = [];
const initialCartList = localStorage.getItem('cartList')
  ? JSON.parse(localStorage.getItem('cartList'))
  : [];
const productList = new ProductList($productCardGrid, []);
const shoppingCart = new ShoppingCartList($cartList, initialCartList);
const fetchProductData = async () => {
  const result = await getProductData();
  productList.setState(result);
  products = result;
};
fetchProductData();

const toggleShoppingCart = () => {
  $backdrop.hidden = !$backdrop.hidden;
  $shoppingCart.classList.toggle('translate-x-0');
  $shoppingCart.classList.toggle('translate-x-full');
};

const addCartItem = (e) => {
  const clickedProduct = products.find(
    (product) => product.id == e.target.dataset.productid
  );
  if (!clickedProduct) return;
  shoppingCart.addCartItem(clickedProduct);
  toggleShoppingCart();
};

const controlCartItem = (e) => {
  const currentItem = parseInt(e.target.closest('li').id);
  switch (e.target.className) {
    case 'increase-btn':
      shoppingCart.increaseItem(currentItem);
      break;
    case 'decrease-btn':
      shoppingCart.decreaseItem(currentItem);
      break;
    case 'remove-btn':
      shoppingCart.removeCartItem(currentItem);
      break;
    default:
      return;
  }
};

const saveToLocalStorage = () => {
  shoppingCart.saveToLocalStorage();
};
$backdrop.addEventListener('click', toggleShoppingCart);
$openCartBtn.addEventListener('click', toggleShoppingCart);
$closeCartBtn.addEventListener('click', toggleShoppingCart);
$productCardGrid.addEventListener('click', addCartItem);
$cartList.addEventListener('click', controlCartItem);
$paymentBtn.addEventListener('click', saveToLocalStorage);
