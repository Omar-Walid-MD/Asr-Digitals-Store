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
    if(!cart.length) return 0;
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
        "headphone": {
            "specs": {
                "connection": {values: ["Wire - USB","Wire - Jack","Wireless - Bluetooth"], w: 50},
                "microphone": {values: ["With Mic","No Mic"], w: 50},
                "noiseCancelling": {values: ["With Noise Cancelling","No Noise Cancelling"], w: 50}
            },
            "basePrice": 250
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
{ title: "Aurora Pro X", desc: "Experience unparalleled performance and stunning visuals with the Aurora Pro X, a powerful laptop designed for gaming and resource-intensive tasks.",
  image: "https://i.imgur.com/7VJqTE6.png" },
{ title: "ZedBook Prism 14", desc: "Immerse yourself in the world of productivity and creativity with the ZedBook Prism 14, a sleek and lightweight laptop featuring a vibrant display and exceptional battery life.",
  image: "https://i.imgur.com/QQa1HuO.png" },
{ title: "NovaBook Air 13", desc: "Stay connected and productive on the go with the NovaBook Air 13, an ultra-portable laptop that combines stylish design with reliable performance and long-lasting battery.",
  image: "https://i.imgur.com/fwcfIs5.png" },
{ title: "Titanium Elite 15", desc: "Unleash your potential with the Titanium Elite 15, a high-performance laptop that offers cutting-edge features, uncompromising power, and a premium build quality.",
  image: "https://i.imgur.com/VySBjnE.png" },
{ title: "Spectra X1 Pro", desc: "Experience the future of computing with the Spectra X1 Pro, a versatile laptop that combines exceptional performance, stunning visuals, and advanced security features.",
  image: "https://i.imgur.com/XBoGZef.png" },
{ title: "Lumos Flex 14", desc: "Adapt to any task with the Lumos Flex 14, a flexible and lightweight laptop that effortlessly transforms between laptop and tablet modes for optimal versatility.",
  image: "https://i.imgur.com/gRdZGPD.png" },
{ title: "IdeaBook Pro 15", desc: "Unlock your productivity with the IdeaBook Pro 15, a professional-grade laptop that offers a spacious display, powerful performance, and a sleek, premium design.",
  image: "https://i.imgur.com/7i2O3KV.png" },
{ title: "Echo Plus 17", desc: "Harness the power of innovation with the Echo Plus 17, a high-end laptop that delivers exceptional performance, stunning visuals, and advanced cooling technology.",
  image: "https://i.imgur.com/V0rFtrZ.png" },
{ title: "ZedPro Plus 13", desc: "Elevate your professional workflow with the ZedPro Plus 13, a compact and powerful laptop designed for demanding workloads and enhanced productivity.",
  image: "https://i.imgur.com/Ca6sDMH.png" },
{ title: "NovaBook Pro 16", desc: "Immerse yourself in a world of creativity and productivity with the NovaBook Pro 16, a high-performance laptop that combines a stunning display, powerful internals, and ample storage.",
  image: "https://i.imgur.com/mJ6Gumg.png" },
{ title: "TitanBook X2", desc: "Conquer your tasks with the TitanBook X2, a rugged and durable laptop built to withstand challenging environments, featuring powerful performance and enhanced security features.",
  image: "https://i.imgur.com/MyyEynt.png" },
{ title: "Spectra Slim 13", desc: "Experience elegance and performance with the Spectra Slim 13, an ultra-slim and lightweight laptop that packs a punch with its powerful internals and stunning visuals.",
  image: "https://i.imgur.com/4PQvytR.png" },
{ title: "Luminary Pro X", desc: "Illuminate your productivity with the Luminary Pro X, a feature-rich laptop that offers exceptional performance, a stunning display, and advanced connectivity options.",
  image: "https://i.imgur.com/gNnnk20.png" },
{ title: "IdeaBook Air 14", desc: "Stay productive on the move with the IdeaBook Air 14, an ultra-thin and lightweight laptop that combines portability with reliable performance and long battery life.",
  image: "https://i.imgur.com/5y7Vp4i.png" },
{ title: "Echo Flex 15", desc: "Flexibility meets power with the Echo Flex 15, a versatile laptop that adapts to your needs, offering seamless transitions between laptop, tent, and tablet modes.",
  image: "https://i.imgur.com/T5jxPEA.png" },
{ title: "ZedPro Plus 14", desc: "Unleash your professional potential with the ZedPro Plus 14, a compact and powerful laptop designed for intensive workloads, featuring a stunning display and long battery life.",
  image: "https://i.imgur.com/i8YWQGF.png" },
{ title: "NovaBook Slim 15", desc: "Experience sleekness and performance with the NovaBook Slim 15, an ultra-slim laptop that combines style, power, and portability, perfect for modern professionals.",
  image: "https://i.imgur.com/y5oSLsT.png" },
{ title: "TitaniumBook Pro 17", desc: "Embrace the power of titanium with the TitaniumBook Pro 17, a premium laptop that delivers uncompromising performance, stunning visuals, and exceptional durability.",
  image: "https://i.imgur.com/fWie0Pz.png" },
{ title: "SpectraBook X1", desc: "Immerse yourself in the world of content creation and multimedia with the SpectraBook X1, a high-performance laptop that offers a stunning display and powerful graphics capabilities.",
  image: "https://i.imgur.com/00TlTfd.png" },
{ title: "Lumos Pro 16", desc: "Illuminate your productivity with the Lumos Pro 16, a powerful laptop that combines high-performance internals, a vibrant display, and a sleek design for enhanced productivity.",
  image: "https://i.imgur.com/qAW3x6A.png" }
];

