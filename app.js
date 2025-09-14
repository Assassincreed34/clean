// Padamavati Cleaning Products App JavaScript

// Product data
const productsData = {
  "cleaning_products": [
    {
      "id": 1,
      "name": "Floor Cleaner - Pine Fresh",
      "category": "Floor Cleaners",
      "price": 120,
      "unit": "1L",
      "description": "Powerful floor cleaner with pine fragrance. Suitable for all floor types including tiles, marble, and granite.",
      "image": "floor_cleaner_pine.jpg",
      "in_stock": true,
      "rating": 4.5
    },
    {
      "id": 2,
      "name": "White Phenyl",
      "category": "Phenyl",
      "price": 80,
      "unit": "1L",
      "description": "High-quality white phenyl for effective floor and toilet cleaning. Long-lasting fragrance.",
      "image": "white_phenyl.jpg",
      "in_stock": true,
      "rating": 4.2
    },
    {
      "id": 3,
      "name": "Black Phenyl",
      "category": "Phenyl",
      "price": 85,
      "unit": "1L",
      "description": "Industrial strength black phenyl for heavy-duty cleaning. Perfect for toilets and floors.",
      "image": "black_phenyl.jpg",
      "in_stock": true,
      "rating": 4.3
    },
    {
      "id": 4,
      "name": "Toilet Bowl Cleaner",
      "category": "Toilet Cleaners",
      "price": 150,
      "unit": "500ml",
      "description": "Powerful toilet bowl cleaner that removes tough stains and kills 99.9% germs. Fresh lemon fragrance.",
      "image": "toilet_cleaner.jpg",
      "in_stock": true,
      "rating": 4.6
    },
    {
      "id": 5,
      "name": "Bathroom Cleaner - Antibacterial",
      "category": "Bathroom Cleaners",
      "price": 180,
      "unit": "500ml",
      "description": "Complete bathroom cleaning solution. Removes soap scum, water stains, and kills bacteria.",
      "image": "bathroom_cleaner.jpg",
      "in_stock": true,
      "rating": 4.4
    },
    {
      "id": 6,
      "name": "Glass Cleaner",
      "category": "Glass Cleaners", 
      "price": 100,
      "unit": "500ml",
      "description": "Streak-free glass cleaner for windows, mirrors, and glass surfaces. Ammonia-free formula.",
      "image": "glass_cleaner.jpg",
      "in_stock": true,
      "rating": 4.1
    },
    {
      "id": 7,
      "name": "Kitchen Degreaser",
      "category": "Kitchen Cleaners",
      "price": 200,
      "unit": "500ml",
      "description": "Heavy-duty kitchen degreaser for removing oil, grease, and food stains from kitchen surfaces.",
      "image": "kitchen_degreaser.jpg",
      "in_stock": true,
      "rating": 4.5
    },
    {
      "id": 8,
      "name": "Multi-Surface Cleaner",
      "category": "Multi-Purpose",
      "price": 160,
      "unit": "1L",
      "description": "Versatile cleaner suitable for multiple surfaces. Safe for use on wood, plastic, and metal.",
      "image": "multi_surface.jpg",
      "in_stock": true,
      "rating": 4.3
    },
    {
      "id": 9,
      "name": "Disinfectant Spray",
      "category": "Disinfectants",
      "price": 220,
      "unit": "500ml",
      "description": "Hospital-grade disinfectant spray. Kills 99.9% of viruses and bacteria. Suitable for all surfaces.",
      "image": "disinfectant_spray.jpg",
      "in_stock": true,
      "rating": 4.7
    },
    {
      "id": 10,
      "name": "Carpet Cleaner",
      "category": "Specialty Cleaners",
      "price": 250,
      "unit": "1L",
      "description": "Deep cleaning carpet cleaner that removes stains, odors, and revives carpet fibers.",
      "image": "carpet_cleaner.jpg",
      "in_stock": true,
      "rating": 4.2
    }
  ],
  "categories": [
    "Floor Cleaners",
    "Phenyl", 
    "Toilet Cleaners",
    "Bathroom Cleaners",
    "Glass Cleaners",
    "Kitchen Cleaners", 
    "Multi-Purpose",
    "Disinfectants",
    "Specialty Cleaners"
  ]
};

