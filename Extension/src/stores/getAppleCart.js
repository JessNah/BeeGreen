import { analyzeCart } from "./storesCommon"

export function getAppleCart() {
    const _cartItems = document.getElementsByClassName("row rs-iteminfo");
    let cart = [];
    for(let i = 0; i < _cartItems.length; i++){
        const priceItem = _cartItems[i].getElementsByClassName("rs-iteminfo-price");
        const textItem = _cartItems[i].getElementsByClassName("rs-iteminfo-title");
        const imageItem = _cartItems[i].getElementsByClassName("as-util-relatedlink")[0].childNodes[0];
        let _item = {
            id: textItem[0].childNodes[0].innerText?.trim(),
            name: textItem[0].childNodes[0].innerText?.trim(),
            price: priceItem[0].childNodes[0].childNodes[1].innerText,
            image: imageItem ? imageItem.currentSrc : ""
        }
        cart.push(_item);
    }
    cart = analyzeCart(cart);
    return cart;
}