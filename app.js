/* =========================================
   FAME STORE
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       CART
    ========================================= */

    let cart = JSON.parse(localStorage.getItem("fameStoreCart")) || [];

    const cartCount = document.querySelector(".cart-count");

    function updateCartCount() {
        if (!cartCount) return;

        const totalItems = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );

        cartCount.textContent = totalItems;
    }

    updateCartCount();


    /* =========================================
       WISHLIST
    ========================================= */

    const wishlistButtons = document.querySelectorAll(".wishlist-btn");

    wishlistButtons.forEach((button) => {

        button.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            const icon = button.querySelector("i");

            if (!icon) return;

            const isActive = icon.classList.contains("fa-solid");

            if (isActive) {

                icon.classList.remove("fa-solid");
                icon.classList.add("fa-regular");

                button.classList.remove("active");

            } else {

                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");

                button.classList.add("active");

            }

        });

    });


    /* =========================================
       SEARCH
    ========================================= */

    const searchInput = document.getElementById("searchInput");
    const searchButton = document.querySelector(".search-btn");

    function performSearch() {

        if (!searchInput) return;

        const searchValue = searchInput.value.trim();

        if (searchValue === "") {

            searchInput.focus();
            return;

        }

        window.location.href =
            `shop.html?search=${encodeURIComponent(searchValue)}`;

    }

    if (searchButton) {

        searchButton.addEventListener("click", performSearch);

    }

    if (searchInput) {

        searchInput.addEventListener("keydown", (event) => {

            if (event.key === "Enter") {
                performSearch();
            }

        });

    }


    /* =========================================
       CATEGORY SELECT
    ========================================= */

    const categorySelect = document.querySelector(".category-select");

    if (categorySelect) {

        categorySelect.addEventListener("change", () => {

            const category = categorySelect.value;

            if (category === "All Categories") {
                return;
            }

            const categorySlug = category
                .toLowerCase()
                .replace(/&/g, "and")
                .replace(/\s+/g, "-");

            window.location.href =
                `shop.html?category=${categorySlug}`;

        });

    }


    /* =========================================
       LOCATION BUTTON
    ========================================= */

    const locationButton = document.querySelector(".location-btn");

    if (locationButton) {

        locationButton.addEventListener("click", () => {

            alert(
                "Delivery location: Nigeria (NGN)\n\n" +
                "More countries will be available soon."
            );

        });

    }


    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================================
       HEADER SEARCH - MOBILE FRIENDLY
    ========================================= */

    window.addEventListener("scroll", () => {

        const header = document.querySelector(".main-header");

        if (!header) return;

        if (window.scrollY > 80) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });


    /* =========================================
       IMAGE ERROR HANDLING
    ========================================= */

    document.querySelectorAll("img").forEach((image) => {

        image.addEventListener("error", () => {

            image.classList.add("image-error");

            image.alt = "Fame Store";

        });

    });


    /* =========================================
       PRODUCT CARD CLICK
    ========================================= */

    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach((card, index) => {

        card.style.cursor = "pointer";

        card.addEventListener("click", (event) => {

            if (
                event.target.closest(".wishlist-btn")
            ) {
                return;
            }

            window.location.href =
                `product.html?id=${index + 1}`;

        });

    });


    /* =========================================
       ADD TO CART FUNCTION
    ========================================= */

    window.addToCart = function(product) {

        const existingProduct = cart.find(
            item => item.id === product.id
        );

        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            cart.push({
                ...product,
                quantity: 1
            });

        }

        localStorage.setItem(
            "fameStoreCart",
            JSON.stringify(cart)
        );

        updateCartCount();

    };


    /* =========================================
       REMOVE FROM CART
    ========================================= */

    window.removeFromCart = function(productId) {

        cart = cart.filter(
            item => item.id !== productId
        );

        localStorage.setItem(
            "fameStoreCart",
            JSON.stringify(cart)
        );

        updateCartCount();

    };


    /* =========================================
       UPDATE CART QUANTITY
    ========================================= */

    window.updateCartQuantity = function(
        productId,
        quantity
    ) {

        const product = cart.find(
            item => item.id === productId
        );

        if (!product) return;

        if (quantity <= 0) {

            removeFromCart(productId);
            return;

        }

        product.quantity = quantity;

        localStorage.setItem(
            "fameStoreCart",
            JSON.stringify(cart)
        );

        updateCartCount();

    };


    /* =========================================
       GET CART
    ========================================= */

    window.getCart = function() {
        return cart;
    };


    /* =========================================
       FAME STORE GLOBAL OBJECT
    ========================================= */

    window.FameStore = {

        cart: cart,

        updateCartCount,

        addToCart: window.addToCart,

        removeFromCart: window.removeFromCart,

        updateCartQuantity: window.updateCartQuantity,

        getCart: window.getCart

    };

});
