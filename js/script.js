// --- AUTH UI UPDATE ---
function updateAuthUI() { // Function to update the UI based on the user's authentication status
  // Check if the 'user_id' exists in localStorage (indicating the user is logged in)
// '!!' is used to convert the result into a boolean value (true if exists, false otherwise)
const isLoggedIn = !!localStorage.getItem('user_id');

// Get the reference to the 'login-btn' element from the DOM
const loginBtn = document.getElementById('login-btn');

// Get the reference to the 'logout-btn' element from the DOM
const logoutBtn = document.getElementById('logout-btn');


// Check if the user is logged in based on the 'isLoggedIn' value
if (isLoggedIn) {
  // If logged in, hide the 'login-btn' and show the 'logout-btn'
  if (loginBtn) loginBtn.style.display = 'none'; // Hide the login button
  if (logoutBtn) logoutBtn.style.display = 'inline-block'; // Show the logout button
} else {
  // If not logged in, show the 'login-btn' and hide the 'logout-btn'
  if (loginBtn) loginBtn.style.display = 'inline-block'; // Show the login button
  if (logoutBtn) logoutBtn.style.display = 'none'; // Hide the logout button
}

// --- LOGOUT FUNCTION ---
function logout() {
  localStorage.removeItem('user_id');
  localStorage.removeItem('user_email');
  updateAuthUI();
  alert('Logged out!');
  window.location.href = 'login.html';
}

// --- DOM Ready ---
// Wait until the DOM is fully loaded before executing the following code
document.addEventListener("DOMContentLoaded", () => {
  // Call the updateAuthUI function to update the UI based on the user's login status
  updateAuthUI();
});


  // Attach logout handler
  const logoutBtn = document.getElementById('logout-btn'); //const, only work inside the function only
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }

  // Mobile navigation toggle functionality
const mobileMenuBtn = document.querySelector('.mobile-menu');  // Get the mobile menu button element
const navLinks = document.querySelector('.nav-links');  // Get the navigation links container element

// Check if both the mobile menu button and nav links exist before adding an event listener
if (mobileMenuBtn && navLinks) {
  // Add an event listener to the mobile menu button to toggle the 'active' class on the nav links container
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');  // Toggles the 'active' class, which likely shows or hides the nav links
  });
}


  // Load cart from localStorage
  loadCart();
  updateCartCount();

  // Attach "Add to Cart" buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
      const productCard = this.closest('.product-card') || this.closest('.product-info');
      const productId = this.dataset.id || Date.now();
      const productName = productCard.querySelector('h3')?.textContent || 'Bio Track';
      const productPrice = parseFloat(productCard.querySelector('.price')?.textContent.replace('$', '') || '0');
      const quantity = parseInt(document.getElementById('quantity')?.value || '1');

      addToCart(productId, productName, productPrice, quantity);
    });
  });
  

  // Chat toggle functionality
const chatTrigger = document.querySelector('.chat-trigger');  // Get the chat trigger button or icon element
const chatWidget = document.querySelector('.chat-widget');    // Get the chat widget container element
const chatInput = document.querySelector('.chat-input input');  // Get the input field where the user types messages
const chatMessages = document.querySelector('.chat-messages'); // Get the container for chat messages

