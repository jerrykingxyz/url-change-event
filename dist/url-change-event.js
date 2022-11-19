class UrlChangeEvent extends Event {
  constructor(option = {}) {
    super('urlchangeevent', { cancelable: true, ...option });
    this.newURL = option.newURL;
    this.oldURL = option.oldURL;
    this.action = option.action;
  }

  get [Symbol.toStringTag]() {
    return 'UrlChangeEvent'
  }
}

const originPushState = window.history.pushState.bind(window.history);
window.history.pushState = function (state, title, url) {
  const nowURL = new URL(url || '', window.location.href);
  const notCanceled = window.dispatchEvent(
    new UrlChangeEvent({
      newURL: nowURL,
      oldURL: cacheURL,
      action: 'pushState',
    })
  );

  if (notCanceled) {
    originPushState({ _index: cacheIndex + 1, ...state }, title, url);
    updateCacheState();
  }
};

const originReplaceState = window.history.replaceState.bind(
  window.history
);
window.history.replaceState = function (state, title, url) {
  const nowURL = new URL(url || '', window.location.href);
  const notCanceled = window.dispatchEvent(
    new UrlChangeEvent({
      newURL: nowURL,
      oldURL: cacheURL,
      action: 'replaceState',
    })
  );

  if (notCanceled) {
    originReplaceState({ _index: cacheIndex, ...state }, title, url);
    updateCacheState();
  }
};

let cacheURL;
let cacheIndex;

function initState() {
  const state = window.history.state;
  if (!state || typeof state._index !== 'number') {
    originReplaceState({ _index: window.history.length, ...state }, null, null);
  }
}

function updateCacheState() {
  cacheURL = new URL(window.location.href);
  cacheIndex = window.history.state._index;
}

initState();
updateCacheState();

window.addEventListener('popstate', function (e) {
  initState();
  const nowIndex = window.history.state._index;
  const nowURL = new URL(window.location);
  if (nowIndex === cacheIndex) {
    e.stopImmediatePropagation();
    return
  }

  const notCanceled = window.dispatchEvent(
    new UrlChangeEvent({
      oldURL: cacheURL,
      newURL: nowURL,
      action: 'popstate',
    })
  );

  if (!notCanceled) {
    e.stopImmediatePropagation();
    window.history.go(cacheIndex - nowIndex);
    return
  }
  updateCacheState();
});

window.addEventListener('beforeunload', function (e) {
  const notCanceled = window.dispatchEvent(
    new UrlChangeEvent({
      oldURL: cacheURL,
      newURL: null,
      action: 'beforeunload',
    })
  );

  if (!notCanceled) {
    e.preventDefault();
    const confirmationMessage = 'o/';
    e.returnValue = confirmationMessage;
    return confirmationMessage
  }
});
