// Product catalog: Men / Women / Kid, no Cat-eye, only round/square/rectangle.

const PRODUCTS = [
    // --- MEN • ROUND ---
    {
        id: "men-round-e14453",
        name: "LB E14453 Green Round",
        brand: "Lenskart Blu",
        category: "men",
        shape: "round",
        price: 79,
        oldPrice: 109,
        badges: ["Men", "Round"],
        featured: true,
        image:
            "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-%26-computer-glasses%3A-green-full-rim-round-lenskart-blu-glasses-lb-e14453-c1_g_805611_03_2022.jpg",
    },
    {
        id: "men-round-e14787",
        name: "LB E14787 Grey Round",
        brand: "Lenskart Blu",
        category: "men",
        shape: "round",
        price: 75,
        oldPrice: 99,
        badges: ["Men", "Round"],
        featured: true,
        image:
            "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-%26-computer-glasses%3A-green-full-rim-round-lenskart-blu-glasses-lb-e14453-c1_g_805611_03_2022.jpg",
    },
    {
        id: "men-round-e14792",
        name: "LB E14792 Black Round",
        brand: "Lenskart Blu",
        category: "men",
        shape: "round",
        price: 72,
        oldPrice: 95,
        badges: ["Men", "Round"],
        featured: false,
        image:
            "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-%26-computer-glasses%3A-green-full-rim-round-lenskart-blu-glasses-lb-e14453-c1_g_805611_03_2022.jpg",
    },

    // --- MEN • SQUARE ---
    {
        id: "men-square-e16059",
        name: "LB E16059 Black Square",
        brand: "Lenskart Blu",
        category: "men",
        shape: "square",
        price: 85,
        oldPrice: 119,
        badges: ["Men", "Square"],
        featured: true,
        image:
            "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-screen-glasses%3A-black-full-rim-geometric-lenskart-blu-c3-lb-e16059_g_3395_28_06_2023.jpg",
    },
    {
        id: "men-square-e17372",
        name: "LB E17372 Clear Square",
        brand: "Lenskart Blu",
        category: "men",
        shape: "square",
        price: 82,
        oldPrice: 115,
        badges: ["Men", "Square"],
        featured: false,
        image:
            "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-screen-glasses%3A-black-full-rim-geometric-lenskart-blu-c3-lb-e16059_g_3395_28_06_2023.jpg",
    },

    // --- MEN • RECTANGLE ---
    {
        id: "men-rectangle-e17371",
        name: "LB E17371 Black Rectangle",
        brand: "Lenskart Blu",
        category: "men",
        shape: "rectangle",
        price: 88,
        oldPrice: 129,
        badges: ["Men", "Rectangle"],
        featured: true,
        image:
            "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e17371-c2-eyeglasses__dsc3818_29_09_2024.jpg",
    },
    {
        id: "men-rectangle-e17489",
        name: "LB E17489 Gunmetal Rectangle",
        brand: "Lenskart Blu",
        category: "men",
        shape: "rectangle",
        price: 83,
        oldPrice: 119,
        badges: ["Men", "Rectangle"],
        featured: false,
        image:
            "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e17371-c2-eyeglasses__dsc3818_29_09_2024.jpg",
    },
    {
        id: "men-rectangle-e14789",
        name: "LB E14789 Navy Rectangle",
        brand: "Lenskart Blu",
        category: "men",
        shape: "rectangle",
        price: 79,
        oldPrice: 109,
        badges: ["Men", "Rectangle"],
        featured: false,
        image:
            "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e17371-c2-eyeglasses__dsc3818_29_09_2024.jpg",
    },

    // --- WOMEN • ROUND ---
    {
        id: "women-round-jj-e15780",
        name: "JJ E15780 Gold Round",
        brand: "John Jacobs",
        category: "women",
        shape: "round",
        price: 99,
        oldPrice: 149,
        badges: ["Women", "Round"],
        featured: true,
        image:
            "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/i/blue-block-phone---computer-glasses%3A-gold-transparent-full-rim-round-john-jacobs-computer-glasses-jj-e15780-c1_g_8351_08_17_23.jpg",
    },
    {
        id: "women-round-lae000188",
        name: "Air LAE000188 Rose Round",
        brand: "Lenskart Air",
        category: "women",
        shape: "round",
        price: 89,
        oldPrice: 129,
        badges: ["Women", "Round"],
        featured: false,
        image:
            "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/i/blue-block-phone---computer-glasses%3A-gold-transparent-full-rim-round-john-jacobs-computer-glasses-jj-e15780-c1_g_8351_08_17_23.jpg",
    },

    // --- WOMEN • SQUARE ---
    {
        id: "women-square-jj-e15782",
        name: "JJ E15782 Gold Black Square",
        brand: "John Jacobs",
        category: "women",
        shape: "square",
        price: 109,
        oldPrice: 159,
        badges: ["Women", "Square"],
        featured: true,
        image:
            "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/i/blue-block-phone---computer-glasses%3A-gold-black-full-rim-square-john-jacobs-computer-glasses-jj-e15782-c2_g_8382_08_17_23.jpg",
    },

    // --- WOMEN • RECTANGLE ---
    {
        id: "women-rectangle-e14270",
        name: "LB E14270 Purple Rectangle",
        brand: "Lenskart Blu",
        category: "women",
        shape: "rectangle",
        price: 79,
        oldPrice: 109,
        badges: ["Women", "Rectangle"],
        featured: false,
        image:
            "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/e/lenskart-blu-lb-e14270-c3-eyeglasses_G_1286.jpg",
    },

    // --- KID • ROUND ---
    {
        id: "kid-round-e10003",
        name: "Hooper HP E10003 Sky Blue Round",
        brand: "Hooper",
        category: "kid",
        shape: "round",
        price: 49,
        oldPrice: 69,
        badges: ["Kid", "Round"],
        featured: true,
        image:
            "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//h/i/kids-glasses%3A-blue-sky-blue-full-rim-round-kids--8-12-yrs--hooper-flexi-hooper-hp-e10003-c2_hooper-hp-e10003-c2-eyeglasses_g_5789_22_march23.jpg.jpg",
    },
    {
        id: "kid-round-e10015",
        name: "Hooper HP E10015 Round",
        brand: "Hooper",
        category: "kid",
        shape: "round",
        price: 45,
        oldPrice: 65,
        badges: ["Kid", "Round"],
        featured: false,
        image:
            "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//h/i/kids-glasses%3A-blue-sky-blue-full-rim-round-kids--8-12-yrs--hooper-flexi-hooper-hp-e10003-c2_hooper-hp-e10003-c2-eyeglasses_g_5789_22_march23.jpg.jpg",
    },
    {
        id: "kid-round-e15083m",
        name: "Hooper HP E15083M Round",
        brand: "Hooper",
        category: "kid",
        shape: "round",
        price: 47,
        oldPrice: 69,
        badges: ["Kid", "Round"],
        featured: false,
        image:
            "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//h/i/kids-glasses%3A-blue-sky-blue-full-rim-round-kids--8-12-yrs--hooper-flexi-hooper-hp-e10003-c2_hooper-hp-e10003-c2-eyeglasses_g_5789_22_march23.jpg.jpg",
    },
    {
        id: "kid-round-e15083l",
        name: "Hooper HP E15083L Round",
        brand: "Hooper",
        category: "kid",
        shape: "round",
        price: 47,
        oldPrice: 69,
        badges: ["Kid", "Round"],
        featured: false,
        image:
            "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//h/i/kids-glasses%3A-blue-sky-blue-full-rim-round-kids--8-12-yrs--hooper-flexi-hooper-hp-e10003-c2_hooper-hp-e10003-c2-eyeglasses_g_5789_22_march23.jpg.jpg",
    },

    // --- KID • SQUARE ---
    {
        id: "kid-square-e15011-c6",
        name: "TR Essentials HP E15011 C6 Square",
        brand: "Hooper",
        category: "kid",
        shape: "square",
        price: 49,
        oldPrice: 69,
        badges: ["Kid", "Square"],
        featured: true,
        image:
            "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/ocean-blue-full-rim-wayfarer_csvfile-1715678841004-_dsc2086.jpg",
    },
    {
        id: "kid-square-e15011l-c1",
        name: "Hustlr HP E15011L C1 Square",
        brand: "Lenskart Hustlr",
        category: "kid",
        shape: "square",
        price: 46,
        oldPrice: 65,
        badges: ["Kid", "Square"],
        featured: false,
        image:
            "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/ocean-blue-full-rim-wayfarer_csvfile-1715678841004-_dsc2086.jpg",
    },
    {
        id: "kid-square-e15011-c15",
        name: "TR Essentials HP E15011 C15 Square",
        brand: "Hooper",
        category: "kid",
        shape: "square",
        price: 46,
        oldPrice: 65,
        badges: ["Kid", "Square"],
        featured: false,
        image:
            "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/ocean-blue-full-rim-wayfarer_csvfile-1715678841004-_dsc2086.jpg",
    },

    // --- KID • RECTANGLE ---
    {
        id: "kid-rectangle-e10004",
        name: "Hooper HP E10004 Rectangle",
        brand: "Hooper",
        category: "kid",
        shape: "rectangle",
        price: 45,
        oldPrice: 65,
        badges: ["Kid", "Rectangle"],
        featured: false,
        image:
            "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//h/i/kids-glasses%3A-blue-sky-blue-full-rim-round-kids--8-12-yrs--hooper-flexi-hooper-hp-e10003-c2_hooper-hp-e10003-c2-eyeglasses_g_5789_22_march23.jpg.jpg",
    },
    {
        id: "kid-rectangle-e10031",
        name: "Hooper HP E10031 Rectangle",
        brand: "Hooper",
        category: "kid",
        shape: "rectangle",
        price: 47,
        oldPrice: 69,
        badges: ["Kid", "Rectangle"],
        featured: false,
        image:
            "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//h/i/kids-glasses%3A-blue-sky-blue-full-rim-round-kids--8-12-yrs--hooper-flexi-hooper-hp-e10003-c2_hooper-hp-e10003-c2-eyeglasses_g_5789_22_march23.jpg.jpg",
    },
    {
        id: "kid-rectangle-e16275",
        name: "Lenskart LK E16275 Rectangle",
        brand: "Lenskart",
        category: "kid",
        shape: "rectangle",
        price: 49,
        oldPrice: 69,
        badges: ["Kid", "Rectangle"],
        featured: false,
        image:
            "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//h/i/kids-glasses%3A-blue-sky-blue-full-rim-round-kids--8-12-yrs--hooper-flexi-hooper-hp-e10003-c2_hooper-hp-e10003-c2-eyeglasses_g_5789_22_march23.jpg.jpg",
    },
];