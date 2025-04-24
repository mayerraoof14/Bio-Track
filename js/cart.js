// cart.js - Shopping cart functionality

class CartManager {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
        this.initializeCart();
    }

    initializeCart() {
        this.renderCart();
        this.attachEventListeners();
        this.updateCartSummary();
    }

    renderCart() {
        const cartItems = document.querySelector('.cart-items');
        if (!cartItems) return;

        if (this.items.length === 0) {
            cartItems.innerHTML = this.getEmptyCartHTML();
            return;
        }

        cartItems.innerHTML = this.items.map(item => this.getCartItemHTML(item)).join('');
    }

    getCartItemHTML(item) {
        return `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Color: ${item.color}</p>
                </div>
                <div class="item-quantity">
                    <button class="quantity-btn minus">-</button>
                    <input type="number" value="${item.quantity}" min="1" max="10">
                    <button class="quantity-btn plus">+</button>
                </div>
                <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                <button class="remove-item"><i class="fas fa-trash"></i></button>
            </div>
        `;
    }

    getEmptyCartHTML() {
        return `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <a href="products.html" class="primary-btn">Start Shopping</a>
            </div>
        `;
    }

    attachEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.quantity-btn.plus')) {
                this.updateQuantity(e.target.closest('.cart-item'), 1);
            }
            if (e.target.closest('.quantity-btn.minus')) {
                this.updateQuantity(e.target.closest('.cart-item'), -1);
            }
            if (e.target.closest('.remove-item')) {
                this.removeItem(e.target.closest('.cart-item'));
            }
        });

        document.querySelectorAll('.item-quantity input').forEach(input => {
            input.addEventListener('change', (e) => {
                this.updateQuantityDirectly(e.target.closest('.cart-item'), e.target.value);
            });
        });
    }

    updateQuantity(cartItem, change) {
        const id = cartItem.dataset.id;
        const item = this.items.find(item => item.id === id);
        if (!item) return;

        const newQuantity = item.quantity + change;
        if (newQuantity >= 1 && newQuantity <= 10) {
            item.quantity = newQuantity;
            this.updateCart();
        }
    }

    updateQuantityDirectly(cartItem, newQuantity) {
        const id = cartItem.dataset.id;
        const item = this.items.find(item => item.id === id);
        if (!item) return;

        newQuantity = parseInt(newQuantity);
        if (newQuantity >= 1 && newQuantity <= 10) {
            item.quantity = newQuantity;
            this.updateCart();
        }
    }

    removeItem(cartItem) {
        const id = cartItem.dataset.id;
        this.items = this.items.filter(item => item.id !== id);
        this.updateCart();
    }

    updateCart() {
        localStorage.setItem('cartItems', JSON.stringify(this.items));
        this.renderCart();
        this.updateCartSummary();
        updateCartCounter(); // From script.js
    }

    updateCartSummary() {
        const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.1; // 10% tax
        const total = subtotal + tax;

        document.querySelector('.summary-item:nth-child(1) span:last-child').textContent = 
            `$${subtotal.toFixed(2)}`;
        document.querySelector('.summary-item:nth-child(3) span:last-child').textContent = 
            `$${tax.toFixed(2)}`;
        document.querySelector('.summary-total span:last-child').textContent = 
            `$${total.toFixed(2)}`;
    }

    // Add to Cart (called from product page)
    static addToCart(product) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItem = cartItems.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity = Math.min(existingItem.quantity + 1, 10);
        } else {
            cartItems.push({...product, quantity: 1});
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCounter();

        // Show success message
        const message = document.createElement('div');
        message.className = 'add-to-cart-message';
        message.textContent = 'Item added to cart!';
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 3000);
    }
}

// Initialize Cart
document.addEventListener('DOMContentLoaded', () => {
    new CartManager();
});