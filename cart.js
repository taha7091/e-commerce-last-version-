// Function to load the cart items from localStorage and display them
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');

    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <strong class="cart-item-name">${item.name}</strong>
                <p class="cart-item-price">$${item.price}</p>
                <div class="quantity-controls">
                    <button class="decrease-quantity" onclick="updateQuantity(${index}, -1)">-</button>
                    <span class="cart-item-quantity">${item.quantity}</span>
                    <button class="increase-quantity" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeItem(${index})">Remove</button>
            </div>
            <div class="item-total-price">$${(item.price * item.quantity).toFixed(2)}</div>
        `;
        cartItemsContainer.appendChild(itemDiv);

        totalPrice += item.price * item.quantity;
    });


    totalAmountElement.textContent = totalPrice.toFixed(2);
}

// Function to update the quantity of an item in the cart
function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart[index];


    item.quantity += change;


    if (item.quantity <= 0) {
        item.quantity = 1;
    }


    localStorage.setItem('cart', JSON.stringify(cart));

    displayCartItems();
}

// Function to remove an item from the cart
function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.splice(index, 1);


    localStorage.setItem('cart', JSON.stringify(cart));

    displayCartItems();
}


function checkout() {
    showAlert('Proceeding to checkout...');

}


if (document.getElementById('cart-items')) {
    displayCartItems();
}


document.getElementById('checkout-button').addEventListener('click', checkout);


function returnToProducts() {
    window.location.href = 'product.html';
}


function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        showAlert('Your cart is empty!');
        return;
    }


    localStorage.setItem('cartSummary', JSON.stringify(cart));


    window.location.href = 'checkout.html';
}
