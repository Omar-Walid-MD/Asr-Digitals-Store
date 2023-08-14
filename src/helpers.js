export const makeId = function(length)
{
    // let s = "1234567890abcdefghijklmnopqrstuvwxyz";
    let s = "1234567890";
    let id = "";

    for (let i = 0; i < length; i++) {
        let char = s[parseInt(Math.random()*(s.length-1))];
        id += char;
    }

    return id;
}

export const getCartTotalCount = function(cart)
{
    let total = 0;
    cart.forEach(cartItem => {
        total += cartItem.count;
    });

    return total;
}

export const getCartSubTotal = function(cart,products)
{
    let total = 0;
    cart.forEach(cartItem => {
        let targetProduct = products.find((product) => product.id === cartItem.productId);
        if(!targetProduct) return;
        total += cartItem.count * targetProduct.price;
    });

    return total;
}

export const getCartDelivery = function(cart,products,productsInfo)
{
    let total = productsInfo.baseDeliveryValue;
    cart.forEach(cartItem => {
        let targetProduct = products.find((product) => product.id === cartItem.productId);
        if(!targetProduct) return;
        total += cartItem.count * +productsInfo.categories.find((category) => category.name === targetProduct.category).deliveryValue;
        console.log(productsInfo.categories.find((category) => category.name === targetProduct.category).deliveryValue); 
    });

    return total;
}

export const getTotalFees = function(cart,products,productsInfo)
{
    let subtotal = getCartSubTotal(cart,products);
    let delivery = getCartDelivery(cart,products,productsInfo);
    return {subtotal,delivery,total:subtotal+delivery};
}

export const getRating = function(ratings)
{
    let total = 0;
    ratings.forEach(rating => {
        total += parseInt(rating);
    });

    let avg = total/ratings.length;
    console.log(total, ratings.length);
    return avg.toFixed(1);
}

export const getRatingCount = function(reviews,rating)
{
    return reviews.filter((review) => review.rating === rating).length;
}

export const getCapitalized = function(string)
{
   return string.split(" ").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
}

export const makeUniqueId = function(list,length=5)
{
    let id = "";
    do {
        console.log("iteration");
        id = makeId(length)
    } while (list.map((object) => object.id).includes(id));
    
    return id;
}

