const _pushState = window.history.pushState;
window.history.pushState = function(...args) {
  _pushState.apply(window.history, args);
  window.dispatchEvent(new Event("urlchangeevent"));
};

const _replaceState = window.history.replaceState;
window.history.replaceState = function(...args) {
  _replaceState.apply(window.history, args);
  window.dispatchEvent(new Event("urlchangeevent"));
};

window.addEventListener("popstate", function() {
  window.dispatchEvent(new Event("urlchangeevent"));
});

class UrlChangeEvent extends Event {
  get [Symbol.toStringTag]() {
    return "UrlChangeEvent";
  }
}