const tabletModels = [
    {
      title: "TabX Pro",
      desc: "The TabX Pro is a premium tablet with a high-resolution display, powerful processor, and advanced camera capabilities.",
      image: "https://i.imgur.com/kRS82KU.png"
    },
    {
      title: "SlateBook Ultra",
      desc: "The SlateBook Ultra is a sleek and lightweight tablet that offers exceptional performance and long battery life.",
      image: "https://i.imgur.com/XLzINGb.png"
    },
    {
      title: "FusionTab Max",
      desc: "The FusionTab Max is a feature-rich tablet with a large screen, expandable storage, and a robust multimedia experience.",
      image: "https://i.imgur.com/ctLphF7.png"
    },
    {
      title: "PixelTab Pro",
      desc: "The PixelTab Pro is a versatile tablet that combines productivity and entertainment features, making it perfect for work and play.",
      image: "https://i.imgur.com/D25ELWv.png"
    },
    {
      title: "AquaPad Elite",
      desc: "The AquaPad Elite is a water-resistant tablet designed for outdoor adventures, featuring a rugged build and enhanced durability.",
      image: "https://i.imgur.com/bmYOkHi.png"
    },
    {
      title: "ZedTab Air",
      desc: "The ZedTab Air is an ultra-thin tablet that offers a seamless user experience, powerful performance, and stunning visuals.",
      image: "https://i.imgur.com/6VlQFJr.png"
    },
    {
      title: "SwiftPad X1",
      desc: "The SwiftPad X1 is a budget-friendly tablet designed for everyday use, providing reliable performance and a range of essential features.",
      image: "https://i.imgur.com/qtUAJS2.png"
    },
    {
      title: "AuraTab Pro",
      desc: "The AuraTab Pro is a premium tablet that boasts a vibrant display, immersive audio, and advanced security features.",
      image: "https://i.imgur.com/pnT8QEb.png"
    },
    {
      title: "NimbusTab Lite",
      desc: "The NimbusTab Lite is a compact and lightweight tablet that offers portability without compromising on performance and functionality.",
      image: "https://i.imgur.com/Ulx6xWI.png"
    },
    {
      title: "EvoTab Plus",
      desc: "The EvoTab Plus is a versatile tablet that adapts to your needs, with a detachable keyboard and seamless compatibility with productivity tools.",
      image: "https://i.imgur.com/YHWNbww.png"
    },
    {
      title: "NovaTab Flex",
      desc: "The NovaTab Flex is a flexible tablet that can be easily transformed into a laptop or a stand, providing versatility for any task.",
      image: "https://i.imgur.com/fkPuMVT.png"
    },
    {
      title: "VivoTab Max",
      desc: "The VivoTab Max is a multimedia-focused tablet with a stunning display, immersive audio, and optimized performance for entertainment.",
      image: "https://i.imgur.com/O3S0Wch.png"
    },
    {
      title: "LunaTab Lite",
      desc: "The LunaTab Lite is an affordable tablet that offers a user-friendly experience, long battery life, and access to a variety of apps and content.",
      image: "https://i.imgur.com/dc1uGYG.png"
    },
    {
      title: "TitaniumPad Pro",
      desc: "The TitaniumPad Pro is a rugged tablet built to withstand challenging environments, featuring enhanced durability and robust security measures.",
      image: "https://i.imgur.com/2OxJiFl.png"
    },
    {
      title: "PulseTab Elite",
      desc: "The PulseTab Elite is a high-performance tablet that delivers smooth multitasking, stunning visuals, and an immersive gaming experience.",
      image: "https://i.imgur.com/gpwsYhM.png"
    },
    {
      title: "AeroTab Ultra",
      desc: "The AeroTab Ultra is a premium tablet designed for professionals, offering powerful performance, advanced stylus support, and creative capabilities.",
      image: "https://i.imgur.com/apsI8TG.png"
    },
    {
      title: "BlazePad X2",
      desc: "The BlazePad X2 is a gaming-focused tablet that delivers exceptional graphics, responsive controls, and an immersive gaming ecosystem.",
      image: "https://i.imgur.com/3NTWPEG.png"
    },
    {
      title: "SparkTab Flex",
      desc: "The SparkTab Flex is a versatile tablet with a flexible design, allowing you to bend and adjust it for optimal viewing angles and comfort.",
      image: "https://i.imgur.com/dLDOE0C.png"
    },
    {
      title: "XenonTab Pro",
      desc: "The XenonTab Pro is a high-end tablet that combines cutting-edge technology, premium materials, and a sleek design for a luxurious experience.",
      image: "https://i.imgur.com/c9eZq62.png"
    },
    {
      title: "NovaPad Lite",
      desc: "The NovaPad Lite is an entry-level tablet that offers essential features, reliable performance, and a user-friendly interface at an affordable price.",
      image: "https://i.imgur.com/0l0E7Ms.png"
    }
  ];