export const generateProductList = function(length,category,titleList)
{
    const possibleValues = {
        "smartphone": {
            "specs": {
                "os": {values: ["Android 10","Android 11","Android 12","Android 13","Android 14"], w: 50},
                "ram": {values: ["1 GB","2 GB"," 4 GB", "6 GB","8 GB","16 GB"], w: 100},
                "storage": {values: ["16 GB","32 GB","64 GB","128 GB","256 GB"], w: 100},
                "processor": {values: ["1.2 GHz","1.8 GHz","2.2 GHz","3 GHz","4 GHz"], w: 100},
                "battery": {values: ["2000 mAh", "2500 mAh","3000 mAh","4000 mAh","5000 mAh"], w: 100},
                "size": {values: ['4"','5"','6"','6.5"'], w: 50},
                "cam": {values: ["3MP 5MP","8MP 12MP","10MP 20MP","20MP 30MP","20MP 40MP"], w: 100},
                "res": {values: ["640 x 1136","750 x 1334","1080 x 1920","1125 x 2436"], w: 100}
            },
            "basePrice": 800
        },
        "tablet": {
            "specs": {
                "os": {values: ["Android 10","Android 11","Android 12","Android 13","Android 14"], w: 50},
                "ram": {values: ["1 GB","2 GB","4 GB", "6 GB","8 GB","16 GB"], w: 100},
                "storage": {values: ["16 GB","32 GB","64 GB","128 GB","256 GB"], w: 100},
                "processor": {values: ["1.2 GHz","1.8 GHz","2.2 GHz","3 GHz","4 GHz"], w: 100},
                "battery": {values: ["2000 mAh", "2500 mAh","3000 mAh","4000 mAh","5000 mAh"], w: 100},
                "size": {values: ['7"','8"','9"','10"','12"'], w: 50},
                "cam": {values: ["3MP 5MP","8MP 12MP","10MP 20MP","20MP 30MP","20MP 40MP"], w: 100},
                "res": {values: ["768 x 1024","1536 x 2048","2048 x 2732"], w: 100}
            },
            "basePrice": 1200
        },
        "laptop": {
            "specs": {
                "os": {values: ["Windows 8","Windows 10","Windows 11","Linux"], w: 100},
                "ram": {values: ["4 GB", "6 GB","8 GB","16 GB", "32 GB"], w: 100},
                "storage": {values: ["128 GB","256 GB","512 GB","1 TB","2 TB"], w: 200},
                "processor": {values: ["i5 1.2 GHz","i5 1.8 GHz","i7 2.2 GHz","i7 3 GHz","i9 4 GHz"], w: 100},
                "gpu": {values: ["Intel HD Graphics 3000","Intel HD Graphics 5500","NVIDIA GeForce MX250","NVIDIA GeForce GT 1030","NVIDIA GeForce RTX 3080"], w: 100},
                "battery": {values: ["3000 mAh","4000 mAh","5000 mAh", "7500 mAh", "10000 mAh"], w: 100},
                "size": {values: ['10"','12"','15"','17"','18"'], w: 100},
                "res": {values: ["1366 x 768","1920 x 1080","2560 x 1440","2880 x 1800"], w: 100}
            },
            "basePrice": 1800
        },
        "desktop": {
            "specs": {
                "os": {values: ["Windows 8","Windows 10","Windows 11","Linux"], w: 100},
                "ram": {values: ["4 GB", "6 GB","8 GB","16 GB", "32 GB"], w: 100},
                "storage": {values: ["128 GB","256 GB","512 GB","1 TB","2 TB"], w: 200},
                "processor": {values: ["i5 1.2 GHz","i5 1.8 GHz","i7 2.2 GHz","i7 3 GHz","i9 4 GHz"], w: 100},
                "gpu": {values: ["Intel HD Graphics 3000","Intel HD Graphics 5500","NVIDIA GeForce MX250","NVIDIA GeForce GT 1030","NVIDIA GeForce RTX 3080"], w: 100},
                "size": {values: ['14"','17"','20"','25','30"'], w: 100}
            },
            "basePrice": 2500
        },
        "mouse": {
            "specs": {
                "connection": {values: ["Wire","Wireless - Bluetooth"], w: 100},
                "movement": {values: ["Laser","Optical"], w: 100}
            },
            "basePrice": 100
        },
        "keyboard": {
            "specs": {

                "connection": {values: ["Wire","Wireless - Bluetooth"], w: 100},
                "keyType": {values: ["Membrane","Mechanical - Linear","Mechanical - Tactile","Mechanical - Clicky"], w: 100},
                "keysNumber": {values: ["104","100","87","84","68"], w:100}
            },
            "basePrice": 150
        }

    }

    let keys = Object.keys(possibleValues);



    let productList = [];
    for (let i = 0; i < length; i++)
    {
        let product = {id:makeUniqueId(productList),title:"",desc:"",category:"",price:0,specs:{},rating:0,image:"", date: Date.now()};
        product.category = category || keys[Math.floor(Math.random()*keys.length)];
        product.price = possibleValues[product.category].basePrice;
        let catSpecs = possibleValues[product.category].specs;

        Object.keys(catSpecs).forEach((spec) => {
            let vIndex = Math.floor(Math.random()*catSpecs[spec].values.length);
            product.specs[spec] = catSpecs[spec].values[vIndex];
            product.price += catSpecs[spec].w * (vIndex+1);
        });

        if(titleList && i < titleList.length) product = {...product,...titleList[i]}

        productList.push(product);
    }

    console.log(productList);
}
const smartphoneModels = [
    { title: "Arcadia X1", desc: "A cutting-edge smartphone that seamlessly blends sleek design with powerful performance, offering an immersive display and advanced camera capabilities.",
      image: "https://i.imgur.com/Dj9tI7e.png" },
    { title: "Zoom Vortex 9", desc: "Experience the ultimate speed and fluidity with the Zoom Vortex 9, featuring a lightning-fast processor, stunning visuals, and a sleek, ergonomic design.",
      image: "https://i.imgur.com/fPgvL6b.png" },
    { title: "Nebula Blaze 7X", desc: "Ignite your mobile experience with the Nebula Blaze 7X, a dynamic smartphone that combines vibrant display technology with enhanced multimedia capabilities.",
      image: "https://i.imgur.com/04q9gFi.png" },
    { title: "Chromo Prime 12T", desc: "Stay ahead of the curve with the Chromo Prime 12T, a premium smartphone that boasts exceptional battery life, state-of-the-art security, and an intuitive user interface.",
      image: "https://i.imgur.com/8jVOc12.png" },
    { title: "Radiant Ember 8E", desc: "The Radiant Ember 8E shines with its striking design and brilliant display, delivering an immersive visual experience and capturing stunning photos in any lighting condition.",
      image: "https://i.imgur.com/Nfhitnz.png" },
    { title: "Luminary Solara 11 Plus", desc: "Be the star of innovation with the Luminary Solara 11 Plus, a feature-rich smartphone that offers unparalleled performance, a large vibrant screen, and advanced AI-powered functionalities.",
      image: "https://i.imgur.com/pE6OS0S.png" },
    { title: "Nova Flux 6X", desc: "Unleash your creativity with the Nova Flux 6X, equipped with a versatile camera system and powerful processing capabilities, ideal for capturing and sharing your memorable moments.",
      image: "https://i.imgur.com/txnr4EC.png" },
    { title: "Photon Surge 10T", desc: "Rise above the ordinary with the Photon Surge 10T, a smartphone designed for extraordinary performance, featuring blazing-fast charging, a sleek design, and exceptional durability.",
      image: "https://i.imgur.com/xBOzjAi.png" },
    { title: "Quantum Spark Evo", desc: "The Quantum Spark Evo is a revolutionary smartphone that pushes the boundaries of technology, offering a quantum leap in processing power, AI integration, and immersive visuals.",
      image: "https://i.imgur.com/bnLKlvt.png" },
    { title: "Azure Nexus 3S", desc: "Step into a realm of seamless connectivity and innovation with the Azure Nexus 3S, a smartphone that combines futuristic design with advanced networking capabilities.",
      image: "https://i.imgur.com/QcDPuDO.png" },
    { title: "Horizon Elite 9L", desc: "Expand your horizons with the Horizon Elite 9L, a smartphone that delivers a captivating edge-to-edge display, exceptional audio quality, and a sleek ergonomic design.",
      image: "https://i.imgur.com/D7xHdOC.png" },
    { title: "Zoom Pulse 7R", desc: "Experience the pulse of innovation with the Zoom Pulse 7R, a smartphone that combines breathtaking performance, an immersive display, and an array of cutting-edge features.",
      image: "https://i.imgur.com/y2Lzw4Q.png" },
    { title: "Stellaris Ray 4G", desc: "Illuminate your world with the Stellaris Ray 4G, a smartphone that combines stunning aesthetics with reliable performance, offering an exceptional camera experience and robust connectivity.",
      image: "https://i.imgur.com/wkB2mPJ.png" },
    { title: "Lithion Aura 2E", desc: "Immerse yourself in the radiant aura of the Lithion Aura 2E, a smartphone that captivates with its elegant design, vibrant display, and an array of intelligent features.",
      image: "https://i.imgur.com/MPkdPbf.png" },
    { title: "Vertex NovaX 8T", desc: "Reach new heights of innovation with the Vertex NovaX 8T, a smartphone that combines powerful performance, sleek aesthetics, and advanced features to elevate your mobile experience.",
      image: "https://i.imgur.com/ybp4hNA.png" },
    { title: "Lumos Prism 5G", desc: "Illuminate your every moment with the Lumos Prism 5G, a smartphone that showcases a stunning display, ultra-fast 5G connectivity, and advanced imaging capabilities.",
      image: "https://i.imgur.com/2HPiL5K.png" },
    { title: "Electro Echo 9X", desc: "Unleash your energy and style with the Electro Echo 9X, a smartphone that harmonizes cutting-edge features with a striking design, delivering an electrifying user experience.",
      image: "https://i.imgur.com/OwBH7Kk.png" },
    { title: "Zoom Proxima Max", desc: "The Zoom Proxima Max offers maximum performance and versatility, featuring a powerful processor, immersive display, and a comprehensive suite of productivity tools.",
      image: "https://i.imgur.com/jx0KkZZ.png" },
    { title: "Xenon Thunder 5S", desc: "Unleash your thunderous potential with the Xenon Thunder 5S, a smartphone that combines robust performance, rugged durability, and advanced features, suitable for any adventure.",
      image: "https://i.imgur.com/22yBBQX.png" },
    { title: "Electro Air 7E", desc: "Explore the heights of innovation with the Electro Echo 7E, a smartphone that delivers exceptional audio quality, seamless multitasking, and an elegant design.",
      image: "https://i.imgur.com/04q9gFi.png" }
  ];

