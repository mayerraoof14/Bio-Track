// js/checkout.js
document.getElementById("shippingForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const shippingData = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        zip: document.getElementById("zip").value
    };

    localStorage.setItem("shippingData", JSON.stringify(shippingData));

    // Redirect to review page (works even if folder name has spaces)
    const reviewURL = window.location.pathname.replace(/checkout\.html$/, 'review.html');
    window.location.href = reviewURL;
});