const headphoneModels = [
  {
    title: "SonicBlast Pro",
    desc: "The SonicBlast Pro headphones deliver an immersive audio experience with powerful bass and crystal-clear sound quality.",
    image:"https://i.imgur.com/z1RDxCb.png"
  },
  {
    title: "AudioWave Elite",
    desc: "The AudioWave Elite headphones offer studio-grade audio reproduction, featuring high-fidelity sound, comfortable fit, and noise isolation technology for an exceptional listening experience.",
    image:"https://i.imgur.com/Uqph6Ew.png"
  },
  {
    title: "BassPulse Max",
    desc: "The BassPulse Max headphones are designed for bass lovers, delivering deep, punchy bass response without compromising on overall sound clarity and comfort.",
    image:"https://i.imgur.com/0etAuq3.png"
  },
  {
    title: "HarmonySound Pro",
    desc: "The HarmonySound Pro headphones provide a balanced audio profile with crisp highs, rich mids, and smooth lows.",
    image:"https://i.imgur.com/QwLKuV4.png"
  },
  {
    title: "VelvetPhones Ultra",
    desc: "The VelvetPhones Ultra headphones combine style and performance, offering a dynamic sound signature, sleek design, and comfortable fit for an immersive listening experience on the go.",
    image:"https://i.imgur.com/9uj8RNs.png"
  },
  {
    title: "NoiseGuard X1",
    desc: "The NoiseGuard X1 headphones feature active noise cancellation technology, allowing you to focus on your audio without distractions, whether you're traveling or in a noisy environment.",
    image:"https://i.imgur.com/QzQW3C5.png"
  },
  {
    title: "EchoTech Pro",
    desc: "The EchoTech Pro headphones provide exceptional audio clarity and detail, thanks to their premium drivers and advanced acoustic engineering.",
    image:"https://i.imgur.com/WW68sp3.png"
  },
  {
    title: "SoundScape Lite",
    desc: "The SoundScape Lite headphones offer a lightweight and comfortable design, along with a well-balanced sound profile, making them perfect for long listening sessions and daily use.",
    image:"https://i.imgur.com/X4ER8nE.png"
  },
  {
    title: "RingFlow Plus",
    desc: "The RingFlow Plus headphones deliver a dynamic and energetic sound experience, with enhanced bass response and precise audio reproduction.",
    image:"https://i.imgur.com/dNMY8h5.png"
  },
  {
    title: "PureWave Flex",
    desc: "The PureWave Flex headphones provide a versatile listening experience, featuring a customizable EQ, wireless connectivity, and a foldable design for convenient portability.",
    image:"https://i.imgur.com/qHDw4Wp.png"
  },
  {
    title: "MemoPhone Max",
    desc: "The MemoPhone Max headphones offer high-resolution audio and wide soundstage, providing exceptional clarity and immersive detail.",
    image:"https://i.imgur.com/1FQlPAB.png"
  },
  {
    title: "SoftSound Lite",
    desc: "The SoftSound Lite headphones provide a balanced and natural sound signature, along with a lightweight and ergonomic design, ensuring comfort for extended listening sessions.",
    image:"https://i.imgur.com/tW4pmA1.png"
  },
  {
    title: "VocalPulse Pro",
    desc: "The VocalPulse Pro headphones deliver powerful and punchy bass, crisp highs, and clear vocals.",
    image:"https://i.imgur.com/XHRpa4a.png"
  },
  {
    title: "HeadTone Elite",
    desc: "The HeadTone Elite headphones offer a harmoniously balanced sound, with precise instrument separation and accurate soundstage, delivering an authentic listening experience.",
    image:"https://i.imgur.com/Hgffgmk.png"
  },
  {
    title: "SonicBoost Max",
    desc: "The SonicBoost Max headphones are engineered to provide an enhanced sound quality.",
    image:"https://i.imgur.com/ZHQtroo.png"
  },
  {
    title: "SonicScape Flex",
    desc: "The SonicScape Flex headphones offer a versatile listening experience, with customizable sound settings, wireless connectivity, and a flexible design for optimal comfort and convenience.",
    image:"https://i.imgur.com/vNwhweg.png"
  },
  {
    title: "AudioBlend Ultra",
    desc: "The AudioBlend Ultra headphones combine style and performance, delivering a well-balanced sound signature, comfortable fit, and premium build quality for discerning audio enthusiasts.",
    image:"https://i.imgur.com/HaAZWyK.png"
  },
  {
    title: "VocalTone Pro",
    desc: "The VocalTone Pro headphones are designed specifically for vocal enthusiasts and podcasters, providing exceptional vocal clarity and accurate sound reproduction.",
    image:"https://i.imgur.com/rqxdsC6.png"
  },
  {
    title: "PulseFlow Lite",
    desc: "The PulseFlow Lite headphones offer a balanced sound profile with lightweight design, making them ideal for active lifestyles.",
    image:"https://i.imgur.com/dGwIgTv.png"
  },
  {
    title: "AccentEcho Elite",
    desc: "The AccentEcho Elite headphones offer a premium listening experience with a focus on natural and accurate sound reproduction.",
    image:"https://i.imgur.com/M5KVXIs.png"
  }
];