// Category icons mapping
const categoryIcons = {
  "Floor Cleaners": "fas fa-home",
  "Phenyl": "fas fa-tint",
  "Toilet Cleaners": "fas fa-toilet",
  "Bathroom Cleaners": "fas fa-bath",
  "Glass Cleaners": "fas fa-window-maximize",
  "Kitchen Cleaners": "fas fa-utensils",
  "Multi-Purpose": "fas fa-magic",
  "Disinfectants": "fas fa-shield-virus",
  "Specialty Cleaners": "fas fa-star"
};

// App state
let cart = [];
let isAdminMode = false;
let currentEditingProduct = null;
let filteredProducts = [...productsData.cleaning_products];

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
  setupEventListeners();
});

function initializeApp() {
  renderCategories();
  renderProducts();
  populateCategoryFilter();
  updateCartDisplay();
}

function setupEventListeners() {
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const adminToggle = document.querySelector('.admin-toggle');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const clearCartBtn = document.getElementById('clearCartBtn');
  const priceModal = document.getElementById('priceModal');
  const modalClose = document.querySelector('.modal-close');
  const cancelEdit = document.getElementById('cancelEdit');
  const savePrice = document.getElementById('savePrice');
  
  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }
  
  // Category filter
  if (categoryFilter) {
    categoryFilter.addEventListener('change', handleCategoryFilter);
  }
  
  // Admin mode toggle
  if (adminToggle) {
    adminToggle.addEventListener('click', toggleAdminMode);
  }
  
  // Cart actions
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', handleCheckout);
  }
  
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', clearCart);
  }
  
  // Modal controls
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  if (cancelEdit) {
    cancelEdit.addEventListener('click', closeModal);
  }
  
  if (savePrice) {
    savePrice.addEventListener('click', savePriceChange);
  }
  
  // Close modal on outside click
  if (priceModal) {
    priceModal.addEventListener('click', function(e) {
      if (e.target === priceModal) {
        closeModal();
      }
    });
  }
  
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
}

function renderCategories() {
  const categoriesGrid = document.getElementById('categoriesGrid');
  if (!categoriesGrid) return;
  
  categoriesGrid.innerHTML = productsData.categories.map(category => `
    <div class="category-card" data-category="${category}">
      <i class="${categoryIcons[category] || 'fas fa-box'}"></i>
      <h4>${category}</h4>
    </div>
  `).join('');
  
  // Add click event listeners to category cards
  categoriesGrid.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      filterByCategory(category);
    });
  });
}

