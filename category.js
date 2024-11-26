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


function addCategory() {
    const categoryName = document.getElementById('category-name').value;
    if (categoryName) {
        const categories = JSON.parse(localStorage.getItem('categories')) || [];
        categories.push(categoryName);
        localStorage.setItem('categories', JSON.stringify(categories));
        loadCategories();
    }
}

// Load the categories from localStorage and display them in the category list
function loadCategories() {
    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    const categorySelect = document.getElementById('product-category');
    const adminCategoryList = document.getElementById('admin-category-list');

    // Populate the category dropdown
    categorySelect.innerHTML = '';
    categories.forEach((category) => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });

    // Display existing categories in the admin category list
    adminCategoryList.innerHTML = '';
    categories.forEach((category) => {
        const categoryItem = document.createElement('div');
        categoryItem.textContent = category;
        adminCategoryList.appendChild(categoryItem);
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
        showAlertalert("Please enter a category name.");
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
