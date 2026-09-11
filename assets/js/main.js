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
        has: function(id) {
            return wishlistItems.includes(parseInt(id));
        },
        getItems: function() {
            return [...wishlistItems];
        },
        toggle: function(id) {
            const numId = parseInt(id);
            const index = wishlistItems.indexOf(numId);
            const product = window.ProductsService.getById(numId);
            if (!product) return false;

            let isAdded = false;
            if (index > -1) {
                wishlistItems.splice(index, 1);
                window.Cart.showToast(`Removed from Wishlist`);
            } else {
                wishlistItems.push(numId);
                window.Cart.showToast(`Saved to Wishlist`);
                isAdded = true;
            }
            localStorage.setItem("boutique-wishlist", JSON.stringify(wishlistItems));
            this.render();
            return isAdded;
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

            // Update heart icons across cards
            document.querySelectorAll("[data-wishlist-btn]").forEach(btn => {
                const btnId = parseInt(btn.getAttribute("data-wishlist-btn"));
                const isWish = wishlistItems.includes(btnId);
                const icon = btn.querySelector("i");
                if (icon) {
                    if (isWish) {
                        icon.className = "fa-solid fa-heart text-xs text-red-500";
                    } else {
                        icon.className = "fa-regular fa-heart text-xs";
                    }
                }
            });
        }
    };
    window.Wishlist.render();

    // --- 7. QUICK VIEW MODAL CONTROLLER ---
    let qvSwiper = null;
    window.QuickView = {
        open: function(id) {
            const product = window.ProductsService.getById(id);
            if (!product) return;

            const modal = document.getElementById("quickview-modal");
            if (!modal) return;

            const catEl = document.getElementById("quickview-category");
            const nameEl = document.getElementById("quickview-name");
            const priceEl = document.getElementById("quickview-price");
            const descEl = document.getElementById("quickview-desc");
            const sizesEl = document.getElementById("quickview-sizes");
            const colorsEl = document.getElementById("quickview-colors");
            const imagesEl = document.getElementById("quickview-images");
            const addBtn = document.getElementById("quickview-add-to-cart");

            if (catEl) catEl.textContent = (product.subCategory || product.category || "").toUpperCase();
            if (nameEl) nameEl.textContent = product.name;
            if (descEl) descEl.textContent = product.description;

            if (priceEl) {
                if (product.salePrice) {
                    priceEl.innerHTML = `<span class="text-gray-400 dark:text-neutral-500 line-through text-sm mr-2">$${product.price.toFixed(2)}</span><span class="text-red-600 font-bold text-lg">$${product.salePrice.toFixed(2)}</span>`;
                } else {
                    priceEl.innerHTML = `<span class="text-gray-900 dark:text-gray-100 font-bold text-lg">$${product.price.toFixed(2)}</span>`;
                }
            }

            if (sizesEl) {
                sizesEl.innerHTML = product.sizes.map((s, idx) => `
                    <button class="qv-size-btn border border-gray-200 dark:border-neutral-700 text-xs w-8 h-8 rounded flex items-center justify-center font-bold text-gray-700 dark:text-gray-300 hover:border-black dark:hover:border-white transition-all ${idx === 0 ? 'size-swatch-active' : ''}" data-size="${s}">
                        ${s}
                    </button>
                `).join("");

                sizesEl.querySelectorAll(".qv-size-btn").forEach(btn => {
                    btn.addEventListener("click", () => {
                        sizesEl.querySelectorAll(".qv-size-btn").forEach(b => b.classList.remove("size-swatch-active"));
                        btn.classList.add("size-swatch-active");
                    });
                });
            }

            if (colorsEl) {
                colorsEl.innerHTML = product.colors.map((c, idx) => `
                    <button class="qv-color-btn w-6 h-6 rounded-full border border-gray-300 dark:border-neutral-700 relative hover:scale-105 transition-transform ${idx === 0 ? 'color-swatch-active' : ''}" style="background-color: ${c.hex}" data-color="${c.name}" title="${c.name}">
                    </button>
                `).join("");

                colorsEl.querySelectorAll(".qv-color-btn").forEach(btn => {
                    btn.addEventListener("click", () => {
                        colorsEl.querySelectorAll(".qv-color-btn").forEach(b => b.classList.remove("color-swatch-active"));
                        btn.classList.add("color-swatch-active");
                    });
                });
            }

            if (imagesEl) {
                const prefix = window.pathPrefix || "";
                imagesEl.innerHTML = product.images.map(img => `
                    <div class="swiper-slide h-full">
                        <img src="${prefix}${img}" alt="${product.name}" class="w-full h-full object-cover">
                    </div>
                `).join("");

                if (typeof Swiper !== "undefined") {
                    if (qvSwiper) qvSwiper.destroy(true, true);
                    qvSwiper = new Swiper(".qv-swiper-container", {
                        loop: product.images.length > 1,
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev"
                        },
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: true
                        }
                    });
                }
            }

            if (addBtn) {
                addBtn.onclick = () => {
                    const activeSize = sizesEl?.querySelector(".qv-size-btn.size-swatch-active")?.getAttribute("data-size") || product.sizes[0];
                    const activeColor = colorsEl?.querySelector(".qv-color-btn.color-swatch-active")?.getAttribute("data-color") || (product.colors[0] ? product.colors[0].name : "Default");
                    window.Cart.add(product.id, 1, activeSize, activeColor);
                    window.QuickView.close();
                };
            }

            modal.classList.remove("opacity-0", "pointer-events-none");
            document.body.classList.add("overflow-hidden");
        },

        close: function() {
            const modal = document.getElementById("quickview-modal");
            if (!modal) return;
            modal.classList.add("opacity-0", "pointer-events-none");
            document.body.classList.remove("overflow-hidden");
        }
    };

    const closeQvBtn = document.getElementById("close-quickview");
    if (closeQvBtn) closeQvBtn.addEventListener("click", () => window.QuickView.close());
    const qvModal = document.getElementById("quickview-modal");
    if (qvModal) {
        qvModal.addEventListener("click", (e) => {
            if (e.target === qvModal) window.QuickView.close();
        });
    }

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

    // --- 11. STAT COUNTER RUNNING NUMBER ANIMATION ---
    const statCounters = document.querySelectorAll(".stat-counter");
    if (statCounters.length > 0) {
        const animateCounter = (el) => {
            const target = parseFloat(el.getAttribute("data-target")) || 0;
            const suffix = el.getAttribute("data-suffix") || "";
            const prefix = el.getAttribute("data-prefix") || "";
            const decimals = parseInt(el.getAttribute("data-decimals")) || 0;
            const duration = 2000; // 2 seconds
            const startTime = performance.now();

            const update = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Smooth ease-out cubic
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentVal = easeProgress * target;

                if (decimals > 0) {
                    el.textContent = prefix + currentVal.toFixed(decimals) + suffix;
                } else {
                    el.textContent = prefix + Math.floor(currentVal) + suffix;
                }

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    el.textContent = prefix + (decimals > 0 ? target.toFixed(decimals) : target) + suffix;
                }
            };

            requestAnimationFrame(update);
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        statCounters.forEach(counter => counterObserver.observe(counter));
    }
});
