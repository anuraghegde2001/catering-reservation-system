// Elite Catering Website - JavaScript Functionality (Fixed)

// Application State
const AppState = {
    currentUser: null,
    isAdmin: false,
    cart: [],
    products: [],
    orders: [],
    categories: ["All", "Wedding", "Corporate", "Party", "Indian", "BBQ", "Healthy"],
    orderStatus: ["Pending", "Confirmed", "Preparing", "Ready", "Delivered", "Cancelled"],
    adminCredentials: {
        username: "admin@catering.com",
        password: "admin123"
    }
};

// Sample data - Products
const sampleProducts = [
    {
        id: "1",
        name: "Premium Wedding Package",
        category: "Wedding",
        price: "2499",
        image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400",
        description: "Complete wedding catering service for 100 guests including appetizers, main course, desserts, and beverages",
        status: "Available"
    },
    {
        id: "2",
        name: "Corporate Lunch Box",
        category: "Corporate",
        price: "25",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400",
        description: "Individual lunch boxes perfect for corporate meetings and events",
        status: "Available"
    },
    {
        id: "3",
        name: "Birthday Party Special",
        category: "Party",
        price: "399",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
        description: "Fun birthday party catering package for 20 people with cake and entertainment",
        status: "Available"
    },
    {
        id: "4",
        name: "Traditional Indian Thali",
        category: "Indian",
        price: "45",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
        description: "Authentic Indian thali with variety of curries, rice, bread, and sweets",
        status: "Available"
    },
    {
        id: "5",
        name: "BBQ Grill Package",
        category: "BBQ",
        price: "599",
        image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400",
        description: "Outdoor BBQ catering with grilled meats, vegetables, and sides for 30 people",
        status: "Available"
    },
    {
        id: "6",
        name: "Healthy Salad Bowls",
        category: "Healthy",
        price: "18",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
        description: "Fresh, organic salad bowls with choice of protein and dressing",
        status: "Available"
    }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Ensure main content is visible and admin panel is hidden by default
    document.getElementById('mainContent').style.display = 'block';
    document.getElementById('adminPanel').classList.add('hidden');
    
    // Load data from localStorage or use sample data
    loadAppData();
    
    // Set up event listeners
    setupEventListeners();
    
    // Display initial content
    displayFeaturedProducts();
    updateCartUI();
    updateAuthUI();
    
    // Set up navigation scroll effect
    setupScrollEffect();
    
    console.log('Elite Catering app initialized successfully');
}

function loadAppData() {
    // Load products
    const savedProducts = localStorage.getItem('cateringProducts');
    AppState.products = savedProducts ? JSON.parse(savedProducts) : [...sampleProducts];
    
    // Load cart
    const savedCart = localStorage.getItem('cateringCart');
    AppState.cart = savedCart ? JSON.parse(savedCart) : [];
    
    // Load orders
    const savedOrders = localStorage.getItem('cateringOrders');
    AppState.orders = savedOrders ? JSON.parse(savedOrders) : [];
    
    // Load current user
    const savedUser = localStorage.getItem('cateringCurrentUser');
    AppState.currentUser = savedUser ? JSON.parse(savedUser) : null;
    
    console.log('App data loaded:', {
        products: AppState.products.length,
        cart: AppState.cart.length,
        orders: AppState.orders.length,
        user: AppState.currentUser?.name || 'None'
    });
}

function saveAppData() {
    localStorage.setItem('cateringProducts', JSON.stringify(AppState.products));
    localStorage.setItem('cateringCart', JSON.stringify(AppState.cart));
    localStorage.setItem('cateringOrders', JSON.stringify(AppState.orders));
    localStorage.setItem('cateringCurrentUser', JSON.stringify(AppState.currentUser));
}

