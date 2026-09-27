const products = [
  {
    id: 1,
    name: "Core Heavy Hoodie",
    cat: "Hoodies",
    tag: "NEW"
  },
  {
    id: 2,
    name: "Kult Graphic Hoodie",
    cat: "Hoodies",
    tag: "NEW"
  },
  {
    id: 3,
    name: "Essential Crew Sweat",
    cat: "Sweatshirts",
    tag: "NEW"
  },
  {
    id: 4,
    name: "Studio Graphic Sweat",
    cat: "Sweatshirts",
    tag: "NEW"
  },
  {
    id: 5,
    name: "Transit Puffer Jacket",
    cat: "Jackets",
    tag: "NEW"
  },
  {
    id: 6,
    name: "Utility Winter Jacket",
    cat: "Jackets",
    tag: "NEW"
  },
  {
    id: 7,
    name: "Heavy Knit Sweater",
    cat: "Sweaters",
    tag: "NEW"
  },
  {
    id: 8,
    name: "KULT 001 Limited",
    cat: "Limited Edition",
    tag: "LIMITED"
  }
];


const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


/* PRODUCT CARD */

function productCard(product) {
  return `
    <article class="product-card reveal">
      <a href="product.html?id=${product.id}">

        <div class="product-image">

          <span class="product-tag">
            ${product.tag}
          </span>

        </div>

        <div class="product-info">

          <h3>
            ${product.name}
          </h3>

          <p>
            ${product.cat} · COMING SOON
          </p>

        </div>

      </a>
    </article>
  `;
}


/* RENDER PRODUCTS */

function renderProducts(list, target) {

  if (!target) return;

  target.innerHTML = list
    .map(productCard)
    .join("");

  revealElements();

}


/* HOMEPAGE NEW ARRIVALS */

const newGrid = $("#newGrid");

if (newGrid) {

  renderProducts(
    products.filter(product => product.tag === "NEW"),
    newGrid
  );

}


/* COLLECTION PAGE */

const collectionGrid = $("#collectionGrid");

if (collectionGrid) {

  const params = new URLSearchParams(window.location.search);

  const filter = params.get("filter");

  let list = [...products];

  if (filter === "new") {
    list = products.filter(product => product.tag === "NEW");
  }

  renderProducts(list, collectionGrid);

}


/* CATEGORY PAGE */

function getCategoryFromPage() {

  const file = window.location.pathname
    .split("/")
    .pop()
    .toLowerCase();

  const categories = {
    "hoodies.html": "Hoodies",
    "sweatshirts.html": "Sweatshirts",
    "jackets.html": "Jackets",
    "sweaters.html": "Sweaters",
    "limited-edition.html": "Limited Edition"
  };

  return categories[file] || null;
}


const categoryGrid = $("#categoryGrid");

if (categoryGrid) {

  const category = getCategoryFromPage();

  const list = products.filter(
    product => product.cat === category
  );

  renderProducts(list, categoryGrid);

}


/* FILTER BUTTONS */

$$(".filter-btn").forEach(button => {

  button.addEventListener("click", () => {

    $$(".filter-btn").forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.dataset.filter;

    let list = [...products];

    if (filter !== "all") {

      if (filter === "new") {
        list = products.filter(
          product => product.tag === "NEW"
        );
      } else {
        list = products.filter(
          product => product.cat === filter
        );
      }

    }

    if (collectionGrid) {
      renderProducts(list, collectionGrid);
    }

  });

});


/* PRODUCT DETAIL PAGE */

const productDetail = $("#productDetail");

if (productDetail) {

  const params = new URLSearchParams(
    window.location.search
  );

  const id = Number(params.get("id"));

  const product = products.find(
    item => item.id === id
  );

  if (!product) {

    productDetail.innerHTML = `
      <div class="empty-state">
        <span>404</span>
        <h4>PRODUCT NOT FOUND</h4>
        <p>
          This KULTWEAR product does not exist.
        </p>
      </div>
    `;

  } else {

    productDetail.innerHTML = `

      <div class="product-detail-image">
        <span>KW</span>
      </div>

      <div class="product-detail-info">

        <p class="eyebrow">
          ${product.cat} / ${product.tag}
        </p>

        <h1>
          ${product.name}
        </h1>

        <p class="product-price">
          PRICE SOON
        </p>

        <p class="size-label">
          SELECT SIZE
        </p>

        <div class="size-grid">

          <button class="size-btn">S</button>
          <button class="size-btn">M</button>
          <button class="size-btn">L</button>
          <button class="size-btn">XL</button>
          <button class="size-btn">XXL</button>

        </div>

        <div class="product-actions">

          <button
            class="primary-btn full"
            data-toast="Purchasing will be available when KULTWEAR launches."
          >
            ADD TO BAG <span>→</span>
          </button>

          <button
            class="primary-btn full"
            data-toast="Checkout will be available when KULTWEAR launches."
          >
            BUY NOW <span>→</span>
          </button>

        </div>

        <div class="product-description">

          <h3>DESCRIPTION</h3>

          <p>
            A KULTWEAR winter essential designed around
            clean everyday styling and a premium streetwear feel.
          </p>

          <h3>MATERIAL</h3>

          <p>
            Final fabric and material specifications
            will be published before launch.
          </p>

          <h3>DELIVERY</h3>

          <p>
            Delivery information will be available
            when the store goes live.
          </p>

          <h3>RETURNS</h3>

          <p>
            Final return and refund policy will be
            published before launch.
          </p>

        </div>

      </div>
    `;


    $$(".size-btn").forEach(button => {

      button.addEventListener("click", () => {

        $$(".size-btn").forEach(btn => {
          btn.classList.remove("active");
        });

        button.classList.add("active");

      });

    });

  }

}


