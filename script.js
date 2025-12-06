// Medical Products Database
const medicalProducts = [
    {
        id: 1,
        name: "YSSTG0102 MORGUE FREEZER",
        category: "monitoring",
        description: "a two-body morgue freezer designed for hospitals and funeral homes, constructed from stainless steel for durability and corrosion resistance",
        inStock: true,
        image: "images/YSSTG0102-MORGUE-FREEZER.png"  // Add your image path here
    },
    {
        id: 2,
        name: "YSCFJ-3 CORPSE STORAGE RACK",
        category: "diagnostic",
        description: "a 3-tiered mortuary cadaver storage rack made of 304 stainless steel, designed for secure and space-efficient storage of deceased bodies in medical and funeral facilities",
        inStock: true,
        image: "images/YSCFJ-3-CORPSE-STORAGE-RACK.png"  // Add your image path here
    },
    {
        id: 3,
        name: "YSTSC-2D CORPSE TRANSFER TROLLEY WITH COVER",
        category: "protective",
        description: "a piece of stainless steel mortuary equipment used for the discreet and hygienic transport of deceased individuals",
        inStock: true,
        image: "images/YSTSC-2D-CORPSE-TRANSFER-TROLLEY-WITH-COVER.png"
    },
    {
        id: 4,
        name: "YSJPT10B MULTI-FUNCTIONAL AUTOPSY TABLE",
        category: "monitoring",
        description: "a high-quality, stainless steel table designed for prosectoriums, featuring a durable, easy-to-clean surface, and integrated systems for water, drainage, and ventilation",
        inStock: true,
        image: "images/YSJPT10B-MULTI-FUNCTIONAL-AUTOPSY-TABLE.png"
    },
    {
        id: 5,
        name: "Digital Stethoscope",
        category: "diagnostic",
        description: "Professional electronic stethoscope with amplification and noise reduction technology.",
        inStock: true,
        image: "images/stethoscope.jpg"
    },
    {
        id: 6,
        name: "Surgical Gloves (100 Pack)",
        category: "protective",
        description: "Latex-free nitrile examination gloves, powder-free and highly durable.",
        inStock: true,
        image: "images/surgical-gloves.jpg"
    },
    {
        id: 7,
        name: "Glucose Monitoring System",
        category: "monitoring",
        description: "Complete blood glucose monitoring kit with meter, test strips, and lancing device.",
        inStock: true,
        image: "images/glucose-monitor.jpg"
    },
    {
        id: 8,
        name: "Surgical Scissors Set",
        category: "surgical",
        description: "Professional-grade stainless steel surgical scissors, autoclavable and corrosion-resistant.",
        inStock: true,
        image: "images/surgical-scissors.jpg"
    },
    {
        id: 9,
        name: "Medical Face Shields (Pack of 10)",
        category: "protective",
        description: "Clear protective face shields with anti-fog coating and adjustable headband.",
        inStock: true,
        image: "images/face-shields.jpg"
    },
    {
        id: 10,
        name: "ECG Machine - 12 Lead",
        category: "diagnostic",
        description: "Portable 12-lead ECG machine with color touchscreen and wireless connectivity.",
        inStock: true,
        image: "images/ecg-machine.jpg"
    },
    {
        id: 11,
        name: "Nebulizer System",
        category: "monitoring",
        description: "Compact nebulizer for respiratory treatments with quiet operation and multiple masks.",
        inStock: true,
        image: "images/nebulizer.jpg"
    },
    {
        id: 12,
        name: "Surgical Suture Kit",
        category: "surgical",
        description: "Complete suture practice kit with various suture types, needle holders, and forceps.",
        inStock: true,
        image: "images/suture-kit.jpg"
    }
];

// State management
let cart = [];
let currentFilter = 'all';
let searchQuery = '';

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartCountElement = document.querySelector('.cart-count');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(medicalProducts);
    setupEventListeners();
});

// Render products to the grid
function renderProducts(products) {
    if (products.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <h3 style="font-size: 24px; color: #6b7280; margin-bottom: 12px;">No products found</h3>
                <p style="color: #9ca3af;">Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                ${product.image 
                    ? `<img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: contain; object-position: center;">` 
                    : `<svg class="product-icon" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        ${getProductIcon(product.category)}
                    </svg>`
                }
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                ${product.rating && product.reviews ? `
                <div class="product-rating">
                    ${generateStars(product.rating)}
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                ` : ''}
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    ${product.price ? `<div class="product-price">$${product.price.toFixed(2)}</div>` : ''}
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Get appropriate icon for product category
function getProductIcon(category) {
    const icons = {
        diagnostic: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
        protective: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
        monitoring: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
        surgical: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>'
    };
    return icons[category] || '<circle cx="12" cy="12" r="10"/>';
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<span class="star">★</span>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<span class="star">★</span>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<span class="star" style="color: #d1d5db;">★</span>';
    }
    
    return starsHTML;
}

// Filter products
function filterProducts() {
    let filtered = medicalProducts;
    
    // Apply category filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(product => product.category === currentFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    
    renderProducts(filtered);
}

// Add to cart functionality
function addToCart(productId) {
    const product = medicalProducts.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        showNotification(`${product.name} added to cart!`);
    }
}

// Update cart count
function updateCartCount() {
    cartCountElement.textContent = cart.length;
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: #10b981;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        filterProducts();
    });
    
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Update current filter
            currentFilter = button.dataset.category;
            // Filter products
            filterProducts();
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Cart button click
    document.querySelector('.cart-btn').addEventListener('click', () => {
        showCartModal();
    });
}

