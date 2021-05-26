import { getInstaCart, getInstaItem } from "./instacartStore"
import { getAppleCart, getAppleItem} from "./appleStore"
import { getAmazonCart, getAmazonItem } from "./amazonStore"
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
            return getInstaItem();
        case SupportedSites.APPLESTORE:
            return getAppleItem();
        case SupportedSites.AMAZON:
            return getAmazonItem();
        default:
            return {};
    }
}

export function analyzeCart(cart) {
    for(let item of cart){
        item.score = (Math.random() * 10) - 1; //Math.floor?, 
        //-1 so closer to 'good'.. smaller num, big number is bad
        if(item.score < 0){
            item.score = 0;
        }
    }
    cart.sort(compare);
    return cart;
}

export function compare( a, b ) {
    if ( a.score > b.score ){
      return 1;
    }
    if ( a.score < b.score ){
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