// Event Listeners Setup
function setupEventListeners() {
    // Navigation
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.getAttribute('href');
            navigateToSection(target);
            
            // Close mobile menu
            if (navMenu) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
    
    // Hero buttons
    const exploreMenuBtn = document.getElementById('exploreMenuBtn');
    const contactUsBtn = document.getElementById('contactUsBtn');
    
    if (exploreMenuBtn) {
        exploreMenuBtn.addEventListener('click', () => {
            navigateToSection('#menu');
        });
    }
    
    if (contactUsBtn) {
        contactUsBtn.addEventListener('click', () => {
            navigateToSection('#contact');
        });
    }
    
    // Auth buttons
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            showModal('loginModal');
        });
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            showModal('registerModal');
        });
    }
    
    // Modal controls
    setupModalControls();
    
    // Cart functionality
    const cartIcon = document.getElementById('cartIcon');
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            showModal('cartModal');
            displayCartItems();
        });
    }
    
    // Menu filters
    setupMenuFilters();
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterProducts(e.target.value);
        });
    }
    
    // Forms
    setupForms();
    
    // User profile actions
    setupUserProfileActions();
    
    // Admin functionality
    setupAdminFunctionality();
}

function setupScrollEffect() {
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

function navigateToSection(target) {
    // Hide all sections first
    const sections = ['.menu-section', '.about-section', '.contact-section'];
    sections.forEach(selector => {
        const section = document.querySelector(selector);
        if (section) section.classList.add('hidden');
    });
    
    // Show target section
    if (target === '#menu') {
        const menuSection = document.querySelector('.menu-section');
        if (menuSection) {
            menuSection.classList.remove('hidden');
            displayMenuProducts();
            setTimeout(() => {
                menuSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    } else if (target === '#about') {
        const aboutSection = document.querySelector('.about-section');
        if (aboutSection) {
            aboutSection.classList.remove('hidden');
            setTimeout(() => {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    } else if (target === '#contact') {
        const contactSection = document.querySelector('.contact-section');
        if (contactSection) {
            contactSection.classList.remove('hidden');
            setTimeout(() => {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    } else if (target === '#home') {
        // Scroll to top for home
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
}

// Modal Management
function setupModalControls() {
    // Close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) hideModal(modal.id);
        });
    });
    
    // Modal switching
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');
    const adminLoginLink = document.getElementById('adminLoginLink');
    
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            hideModal('loginModal');
            showModal('registerModal');
        });
    }
    
    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            hideModal('registerModal');
            showModal('loginModal');
        });
    }
    
    if (adminLoginLink) {
        adminLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            hideModal('loginModal');
            showAdminLogin();
        });
    }
    
    // Cart modal controls
    const closeCartBtn = document.getElementById('closeCartBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', () => {
            hideModal('cartModal');
        });
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (AppState.cart.length === 0) {
                showToast('Your cart is empty!', 'error');
                return;
            }
            
            if (!AppState.currentUser) {
                hideModal('cartModal');
                showModal('loginModal');
                return;
            }
            
            hideModal('cartModal');
            showModal('checkoutModal');
            displayCheckoutItems();
        });
    }
    
    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal(modal.id);
            }
        });
    });
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}

// Product Display
function displayFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;
    
    const featuredProducts = AppState.products.slice(0, 3);
    container.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
    
    console.log('Featured products displayed:', featuredProducts.length);
}

function displayMenuProducts(filteredProducts = null) {
    const container = document.getElementById('menuProducts');
    if (!container) return;
    
    const products = filteredProducts || AppState.products;
    container.innerHTML = products.map(product => createProductCard(product)).join('');
    
    console.log('Menu products displayed:', products.length);
}

