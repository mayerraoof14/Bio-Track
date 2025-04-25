document.addEventListener('DOMContentLoaded', function () {
  // Your existing code below
  let cart = JSON.parse(localStorage.getItem('bioTrackCart')) || [];

  const cartIcon     = document.getElementById('cart-icon');
  const cartCount    = document.getElementById('cart-count');
  const cartModal    = document.getElementById('cart-modal');
  const closeCart    = document.getElementById('close-cart');
  const cartItemsEl  = document.getElementById('cart-items');
  const checkoutBtn  = document.querySelector('.checkout-btn');

  cartIcon.addEventListener('click', () => cartModal.style.display = 'block');
  closeCart.addEventListener('click', () => cartModal.style.display = 'none');
  window.addEventListener('click', e => {
    if (e.target === cartModal) cartModal.style.display = 'none';
  });

function attachAddToCart() {
  const addButtons = document.querySelectorAll('.add-to-cart');

  addButtons.forEach((button, idx) => {
    button.addEventListener('click', () => {
      // Search within product-info first, fallback to product-card
      const itemEl = button.closest('.product-info') || button.closest('.product-card');

      if (!itemEl) return;

      const name = itemEl.querySelector('h1')?.textContent || 'Unnamed Product';
      const price = parseFloat(itemEl.querySelector('.price')?.textContent.replace('$', '') || 0);
      const image = document.querySelector('.main-image')?.src || itemEl.querySelector('img')?.src || '';
      const quantityInput = itemEl.querySelector('#quantity');
      const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;

      const existing = cart.find(i => i.name === name);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({ id: idx + 1, name, price, image, quantity });
      }

      updateCart();
      showAddToCartToast(name); // Optional: display a toast message
    });
  });
}


  function updateCart() {
    cartItemsEl.innerHTML = '';
    let total = 0;
    if (cart.length === 0) {
      cartItemsEl.innerHTML = '<p>Your cart is empty!</p>';
      cartCount.textContent = 0;
      localStorage.setItem('bioTrackCart', JSON.stringify(cart));
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
      cartItemsEl.appendChild(div);
    });

    const totEl = document.createElement('div');
    totEl.className = 'cart-total';
    totEl.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    cartItemsEl.appendChild(totEl);

    cartCount.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
    localStorage.setItem('bioTrackCart', JSON.stringify(cart));
  }

  function showAddToCartToast(name) {
    const toast = document.createElement('div');
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

  attachAddToCart();
  updateCart();

checkoutBtn?.addEventListener('click', () => {
  const isLoggedIn = localStorage.getItem('bioTrackUserLoggedIn') === 'true';

  if (!isLoggedIn) {
    alert('You must be logged in to proceed to checkout.');
    window.location.href = 'login.html'; // Redirect to login
    return;
  }

  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  localStorage.setItem('bioTrackCart', JSON.stringify(cart));
  window.location.href = 'checkout.html';
});

});
