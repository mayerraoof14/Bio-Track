// layout.js
class Layout {
    constructor() {
        this.init();
    }

    async init() {
        if (!this.isAuthPage()) {
            await this.loadHeader();
            await this.loadFooter();
            this.setupNavigation();
            this.updateUserMenu();
        }
    }

    isAuthPage() {
        const authPages = ['login.html', 'signup.html'];
        const currentPage = window.location.pathname.split('/').pop();
        return authPages.includes(currentPage);
    }

    async loadHeader() {
        try {
            const response = await fetch('header.html');
            const html = await response.text();
            document.body.insertAdjacentHTML('afterbegin', html);
            this.updateActiveNavLink();
        } catch (error) {
            console.error('Error loading header:', error);
        }
    }

    async loadFooter() {
        try {
            const response = await fetch('footer.html');
            const html = await response.text();
            document.body.insertAdjacentHTML('beforeend', html);
        } catch (error) {
            console.error('Error loading footer:', error);
        }
    }

    setupNavigation() {
        // Mobile menu toggle
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenu?.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // User dropdown toggle
        const userToggle = document.querySelector('.user-toggle');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        
        userToggle?.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownMenu.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.user-menu')) {
                dropdownMenu?.classList.remove('active');
            }
        });

        // Logout functionality
        document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleLogout();
        });
    }

    updateActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }

    updateUserMenu() {
        const user = JSON.parse(localStorage.getItem('user'));
        const userMenu = document.querySelector('.user-menu');
        const username = document.querySelector('.username');
        
        if (user) {
            username.textContent = user.name || 'Account';
            userMenu.style.display = 'block';
        } else {
            userMenu.innerHTML = `
                <a href="login.html" class="nav-link">Login</a>
            `;
        }
    }

    handleLogout() {
        localStorage.removeItem('user');
        localStorage.removeItem('userSettings');
        window.location.href = 'login.html';
    }
}

// Initialize Layout
document.addEventListener('DOMContentLoaded', () => {
    new Layout();
});