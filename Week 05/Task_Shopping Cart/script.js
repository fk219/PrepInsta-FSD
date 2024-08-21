// Select the HTML elements for the product list, cart list, cart icon, cart item count span, body, and close cart button
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');

// Initialize empty arrays for products and cart
let products = [];
let cart = [];

// Event listener to toggle the visibility of the cart when the cart icon is clicked
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

// Event listener to toggle the visibility of the cart when the close button is clicked
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

// Function to add product data to the HTML
const addDataToHTML = () => {
    // Check if there are products to add
    if(products.length > 0) {
        // Iterate through each product
        products.forEach(product => {
            // Create a new div element for the product
            let newProduct = document.createElement('div');
            // Set a data attribute with the product id
            newProduct.dataset.id = product.id;
            // Add the 'item' class to the div
            newProduct.classList.add('item');
            // Set the inner HTML of the new product div
            newProduct.innerHTML = 
            `<img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>
            <button class="addCart">Add To Cart</button>`;
            // Append the new product div to the product list
            listProductHTML.appendChild(newProduct);
        });
    }
}

// Event listener for clicks on the product list
listProductHTML.addEventListener('click', (event) => {
    // Get the clicked element
    let positionClick = event.target;
    // Check if the clicked element is an 'Add To Cart' button
    if(positionClick.classList.contains('addCart')){
        // Get the id of the product from the parent element's data attribute
        let id_product = positionClick.parentElement.dataset.id;
        // Add the product to the cart
        addToCart(id_product);
    }
});

// Function to add a product to the cart
const addToCart = (product_id) => {
    // Find the index of the product in the cart
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    // Check if the cart is empty
    if(cart.length <= 0){
        // Add the product to the cart with a quantity of 1
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    } else if(positionThisProductInCart < 0){
        // If the product is not already in the cart, add it with a quantity of 1
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        // If the product is already in the cart, increase the quantity by 1
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    // Update the cart in the HTML and in local storage
    addCartToHTML();
    addCartToMemory();
}

// Function to save the cart to local storage
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to update the cart in the HTML
const addCartToHTML = () => {
    // Clear the current cart HTML
    listCartHTML.innerHTML = '';
    // Initialize the total quantity to 0
    let totalQuantity = 0;
    // Check if there are items in the cart
    if(cart.length > 0){
        // Iterate through each cart item
        cart.forEach(item => {
            // Increase the total quantity by the item quantity
            totalQuantity = totalQuantity +  item.quantity;
            // Create a new div element for the cart item
            let newItem = document.createElement('div');
            // Add the 'item' class to the div
            newItem.classList.add('item');
            // Set a data attribute with the product id
            newItem.dataset.id = item.product_id;

            // Find the product information using the product id
            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            // Set the inner HTML of the new cart item div
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
        })
    }
    // Update the cart icon's item count
    iconCartSpan.innerText = totalQuantity;
}

// Event listener for clicks on the cart list
listCartHTML.addEventListener('click', (event) => {
    // Get the clicked element
    let positionClick = event.target;
    // Check if the clicked element is a 'minus' or 'plus' button
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        // Get the product id from the parent element's data attribute
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        // Determine the type of button clicked ('minus' or 'plus')
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        // Change the quantity of the cart item
        changeQuantityCart(product_id, type);
    }
})

// Function to change the quantity of a cart item
const changeQuantityCart = (product_id, type) => {
    // Find the index of the item in the cart
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    // Check if the item is in the cart
    if(positionItemInCart >= 0){
        // Get the item information
        let info = cart[positionItemInCart];
        // Check the type of change ('plus' or 'minus')
        switch (type) {
            case 'plus':
                // Increase the quantity by 1
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
            default:
                // Decrease the quantity by 1
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                // If the new quantity is greater than 0, update the quantity
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                } else {
                    // If the new quantity is 0, remove the item from the cart
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    // Update the cart in the HTML and in local storage
    addCartToHTML();
    addCartToMemory();
}

// Function to initialize the application
const initApp = () => {
    // Fetch the product data from 'products.json'
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        // Set the products array to the fetched data
        products = data;
        // Add the product data to the HTML
        addDataToHTML();

        // Check if there is a saved cart in local storage
        if(localStorage.getItem('cart')){
            // If there is, set the cart array to the saved cart
            cart = JSON.parse(localStorage.getItem('cart'));
            // Update the cart in the HTML
            addCartToHTML();
        }
    })
}

// Initialize the application
initApp();
