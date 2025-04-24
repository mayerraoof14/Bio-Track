// script.js - Common functionalities

// FAQ section

document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('i');

        // Hide all answers by default
        answer.style.display = 'none';

        question.addEventListener('click', () => {
            const isVisible = answer.style.display === 'block';

            // Collapse all answers
            document.querySelectorAll('.faq-answer').forEach(ans => ans.style.display = 'none');
            document.querySelectorAll('.faq-question i').forEach(i => i.classList.remove('rotate'));

            // Toggle the clicked one
            if (!isVisible) {
                answer.style.display = 'block';
                icon.classList.add('rotate');
            }
        });
    });
});

// Global Variables
const BASE_URL = 'https://api.healthguardpro.com'; // Replace with your actual API endpoint
let currentUser = JSON.parse(localStorage.getItem('user')) || null;

// Authentication Check
function checkAuth() {
    const protectedPages = ['dashboard', 'profile', 'settings'];
    const currentPage = window.location.pathname.split('/').pop().split('.')[0];
    
    if (protectedPages.includes(currentPage) && !currentUser) {
        window.location.href = 'login.html';
    }
}

// Navigation Toggle for Mobile
function initMobileNav() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Cart Counter Update
function updateCartCounter() {
    const cartCount = document.querySelector('.cart-count');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    if (cartCount) {
        cartCount.textContent = cartItems.length;
    }
}



// Live Chat Widget
function initChatWidget() {
    const chatWidget = document.getElementById('chatWidget');
    const chatTrigger = document.getElementById('chatTrigger');
    const minimizeChat = document.getElementById('minimizeChat');
    const messageInput = document.getElementById('messageInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');

    if (chatTrigger) {
        chatTrigger.addEventListener('click', () => {
            chatWidget.style.display = 'block';
        });
    }

    if (minimizeChat) {
        minimizeChat.addEventListener('click', () => {
            chatWidget.style.display = 'none';
        });
    }

    if (sendMessage && messageInput) {
        sendMessage.addEventListener('click', () => {
            const message = messageInput.value.trim();
            if (message) {
                appendMessage('user', message);
                messageInput.value = '';
                // Simulate response
                setTimeout(() => {
                    appendMessage('support', 'Thank you for your message. Our team will respond shortly.');
                }, 1000);
            }
        });
    }
}

function appendMessage(type, content) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.textContent = content;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Initialize Common Functions
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    initMobileNav();
    updateCartCounter();
    initChatWidget();
});

// Shopping Cart
let cart = [];

function addToCart(productId, name, price) {
    cart.push({
        id: productId,
        name: name,
        price: price,
        quantity: 1
    });
    updateCartCount();
    saveCart();
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.length;
}

function saveCart() {
    localStorage.setItem('bioTrackCart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('bioTrackCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Add to Cart Button Event Listeners
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.dataset.id;
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('$', ''));
        
        addToCart(productId, productName, productPrice);
        
        // Show confirmation message
        alert('Product added to cart!');
    });
});

            const thumbnails = document.querySelectorAll('.thumbnail');
            const mainImage = document.querySelector('.main-image');

            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', function() {
                    mainImage.src = this.src.replace('-thumb', '');
                });
            });

document.addEventListener("DOMContentLoaded", function () {
    const addToCartButton = document.querySelector('.add-to-cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', function () {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3')?.textContent || 'Bio Track Wearable 1';
            const productPrice = parseFloat(productCard.querySelector('.price')?.textContent.replace('$', '') || '0');
            const quantity = parseInt(document.getElementById('quantity')?.value || '1');

            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: quantity
                });
            }

            saveCart();
            updateCartCount();

            // ✅ Friendly message
            alert(`${quantity} x "${productName}" added to cart!`);
        });
    }
});
