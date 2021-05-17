export interface LocalStorage {
  options?: LocalStorageOptions,
  currentStore?: string
}

export interface LocalStorageOptions {
  hasAutoOverlay: boolean
}

export type LocalStorageKeys = keyof LocalStorage

export function setStoredOptions(options: LocalStorageOptions): Promise<void> {
  const vals: LocalStorage = {
    options,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}

export function getStoredOptions(): Promise<LocalStorageOptions> {
  const keys: LocalStorageKeys[] = ['options']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.options)
    })
  })
}


export function setCurrentStore(currentStore: string): Promise<void> {
  console.log("set current store: " + currentStore);
  const vals: LocalStorage = {
    currentStore,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}

export function getCurrentStore(): Promise<string> {
  const keys: LocalStorageKeys[] = ['currentStore']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.currentStore)
    })
  })
}