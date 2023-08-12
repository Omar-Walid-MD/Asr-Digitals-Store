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