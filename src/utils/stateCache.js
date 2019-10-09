export let cachePath
export let cacheIndex

export function updateCacheState() {
  cachePath = window.location.pathname
  cacheIndex = window.history.state._index
}
