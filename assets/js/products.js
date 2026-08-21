// Products Database for Clothing & Fashion Boutique
const PRODUCTS_DATA = [
    // --- MEN'S CATEGORY ---
    // --- MEN'S DRESSES ---
    {
        id: 1,
        name: "Tailored Linen Kaftan Dress",
        price: 245.00,
        salePrice: null,
        rating: 4.8,
        reviewsCount: 24,
        category: "men",
        subCategory: "dresses",
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Beige", hex: "#E1D6C4" },
            { name: "Navy", hex: "#1A2536" },
            { name: "Olive", hex: "#5C604D" }
        ],
        images: [
            "assets/images/products/men/sportcoat-1.jpg",
            "assets/images/products/men/sportcoat-2.jpg"
        ],
        isNew: true,
        isSale: false,
        description: "Crafted from breathable Italian linen, this tailored kaftan dress offers a refined yet relaxed silhouette, perfect for warm-weather sophistication."
    },
    {
        id: 2,
        name: "Classic Longline Oxford Dress Shirt",
        price: 85.00,
        salePrice: 65.00,
        rating: 4.6,
        reviewsCount: 42,
        category: "men",
        subCategory: "dresses",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: [
            { name: "White", hex: "#FFFFFF" },
            { name: "Light Blue", hex: "#ADD8E6" },
            { name: "Pink", hex: "#FFC0CB" }
        ],
        images: [
            "assets/images/products/men/shirt-1.jpg",
            "assets/images/products/men/shirt-2.jpg"
        ],
        isNew: false,
        isSale: true,
        description: "A wardrobe staple made from premium long-staple cotton, featuring a button-down collar, adjustable cuffs, and our signature heritage longline tailoring."
    },
    {
        id: 3,
        name: "Fine Knit Merino Tunic Dress",
        price: 95.00,
        salePrice: null,
        rating: 4.4,
        reviewsCount: 22,
        category: "men",
        subCategory: "dresses",
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Gray", hex: "#808080" },
            { name: "Navy", hex: "#1A2536" },
            { name: "Burgundy", hex: "#800020" }
        ],
        images: [
            "assets/images/products/men/merino-1.jpg",
            "assets/images/products/men/merino-2-new.jpg"
        ],
        isNew: false,
        isSale: false,
        description: "Lightweight yet exceptionally warm, this tunic dress is knitted from premium extra-fine Australian Merino wool. Ideal for seasonal layering."
    },
    {
        id: 4,
        name: "Minimalist Longline Suede Robe",
        price: 380.00,
        salePrice: 299.00,
        rating: 4.7,
        reviewsCount: 15,
        category: "men",
        subCategory: "dresses",
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Tan", hex: "#B87333" },
            { name: "Black", hex: "#111111" }
        ],
        images: [
            "assets/images/products/men/bomber-1.jpg",
            "assets/images/products/men/bomber-2.jpg"
        ],
        isNew: false,
        isSale: true,
        description: "An elegant take on the classic long robe dress. Tailored in ultra-soft sheep suede with elastic ribbed cuffs, collar, and hem, and polished steel zippers."
    },

    // --- MEN'S ACCESSORIES ---
    {
        id: 9,
        name: "Handcrafted Suede Chelsea Boots",
        price: 195.00,
        salePrice: null,
        rating: 4.9,
        reviewsCount: 31,
        category: "men",
        subCategory: "accessories",
        sizes: ["40", "41", "42", "43", "44"],
        colors: [
            { name: "Tan", hex: "#B87333" },
            { name: "Dark Brown", hex: "#5C4033" }
        ],
        images: [
            "assets/images/products/men/chelsea-1.jpg",
            "assets/images/products/men/chelsea-2.jpg"
        ],
        isNew: true,
        isSale: false,
        description: "Handcrafted in Portugal with supple Italian suede, these Chelsea boots feature flexible elastic side panels, a durable pull tab, and comfortable crepe soles."
    },
    {
        id: 10,
        name: "Slim-Fit Chino Belt & Trouser Set",
        price: 110.00,
        salePrice: null,
        rating: 4.5,
        reviewsCount: 19,
        category: "men",
        subCategory: "accessories",
        sizes: ["30", "32", "34", "36"],
        colors: [
            { name: "Khaki", hex: "#C3B091" },
            { name: "Charcoal", hex: "#36454F" },
            { name: "Olive", hex: "#5C604D" }
        ],
        images: [
            "assets/images/products/men/chinos-1.jpg",
            "assets/images/products/men/chinos-2.jpg"
        ],
        isNew: false,
        isSale: false,
        description: "Structured slim-fit chinos woven with a hint of stretch for active comfort, complete with our signature full grain leather belt."
    },

    // --- WOMEN'S CATEGORY ---
    // --- WOMEN'S DRESSES ---
    {
        id: 5,
        name: "Silk Slip Midi Dress",
        price: 185.00,
        salePrice: null,
        rating: 4.9,
        reviewsCount: 56,
        category: "women",
        subCategory: "dresses",
        sizes: ["XS", "S", "M", "L"],
        colors: [
            { name: "Emerald", hex: "#046307" },
            { name: "Champagne", hex: "#F0E2B6" },
            { name: "Black", hex: "#111111" }
        ],
        images: [
            "assets/images/products/women/slipdress-1.jpg"
        ],
        isNew: true,
        isSale: false,
        description: "Cut on the bias for an effortless fluid drape, this 100% mulberry silk slip dress features a cowl neckline, adjustable crossover straps, and a side slit."
    },
    {
        id: 6,
        name: "Double-Breasted Wool Trench Dress",
        price: 320.00,
        salePrice: null,
        rating: 4.9,
        reviewsCount: 29,
        category: "women",
        subCategory: "dresses",
        sizes: ["XS", "S", "M", "L"],
        colors: [
            { name: "Camel", hex: "#C19A6B" },
            { name: "Black", hex: "#111111" }
        ],
        images: [
            "assets/images/products/women/trench-1.jpg"
        ],
        isNew: false,
        isSale: false,
        description: "An investment piece crafted from heavy double-faced wool. Detailed with classic epaulettes, gun flap storm panels, and a self-tie waist belt."
    },
    {
        id: 7,
        name: "Oversized Cashmere Turtleneck Dress",
        price: 220.00,
        salePrice: 175.00,
        rating: 4.8,
        reviewsCount: 38,
        category: "women",
        subCategory: "dresses",
        sizes: ["S", "M", "L"],
        colors: [
            { name: "Oatmeal", hex: "#EAE6DF" },
            { name: "Charcoal", hex: "#36454F" },
            { name: "Cream", hex: "#FFFDD0" }
        ],
        images: [
            "assets/images/products/women/turtleneck-1.jpg"
        ],
        isNew: false,
        isSale: true,
        description: "Knitted from Grade-A Mongolian cashmere, this cozy turtleneck features a relaxed fit, dropped shoulders, and ribbed trims for absolute luxury comfort."
    },
    {
        id: 8,
        name: "Lace Trim Linen Blouse Dress",
        price: 75.00,
        salePrice: 55.00,
        rating: 4.5,
        reviewsCount: 17,
        category: "women",
        subCategory: "dresses",
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "White", hex: "#FFFFFF" },
            { name: "Lavender", hex: "#E6E6FA" }
        ],
        images: [
            "assets/images/products/women/blouse-1.jpg"
        ],
        isNew: false,
        isSale: true,
        description: "A feminine and airy blouse made from pure washed linen, featuring delicate floral lace inserts, billowy sleeves, and shell buttons."
    },

    // --- WOMEN'S ACCESSORIES ---
    {
        id: 11,
        name: "Pointed Leather Ankle Boots",
        price: 210.00,
        salePrice: null,
        rating: 4.6,
        reviewsCount: 25,
        category: "women",
        subCategory: "accessories",
        sizes: ["36", "37", "38", "39", "40"],
        colors: [
            { name: "Black", hex: "#111111" },
            { name: "Burgundy", hex: "#800020" }
        ],
        images: [
            "assets/images/products/women/boots-1.jpg"
        ],
        isNew: true,
        isSale: false,
        description: "Striking pointed-toe booties crafted from calfskin leather. Set on a walkable block heel with a sleek side zipper and cushioned leather insole."
    },
    {
        id: 12,
        name: "Pleated Silk Belt & Wide Trouser Set",
        price: 135.00,
        salePrice: null,
        rating: 4.7,
        reviewsCount: 14,
        category: "women",
        subCategory: "accessories",
        sizes: ["34", "36", "38", "40"],
        colors: [
            { name: "Cream", hex: "#FFFDD0" },
            { name: "Sage", hex: "#9C9F84" },
            { name: "Black", hex: "#111111" }
        ],
        images: [
            "assets/images/products/women/trousers-1.jpg"
        ],
        isNew: true,
        isSale: false,
        description: "Designed with a high rise and dramatic wide-leg drape, these trousers feature front double-pleats, structured belt loops, and hidden closures, styled with a signature pleated silk belt."
    },
    {
        id: 13,
        name: "Classic Cashmere Cable-Knit Sweater",
        price: 165.00,
        salePrice: null,
        rating: 4.8,
        reviewsCount: 18,
        category: "men",
        subCategory: "dresses",
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Oatmeal", hex: "#EAE6DF" },
            { name: "Charcoal", hex: "#36454F" }
        ],
        images: [
            "assets/images/products/men/sweater-1.jpg"
        ],
        isNew: true,
        isSale: false,
        description: "Luxuriously soft and classic, this crewneck sweater is knitted from premium long-fiber cashmere in a heritage cable pattern."
    },
    {
        id: 14,
        name: "Tailored Silk Wrap Dress",
        price: 240.00,
        salePrice: null,
        rating: 4.9,
        reviewsCount: 22,
        category: "women",
        subCategory: "dresses",
        sizes: ["XS", "S", "M", "L"],
        colors: [
            { name: "Ruby Red", hex: "#9B111E" },
            { name: "Black", hex: "#111111" }
        ],
        images: [
            "assets/images/products/women/wrapdress-1.jpg"
        ],
        isNew: true,
        isSale: false,
        description: "Crafted from heavy sand-washed silk, this sophisticated wrap dress drapes elegantly, featuring a self-tie waist and french cuffs."
    },
    {
        id: 15,
        name: "Minimalist Suede Trench Coat",
        price: 340.00,
        salePrice: null,
        rating: 4.8,
        reviewsCount: 15,
        category: "women",
        subCategory: "dresses",
        sizes: ["XS", "S", "M", "L"],
        colors: [
            { name: "Chestnut Tan", hex: "#8B5A2B" },
            { name: "Charcoal Black", hex: "#1C1C1C" }
        ],
        images: [
            "assets/images/products/women/trench-suede-1.jpg"
        ],
        isNew: true,
        isSale: false,
        description: "Tailored from exceptionally soft lambskin suede, this minimalist trench coat features clean raw-edge detailing, hidden button closures, and a matching self-tie belt."
    }
];

// Helper functions for products
window.ProductsService = {
    getAll: () => PRODUCTS_DATA,
    
    getById: (id) => PRODUCTS_DATA.find(p => p.id === parseInt(id)),
    
    getByCategory: (category) => PRODUCTS_DATA.filter(p => p.category === category),
    
    getFeatured: () => PRODUCTS_DATA.slice(0, 4),
    
    getNewArrivals: () => PRODUCTS_DATA.filter(p => p.isNew),
    
    getSaleItems: () => PRODUCTS_DATA.filter(p => p.isSale),

    getRelated: (id) => {
        const product = PRODUCTS_DATA.find(p => p.id === parseInt(id));
        if (!product) return [];
        return PRODUCTS_DATA.filter(p => p.id !== product.id && (p.category === product.category || p.subCategory === product.subCategory)).slice(0, 4);
    }
};