/* SEARCH DRAWER */

const overlay = $("#overlay");
const searchDrawer = $("#searchDrawer");
const accountDrawer = $("#accountDrawer");
const cartDrawer = $("#cartDrawer");
const mobileMenu = $("#mobileMenu");


function closeAll() {

  [searchDrawer, accountDrawer, cartDrawer]
    .forEach(drawer => {

      if (drawer) {
        drawer.classList.remove("active");
      }

    });

  if (mobileMenu) {
    mobileMenu.classList.remove("active");
  }

  if (overlay) {
    overlay.classList.remove("active");
  }

}


function openDrawer(drawer) {

  closeAll();

  if (!drawer) return;

  drawer.classList.add("active");

  if (overlay) {
    overlay.classList.add("active");
  }

}


/* OPEN SEARCH */

$$("[data-open-search]").forEach(button => {

  button.addEventListener("click", () => {
    openDrawer(searchDrawer);
  });

});


/* OPEN ACCOUNT */

$$("[data-open-account]").forEach(button => {

  button.addEventListener("click", () => {
    openDrawer(accountDrawer);
  });

});


/* OPEN CART */

$$("[data-open-cart]").forEach(button => {

  button.addEventListener("click", () => {
    openDrawer(cartDrawer);
  });

});


/* OPEN MOBILE MENU */

$$("[data-open-menu]").forEach(button => {

  button.addEventListener("click", () => {

    closeAll();

    if (mobileMenu) {
      mobileMenu.classList.add("active");
    }

  });

});


/* CLOSE DRAWERS */

$$("[data-close]").forEach(button => {

  button.addEventListener("click", closeAll);

});


$$("[data-close-menu]").forEach(button => {

  button.addEventListener("click", closeAll);

});


if (overlay) {
  overlay.addEventListener("click", closeAll);
}


/* SEARCH */

const searchInput = $("#searchInput");
const searchResults = $("#searchResults");


if (searchInput && searchResults) {

  searchInput.addEventListener("input", () => {

    const query = searchInput.value
      .trim()
      .toLowerCase();

    if (!query) {

      searchResults.innerHTML = "";

      return;

    }


    const results = products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.cat.toLowerCase().includes(query)
    );


    if (!results.length) {

      searchResults.innerHTML = `
        <div class="empty-state">
          <h4>NO PRODUCTS FOUND</h4>
          <p>
            Try another search.
          </p>
        </div>
      `;

      return;

    }


    searchResults.innerHTML = results
      .map(product => `
        <a
          href="product.html?id=${product.id}"
          style="
            display:block;
            padding:15px 0;
            border-bottom:1px solid rgba(244,241,235,.08);
          "
        >

          <strong style="font-size:12px;">
            ${product.name}
          </strong>

          <span
            style="
              display:block;
              margin-top:5px;
              color:rgba(244,241,235,.4);
              font-size:10px;
            "
          >
            ${product.cat}
          </span>

        </a>
      `)
      .join("");

  });

}


/* PRE-LAUNCH FORM */

const notifyForm = $("#notifyForm");
const notifyEmail = $("#notifyEmail");
const formMessage = $("#formMessage");


if (notifyForm) {

  notifyForm.addEventListener("submit", event => {

    event.preventDefault();

    if (!notifyEmail.value.trim()) return;

    if (formMessage) {

      formMessage.textContent =
        "You're on the list. Launch updates will be connected before release.";

    }

    notifyForm.reset();

  });

}


/* TOAST */

let toastTimer;


function showToast(message) {

  const toast = $("#toast");

  if (!toast) return;

  toast.textContent = message;

  toast.classList.add("active");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {

    toast.classList.remove("active");

  }, 3000);

}


$$("[data-toast]").forEach(button => {

  button.addEventListener("click", () => {

    showToast(
      button.dataset.toast
    );

  });

});


/* REVEAL ANIMATION */

function revealElements() {

  const elements = $$(".reveal");

  if (!("IntersectionObserver" in window)) {

    elements.forEach(element => {
      element.classList.add("visible");
    });

    return;

  }


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.08
      }
    );


  elements.forEach(element => {

    if (!element.classList.contains("visible")) {
      observer.observe(element);
    }

  });

}


revealElements();


/* ESC KEY */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    closeAll();
  }

});
