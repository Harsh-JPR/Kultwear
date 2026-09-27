const products = [
  {
    id: 1,
    name: "Core Heavy Hoodie",
    cat: "Hoodies",
    tag: "NEW",
    description: "A heavyweight everyday hoodie built for winter layering, comfort and clean styling.",
    material: "Heavyweight cotton-blend fleece",
    fit: "Relaxed fit",
    delivery: "Delivery details will be available before launch."
  },
  {
    id: 2,
    name: "Kult Graphic Hoodie",
    cat: "Hoodies",
    tag: "NEW",
    description: "A graphic-led winter hoodie with a relaxed silhouette and bold KULTWEAR identity.",
    material: "Heavyweight cotton-blend fleece",
    fit: "Relaxed fit",
    delivery: "Delivery details will be available before launch."
  },
  {
    id: 3,
    name: "Essential Crew Sweat",
    cat: "Sweatshirts",
    tag: "NEW",
    description: "A clean everyday crew sweatshirt designed for effortless winter rotation.",
    material: "Premium cotton fleece",
    fit: "Regular fit",
    delivery: "Delivery details will be available before launch."
  },
  {
    id: 4,
    name: "Studio Graphic Sweat",
    cat: "Sweatshirts",
    tag: "NEW",
    description: "A statement graphic sweatshirt balancing everyday comfort with a stronger streetwear look.",
    material: "Premium cotton fleece",
    fit: "Relaxed fit",
    delivery: "Delivery details will be available before launch."
  },
  {
    id: 5,
    name: "Transit Puffer Jacket",
    cat: "Jackets",
    tag: "NEW",
    description: "A winter-ready puffer designed for warmth, movement and everyday city wear.",
    material: "Insulated technical shell",
    fit: "Regular fit",
    delivery: "Delivery details will be available before launch."
  },
  {
    id: 6,
    name: "Utility Winter Jacket",
    cat: "Jackets",
    tag: "NEW",
    description: "A structured winter layer combining practical utility details with a minimal silhouette.",
    material: "Technical winter fabric",
    fit: "Regular fit",
    delivery: "Delivery details will be available before launch."
  },
  {
    id: 7,
    name: "Heavy Knit Sweater",
    cat: "Sweaters",
    tag: "NEW",
    description: "A heavyweight knit designed for warm layering and refined everyday winter styling.",
    material: "Heavy knit blend",
    fit: "Relaxed fit",
    delivery: "Delivery details will be available before launch."
  },
  {
    id: 8,
    name: "KULT 001 Limited",
    cat: "Limited Edition",
    tag: "LIMITED",
    description: "A limited KULTWEAR piece built around a distinctive identity and exclusive winter direction.",
    material: "Premium winter fabric",
    fit: "Relaxed fit",
    delivery: "Limited edition delivery details will be available before launch."
  }
];

function getProduct(id) {
  return products.find(product => product.id === Number(id));
}

function productCard(product) {
  return `
    <a class="product-card" href="product.html?id=${product.id}">
      <div class="product-image">
        <span class="product-placeholder">KW</span>
        <span class="product-tag">${product.tag}</span>
      </div>

      <div class="product-info">
        <div>
          <span class="product-category">${product.cat} / ${product.tag}</span>
          <h3>${product.name}</h3>
        </div>

        <span class="product-price">PRICE SOON</span>
      </div>
    </a>
  `;
}

function renderProducts(container, list) {
  if (!container) return;

  container.innerHTML = list.map(productCard).join("");

  container.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => {
      sessionStorage.setItem("kultwearTransition", "true");
    });
  });
}

function getCategoryFromPage() {
  const page = window.location.pathname.split("/").pop().toLowerCase();

  const categories = {
    "hoodies.html": "Hoodies",
    "sweatshirts.html": "Sweatshirts",
    "jackets.html": "Jackets",
    "sweaters.html": "Sweaters",
    "limited-edition.html": "Limited Edition"
  };

  return categories[page] || null;
}

