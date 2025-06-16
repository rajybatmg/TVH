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
  // Add more products as needed
];

// Render products on the Shop page
function renderShopProducts() {
  const shopGrid = document.getElementById('shopGrid');
  if (!shopGrid) return; // Only run on shop.html

  shopGrid.innerHTML = ''; // Clear previous content
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p><strong>$${product.price.toFixed(2)}</strong></p>
      <p>${product.description}</p>
      <button>Add to Cart</button>
    `;
    shopGrid.appendChild(card);
  });
}

// Render products on the Gallery page
function renderGalleryProducts() {
  const galleryGrid = document.getElementById('galleryGrid');
  if (!galleryGrid) return;

  // Get filter and sort values
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

// Single DOMContentLoaded block
document.addEventListener('DOMContentLoaded', () => {
  renderShopProducts();
  renderGalleryProducts();

  // Add filter/sort event listeners if on gallery page
  const categorySelect = document.getElementById('categoryFilter');
  const sortSelect = document.getElementById('sortPrice');
  if (categorySelect && sortSelect) {
    categorySelect.addEventListener('change', renderGalleryProducts);
    sortSelect.addEventListener('change', renderGalleryProducts);
  }
});