const mouseProducts = [
  {
    title: "Velocity X1",
    desc: "A high-performance gaming mouse designed for professional gamers.",
    image: "https://i.imgur.com/yP7TzJ2.png"
  },
  {
    title: "ErgoTech MX",
    desc: "An ergonomic wireless mouse with a sleek design for everyday use.",
    image: "https://i.imgur.com/F8QyRjo.png"
  },
  {
    title: "TurboGrip 200",
    desc: "A budget-friendly mouse with adjustable DPI and programmable buttons.",
    image: "https://i.imgur.com/8fnSaOh.png"
  },
  {
    title: "TravelMaster Nano",
    desc: "A compact and portable mouse perfect for travelers and on-the-go use.",
    image: "https://i.imgur.com/iM2Onm7.png"
  },
  {
    title: "Spectrum Pro",
    desc: "A customizable RGB mouse with advanced optical sensors for precise tracking.",
    image: "https://i.imgur.com/OhjMuZE.png"
  },
  {
    title: "SwiftSense 500",
    desc: "A lightweight mouse with swift and accurate cursor movement.",
    image: "https://i.imgur.com/6rEgWEX.png"
  },
  {
    title: "GlideMax Prime",
    desc: "An ultra-smooth mouse designed for seamless gliding on any surface.",
    image: "https://i.imgur.com/gxD4Fhr.png"
  },
  {
    title: "StealthFusion X",
    desc: "A silent gaming mouse with responsive buttons and adjustable weight.",
    image: "https://i.imgur.com/61lXWTa.png"
  },
  {
    title: "XceleroPulse 9000",
    desc: "A high-speed wireless mouse for fast-paced gaming and productivity.",
    image: "https://i.imgur.com/1l7pKU8.png"
  },
  {
    title: "EcoSaver 200",
    desc: "An energy-efficient mouse with long battery life and eco-friendly materials.",
    image: "https://i.imgur.com/E0BjhQj.png"
  },
  {
    title: "PrecisionMaster 360",
    desc: "A precise and accurate mouse with 360-degree scrolling and gesture support.",
    image: "https://i.imgur.com/WMOtaGk.png"
  },
  {
    title: "ProGrip Elite",
    desc: "An ergonomic mouse with a textured grip for enhanced comfort and control.",
    image: "https://i.imgur.com/en8scGr.png"
  },
  {
    title: "NovaSense X",
    desc: "A futuristic mouse with advanced sensors for enhanced precision and speed.",
    image: "https://i.imgur.com/PCGRhWd.png"
  },
  {
    title: "BlazeFire Ultra",
    desc: "A gaming mouse with customizable lighting effects and programmable macros.",
    image: "https://i.imgur.com/x1XJoAm.png"
  },
  {
    title: "SwiftSwipe Pro",
    desc: "A high-speed mouse with smooth scrolling and customizable sensitivity.",
    image: "https://i.imgur.com/EYv1TMP.png"
  },
  {
    title: "ErgoFlow 800",
    desc: "An ergonomic mouse with a natural hand position and adjustable palm rest.",
    image: "https://i.imgur.com/xY7yDtl.png"
  },
  {
    title: "TurboGrip 5000",
    desc: "A versatile mouse with a comfortable grip and adjustable weight.",
    image: "https://i.imgur.com/7hpilMF.png"
  },
  {
    title: "HyperPulse Pro",
    desc: "A gaming mouse with ultra-responsive buttons and customizable RGB lighting.",
    image: "https://i.imgur.com/x9icS9N.png"
  },
  {
    title: "PrecisionTrack 1000",
    desc: "A precise and reliable mouse with smooth tracking on any surface.",
    image: "https://i.imgur.com/vDuIraS.png"
  },
  {
    title: "EcoMax Plus",
    desc: "An eco-friendly wireless mouse with long battery life and energy-saving features.",
    image: "https://i.imgur.com/2TuDNLY.png"
  }
];

