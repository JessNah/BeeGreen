import {
  setStoredOptions,
} from '../utils/storage'
import { Messages } from '../utils/messages'

chrome.runtime.onInstalled.addListener(() => {
  //install script
  console.log("on install from background")
  setStoredOptions({
    hasAutoOverlay: true
  })
})

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
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
});