function createProductCard(product) {
    return `
        <div class="card product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <div class="card__body product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <div class="product-price">$${product.price}</div>
                    <button class="btn btn--primary btn--sm" onclick="addToCart('${product.id}')">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Menu Filters
function setupMenuFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            // Filter products
            const category = e.target.dataset.category;
            filterProductsByCategory(category);
        });
    });
}

function filterProductsByCategory(category) {
    let filteredProducts;
    
    if (category === 'All') {
        filteredProducts = AppState.products;
    } else {
        filteredProducts = AppState.products.filter(product => product.category === category);
    }
    
    displayMenuProducts(filteredProducts);
}

function filterProducts(searchTerm) {
    if (!searchTerm.trim()) {
        displayMenuProducts();
        return;
    }
    
    const filteredProducts = AppState.products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    displayMenuProducts(filteredProducts);
}

// Cart Functionality
function addToCart(productId) {
    const product = AppState.products.find(p => p.id === productId);
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }
    
    const existingItem = AppState.cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        AppState.cart.push({
            productId: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartUI();
    saveAppData();
    showToast(`${product.name} added to cart!`);
    
    console.log('Item added to cart:', product.name);
}

function removeFromCart(productId) {
    const item = AppState.cart.find(item => item.productId === productId);
    AppState.cart = AppState.cart.filter(item => item.productId !== productId);
    updateCartUI();
    displayCartItems();
    saveAppData();
    
    if (item) {
        showToast(`${item.name} removed from cart!`);
    }
}

function updateCartQuantity(productId, change) {
    const item = AppState.cart.find(item => item.productId === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartUI();
        displayCartItems();
        saveAppData();
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function displayCartItems() {
    const container = document.getElementById('cartItems');
    const totalElement = document.getElementById('cartTotal');
    
    if (!container || !totalElement) return;
    
    if (AppState.cart.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary); padding: var(--space-20);">Your cart is empty</p>';
        totalElement.textContent = '0.00';
        return;
    }
    
    container.innerHTML = AppState.cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price}</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateCartQuantity('${item.productId}', -1)">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateCartQuantity('${item.productId}', 1)">+</button>
                <button class="remove-item" onclick="removeFromCart('${item.productId}')" title="Remove item">🗑️</button>
            </div>
        </div>
    `).join('');
    
    const total = AppState.cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
    totalElement.textContent = total.toFixed(2);
}

// Authentication
function setupForms() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleLogin();
        });
    }
    
    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleRegister();
        });
    }
    
    // Checkout form
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleCheckout();
        });
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleContactForm();
        });
    }
}

function handleLogin() {
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    
    if (!emailInput || !passwordInput) return;
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    // Check admin credentials
    if (email === AppState.adminCredentials.username && password === AppState.adminCredentials.password) {
        AppState.isAdmin = true;
        AppState.currentUser = { name: 'Admin', email: email, isAdmin: true };
        showAdminPanel();
        hideModal('loginModal');
        showToast('Admin login successful!');
        return;
    }
    
    // Regular user login (simplified - in real app, you'd validate against backend)
    const users = JSON.parse(localStorage.getItem('cateringUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        AppState.currentUser = user;
        updateAuthUI();
        hideModal('loginModal');
        showToast(`Welcome back, ${user.name}!`);
        saveAppData();
        
        // Clear form
        loginForm.reset();
    } else {
        showToast('Invalid email or password!', 'error');
    }
}

function handleRegister() {
    const nameInput = document.getElementById('registerName');
    const emailInput = document.getElementById('registerEmail');
    const phoneInput = document.getElementById('registerPhone');
    const addressInput = document.getElementById('registerAddress');
    const passwordInput = document.getElementById('registerPassword');
    
    if (!nameInput || !emailInput || !phoneInput || !addressInput || !passwordInput) return;
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const address = addressInput.value.trim();
    const password = passwordInput.value;
    
    // Basic validation
    if (!name || !email || !phone || !address || !password) {
        showToast('Please fill in all fields!', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address!', 'error');
        return;
    }
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('cateringUsers') || '[]');
    if (users.some(u => u.email === email)) {
        showToast('Email already registered!', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        address,
        password
    };
    
    users.push(newUser);
    localStorage.setItem('cateringUsers', JSON.stringify(users));
    
    AppState.currentUser = newUser;
    updateAuthUI();
    hideModal('registerModal');
    showToast(`Welcome, ${name}! Your account has been created.`);
    saveAppData();
    
    // Clear form
    registerForm.reset();
}

function handleLogout() {
    AppState.currentUser = null;
    AppState.isAdmin = false;
    updateAuthUI();
    hideAdminPanel();
    showToast('Logged out successfully!');
    saveAppData();
}

function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const userProfile = document.getElementById('userProfile');
    const userName = document.getElementById('userName');
    
    if (AppState.currentUser && !AppState.isAdmin) {
        if (loginBtn) loginBtn.classList.add('hidden');
        if (registerBtn) registerBtn.classList.add('hidden');
        if (userProfile) userProfile.classList.remove('hidden');
        if (userName) userName.textContent = AppState.currentUser.name;
    } else if (!AppState.isAdmin) {
        if (loginBtn) loginBtn.classList.remove('hidden');
        if (registerBtn) registerBtn.classList.remove('hidden');
        if (userProfile) userProfile.classList.add('hidden');
    }
}

function setupUserProfileActions() {
    const myOrdersBtn = document.getElementById('myOrdersBtn');
    const profileBtn = document.getElementById('profileBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (myOrdersBtn) {
        myOrdersBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showUserOrders();
        });
    }
    
    if (profileBtn) {
        profileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Profile management coming soon!');
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleLogout();
        });
    }
}

