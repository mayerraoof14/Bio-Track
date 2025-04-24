// login.js

class LoginManager {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.rememberMe = document.getElementById('remember');
        this.errorDiv = document.getElementById('loginError');
        this.successDiv = document.getElementById('loginSuccess');
        this.loginButton = document.getElementById('loginButton');

        // Demo credentials (In real application, these would be in a database)
        this.demoUsers = [
            {
                email: 'demo@example.com',
                password: 'demo123',
                name: 'Demo User',
                role: 'user'
            },
            {
                email: 'admin@example.com',
                password: 'admin123',
                name: 'Admin User',
                role: 'admin'
            }
        ];

        this.initializeLogin();
    }

    initializeLogin() {
        // Check for remembered credentials
        this.checkRememberedCredentials();

        // Add form submit handler
        this.form.addEventListener('submit', (e) => this.handleLogin(e));

        // Add password visibility toggle
        const togglePassword = document.querySelector('.toggle-password');
        if (togglePassword) {
            togglePassword.addEventListener('click', () => this.togglePasswordVisibility());
        }
    }

    async handleLogin(e) {
        e.preventDefault();

        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value.trim();

        // Reset error messages
        this.hideError();
        this.hideSuccess();

        // Validate inputs
        if (!this.validateInputs(email, password)) {
            return;
        }

        // Show loading state
        this.setLoadingState(true);

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Check credentials
            const user = this.authenticateUser(email, password);

            if (user) {
                // Handle successful login
                this.handleSuccessfulLogin(user);
            } else {
                this.showError('Invalid email or password');
            }
        } catch (error) {
            this.showError('An error occurred during login');
            console.error('Login error:', error);
        } finally {
            this.setLoadingState(false);
        }
    }

    validateInputs(email, password) {
        if (!email || !password) {
            this.showError('Please fill in all fields');
            return false;
        }

        if (!this.isValidEmail(email)) {
            this.showError('Please enter a valid email address');
            return false;
        }

        return true;
    }

    authenticateUser(email, password) {
        // In a real application, this would make an API call to your backend
        return this.demoUsers.find(user => 
            user.email === email && user.password === password
        );
    }

    async handleSuccessfulLogin(user) {
        // Save user data
        const userData = {
            id: Date.now(), // Simulate user ID
            email: user.email,
            name: user.name,
            role: user.role,
            lastLogin: new Date().toISOString()
        };

        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(userData));

        // Handle remember me
        if (this.rememberMe.checked) {
            localStorage.setItem('rememberedEmail', user.email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }

        // Show success message
        this.showSuccess('Login successful! Redirecting...');

        // Redirect after a short delay
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    }

    checkRememberedCredentials() {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            this.emailInput.value = rememberedEmail;
            this.rememberMe.checked = true;
        }
    }

    togglePasswordVisibility() {
        const type = this.passwordInput.type === 'password' ? 'text' : 'password';
        this.passwordInput.type = type;
        
        const icon = document.querySelector('.toggle-password');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    setLoadingState(isLoading) {
        if (isLoading) {
            this.loginButton.classList.add('loading');
            this.loginButton.disabled = true;
        } else {
            this.loginButton.classList.remove('loading');
            this.loginButton.disabled = false;
        }
    }

    showError(message) {
        this.errorDiv.textContent = message;
        this.errorDiv.style.display = 'block';
        this.successDiv.style.display = 'none';
    }

    hideError() {
        this.errorDiv.style.display = 'none';
    }

    showSuccess(message) {
        this.successDiv.textContent = message;
        this.successDiv.style.display = 'block';
        this.errorDiv.style.display = 'none';
    }

    hideSuccess() {
        this.successDiv.style.display = 'none';
    }
}

// Initialize Login Manager
document.addEventListener('DOMContentLoaded', () => {
    new LoginManager();
});