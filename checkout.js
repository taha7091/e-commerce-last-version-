document.addEventListener('DOMContentLoaded', () => {
    // Load cart summary
    const summaryItemsContainer = document.getElementById('summary-items');
    const totalPriceElement = document.getElementById('total-price-summary');
    const cartSummary = JSON.parse(localStorage.getItem('cartSummary')) || [];
    let totalPrice = 0;

    // Populate cart summary
    cartSummary.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('summary-item');
        itemDiv.innerHTML = `
            <strong>${item.name}</strong> - $${item.price} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}
        `;
        summaryItemsContainer.appendChild(itemDiv);
        totalPrice += item.price * item.quantity;
    });

    // Display total price
    totalPriceElement.innerHTML = `<strong>Total: $${totalPrice.toFixed(2)}</strong>`;

    // Complete Checkout
    document.getElementById('complete-checkout').addEventListener('click', () => {
        // Get the shipping information
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const zip = document.getElementById('zip').value;

        if (!name || !address || !city || !zip) {
            alert("Please fill in all shipping details before placing the order.");
            return;
        }

        // Save order details to localStorage
        const orderData = {
            customerName: name,
            address: `${address}, ${city}, ZIP: ${zip}`,
            orderDetails: cartSummary,
            totalPrice: totalPrice.toFixed(2),
        };

        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Reset the cart and checkout-related data
        localStorage.removeItem('cart');
        localStorage.removeItem('cartSummary');

        alert('Order placed successfully!');
        window.location.href = 'product.html'; // Redirect to admin page
    });

    // Reset Cart and Checkout
    document.getElementById('reset-cart').addEventListener('click', () => {
        // Remove only cart and checkout-related keys from localStorage
        localStorage.removeItem('cart');
        localStorage.removeItem('cartSummary');

        // Optionally redirect back to the cart page
        window.location.href = 'cart.html';
    });
});

document.getElementById("card-number").addEventListener("input", function (e) {
    let input = e.target.value;

    // Remove any non-numeric characters and existing spaces or dashes
    input = input.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();

    // Update the input value
    e.target.value = input;
});
