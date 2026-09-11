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
        sizes: ["XS", "S", "M", "L"],
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
        sizes: ["XS", "S", "M", "XL"],
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
        sizes: ["S", "M", "L", "XL", "40", "41", "42", "43", "44"],
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
        sizes: ["XS", "S", "M", "L", "30", "32", "34", "36"],
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
        sizes: ["S", "M", "L", "XL"],
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
        sizes: ["XS", "S", "M", "L"],
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
        sizes: ["XS", "S", "M", "L", "36", "37", "38", "39", "40"],
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
        sizes: ["XS", "S", "M", "XL", "34", "36", "38", "40"],
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
        sizes: ["XS", "S", "M", "L", "XL"],
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
        sizes: ["XS", "S", "M", "XL"],
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
        sizes: ["S", "M", "L", "XL"],
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
    },

    // --- UNISEX CATEGORY (DRESSES) ---
    {
        id: 16,
        name: "Minimalist Fluid Silk Robe Dress",
        price: 260.00,
        salePrice: null,
        rating: 4.9,
        reviewsCount: 34,
        category: "unisex",
        subCategory: "dresses",
        sizes: ["XS", "S", "M", "L"],
        colors: [
            { name: "Onyx Black", hex: "#111111" },
            { name: "Sand", hex: "#D8C3A5" },
            { name: "Slate Gray", hex: "#708090" }
        ],
        images: [
            "assets/images/products/unisex/silk-robe-1.jpg"
        ],
        isNew: true,
        isSale: false,
        description: "A fluid, all-gender silhouette tailored from heavyweight mulberry silk. Features a relaxed kimono-style cut, dropped shoulders, and a detachable sash."
    },
    {
        id: 17,
        name: "Oversized Cashmere Kaftan Dress",
        price: 295.00,
        salePrice: 245.00,
        rating: 4.8,
        reviewsCount: 27,
        category: "unisex",
        subCategory: "dresses",
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Oatmeal", hex: "#EAE6DF" },
            { name: "Charcoal", hex: "#36454F" }
        ],
        images: [
            "assets/images/products/unisex/kaftan-1.jpg"
        ],
        isNew: false,
        isSale: true,
        description: "Knitted from ultra-soft Grade-A Mongolian cashmere with a gender-neutral drape, deep side slits, and a cozy high ribbed neckline."
    },
    {
        id: 18,
        name: "Structured Raw Linen Tunic Dress",
        price: 180.00,
        salePrice: null,
        rating: 4.7,
        reviewsCount: 19,
        category: "unisex",
        subCategory: "dresses",
        sizes: ["XS", "S", "M", "L"],
        colors: [
            { name: "Natural Ecru", hex: "#F5F2EB" },
            { name: "Olive Green", hex: "#556B2F" },
            { name: "Espresso", hex: "#362B28" }
        ],
        images: [
            "assets/images/products/unisex/linen-tunic-1.jpg"
        ],
        isNew: true,
        isSale: false,
        description: "Artisanal raw Belgian linen cut into a versatile, structured tunic silhouette. Features mandarin collar detailing, mother-of-pearl buttons, and side seam pockets."
    },
    {
        id: 19,
        name: "Monochrome Layered Poplin Shirt Dress",
        price: 165.00,
        salePrice: 135.00,
        rating: 4.9,
        reviewsCount: 38,
        category: "unisex",
        subCategory: "dresses",
        sizes: ["XS", "S", "L", "XL"],
        colors: [
            { name: "Crisp White", hex: "#FFFFFF" },
            { name: "Midnight Navy", hex: "#1A2536" }
        ],
        images: [
            "assets/images/products/unisex/shirtdress-1.jpg"
        ],
        isNew: false,
        isSale: true,
        description: "Crafted from crisp organic cotton poplin, this genderless longline shirt dress boasts a stepped hemline, French placket, and concealed dual pockets."
    },
    {
        id: 20,
        name: "Atelier Double-Faced Wool Wrap Dress",
        price: 390.00,
        salePrice: null,
        rating: 5.0,
        reviewsCount: 21,
        category: "unisex",
        subCategory: "dresses",
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Camel", hex: "#C19A6B" },
            { name: "Pitch Black", hex: "#000000" }
        ],
        images: [
            "assets/images/products/unisex/wool-wrap-1.jpg"
        ],
        isNew: true,
        isSale: false,
        description: "Sculptural outerwear dress hand-finished in double-faced virgin wool. Designed with clean unlined edges, generous deep pockets, and a self-tie wrap closure."
    },
    {
        id: 21,
        name: "Draped Botanical Silk Tunic Dress",
        price: 215.00,
        salePrice: null,
        rating: 4.8,
        reviewsCount: 16,
        category: "unisex",
        subCategory: "dresses",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: [
            { name: "Sage Green", hex: "#9C9F84" },
            { name: "Champagne", hex: "#F0E2B6" }
        ],
        images: [
            "assets/images/products/unisex/botanical-tunic-1.jpg"
        ],
        isNew: true,
        isSale: false,
        description: "Woven with plant-dyed mulberry silk for an ethereal fluid drape. Designed with a loose asymmetrical hem, band collar, and minimalist tailoring."
    },

    // --- UNISEX CATEGORY (ACCESSORIES) ---
    {
        id: 22,
        name: "Minimalist Full-Grain Leather Tote",
        price: 280.00,
        salePrice: null,
        rating: 4.9,
        reviewsCount: 45,
        category: "unisex",
        subCategory: "accessories",
        sizes: ["M", "L", "XL", "One Size"],
        colors: [
            { name: "Cognac Brown", hex: "#9E4714" },
            { name: "Obsidian Black", hex: "#111111" }
        ],
        images: [
            "assets/images/products/unisex/leather-tote.jpg"
        ],
        isNew: true,
        isSale: false,
        description: "Hand-stitched from vegetable-tanned Italian full-grain leather. Features structured top handles, an unlined raw suede interior, and polished brass hardware."
    },
    {
        id: 23,
        name: "Artisanal Silk Twill Heritage Scarf",
        price: 125.00,
        salePrice: 95.00,
        rating: 4.8,
        reviewsCount: 31,
        category: "unisex",
        subCategory: "accessories",
        sizes: ["XS", "S", "M", "One Size"],
        colors: [
            { name: "Gold Ochre", hex: "#CC7722" },
            { name: "Midnight Teal", hex: "#004B49" }
        ],
        images: [
            "assets/images/products/unisex/silk-scarf.jpg"
        ],
        isNew: false,
        isSale: true,
        description: "Printed on 100% heavy mulberry silk twill with hand-rolled edges. Showcases an abstract geometric architectural pattern inspired by Parisian ateliers."
    },
    {
        id: 24,
        name: "Sculpted Titanium Minimalist Sunglasses",
        price: 210.00,
        salePrice: null,
        rating: 4.9,
        reviewsCount: 28,
        category: "unisex",
        subCategory: "accessories",
        sizes: ["XS", "S", "M", "L", "XL", "One Size"],
        colors: [
            { name: "Brushed Gunmetal", hex: "#4A4A4A" },
            { name: "Matte Black", hex: "#1C1C1C" }
        ],
        images: [
            "assets/images/products/unisex/sunglasses.jpg"
        ],
        isNew: true,
        isSale: false,
        description: "Ultra-lightweight Japanese beta-titanium frames fitted with polarized category-3 UV400 lenses and custom acetate temple tips."
    },
    {
        id: 25,
        name: "Woven Calfskin Braided Leather Belt",
        price: 115.00,
        salePrice: null,
        rating: 4.7,
        reviewsCount: 22,
        category: "unisex",
        subCategory: "accessories",
        sizes: ["XS", "S", "M", "L", "XL", "One Size"],
        colors: [
            { name: "Rich Espresso", hex: "#362B28" },
            { name: "Tan", hex: "#C19A6B" }
        ],
        images: [
            "assets/images/products/unisex/woven-belt.jpg"
        ],
        isNew: false,
        isSale: false,
        description: "Intricately hand-braided calfskin leather belt with a brushed brass buckle. Fully adjustable with pin closure through the weave."
    },
    {
        id: 26,
        name: "Ribbed Mongolian Cashmere Scarf & Beanie",
        price: 175.00,
        salePrice: 140.00,
        rating: 5.0,
        reviewsCount: 39,
        category: "unisex",
        subCategory: "accessories",
        sizes: ["XS", "S", "M", "L", "XL", "One Size"],
        colors: [
            { name: "Oatmeal", hex: "#EAE6DF" },
            { name: "Charcoal Heather", hex: "#36454F" }
        ],
        images: [
            "assets/images/products/unisex/cashmere-set.jpg"
        ],
        isNew: true,
        isSale: true,
        description: "Luxuriously soft 2-piece winter accessory set knitted from 100% Grade-A Mongolian cashmere with tactile wide ribbing."
    },
    {
        id: 27,
        name: "Structured Weekender Leather Duffel",
        price: 360.00,
        salePrice: null,
        rating: 4.9,
        reviewsCount: 19,
        category: "unisex",
        subCategory: "accessories",
        sizes: ["M", "L", "XL", "One Size"],
        colors: [
            { name: "Chestnut Brown", hex: "#8B5A2B" },
            { name: "Pitch Black", hex: "#111111" }
        ],
        images: [
            "assets/images/lookbook/look-3.jpg"
        ],
        isNew: true,
        isSale: false,
        description: "An enduring travel essential crafted from supple oil-waxed full-grain leather, reinforced base feet, double zip opening, and detachable shoulder strap."
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
