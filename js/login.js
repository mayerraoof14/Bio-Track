document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMe = document.getElementById('remember');
    const errorDiv = document.getElementById('loginError');
    const successDiv = document.getElementById('loginSuccess');
    const loginButton = document.getElementById('loginButton');
    const togglePassword = document.querySelector('.toggle-password');
    const logoutBtn = document.getElementById('logout-btn');
    const loginBtn = document.querySelector('.btnLogin-popup');

    // Load remembered email
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        emailInput.value = rememberedEmail;
        rememberMe.checked = true;
    }

    // Toggle password visibility
    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }

    // Handle form login
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            showError('Please enter email and password');
            return;
        }

        const formData = new FormData(form);

        loginButton.disabled = true;

        fetch('./login.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                // Save user info
                localStorage.setItem('bioTrackUserId', data.user_id);
                localStorage.setItem('bioTrackUserEmail', email);

                if (rememberMe.checked) {
                    localStorage.setItem('rememberedEmail', email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }

                showSuccess('Login successful! Redirecting...');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                showError(data.message || 'Invalid credentials');
            }
        })
        .catch(err => {
            console.error('Login Error:', err);
            showError('Server error. Please try again.');
        })
        .finally(() => {
            loginButton.disabled = false;
        });
    });

    // Auth UI update
    function updateAuthUI() {
        const isLoggedIn = !!localStorage.getItem('bioTrackUserId');
        if (isLoggedIn) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'inline-block';
        } else {
            if (loginBtn) loginBtn.style.display = 'inline-block';
            if (logoutBtn) logoutBtn.style.display = 'none';
        }
    }

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('bioTrackUserId');
            localStorage.removeItem('bioTrackUserEmail');
            updateAuthUI();
            alert('You have been logged out.');
            window.location.href = 'index.html';
        });
    }

    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        successDiv.style.display = 'none';
    }

    function showSuccess(message) {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        errorDiv.style.display = 'none';
    }

    updateAuthUI();
});
