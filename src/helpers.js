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

export const throttle = function(func,delay)
{
  let last = 0;
  return(...args) => {
    let now = Date.now();

    if(now-last > delay)
    {
      last = now;
      return func(...args)
    }
  }
}

export const refreshPurchases = function(purchases,setStatusFunc)
{
  let now = Date.now();
  console.log("running purchase checks...")
  purchases.forEach((purchase) => {
    // console.log(purchase.date + purchase.estimatedDeliveryHours * 1000 * 3600 > now);
    if(purchase.date + purchase.estimatedDeliveryHours * 1000 * 3600 <= now && purchase.status==="pending")
    {
      console.log("updating...");
      setStatusFunc(purchase,"success");
    }
  })
}

export const refreshOffers = function(offers,setStatusFunc)
{
  let now = Date.now();
  console.log("running offer checks...")
  offers.forEach((offer) => {
    // console.log(offer.date + offer.estimatedDeliveryHours * 1000 * 3600 > now);
    if(offer.start <= now && offer.status==="upcoming")
    {
      console.log("updating...");
      setStatusFunc(offer,"running");
    }
    if(offer.end <= now && offer.status==="running")
    {
      setStatusFunc(offer,"closed");
    }
  })
}

export const getCartTotalCount = function(cart)
{
    let total = 0;
    cart.forEach(cartItem => {
        total += cartItem.count;
    });

    return total;
}

export const getCartSubTotal = function(cart,products,offers)
{
    let total = 0;
    cart.forEach(cartItem => {
        let targetProduct = products.find((product) => product.id === cartItem.productId);
        if(!targetProduct) return;
        let availableOffer = offers.find((offer) => offer.productId===targetProduct.id);
        // console.log(availableOffer);
        total += cartItem.count * (availableOffer ? availableOffer.newPrice : targetProduct.price);
    });

    return total;
}

export const getCartDelivery = function(cart,products,productsInfo)
{
    if(!cart.length || !productsInfo.baseDeliveryValue) return 0;
    let total = productsInfo.baseDeliveryValue;
    cart.forEach(cartItem => {
        let targetProduct = products.find((product) => product.id === cartItem.productId);
        if(!targetProduct) return;
        total += cartItem.count * +productsInfo.categories.find((category) => category.name === targetProduct.category).deliveryValue;
        console.log(productsInfo.categories.find((category) => category.name === targetProduct.category).deliveryValue); 
    });

    return total;
}

