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
  if(tab.url && tab.url.includes(SupportedSitesUrls[SupportedSites.INSTACART])){
    setCurrentStore(SupportedSites.INSTACART);
  }
});

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  if(details.url.includes(SupportedSitesUrls[SupportedSites.INSTACART])){
    //when container changes within page, the content script sometimes doesn't load without
    //a full page reload. manually listen for changes and send a message
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        const tab = tabs[0]
        if(tab.url.toLocaleLowerCase().includes("instacart.com/store/items/item")){
          chrome.tabs.sendMessage(tab.id, Messages.ENABLE_ITEM_DIALOG);  
        } else {
          chrome.tabs.sendMessage(tab.id, Messages.DISABLE_ITEM_DIALOG); 
        }
    });
  }
});