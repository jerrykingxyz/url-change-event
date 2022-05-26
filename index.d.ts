interface IOption {
  oldURL: URL
  newURL: URL | null
  action: 'pushState' | 'replaceState' | 'popstate' | 'beforeunload'
}

interface UrlChangeEvent extends Event, IOption {
  constructor(option: IOption) : any
}

export { UrlChangeEvent }
