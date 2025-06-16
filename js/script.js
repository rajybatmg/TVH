// -------- PRODUCT DATA --------
const products = [
  {
    id: 1,
    name: "Arc'teryx Vintage Beanie",
    price: 30.99,
    description: "Rare Arc'teryx shell, excellent condition. Size L.",
    image: "img/arcteryx.jpg",
    category: "hat",
    color: "Black"
  },
  {
    id: 2,
    name: "Carhartt Workwear Jacket",
    price: 84.99,
    description: "Classic Carhartt duck canvas, rugged & ready. Size XL.",
    image: "img/carhartt.jpg",
    category: "Jackets",
    color: "Brown"
  },
  {
    id: 3,
    name: "1977 Unisex Sweatshirt",
    price: 42.99,
    description: "Vintage Champion crewneck sweatshirt, soft & warm. Size M.",
    image: "img/sweatshirt.jpg",
    category: "Tops",
    color: "Grey"
  },
  {
    id: 4,
  name: "Arc'teryx Vintage Jacket",
  price: 119.99,
  description: "Rare Arc'teryx shell, light green, excellent condition. Size L.",
  image: "img/arcteryxj.jpg",
  category: "Jackets",
  color: "Light Green"
  },
  {
    id: 5,
    name: "Corduroy Skirt",
    price: 34.99,
    description: "Olive green corduroy skirt, 1980s, size M.",
    image: "https://placehold.co/290x360?text=Corduroy+Skirt",
    category: "Bottoms",
    color: "Green"
  }
];

// ----------- CART LOGIC -----------
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
  const countSpans = document.querySelectorAll('#cartCount');
  let count = cart.reduce((acc, item) => acc + item.qty, 0);
  countSpans.forEach(span => span.textContent = count);
}

// -------- MINIMAL SHOP PAGE (Batavia style) -----------
function renderShopProducts() {
  const shopGrid = document.getElementById('shopGrid');
  if (!shopGrid) return;

  shopGrid.innerHTML = '';
  products.forEach(product => {
    const inCart = cart.find(item => item.id === product.id);
    const div = document.createElement('div');
    div.className = 'simple-product';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="simple-product-img"/>
      <div class="simple-product-details">
        <div class="simple-product-name">${product.name}</div>
        <div class="simple-product-price">$${product.price.toFixed(2)}</div>
        <div class="simple-product-desc">${product.description}</div>
        <button data-id="${product.id}" class="simple-cart-btn">
          ${inCart ? "Added!" : "Add to Cart"}
        </button>
      </div>
    `;
    shopGrid.appendChild(div);
  });

  // Add click event listeners for "Add to Cart" buttons
  shopGrid.querySelectorAll('button[data-id]').forEach(btn => {
    btn.addEventListener('click', function() {
      const prodId = parseInt(this.getAttribute('data-id'));
      let found = cart.find(item => item.id === prodId);
      if (!found) {
        cart.push({ id: prodId, qty: 1 });
        saveCart();
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

// ---------- CART PAGE DISPLAY -----------
function renderCartPage() {
  const cartItemsDiv = document.getElementById('cartItems');
  const cartTotalDiv = document.getElementById('cartTotal');
  const clearCartBtn = document.getElementById('clearCartBtn');
  if (!cartItemsDiv) return;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = `<p style="color:#b8543c;font-size:1.09rem;">Your cart is empty.</p>`;
    cartTotalDiv.textContent = "";
    if (clearCartBtn) clearCartBtn.style.display = "none";
    return;
  }

  cartItemsDiv.innerHTML = cart.map(item => {
    let prod = products.find(p => p.id === item.id);
    return `
      <div class="simple-product" style="max-width:440px;margin:0 auto 2rem auto;display:flex;flex-direction:row;align-items:center;justify-content:flex-start;gap:1.3rem;">
        <img src="${prod.image}" alt="${prod.name}" class="simple-product-img" style="max-width:80px;">
        <div class="simple-product-details">
          <div class="simple-product-name" style="font-size:1.12rem;margin:0;">${prod.name}</div>
          <div style="font-size:1rem;margin:5px 0 10px 0;">
            <span>Price: $${prod.price.toFixed(2)}</span>
            <br>
            <span>Quantity: ${item.qty}</span>
          </div>
          <button class="remove-from-cart-btn simple-cart-btn" data-id="${item.id}" style="background:#b8543c;margin-top:0;">Remove</button>
        </div>
      </div>
    `;
  }).join("");

  let total = cart.reduce((sum, item) => {
    let prod = products.find(p => p.id === item.id);
    return sum + prod.price * item.qty;
  }, 0);

  cartTotalDiv.innerHTML = `<span style="color:#af895a;">Total: $${total.toFixed(2)}</span>`;
  if (clearCartBtn) clearCartBtn.style.display = "inline-block";

  // Remove item event
  cartItemsDiv.querySelectorAll('.remove-from-cart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = parseInt(this.getAttribute('data-id'));
      cart = cart.filter(item => item.id !== id);
      saveCart();
      updateCartCount();
      renderCartPage();
    });
  });

  // Clear Cart event
  if (clearCartBtn) {
    clearCartBtn.onclick = function() {
      cart = [];
      saveCart();
      updateCartCount();
      renderCartPage();
    };
  }
}

// ---------- CONTACT FORM VALIDATION (if on contact.html) -----------
function setupContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;
  contactForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const formMessage = document.getElementById("formMessage");
    formMessage.style.color = "#b8543c";
    formMessage.textContent = "";

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
    formMessage.style.color = "#4b9657";
    formMessage.textContent = "Thank you! Your message has been received.";
    name.value = "";
    email.value = "";
    message.value = "";
    return true;
  });
}

// ---------- MAIN ENTRY POINT -----------
document.addEventListener('DOMContentLoaded', () => {
  renderShopProducts();
  renderCartPage();
  updateCartCount();
  setupContactForm();
});