// Show cart modal
function showCartModal() {
    // Create modal if it doesn't exist
    let modal = document.getElementById('cartModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'cartModal';
        modal.className = 'cart-modal';
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeCartModal();
            }
        });
    }
    
    // Render cart contents
    renderCartModal();
    modal.style.display = 'flex';
}

// Close cart modal
function closeCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Render cart modal content
function renderCartModal() {
    const modal = document.getElementById('cartModal');
    if (!modal) return;
    
    if (cart.length === 0) {
        modal.innerHTML = `
            <div class="cart-modal-content">
                <div class="cart-modal-header">
                    <h2>Shopping Cart</h2>
                    <button class="close-btn" onclick="closeCartModal()">×</button>
                </div>
                <div class="cart-empty">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <circle cx="9" cy="21" r="1"/>
                        <circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    <h3>Your cart is empty</h3>
                    <p>Add some products to get started</p>
                    <button class="btn btn-primary" onclick="closeCartModal()">Continue Shopping</button>
                </div>
            </div>
        `;
    } else {
        const cartItems = cart.map((product, index) => `
            <div class="cart-item">
                <div class="cart-item-image">
                    ${product.image 
                        ? `<img src="${product.image}" alt="${product.name}">` 
                        : `<svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            ${getProductIcon(product.category)}
                        </svg>`
                    }
                </div>
                <div class="cart-item-details">
                    <h4>${product.name}</h4>
                    <p class="cart-item-category">${product.category}</p>
                    ${product.price ? `<p class="cart-item-price">$${product.price.toFixed(2)}</p>` : ''}
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, product) => sum + (product.price || 0), 0);
        
        modal.innerHTML = `
            <div class="cart-modal-content">
                <div class="cart-modal-header">
                    <h2>Shopping Cart (${cart.length})</h2>
                    <button class="close-btn" onclick="closeCartModal()">×</button>
                </div>
                <div class="cart-items">
                    ${cartItems}
                </div>
                <div class="cart-modal-footer">
                    ${total > 0 ? `
                    <div class="cart-total">
                        <span>Total:</span>
                        <span class="cart-total-amount">$${total.toFixed(2)}</span>
                    </div>
                    ` : ''}
                    <button class="btn btn-primary" onclick="checkout()">Proceed to Checkout</button>
                    <button class="btn btn-secondary" onclick="closeCartModal()">Continue Shopping</button>
                </div>
            </div>
        `;
    }
}

// Remove item from cart
function removeFromCart(index) {
    const product = cart[index];
    cart.splice(index, 1);
    updateCartCount();
    renderCartModal();
    showNotification(`${product.name} removed from cart`);
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty');
        return;
    }
    showNotification('Checkout functionality coming soon!');
    closeCartModal();
}

// Add CSS animations for notifications and cart modal
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    /* Cart Modal Styles */
    .cart-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10000;
        justify-content: center;
        align-items: center;
        padding: 20px;
    }
    
    .cart-modal-content {
        background: white;
        border-radius: 12px;
        max-width: 600px;
        width: 100%;
        max-height: 80vh;
        display: flex;
        flex-direction: column;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }
    
    .cart-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .cart-modal-header h2 {
        margin: 0;
        font-size: 24px;
        color: #111827;
    }
    
    .close-btn {
        background: none;
        border: none;
        font-size: 36px;
        color: #6b7280;
        cursor: pointer;
        line-height: 1;
        padding: 0;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        transition: all 0.2s;
    }
    
    .close-btn:hover {
        background: #f3f4f6;
        color: #111827;
    }
    
    .cart-items {
        flex: 1;
        overflow-y: auto;
        padding: 24px;
    }
    
    .cart-item {
        display: flex;
        gap: 16px;
        padding: 16px;
        background: #f9fafb;
        border-radius: 8px;
        margin-bottom: 12px;
        position: relative;
    }
    
    .cart-item-image {
        width: 80px;
        height: 80px;
        flex-shrink: 0;
        background: white;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    
    .cart-item-image img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    
    .cart-item-image svg {
        color: #9ca3af;
    }
    
    .cart-item-details {
        flex: 1;
    }
    
    .cart-item-details h4 {
        margin: 0 0 8px 0;
        font-size: 16px;
        color: #111827;
    }
    
    .cart-item-category {
        font-size: 14px;
        color: #6b7280;
        text-transform: capitalize;
        margin: 0 0 8px 0;
    }
    
    .cart-item-price {
        font-size: 18px;
        font-weight: 600;
        color: #059669;
        margin: 0;
    }
    
    .cart-item-remove {
        background: white;
        border: 1px solid #e5e7eb;
        width: 32px;
        height: 32px;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ef4444;
        transition: all 0.2s;
        flex-shrink: 0;
    }
    
    .cart-item-remove:hover {
        background: #fee2e2;
        border-color: #ef4444;
    }
    
    .cart-modal-footer {
        padding: 24px;
        border-top: 1px solid #e5e7eb;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    
    .cart-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 20px;
        font-weight: 600;
        color: #111827;
        margin-bottom: 8px;
    }
    
    .cart-total-amount {
        color: #059669;
    }
    
    .cart-empty {
        padding: 60px 24px;
        text-align: center;
        color: #6b7280;
    }
    
    .cart-empty svg {
        margin: 0 auto 24px;
        color: #d1d5db;
    }
    
    .cart-empty h3 {
        font-size: 24px;
        color: #111827;
        margin: 0 0 8px 0;
    }
    
    .cart-empty p {
        margin: 0 0 24px 0;
        font-size: 16px;
    }
`;
document.head.appendChild(style);

