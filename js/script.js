// script.js - Common functionalities

document.addEventListener('DOMContentLoaded', () => {
  // Login status UI handling
  const isLoggedIn = localStorage.getItem('bioTrackUserLoggedIn') === 'true';
  const loginBtn = document.querySelector('.login-btn');

  if (isLoggedIn && loginBtn) {
    loginBtn.textContent = 'Account';
    loginBtn.href = 'account.html'; // or your actual account page
  }

  // Other logic in script.js...
});

document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById('logout-btn');
    const loginLink = document.querySelector('.login-btn');

    const isLoggedIn = localStorage.getItem('user_id') !== null;

    if (isLoggedIn) {
        logoutBtn.style.display = 'inline-block';
        if (loginLink) loginLink.style.display = 'none';
    }

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('user_id');
        window.location.href = 'login.html';
    });
});

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
document.addEventListener("DOMContentLoaded", function () {
    const chatWidget = document.querySelector('.chat-widget');
    const chatTrigger = document.querySelector('.chat-trigger');
    const chatInput = document.querySelector('.chat-input input');
    const chatMessages = document.querySelector('.chat-messages');

    // Toggle chat visibility
    chatTrigger.addEventListener('click', () => {
        chatWidget.style.display = chatWidget.style.display === 'block' ? 'none' : 'block';
    });

    // Function to create a message bubble
    function appendMessage(text, type) {
        const message = document.createElement('div');
        message.classList.add('message', type);
        message.innerHTML = `<span class="text">${text}</span>`;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Handle Enter key press
    chatInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && chatInput.value.trim() !== '') {
            const userText = chatInput.value.trim();
            appendMessage(userText, 'user');
            chatInput.value = '';

            // Simulate bot reply after delay
            setTimeout(() => {
                const botReply = generateBotReply(userText);
                appendMessage(botReply, 'bot');
            }, 600);
        }
    });

    // Simulated bot response logic
    function generateBotReply(userMessage) {
        // Basic keyword-based response
        const messageLower = userMessage.toLowerCase();
        if (messageLower.includes("hello") || messageLower.includes("hi")) {
            return "Hi there! How can I assist you today?";
        } else if (messageLower.includes("price")) {
            return "The Bio Track Classic starts at $99.99.";
        } else if (messageLower.includes("help")) {
            return "Sure! Please describe the issue you're facing.";
        } else {
            return "Thank you for your message! We'll get back to you shortly.";
        }
    }
});

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

// --- AUTH UI UPDATE ---
function updateAuthUI() {
  const isLoggedIn = !!localStorage.getItem('user_id');  // Check if user_id is in localStorage
  const loginBtn = document.querySelector('.login-btn');
  const logoutBtn = document.getElementById('logout-btn'); // Assuming logout button has ID 'logout-btn'

  if (isLoggedIn) {
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
  } else {
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
  }
}
updateAuthUI();

// --- LOGIN LOGIC ---
document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(this);

  fetch('login.php', { method: 'POST', body: formData })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        // Store the user info in localStorage
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('user_email', formData.get('email'));
        alert('Login successful!');
        updateAuthUI();  // Update the UI after successful login
        window.location.href = 'index.html';  // Redirect to home page
      } else {
        alert(data.message || 'Login failed!');
      }
    })
    .catch((err) => {
      console.error('Login error:', err);
      alert('Login error!');
    });
});

// --- REGISTER LOGIC ---
document.getElementById('register-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(this);

  fetch('register.php', { method: 'POST', body: formData })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert('Registration successful! Please log in.');
        window.location.href = 'login.html';  // Redirect to login page
      } else {
        alert(data.message || data.error || 'Registration failed!');
      }
    })
    .catch((err) => {
      console.error('Registration error:', err);
      alert('Registration error!');
    });
});

// --- LOGOUT LOGIC ---
function logout() {
  localStorage.removeItem('user_id');
  localStorage.removeItem('user_email');
  updateAuthUI();  // Update the UI after logout
  alert('Logged out!');
  window.location.href = 'index.html';  // Redirect to home page
}

document.getElementById('logout-btn').addEventListener('click', logout);

