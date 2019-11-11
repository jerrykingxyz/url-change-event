interface UrlChangeEvent extends Event {
  newURL: string
  oldURL: string
  action: 'pushState' | 'replaceState' | 'popstate' | 'beforeunload'
}

export { UrlChangeEvent }
