document.addEventListener('DOMContentLoaded', () => {

    const summaryItemsContainer = document.getElementById('summary-items');
    const totalPriceElement = document.getElementById('total-price-summary');
    const cartSummary = JSON.parse(localStorage.getItem('cartSummary')) || [];
    let totalPrice = 0;


    cartSummary.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('summary-item');
        itemDiv.innerHTML = `
            <strong>${item.name}</strong> - $${item.price} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}
        `;
        summaryItemsContainer.appendChild(itemDiv);
        totalPrice += item.price * item.quantity;
    });


    totalPriceElement.innerHTML = `<strong>Total: $${totalPrice.toFixed(2)}</strong>`;


    document.getElementById('complete-checkout').addEventListener('click', () => {

        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const zip = document.getElementById('zip').value;

        if (!name || !address || !city || !zip) {
            alert("Please fill in all shipping details before placing the order.");
            return;
        }


        const orderData = {
            customerName: name,
            address: `${address}, ${city}, ZIP: ${zip}`,
            orderDetails: cartSummary,
            totalPrice: totalPrice.toFixed(2),
        };

        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));


        localStorage.removeItem('cart');
        localStorage.removeItem('cartSummary');

        alert('Order placed successfully!');
        window.location.href = 'product.html';
    });


    document.getElementById('reset-cart').addEventListener('click', () => {

        localStorage.removeItem('cart');
        localStorage.removeItem('cartSummary');


        window.location.href = 'cart.html';
    });
});

document.getElementById("card-number").addEventListener("input", function (e) {
    let input = e.target.value;


    input = input.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();


    e.target.value = input;
});
