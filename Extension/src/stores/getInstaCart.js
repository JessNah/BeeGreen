export function getInstaCart() {
    // const _html = document.all[0].outerHTML;
    const _cart = document.getElementsByClassName("cart-container-inner")[0];
    const _cartItems = _cart.getElementsByClassName("clamped-name");
    const _cartImages = _cart.getElementsByTagName("img");

    let cart = [];
    let imageIndex = 0;
    for(let i = 0; i < _cartItems.length; i++){
        const cartItem = _cartItems[i];
        if(_cartImages[i].parentElement.className === "RetailerLogo"){
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
    return cart;
}