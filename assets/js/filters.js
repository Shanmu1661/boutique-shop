// Filtering and Rendering Engine for Product Grid
document.addEventListener("DOMContentLoaded", () => {
    // Only run if on products page
    const productGrid = document.getElementById("product-grid");
    if (!productGrid) return;

    // Filters state
    let state = {
        category: [],      // 'men', 'women'
        subCategory: [],   // 'dresses', 'accessories'
        sizes: [],         // 'XS', 'S', 'M', 'L', 'XL'
        colors: [],
        priceMax: 500,
        searchQuery: "",
        sortBy: "featured", // 'featured', 'price-low-high', 'price-high-low', 'rating'
        viewMode: "grid",   // 'grid', 'list'
        saleOnly: false,
        newOnly: false
    };

    // DOM Elements
    const searchInput = document.getElementById("filter-search");
    const priceSlider = document.getElementById("filter-price-slider");
    const priceValueText = document.getElementById("filter-price-value");
    const sortSelect = document.getElementById("filter-sort");
    const viewGridBtn = document.getElementById("view-grid");
    const viewListBtn = document.getElementById("view-list");
    const activeFiltersContainer = document.getElementById("active-filters");
    const productsCountText = document.getElementById("products-count");
    const toggleBtn = document.getElementById("toggle-mobile-filters");
    const sidebar = document.getElementById("filter-sidebar");
    const clearAllBtn = document.getElementById("clear-all-filters");

    // Parse URL params for pre-filtering (e.g., ?category=women, ?search=dress, ?subcategory=dresses)
    const urlParams = new URLSearchParams(window.location.search);

    // Search query param
    const searchParam = urlParams.get("search") || urlParams.get("q") || urlParams.get("keyword");
    if (searchParam) {
        state.searchQuery = searchParam.trim().toLowerCase();
        if (searchInput) searchInput.value = searchParam.trim();
    }

    // Category param (single select)
    if (urlParams.has("category")) {
        const catVals = urlParams.get("category").toLowerCase().split(",");
        const cat = catVals[0].trim();
        if (cat) {
            state.category = [cat];
            const chk = document.querySelector(`.filter-category-checkbox[value="${cat}"]`);
            if (chk) chk.checked = true;
        }
    }

    // SubCategory param (single select)
    const subCatParam = urlParams.get("subcategory") || urlParams.get("subCategory") || urlParams.get("category_type");
    if (subCatParam) {
        const subVals = subCatParam.toLowerCase().split(",");
        const sc = subVals[0].trim();
        if (sc) {
            state.subCategory = [sc];
            const chk = document.querySelector(`.filter-subcategory-checkbox[value="${sc}"]`);
            if (chk) chk.checked = true;
        }
    }

    // Size param (single select)
    const sizeParam = urlParams.get("size") || urlParams.get("sizes");
    if (sizeParam) {
        const sizeVals = sizeParam.toUpperCase().split(",");
        const s = sizeVals[0].trim();
        if (s) {
            state.sizes = [s];
            const btn = document.querySelector(`.filter-size-btn[data-size="${s}"]`);
            if (btn) btn.classList.add("size-swatch-active");
        }
    }

    // Price param
    const priceParam = urlParams.get("price") || urlParams.get("maxPrice") || urlParams.get("priceMax");
    if (priceParam) {
        const pVal = parseInt(priceParam);
        if (!isNaN(pVal) && pVal > 0) {
            state.priceMax = pVal;
        }
    }

    // Sort param
    const sortParam = urlParams.get("sort") || urlParams.get("sortBy");
    if (sortParam) {
        state.sortBy = sortParam;
        if (sortSelect) sortSelect.value = sortParam;
    }

    // View param
    const viewParam = urlParams.get("view") || urlParams.get("viewMode");
    if (viewParam === "list" || viewParam === "grid") {
        state.viewMode = viewParam;
    }

    // Sale param
    if (urlParams.has("sale") && urlParams.get("sale") !== "false") {
        state.saleOnly = true;
    }

    // New param
    if (urlParams.has("new") && urlParams.get("new") !== "false") {
        state.newOnly = true;
    }

    // Initialize inputs based on state
    if (priceSlider) {
        priceSlider.value = state.priceMax;
        if (priceValueText) priceValueText.textContent = `$${state.priceMax}`;
    }
    if (sortSelect) {
        sortSelect.value = state.sortBy;
    }
    updateViewModeButtons();

    // Mobile Filters Toggle
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener("click", () => {
            sidebar.classList.toggle("hidden");
            const isHidden = sidebar.classList.contains("hidden");
            toggleBtn.innerHTML = isHidden ? 
                `<i class="fa-solid fa-sliders text-xs text-luxury-accent"></i> Filters` : 
                `<i class="fa-solid fa-xmark text-xs text-red-500"></i> Close Filters`;
        });
    }

    // Category Checkboxes (Single-Select)
    document.querySelectorAll(".filter-category-checkbox").forEach(cb => {
        cb.addEventListener("change", (e) => {
            const val = e.target.value;
            if (e.target.checked) {
                // Deselect other category checkboxes (Single select behavior)
                document.querySelectorAll(".filter-category-checkbox").forEach(other => {
                    if (other !== e.target) other.checked = false;
                });
                state.category = [val];
            } else {
                state.category = [];
            }
            applyFilters();
        });
    });

    // SubCategory Checkboxes (Single-Select)
    document.querySelectorAll(".filter-subcategory-checkbox").forEach(cb => {
        cb.addEventListener("change", (e) => {
            const val = e.target.value;
            if (e.target.checked) {
                // Deselect other subcategory checkboxes (Single select behavior)
                document.querySelectorAll(".filter-subcategory-checkbox").forEach(other => {
                    if (other !== e.target) other.checked = false;
                });
                state.subCategory = [val];
            } else {
                state.subCategory = [];
            }
            applyFilters();
        });
    });

    // Sizes buttons (Single-Select: Only choose one size at a time)
    document.querySelectorAll(".filter-size-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const val = btn.getAttribute("data-size");
            if (state.sizes.includes(val)) {
                state.sizes = [];
                btn.classList.remove("size-swatch-active");
            } else {
                // Deselect all other size buttons
                document.querySelectorAll(".filter-size-btn").forEach(b => b.classList.remove("size-swatch-active"));
                state.sizes = [val];
                btn.classList.add("size-swatch-active");
            }
            applyFilters();
        });
    });

    // Colors selection (Single-Select)
    document.querySelectorAll(".filter-color-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const val = btn.getAttribute("data-color");
            if (state.colors.includes(val)) {
                state.colors = [];
                btn.classList.remove("color-swatch-active");
            } else {
                // Deselect all other color buttons
                document.querySelectorAll(".filter-color-btn").forEach(b => b.classList.remove("color-swatch-active"));
                state.colors = [val];
                btn.classList.add("color-swatch-active");
            }
            applyFilters();
        });
    });

    // Search input
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            state.searchQuery = e.target.value.trim().toLowerCase();
            applyFilters();
        });
    }

    // Price slider
    if (priceSlider) {
        priceSlider.addEventListener("input", (e) => {
            state.priceMax = parseInt(e.target.value);
            if (priceValueText) priceValueText.textContent = `$${state.priceMax}`;
            applyFilters();
        });
    }

    // Sorting selector
    if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
            state.sortBy = e.target.value;
            applyFilters();
        });
    }

    // Grid/List View Toggles
    if (viewGridBtn && viewListBtn) {
        viewGridBtn.addEventListener("click", () => {
            state.viewMode = "grid";
            updateViewModeButtons();
            applyFilters();
        });
        viewListBtn.addEventListener("click", () => {
            state.viewMode = "list";
            updateViewModeButtons();
            applyFilters();
        });
    }

    function updateViewModeButtons() {
        if (!viewGridBtn || !viewListBtn) return;
        if (state.viewMode === "grid") {
            viewGridBtn.className = "p-1.5 text-luxury-accent";
            viewListBtn.className = "p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300";
        } else {
            viewListBtn.className = "p-1.5 text-luxury-accent";
            viewGridBtn.className = "p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300";
        }
    }

    // Global reset function
    window.resetProductFilters = function() {
        state.category = [];
        state.subCategory = [];
        state.sizes = [];
        state.colors = [];
        state.priceMax = 500;
        state.searchQuery = "";
        state.sortBy = "featured";
        state.saleOnly = false;
        state.newOnly = false;

        // Reset DOM elements
        document.querySelectorAll(".filter-category-checkbox").forEach(cb => cb.checked = false);
        document.querySelectorAll(".filter-subcategory-checkbox").forEach(cb => cb.checked = false);
        document.querySelectorAll(".filter-size-btn").forEach(btn => btn.classList.remove("size-swatch-active"));
        document.querySelectorAll(".filter-color-btn").forEach(btn => btn.classList.remove("color-swatch-active"));
        if (searchInput) searchInput.value = "";
        if (priceSlider) {
            priceSlider.value = 500;
            if (priceValueText) priceValueText.textContent = "$500";
        }
        if (sortSelect) sortSelect.value = "featured";

        applyFilters();
    };

    // Clear All Filters button
    if (clearAllBtn) {
        clearAllBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.resetProductFilters();
        });
    }

    // Card wishlist toggle helper with visual feedback
    window.toggleWishlistOnCard = function(id, btnElement) {
        if (window.Wishlist) {
            const isAdded = window.Wishlist.toggle(id);
            const icon = btnElement ? btnElement.querySelector("i") : null;
            if (icon) {
                if (isAdded) {
                    icon.className = "fa-solid fa-heart text-xs text-red-500";
                } else {
                    icon.className = "fa-regular fa-heart text-xs";
                }
            }
        }
    };

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function matchesQueryWord(product, word) {
        const w = word.toLowerCase();
        
        // Category specific whole-word matching
        if (w === "men" || w === "mens" || w === "men's") {
            return product.category === "men" || /\b(men|mens|men's|man|gentlemen|male|homme)\b/i.test(product.name + " " + product.description);
        }
        if (w === "women" || w === "womens" || w === "women's") {
            return product.category === "women" || /\b(women|womens|women's|woman|ladies|female|femme)\b/i.test(product.name + " " + product.description);
        }
        if (w === "unisex" || w === "genderless" || w === "neutral" || w === "all-gender") {
            return product.category === "unisex" || /\b(unisex|genderless|neutral|gender-neutral|all-gender)\b/i.test(product.name + " " + product.description);
        }

        const catSynonyms = product.category === "women" ? "women women's womens woman ladies female femme" :
                            product.category === "men" ? "men men's mens man gentlemen male homme" :
                            product.category === "unisex" ? "unisex genderless all-gender gender-neutral neutral shared" : "";
        
        const subCatSynonyms = product.subCategory === "dresses" ? "dress dresses gown gowns frock frocks" :
                               product.subCategory === "accessories" ? "accessory accessories" : "";
        
        const colorTokens = product.colors ? product.colors.map(c => c.name.toLowerCase()).join(" ") : "";
        const sizeTokens = product.sizes ? product.sizes.join(" ").toLowerCase() : "";
        const badgeTokens = (product.isNew ? "new arrival " : "") + (product.isSale ? "sale discount offer " : "");
        
        const corpus = `${product.name} ${product.description} ${product.category} ${catSynonyms} ${product.subCategory} ${subCatSynonyms} ${colorTokens} ${sizeTokens} ${badgeTokens}`.toLowerCase();

        // Word prefix / boundary matching
        const regex = new RegExp(`\\b${escapeRegExp(w)}`, 'i');
        return regex.test(corpus);
    }

    // Apply Filter logic
    function applyFilters() {
        let filtered = window.ProductsService.getAll();

        // 1. Search Query with multi-attribute token matching
        if (state.searchQuery) {
            const queryWords = state.searchQuery.split(/\s+/).filter(w => w.length > 0);
            filtered = filtered.filter(p => {
                return queryWords.every(word => matchesQueryWord(p, word));
            });
        }

        // 2. Category (Department) - 'all' returns all products
        if (state.category.length > 0 && !state.category.includes("all")) {
            filtered = filtered.filter(p => state.category.includes(p.category));
        }

        // 3. SubCategory
        if (state.subCategory.length > 0 && !state.subCategory.includes("all")) {
            filtered = filtered.filter(p => state.subCategory.includes(p.subCategory));
        }

        // 4. Sizes (returns distinct and relatable products tailored to the chosen size)
        if (state.sizes.length > 0) {
            filtered = filtered.filter(p => {
                if (!p.sizes || !Array.isArray(p.sizes)) return false;
                return p.sizes.some(s => state.sizes.includes(s));
            });
        }

        // 5. Colors
        if (state.colors.length > 0) {
            filtered = filtered.filter(p => p.colors.some(c => state.colors.includes(c.name)));
        }

        // 6. Price range
        filtered = filtered.filter(p => {
            const currentPrice = p.salePrice || p.price;
            return currentPrice <= state.priceMax;
        });

        // 7. Sale / New only filters
        if (state.saleOnly) {
            filtered = filtered.filter(p => p.isSale);
        }
        if (state.newOnly) {
            filtered = filtered.filter(p => p.isNew);
        }

        // 8. Sorting
        if (state.sortBy === "price-low-high") {
            filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        } else if (state.sortBy === "price-high-low") {
            filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        } else if (state.sortBy === "rating") {
            filtered.sort((a, b) => b.rating - a.rating);
        } else if (state.sortBy === "featured") {
            filtered.sort((a, b) => a.id - b.id);
        }

        // Update Products count display
        if (productsCountText) {
            productsCountText.textContent = `${filtered.length} product${filtered.length === 1 ? '' : 's'} found`;
        }

        // Render products
        renderProducts(filtered);
        renderActiveFilterBadges();
    }

    // Render active badges
    function renderActiveFilterBadges() {
        if (!activeFiltersContainer) return;
        activeFiltersContainer.innerHTML = "";
        
        let badgesHtml = "";
        
        // Helper to add badge
        const addBadge = (label, type, value) => {
            badgesHtml += `
                <span class="inline-flex items-center gap-1.5 px-3 py-1 text-xs bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-200 rounded-full border border-gray-200 dark:border-neutral-700 shadow-sm">
                    ${label}
                    <button class="remove-filter text-gray-400 hover:text-red-500 font-bold ml-1 transition" data-type="${type}" data-val="${value}" title="Remove filter">
                        <i class="fa-solid fa-xmark text-[10px]"></i>
                    </button>
                </span>
            `;
        };

        if (state.searchQuery) addBadge(`"${state.searchQuery}"`, "search", state.searchQuery);
        
        state.category.forEach(c => {
            if (c === "all") return;
            const label = c === "women" ? "Women's Fashion" : c === "men" ? "Men's Fashion" : c === "unisex" ? "Unisex Collection" : c.toUpperCase();
            addBadge(label, "category", c);
        });

        state.subCategory.forEach(sc => {
            const label = sc === "dresses" ? "Dresses" : sc === "accessories" ? "Accessories" : sc.toUpperCase();
            addBadge(label, "subCategory", sc);
        });

        state.sizes.forEach(s => addBadge(`Size: ${s}`, "size", s));
        state.colors.forEach(col => addBadge(`Color: ${col}`, "color", col));
        if (state.priceMax < 500) addBadge(`Max Price: $${state.priceMax}`, "price", state.priceMax);
        if (state.saleOnly) addBadge("On Sale", "sale", "true");
        if (state.newOnly) addBadge("New Arrivals", "new", "true");

        if (badgesHtml) {
            activeFiltersContainer.innerHTML = `
                <div class="flex flex-wrap gap-2 items-center mb-6 pb-4 border-b border-gray-100 dark:border-neutral-800">
                    <span class="text-xs text-gray-500 dark:text-neutral-400 font-medium">Active Filters:</span>
                    ${badgesHtml}
                    <button id="btn-clear-badges" class="text-xs text-luxury-accent hover:underline ml-2 font-bold">Clear All</button>
                </div>
            `;
            
            // Bind remove event on badges
            activeFiltersContainer.querySelectorAll(".remove-filter").forEach(btn => {
                btn.addEventListener("click", () => {
                    const type = btn.getAttribute("data-type");
                    const val = btn.getAttribute("data-val");

                    if (type === "category") {
                        state.category = state.category.filter(c => c !== val);
                        const chk = document.querySelector(`.filter-category-checkbox[value="${val}"]`);
                        if (chk) chk.checked = false;
                    } else if (type === "subCategory") {
                        state.subCategory = state.subCategory.filter(sc => sc !== val);
                        const chk = document.querySelector(`.filter-subcategory-checkbox[value="${val}"]`);
                        if (chk) chk.checked = false;
                    } else if (type === "size") {
                        state.sizes = state.sizes.filter(s => s !== val);
                        const sizeBtn = document.querySelector(`.filter-size-btn[data-size="${val}"]`);
                        if (sizeBtn) sizeBtn.classList.remove("size-swatch-active");
                    } else if (type === "color") {
                        state.colors = state.colors.filter(c => c !== val);
                        const colBtn = document.querySelector(`.filter-color-btn[data-color="${val}"]`);
                        if (colBtn) colBtn.classList.remove("color-swatch-active");
                    } else if (type === "price") {
                        state.priceMax = 500;
                        if (priceSlider) {
                            priceSlider.value = 500;
                            if (priceValueText) priceValueText.textContent = "$500";
                        }
                    } else if (type === "search") {
                        state.searchQuery = "";
                        if (searchInput) searchInput.value = "";
                    } else if (type === "sale") {
                        state.saleOnly = false;
                    } else if (type === "new") {
                        state.newOnly = false;
                    }
                    applyFilters();
                });
            });

            const clearBadgesBtn = document.getElementById("btn-clear-badges");
            if (clearBadgesBtn) {
                clearBadgesBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    window.resetProductFilters();
                });
            }
        }
    }

    // Render cards HTML
    function renderProducts(products) {
        if (products.length === 0) {
            productGrid.className = "flex flex-col items-center justify-center py-16 px-4 w-full col-span-full";
            productGrid.innerHTML = `
                <div class="text-center">
                    <i class="fa-solid fa-shirt text-5xl text-gray-300 dark:text-neutral-700 mb-4"></i>
                    <h3 class="text-xl font-serif text-gray-800 dark:text-gray-100 mb-2">No Products Found</h3>
                    <p class="text-gray-500 dark:text-neutral-400 text-sm max-w-md mx-auto mb-6">Try adjusting your filters, modifying your price range, or searching for something else.</p>
                    <button onclick="window.resetProductFilters()" class="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 text-xs font-semibold tracking-widest uppercase transition-all shadow-md">Clear Filters</button>
                </div>
            `;
            return;
        }

        const isWishlisted = (id) => {
            return window.Wishlist && window.Wishlist.has ? window.Wishlist.has(id) : false;
        };

        if (state.viewMode === "grid") {
            productGrid.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full";
            productGrid.innerHTML = products.map(p => {
                const badge = p.isNew ? 
                    `<span class="absolute top-4 left-4 bg-black text-white dark:bg-white dark:text-black text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 z-10">New</span>` : 
                    p.isSale ? 
                    `<span class="absolute top-4 left-4 bg-red-600 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 z-10 sale-pulse">Sale</span>` : "";

                const priceDisplay = p.salePrice ? 
                    `<span class="text-gray-400 dark:text-neutral-500 line-through text-sm mr-2">$${p.price.toFixed(2)}</span><span class="text-red-600 font-bold">$${p.salePrice.toFixed(2)}</span>` : 
                    `<span class="text-gray-900 dark:text-gray-100 font-medium">$${p.price.toFixed(2)}</span>`;

                const ratingStars = `<div class="flex items-center gap-1 text-[11px] text-amber-500">
                    <i class="fa-solid fa-star"></i>
                    <span class="text-gray-500 dark:text-neutral-400 font-semibold text-xs ml-0.5">${p.rating}</span>
                </div>`;

                const inWish = isWishlisted(p.id);
                const heartIcon = inWish ? `<i class="fa-solid fa-heart text-xs text-red-500"></i>` : `<i class="fa-regular fa-heart text-xs"></i>`;

                return `
                    <div class="product-card group relative bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-luxury shadow-luxury-hover transition-luxury flex flex-col h-full rounded" data-aos="fade-up">
                        <div class="relative img-zoom-container bg-gray-50 dark:bg-neutral-950 aspect-[3/4] overflow-hidden rounded-t">
                            ${badge}
                            <a href="product-details.html?id=${p.id}" class="block w-full h-full">
                                <img src="${p.images[0]}" alt="${p.name}" class="w-full h-full object-cover">
                            </a>
                            
                            <!-- Quick actions floating buttons -->
                            <div class="quick-actions absolute bottom-4 inset-x-4 flex justify-center gap-2 z-10">
                                <button onclick="window.Cart.add(${p.id})" class="px-5 py-3 bg-white dark:bg-neutral-800 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-semibold text-[10px] tracking-widest uppercase rounded-full shadow-md transition-all duration-300 flex items-center gap-2" title="Add to Bag">
                                    <i class="fa-solid fa-bag-shopping"></i> Add to Bag
                                </button>
                                <button data-wishlist-btn="${p.id}" onclick="window.toggleWishlistOnCard(${p.id}, this)" class="p-3 bg-white dark:bg-neutral-800 text-black dark:text-white rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black shadow-md transition-all duration-300 flex items-center justify-center w-10 h-10" title="Add to Wishlist">
                                    ${heartIcon}
                                </button>
                            </div>
                        </div>
                        <div class="p-5 flex flex-col flex-grow">
                            <div class="flex justify-between items-start mb-2">
                                <span class="text-[10px] uppercase font-bold text-luxury-accent tracking-widest">${p.subCategory}</span>
                                ${ratingStars}
                            </div>
                            <h3 class="font-serif text-base text-gray-800 dark:text-gray-200 mb-2 group-hover:text-luxury-accent transition-colors flex-grow">
                                <a href="product-details.html?id=${p.id}">${p.name}</a>
                            </h3>
                            <div class="flex items-center justify-between mt-auto pt-3 border-t border-gray-50 dark:border-neutral-800">
                                <div class="price-display">
                                    ${priceDisplay}
                                </div>
                                <div class="flex gap-1">
                                    ${p.colors.map(c => `<span class="w-3 h-3 rounded-full border border-gray-300 dark:border-neutral-700" style="background-color: ${c.hex}" title="${c.name}"></span>`).join("")}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }).join("");
        } else {
            // List view
            productGrid.className = "flex flex-col gap-6 w-full";
            productGrid.innerHTML = products.map(p => {
                const badge = p.isNew ? 
                    `<span class="absolute top-4 left-4 bg-black text-white dark:bg-white dark:text-black text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 z-10">New</span>` : 
                    p.isSale ? 
                    `<span class="absolute top-4 left-4 bg-red-600 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 z-10 sale-pulse">Sale</span>` : "";

                const priceDisplay = p.salePrice ? 
                    `<span class="text-gray-400 dark:text-neutral-500 line-through text-sm mr-2">$${p.price.toFixed(2)}</span><span class="text-red-600 font-bold">$${p.salePrice.toFixed(2)}</span>` : 
                    `<span class="text-gray-900 dark:text-gray-100 font-medium">$${p.price.toFixed(2)}</span>`;

                const ratingStars = `<div class="flex items-center gap-1 text-[11px] text-amber-500">
                    <i class="fa-solid fa-star"></i>
                    <span class="text-gray-500 dark:text-neutral-400 font-semibold text-xs ml-0.5">${p.rating}</span>
                </div>`;

                const inWish = isWishlisted(p.id);
                const heartIcon = inWish ? `<i class="fa-solid fa-heart text-xs text-red-500"></i>` : `<i class="fa-regular fa-heart text-xs"></i>`;

                return `
                    <div class="product-card group relative bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-luxury shadow-luxury-hover transition-luxury flex flex-col md:flex-row gap-6 p-5 rounded" data-aos="fade-up">
                        <div class="relative img-zoom-container bg-gray-50 dark:bg-neutral-950 w-full md:w-56 aspect-[3/4] overflow-hidden shrink-0 rounded">
                            ${badge}
                            <a href="product-details.html?id=${p.id}" class="block w-full h-full">
                                <img src="${p.images[0]}" alt="${p.name}" class="w-full h-full object-cover">
                            </a>
                        </div>
                        <div class="flex flex-col flex-grow py-1">
                            <div class="flex justify-between items-start mb-1">
                                <span class="text-[10px] uppercase font-bold text-luxury-accent tracking-widest">${p.subCategory}</span>
                                ${ratingStars}
                            </div>
                            <h3 class="font-serif text-xl text-gray-800 dark:text-gray-200 mb-2 group-hover:text-luxury-accent transition-colors">
                                <a href="product-details.html?id=${p.id}">${p.name}</a>
                            </h3>
                            <p class="text-sm text-gray-500 dark:text-neutral-400 mb-4 max-w-2xl leading-relaxed">${p.description}</p>
                            
                            <div class="price-display mb-4">
                                ${priceDisplay}
                            </div>

                            <div class="flex flex-wrap items-center gap-4 mt-auto pt-4 border-t border-gray-50 dark:border-neutral-800">
                                <button onclick="window.Cart.add(${p.id})" class="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 font-semibold text-[10px] tracking-widest uppercase transition-all flex items-center gap-2 rounded">
                                    <i class="fa-solid fa-bag-shopping"></i> Add to Bag
                                </button>
                                <button data-wishlist-btn="${p.id}" onclick="window.toggleWishlistOnCard(${p.id}, this)" class="p-3 bg-gray-100 dark:bg-neutral-800 text-black dark:text-white rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 flex items-center justify-center w-10 h-10" title="Add to Wishlist">
                                    ${heartIcon}
                                </button>
                                
                                <div class="flex items-center gap-2 ml-auto">
                                    <span class="text-xs text-gray-400">Colors:</span>
                                    <div class="flex gap-1.5">
                                        ${p.colors.map(c => `<span class="w-3.5 h-3.5 rounded-full border border-gray-300 dark:border-neutral-700" style="background-color: ${c.hex}" title="${c.name}"></span>`).join("")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }).join("");
        }

        // Re-initialize AOS scroll animations for newly created DOM nodes
        if (typeof AOS !== "undefined") {
            AOS.refresh();
        }
    }

    // Run first rendering
    applyFilters();
});
