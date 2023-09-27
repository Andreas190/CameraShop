 (document.readyState == 'loading') 
 document.addEventListener('DOMContentLoaded', ready)

function ready() {
    let removeCartItemButtons = document.getElementsByClassName('remove-item-btn')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        const button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    let quantityInputs = document.getElementsByClassName('cart-product-quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        const input = quantityInputs[i]
        input.addEventListener('change', function(event) {
            quantityChanged(event);
        });
    }

    let addToCartButtons = document.getElementsByClassName('add-to-btn')
    for (var i = 0; i < addToCartButtons.length; i++) {
        const button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

}
//Radera produkt från kundvagn
function removeCartItem(){
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}
//Hanterar/kontrollerar förändring i kvantitet
function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}
//Hanterar "add-to-cart" klick
function addToCartClicked(event) {
    let button = event.target
    let productItem = button.parentElement.parentElement
    let title = productItem.getElementsByClassName('product-item-title')[0].innerText
    let price = productItem.getElementsByClassName('product-item-price')[0].innerText
    addItemToCart(title,price)
    updateCartTotal()
}
//Lägger till produkten i kundvagn
function addItemToCart(title, price) {
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');

    let cartRowContents = `
        <div class="cart-item">
            <span class="cart-product-title">${title}</span>
        </div>
        <div class="cart-product-price">${price}</div>
        <div class="cart-quantity-input">
            <input class="cart-product-quantity" type="number" value="1">
            <button class="remove-item-btn">Remove</button>
        </div>
    `;

    cartRow.innerHTML = cartRowContents;
    let cartItemsContainer = document.getElementsByClassName('cart-items')[0];
    cartItemsContainer.appendChild(cartRow);
    cartRow.getElementsByClassName('remove-item-btn')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-product-quantity')[0].addEventListener('change', quantityChanged);

    updateCartTotal();
}
//Uppdatera kundvagn
function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0];
    let cartRows = cartItemContainer.getElementsByClassName('cart-row');
    let total = 0;

    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('cart-product-price')[0];
        let quantityElement = cartRow.getElementsByClassName('cart-product-quantity')[0];
 
        if (quantityElement) {
            let price = parseFloat(priceElement.innerText.replace('$', ''));
            let quantity = quantityElement.value;
            total += price * quantity;
        }
    }
    
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}

