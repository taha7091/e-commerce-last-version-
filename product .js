function showAlert(message) {
    const alertBox = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');
    const closeButton = document.getElementById('close-alert');

    if (!alertBox || !alertMessage || !closeButton) {
        console.error("Alert elements not found in the DOM.");
        return;
    }

    // Set the alert message
    alertMessage.textContent = message;

    // Show the alert
    alertBox.classList.remove('hidden');
    alertBox.classList.add('visible');

    // Add event listener for the close button
    closeButton.onclick = () => {
        alertBox.classList.remove('visible');
        alertBox.classList.add('hidden');
    };

    // Optional: Close the alert by clicking outside the content
    alertBox.addEventListener('click', (event) => {
        if (event.target === alertBox) {
            alertBox.classList.remove('visible');
            alertBox.classList.add('hidden');
        }
    });
}

//display categories for the homepage without the removebutton
function displayCategories() {
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    const categoryList = document.getElementById("home-category-list") || document.getElementById("admin-category-list");

    if (!categoryList) return;

    categoryList.innerHTML = "";

    const ul = document.createElement("ul");
    categories.forEach(category => {
        const li = document.createElement("li");
        li.textContent = category;
        ul.appendChild(li);
    });

    categoryList.appendChild(ul);

    populateCategoryOptions();
}

// select option 
function populateCategoryOptions() {
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    const categorySelect = document.getElementById("product-category");

    if (!categorySelect) return;

    categorySelect.innerHTML = ""; // Clear previous options

    //  default "Select a category" option
    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Select a category";
    defaultOption.value = "";
    categorySelect.appendChild(defaultOption);

    // Add categories as options in the <select> element
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// add the product from the admin page and be shown in the productpage 
function addProduct() {
    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const imageUrl = document.getElementById('product-image').value;
    const category = document.getElementById('product-category').value;
    const price = document.getElementById('product-price').value;

    const product = { name, description, imageUrl, category, price };

    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));

    document.getElementById('product-form').reset();
    showAlert("Product added successfully!");

    if (!name || !description || !imageUrl || !category || !price) {
        showAlert("Please fill out all product fields.");
        return;
    }
    document.getElementById('product-form').reset(); // Reset the form after removing a product


    displayAdminProducts();

}

// display the product with a remove button
function displayAdminProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const adminProductList = document.getElementById('admin-product-list');
    adminProductList.innerHTML = ''; // Clear the list before rendering

    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('admin-product-item');
        productDiv.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
            <div class="product-details">
                <strong class="product-name">${product.name}</strong>
                <span class="product-category">${product.category}</span>
                <p class="product-price">$${product.price}</p>
            </div>
            <button class="remove-button" data-index="${index}">Remove</button>
        `;
        adminProductList.appendChild(productDiv);
    });

    // Add event listeners to all "Remove" buttons
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            removeProduct(index); // Call the removeProduct function
        });
    });
}

function removeProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1); // Remove the product from the array
    localStorage.setItem('products', JSON.stringify(products)); // Update localStorage
    showAlert("Product removed successfully!");
    displayAdminProducts(); // Re-render the product list

}

// Ensure products are displayed when the page loads
if (document.getElementById('admin-product-list')) {
    displayAdminProducts();
}

function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const adminProductList = document.getElementById('admin-product-list');
    adminProductList.innerHTML = '';

    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <img src="${product.imageUrl}" alt="${product.name}" width="100" />
        <p>Category: ${product.category}</p>
        <p>Price: $${product.price}</p>
        <button onclick="removeProduct(${index})">Remove Product</button>
      `;
        adminProductList.appendChild(productDiv);
    });
}

// Remove a product from the list
function removeProduct(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));

    // Reload the product display
    loadProducts();
    showAlert('Product removed successfully!');
}

