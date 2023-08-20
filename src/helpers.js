export const makeId = function(length)
{
    let s = "1234567890";
    let id = "";

    for (let i = 0; i < length; i++) {
        let char = s[parseInt(Math.random()*(s.length-1))];
        id += char;
    }

    return id;
}

export const makeIdWithChars = function(length)
{
    let s = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUV";
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
    console.log(total)
    let avg = total/ratings.length;
    return +avg.toFixed(1);
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
  let dateList = dateObject.toLocaleDateString("en").split("/").map((n) => n.length<2 ? `0${n}` : n);
  return [dateList[2],dateList[0],dateList[1]].join("-");
}

export const makeUniqueId = function(list,length=5)
{
    let id = "";
    do {
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

export const generateRandomUsers = function(length)
{
  const fNames = [
    "Mohammed","Ahmed","Ali","Omar","Abdullah","Youssef","Khalid","Hassan","Abdulrahman","Saeed","Hamza","Zain","Mahmoud","Hussein","Nour","Rania","Layla","Aisha","Fatima","Sara","Mariam","Amina","Hala","Zahra","Jasmine","Hana","Amir","Rami","Karim","Mustafa","Nasser","Majid","Tariq","Kamal","Adnan","Faisal","Rashid","Fahad","Tamer","Jamal","Ziad","Bassam","Ibrahim","Kareem","Samir","Yasin","Waleed","Rafiq","Zaki","Rami","Ali","Sami","Hassan","Nasir","Hadi"
  ];
  const lNames = [
    "Mohammed","Ahmed","Ali","Omar","Abdullah","Youssef","Khalid","Hassan","Abdulrahman","Saeed","Hamza","Zain","Mahmoud","Hussein","Amir","Rami","Karim","Mustafa","Nasser","Majid","Tariq","Kamal","Adnan","Faisal","Rashid","Fahad","Tamer","Jamal","Ziad","Bassam","Ibrahim","Kareem","Samir","Yasin","Waleed","Rafiq","Zaki","Rami","Ali","Sami","Hassan","Nasir","Hadi"
  ];
  const addresses = [
    "14 Ahmed Orabi St, Giza",
    "27 Nile Corniche, Cairo",
    "9 Salah Salem St, Alexandria",
    "5 Tahrir Square, Luxor",
    "12 Port Said St, Mansoura",
    "8 El Gezira St, Aswan",
    "23 Ramses St, Port Said",
    "6 El Haram St, Sharm El Sheikh",
    "17 Ismailia St, Suez",
    "3 El Mansoura St, Sohag",
    "10 El Mahalla St, Zagazig",
    "7 Damietta St, Minya",
    "19 El Fayoum St, Assiut",
    "2 Qena St, Beni Suef",
    "15 El Arish St, Hurghada",
    "11 Kafr El Sheikh St, Tanta",
    "4 Asyut St, Damanhur",
    "18 Mallawi St, Banha",
    "1 El Mansour St, Kafr El Dawwar",
    "13 Sohag St, Damietta",
    "16 Port Fuad St, Ismailia",
    "21 Rosetta St, Ras El Bar",
    "25 Shibin El Kom St, Mahalla El Kubra",
    "22 Abu Tig St, El Gouna",
    "20 New Valley St, Kharga Oasis",
    "28 Shobra St, Sohag",
    "32 Damanhour St, Belqas",
    "29 Edfu St, Luxor",
    "38 Dakhla Oasis St, Mut",
    "31 Tala St, Asyut",
    "34 Mallawi St, Bani Mazar",
    "36 Marsa Alam St, Port Ghalib",
    "39 Wadi El Natrun St, Tanta",
    "41 Qift St, Qena",
    "43 Berenice St, Marsa Alam",
    "45 El Tor St, Nuweiba",
    "49 Al Minya St, Al Minya",
    "50 Sidi Barrani St, Sidi Barrani",
    "52 Al Arish St, Al Arish",
    "54 Matruh St, Marsa Matruh",
    "56 Siwa Oasis St, Siwa Oasis",
    "58 Rafah St, Rafah",
    "60 Dahab St, Dahab",
    "62 Al Kharga St, Al Kharga",
    "64 Farafra Oasis St, Farafra Oasis",
    "66 Taba St, Taba",
    "68 Alamein St, El Alamein",
    "70 Halayeb St, Halayeb",
    "72 Shalateen St, Shalateen"
  ];

  let users = [];

  for (let i = 0; i < length; i++)
  {
    let newUser = {};
    newUser.firstName = fNames[Math.floor(Math.random()*fNames.length)];
    newUser.lastName = lNames[Math.floor(Math.random()*lNames.length)];
    newUser.email = `${newUser.firstName.toLowerCase()}.${newUser.lastName.toLowerCase()}${makeId(4)}@${(["yahoo","gmail","email"][Math.floor(Math.random()*3)])}.com`;
    if(Math.random() > 0.2) newUser.username = newUser.firstName + newUser.lastName + makeId(4);
    newUser.phone = "+201" + makeId(9);
    newUser.dateOfBirth = getDateString(new Date(new Date("1 Jan 1950").getTime() + Math.random() * 1000 * 3600 * 24 * 365 * 65));
    let address = addresses[Math.floor(Math.random()*addresses.length)];
    newUser.address = address;
    newUser.city = address.split(",")[1].slice(1);
    newUser.street = address.split(",")[0];
    newUser.zipcode = makeId(5);
    newUser.creditCardNo = makeId("10");
    newUser.role =  Math.random() > 0.95 ? "admin" : "client";
    newUser.cart = [];
    newUser.favorites = [];
    newUser.id = makeUniqueId(users,8);

    users.push(newUser);

  }

  console.log(users);


}

export const generateRandomPurchases = function(length,products,users)
{  
  let purchases = [];
  console.log(products);

  if(products.length && users.length)

  for (let i = 0; i < length; i++)
  {
    let newPurchase = {};
    let numberOfItems = 1 + Math.floor(Math.random() * 4);

    newPurchase.order = Array.from({length:numberOfItems}).map((x,j) => 
    {
      let item = products[Math.floor(Math.random()*products.length)];
      return {itemId: item.id,count: 1+Math.floor(Math.random()*9),price: item.price}
    })

    newPurchase.orderCount = newPurchase.order.reduce((t,item)=>{return t + item.count},0);

    newPurchase.subtotal = newPurchase.order.reduce((t,item)=>{return t + item.price*item.count},0);
    newPurchase.deliveryFees = 100 + Math.floor(Math.random()*400);
    newPurchase.total = newPurchase.subtotal + newPurchase.deliveryFees;

    let user = users[Math.floor(Math.random()*users.length)];

    newPurchase.details = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth,
      city: user.city,
      address: user.address,
      street: user.street,
      zipcode: user.zipcode,
      creditCardNo: user.creditCardNo,
      creditCardPin: makeId("3"),
      creditCardExp: {
        creditCardExpYear: 23 + Math.floor(Math.random()*7),
        creditCardExpMonth: 1 + Math.floor(Math.random()*11)
      },
      
    }
    newPurchase.estimatedDeliveryHours = 3 + Math.floor(Math.random()*9);
    newPurchase.date = parseInt(new Date("1 Jan 2023").getTime() + Math.random() * 1000 * 3600 * 24 * 200);
    newPurchase.status = Math.random() < 0.95 ? "success" : "cancelled";
    newPurchase.userId = user.id;
    newPurchase.id = makeUniqueId(purchases,8);

    purchases.push(newPurchase);

  }

  console.log(purchases);


}

export const generateRandomOffers = function(length,products)
{  
  let offers = [];

  if(products.length)

  for (let i = 0; i < length; i++)
  {
    let newOffer = {};

    let start = new Date(new Date("1 Jul 2023").getTime() + Math.random() * 1000 * 3600 * 24 * 90);
    let end = new Date(start.getTime() + Math.random() * 1000 * 3600 * 24 * 30)
    newOffer.start = getDateString(start);
    newOffer.end = getDateString(end);

    let product = products.filter((product) => !offers.map((offer) => offer.itemId).includes(product.id))[Math.floor(Math.random()*products.length)];

    newOffer.productId = product.id;
    newOffer.date = getDateString(new Date(start.getTime() - Math.random() * 1000 * 3600 * 24 * 10));
    newOffer.newPrice = parseInt(product.price * (100 - [10,15,20,25,30,35,40,50][Math.floor(Math.random()*8)])/100);
    newOffer.newPrice -= newOffer.newPrice%5;
    newOffer.status = start > Date.now() ? "upcoming" : end > Date.now() ? "running" : "closed";

    offers.push(newOffer);

  }

  console.log(offers);


}

export const generateRandomReviews = function(length,users,products)
{

  const positiveReviewTitles = [
    "Excellent!","Amazing","Great","Fantastic","Impressive","Superb","Outstanding","Perfect","Awesome","Wonderful","Brilliant","Terrific","Fabulous","Exceptional","Delightful","Lovely","Incredible","Top-notch","Marvelous","Phenomenal","Splendid","Remarkable","Stellar","Thrilling","Astonishing","First-rate","Impressive","Sensational","Extraordinary","Excellent Service","Highly Recommend","Great Quality","Very Satisfied","Love It!","Best Purchase Ever","Reliable and Fast","Efficient and Professional","Exceeded Expectations","Prompt Delivery","Quick and Easy","Exceptional Value","Flawless Transaction","Highly Impressed","Pleasantly Surprised","Simply the Best","Highly Efficient","Absolutely Delighted","Thrilled with the Product","Impressed with Customer Service","Couldn't Be Happier","A+++ Experience"
  ];

  const negativeReviewTitles = [
    "Disappointing","Poor","Bad","Terrible","Awful","Horrible","Unsatisfactory","Subpar","Not Impressed","Lackluster","Below Average","Unpleasant","Frustrating","Dissatisfying","Unsatisfying","Unreliable","Overpriced","Waste of Money","Unprofessional","Slow Performance","Low Quality","Misleading","Inadequate","Unresponsive","Displeased","Unorganized","Dreadful","Unhelpful","Unimpressive","Unsatisfying Experience","Unsatisfied","Regrettable","Lousy","Inefficient","Unacceptable Quality","Not as Advertised","Negative Experience"
  ];

  const moderateReviewTitles = [
    "Decent","Average","Okay","Satisfactory","Fair","Acceptable","Adequate","Not Bad","Middling","So-So","Passable","Fine","Alright","Okay Experience","Neutral","Middle of the Road","Mixed Feelings","Could Be Better","Room for Improvement","Average Quality","Reasonable Price","Decent Product","Fairly Priced","Neutral Experience","Not Outstanding","Balanced","Not Exceptional","Average Performance","Moderate Satisfaction","Neither Good nor Bad","Fair Deal","Not Impressive","Not Disappointing","Neutral Opinion","Average Value","Moderately Satisfied","Fairly Decent","Middle Ground","Sufficient","Average Rating","Fairly Reliable","Mediocre","Standard","Consistent","Average Response","Not Exceptionally Great","Okay Quality"
  ];
  let reviews = [];

  if(products.length)

  for (let i = 0; i < length; i++)
  {
    let newReview = {};

    newReview.rating = Math.random() > 0.2 ? 3 + Math.floor(Math.random()*3) : 1 + Math.floor(Math.random()*2);
    
    let targetList = newReview.rating >= 4 ? positiveReviewTitles : newReview.rating===3 ? moderateReviewTitles : negativeReviewTitles;

    newReview.title = targetList[Math.floor(Math.random()*targetList.length)];
    newReview.body = `${targetList[Math.floor(Math.random()*targetList.length)]}. ${targetList[Math.floor(Math.random()*targetList.length)]}.`;

    newReview.userId = users[Math.floor(Math.random()*users.length)].id;
    newReview.productId = products[Math.floor(Math.random()*products.length)].id;

    newReview.date = new Date(new Date("1 Jan 2023").getTime() + Math.random() * 1000 * 3600 * 24 * 200).getTime();
    newReview.id = makeUniqueId(reviews,8);

    newReview.pros = "";
    newReview.cons = "";

    reviews.push(newReview);

  }

  console.log(reviews);


}

export const onImgError = function(e)
{
  e.target.src = require("./img/image-placeholder.png")
}

// generateRandomUsers(250);


  