// Order Management
function handleCheckout() {
    if (!AppState.currentUser) {
        showToast('Please log in to continue!', 'error');
        return;
    }
    
    const eventDateInput = document.getElementById('eventDate');
    const eventTimeInput = document.getElementById('eventTime');
    const guestCountInput = document.getElementById('guestCount');
    const specialInstructionsInput = document.getElementById('specialInstructions');
    
    if (!eventDateInput || !eventTimeInput || !guestCountInput) return;
    
    const eventDate = eventDateInput.value;
    const eventTime = eventTimeInput.value;
    const guestCount = guestCountInput.value;
    const specialInstructions = specialInstructionsInput ? specialInstructionsInput.value : '';
    
    if (!eventDate || !eventTime || !guestCount) {
        showToast('Please fill in all required fields!', 'error');
        return;
    }
    
    // Validate event date is in the future
    const selectedDate = new Date(eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showToast('Event date must be in the future!', 'error');
        return;
    }
    
    const total = AppState.cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
    
    const order = {
        id: Date.now().toString(),
        userId: AppState.currentUser.id,
        items: [...AppState.cart],
        total: total.toFixed(2),
        status: 'Pending',
        date: new Date().toISOString().split('T')[0],
        eventDate,
        eventTime,
        guestCount,
        specialInstructions,
        customerInfo: {
            name: AppState.currentUser.name,
            email: AppState.currentUser.email,
            phone: AppState.currentUser.phone,
            address: AppState.currentUser.address
        }
    };
    
    AppState.orders.push(order);
    AppState.cart = [];
    
    updateCartUI();
    hideModal('checkoutModal');
    showToast('Order placed successfully! We will contact you soon.');
    saveAppData();
    
    // Clear form
    checkoutForm.reset();
}

