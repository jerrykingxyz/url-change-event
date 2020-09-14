function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var UrlChangeEvent =
/*#__PURE__*/
function (_Event) {
  _inherits(UrlChangeEvent, _Event);

  function UrlChangeEvent() {
    var _this;

    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, UrlChangeEvent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UrlChangeEvent).call(this, 'urlchangeevent', _objectSpread2({
      cancelable: true
    }, option)));
    _this.newURL = option.newURL;
    _this.oldURL = option.oldURL;
    _this.action = option.action;
    return _this;
  }

  _createClass(UrlChangeEvent, [{
    key: Symbol.toStringTag,
    get: function get() {
      return 'UrlChangeEvent';
    }
  }]);

  return UrlChangeEvent;
}(_wrapNativeSuper(Event));

var originPushState = window.history.pushState.bind(window.history);

window.history.pushState = function (state, title, url) {
  var nowURL = new URL(url || '', window.location.href);
  var notCanceled = window.dispatchEvent(new UrlChangeEvent({
    newURL: nowURL,
    oldURL: cacheURL,
    action: 'pushState'
  }));

  if (notCanceled) {
    originPushState(_objectSpread2({
      _index: cacheIndex + 1
    }, state), title, url);
    updateCacheState();
  }
};

var originReplaceState = window.history.replaceState.bind(window.history);

window.history.replaceState = function (state, title, url) {
  var nowURL = new URL(url || '', window.location.href);
  var notCanceled = window.dispatchEvent(new UrlChangeEvent({
    newURL: nowURL,
    oldURL: cacheURL,
    action: 'replaceState'
  }));

  if (notCanceled) {
    originReplaceState(_objectSpread2({
      _index: cacheIndex
    }, state), title, url);
    updateCacheState();
  }
};

var cacheURL;
var cacheIndex;
function initState() {
  var state = window.history.state;

  if (!state || typeof state._index !== 'number') {
    originReplaceState(_objectSpread2({
      _index: window.history.length
    }, state), null, null);
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
  var nowIndex = window.history.state._index;
  var nowURL = new URL(window.location);

  if (nowIndex === cacheIndex) {
    e.stopImmediatePropagation();
    return;
  }

  var notCanceled = window.dispatchEvent(new UrlChangeEvent({
    oldURL: cacheURL,
    newURL: nowURL,
    action: 'popstate'
  }));

  if (!notCanceled) {
    e.stopImmediatePropagation();
    window.history.go(cacheIndex - nowIndex);
    return;
  }

  updateCacheState();
});
window.addEventListener('beforeunload', function (e) {
  var notCanceled = window.dispatchEvent(new UrlChangeEvent({
    oldURL: cacheURL,
    newURL: null,
    action: 'beforeunload'
  }));

  if (!notCanceled) {
    e.preventDefault();
    var confirmationMessage = 'o/';
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  }
});
