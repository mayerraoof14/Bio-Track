// auth.js - Authentication functionality

class AuthManager {
    constructor() {
        this.loginForm = document.getElementById('loginForm');
        this.signupForm = document.getElementById('signupForm');
        this.initializeAuth();
    }

    initializeAuth() {
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        if (this.signupForm) {
            this.signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        }

        // Password visibility toggle
        document.querySelectorAll('.toggle-password').forEach(button => {
            button.addEventListener('click', (e) => this.togglePasswordVisibility(e));
        });
    }

    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember').checked;

        try {
            this.showLoading();
            // Replace with actual API call
            const response = await this.loginUser(email, password);
            
            if (response.success) {
                localStorage.setItem('user', JSON.stringify(response.user));
                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true');
                }
                window.location.href = 'dashboard.html';
            }
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.hideLoading();
        }
    }

    async handleSignup(e) {
        e.preventDefault();
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            this.showError('Passwords do not match');
            return;
        }

        try {
            this.showLoading();
            // Replace with actual API call
            const response = await this.registerUser(fullName, email, password);
            
            if (response.success) {
                this.showSuccess('Account created successfully! Redirecting to login...');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            }
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.hideLoading();
        }
    }

    togglePasswordVisibility(e) {
        const button = e.currentTarget;
        const passwordInput = button.previousElementSibling;
        const type = passwordInput.getAttribute('type');
        
        passwordInput.setAttribute('type', type === 'password' ? 'text' : 'password');
        button.classList.toggle('fa-eye');
        button.classList.toggle('fa-eye-slash');
    }

    // API Calls (Replace with actual API endpoints)
    async loginUser(email, password) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'test@example.com' && password === 'password') {
                    resolve({
                        success: true,
                        user: { id: 1, name: 'Test User', email }
                    });
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 1000);
        });
    }

    async registerUser(fullName, email, password) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 1000);
        });
    }

    // UI Helpers
    showLoading() {
        const button = document.querySelector('.auth-btn');
        button.classList.add('loading');
        button.disabled = true;
    }

    hideLoading() {
        const button = document.querySelector('.auth-btn');
        button.classList.remove('loading');
        button.disabled = false;
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        const form = document.querySelector('.auth-form');
        form.insertBefore(errorDiv, form.firstChild);
        
        setTimeout(() => errorDiv.remove(), 3000);
    }

    showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        
        const form = document.querySelector('.auth-form');
        form.insertBefore(successDiv, form.firstChild);
    }
}

// Initialize Authentication
document.addEventListener('DOMContentLoaded', () => {
    new AuthManager();
});