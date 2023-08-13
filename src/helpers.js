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


export const getCartTotalPrice = function(cart,products)
{
    let total = 0;
    cart.forEach(cartItem => {
        let targetProduct = products.find((product) => ""+product.id === cartItem.productId);
        if(!targetProduct) return;
        total += cartItem.count * targetProduct.price;
    });

    return total;
}

export const getCartTotalCount = function(cart)
{
    let total = 0;
    cart.forEach(cartItem => {
        total += cartItem.count;
    });

    return total;
}

export const getRating = function(ratings)
{
    let total = 0;
    ratings.forEach(rating => {
        total += parseInt(rating);
        // console.log(rating);
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

export const generateProductList = function(length,productInfo)
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
        product.category = keys[Math.floor(Math.random()*keys.length)];
        product.price = possibleValues[product.category].basePrice;
        let catSpecs = possibleValues[product.category].specs;

        Object.keys(catSpecs).map((spec) => {
            let vIndex = Math.floor(Math.random()*catSpecs[spec].values.length);
            product.specs[spec] = catSpecs[spec].values[vIndex];
            product.price += catSpecs[spec].w * (vIndex+1);
        })


        productList.push(product);
    }

    console.log(productList);
}

// generateProductList(1000);