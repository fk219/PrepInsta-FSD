// script.js
const products = [
    { id: 1, name: 'Laptop', price: 999.99 },
    { id: 2, name: 'Smartphone', price: 499.99 },
    { id: 3, name: 'Headphones', price: 199.99 },
];

const productContainer = document.querySelector('.product-list');

products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    `;
    productContainer.appendChild(productElement);
});
let cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = parseInt(button.dataset.id);
        const product = products.find(p => p.id === productId);
        const cartItem = cart.find(item => item.id === productId);

        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        updateCart();
    });
});

function updateCart() {
    const cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
            <button class="remove-from-cart" data-id="${item.id}">Remove</button>
        `;
        cartContainer.appendChild(cartItemElement);
    });

    document.querySelector('.cart-count').textContent = cart.length;
    document.querySelector('.cart-total').textContent = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
}
document.querySelector('.cart-items').addEventListener('click', event => {
    if (event.target.classList.contains('remove-from-cart')) {
        const productId = parseInt(event.target.dataset.id);
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }
});
document.querySelector('.cart').addEventListener('click', () => {
    document.querySelector('#cart').classList.toggle('hidden');
});