function renderProducts(products = null) {
  const productsGrid = document.getElementById('productsGrid');
  if (!productsGrid) return;
  
  const productsToRender = products || filteredProducts;
  
  if (productsToRender.length === 0) {
    productsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--color-text-secondary);">
        <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem;"></i>
        <p>No products found matching your criteria.</p>
      </div>
    `;
    return;
  }
  
  productsGrid.innerHTML = productsToRender.map(product => `
    <div class="product-card">
      <div class="product-image">
        <i class="fas fa-spray-can"></i>
      </div>
      <div class="product-info">
        <div class="product-header">
          <h4 class="product-name">${product.name}</h4>
          <div class="product-price ${isAdminMode ? 'editable' : ''}" data-product-id="${product.id}">
            ₹${product.price}
            <i class="fas fa-edit price-edit-icon"></i>
          </div>
        </div>
        <div class="product-unit">${product.unit}</div>
        <p class="product-description">${product.description}</p>
        <div class="product-rating">
          <div class="stars">${generateStars(product.rating)}</div>
          <span class="rating-value">${product.rating}</span>
        </div>
        <div class="product-actions">
          <div class="quantity-selector">
            <button class="quantity-btn" data-product-id="${product.id}" data-action="decrease">-</button>
            <input type="number" class="quantity-input" id="qty-${product.id}" value="1" min="1" max="99">
            <button class="quantity-btn" data-product-id="${product.id}" data-action="increase">+</button>
          </div>
          <button class="btn btn--primary add-to-cart" data-product-id="${product.id}">
            <i class="fas fa-cart-plus"></i>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `).join('');
  
  // Add event listeners to dynamically created elements
  addProductEventListeners();
}

function addProductEventListeners() {
  // Add to cart buttons
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const productId = parseInt(this.getAttribute('data-product-id'));
      addToCart(productId);
    });
  });
  
  // Quantity buttons
  document.querySelectorAll('.quantity-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const productId = parseInt(this.getAttribute('data-product-id'));
      const action = this.getAttribute('data-action');
      const change = action === 'increase' ? 1 : -1;
      changeQuantity(productId, change);
    });
  });
  
  // Price edit (admin mode)
  document.querySelectorAll('.product-price').forEach(priceEl => {
    priceEl.addEventListener('click', function() {
      if (isAdminMode) {
        const productId = parseInt(this.getAttribute('data-product-id'));
        editPrice(productId);
      }
    });
  });
  
  // Quantity inputs
  document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', function() {
      let value = parseInt(this.value);
      if (isNaN(value) || value < 1) {
        this.value = 1;
      } else if (value > 99) {
        this.value = 99;
      }
    });
  });
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let stars = '';
  
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }
  
  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }
  
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star"></i>';
  }
  
  return stars;
}

function populateCategoryFilter() {
  const categoryFilter = document.getElementById('categoryFilter');
  if (!categoryFilter) return;
  
  const options = productsData.categories.map(category => 
    `<option value="${category}">${category}</option>`
  ).join('');
  categoryFilter.innerHTML = `<option value="">All Categories</option>${options}`;
}

function handleSearch() {
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
  const categoryValue = categoryFilter ? categoryFilter.value : '';
  
  let filtered = [...productsData.cleaning_products];
  
  if (searchTerm) {
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }
  
  if (categoryValue) {
    filtered = filtered.filter(product => product.category === categoryValue);
  }
  
  filteredProducts = filtered;
  renderProducts();
}

function handleCategoryFilter() {
  handleSearch(); // This handles both search and category filtering
}

function filterByCategory(category) {
  const categoryFilter = document.getElementById('categoryFilter');
  if (categoryFilter) {
    categoryFilter.value = category;
  }
  handleCategoryFilter();
  
  // Scroll to products section
  const productsSection = document.getElementById('products');
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function changeQuantity(productId, change) {
  const qtyInput = document.getElementById(`qty-${productId}`);
  if (!qtyInput) return;
  
  let newQty = parseInt(qtyInput.value) + change;
  
  if (newQty < 1) newQty = 1;
  if (newQty > 99) newQty = 99;
  
  qtyInput.value = newQty;
}

function addToCart(productId) {
  const product = productsData.cleaning_products.find(p => p.id === productId);
  const qtyInput = document.getElementById(`qty-${productId}`);
  
  if (!product || !qtyInput) return;
  
  const quantity = parseInt(qtyInput.value) || 1;
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      ...product,
      quantity: quantity
    });
  }
  
  // Reset quantity input to 1
  qtyInput.value = 1;
  
  updateCartDisplay();
  showAddToCartAnimation();
}

function showAddToCartAnimation() {
  const cartCountElement = document.querySelector('.cart-count');
  if (cartCountElement) {
    cartCountElement.style.transform = 'scale(1.5)';
    cartCountElement.style.transition = 'transform 0.2s ease';
    
    setTimeout(() => {
      cartCountElement.style.transform = 'scale(1)';
    }, 200);
  }
}

function updateCartQuantity(productId, newQuantity) {
  if (newQuantity <= 0) {
    removeFromCart(productId);
    return;
  }
  
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = newQuantity;
    updateCartDisplay();
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartDisplay();
}

function clearCart() {
  if (cart.length === 0) return;
  
  if (confirm('Are you sure you want to clear your cart?')) {
    cart = [];
    updateCartDisplay();
  }
}

function updateCartDisplay() {
  const cartCount = document.querySelector('.cart-count');
  const cartTotal = document.getElementById('cartTotal');
  const cartItems = document.getElementById('cartItems');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const clearCartBtn = document.getElementById('clearCartBtn');
  
  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCount) {
    cartCount.textContent = totalItems;
  }
  
  // Update cart total
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (cartTotal) {
    cartTotal.textContent = total;
  }
  
  // Update cart items display
  if (cartItems) {
    if (cart.length === 0) {
      cartItems.innerHTML = `
        <div class="empty-cart">
          <i class="fas fa-shopping-cart"></i>
          <p>Your cart is empty</p>
        </div>
      `;
    } else {
      cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
          <div class="cart-item-image">
            <i class="fas fa-spray-can"></i>
          </div>
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">₹${item.price} / ${item.unit}</div>
          </div>
          <div class="cart-item-controls">
            <button class="quantity-btn cart-decrease" data-product-id="${item.id}">-</button>
            <span style="margin: 0 12px; font-weight: 500;">${item.quantity}</span>
            <button class="quantity-btn cart-increase" data-product-id="${item.id}">+</button>
            <button class="btn btn--secondary btn--sm cart-remove" data-product-id="${item.id}" style="margin-left: 12px;">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      `).join('');
      
      // Add event listeners for cart controls
      addCartEventListeners();
    }
  }
  
  // Enable/disable buttons
  if (checkoutBtn) {
    checkoutBtn.disabled = cart.length === 0;
  }
  if (clearCartBtn) {
    clearCartBtn.disabled = cart.length === 0;
  }
}