// Check if the chat trigger and chat widget elements exist before adding event listeners
if (chatTrigger && chatWidget) {
  // Add a click event listener to the chat trigger (e.g., button or icon) to toggle the chat widget visibility
  chatTrigger.addEventListener('click', () => {
    // Toggle the display of the chat widget between 'block' and 'none'
    chatWidget.style.display = chatWidget.style.display === 'block' ? 'none' : 'block';
  });

  // Add an event listener to the chat input field to handle the 'Enter' key press for sending messages
  chatInput?.addEventListener('keydown', (e) => { //e is event object , keydown is when the key is pressed
    if (e.key === 'Enter' && chatInput.value.trim() !== '') {
      // If the 'Enter' key is pressed and the input is not empty, send the user's message
      const msg = chatInput.value.trim();  // Get the trimmed message from the input
      appendMessage(msg, 'user');  //appendMessage adds it to the chat interface.
      chatInput.value = '';  // Clear the input field

      // Simulate a bot reply after a slight delay (500ms)
      setTimeout(() => {
        const reply = generateBotReply(msg);  // Generate a reply based on the user's message
        appendMessage(reply, 'bot');  // Append the bot's reply to the chat messages
      }, 500);
    }
  });
}


    function appendMessage(text, type) {
      const message = document.createElement('div');
      message.className = `message ${type}`;
      message.innerHTML = `<span class="text">${text}</span>`;
      chatMessages.appendChild(message);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function generateBotReply(input) {
      const lower = input.toLowerCase();
      if (lower.includes("hello") || lower.includes("hi")) return "Hi! How can I help you today?";
      if (lower.includes("price")) return "Bio Track Classic starts at $99.99.";
      if (lower.includes("help")) return "Sure! Please describe the issue.";
      if (lower.includes("thanks" || "thank you")) return "You're Welcome! Tell me if you need more help";
      return "Thanks for your message! We’ll get back to you shortly.";
    }
  }
});

// --- CART LOGIC ---
let cart = [];

// Function to load the cart from localStorage
function loadCart() {
  const saved = localStorage.getItem('bioTrackCart'); // Get the saved cart data from localStorage
  cart = saved ? JSON.parse(saved) : [];  // If data exists, parse it into a JavaScript object; otherwise, initialize an empty cart
}

// Function to save the cart to localStorage
function saveCart() {
  localStorage.setItem('bioTrackCart', JSON.stringify(cart));  // Convert the cart to a JSON string and store it in localStorage
}

// Function to update the cart item count displayed in the UI
function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');  // Select the element where the cart count is displayed
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);  // Calculate the total quantity of items in the cart
  if (cartCount) cartCount.textContent = total;  // If the cart count element exists, update its text with the total quantity
}

// Function to add an item to the cart
function addToCart(id, name, price, quantity = 1) {
  const existing = cart.find(item => item.id == id);  // Check if the item already exists in the cart
  if (existing) {
    existing.quantity += quantity;  // If the item exists, increase its quantity by the specified amount
  } else {
    cart.push({ id, name, price, quantity });  // If the item doesn't exist, add it as a new item to the cart
  }
  saveCart();  // Save the updated cart to localStorage
  updateCartCount();  // Update the cart count display in the UI
  showToast(`${quantity} x "${name}" added to cart!`);  // Show a toast message indicating the item has been added to the cart
}


// --- TOAST MESSAGE ---
// Function to show a toast notification with a custom message
function showToast(message) {
  // Create a new div element for the toast notification
  const toast = document.createElement('div');
  
  // Add the 'add-to-cart-toast' class to style the toast
  toast.className = 'add-to-cart-toast';
  
  // Set the text content of the toast to the provided message
  toast.textContent = message;
  
  // Append the toast to the body of the document to make it visible
  document.body.appendChild(toast);

  // Set a timeout to remove the toast after 3 seconds (3000 milliseconds)
  setTimeout(() => {
    toast.remove();  // Removes the toast element from the DOM after 3 seconds
  }, 3000);
}



// FAQ section
document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll('.faq-item');  // Select all FAQ items on the page

    // Loop through each FAQ item
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');  // Select the question element
        const answer = item.querySelector('.faq-answer');      // Select the answer element
        const icon = item.querySelector('i');                   // Select the icon (usually a plus/minus or arrow)

        // Hide all answers by default when the page loads
        answer.style.display = 'none';

        // Add a click event listener to the question
        question.addEventListener('click', () => {
            const isVisible = answer.style.display === 'block';  // Check if the answer is currently visible

            // Collapse all answers (hide them)
            document.querySelectorAll('.faq-answer').forEach(ans => ans.style.display = 'none');
            // Remove the 'rotate' class from all icons (reset their rotation)
            document.querySelectorAll('.faq-question i').forEach(i => i.classList.remove('rotate'));

            // Toggle the clicked answer's visibility
            if (!isVisible) {
                answer.style.display = 'block';  // Show the clicked answer
                icon.classList.add('rotate');    // Rotate the icon to indicate the expanded state
            }
        });
    });
});
