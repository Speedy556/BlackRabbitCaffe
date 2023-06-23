if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var remove = document.getElementsByClassName("remove");
  for (var i = 0; i < remove.length; i++) {
    var button = remove[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInput = document.getElementsByClassName("quantity");
  for (var i = 0; i < quantityInput.length; i++) {
    var input = quantityInput[i];
    input.addEventListener("change", quantityChanged);
  }

  var addToCartBtns = document.getElementsByClassName("add-btn");
  for (var i = 0; i < addToCartBtns.length; i++) {
    var btn = addToCartBtns[i];
    btn.addEventListener("click", addToCartClicked);
  }

  var cartItems = JSON.parse(localStorage.getItem("cartItems"));
  if (cartItems) {
    for (var i = 0; i < cartItems.length; i++) {
      var cartItem = cartItems[i];
      addItemToCart(cartItem.title, cartItem.price, cartItem.img, cartItem.quantity);
    }
  }
  updateCartTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  var btn = event.target;
  var shopItem = btn.parentElement.parentElement.parentElement.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("card-title")[0].innerText;
  var price = shopItem.getElementsByClassName("product-price")[0].innerText;
  var img = shopItem.getElementsByClassName("card-img")[0].src;
  addItemToCart(title, price, img);
  updateCartTotal();
  var cartIcon = btn.parentElement.querySelector(".fa-basket-shopping");
  cartIcon.classList.replace("fa-basket-shopping", "fa-check");
  setTimeout(function () {
    cartIcon.classList.replace("fa-check", "fa-basket-shopping");
  }, 1500);
}

function addItemToCart(title, price, img) {
  var cartRow = document.createElement("div");
  var cartItem = document.querySelector(".cart");
  if (!cartItem) {
    return;
  }

  var cartItemNames = cartItem.getElementsByClassName("cart-item-name");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      showAlert(" Acest produs a fost deja adăugat! ");
      return;
    }
  }
  var cartRowContent = ` 
    <div class="cart-item">
    <img src="${img}" class="cart-item-img">
    <span class="cart-item-name">${title}</span>
    <span class="cart-item-price">${price}</span>
    <span class="cart-item-quantity">
      <input type="number" class="quantity" name="quantity"  value="1">
    </span>
        <div class="remove">
      <i class='bx bxs-trash-alt'></i>
    </div>
  </div> `;
  cartRow.innerHTML = cartRowContent;
  cartItem.append(cartRow);
  cartRow.querySelector(".remove").addEventListener("click", removeCartItem);
  cartRow.querySelector(".quantity").addEventListener("change", quantityChanged);
  var cartItems = [];
  var cartItemRows = document.getElementsByClassName("cart-item");
  for (var i = 0; i < cartItemRows.length; i++) {
    var cartItemRow = cartItemRows[i];
    var cartItemName = cartItemRow.getElementsByClassName("cart-item-name")[0].innerText;
    var cartItemPrice = cartItemRow.getElementsByClassName("cart-item-price")[0].innerText;
    var cartItemImg = cartItemRow.getElementsByClassName("cart-item-img")[0].src;
    var cartItemQuantity = cartItemRow.getElementsByClassName("quantity")[0].value;
    cartItems.push({
      title: cartItemName,
      price: cartItemPrice,
      img: cartItemImg,
      quantity: cartItemQuantity,
    });
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function showAlert() {
  var customAlert = document.getElementById("customAlert");
  customAlert.classList.add("show");
  setTimeout(function () {
    customAlert.classList.remove("show");
  }, 2000);
}

function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName("cart")[0];
  if (!cartItemContainer) {
    return;
  }
  let cartItems = cartItemContainer.getElementsByClassName("cart-item");
  total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    let cartItem = cartItems[i];
    let priceElement = cartItem.getElementsByClassName("cart-item-price")[0];
    let quantityElement = cartItem.getElementsByClassName("quantity")[0];
    if (!priceElement || !quantityElement) {
      continue;
    }
    let price = parseFloat(priceElement.innerText.replace("MDL", " "));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText = "Comandă " + total + " MDL";
  let cartItemsArray = [];
  for (let i = 0; i < cartItems.length; i++) {
    let cartItem = cartItems[i];
    let title = cartItem.getElementsByClassName("cart-item-name")[0].innerText;
    let price = cartItem.getElementsByClassName("cart-item-price")[0].innerText;
    let img = cartItem.getElementsByClassName("cart-item-img")[0].src;
    let quantity = cartItem.getElementsByClassName("quantity")[0].value;
    let cartItemObj = { title, price, img, quantity };
    cartItemsArray.push(cartItemObj);
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItemsArray));
}

   