function addCartEventListeners() {
  // Cart quantity decrease
  document.querySelectorAll('.cart-decrease').forEach(btn => {
    btn.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-product-id'));
      const item = cart.find(item => item.id === productId);
      if (item) {
        updateCartQuantity(productId, item.quantity - 1);
      }
    });
  });
  
  // Cart quantity increase
  document.querySelectorAll('.cart-increase').forEach(btn => {
    btn.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-product-id'));
      const item = cart.find(item => item.id === productId);
      if (item) {
        updateCartQuantity(productId, item.quantity + 1);
      }
    });
  });
  
  // Remove from cart
  document.querySelectorAll('.cart-remove').forEach(btn => {
    btn.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-product-id'));
      removeFromCart(productId);
    });
  });
}

function toggleAdminMode() {
  isAdminMode = !isAdminMode;
  const adminToggle = document.querySelector('.admin-toggle');
  
  if (adminToggle) {
    adminToggle.classList.toggle('active', isAdminMode);
    adminToggle.textContent = isAdminMode ? 'Exit Admin' : 'Admin Mode';
  }
  
  document.body.classList.toggle('admin-mode', isAdminMode);
  
  // Re-render products to update admin interface
  renderProducts();
}

function editPrice(productId) {
  if (!isAdminMode) return;
  
  const product = productsData.cleaning_products.find(p => p.id === productId);
  if (!product) return;
  
  currentEditingProduct = product;
  
  const editProductName = document.getElementById('editProductName');
  const newPriceInput = document.getElementById('newPriceInput');
  const priceModal = document.getElementById('priceModal');
  
  if (editProductName) {
    editProductName.textContent = product.name;
  }
  if (newPriceInput) {
    newPriceInput.value = product.price;
  }
  if (priceModal) {
    priceModal.classList.remove('hidden');
    if (newPriceInput) {
      newPriceInput.focus();
    }
  }
}

function closeModal() {
  const priceModal = document.getElementById('priceModal');
  if (priceModal) {
    priceModal.classList.add('hidden');
  }
  currentEditingProduct = null;
}

function savePriceChange() {
  if (!currentEditingProduct) return;
  
  const newPriceInput = document.getElementById('newPriceInput');
  if (!newPriceInput) return;
  
  const newPrice = parseFloat(newPriceInput.value);
  if (isNaN(newPrice) || newPrice <= 0) {
    alert('Please enter a valid price');
    return;
  }
  
  currentEditingProduct.price = newPrice;
  
  // Update cart items if they exist
  const cartItem = cart.find(item => item.id === currentEditingProduct.id);
  if (cartItem) {
    cartItem.price = newPrice;
  }
  
  renderProducts();
  updateCartDisplay();
  closeModal();
}

function handleCheckout() {
  if (cart.length === 0) return;
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemsList = cart.map(item => 
    `${item.name} (${item.unit}) - Qty: ${item.quantity} - ₹${item.price * item.quantity}`
  ).join('\n');
  
  const message = `Hello! I would like to place an order from Padamavati Cleaning Products:\n\n${itemsList}\n\nTotal: ₹${total}\n\nPlease confirm the order and delivery details.`;
  
  const whatsappUrl = `https://wa.me/919591936066?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
  // Escape key to close modal
  if (e.key === 'Escape') {
    const priceModal = document.getElementById('priceModal');
    if (priceModal && !priceModal.classList.contains('hidden')) {
      closeModal();
    }
  }
  
  // Enter key to save price in modal
  if (e.key === 'Enter') {
    const priceModal = document.getElementById('priceModal');
    if (priceModal && !priceModal.classList.contains('hidden')) {
      savePriceChange();
    }
  }
  
  // Ctrl+F to focus search
  if (e.ctrlKey && e.key === 'f') {
    e.preventDefault();
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.focus();
    }
  }
});

// Initialize filtered products
filteredProducts = [...productsData.cleaning_products];