function displayCheckoutItems() {
    const container = document.getElementById('checkoutItems');
    const totalElement = document.getElementById('checkoutTotal');
    
    if (!container || !totalElement) return;
    
    container.innerHTML = AppState.cart.map(item => `
        <div class="checkout-item">
            <span>${item.name} x ${item.quantity}</span>
            <span>$${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    const total = AppState.cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
    totalElement.textContent = total.toFixed(2);
}

function showUserOrders() {
    if (!AppState.currentUser) return;
    
    const userOrders = AppState.orders.filter(order => order.userId === AppState.currentUser.id);
    displayOrdersList(userOrders);
    showModal('ordersModal');
}

function displayOrdersList(orders) {
    const container = document.getElementById('ordersList');
    if (!container) return;
    
    if (orders.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary); padding: var(--space-20);">No orders found.</p>';
        return;
    }
    
    container.innerHTML = orders.map(order => `
        <div class="order-item">
            <div class="order-header">
                <span class="order-id">Order #${order.id}</span>
                <span class="order-date">${order.date}</span>
            </div>
            <div class="order-details">
                <p><strong>Event Date:</strong> ${order.eventDate} at ${order.eventTime}</p>
                <p><strong>Guests:</strong> ${order.guestCount}</p>
                <p><strong>Status:</strong> <span class="status status--${order.status.toLowerCase()}">${order.status}</span></p>
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item-detail">
                        <span>${item.name} x ${item.quantity}</span>
                        <span>$${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
            <div class="order-total">
                <span>Total: $${order.total}</span>
            </div>
        </div>
    `).join('');
}

// Admin Functionality
function showAdminLogin() {
    const email = prompt('Admin Email:');
    const password = prompt('Admin Password:');
    
    if (email === AppState.adminCredentials.username && password === AppState.adminCredentials.password) {
        AppState.isAdmin = true;
        AppState.currentUser = { name: 'Admin', email: email, isAdmin: true };
        showAdminPanel();
        showToast('Admin login successful!');
    } else {
        showToast('Invalid admin credentials!', 'error');
    }
}

function setupAdminFunctionality() {
    // Admin tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const tabName = e.target.dataset.tab;
            switchAdminTab(tabName);
        });
    });
    
    // Admin logout
    const adminLogoutBtn = document.getElementById('adminLogout');
    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', () => {
            handleLogout();
        });
    }
    
    // Add product button
    const addProductBtn = document.getElementById('addProductBtn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', () => {
            showAddProductForm();
        });
    }
}

function showAdminPanel() {
    const adminPanel = document.getElementById('adminPanel');
    const mainContent = document.getElementById('mainContent');
    
    if (adminPanel && mainContent) {
        adminPanel.classList.remove('hidden');
        mainContent.style.display = 'none';
        displayAdminOrders();
        displayAdminProducts();
        updateAuthUI();
    }
}

function hideAdminPanel() {
    const adminPanel = document.getElementById('adminPanel');
    const mainContent = document.getElementById('mainContent');
    
    if (adminPanel && mainContent) {
        adminPanel.classList.add('hidden');
        mainContent.style.display = 'block';
    }
}

function switchAdminTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeTab) activeTab.classList.add('active');
    
    // Update content
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    const activeSection = document.getElementById(`admin-${tabName}`);
    if (activeSection) activeSection.classList.add('active');
    
    // Load content based on tab
    if (tabName === 'orders') {
        displayAdminOrders();
    } else if (tabName === 'products') {
        displayAdminProducts();
    }
}

function displayAdminOrders() {
    const container = document.getElementById('adminOrdersList');
    if (!container) return;
    
    if (AppState.orders.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary); padding: var(--space-20);">No orders found.</p>';
        return;
    }
    
    container.innerHTML = AppState.orders.map(order => `
        <div class="admin-order-item">
            <div class="admin-order-header">
                <span><strong>Order #${order.id}</strong></span>
                <select class="status-select" onchange="updateOrderStatus('${order.id}', this.value)">
                    ${AppState.orderStatus.map(status => `
                        <option value="${status}" ${order.status === status ? 'selected' : ''}>${status}</option>
                    `).join('')}
                </select>
            </div>
            <div class="order-details">
                <p><strong>Customer:</strong> ${order.customerInfo.name} (${order.customerInfo.email})</p>
                <p><strong>Event:</strong> ${order.eventDate} at ${order.eventTime} for ${order.guestCount} guests</p>
                <p><strong>Items:</strong> ${order.items.map(item => `${item.name} x ${item.quantity}`).join(', ')}</p>
                <p><strong>Total:</strong> $${order.total}</p>
                <p><strong>Date:</strong> ${order.date}</p>
            </div>
        </div>
    `).join('');
}

function displayAdminProducts() {
    const container = document.getElementById('adminProductsList');
    if (!container) return;
    
    container.innerHTML = `
        <div class="table-row table-header">
            <span>ID</span>
            <span>Name</span>
            <span>Category</span>
            <span>Price</span>
            <span>Actions</span>
        </div>
        ${AppState.products.map(product => `
            <div class="table-row">
                <span>${product.id}</span>
                <span>${product.name}</span>
                <span>${product.category}</span>
                <span>$${product.price}</span>
                <span>
                    <button class="btn btn--outline btn--sm" onclick="editProduct('${product.id}')">Edit</button>
                    <button class="btn btn--outline btn--sm" onclick="deleteProduct('${product.id}')">Delete</button>
                </span>
            </div>
        `).join('')}
    `;
}

function updateOrderStatus(orderId, newStatus) {
    const order = AppState.orders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        saveAppData();
        showToast(`Order #${orderId} status updated to ${newStatus}`);
    }
}

function editProduct(productId) {
    const product = AppState.products.find(p => p.id === productId);
    if (!product) return;
    
    const name = prompt('Product Name:', product.name);
    if (!name) return;
    
    const category = prompt('Category:', product.category);
    if (!category) return;
    
    const price = prompt('Price:', product.price);
    if (!price || isNaN(parseFloat(price))) return;
    
    const description = prompt('Description:', product.description);
    if (!description) return;
    
    // Update product
    product.name = name;
    product.category = category;
    product.price = price;
    product.description = description;
    
    saveAppData();
    displayAdminProducts();
    displayFeaturedProducts();
    showToast('Product updated successfully!');
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        AppState.products = AppState.products.filter(p => p.id !== productId);
        saveAppData();
        displayAdminProducts();
        displayFeaturedProducts();
        showToast('Product deleted successfully!');
    }
}

