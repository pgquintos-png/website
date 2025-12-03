// Medical Products Database
const medicalProducts = [
    {
        id: 1,
        name: "Digital Blood Pressure Monitor",
        category: "monitoring",
        price: 89.99,
        description: "Accurate automatic blood pressure monitoring with large LCD display and memory function.",
        rating: 4.8,
        reviews: 234,
        inStock: true,
        badge: "Best Seller",
        image: "images/blood-pressure-monitor.jpg"  // Add your image path here
    },
    {
        id: 2,
        name: "Infrared Thermometer",
        category: "diagnostic",
        price: 45.99,
        description: "Non-contact forehead thermometer with instant readings and fever alarm system.",
        rating: 4.6,
        reviews: 567,
        inStock: true,
        badge: null,
        image: "images/thermometer.jpg"  // Add your image path here
    },
    {
        id: 3,
        name: "N95 Respirator Masks (Box of 20)",
        category: "protective",
        price: 34.99,
        description: "NIOSH-approved N95 masks providing 95% filtration efficiency against airborne particles.",
        rating: 4.9,
        reviews: 892,
        inStock: true,
        badge: "Popular",
        image: "images/n95-mask.jpg"
    },
    {
        id: 4,
        name: "Pulse Oximeter",
        category: "monitoring",
        price: 29.99,
        description: "Fingertip pulse oximeter for measuring SpO2 and heart rate with OLED display.",
        rating: 4.7,
        reviews: 445,
        inStock: true,
        badge: null,
        image: "images/pulse-oximeter.jpg"
    },
    {
        id: 5,
        name: "Digital Stethoscope",
        category: "diagnostic",
        price: 199.99,
        description: "Professional electronic stethoscope with amplification and noise reduction technology.",
        rating: 4.5,
        reviews: 156,
        inStock: true,
        badge: "Pro",
        image: "images/stethoscope.jpg"
    },
    {
        id: 6,
        name: "Surgical Gloves (100 Pack)",
        category: "protective",
        price: 24.99,
        description: "Latex-free nitrile examination gloves, powder-free and highly durable.",
        rating: 4.8,
        reviews: 678,
        inStock: true,
        badge: null,
        image: "images/surgical-gloves.jpg"
    },
    {
        id: 7,
        name: "Glucose Monitoring System",
        category: "monitoring",
        price: 119.99,
        description: "Complete blood glucose monitoring kit with meter, test strips, and lancing device.",
        rating: 4.6,
        reviews: 321,
        inStock: true,
        badge: "Complete Kit",
        image: "images/glucose-monitor.jpg"
    },
    {
        id: 8,
        name: "Surgical Scissors Set",
        category: "surgical",
        price: 79.99,
        description: "Professional-grade stainless steel surgical scissors, autoclavable and corrosion-resistant.",
        rating: 4.9,
        reviews: 203,
        inStock: true,
        badge: null,
        image: "images/surgical-scissors.jpg"
    },
    {
        id: 9,
        name: "Medical Face Shields (Pack of 10)",
        category: "protective",
        price: 19.99,
        description: "Clear protective face shields with anti-fog coating and adjustable headband.",
        rating: 4.4,
        reviews: 412,
        inStock: true,
        badge: null,
        image: "images/face-shields.jpg"
    },
    {
        id: 10,
        name: "ECG Machine - 12 Lead",
        category: "diagnostic",
        price: 1299.99,
        description: "Portable 12-lead ECG machine with color touchscreen and wireless connectivity.",
        rating: 4.7,
        reviews: 87,
        inStock: true,
        badge: "Professional",
        image: "images/ecg-machine.jpg"
    },
    {
        id: 11,
        name: "Nebulizer System",
        category: "monitoring",
        price: 69.99,
        description: "Compact nebulizer for respiratory treatments with quiet operation and multiple masks.",
        rating: 4.5,
        reviews: 289,
        inStock: true,
        badge: null,
        image: "images/nebulizer.jpg"
    },
    {
        id: 12,
        name: "Surgical Suture Kit",
        category: "surgical",
        price: 149.99,
        description: "Complete suture practice kit with various suture types, needle holders, and forceps.",
        rating: 4.8,
        reviews: 167,
        inStock: true,
        badge: "Training Kit",
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
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                ${product.image 
                    ? `<img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">` 
                    : `<svg class="product-icon" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        ${getProductIcon(product.category)}
                    </svg>`
                }
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    ${generateStars(product.rating)}
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <div class="product-price">$${product.price.toFixed(2)}</div>
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
        if (cart.length === 0) {
            showNotification('Your cart is empty');
        } else {
            showNotification(`You have ${cart.length} item(s) in your cart`);
        }
    });
}

// Add CSS animations for notifications
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
`;
document.head.appendChild(style);

