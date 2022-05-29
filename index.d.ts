interface IOption {
  oldURL: URL
  newURL: URL | null
  action: 'pushState' | 'replaceState' | 'popstate' | 'beforeunload'
}

export interface UrlChangeEvent extends Event, IOption {
  constructor(option: IOption): void
}

declare global {
  interface Window {
    addEventListener(
      type: 'urlchangeevent',
      callback: (event: UrlChangeEvent) => void,
      options?: boolean | AddEventListenerOptions
    ): void
  }
}