function showAddProductForm() {
    const name = prompt('Product Name:');
    if (!name) return;
    
    const category = prompt('Category (Wedding/Corporate/Party/Indian/BBQ/Healthy):');
    if (!category) return;
    
    const price = prompt('Price:');
    if (!price || isNaN(parseFloat(price))) return;
    
    const description = prompt('Description:');
    if (!description) return;
    
    const image = prompt('Image URL:', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400');
    if (!image) return;
    
    const newProduct = {
        id: Date.now().toString(),
        name,
        category,
        price,
        description,
        image,
        status: 'Available'
    };
    
    AppState.products.push(newProduct);
    saveAppData();
    displayAdminProducts();
    displayFeaturedProducts();
    showToast('Product added successfully!');
}

// Contact Form
function handleContactForm() {
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const eventTypeInput = document.getElementById('contactEventType');
    const messageInput = document.getElementById('contactMessage');
    
    if (!nameInput || !emailInput || !messageInput) return;
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const eventType = eventTypeInput ? eventTypeInput.value : '';
    const message = messageInput.value.trim();
    
    if (!name || !email || !message) {
        showToast('Please fill in all required fields!', 'error');
        return;
    }
    
    // In a real app, you would send this to a backend
    showToast('Thank you for your message! We will get back to you soon.');
    
    // Clear form
    nameInput.value = '';
    emailInput.value = '';
    if (eventTypeInput) eventTypeInput.value = '';
    messageInput.value = '';
}

// Toast Notifications
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (!toast || !toastMessage) return;
    
    const toastContent = toast.querySelector('.toast-content');
    
    toastMessage.textContent = message;
    
    // Set toast type
    if (toastContent) {
        toastContent.className = 'toast-content';
        if (type === 'error') {
            toastContent.style.background = 'var(--color-error)';
        } else if (type === 'warning') {
            toastContent.style.background = 'var(--color-warning)';
        } else {
            toastContent.style.background = 'var(--color-success)';
        }
    }
    
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 300);
    }, 3000);
}

// Global functions (needed for onclick handlers)
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.updateOrderStatus = updateOrderStatus;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;