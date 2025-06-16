// TVH Vintage Product Data
const products = [
  {
    id: 1,
    name: "Classic 80s Denim Jacket",
    price: 49.99,
    description: "Original Levi’s denim jacket, gently faded, size M.",
    image: "img/denim-jacket.jpg",
    category: "Jackets",
    color: "Blue"
  },
  {
    id: 2,
    name: "Retro Floral Dress",
    price: 39.99,
    description: "1970s floral midi dress with belt, size S.",
    image: "img/floral-dress.jpg",
    category: "Dresses",
    color: "Multicolor"
  },
  {
    id: 3,
    name: "Vintage Leather Boots",
    price: 59.99,
    description: "Brown leather boots, European size 39, excellent condition.",
    image: "img/leather-boots.jpg",
    category: "Shoes",
    color: "Brown"
  },
  {
    id: 4,
    name: "Striped Polo Shirt",
    price: 24.99,
    description: "Classic 90s striped polo, size L, cotton.",
    image: "img/polo-shirt.jpg",
    category: "Tops",
    color: "Red/White"
  },
  {
    id: 5,
    name: "Corduroy Skirt",
    price: 34.99,
    description: "Olive green corduroy skirt, 1980s, size M.",
    image: "img/corduroy-skirt.jpg",
    category: "Bottoms",
    color: "Green"
  }
];

// Cart array to store product IDs
let cart = [];

// Update the cart count in the nav
function updateCartCount() {
  const countSpan = document.getElementById('cartCount');
  if (countSpan) {
    countSpan.textContent = cart.length;
  }
}

// Render products on the Shop page
function renderShopProducts() {
  const shopGrid = document.getElementById('shopGrid');
  if (!shopGrid) return;

  shopGrid.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p><strong>$${product.price.toFixed(2)}</strong></p>
      <p>${product.description}</p>
      <button data-id="${product.id}">Add to Cart</button>
    `;
    shopGrid.appendChild(card);
  });

  // Add click event listeners for "Add to Cart" buttons
  const cartButtons = shopGrid.querySelectorAll('button[data-id]');
  cartButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const prodId = parseInt(this.getAttribute('data-id'));
      if (!cart.includes(prodId)) {
        cart.push(prodId);
        updateCartCount();
        this.textContent = "Added!";
        this.disabled = true;
        setTimeout(() => {
          this.textContent = "Add to Cart";
          this.disabled = false;
        }, 1200);
      }
    });
  });
}

// Render products on the Gallery page with filter and sort
function renderGalleryProducts() {
  const galleryGrid = document.getElementById('galleryGrid');
  if (!galleryGrid) return;

  const categorySelect = document.getElementById('categoryFilter');
  const sortSelect = document.getElementById('sortPrice');

  let filteredProducts = [...products];

  // Filter
  if (categorySelect && categorySelect.value !== 'All') {
    filteredProducts = filteredProducts.filter(p => p.category === categorySelect.value);
  }

  // Sort
  if (sortSelect) {
    if (sortSelect.value === 'asc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortSelect.value === 'desc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }
  }

  galleryGrid.innerHTML = '';
  filteredProducts.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p><strong>$${product.price.toFixed(2)}</strong></p>
      <p>${product.description}</p>
    `;
    galleryGrid.appendChild(card);
  });
}

// Main entry point after DOM loads
document.addEventListener('DOMContentLoaded', () => {
  renderShopProducts();
  renderGalleryProducts();

  updateCartCount();

  const categorySelect = document.getElementById('categoryFilter');
  const sortSelect = document.getElementById('sortPrice');
  if (categorySelect && sortSelect) {
    categorySelect.addEventListener('change', renderGalleryProducts);
    sortSelect.addEventListener('change', renderGalleryProducts);
  }
});

 // Contact Form Validation
function validateContactForm(event) {
  event.preventDefault();
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const formMessage = document.getElementById("formMessage");

  // Reset messages
  formMessage.style.color = "#b8543c";
  formMessage.textContent = "";

  // Validation logic
  if (!name.value.trim()) {
    formMessage.textContent = "Please enter your name.";
    name.focus();
    return false;
  }
  if (!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)) {
    formMessage.textContent = "Please enter a valid email address.";
    email.focus();
    return false;
  }
  if (!message.value.trim()) {
    formMessage.textContent = "Please enter your message.";
    message.focus();
    return false;
  }
  // Success!
  formMessage.style.color = "#4b9657";
  formMessage.textContent = "Thank you! Your message has been received.";
  name.value = "";
  email.value = "";
  message.value = "";
  return true;
}

// Only run on contact.html
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", validateContactForm);
  }
});
