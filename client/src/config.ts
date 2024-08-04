const Config = {
    API_ENDPOINT: "https://api.xavierprojects.com",
    ACCESS_TOKEN_KEY: "access_token",
    APP_NAME: "Generic Brand",
    PRODUCT_NAV_OPTIONS: {
        ENTRIES: {
            ["Mens"]: {
                ["New Arrivals"]: "/products",
                ["T-Shirts & Tops"]: "/products",
                ["Hoodies & Jacket"]: "/products",
                ["Pants & Shorts"]: "/products",
                ["Shop All Clothing"]: "/products",
            },
            ["Womens"]: {
                ["New Arrivals"]: "/products",
                ["T-Shirts & Tops"]: "/products",
                ["Hoodies & Jacket"]: "/products",
                ["Pants & Shorts"]: "/products",
                ["Dresses & Skirts"]: "/products",
                ["Shop All Clothing"]: "/products",
            },
        },
        SINGLE_ENTRIES: {
            ["Featured"]: "/products",
        },
    }
}

export default Config;