import { analyzeCart } from "./storesCommon"

export function getInstaCart() {
    // const _html = document.all[0].outerHTML;
    const _cart = document.getElementsByClassName("cart-container-inner")[0];
    const _cartItems = _cart ? _cart.getElementsByClassName("clamped-name") : [];
    const _cartImages = _cart ? _cart.getElementsByTagName("img") : [];

    let cart = [];
    let imageIndex = 0;
    for(let i = 0; i < _cartItems.length; i++){
        const cartItem = _cartItems[i];
        if(_cartImages[imageIndex].parentElement.className === "RetailerLogo"){
            imageIndex++;
        }
        let _item = {
            id: cartItem.id?.trim(),
            name: cartItem.innerText?.trim(),
            image: _cartImages[imageIndex] ? _cartImages[imageIndex].currentSrc : ""
        }
        cart.push(_item);
        imageIndex++;
    }
    cart = analyzeCart(cart);
    return cart;
}