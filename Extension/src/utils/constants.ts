export enum Messages {
  ENABLE_ITEM_STATE,
  DISABLE_ITEM_STATE,
  ENABLE_CHECKOUT_STATE,
  DISABLE_CHECKOUT_STATE,
  ACTIVATE_APP,
  DISABLE_APP
}

export const SupportedSites = {
  INSTACART: "INSTACART",
  APPLESTORE: "APPLESTORE"
}

export const SupportedSitesUrls = {
  [SupportedSites.INSTACART]: "instacart.com",
  [SupportedSites.APPLESTORE]: "apple.com"
}