import { getInstaCart } from "./getInstaCart"
import { getAppleCart } from "./getAppleCart"
import { getAmazonCart, getAmazonItem } from "./getAmazonCart";
import { SupportedSites } from "../utils/constants"

export function getCart(currentStore) {
    switch(currentStore){
        case SupportedSites.INSTACART:
            return getInstaCart();
        case SupportedSites.APPLESTORE:
            return getAppleCart();
        case SupportedSites.AMAZON:
            return getAmazonCart();
        default:
            return [];
    }
}

export function getItem(currentStore) {
    switch(currentStore){
        case SupportedSites.INSTACART:
            return {};
        case SupportedSites.APPLESTORE:
            return {};
        case SupportedSites.AMAZON:
            return getAmazonItem();
        default:
            return {};
    }
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

export function compare( a, b ) {
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
    if(cart.length <= 0 ){
        return 0;
    }
    return score/cart.length;
}