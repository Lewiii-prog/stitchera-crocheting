document.addEventListener("DOMContentLoaded", () => {
  console.log("🧶 Stitchera Crochet Studio website loaded!");

  const instagramURL = "https://www.instagram.com/_stitchera/";
  const cartIcon = document.getElementById("cartIcon");
  const cartCount = document.getElementById("cartCount");
  const cartPopup = document.getElementById("cartPopup");
  const cartItems = document.getElementById("cartItems");
  const closeCart = document.getElementById("closeCart");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const productGrid = document.getElementById("product-grid");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const products = [
    { id: 1, name: "Mesh Shrug", price: 750, image: "images/mesh shrug.jpeg" },
    { id: 2, name: "Ruffle Hats", price: 1000, image: "images/crochet ruffle hat.jpeg" },
    { id: 3, name: "Flowers (10 roses)", price: 1500, image: "images/crochet rose.jpeg" },
    { id: 4, name: "Scarves (Customizable)", price: 750, image: "images/Crocheted Scarf.jpeg" },
    { id: 5, name: "Butterfly Crochet Top", price: 800, image: "images/Crochet Butterfly Top.jpeg" },
    { id: 6, name: "Crochet Top", price: 500, image: "images/crochet top.jpeg" },
    { id: 7, name: "Crochet Mesh Skirt", price: 750, image: "images/crochet mesh skirt.jpeg" },
    { id: 8, name: "Crochet Sets", price: 1500, image: "images/Crochet Skirt Set.jpeg" },
    { id: 9, name: "Granny Square Bag", price: 500, image: "images/crochet grannie squares cute.jpeg" },
    { id: 10, name: "Bucket Hats", price: 600, image: "images/Bucket hat crochet.jpeg" },
    { id: 11, name: "Flower Skirt", price: 900, image: "images/flower skirt.jpeg" },
    { id: 12, name: "Spiderman Beanie", price: 700, image: "images/spiderman beanie.jpeg" },
    { id: 13, name: "Ruffle Bag", price: 700, image: "images/ruffle bag.jpeg" },
    { id: 14, name: "Flower Sweater", price: 1500, image: "images/flower sweater.jpeg" },
    { id: 15, name: "Bralletes", price: 500, image: "images/Bralette.jpeg" },
    { id: 16, name: "Kitten Hats", price: 600, image: "images/kitten hat.jpeg" },
    { id: 17, name: "Card Holders", price: 150, image: "images/cardholder.jpeg" },
    { id: 18, name: "Scrunchies", price: 150, image: "images/Crochet Scrunchies.jpeg" },
    { id: 19, name: "Yarn Hammock", price: 750, image: "images/Crochet Hammock.jpeg" }
  ];

  // --- Display Products ---
  if (productGrid) {
    productGrid.innerHTML = products.map(p => `
      <div class="product fade-in">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>Ksh ${p.price}</p>
        <button class="btn add-to-cart" data-id="${p.id}">Add to Cart</button>
      </div>
    `).join('');
  }

  // --- Update Cart ---
  function updateCart() {
    if (cartCount) cartCount.textContent = cart.length;

    if (cartItems) {
      cartItems.innerHTML = cart.length
        ? cart.map((item, index) => `
            <li class="cart-item">
              ${item.name} - Ksh ${item.price}
              <button class="remove-item" data-index="${index}">✕</button>
            </li>
          `).join('')
        : "<li>Your cart is empty 🛒</li>";
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // --- Add & Remove Items Instantly ---
  document.addEventListener("click", e => {
    if (e.target.classList.contains("add-to-cart")) {
      const id = parseInt(e.target.dataset.id);
      const product = products.find(p => p.id === id);
      if (!product) return;
      cart.push(product);
      updateCart();

      const btn = e.target;
      btn.textContent = "Added ✓";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = "Add to Cart";
        btn.disabled = false;
      }, 1000);
    }

    if (e.target.classList.contains("remove-item")) {
      const index = parseInt(e.target.dataset.index);
      cart.splice(index, 1);
      updateCart();
    }
  });

  // --- Fade-In Popup ---
  if (cartIcon && cartPopup) {
    cartIcon.addEventListener("click", () => {
      cartPopup.classList.add("show");
      cartPopup.style.display = "block";
      setTimeout(() => cartPopup.classList.add("visible"), 10);
    });
  }

  if (closeCart && cartPopup) {
    closeCart.addEventListener("click", () => {
      cartPopup.classList.remove("visible");
      setTimeout(() => (cartPopup.style.display = "none"), 300);
    });
  }

  // --- Checkout Function ---
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", async () => {
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      let message = "Hi Stitchera Crochet Studio 👋\nI'd like to order:\n\n";
      let total = 0;

      cart.forEach(item => {
        message += `- ${item.name} (Ksh ${item.price})\n`;
        total += item.price;
      });

      message += `\nTotal: Ksh ${total}\n\nPlease confirm availability 😊`;

      try {
        // Try copying order details to clipboard
        await navigator.clipboard.writeText(message);
        alert("✅ Your order details have been copied! Paste them in your Instagram DM.");

        // Redirect user to Instagram page
        window.open(instagramURL, "_blank");

        // Clear cart after checkout
        localStorage.removeItem("cart");
        cart = [];
        updateCart();
      } catch (err) {
        console.error("Clipboard copy failed:", err);
        alert("Could not copy automatically. Copy your order manually:");
        console.log(message);
        window.open(instagramURL, "_blank");
      }
    });
  }

  updateCart(); // Initial render
});