export const getTotalFees = function(cart,products,productsInfo,offers)
{
    let subtotal = getCartSubTotal(cart,products,offers);
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

export const getDateString = function(dateObject)
{
  console.log(dateObject);
  let dateList = dateObject.toLocaleDateString().split("/").map((n) => n.length<2 ? `0${n}` : n);
  return [dateList[2],dateList[0],dateList[1]].join("-");
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
        "earphone": {
          "specs": {
              "connection": {values: ["Wire - USB","Wire - Jack","Wireless - Bluetooth"], w: 50},
              "microphone": {values: ["With Mic","No Mic"], w: 50},
              "noiseCancelling": {values: ["With Noise Cancelling","No Noise Cancelling"], w: 50}
          },
          "basePrice": 150
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
        },
        "speaker": {
          "specs": {
            "connection": {values: ["Wire - Jack","Wire - USB","Wireless - Bluetooth"],w:100},
            "control": {values:["Touch","Buttons"],w:100},
            "size": {values:['6"','10"','15"'],w:100}
          },
          "basePrice": 350
        },
        "monitor": {
          "specs": {
            "res": {values: ["1366 x 768","1920 x 1080","2560 x 1440","2880 x 1800"], w: 100},
            "size": {values: ['12"','15"','20"','25"'],w:100},
            "refreshRate": {values: ["60 Hz","120 Hz","240 Hz"],w:100}
          },
          basePrice: 600
        },
        "microphone": {
          "specs": {
            "connection": {values: ["Wire - Jack","Wire - USB","Wireless - Bluetooth"],w:100},
            "sensitity": {values: ["35 dB","45 dB","55 dB","65 dB"],w:50},
          },
          basePrice: 600
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

export const onImgError = function(e)
{
  e.target.src = require("./img/image-placeholder.png")
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

const desktopModels = [
  {
    title: "VelocityX Pro",
    desc: "The VelocityX Pro is a high-performance desktop computer designed for power users and gamers, featuring top-of-the-line components and advanced cooling systems."
    ,image:"https://i.imgur.com/4N0E9Lv.png"
  },
  {
    title: "MegaStation Elite",
    desc: "The MegaStation Elite is a professional-grade desktop workstation that offers exceptional processing power, extensive storage options, and robust graphics capabilities."
    ,image:"https://i.imgur.com/R7xmPRU.png"
  },
  {
    title: "FusionTower Max",
    desc: "The FusionTower Max is a feature-rich desktop computer with a sleek design, powerful performance, and expandable configurations to meet various computing needs."
    ,image:"https://i.imgur.com/HboOKB8.png"
  },
  {
    title: "PixelStation Pro",
    desc: "The PixelStation Pro is a versatile desktop computer optimized for creative professionals, delivering high-resolution graphics, fast rendering capabilities, and ample storage."
    ,image:"https://i.imgur.com/sr6H9po.png"
  },
  {
    title: "ZedDesk Ultra",
    desc: "The ZedDesk Ultra is a compact and stylish desktop computer that combines elegance with performance, offering a seamless computing experience for home or office use."
    ,image:"https://i.imgur.com/8LBDMoU.png"
  },
  {
    title: "SwiftTower X1",
    desc: "The SwiftTower X1 is a budget-friendly desktop computer that provides reliable performance and essential features, making it ideal for everyday computing tasks."
    ,image:"https://i.imgur.com/5lsqItL.png"
  },
  {
    title: "AuraStation Pro",
    desc: "The AuraStation Pro is a premium desktop computer that combines cutting-edge technology with elegant design, delivering powerful performance and immersive visuals."
    ,image:"https://i.imgur.com/bNPLZoi.png"
  },
  {
    title: "NimbusTower Lite",
    desc: "The NimbusTower Lite is a compact and energy-efficient desktop computer that offers a balance of performance and affordability, perfect for home or small office use."
    ,image:"https://i.imgur.com/E5U2gpU.png"
  },
  {
    title: "EvoStation Plus",
    desc: "The EvoStation Plus is a versatile desktop computer that delivers impressive performance and adaptability, featuring easy upgradability and customizable configurations."
    ,image:"https://i.imgur.com/UDhTRbx.png"
  },
  {
    title: "NovaTower Flex",
    desc: "The NovaTower Flex is a flexible desktop computer that offers a space-saving design and customizable orientations, providing versatility for any workspace."
    ,image:"https://i.imgur.com/62JOfk9.png"
  },
  {
    title: "VivoStation Max",
    desc: "The VivoStation Max is a powerful desktop computer designed for multimedia enthusiasts, offering exceptional graphics, immersive audio, and optimized performance."
    ,image:"https://i.imgur.com/Veg8OPx.png"
  },
  {
    title: "LunaTower Lite",
    desc: "The LunaTower Lite is an affordable desktop computer that delivers reliable performance for everyday computing needs, making it suitable for home or educational use."
    ,image:"https://i.imgur.com/TgN4e5v.png"
  },
  {
    title: "TitaniumStation Pro",
    desc: "The TitaniumStation Pro is a high-end desktop computer that delivers uncompromising performance, robust security features, and expandability for demanding tasks."
    ,image:"https://i.imgur.com/GAkkyCx.png"
  },
  {
    title: "PulseTower Elite",
    desc: "The PulseTower Elite is a high-performance desktop computer built for intense gaming and multimedia experiences, featuring advanced graphics and responsive gameplay."
    ,image:"https://i.imgur.com/lQYDAfA.png"
  },
  {
    title: "AeroStation Ultra",
    desc: "The AeroStation Ultra is a premium desktop computer designed for professionals, offering powerful processing capabilities, extensive storage, and advanced connectivity options."
    ,image:"https://i.imgur.com/z3Thf12.png"
  },
  {
    title: "BlazeTower X2",
    desc: "The BlazeTower X2 is a gaming-focused desktop computer that delivers exceptional performance, immersive visuals, and customizable RGB lighting for an enhanced gaming experience."
    ,image:"https://i.imgur.com/mkBfXaw.png"
  },
  {
    title: "SparkStation Flex",
    desc: "The SparkStation Flex is a versatile desktop computer with a flexible form factor, allowing easy upgrades and adaptability to different workspace configurations."
    ,image:"https://i.imgur.com/SNvRBIu.png"
  },
  {
    title: "XenonTower Pro",
    desc: "The XenonTower Pro is a high-end desktop computer that combines cutting-edge technology, premium components, and meticulous craftsmanship, delivering uncompromising performance and reliability."
    ,image:"https://i.imgur.com/cfHtucm.png"
  },
  {
    title: "NovaStation Lite",
    desc: "The NovaStation Lite is an entry-level desktop computer that offers reliable performance for everyday computing tasks, making it suitable for home or office use at an affordable price."
    ,image:"https://i.imgur.com/RGHeqxy.png"
  },
  {
    title: "MegaTower Elite",
    desc: "The MegaTower Elite is a powerful and expandable desktop computer designed for professionals and content creators, offering unparalleled performance and scalability."
    ,image:"https://i.imgur.com/wvYOfsP.png"
  }
];

const earphoneModels = [
  {
    title: "SonicBlast X1",
    desc: "Experience stunning audio quality with the SonicBlast X1 earphones. These sleek and lightweight earphones deliver immersive sound and a comfortable fit."
    ,image: "https://i.imgur.com/auXQy9L.png"
  },
  {
    title: "Aurora Spark Z2",
    desc: "Ignite your audio experience with the Aurora Spark Z2 earphones. With their dazzling design and powerful sound, these earphones provide a captivating blend of style and performance, ensuring an immersive listening journey."
    ,image: "https://i.imgur.com/oagpxVD.png"
  },
  {
    title: "LunaWave S3",
    desc: "Embark on a sonic adventure with the LunaWave S3 earphones. Crafted for comfort and precision, these earphones deliver exceptional audio quality and a stylish design that complements your unique personality."
    ,image: "https://i.imgur.com/C0WsPNg.png"
  },
  {
    title: "Nebula Pulse H4",
    desc: "Immerse yourself in celestial soundscapes with the Nebula Pulse H4 earphones. With their cutting-edge technology and stellar audio performance."
    ,image: "https://i.imgur.com/iZat0NN.png"
  },
  {
    title: "ZedSound V2",
    desc: "Achieve inner harmony with the ZedSound V2 earphones. Designed to deliver balanced and soothing audio, these earphones provide a tranquil listening experience, allowing you to escape the noise of the outside world."
    ,image: "https://i.imgur.com/M0SiKGk.png"
  },
  {
    title: "PulseWave X2",
    desc: "Feel the pulse of the audio with the PulseWave X2 earphones. Featuring powerful drivers and enhanced bass."
    ,image: "https://i.imgur.com/pKGuhVj.png"
  },
  {
    title: "EchoBuds X3",
    desc: "Experience the power of sound with the EchoBuds X3 earphones. Engineered for deep bass and crystal-clear highs."
    ,image: "https://i.imgur.com/c3paYbA.png"
  },
  {
    title: "SoundFlow S5",
    desc: "Dive into a river of pure sound with the SoundFlow S5 earphones. Featuring advanced sound technology and a comfortable ergonomic design."
    ,image: "https://i.imgur.com/ojYK0T1.png"
  },
  {
    title: "WaveZone E9",
    desc: "Get in the zone with the WaveZone E9 earphones. These energetic and vibrant earphones deliver powerful bass and dynamic sound."
    ,image: "https://i.imgur.com/Bl93zdS.png"
  },
  {
    title: "PulseWave Pro Z5",
    desc: "Elevate your audio game with the PulseWave Pro Z5 earphones. Equipped with advanced audio technology and customizable sound profiles, these earphones provide a professional-grade audio experience for discerning listeners."
    ,image: "https://i.imgur.com/i2GjqoX.png"
  },
  {
    title: "SonicBoom H5",
    desc: "Unleash explosive sound with the SonicBoom H5 earphones. Designed for those who crave powerful audio, these earphones deliver smooth frequency and precise clarity, leaving you in awe of their sonic impact."
    ,image: "https://i.imgur.com/foUDKGS.png"
  },
  {
    title: "WavePod S6",
    desc: "Indulge in tranquil melodies with the WavePod S6 earphones. Designed to deliver soothing audio and exceptional comfort, these earphones provide a serene audio sanctuary."
    ,image: "https://i.imgur.com/B0uQTCI.png"
  }
];

const microphoneModels = [
  {
    title: "VocalPro M1",
    desc: "The VocalPro M1 microphone is a professional-grade dynamic microphone designed for studio recordings and live performances. It delivers clear and crisp vocals with excellent feedback rejection, making it a top choice for vocalists and speakers."
    ,image: "https://i.imgur.com/ZOTtCwd.png"
  },
  {
    title: "AudioTech XLR2",
    desc: "The AudioTech XLR2 microphone is a versatile condenser microphone that captures audio with exceptional detail and accuracy. It features a wide frequency response and low self-noise, making it ideal for recording vocals, instruments, and podcasts."
    ,image: "https://i.imgur.com/D4XZSJH.png"
  },
  {
    title: "SoundCapture C3",
    desc: "The SoundCapture C3 microphone is a compact and portable USB microphone that offers plug-and-play convenience. It delivers high-quality audio for voiceovers, podcasting, and video conferencing, making it a great choice for content creators on the go."
    ,image: "https://i.imgur.com/whANYD3.png"
  },
  {
    title: "StudioPro P4",
    desc: "The StudioPro P4 microphone is a large-diaphragm condenser microphone designed for professional studio recordings. It provides warm and rich sound reproduction, making it suitable for capturing vocals, acoustic instruments, and ambient recordings."
    ,image: "https://i.imgur.com/xaRk0IS.png"
  },
  {
    title: "ProAudio Wireless W2",
    desc: "The ProAudio Wireless W2 microphone is a wireless microphone system that offers freedom of movement without compromising audio quality. It features a reliable wireless connection and clear sound transmission, making it perfect for stage performances and presentations."
    ,image: "https://i.imgur.com/xeRSHmg.png"
  },
  {
    title: "PodCast Master M2",
    desc: "The PodCast Master M2 microphone is a dedicated microphone for podcasting and broadcasting. It offers a built-in pop filter and adjustable gain control, ensuring professional-quality sound for interviews, discussions, and voice recordings."
    ,image: "https://i.imgur.com/d372AOK.png"
  },
  {
    title: "ConferenceTalk C4",
    desc: "The ConferenceTalk C4 microphone is a tabletop conference microphone designed for clear and intelligible audio during meetings and conferences. It features omnidirectional pickup and noise-cancellation technology, providing optimal sound capture in group settings."
    ,image: "https://i.imgur.com/waL9DeZ.png"
  },
  {
    title: "BroadcastPro B3",
    desc: "The BroadcastPro B3 microphone is a professional broadcast microphone designed for radio and TV broadcasting. It offers exceptional clarity and off-axis rejection, ensuring clear and focused audio capture in broadcasting environments."
    ,image: "https://i.imgur.com/cu0MIa9.png"
  },
  {
    title: "TourGuide T2",
    desc: "The TourGuide T2 microphone is a wireless tour guide system that includes a microphone transmitter and receivers. It provides clear and stable audio transmission, making it ideal for guided tours, presentations, and educational events."
    ,image: "https://i.imgur.com/tGD75mG.png"
  },
  {
    title: "StudioDynamic D5",
    desc: "The StudioDynamic D5 microphone is a dynamic microphone designed for studio and live applications. It offers a wide frequency response and high SPL handling, making it suitable for capturing vocals, drums, and guitar amplifiers."
    ,image: "https://i.imgur.com/E2a1oNF.png"
  },
  {
    title: "USBRecord R6",
    desc: "The USBRecord R6 microphone is a USB recording microphone that offers plug-and-play functionality. It provides high-fidelity audio recording for vocals, instruments, and podcasts, making it a convenient choice for home studios and mobile recording setups."
    ,image: "https://i.imgur.com/VeCqFbt.png"
  },
  {
    title: "LavalierPro L4",
    desc: "The LavalierPro L4 microphone is a clip-on lavalier microphone designed for hands-free audio capture. It offers clear and natural sound reproduction, making it ideal for presentations, interviews, and video productions."
    ,image: "https://i.imgur.com/JImbqya.png"
  },
  {
    title: "WirelessTalk W3",
    desc: "The WirelessTalk W3 microphone is a wireless handheld microphone system that delivers reliable and interference-free audio transmission. It offers selectable channels and long-range coverage, making it suitable for performances, conferences, and public speaking."
    ,image: "https://i.imgur.com/phqtrsv.png"
  }
];

const monitorProducts = [
  {
    title: "ProView P4",
    desc: "The ProView P4 is a professional-grade monitor designed for color-critical work. It features a 32-inch QHD display with excellent color accuracy and wide viewing angles, making it perfect for photographers, graphic designers, and video editors."
    ,image: "https://i.imgur.com/VItVW0s.png"
  },
  {
    title: "UltraSlim S2",
    desc: "The UltraSlim S2 is a sleek and slim monitor designed for space-conscious users. With its ultra-thin bezels and compact design, it maximizes screen real estate while providing a crisp and vibrant viewing experience."
    ,image: "https://i.imgur.com/3Jbg1WN.png"
  },
  {
    title: "PortablePro P5",
    desc: "The PortablePro P5 is a portable monitor that offers convenience and versatility. It features a 15.6-inch Full HD display with USB-C connectivity, making it a perfect companion for on-the-go professionals and travelers."
    ,image: "https://i.imgur.com/3Jbg1WN.png"
  },
  {
    title: "DesignStudio D5",
    desc: "The DesignStudio D5 is a premium monitor tailored for creative professionals. It boasts a 34-inch ultrawide display with a curved screen, accurate color reproduction, and extensive connectivity options, making it an ideal choice for graphic designers and video editors."
    ,image: "https://i.imgur.com/7aRMJqa.png"
  },
  {
    title: "BudgetSaver B3",
    desc: "The BudgetSaver B3 is an affordable monitor that doesn't compromise on quality. It features a 21.5-inch Full HD display with a slim profile, making it a great option for everyday use, office work, and casual gaming."
    ,image: "https://i.imgur.com/eSN490a.png"
  },
  {
    title: "CurvedView C4",
    desc: "The CurvedView C4 is a curved monitor that enhances immersion and visual appeal. With its 32-inch curved display, wide color gamut, and high contrast ratio, it offers an immersive viewing experience for gaming, movies, and multimedia content."
    ,image: "https://i.imgur.com/75jMKLM.png"
  },
  {
    title: "OfficeEssentials O2",
    desc: "The OfficeEssentials O2 is a monitor optimized for office productivity. With its ergonomic design, adjustable stand, and eye-care technologies, it provides a comfortable and efficient workspace for long hours of work or study."
    ,image: "https://i.imgur.com/qW744CK.png"
  },
  {
    title: "MultiConnect M3",
    desc: "The MultiConnect M3 is a multitasking monitor that simplifies connectivity. With its built-in KVM switch, USB-C, and HDMI ports, it allows you to easily switch between multiple devices, making it ideal for professionals working with multiple computers or laptops."
    ,image: "https://i.imgur.com/KKZey0A.png"
  },
  {
    title: "UltraWideVision U3",
    desc: "The UltraWideVision U3 is an ultrawide monitor that expands your field of view. With its 29-inch ultrawide display and multitasking features, it enables seamless productivity and immersive entertainment experiences for professionals and content creators."
    ,image: "https://i.imgur.com/O3M64jA.png"
  },
  {
    title: "BusinessPro B4",
    desc: "The BusinessPro B4 is a professional monitor designed for business environments. With its ergonomic design, adjustable stand, and advanced connectivity options, it enhances productivity and comfort for corporate users, office work, and presentations."
    ,image: "https://i.imgur.com/9oZceRN.png"
  }
];

const speakerProducts = [
  {
    title: "SoundBlaster S1",
    desc: "The SoundBlaster S1 is a compact wireless speaker that delivers powerful and clear audio. It features Bluetooth connectivity, built-in microphone for hands-free calls, and a long-lasting battery."
    ,image: "https://i.imgur.com/Cd0D8Md.png"
  },
  {
    title: "StudioMonitor M4",
    desc: "The StudioMonitor M4 is a professional studio monitor speaker that delivers accurate and detailed sound reproduction. It features a bi-amplified design, adjustable frequency response, and multiple connectivity options, making it a top choice for audio production and mixing."
    ,image: "https://i.imgur.com/zP62ktV.png"
  },
  {
    title: "HomeTheaterPro H2",
    desc: "The HomeTheaterPro H2 is a complete home theater speaker system that provides immersive audio for your entertainment setup. It includes a soundbar, subwoofer, and satellite speakers."
    ,image: "https://i.imgur.com/CUQYZ6t.png"
  },
  {
    title: "SoundBarPro S2",
    desc: "The SoundBarPro S2 is a sleek and versatile soundbar that enhances your TV audio experience. It features multiple audio modes, wireless connectivity, and a slim design that fits seamlessly into any living room setup."
    ,image: "https://i.imgur.com/1FmtHWd.png"
  },
  {
    title: "SmartHomeSpeaker S3",
    desc: "The SmartHomeSpeaker S3 is a voice-activated smart speaker that integrates with your smart home ecosystem. It features virtual assistant support, multi-room audio capabilities, and smart home control, allowing you to enjoy music and manage your home with ease."
    ,image: "https://i.imgur.com/RDNuBFy.png"
  },
  {
    title: "ConferencePro C4",
    desc: "The ConferencePro C4 is a professional conference speakerphone that provides clear and natural audio for conference calls. It features advanced noise cancellation technology, 360-degree voice pickup, and connectivity options for smooth collaboration in meetings."
    ,image: "https://i.imgur.com/7Jb03fC.png"
  },
  {
    title: "SoundBarPlus S4",
    desc: "The SoundBarPlus S4 is a premium soundbar with Dolby Atmos technology, delivering immersive and cinematic sound. It features multiple audio drivers, wireless subwoofer, and support for high-resolution audio formats."
    ,image: "https://i.imgur.com/ZvMVUVq.png"
  },
  {
    title: "BookshelfAudio B3",
    desc: "The BookshelfAudio B3 is a stylish bookshelf speaker that provides rich and balanced sound. It features a wooden cabinet, high-quality drivers, and versatile placement options, making it a great addition to your home audio setup."
    ,image: "https://i.imgur.com/EBBmoTw.png"
  },
  {
    title: "BluetoothBoom B2",
    desc: "The BluetoothBoom B2 is a portable Bluetooth speaker that delivers impressive audio performance. It features a rugged design, water resistance, and long battery life."
    ,image: "https://i.imgur.com/BbkhRN2.png"
  },
  {
    title: "WirelessSurround W3",
    desc: "The WirelessSurround W3 is a wireless surroundspeaker system that brings immersive sound to your home theater. It includes multiple wireless satellite speakers, a central hub, and easy setup, allowing you to enjoy a true surround sound experience without the hassle of wires."
    ,image: "https://i.imgur.com/rivZQOI.png"
  }
];


// generateProductList(earphoneModels.length,"earphone",earphoneModels);
