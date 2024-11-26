// Function to load the cart items from localStorage and display them
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');

    cartItemsContainer.innerHTML = ''; // Clear the cart items section

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

        totalPrice += item.price * item.quantity; // Update total price
    });

    // Display total price
    totalAmountElement.textContent = totalPrice.toFixed(2);
}

// Function to update the quantity of an item in the cart
function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart[index];

    // Update quantity
    item.quantity += change;

    // Prevent negative quantities
    if (item.quantity <= 0) {
        item.quantity = 1;
    }

    // Save updated cart
    localStorage.setItem('cart', JSON.stringify(cart));

    // Reload the cart items display
    displayCartItems();
}

// Function to remove an item from the cart
function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Remove the item
    cart.splice(index, 1);

    // Save the updated cart
    localStorage.setItem('cart', JSON.stringify(cart));

    // Reload the cart items display
    displayCartItems();
}

// Checkout function (just a placeholder for now)
function checkout() {
    alert('Proceeding to checkout...');
    // Redirect to checkout page or implement the checkout process
}

// Initialize the cart page
if (document.getElementById('cart-items')) {
    displayCartItems();
}

// Add event listener for checkout button
document.getElementById('checkout-button').addEventListener('click', checkout);

// Function to navigate to the products page
function returnToProducts() {
    window.location.href = 'product.html'; // Replace with your actual product listing page URL
}

// Checkout function
function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Save cart summary to localStorage
    localStorage.setItem('cartSummary', JSON.stringify(cart));

    // Redirect to checkout page
    window.location.href = 'checkout.html';
}
