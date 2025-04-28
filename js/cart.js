// js/cart.js
document.addEventListener('DOMContentLoaded', function () {
  // --- Cart State ---
  let cart = JSON.parse(localStorage.getItem('bioTrackCart')) || [];
  // Retrieve the cart from local storage and parse it back into an object.
// If no cart is found in local storage, initialize an empty array as the default value.

  // --- Elements ---
  const cartIcon    = document.getElementById('cart-icon');
  const cartCount   = document.getElementById('cart-count');
  const cartModal   = document.getElementById('cart-modal');
  const closeCart   = document.getElementById('close-cart');
  const cartItemsEl = document.getElementById('cart-items');
  const checkoutBtn = document.querySelector('.checkout-btn');

  // --- Modal Show/Hide ---
  cartIcon.addEventListener('click', () => cartModal.style.display = 'block');
  closeCart.addEventListener('click', () => cartModal.style.display = 'none');
  window.addEventListener('click', e => {
    if (e.target === cartModal) cartModal.style.display = 'none';
  });

  // --- Add to Cart Buttons ---
 function attachAddToCart() {
  // Select all elements with the class 'add-to-cart' (buttons that add items to the cart)
  const addButtons = document.querySelectorAll('.add-to-cart');
  
  // Loop through each 'add-to-cart' button
  addButtons.forEach((button, idx) => {
    
    // Add a click event listener to each button
    button.addEventListener('click', () => {
      
      // Find the closest parent element with the class 'product-info' or 'product-card' (the product the button belongs to)
      const itemEl = button.closest('.product-card');
      
      // If no parent element is found, exit the function
      if (!itemEl) return;
      
      // The code for handling the item being added to the cart would go here
    });
  });
}


        // Extract product information when the "Add to Cart" button is clicked
const name = itemEl.querySelector('h1')?.textContent || 'Unnamed Product'; 
// Get the product name (from <h1>), default to 'Unnamed Product' if not found
// If <h1> doesn't exist, <?.>  default to 'Unnamed Product' instead of causing an error.

const price = parseFloat(itemEl.querySelector('.price')?.textContent.replace('$', '') || 0); 
// Get the product price (removes the dollar sign and converts it to a float), default to 0 if not found, bulit in function that takes string and convert it into number 

const image = itemEl.querySelector('img')?.src || ''; 
// Get the product image URL, default to an empty string if not found

const quantityInput = itemEl.querySelector('#quantity'); 
// Get the quantity input field (if available)

const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1; 
// Get the quantity from the input field, default to 1 if not found or if input is invalid

const existing = cart.find(i => i.name === name); 
// Check if the product is already in the cart by matching its name

if (existing) {
  existing.quantity += quantity; 
  // If the product already exists, increase its quantity by the selected amount
} else {
  // If the product doesn't exist in the cart, add a new entry with a generated ID
  cart.push({ id: name.replace(/\s+/g, '-').toLowerCase(), name, price, image, quantity });
  // Use a simple generated ID by replacing spaces with dashes and converting to lowercase
}


  }

  // --- Update Cart Modal, Cart Count, Save State ---
  function updateCart() {
    cartItemsEl.innerHTML = ''; // Clear all existing cart items from the cart container before updating the display
    let total = 0; // Initialize the total price of all items in the cart as 0

    if (cart.length === 0) {
      cartItemsEl.innerHTML = '<p>Your cart is empty!</p>';
      cartCount.textContent = 0;
      localStorage.setItem('bioTrackCart', JSON.stringify(cart)); // Save the current cart to local storage, converting it into a JSON string

      return;
    }

    cart.forEach(item => {
      total += item.price * item.quantity;
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image" style="width:40px; height:40px; border-radius:5px;">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        <div class="cart-controls">
          <button class="decrease-btn">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="increase-btn">+</button>
        </div>
      `;
      div.querySelector('.increase-btn').addEventListener('click', () => {
        item.quantity++;
        updateCart();
      });
      div.querySelector('.decrease-btn').addEventListener('click', () => {
        if (item.quantity > 1) item.quantity--;
        else cart = cart.filter(i => i !== item);
        updateCart();
      });
      cartItemsEl.appendChild(div); // Append the newly created 'div' element (representing a cart item) to the cart items container
    });

   // Create a new 'div' element to display the cart's total price
const totEl = document.createElement('div');

// Assign a class to the 'div' for styling
totEl.className = 'cart-total';

// Set the inner HTML of the 'div' to display the total price, formatted to two decimal places
totEl.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;

// Append the 'div' to the cart items container to display it on the page
cartItemsEl.appendChild(totEl);

// Update the cart count by calculating the total quantity of items in the cart
cartCount.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);

// Save the updated cart to local storage as a JSON string
localStorage.setItem('bioTrackCart', JSON.stringify(cart));

  }

  // --- Toast For Add to Cart ---
 function showAddToCartToast(name) {
  // Create a new div element for the toast message
  const toast = document.createElement('div');

  // Set the content of the toast to show the item added to the cart
  toast.textContent = `${name} added to cart!`;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.background = '#28a745';
    toast.style.color = '#fff';
    toast.style.padding = '10px 15px';
    toast.style.borderRadius = '5px';
    toast.style.zIndex = '9999';
    toast.style.boxShadow = '0 0 10px rgba(0,0,0,0.15)';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }

  // --- Attach + Update ---
  attachAddToCart();
  updateCart();
  
showAddToCartToast(name); 
// Show a toast notification to inform the user the product has been added to the cart

  // --- Checkout Button ---

  if (checkoutBtn) {
    checkoutBtn?.addEventListener('click', () => {
      console.log('user_id:', localStorage.getItem('user_id'));
      const isLoggedIn = !!localStorage.getItem('user_id');
      console.log('isLoggedIn:', isLoggedIn);
      if (!isLoggedIn) {
        alert('You must be logged in to proceed to checkout.');
        window.location.href = 'login.html';
        return;
      }
      if (cart.length === 0) {
        alert('Your cart is empty!');
		window.location.href = 'index.html';
        return;
      }
      localStorage.setItem('bioTrackCart', JSON.stringify(cart));
      window.location.href = 'checkout.html';
    });
  }
});