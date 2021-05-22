export function getInstaCart() {
    // const _html = document.all[0].outerHTML;
    const _cart = document.getElementsByClassName("cart-container-inner")[0];
    const _cartItems = _cart.getElementsByClassName("clamped-name");
    const _cartImages = _cart.getElementsByTagName("img");

    let cart = [];
    let imageIndex = 0;
    for(let i = 0; i < _cartItems.length; i++){
        const cartItem = _cartItems[i];
        if(_cartImages[imageIndex].parentElement.className === "RetailerLogo"){
            imageIndex++;
        }
        let _item = {
            id: cartItem.id,
            name: cartItem.innerText,
            image: _cartImages[imageIndex]
        }
        cart.push(_item);
        imageIndex++;
    }
    cart = analyzeCart(cart);
    return cart;
}

export function analyzeCart(cart) {
    for(let item of cart){
        item.score = Math.floor(Math.random() * 10) + 1;
        if(item.score > 10){
            item.score = 10;
        }
    }
    cart.sort(compare);
    return cart;
}

function compare( a, b ) {
    if ( a.score < b.score ){
      return 1;
    }
    if ( a.score > b.score ){
      return -1;
    }
    return 0;
}

export function getCartAverageRating(cart) {
    let score = 0;
    for(let item of cart){
        score += item.score;
    }
    console.log(score);
    return score/cart.length;
}