// Function to show custom alert messages
function showAlert(message) {
    const alertBox = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');
    const closeButton = document.getElementById('close-alert');

    if (!alertBox || !alertMessage || !closeButton) {
        console.error("Alert elements not found in the DOM.");
        return;
    }

    alertMessage.textContent = message;


    alertBox.classList.remove('hidden');
    alertBox.classList.add('visible');


    closeButton.onclick = () => {
        alertBox.classList.remove('visible');
        alertBox.classList.add('hidden');
    };


    alertBox.addEventListener('click', (event) => {
        if (event.target === alertBox) {
            alertBox.classList.remove('visible');
            alertBox.classList.add('hidden');
        }
    });
}


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

// Populate category options for the product form
function populateCategoryOptions() {
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    const categorySelect = document.getElementById("product-category");

    if (!categorySelect) return;

    categorySelect.innerHTML = "";


    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Select a category";
    defaultOption.value = "";
    categorySelect.appendChild(defaultOption);


    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// Add the product from the admin page and be shown in the product page
function addProduct() {
    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const imageUrl = document.getElementById('product-image').value;
    const category = document.getElementById('product-category').value;
    const price = document.getElementById('product-price').value;


    if (!name || !description || !imageUrl || !category || !price) {
        showAlert("Please fill out all product fields.");
        return;
    }

    const product = { name, description, imageUrl, category, price };


    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);


    localStorage.setItem('products', JSON.stringify(products));


    document.getElementById('product-form').reset();


    showAlert("Product added successfully!");


    displayAdminProducts();
}

// Display products in the admin page (this function will be called to refresh the list)
function displayAdminProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const adminProductList = document.getElementById('admin-product-list');
    adminProductList.innerHTML = '';

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


    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            removeProduct(index);
        });
    });
}


function removeProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    showAlert("Product removed successfully!");
    displayAdminProducts();
}


if (document.getElementById('admin-product-list')) {
    displayAdminProducts();
}

// Load products for the general product page
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


function removeProductFromPage(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));


    loadProducts();
    showAlert('Product removed successfully!');
}
