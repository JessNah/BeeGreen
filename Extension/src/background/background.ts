import {
  setStoredOptions,
  setCurrentStore
} from '../utils/storage'
import { Messages, SupportedSites, SupportedSitesUrls } from '../utils/constants'

chrome.runtime.onInstalled.addListener(() => {
  //install script
  setStoredOptions({
    hasAutoOverlay: true
  })
})

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(tab && tab.url){
    if(tab.url.includes(SupportedSitesUrls[SupportedSites.INSTACART])){
      setCurrentStore(SupportedSites.INSTACART);
      //cart open state does not happen on route level, see contentScript for logic
      //inspecting dom to determine open cart
      //view chrome.webNavigation code below to see item state logic
    } else if(tab.url.includes(SupportedSitesUrls[SupportedSites.APPLESTORE])){
      setCurrentStore(SupportedSites.APPLESTORE);
      if(tab.url.includes("apple.com/ca/shop/bag")){
        chrome.tabs.sendMessage(tab.id, Messages.ENABLE_CHECKOUT_STATE);  
      } else if(tab.url.includes("/shop/buy-")){
        chrome.tabs.sendMessage(tab.id, Messages.ENABLE_ITEM_STATE); 
      } else {
        chrome.tabs.sendMessage(tab.id, Messages.DISABLE_CHECKOUT_STATE);  
        chrome.tabs.sendMessage(tab.id, Messages.DISABLE_ITEM_STATE);  
      }
    } else if(tab.url.includes(SupportedSitesUrls[SupportedSites.AMAZON])){
      setCurrentStore(SupportedSites.AMAZON);
      if(tab.url.includes("/cart/view")){
        chrome.tabs.sendMessage(tab.id, Messages.ENABLE_CHECKOUT_STATE);  
      } else if(tab.url.includes("/product/")){
        chrome.tabs.sendMessage(tab.id, Messages.ENABLE_ITEM_STATE); 
      } else {
        chrome.tabs.sendMessage(tab.id, Messages.DISABLE_CHECKOUT_STATE); 
        chrome.tabs.sendMessage(tab.id, Messages.DISABLE_ITEM_STATE);  
      }
    }
  }
});

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  if(details.url.includes(SupportedSitesUrls[SupportedSites.INSTACART])){
    //when container changes within page, the content script sometimes doesn't load without
    //a full page reload. manually listen for changes and send a message
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        const tab = tabs[0]
        if(tab.url.toLocaleLowerCase().includes("instacart.com/store/items/item")){
          chrome.tabs.sendMessage(tab.id, Messages.ENABLE_ITEM_STATE);  
        } else {
          chrome.tabs.sendMessage(tab.id, Messages.DISABLE_ITEM_STATE); 
        }
    });
  }
});