const keyboardModels = [
  {
    title: "MechanoStrike Pro",
    desc: "The MechanoStrike Pro keyboard is built for precision and durability, featuring mechanical key switches, customizable RGB lighting, and programmable macros for an immersive gaming experience.",
    image: "https://i.imgur.com/8Pzilj2.png"
  },
  {
    title: "RapidFire Elite",
    desc: "The RapidFire Elite keyboard offers lightning-fast responsiveness with its high-performance mechanical switches, anti-ghosting technology, and customizable backlighting to enhance your typing and gaming sessions.",
    image: "https://i.imgur.com/owFoO9q.png"
  },
  {
    title: "SilentWhisper Max",
    desc: "The SilentWhisper Max keyboard provides a whisper-quiet typing experience with its silent mechanical switches, while still offering precise tactile feedback and customizable lighting effects.",
    image: "https://i.imgur.com/bJCHt0K.png"
  },
  {
    title: "TactileTouch Pro",
    desc: "The TactileTouch Pro keyboard combines the best of both worlds, offering a tactile typing experience with its mechanical switches along with quiet operation to ensure a comfortable and satisfying keystroke.",
    image: "https://i.imgur.com/qOp6kW0.png"
  },
  {
    title: "ErgoFlow Ultra",
    desc: "The ErgoFlow Ultra keyboard features an ergonomic design that promotes a natural hand and wrist position, reducing strain and fatigue during long typing sessions, making it ideal for professionals and writers.",
    image: "https://i.imgur.com/wgiMf7X.png"
  },
  {
    title: "RainbowGlow Lite",
    desc: "The RainbowGlow Lite keyboard adds a vibrant touch to your setup with its rainbow backlighting, while offering a comfortable typing experience and essential features for everyday use.",
    image: "https://i.imgur.com/0caZjmz.png"
  },
  {
    title: "WirelessFreedom Plus",
    desc: "The WirelessFreedom Plus keyboard gives you the freedom to work and play without cable clutter, providing a reliable wireless connection, comfortable typing, and multimedia shortcuts for convenience.",
    image: "https://i.imgur.com/XqZLQYg.png"
  },
  {
    title: "CompactFlex Pro",
    desc: "The CompactFlex Pro keyboard offers a compact design without compromising functionality, featuring customizable key programming, detachable cable, and a durable build for on-the-go productivity.",
    image: "https://i.imgur.com/G1OpdZh.png"
  },
  {
    title: "GamerZone X1",
    desc: "The GamerZone X1 keyboard is designed with gamers in mind, providing responsive mechanical switches, anti-ghosting technology, customizable RGB lighting, and dedicated macro keys for optimal gaming performance.",
    image: "https://i.imgur.com/NTkjwRe.png"
  },
  {
    title: "ProType Max",
    desc: "The ProType Max keyboard is a professional-grade typing companion, featuring a comfortable layout, whisper-quiet scissor switches, and multimedia keys for enhanced productivity and efficiency.",
    image: "https://i.imgur.com/kEFsYQN.png"
  },
  {
    title: "TechMaster Elite",
    desc: "The TechMaster Elite keyboard is engineered for tech enthusiasts and programmers, offering programmable keys, customizable macros, and a sleek design to streamline your workflow and elevate your typing experience.",
    image: "https://i.imgur.com/wr7z1wn.png"
  },
  {
    title: "GlowType Lite",
    desc: "The GlowType Lite keyboard combines style and functionality with its vibrant backlighting, comfortable keycaps, and multimedia shortcuts, making it a great choice for both work and play.",
    image: "https://i.imgur.com/n8c1oKw.png"
  },
  {
    title: "MacroFlex Pro",
    desc: "The MacroFlex Pro keyboard empowers you with advanced macro programming capabilities, allowing you to automate complex tasks and streamline your workflow, while providing a comfortable typing experience.",
    image: "https://i.imgur.com/ggQLZza.png"
  },
  {
    title: "UltraSlim Touch",
    desc: "The UltraSlim Touch keyboard offers a slim and elegant design, featuring chiclet-style keys with a responsive touch, multimedia controls, and a compact layout for effortless typing on any surface.",
    image: "https://i.imgur.com/Maru0sp.png"
  },
  {
    title: "GamerTech X2",
    desc: "The GamerTech X2 keyboard is designed to deliver a competitive edge with its responsive mechanical switches, customizable RGB lighting effects, anti-ghosting technology, and dedicated gaming mode for enhanced gaming performance.",
    image: "https://i.imgur.com/kKLViow.png"
  },
  {
    title: "ArtisanCraft Max",
    desc: "The ArtisanCraft Max keyboard is a work of art, featuring a handcrafted wooden frame, premium keycaps, and a tactile typing experience, bringing a touch of elegance to your workspace.",
    image: "https://i.imgur.com/6Sbggef.png"
  },
  {
    title: "MultiDevice Flex",
    desc: "The MultiDevice Flex keyboard allows you to seamlessly switch between multiple devices with its wireless connectivity, providing a comfortable typing experience and versatile compatibility for increased productivity.",
    image: "https://i.imgur.com/g6HDUGm.png"
  },
  {
    title: "BacklitEdge Pro",
    desc: "The BacklitEdge Pro keyboard combines style and functionality with its customizable backlighting, comfortable key switches, and durable construction, offering a satisfying typing experience for both work and play.",
    image: "https://i.imgur.com/sAR99lI.png"
  },
  {
    title: "PlexType Lite",
    desc: "The PlexType Lite keyboard offers a reliable typing experience with its scissor switches, compact layout, and slim profile, making it a perfect companion for your laptop or desktop setup.",
    image: "https://i.imgur.com/MNkBxEo.png"
  },
  {
    title: "UltimateGrip Elite",
    desc: "The UltimateGrip Elite keyboard features anI'm sorry, but I couldn't generate the complete response. Can you please specify the request or provide more information?",
    image: "https://i.imgur.com/udQUMO8.png"
  }
]

generateProductList(20,"keyboard",keyboardModels);