function initCollection() {
  const grid = document.getElementById("collectionGrid");
  if (!grid) return;

  const buttons = document.querySelectorAll(".filter-btn");

  function applyFilter(filter) {
    let filtered = products;

    if (filter === "new") {
      filtered = products.filter(product => product.tag === "NEW");
    } else if (filter !== "all") {
      filtered = products.filter(
        product => product.cat.toLowerCase() === filter.toLowerCase()
      );
    }

    renderProducts(grid, filtered);

    buttons.forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.filter === filter
      );
    });
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      applyFilter(button.dataset.filter);
    });
  });

  const params = new URLSearchParams(window.location.search);
  const initialFilter = params.get("filter") || "all";

  applyFilter(initialFilter);
}

function initCategoryPage() {
  const grid = document.getElementById("categoryGrid");
  if (!grid) return;

  const category = getCategoryFromPage();

  if (!category) return;

  const filtered = products.filter(
    product => product.cat === category
  );

  renderProducts(grid, filtered);
}

function renderProductDetail() {
  const container = document.getElementById("productDetail");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const product = getProduct(params.get("id"));

  if (!product) {
    container.innerHTML = `
      <div class="product-not-found">
        <p class="eyebrow">KULTWEAR</p>
        <h1>PRODUCT NOT FOUND.</h1>
        <a href="collection.html" class="primary-btn">BACK TO COLLECTION</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="product-page">

      <div class="product-gallery">

        <div class="main-product-image">
          <span class="gallery-mark">KW</span>
          <span class="gallery-label">${product.cat}</span>
        </div>

        <div class="product-thumbnails">
          <button class="product-thumb active">
            <span>KW</span>
          </button>

          <button class="product-thumb">
            <span>01</span>
          </button>

          <button class="product-thumb">
            <span>02</span>
          </button>

          <button class="product-thumb">
            <span>03</span>
          </button>
        </div>

      </div>

      <div class="product-content">

        <div class="product-breadcrumb">
          Home / ${product.cat} / ${product.name}
        </div>

        <div class="product-heading">
          <span class="product-detail-category">
            ${product.cat} / ${product.tag}
          </span>

          <h1>${product.name}</h1>

          <div class="product-price-large">
            PRICE SOON
          </div>
        </div>

        <p class="product-description">
          ${product.description}
        </p>

        <div class="product-specs">

          <div>
            <span>FIT</span>
            <strong>${product.fit}</strong>
          </div>

          <div>
            <span>MATERIAL</span>
            <strong>${product.material}</strong>
          </div>

        </div>

        <div class="size-section">

          <div class="size-heading">
            <span>SELECT SIZE</span>
            <span id="selectedSize">SELECT</span>
          </div>

          <div class="size-grid">
            <button class="size-btn" data-size="S">S</button>
            <button class="size-btn" data-size="M">M</button>
            <button class="size-btn" data-size="L">L</button>
            <button class="size-btn" data-size="XL">XL</button>
            <button class="size-btn" data-size="XXL">XXL</button>
          </div>

        </div>

        <div class="product-actions">

          <button class="product-action primary" id="addToBag">
            ADD TO BAG
            <span>→</span>
          </button>

          <button class="product-action secondary" id="buyNow">
            BUY NOW
            <span>→</span>
          </button>

        </div>

        <div class="product-benefits">

          <div>
            <strong>01</strong>
            <span>PREMIUM QUALITY</span>
          </div>

          <div>
            <strong>02</strong>
            <span>WINTER READY</span>
          </div>

          <div>
            <strong>03</strong>
            <span>EASY RETURNS</span>
          </div>

        </div>

        <div class="product-information">

          <details open>
            <summary>PRODUCT DETAILS</summary>
            <p>
              ${product.description}
              Designed as part of the KULTWEAR Winter '26 collection.
            </p>
          </details>

          <details>
            <summary>MATERIAL & FIT</summary>
            <p>
              ${product.material}. ${product.fit}.
            </p>
          </details>

          <details>
            <summary>DELIVERY & RETURNS</summary>
            <p>
              ${product.delivery}
              Return and refund policy will be available before launch.
            </p>
          </details>

        </div>

      </div>

    </div>
  `;

  initProductInteractions();
}

function initProductInteractions() {
  const sizeButtons = document.querySelectorAll(".size-btn");
  const selectedSize = document.getElementById("selectedSize");

  sizeButtons.forEach(button => {
    button.addEventListener("click", () => {
      sizeButtons.forEach(btn => btn.classList.remove("selected"));
      button.classList.add("selected");

      if (selectedSize) {
        selectedSize.textContent = button.dataset.size;
      }
    });
  });

  const addToBag = document.getElementById("addToBag");
  const buyNow = document.getElementById("buyNow");

  if (addToBag) {
    addToBag.addEventListener("click", () => {
      const selected = document.querySelector(".size-btn.selected");

      if (!selected) {
        showToast("Please select a size.");
        return;
      }

      showToast(`Added to bag — Size ${selected.dataset.size}`);
    });
  }

  if (buyNow) {
    buyNow.addEventListener("click", () => {
      const selected = document.querySelector(".size-btn.selected");

      if (!selected) {
        showToast("Please select a size.");
        return;
      }

      showToast("Checkout will be available before launch.");
    });
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.kultwearToast);

  window.kultwearToast = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function initDrawers() {
  const searchBtn = document.getElementById("searchBtn");
  const accountBtn = document.getElementById("accountBtn");
  const bagBtn = document.getElementById("bagBtn");

  const searchDrawer = document.getElementById("searchDrawer");
  const accountDrawer = document.getElementById("accountDrawer");
  const bagDrawer = document.getElementById("bagDrawer");

  function openDrawer(drawer) {
    if (!drawer) return;
    drawer.classList.add("open");
    document.body.classList.add("drawer-open");
  }

  function closeDrawer(drawer) {
    if (!drawer) return;
    drawer.classList.remove("open");

    if (
      !document.querySelector(".drawer.open")
    ) {
      document.body.classList.remove("drawer-open");
    }
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      openDrawer(searchDrawer);
    });
  }

  if (accountBtn) {
    accountBtn.addEventListener("click", () => {
      openDrawer(accountDrawer);
    });
  }

  if (bagBtn) {
    bagBtn.addEventListener("click", () => {
      openDrawer(bagDrawer);
    });
  }

  document.querySelectorAll(".drawer-close").forEach(button => {
    button.addEventListener("click", () => {
      const drawer = document.getElementById(button.dataset.close);
      closeDrawer(drawer);
    });
  });
}

function initMobileMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileClose = document.getElementById("mobileClose");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.add("open");
      document.body.classList.add("menu-open");
    });
  }

  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      document.body.classList.remove("menu-open");
    });
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        document.body.classList.remove("menu-open");
      });
    });
  }
}

function initSearch() {
  const input = document.getElementById("searchInput");
  const results = document.getElementById("searchResults");

  if (!input || !results) return;

  function searchProducts(value) {
    const query = value.trim().toLowerCase();

    if (!query) {
      results.innerHTML = "";
      return;
    }

    const matches = products.filter(product =>
      `${product.name} ${product.cat}`
        .toLowerCase()
        .includes(query)
    );

    if (!matches.length) {
      results.innerHTML = `
        <p class="search-empty">No products found.</p>
      `;
      return;
    }

    results.innerHTML = matches
      .map(product => `
        <a class="search-result" href="product.html?id=${product.id}">
          <span>${product.name}</span>
          <small>${product.cat}</small>
        </a>
      `)
      .join("");
  }

  input.addEventListener("input", event => {
    searchProducts(event.target.value);
  });
}

function initReveal() {
  const elements = document.querySelectorAll(".reveal");

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  elements.forEach(element => observer.observe(element));
}

function initPrelaunchForm() {
  const form = document.getElementById("prelaunchForm");

  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    const input = form.querySelector("input");

    if (!input || !input.value.trim()) {
      showToast("Enter your email first.");
      return;
    }

    showToast("You're on the KULTWEAR list.");
    form.reset();
  });
}

function initHomepageNewArrivals() {
  const grid = document.getElementById("newGrid");

  if (!grid) return;

  const newProducts = products.filter(
    product => product.tag === "NEW"
  );

  renderProducts(grid, newProducts);
}

document.addEventListener("DOMContentLoaded", () => {
  renderProductDetail();
  initCollection();
  initCategoryPage();
  initHomepageNewArrivals();
  initDrawers();
  initMobileMenu();
  initSearch();
  initReveal();
  initPrelaunchForm();
});
