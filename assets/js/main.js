// Path Prefix Helper for Subpages
const isSubpage = window.location.pathname.includes('/pages/') || 
                  window.location.pathname.endsWith('/men.html') || 
                  window.location.pathname.endsWith('/women.html') || 
                  window.location.pathname.endsWith('/new-arrivals.html') || 
                  window.location.pathname.endsWith('/sale.html') || 
                  window.location.pathname.endsWith('/lookbook.html') || 
                  window.location.pathname.endsWith('/faq.html') || 
                  window.location.pathname.endsWith('/size-guide.html');
window.pathPrefix = isSubpage ? '../' : '';

document.addEventListener("DOMContentLoaded", () => {
    // Clear wishlist and cart on fresh session start
    if (!sessionStorage.getItem("boutique-session-active")) {
        localStorage.removeItem("boutique-cart");
        localStorage.removeItem("boutique-wishlist");
        sessionStorage.setItem("boutique-session-active", "true");
    }

    // --- 1. INITIALIZE THIRD-PARTY SCRIPTS ---
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }

    // --- 1.5. ACTIVE NAVIGATION LINK HIGHLIGHTING ---
    const currentPath = window.location.pathname.toLowerCase();
    const desktopLinks = document.querySelectorAll("header nav a");
    const mobileLinks = document.querySelectorAll("#mobile-drawer a");
    const allNavLinks = [...desktopLinks, ...mobileLinks];
    
    allNavLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (!href) return;
        
        const hrefLower = href.toLowerCase();
        let isMatch = false;
        
        // Helper to check if this is the main Home trigger link
        const isHomeTrigger = link.classList.contains("flex") && link.textContent.trim().toLowerCase().startsWith("home");
        
        if (currentPath.includes("blog")) {
            isMatch = hrefLower.includes("blog.html");
        } else if (currentPath.includes("product") || currentPath.includes("men.html") || currentPath.includes("women.html") || currentPath.includes("sale.html") || currentPath.includes("new-arrivals.html")) {
            isMatch = hrefLower.includes("products.html");
        } else if (currentPath.includes("about.html")) {
            isMatch = hrefLower.includes("about.html");
        } else if (currentPath.includes("pricing.html")) {
            isMatch = hrefLower.includes("pricing.html");
        } else if (currentPath.includes("contact.html")) {
            isMatch = hrefLower.includes("contact.html");
        } else if (currentPath.endsWith("/") || currentPath.includes("index.html") || currentPath.includes("index-2.html") || !currentPath.includes(".html")) {
            if (isHomeTrigger) {
                isMatch = true;
            } else if (currentPath.includes("index-2.html")) {
                isMatch = hrefLower.includes("index-2.html");
            } else {
                isMatch = hrefLower.includes("index.html") && !hrefLower.includes("index-2.html");
            }
        }
        
        if (isMatch) {
            link.classList.add("text-luxury-accent");
        } else {
            // Clean up other section links if they had text-luxury-accent
            if (hrefLower.includes("blog.html") || hrefLower.includes("products.html") || hrefLower.includes("about.html") || hrefLower.includes("pricing.html") || hrefLower.includes("contact.html") || hrefLower.includes("index.html") || hrefLower.includes("index-2.html")) {
                link.classList.remove("text-luxury-accent");
            }
        }
    });

    // --- 2. HEADER SCROLL EFFECT ---
    const header = document.getElementById("main-header");
    // Apply transparent header scroll effect on pages with data-transparent-onload attribute
    const isTransparentHeader = header && header.hasAttribute("data-transparent-onload");

    if (header && isTransparentHeader) {
        // Set transparent on load if at top
        if (window.scrollY <= 20) {
            header.classList.remove("shadow-luxury", "bg-white", "dark:bg-neutral-900", "backdrop-blur-md");
            header.classList.add("bg-transparent");
        }

        window.addEventListener("scroll", () => {
            if (window.scrollY > 20) {
                header.classList.add("shadow-luxury", "bg-white", "dark:bg-neutral-900", "backdrop-blur-md");
                header.classList.remove("bg-transparent");
            } else {
                header.classList.remove("shadow-luxury", "bg-white", "dark:bg-neutral-900", "backdrop-blur-md");
                header.classList.add("bg-transparent");
            }
        });
    }

    // --- 3. MOBILE MENU TOGGLE ---
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileDrawer = document.getElementById("mobile-drawer");
    const closeMobileDrawerBtn = document.getElementById("close-mobile-drawer");
    const mobileDrawerOverlay = document.getElementById("mobile-drawer-overlay");

    function toggleMobileMenu(isOpen) {
        if (!mobileDrawer) return;
        if (isOpen) {
            mobileDrawer.classList.remove("translate-x-full");
            if (mobileDrawerOverlay) mobileDrawerOverlay.classList.remove("hidden");
            document.body.classList.add("overflow-hidden");
        } else {
            mobileDrawer.classList.add("translate-x-full");
            if (mobileDrawerOverlay) mobileDrawerOverlay.classList.add("hidden");
            document.body.classList.remove("overflow-hidden");
        }
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", () => toggleMobileMenu(true));
    if (closeMobileDrawerBtn) closeMobileDrawerBtn.addEventListener("click", () => toggleMobileMenu(false));
    if (mobileDrawerOverlay) mobileDrawerOverlay.addEventListener("click", () => toggleMobileMenu(false));

    // --- 4. SEARCH OVERLAY ---
    const searchToggleBtn = document.querySelectorAll(".search-toggle");
    const searchOverlay = document.getElementById("search-overlay");
    const searchCloseBtn = document.getElementById("close-search");
    const searchInput = document.getElementById("overlay-search-input");

    function toggleSearch(isOpen) {
        if (!searchOverlay) return;
        if (isOpen) {
            searchOverlay.classList.remove("opacity-0", "pointer-events-none");
            if (searchInput) {
                setTimeout(() => searchInput.focus(), 300);
            }
            document.body.classList.add("overflow-hidden");
        } else {
            searchOverlay.classList.add("opacity-0", "pointer-events-none");
            document.body.classList.remove("overflow-hidden");
        }
    }

    searchToggleBtn.forEach(btn => btn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleSearch(true);
    }));
    if (searchCloseBtn) searchCloseBtn.addEventListener("click", () => toggleSearch(false));
    if (searchOverlay) {
        searchOverlay.addEventListener("click", (e) => {
            if (e.target === searchOverlay) toggleSearch(false);
        });
    }

    // --- 5. SHOPPING CART CONSOLE/LOGIC ---
    let cartItems = JSON.parse(localStorage.getItem("boutique-cart")) || [];

    window.Cart = {
        add: function(id, quantity = 1, size = null, color = null) {
            const product = window.ProductsService.getById(id);
            if (!product) return;

            // Default variants if not selected
            const chosenSize = size || product.sizes[0] || 'M';
            const chosenColor = color || (product.colors[0] ? product.colors[0].name : 'Default');

            // Check if item already exists in cart with same configurations
            const existingItem = cartItems.find(item => 
                item.id === product.id && 
                item.size === chosenSize && 
                item.color === chosenColor
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cartItems.push({
                    id: product.id,
                    name: product.name,
                    price: product.salePrice || product.price,
                    image: product.images[0],
                    size: chosenSize,
                    color: chosenColor,
                    quantity: quantity
                });
            }

            this.saveAndRefresh();
            this.toggle(true); // Open cart drawer to show success
            this.showToast(`Added ${product.name} to bag`);
        },

        remove: function(index) {
            cartItems.splice(index, 1);
            this.saveAndRefresh();
        },

        updateQty: function(index, newQty) {
            if (newQty <= 0) {
                this.remove(index);
            } else {
                cartItems[index].quantity = newQty;
                this.saveAndRefresh();
            }
        },

        toggle: function(isOpen) {
            const cartDrawer = document.getElementById("cart-drawer");
            const cartOverlay = document.getElementById("cart-overlay");
            if (!cartDrawer) return;

            if (isOpen) {
                // Close mobile menu if open
                if (typeof toggleMobileMenu === "function") {
                    toggleMobileMenu(false);
                } else {
                    const mobileDrawer = document.getElementById("mobile-drawer");
                    const mobileDrawerOverlay = document.getElementById("mobile-drawer-overlay");
                    if (mobileDrawer) mobileDrawer.classList.add("translate-x-full");
                    if (mobileDrawerOverlay) mobileDrawerOverlay.classList.add("hidden");
                }

                cartDrawer.classList.remove("translate-x-full");
                if (cartOverlay) cartOverlay.classList.remove("hidden");
                document.body.classList.add("overflow-hidden");
            } else {
                cartDrawer.classList.add("translate-x-full");
                if (cartOverlay) cartOverlay.classList.add("hidden");
                document.body.classList.remove("overflow-hidden");
            }
        },

        saveAndRefresh: function() {
            localStorage.setItem("boutique-cart", JSON.stringify(cartItems));
            this.render();
        },

        render: function() {
            const cartCountBadge = document.querySelectorAll(".cart-count");
            const cartItemsList = document.getElementById("cart-items-list");
            const cartSubtotal = document.getElementById("cart-subtotal");
            const cartTotalItems = document.getElementById("cart-total-items");

            // Calculate totals
            const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
            const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

            // Update badge text
            cartCountBadge.forEach(badge => {
                badge.textContent = totalCount;
                if (totalCount > 0) {
                    badge.classList.remove("hidden");
                } else {
                    badge.classList.add("hidden");
                }
            });

            if (cartTotalItems) cartTotalItems.textContent = `(${totalCount} items)`;
            if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;

            if (!cartItemsList) return;

            if (cartItems.length === 0) {
                cartItemsList.innerHTML = `
                    <div class="flex flex-col items-center justify-center h-72 text-center p-6">
                        <i class="fa-solid fa-bag-shopping text-4xl text-gray-300 dark:text-neutral-700 mb-4"></i>
                        <h4 class="font-serif text-lg text-gray-800 dark:text-gray-200 mb-1">Your bag is empty</h4>
                        <p class="text-xs text-gray-500 dark:text-neutral-500 max-w-[200px]">Fill it with our premium fashion collections.</p>
                        <button onclick="window.Cart.toggle(false)" class="mt-4 px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-semibold text-[10px] tracking-widest uppercase transition-all">Shop Now</button>
                    </div>
                `;
                return;
            }

            cartItemsList.innerHTML = cartItems.map((item, idx) => `
                <div class="flex gap-4 py-4 border-b border-gray-100 dark:border-neutral-800">
                    <img src="${window.pathPrefix || ''}${item.image}" alt="${item.name}" class="w-20 h-24 object-cover bg-gray-50 dark:bg-neutral-950 rounded">
                    <div class="flex-grow flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-start gap-2">
                                <h5 class="text-sm font-serif text-gray-800 dark:text-gray-200 line-clamp-1">${item.name}</h5>
                                <button onclick="window.Cart.remove(${idx})" class="text-gray-400 hover:text-red-500 transition">
                                    <i class="fa-regular fa-trash-can text-xs"></i>
                                </button>
                            </div>
                            <p class="text-[11px] text-gray-400 mt-0.5">Size: ${item.size} | Color: ${item.color}</p>
                        </div>
                        <div class="flex justify-between items-center mt-2">
                            <div class="flex items-center border border-gray-200 dark:border-neutral-700 rounded-sm">
                                <button onclick="window.Cart.updateQty(${idx}, ${item.quantity - 1})" class="px-2 py-0.5 text-gray-500 hover:bg-gray-50 dark:hover:bg-neutral-800 text-xs">-</button>
                                <span class="px-3 text-xs font-semibold text-gray-800 dark:text-gray-200">${item.quantity}</span>
                                <button onclick="window.Cart.updateQty(${idx}, ${item.quantity + 1})" class="px-2 py-0.5 text-gray-500 hover:bg-gray-50 dark:hover:bg-neutral-800 text-xs">+</button>
                            </div>
                            <span class="text-xs font-bold text-gray-900 dark:text-gray-100">$${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            `).join("");
        },

        showToast: function(msg) {
            const toast = document.createElement("div");
            toast.className = "fixed bottom-5 right-5 bg-black dark:bg-white text-white dark:text-black px-5 py-3 text-xs font-semibold tracking-widest uppercase shadow-xl z-50 flex items-center gap-3 transition-transform translate-y-20 duration-300";
            toast.innerHTML = `<i class="fa-solid fa-check text-green-500"></i> <span>${msg}</span>`;
            document.body.appendChild(toast);
            setTimeout(() => toast.classList.remove("translate-y-20"), 10);
            setTimeout(() => {
                toast.classList.add("translate-y-20");
                setTimeout(() => toast.remove(), 400);
            }, 3000);
        }
    };

    // Bind cart toggle listeners
    const cartToggleBtn = document.querySelectorAll(".cart-toggle");
    const closeCartBtn = document.getElementById("close-cart");
    const cartOverlay = document.getElementById("cart-overlay");

    cartToggleBtn.forEach(btn => btn.addEventListener("click", (e) => {
        e.preventDefault();
        window.Cart.toggle(true);
    }));
    if (closeCartBtn) closeCartBtn.addEventListener("click", () => window.Cart.toggle(false));
    if (cartOverlay) cartOverlay.addEventListener("click", () => window.Cart.toggle(false));

    // Initial Cart Render
    window.Cart.render();

    // Bind "View Bag" and "Checkout" redirects dynamically
    document.querySelectorAll("button").forEach(btn => {
        if (btn.textContent.trim().toLowerCase() === "view bag") {
            btn.removeAttribute("onclick"); // Remove inline click handler
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                window.location.href = (window.pathPrefix || "") + "cart.html";
            });
        }
    });

    document.querySelectorAll("a").forEach(a => {
        if (a.textContent.trim().toLowerCase() === "checkout" && a.closest("#cart-drawer")) {
            a.addEventListener("click", (e) => {
                e.preventDefault();
                window.location.href = (window.pathPrefix || "") + "cart.html";
            });
        }
    });

    // --- 6. WISHLIST MANAGEMENT ---
    let wishlistItems = JSON.parse(localStorage.getItem("boutique-wishlist")) || [];
    window.Wishlist = {
        toggle: function(id) {
            const index = wishlistItems.indexOf(id);
            const product = window.ProductsService.getById(id);
            if (!product) return;

            if (index > -1) {
                wishlistItems.splice(index, 1);
                window.Cart.showToast(`Removed from Wishlist`);
            } else {
                wishlistItems.push(id);
                window.Cart.showToast(`Saved to Wishlist`);
            }
            localStorage.setItem("boutique-wishlist", JSON.stringify(wishlistItems));
            this.render();
        },
        
        render: function() {
            const wishlistBadges = document.querySelectorAll(".wishlist-count");
            wishlistBadges.forEach(badge => {
                badge.textContent = wishlistItems.length;
                if (wishlistItems.length > 0) {
                    badge.classList.remove("hidden");
                } else {
                    badge.classList.add("hidden");
                }
            });
        }
    };
    window.Wishlist.render();

    // --- 7. QUICK VIEW MODAL CONTROLLER ---
    window.QuickView = {
        open: function(id) {},
        close: function() {}
    };

    // --- 8. NEWSLETTER FORM HANDLER ---
    const newsletterForms = document.querySelectorAll(".newsletter-form");
    newsletterForms.forEach(form => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const input = form.querySelector("input[type='email']");
            if (input && input.value) {
                window.Cart.showToast(`Thank you! Check your inbox soon.`);
                input.value = "";
            }
        });
    });

    // --- 9. LANGUAGE / RTL HANDLER ---
    const languageSelectors = document.querySelectorAll(".lang-selector");
    languageSelectors.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const lang = btn.getAttribute("data-lang");
            if (lang === "ar" || lang === "he") {
                window.ThemeToggler.setRTL(true);
            } else {
                window.ThemeToggler.setRTL(false);
            }
            window.location.reload();
        });
    });

    // --- 10. SOCIAL MEDIA LINKS REDIRECTS ---
    document.body.addEventListener("click", (e) => {
        const anchor = e.target.closest("a");
        if (!anchor) return;

        const icon = anchor.querySelector("i.fa-brands");
        if (!icon) return;

        let url = "";
        if (icon.classList.contains("fa-instagram")) {
            url = "https://www.instagram.com/";
        } else if (icon.classList.contains("fa-pinterest")) {
            url = "https://www.pinterest.com/";
        } else if (icon.classList.contains("fa-facebook") || icon.classList.contains("fa-facebook-f")) {
            url = "https://www.facebook.com/";
        }

        if (url) {
            e.preventDefault();
            window.open(url, "_blank", "noopener,noreferrer");
        }
    });
});
