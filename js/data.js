// ==========================================
// ElectroMart - Product Database
// data.js
// ==========================================

const products = [

{
    id: 1,
    name: "Apple MacBook Air M3",
    category: "Laptop",
    brand: "Apple",
    price: 114999,
    oldPrice: 124999,
    rating: 4.9,
    reviews: 1520,
    stock: 15,
    discount: 8,
    image: "https://picsum.photos/400?random=1",
    images: [
        "https://picsum.photos/600?random=1",
        "https://picsum.photos/600?random=2",
        "https://picsum.photos/600?random=3"
    ],
    description: "Apple MacBook Air M3 with 13.6-inch Liquid Retina Display, 16GB RAM and 512GB SSD.",
    featured: true,
    bestseller: true
},

{
    id: 2,
    name: "Dell XPS 13",
    category: "Laptop",
    brand: "Dell",
    price: 99999,
    oldPrice: 109999,
    rating: 4.8,
    reviews: 1023,
    stock: 18,
    discount: 9,
    image: "https://picsum.photos/400?random=4",
    images: [
        "https://picsum.photos/600?random=4",
        "https://picsum.photos/600?random=5",
        "https://picsum.photos/600?random=6"
    ],
    description: "Dell XPS 13 with Intel Core Ultra processor, 16GB RAM and 512GB SSD.",
    featured: true,
    bestseller: false
},

{
    id: 3,
    name: "Samsung Galaxy S25",
    category: "Mobile",
    brand: "Samsung",
    price: 84999,
    oldPrice: 92999,
    rating: 4.8,
    reviews: 2100,
    stock: 30,
    discount: 9,
    image: "https://picsum.photos/400?random=7",
    images: [
        "https://picsum.photos/600?random=7",
        "https://picsum.photos/600?random=8",
        "https://picsum.photos/600?random=9"
    ],
    description: "Samsung flagship smartphone with AMOLED display, AI camera and 5G support.",
    featured: true,
    bestseller: true
},

{
    id: 4,
    name: "iPhone 16",
    category: "Mobile",
    brand: "Apple",
    price: 79999,
    oldPrice: 86999,
    rating: 4.9,
    reviews: 3200,
    stock: 20,
    discount: 8,
    image: "https://picsum.photos/400?random=10",
    images: [
        "https://picsum.photos/600?random=10",
        "https://picsum.photos/600?random=11",
        "https://picsum.photos/600?random=12"
    ],
    description: "Apple iPhone 16 with A18 chip, Super Retina XDR display and advanced camera.",
    featured: true,
    bestseller: true
},

{
    id: 5,
    name: "Sony WH-1000XM5",
    category: "Headphones",
    brand: "Sony",
    price: 28999,
    oldPrice: 32999,
    rating: 4.8,
    reviews: 1870,
    stock: 35,
    discount: 12,
    image: "https://picsum.photos/400?random=13",
    images: [
        "https://picsum.photos/600?random=13",
        "https://picsum.photos/600?random=14",
        "https://picsum.photos/600?random=15"
    ],
    description: "Wireless noise cancelling headphones with premium sound quality.",
    featured: true,
    bestseller: false
},

{
    id: 6,
    name: "Apple AirPods Pro 2",
    category: "Headphones",
    brand: "Apple",
    price: 21999,
    oldPrice: 24999,
    rating: 4.9,
    reviews: 2950,
    stock: 42,
    discount: 12,
    image: "https://picsum.photos/400?random=16",
    images: [
        "https://picsum.photos/600?random=16",
        "https://picsum.photos/600?random=17",
        "https://picsum.photos/600?random=18"
    ],
    description: "AirPods Pro with Active Noise Cancellation and Adaptive Audio.",
    featured: false,
    bestseller: true
},

{
    id: 7,
    name: "Apple Watch Series 10",
    category: "Smart Watch",
    brand: "Apple",
    price: 45999,
    oldPrice: 49999,
    rating: 4.8,
    reviews: 1340,
    stock: 22,
    discount: 8,
    image: "https://picsum.photos/400?random=19",
    images: [
        "https://picsum.photos/600?random=19",
        "https://picsum.photos/600?random=20",
        "https://picsum.photos/600?random=21"
    ],
    description: "Advanced smartwatch with health monitoring and fitness tracking.",
    featured: true,
    bestseller: false
},

{
    id: 8,
    name: "Samsung Galaxy Watch Ultra",
    category: "Smart Watch",
    brand: "Samsung",
    price: 39999,
    oldPrice: 43999,
    rating: 4.7,
    reviews: 980,
    stock: 19,
    discount: 9,
    image: "https://picsum.photos/400?random=22",
    images: [
        "https://picsum.photos/600?random=22",
        "https://picsum.photos/600?random=23",
        "https://picsum.photos/600?random=24"
    ],
    description: "Premium Galaxy smartwatch with AMOLED display and GPS.",
    featured: false,
    bestseller: false
},

{
    id: 9,
    name: "Canon EOS R50",
    category: "Camera",
    brand: "Canon",
    price: 67999,
    oldPrice: 73999,
    rating: 4.7,
    reviews: 820,
    stock: 12,
    discount: 8,
    image: "https://picsum.photos/400?random=25",
    images: [
        "https://picsum.photos/600?random=25",
        "https://picsum.photos/600?random=26",
        "https://picsum.photos/600?random=27"
    ],
    description: "Mirrorless camera with 24.2MP APS-C sensor and 4K video recording.",
    featured: false,
    bestseller: false
},

{
    id: 10,
    name: "JBL Charge 5",
    category: "Speaker",
    brand: "JBL",
    price: 14999,
    oldPrice: 16999,
    rating: 4.8,
    reviews: 1640,
    stock: 50,
    discount: 12,
    image: "https://picsum.photos/400?random=28",
    images: [
        "https://picsum.photos/600?random=28",
        "https://picsum.photos/600?random=29",
        "https://picsum.photos/600?random=30"
    ],
    description: "Portable Bluetooth speaker with powerful bass and 20-hour battery life.",
    featured: true,
    bestseller: true
},

{
    id: 11,
    name: "LG UltraGear 27\" Gaming Monitor",
    category: "Monitor",
    brand: "LG",
    price: 24999,
    oldPrice: 28999,
    rating: 4.7,
    reviews: 1265,
    stock: 18,
    discount: 14,
    image: "https://picsum.photos/400?random=31",
    images: [
        "https://picsum.photos/600?random=31",
        "https://picsum.photos/600?random=32",
        "https://picsum.photos/600?random=33"
    ],
    description: "27-inch QHD IPS gaming monitor with 165Hz refresh rate and 1ms response time.",
    featured: true,
    bestseller: false
},

{
    id: 12,
    name: "Samsung Odyssey G5 Monitor",
    category: "Monitor",
    brand: "Samsung",
    price: 27999,
    oldPrice: 31999,
    rating: 4.8,
    reviews: 1018,
    stock: 20,
    discount: 13,
    image: "https://picsum.photos/400?random=34",
    images: [
        "https://picsum.photos/600?random=34",
        "https://picsum.photos/600?random=35",
        "https://picsum.photos/600?random=36"
    ],
    description: "32-inch curved QHD gaming monitor with HDR10 support.",
    featured: false,
    bestseller: true
},

{
    id: 13,
    name: "Samsung T7 Portable SSD 1TB",
    category: "SSD",
    brand: "Samsung",
    price: 9999,
    oldPrice: 11999,
    rating: 4.9,
    reviews: 1864,
    stock: 40,
    discount: 17,
    image: "https://picsum.photos/400?random=37",
    images: [
        "https://picsum.photos/600?random=37",
        "https://picsum.photos/600?random=38",
        "https://picsum.photos/600?random=39"
    ],
    description: "High-speed USB-C portable SSD with read speeds up to 1050MB/s.",
    featured: true,
    bestseller: true
},

{
    id: 14,
    name: "WD Black SN850X 1TB SSD",
    category: "SSD",
    brand: "Western Digital",
    price: 10999,
    oldPrice: 12999,
    rating: 4.8,
    reviews: 1375,
    stock: 32,
    discount: 15,
    image: "https://picsum.photos/400?random=40",
    images: [
        "https://picsum.photos/600?random=40",
        "https://picsum.photos/600?random=41",
        "https://picsum.photos/600?random=42"
    ],
    description: "PCIe Gen4 NVMe SSD designed for gaming and high-performance computing.",
    featured: false,
    bestseller: false
},

{
    id: 15,
    name: "Logitech MX Keys S Keyboard",
    category: "Keyboard",
    brand: "Logitech",
    price: 10999,
    oldPrice: 12499,
    rating: 4.8,
    reviews: 954,
    stock: 28,
    discount: 12,
    image: "https://picsum.photos/400?random=43",
    images: [
        "https://picsum.photos/600?random=43",
        "https://picsum.photos/600?random=44",
        "https://picsum.photos/600?random=45"
    ],
    description: "Premium wireless keyboard with backlit keys and multi-device support.",
    featured: true,
    bestseller: false
},

{
    id: 16,
    name: "Keychron K2 Mechanical Keyboard",
    category: "Keyboard",
    brand: "Keychron",
    price: 8499,
    oldPrice: 9999,
    rating: 4.7,
    reviews: 1132,
    stock: 36,
    discount: 15,
    image: "https://picsum.photos/400?random=46",
    images: [
        "https://picsum.photos/600?random=46",
        "https://picsum.photos/600?random=47",
        "https://picsum.photos/600?random=48"
    ],
    description: "Wireless mechanical keyboard with RGB lighting and hot-swappable switches.",
    featured: false,
    bestseller: true
},

{
    id: 17,
    name: "Logitech MX Master 3S Mouse",
    category: "Mouse",
    brand: "Logitech",
    price: 8999,
    oldPrice: 10499,
    rating: 4.9,
    reviews: 2187,
    stock: 34,
    discount: 14,
    image: "https://picsum.photos/400?random=49",
    images: [
        "https://picsum.photos/600?random=49",
        "https://picsum.photos/600?random=50",
        "https://picsum.photos/600?random=51"
    ],
    description: "Advanced wireless productivity mouse with MagSpeed scrolling.",
    featured: true,
    bestseller: true
},

{
    id: 18,
    name: "Razer DeathAdder V3",
    category: "Mouse",
    brand: "Razer",
    price: 5999,
    oldPrice: 6999,
    rating: 4.8,
    reviews: 1468,
    stock: 41,
    discount: 14,
    image: "https://picsum.photos/400?random=52",
    images: [
        "https://picsum.photos/600?random=52",
        "https://picsum.photos/600?random=53",
        "https://picsum.photos/600?random=54"
    ],
    description: "Ultra-light ergonomic gaming mouse with Focus Pro optical sensor.",
    featured: false,
    bestseller: false
},

{
    id: 19,
    name: "Apple iPad Air M3",
    category: "Tablet",
    brand: "Apple",
    price: 59999,
    oldPrice: 65999,
    rating: 4.9,
    reviews: 1685,
    stock: 22,
    discount: 9,
    image: "https://picsum.photos/400?random=55",
    images: [
        "https://picsum.photos/600?random=55",
        "https://picsum.photos/600?random=56",
        "https://picsum.photos/600?random=57"
    ],
    description: "Powerful iPad Air featuring the Apple M3 chip and Liquid Retina display.",
    featured: true,
    bestseller: true
},

{
    id: 20,
    name: "Samsung Galaxy Tab S10",
    category: "Tablet",
    brand: "Samsung",
    price: 54999,
    oldPrice: 59999,
    rating: 4.8,
    reviews: 1248,
    stock: 24,
    discount: 8,
    image: "https://picsum.photos/400?random=58",
    images: [
        "https://picsum.photos/600?random=58",
        "https://picsum.photos/600?random=59",
        "https://picsum.photos/600?random=60"
    ],
    description: "Premium Android tablet with AMOLED display, S Pen support and long battery life.",
    featured: false,
    bestseller: true
},

{
    id: 21,
    name: "Mi Power Bank 20000mAh",
    category: "Power Bank",
    brand: "Xiaomi",
    price: 2499,
    oldPrice: 2999,
    rating: 4.7,
    reviews: 1850,
    stock: 60,
    discount: 17,
    image: "https://picsum.photos/400?random=61",
    images: [
        "https://picsum.photos/600?random=61",
        "https://picsum.photos/600?random=62",
        "https://picsum.photos/600?random=63"
    ],
    description: "20000mAh fast charging power bank with dual USB output.",
    featured: false,
    bestseller: true
},

{
    id: 22,
    name: "TP-Link Archer AX55 Router",
    category: "Router",
    brand: "TP-Link",
    price: 6999,
    oldPrice: 7999,
    rating: 4.8,
    reviews: 954,
    stock: 35,
    discount: 13,
    image: "https://picsum.photos/400?random=64",
    images: [
        "https://picsum.photos/600?random=64",
        "https://picsum.photos/600?random=65",
        "https://picsum.photos/600?random=66"
    ],
    description: "Wi-Fi 6 dual-band router with high-speed wireless connectivity.",
    featured: true,
    bestseller: false
},

{
    id: 23,
    name: "Sony Bravia 55-inch 4K Smart TV",
    category: "Smart TV",
    brand: "Sony",
    price: 69999,
    oldPrice: 78999,
    rating: 4.9,
    reviews: 1320,
    stock: 15,
    discount: 11,
    image: "https://picsum.photos/400?random=67",
    images: [
        "https://picsum.photos/600?random=67",
        "https://picsum.photos/600?random=68",
        "https://picsum.photos/600?random=69"
    ],
    description: "55-inch 4K Ultra HD Google Smart TV with Dolby Vision and Atmos.",
    featured: true,
    bestseller: true
},

{
    id: 24,
    name: "HP Smart Tank 580 Printer",
    category: "Printer",
    brand: "HP",
    price: 16499,
    oldPrice: 18499,
    rating: 4.6,
    reviews: 720,
    stock: 25,
    discount: 11,
    image: "https://picsum.photos/400?random=70",
    images: [
        "https://picsum.photos/600?random=70",
        "https://picsum.photos/600?random=71",
        "https://picsum.photos/600?random=72"
    ],
    description: "All-in-one color printer with refillable ink tank system.",
    featured: false,
    bestseller: false
},

{
    id: 25,
    name: "Logitech C920 HD Webcam",
    category: "Webcam",
    brand: "Logitech",
    price: 6499,
    oldPrice: 7499,
    rating: 4.8,
    reviews: 1455,
    stock: 40,
    discount: 13,
    image: "https://picsum.photos/400?random=73",
    images: [
        "https://picsum.photos/600?random=73",
        "https://picsum.photos/600?random=74",
        "https://picsum.photos/600?random=75"
    ],
    description: "Full HD webcam with stereo microphones for streaming and meetings.",
    featured: true,
    bestseller: false
},

{
    id: 26,
    name: "Amazon Echo Dot (5th Gen)",
    category: "Smart Home",
    brand: "Amazon",
    price: 4499,
    oldPrice: 5499,
    rating: 4.8,
    reviews: 2480,
    stock: 48,
    discount: 18,
    image: "https://picsum.photos/400?random=76",
    images: [
        "https://picsum.photos/600?random=76",
        "https://picsum.photos/600?random=77",
        "https://picsum.photos/600?random=78"
    ],
    description: "Smart speaker with Alexa voice assistant and improved sound quality.",
    featured: true,
    bestseller: true
},

{
    id: 27,
    name: "Google Nest Mini",
    category: "Smart Home",
    brand: "Google",
    price: 3499,
    oldPrice: 4499,
    rating: 4.7,
    reviews: 1695,
    stock: 55,
    discount: 22,
    image: "https://picsum.photos/400?random=79",
    images: [
        "https://picsum.photos/600?random=79",
        "https://picsum.photos/600?random=80",
        "https://picsum.photos/600?random=81"
    ],
    description: "Compact smart speaker with Google Assistant.",
    featured: false,
    bestseller: true
},

{
    id: 28,
    name: "SanDisk Ultra 128GB Pen Drive",
    category: "Storage",
    brand: "SanDisk",
    price: 1199,
    oldPrice: 1499,
    rating: 4.7,
    reviews: 3620,
    stock: 80,
    discount: 20,
    image: "https://picsum.photos/400?random=82",
    images: [
        "https://picsum.photos/600?random=82",
        "https://picsum.photos/600?random=83",
        "https://picsum.photos/600?random=84"
    ],
    description: "USB 3.0 flash drive with fast transfer speed and compact design.",
    featured: false,
    bestseller: true
},

{
    id: 29,
    name: "Anker 65W USB-C Charger",
    category: "Charger",
    brand: "Anker",
    price: 3999,
    oldPrice: 4999,
    rating: 4.9,
    reviews: 1186,
    stock: 46,
    discount: 20,
    image: "https://picsum.photos/400?random=85",
    images: [
        "https://picsum.photos/600?random=85",
        "https://picsum.photos/600?random=86",
        "https://picsum.photos/600?random=87"
    ],
    description: "Compact 65W GaN fast charger suitable for laptops and smartphones.",
    featured: true,
    bestseller: false
},

{
    id: 30,
    name: "Sony PlayStation 5 Slim",
    category: "Gaming Console",
    brand: "Sony",
    price: 54990,
    oldPrice: 59990,
    rating: 4.9,
    reviews: 4280,
    stock: 12,
    discount: 8,
    image: "https://picsum.photos/400?random=88",
    images: [
        "https://picsum.photos/600?random=88",
        "https://picsum.photos/600?random=89",
        "https://picsum.photos/600?random=90"
    ],
    description: "Next-generation PlayStation 5 Slim console with ultra-fast SSD and 4K gaming.",
    featured: true,
    bestseller: true
}

];

// Make products available globally
window.products = products;