const laptopModels = [
{ title: "Aurora Pro X", desc: "Experience unparalleled performance and stunning visuals with the Aurora Pro X, a powerful laptop designed for gaming and resource-intensive tasks." },
{ title: "ZedBook Prism 14", desc: "Immerse yourself in the world of productivity and creativity with the ZedBook Prism 14, a sleek and lightweight laptop featuring a vibrant display and exceptional battery life." },
{ title: "NovaBook Air 13", desc: "Stay connected and productive on the go with the NovaBook Air 13, an ultra-portable laptop that combines stylish design with reliable performance and long-lasting battery." },
{ title: "Titanium Elite 15", desc: "Unleash your potential with the Titanium Elite 15, a high-performance laptop that offers cutting-edge features, uncompromising power, and a premium build quality." },
{ title: "Spectra X1 Pro", desc: "Experience the future of computing with the Spectra X1 Pro, a versatile laptop that combines exceptional performance, stunning visuals, and advanced security features." },
{ title: "Lumos Flex 14", desc: "Adapt to any task with the Lumos Flex 14, a flexible and lightweight laptop that effortlessly transforms between laptop and tablet modes for optimal versatility." },
{ title: "IdeaBook Pro 15", desc: "Unlock your productivity with the IdeaBook Pro 15, a professional-grade laptop that offers a spacious display, powerful performance, and a sleek, premium design." },
{ title: "Echo Plus 17", desc: "Harness the power of innovation with the Echo Plus 17, a high-end laptop that delivers exceptional performance, stunning visuals, and advanced cooling technology." },
{ title: "ZedPro Plus 13", desc: "Elevate your professional workflow with the ZedPro Plus 13, a compact and powerful laptop designed for demanding workloads and enhanced productivity." },
{ title: "NovaBook Pro 16", desc: "Immerse yourself in a world of creativity and productivity with the NovaBook Pro 16, a high-performance laptop that combines a stunning display, powerful internals, and ample storage." },
{ title: "TitanBook X2", desc: "Conquer your tasks with the TitanBook X2, a rugged and durable laptop built to withstand challenging environments, featuring powerful performance and enhanced security features." },
{ title: "Spectra Slim 13", desc: "Experience elegance and performance with the Spectra Slim 13, an ultra-slim and lightweight laptop that packs a punch with its powerful internals and stunning visuals." },
{ title: "Luminary Pro X", desc: "Illuminate your productivity with the Luminary Pro X, a feature-rich laptop that offers exceptional performance, a stunning display, and advanced connectivity options." },
{ title: "IdeaBook Air 14", desc: "Stay productive on the move with the IdeaBook Air 14, an ultra-thin and lightweight laptop that combines portability with reliable performance and long battery life." },
{ title: "Echo Flex 15", desc: "Flexibility meets power with the Echo Flex 15, a versatile laptop that adapts to your needs, offering seamless transitions between laptop, tent, and tablet modes." },
{ title: "ZedPro Plus 14", desc: "Unleash your professional potential with the ZedPro Plus 14, a compact and powerful laptop designed for intensive workloads, featuring a stunning display and long battery life." },
{ title: "NovaBook Slim 15", desc: "Experience sleekness and performance with the NovaBook Slim 15, an ultra-slim laptop that combines style, power, and portability, perfect for modern professionals." },
{ title: "TitaniumBook Pro 17", desc: "Embrace the power of titanium with the TitaniumBook Pro 17, a premium laptop that delivers uncompromising performance, stunning visuals, and exceptional durability." },
{ title: "SpectraBook X1", desc: "Immerse yourself in the world of content creation and multimedia with the SpectraBook X1, a high-performance laptop that offers a stunning display and powerful graphics capabilities." },
{ title: "Lumos Pro 16", desc: "Illuminate your productivity with the Lumos Pro 16, a powerful laptop that combines high-performance internals, a vibrant display, and a sleek design for enhanced productivity." }
];

