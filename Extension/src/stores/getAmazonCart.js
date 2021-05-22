import { analyzeCart } from "./storesCommon"

export function getAmazonCart() {
    const _cart = document.getElementById("sc-active-cart");
    const _cartItems = _cart.getElementsByClassName("a-row sc-list-item");
    let cart = [];
    for(let i = 0; i < _cartItems.length; i++){
        const textItem = _cartItems[i] ? _cartItems[i].getElementsByClassName("sc-product-title") : undefined;
        const imageItem = _cartItems[i] ? _cartItems[i].getElementsByClassName("sc-product-image") : undefined;
        let _item = {
            id: textItem ? textItem[0].innerHTML : "",
            name: textItem ? textItem[0].innerHTML : "",
            price: _cartItems[i].dataset.price,
            image: imageItem && imageItem.length > 0 ? imageItem[0].currentSrc : ""
        }
        cart.push(_item);
    }
    cart = analyzeCart(cart);
    return cart;
}