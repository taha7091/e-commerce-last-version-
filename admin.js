
// fuction to display the category on the admin page with remove button
function displayAdminCategories() {
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    const adminCategoryList = document.getElementById("admin-category-list");

    if (!adminCategoryList) return;

    adminCategoryList.innerHTML = "";


    const ul = document.createElement("ul");
    categories.forEach((category, index) => {
        const li = document.createElement("li");
        li.textContent = category;


        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.style.marginLeft = "10px";
        removeButton.onclick = () => removeCategory(index);

        li.appendChild(removeButton);
        ul.appendChild(li);
    });

    adminCategoryList.appendChild(ul);
    populateCategoryOptions(); // Update the dropdown 
}

// add a category from the admin page
function addCategory() {
    const categoryName = document.getElementById("category-name").value.trim();

    if (!categoryName) {
        showAlert("Please enter a category name.");
        return;
    }

    //local storage 
    let categories = JSON.parse(localStorage.getItem("categories")) || [];


    if (categories.includes(categoryName)) {
        showAlert("This category already exists.");
        return;
    }

    categories.push(categoryName);
    localStorage.setItem("categories", JSON.stringify(categories));


    document.getElementById("category-name").value = "";
    displayAdminCategories();
    showAlert("Category added successfully!");
}

//  remove a category by its index
function removeCategory(index) {
    let categories = JSON.parse(localStorage.getItem("categories")) || [];


    categories.splice(index, 1);
    localStorage.setItem("categories", JSON.stringify(categories));


    displayAdminCategories();
    showAlert("Category removed successfully!");
}


if (document.getElementById("home-category-list")) {
    displayCategories();
}


if (document.getElementById("admin-category-list")) {
    displayAdminCategories();
}


document.addEventListener('DOMContentLoaded', () => {
    // Example product data
    const sampleProducts = [
        { name: 'Product 1', price: 100, imageUrl: 'product1.jpg', description: 'Detailed description of Product 1', category: 'Category 1' },
        { name: 'Product 2', price: 150, imageUrl: 'product2.jpg', description: 'Detailed description of Product 2', category: 'Category 1' },
        { name: 'Product 3', price: 200, imageUrl: 'product3.jpg', description: 'Detailed description of Product 3', category: 'Category 2' },
    ];

    // Store sample products in localStorage if not already present
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(sampleProducts));
    }

    displayAdminProducts();
    enableSmoothScroll(); // Enable smooth scrolling after products are displayed
});

// Function to display products dynamically and update categories
function displayAdminProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productList = document.getElementById('product-list');
    const sidebar = document.querySelector('.sidebar ul'); // Sidebar list for categories

    // Group products by category
    const categories = {};
    products.forEach(product => {
        if (!categories[product.category]) {
            categories[product.category] = [];
        }
        categories[product.category].push(product);
    });

    // Add categories to the sidebar
    Object.keys(categories).forEach(category => {
        const categoryItem = document.createElement('li');
        const categoryLink = document.createElement('a');
        categoryLink.textContent = category;
        categoryLink.href = `#${category}`; // Link to filtered product section by category ID
        categoryItem.appendChild(categoryLink);
        sidebar.appendChild(categoryItem);
    });

    // Create a section for each category
    Object.keys(categories).forEach(category => {
        const categorySection = document.createElement('div');
        categorySection.classList.add('category-section');
        categorySection.id = category; // Set the ID to match the sidebar link

        const categoryHeader = document.createElement('h2');
        categoryHeader.classList.add('category-header');
        categoryHeader.textContent = category;
        categorySection.appendChild(categoryHeader);

        const categoryProductRow = document.createElement('div');
        categoryProductRow.classList.add('category-product-row');

        categories[category].forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
                <div class="product-details">
                    <strong class="product-name">${product.name}</strong>
                    <p class="product-price">$${product.price}</p>
                    <button class="purchase-button">Purchase</button>
                </div>
            `;

            // Add event listener for product popup
            productDiv.addEventListener('click', event => {
                if (!event.target.classList.contains('purchase-button')) {
                    showProductPopup(product);
                }
            });

            // Add event listener for purchase button
            const purchaseButton = productDiv.querySelector('.purchase-button');
            purchaseButton.addEventListener('click', event => {
                event.stopPropagation(); // Prevent the popup from opening
                purchaseProduct(product.name);
            });

            categoryProductRow.appendChild(productDiv);
        });

        categorySection.appendChild(categoryProductRow);
        productList.appendChild(categorySection);
    });

    // Add the popup HTML structure to the document
    addPopupStructure();
}

// Function to display the popup with product details
function showProductPopup(product) {
    const popup = document.getElementById('product-popup');
    const popupImage = document.getElementById('popup-image');
    const popupName = document.getElementById('popup-name');
    const popupDescription = document.getElementById('popup-description');
    const popupPrice = document.getElementById('popup-price');

    // Populate popup with product details
    popupImage.src = product.imageUrl;
    popupName.textContent = product.name;
    popupDescription.textContent = product.description || 'No description available.';
    popupPrice.textContent = `$${product.price}`;

    // Show popup
    popup.style.display = 'flex';
}

// Function to hide the popup
function hideProductPopup() {
    const popup = document.getElementById('product-popup');
    popup.style.display = 'none';
}

// Add the popup HTML structure dynamically to the page
function addPopupStructure() {
    const popupDiv = document.createElement('div');
    popupDiv.id = 'product-popup';
    popupDiv.classList.add('popup');
    popupDiv.style.display = 'none'; // Hidden by default
    popupDiv.innerHTML = `
        <div class="popup-content">
            <button class="close-button">X</button>
            <img id="popup-image" src="" alt="Product Image">
            <h3 id="popup-name"></h3>
            <p id="popup-description"></p>
            <p id="popup-price"></p>
        </div>
    `;
    document.body.appendChild(popupDiv);

    // Add event listener to the close button
    const closeButton = document.querySelector('.close-button');
    closeButton.addEventListener('click', hideProductPopup);
}

// Function to enable smooth scrolling for category navigation
function enableSmoothScroll() {
    const sidebarLinks = document.querySelectorAll('.sidebar ul a');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior

            const targetId = link.getAttribute('href').substring(1); // Get the category ID
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Function to show an alert message
function showAlert(message) {
    const alertBox = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');
    const closeButton = document.getElementById('close-alert');

    // Set the alert message
    alertMessage.textContent = message;

    // Show the alert
    alertBox.classList.remove('hidden');
    alertBox.classList.add('visible');

    // Close alert on button click
    closeButton.addEventListener('click', () => {
        alertBox.classList.remove('visible');
        alertBox.classList.add('hidden');
    });

    // Optional: Close alert when clicking outside the alert content
    alertBox.addEventListener('click', (event) => {
        if (event.target === alertBox) {
            alertBox.classList.remove('visible');
            alertBox.classList.add('hidden');
        }
    });
}

// Function to add products to the cart
function purchaseProduct(productName) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.name === productName);

    if (!product) {
        showAlert('Product not found.');
        return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    showAlert(`${product.name} has been added to your cart!`);
};