const tabletModels = [
    {
      title: "TabX Pro",
      desc: "The TabX Pro is a premium tablet with a high-resolution display, powerful processor, and advanced camera capabilities.",
      image: ""
    },
    {
      title: "SlateBook Ultra",
      desc: "The SlateBook Ultra is a sleek and lightweight tablet that offers exceptional performance and long battery life.",
      image: ""
    },
    {
      title: "FusionTab Max",
      desc: "The FusionTab Max is a feature-rich tablet with a large screen, expandable storage, and a robust multimedia experience.",
      image: ""
    },
    {
      title: "PixelTab Pro",
      desc: "The PixelTab Pro is a versatile tablet that combines productivity and entertainment features, making it perfect for work and play.",
      image: ""
    },
    {
      title: "AquaPad Elite",
      desc: "The AquaPad Elite is a water-resistant tablet designed for outdoor adventures, featuring a rugged build and enhanced durability.",
      image: ""
    },
    {
      title: "ZenTab Air",
      desc: "The ZenTab Air is an ultra-thin tablet that offers a seamless user experience, powerful performance, and stunning visuals.",
      image: ""
    },
    {
      title: "SwiftPad X1",
      desc: "The SwiftPad X1 is a budget-friendly tablet designed for everyday use, providing reliable performance and a range of essential features.",
      image: ""
    },
    {
      title: "AuraTab Pro",
      desc: "The AuraTab Pro is a premium tablet that boasts a vibrant display, immersive audio, and advanced security features.",
      image: ""
    },
    {
      title: "NimbusTab Lite",
      desc: "The NimbusTab Lite is a compact and lightweight tablet that offers portability without compromising on performance and functionality.",
      image: ""
    },
    {
      title: "EvoTab Plus",
      desc: "The EvoTab Plus is a versatile tablet that adapts to your needs, with a detachable keyboard and seamless compatibility with productivity tools.",
      image: ""
    },
    {
      title: "NovaTab Flex",
      desc: "The NovaTab Flex is a flexible tablet that can be easily transformed into a laptop or a stand, providing versatility for any task.",
      image: ""
    },
    {
      title: "VivoTab Max",
      desc: "The VivoTab Max is a multimedia-focused tablet with a stunning display, immersive audio, and optimized performance for entertainment.",
      image: ""
    },
    {
      title: "LunaTab Lite",
      desc: "The LunaTab Lite is an affordable tablet that offers a user-friendly experience, long battery life, and access to a variety of apps and content.",
      image: ""
    },
    {
      title: "TitanPad Pro",
      desc: "The TitanPad Pro is a rugged tablet built to withstand challenging environments, featuring enhanced durability and robust security measures.",
      image: ""
    },
    {
      title: "PulseTab Elite",
      desc: "The PulseTab Elite is a high-performance tablet that delivers smooth multitasking, stunning visuals, and an immersive gaming experience.",
      image: ""
    },
    {
      title: "AeroTab Ultra",
      desc: "The AeroTab Ultra is a premium tablet designed for professionals, offering powerful performance, advanced stylus support, and creative capabilities.",
      image: ""
    },
    {
      title: "BlazePad X2",
      desc: "The BlazePad X2 is a gaming-focused tablet that delivers exceptional graphics, responsive controls, and an immersive gaming ecosystem.",
      image: ""
    },
    {
      title: "SparkTab Flex",
      desc: "The SparkTab Flex is a versatile tablet with a flexible design, allowing you to bend and adjust it for optimal viewing angles and comfort.",
      image: ""
    },
    {
      title: "XenonTab Pro",
      desc: "The XenonTab Pro is a high-end tablet that combines cutting-edge technology, premium materials, and a sleek design for a luxurious experience.",
      image: ""
    },
    {
      title: "NovaPad Lite",
      desc: "The NovaPad Lite is an entry-level tablet that offers essential features, reliable performance, and a user-friendly interface at an affordable price.",
      image: ""
    }
  ];
// generateProductList(20,"laptop",laptopModels);
