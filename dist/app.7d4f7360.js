// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"c3f593e9ba764da067eaa63f8413a6f6":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "7d4f736082c32750bceeb79d3ab5e8c5";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      var absolute = /^https?:\/\//i.test(links[i].getAttribute('href'));

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"d5453ddf98b92169eb6f5f7923a02919":[function(require,module,exports) {
require('./bundle-manifest').register(JSON.parse("{\"bceeb79d3ab5e8c5\":\"app.7d4f7360.js\",\"7f6ccd725553c36b\":\"sprite.39aec3e5.svg\"}"));
},{"./bundle-manifest":"ba8df6b71e73837c465d69bebde6e64d"}],"ba8df6b71e73837c465d69bebde6e64d":[function(require,module,exports) {
"use strict";

var mapping = {};

function register(pairs) {
  var keys = Object.keys(pairs);

  for (var i = 0; i < keys.length; i++) {
    mapping[keys[i]] = pairs[keys[i]];
  }
}

function resolve(id) {
  var resolved = mapping[id];

  if (resolved == null) {
    throw new Error('Could not resolve bundle with id ' + id);
  }

  return resolved;
}

module.exports.register = register;
module.exports.resolve = resolve;
},{}],"9ec4b324fc4052d8f2f7a25a2c519fc9":[function(require,module,exports) {
"use strict";

var _nav = require("./nav.js");

var _initialContent = require("./initialContent.js");

var _search = require("./search.js");

var _state = require("./state.js");

const init = () => {
  (0, _initialContent.showInitialContent)();
  (0, _nav.initiateNavEventListeners)();
  (0, _search.searchAddEventListener)();
  (0, _state.initiateBookmarks)();
};

window.addEventListener("load", init);
},{"./nav.js":"ed84b06b65e8af7a8976fdc5d4f220ec","./initialContent.js":"e7ad69c400a0e6e245587ece8ed95d3c","./search.js":"cccd03d524e6404cf97b89526adff956","./state.js":"11b6e3460c5e8934d9c6cfd6c9252736"}],"ed84b06b65e8af7a8976fdc5d4f220ec":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initiateNavEventListeners = void 0;

var _renderHotels = require("./renderHotels.js");

var _renderRentals = require("./renderRentals.js");

const linksContainer = document.querySelector(".app__sidebar-links");
const navItems = document.querySelectorAll(".app__sidebar-links-link");

const initiateNavEventListeners = () => {
  linksContainer.addEventListener("click", e => {
    navItems.forEach(item => {
      item.classList.remove("app__sidebar-links-link--active");
    });

    if (e.target.classList.contains("hotels")) {
      (0, _renderHotels.displayHotelsAndPagination)();
      e.target.closest(".app__sidebar-links-link").classList.add("app__sidebar-links-link--active");
    }

    if (e.target.classList.contains("rentals")) {
      (0, _renderRentals.displayRentals)();
      e.target.closest(".app__sidebar-links-link").classList.add("app__sidebar-links-link--active");
    }
  });
};

exports.initiateNavEventListeners = initiateNavEventListeners;
},{"./renderHotels.js":"2dbf958396fb4a213bc8d25301295172","./renderRentals.js":"72607bb3e4b2d5ee4590dffdb0900457"}],"2dbf958396fb4a213bc8d25301295172":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayHotelsAndPagination = exports.renderHotels = exports.addEventListenersInHotels = exports.displayHotelInformation = void 0;

var _paginate = require("./paginate.js");

var _spinner = require("./spinner.js");

var _renderButtons = require("./renderButtons.js");

var _gallery = require("./gallery.js");

var _testimonies = require("./testimonies.js");

var _bookmark = require("./bookmark.js");

var _hotels = require("./hotels.js");

var _state = require("./state.js");

var _sprite = _interopRequireDefault(require("url:../../img/sprite.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let initialApp = document.querySelector(".app__content");
let hotelsContainer;
let buttonsContainer;
let index = 0;
let pages = [];
pages = (0, _paginate.paginate)(_hotels.hotels);

const displayHotelInformation = hotel => {
  (0, _spinner.renderSpinner)();
  const markUp = `<div class="app__content-gallery slider" data-id=${hotel.id}>
  <ion-icon name="chevron-forward-outline" class="next-btn"></ion-icon>
  <figure class="slide">
    <img src="../img/${hotel.images[0]}.jpg" alt="" />
  </figure>
  <figure class="slide">
    <img src="../img/${hotel.images[1]}.jpg" alt="" />
  </figure>
  <figure class="slide">
    <img src="../img/${hotel.images[2]}.jpg" alt="" />
  </figure>
  <ion-icon name="chevron-back-outline" class="prev-btn"></ion-icon>
</div>

<div class="app__content-details">
  <div class="app__content-details-name">
    <h2>${hotel.name}</h2>
    <div class="app__content-details-name-stars">
      ${hotel.rating > 9 ? `<svg class="overview__icon-star">
      <use xlink:href="img/sprite.svg#icon-star"></use>
    </svg>
    <svg class="overview__icon-star">
      <use xlink:href="img/sprite.svg#icon-star"></use>
    </svg>
    <svg class="overview__icon-star">
      <use xlink:href="img/sprite.svg#icon-star"></use>
    </svg>
    <svg class="overview__icon-star">
      <use xlink:href="img/sprite.svg#icon-star"></use>
    </svg>
    <svg class="overview__icon-star">
      <use xlink:href="img/sprite.svg#icon-star"></use>
    </svg>` : hotel.rating < 9 && hotel.rating > 7 ? `<svg class="overview__icon-star">
    <use xlink:href="img/sprite.svg#icon-star"></use>
  </svg>
  <svg class="overview__icon-star">
    <use xlink:href="img/sprite.svg#icon-star"></use>
  </svg>
  <svg class="overview__icon-star">
    <use xlink:href="img/sprite.svg#icon-star"></use>
  </svg>
  <svg class="overview__icon-star">
    <use xlink:href="img/sprite.svg#icon-star"></use>
  </svg>` : hotel.rating < 7 && hotel.rating > 5 ? `<svg class="overview__icon-star">
  <use xlink:href="img/sprite.svg#icon-star"></use>
</svg>
<svg class="overview__icon-star">
  <use xlink:href="img/sprite.svg#icon-star"></use>
</svg>
<svg class="overview__icon-star">
  <use xlink:href="img/sprite.svg#icon-star"></use>
</svg>` : hotel.rating < 5 && hotel.rating > 3 ? `<svg class="overview__icon-star">
<use xlink:href="img/sprite.svg#icon-star"></use>
</svg>
<svg class="overview__icon-star">
<use xlink:href="img/sprite.svg#icon-star"></use>
</svg>` : hotel.rating < 3 ? `<svg class="overview__icon-star">
<use xlink:href="img/sprite.svg#icon-star"></use>
</svg>` : ""}
    </div>
  </div>
  <div class="app__content-details-bookmark">
  <svg >
  <use xlink:href="./img/sprite.svg#icon-bookmarked" class="favorite"></use>
</svg>
  </div>
  <div class="app__content-details-location">
    <div class="app__content-details-location-details">
      <svg class="overview__icon-location">
        <use xlink:href="img/sprite.svg#icon-location-pin"></use>
      </svg>
      <a href="#" class="location-name">${hotel.location}</a>
    </div>
    <div class="app__content-details-location-votes">
      <h3>${hotel.rating}</h3>
      <p>${hotel.votes} VOTOS</p>
    </div>
  </div>
</div>

<div class="app__content-hotel">
  <div class="app__content-hotel-details">
    <div class="app__content-hotel-details-description">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
        nisi dignissimos debitis ratione sapiente saepe. Accusantium
        cumque, quas, ut corporis incidunt deserunt quae architecto
        voluptate.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
        nisi dignissimos debitis ratione sapiente saepe. Accusantium
        cumque, quas, ut corporis incidunt deserunt quae architecto
        voluptate.
      </p>
    </div>

    <div class="line"></div>
    <div class="app__content-hotel-details-features">
      <div class="feature">
        <ion-icon name="chevron-forward-outline"> </ion-icon> Cerca de
        la playa
      </div>
      <div class="feature">
        <ion-icon name="chevron-forward-outline"> </ion-icon> Viaje
        gratis al aeropuerto
      </div>
      <div class="feature">
        <ion-icon name="chevron-forward-outline"> </ion-icon> Desayuno
        incluido
      </div>
      <div class="feature">
        <ion-icon name="chevron-forward-outline"> </ion-icon> Wi-fi
        gratuito
      </div>
      <div class="feature">
        <ion-icon name="chevron-forward-outline"> </ion-icon> Mascotas
        permitidas
      </div>
      <div class="feature">
        <ion-icon name="chevron-forward-outline"> </ion-icon> Perfecto
        para familias
      </div>
      <div class="feature">
        <ion-icon name="chevron-forward-outline"> </ion-icon> Vista al
        mar
      </div>
      <div class="feature">
        <ion-icon name="chevron-forward-outline"> </ion-icon> Aire
        acondicionado
      </div>
    </div>

    <div class="line"></div>
    <div class="app__content-hotel-details-recommend">
      <p>Michel y otras 3 personas recomiendan este hotel</p>
      <div class="recommend-friends">
        <img
          src="img/user-3.jpg"
          alt="photo"
          class="recommend__photo"
        />
        <img
          src="img/user-4.jpg"
          alt="photo"
          class="recommend__photo"
        />
        <img
          src="img/user-5.jpg"
          alt="photo"
          class="recommend__photo"
        />
        <img
          src="img/user-6.jpg"
          alt="photo"
          class="recommend__photo"
        />
      </div>
    </div>
  </div>

  <div class="app__content-hotel-reviews">
    ${hotel.testimonies.map(testimonie => {
    return `<div class="app__content-hotel-reviews-review active">
      <p>
        ${testimonie.description}
      </p>

      <div class="app__content-hotel-reviews-review-details">
        <img src="img/${testimonie.image}" alt="" />
        <div class="app__content-hotel-reviews-review-details-user">
          <h3> ${testimonie.name}</h3>
          <p>Sept 23, 2020</p>
        </div>
        <div class="app__content-hotel-reviews-review-details-rating">
          <p> ${testimonie.rating}</p>
        </div>
      </div>
    </div>`;
  }).slice(0, 2).join("")}
    
    <div class="app__content-hotel-reviews-change">
      <ion-icon
        name="chevron-back-outline"
        class="previous-review"
      ></ion-icon>
      <ion-icon
        name="chevron-forward-outline"
        class="next-review"
      ></ion-icon>
    </div>
  </div>
</div>

<div class="app__content-cta">
  <button class="btn">
    <span class="btn__visible">RESERVAR AHORA</span>
    <span class="btn__invisible">4 HABITACIONES DISPONIBLES</span>
  </button>
</div>`;
  setTimeout(() => {
    (0, _spinner.deleteSpinner)();
    initialApp.innerHTML = markUp;
    (0, _gallery.activateGallery)();
    (0, _testimonies.activateTestimonies)(hotel.testimonies);
    (0, _state.initiateBookmarks)();
    (0, _bookmark.activateBookmark)(hotel);
  }, 1000);
};

exports.displayHotelInformation = displayHotelInformation;

const addEventListenersInHotels = () => {
  window.addEventListener("hashchange", e => {
    const hash = Number(window.location.hash.slice(1));

    const hotelDetails = _hotels.hotels.filter(hotel => {
      return hotel.id === hash;
    });

    initialApp.innerHTML = "";
    displayHotelInformation(hotelDetails[0]);
  });
};

exports.addEventListenersInHotels = addEventListenersInHotels;

const renderHotels = hotels => {
  let hotelsPerPage = hotels.map(hotel => {
    return `<a href="#${hotel.id}" class="app__hotels-hotel dataset-id=${hotel.id}">
  <img src="./img/${hotel.images[0]}.jpg" alt="">
  <img src="./img/${hotel.images[1]}.jpg" alt="">
  <img src="./img/${hotel.images[2]}.jpg" alt="">
  <div class="app__hotels-hotel-details">
    <h2>${hotel.name.toUpperCase()}</h2>
    <div class="app__hotels-hotel-details-location">
      <svg>
        <use xlink:href="img/sprite.svg#icon-location-pin"></use>
      </svg>
      <p href="#">${hotel.location}</p>
    </div>
    <div class="app__hotels-hotel-details-stars">
      ${hotel.rating > 9 ? `<svg class="overview__icon-star">
    <use xlink:href="img/sprite.svg#icon-star"></use>
  </svg>
  <svg class="overview__icon-star">
    <use xlink:href="img/sprite.svg#icon-star"></use>
  </svg>
  <svg class="overview__icon-star">
    <use xlink:href="img/sprite.svg#icon-star"></use>
  </svg>
  <svg class="overview__icon-star">
    <use xlink:href="img/sprite.svg#icon-star"></use>
  </svg>
  <svg class="overview__icon-star">
    <use xlink:href="img/sprite.svg#icon-star"></use>
  </svg>` : hotel.rating < 9 && hotel.rating > 7 ? `<svg class="overview__icon-star">
  <use xlink:href="img/sprite.svg#icon-star"></use>
</svg>
<svg class="overview__icon-star">
  <use xlink:href="img/sprite.svg#icon-star"></use>
</svg>
<svg class="overview__icon-star">
  <use xlink:href="img/sprite.svg#icon-star"></use>
</svg>
<svg class="overview__icon-star">
  <use xlink:href="img/sprite.svg#icon-star"></use>
</svg>` : hotel.rating < 7 && hotel.rating > 5 ? `<svg class="overview__icon-star">
<use xlink:href="img/sprite.svg#icon-star"></use>
</svg>
<svg class="overview__icon-star">
<use xlink:href="img/sprite.svg#icon-star"></use>
</svg>
<svg class="overview__icon-star">
<use xlink:href="img/sprite.svg#icon-star"></use>
</svg>` : hotel.rating < 5 && hotel.rating > 3 ? `<svg class="overview__icon-star">
<use xlink:href="img/sprite.svg#icon-star"></use>
</svg>
<svg class="overview__icon-star">
<use xlink:href="img/sprite.svg#icon-star"></use>
</svg>` : hotel.rating < 3 ? `<svg class="overview__icon-star">
<use xlink:href="img/sprite.svg#icon-star"></use>
</svg>` : ""}
    </div>
  </div>
  
  <div class="app__content-details-location-votes">
    <h3>${hotel.rating}</h3>
    <p>${hotel.votes} VOTOS</p>
  </div>
  </a>
  `;
  }).join("");
  return `<div class="app__hotels">
      ${hotelsPerPage}
      <div class="app__hotels-pagination">
      <div class="app__hotels-pagination-buttons"></div>
      </div> 
      </div>`;
};

exports.renderHotels = renderHotels;

const displayHotelsAndPagination = (index = 0, filteredHotels) => {
  initialApp.innerHTML = "";
  (0, _spinner.renderSpinner)();
  pages = (0, _paginate.paginate)(filteredHotels ? filteredHotels : _hotels.hotels);

  if (pages.length === 0) {
    setTimeout(() => {
      (0, _spinner.deleteSpinner)();
      let markUp = `<div class="not-found">
    <p>No se pudo encontrar ningun hotel con ese nombre...</p>
    </div>`;
      initialApp.innerHTML = markUp;
    }, 1000);
    return;
  }

  let markUp = renderHotels(pages[index]);
  setTimeout(() => {
    (0, _spinner.deleteSpinner)();
    initialApp.innerHTML = markUp;
    buttonsContainer = document.querySelector(".app__hotels-pagination-buttons");
    (0, _renderButtons.renderButtons)(buttonsContainer, pages, index);
  }, 1000);
  setTimeout(() => {
    (0, _paginate.addEventListenersInPagination)(buttonsContainer, index, pages);
    hotelsContainer = document.querySelector(".app__hotels");
    addEventListenersInHotels(hotelsContainer);
  }, 1100);
};

exports.displayHotelsAndPagination = displayHotelsAndPagination;
},{"./paginate.js":"de72eca5a9a996a5906028b79683d948","./spinner.js":"340e904e425283c916ec404ddb1d2a6f","./renderButtons.js":"71e628a01913edb30e3628ffbb4cdc87","./gallery.js":"9164208f5f84b9ae17b2ec235335d994","./testimonies.js":"f47d9359fbe5fe950717b57c6c24cd5b","./bookmark.js":"c8f44aad3388848cc317b1fdb2975557","./hotels.js":"11939eec345717ab6a3fb9affb60bd10","./state.js":"11b6e3460c5e8934d9c6cfd6c9252736","url:../../img/sprite.svg":"ec8b31275e6f771c8942f3e9f5049281"}],"de72eca5a9a996a5906028b79683d948":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEventListenersInPagination = exports.paginate = void 0;

var _renderHotels = require("./renderHotels.js");

const paginate = hotels => {
  const itemsPerPage = 4;
  const numberOfPages = Math.ceil(hotels.length / itemsPerPage);
  const newHotels = Array.from({
    length: numberOfPages
  }, (_, index) => {
    const start = index * itemsPerPage;
    return hotels.slice(start, start + itemsPerPage);
  });
  return newHotels;
};

exports.paginate = paginate;

const addEventListenersInPagination = (buttonsContainer, index, pages) => {
  buttonsContainer.addEventListener("click", function (e) {
    e.preventDefault();

    if (e.target.classList.contains("app__hotels-pagination")) {
      return;
    }

    if (e.target.classList.contains("page-btn")) {
      index = e.target.dataset.index;
    }

    if (e.target.parentElement.classList.contains("next-button")) {
      index++;

      if (index > pages.length - 1) {
        index = 0;
      }
    }

    if (e.target.parentElement.classList.contains("prev-button")) {
      index--;

      if (index < 0) {
        index = pages.length - 1;
      }
    }

    (0, _renderHotels.displayHotelsAndPagination)(Number(index));
  });
};

exports.addEventListenersInPagination = addEventListenersInPagination;
},{"./renderHotels.js":"2dbf958396fb4a213bc8d25301295172"}],"340e904e425283c916ec404ddb1d2a6f":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteSpinner = exports.renderSpinner = void 0;

const renderSpinner = () => {
  let main = document.querySelector(".app__content");
  const markup = ` <div class="spinner">
      <svg>
        <use xlink:href="img/sprite.svg#icon-loader"></use>
      </svg>
    </div>`;
  main.innerHTML = markup;
};

exports.renderSpinner = renderSpinner;

const deleteSpinner = () => {
  let spinner = document.querySelector(".spinner");
  spinner.remove();
};

exports.deleteSpinner = deleteSpinner;
},{}],"71e628a01913edb30e3628ffbb4cdc87":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderButtons = void 0;

const renderButtons = (container, pages, activeIndex) => {
  let buttons = pages.map((page, index) => {
    return ` <button class="page-btn ${activeIndex === index ? "active-btn" : "null"}" data-index=${index}>${index + 1}</button>`;
  });
  buttons.push(` <button class="next-button"><ion-icon name="chevron-forward-outline"></ion-icon></button>`);
  buttons.unshift(` 
      <button class="prev-button"><ion-icon name="chevron-back-outline"></ion-icon></button>
     `);
  container.innerHTML = buttons.join("");
};

exports.renderButtons = renderButtons;
},{}],"9164208f5f84b9ae17b2ec235335d994":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activateGallery = void 0;
let counter;
let slides;
let nextBtn;
let prevBtn;

const activateGallery = () => {
  slides = document.querySelectorAll(".slide");
  nextBtn = document.querySelector(".next-btn");
  prevBtn = document.querySelector(".prev-btn");
  counter = 0;
  slides.forEach(function (slide, index) {
    slide.style.left = `${index * 100}%`;
  });
  nextBtn.addEventListener("click", function () {
    counter++;
    carousel();
  });
  prevBtn.addEventListener("click", function () {
    counter--;
    carousel();
  });
  prevBtn.style.display = "none";
};

exports.activateGallery = activateGallery;

const carousel = () => {
  if (counter < slides.length - 1) {
    nextBtn.style.display = "block";
  } else {
    nextBtn.style.display = "none";
  }

  if (counter > 0) {
    prevBtn.style.display = "block";
  } else {
    prevBtn.style.display = "none";
  }

  slides.forEach(function (slide) {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
};
},{}],"f47d9359fbe5fe950717b57c6c24cd5b":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activateTestimonies = void 0;

var _hotels = require("./hotels.js");

let testimonies;
let buttonsContainer;
let nextReview;
let previousReview;

const activateTestimonies = testimonies => {
  buttonsContainer = document.querySelector(".app__content-hotel-reviews-change");
  previousReview = document.querySelector(".previous-review");
  nextReview = document.querySelector(".next-review");
  let activeTestimonies = document.querySelectorAll(".active");
  nextReview.classList.add("active");
  buttonsContainer.addEventListener("click", e => {
    if (e.target.classList.contains("next-review")) {
      const nextTestimonies = testimonies.slice(2, 4);
      activeTestimonies.forEach((testimonie, i) => {
        testimonie.classList.remove("active");
        let testimonieContent = nextTestimonies[i];
        setTimeout(() => {
          testimonie.innerHTML = "";
          testimonie.innerHTML = `
            <p>
              ${testimonieContent.description}
            </p>
      
            <div class="app__content-hotel-reviews-review-details">
              <img src="img/${testimonieContent.image}" alt="" />
              <div class="app__content-hotel-reviews-review-details-user">
                <h3> ${testimonieContent.name}</h3>
                <p>Sept 23, 2020</p>
              </div>
              <div class="app__content-hotel-reviews-review-details-rating">
                <p> ${testimonieContent.rating}</p>
              </div>
            </div>
          `;
          testimonie.classList.add("active");
        }, 1000);
      });
      nextReview.classList.remove("active");
      previousReview.classList.add("active");
    }

    if (e.target.classList.contains("previous-review")) {
      const previousTestimonies = testimonies.slice(0, 2);
      activeTestimonies.forEach((testimonie, i) => {
        testimonie.classList.remove("active");
        setTimeout(() => {
          testimonie.innerHTML = "";
          let testimonieContent = previousTestimonies[i];
          testimonie.innerHTML = `
          <p>
            ${testimonieContent.description}
          </p>
    
          <div class="app__content-hotel-reviews-review-details">
            <img src="img/${testimonieContent.image}" alt="" />
            <div class="app__content-hotel-reviews-review-details-user">
              <h3> ${testimonieContent.name}</h3>
              <p>Sept 23, 2020</p>
            </div>
            <div class="app__content-hotel-reviews-review-details-rating">
              <p> ${testimonieContent.rating}</p>
            </div>
          </div>
        `;
          testimonie.classList.add("active");
        }, 1000);
      });
      nextReview.classList.add("active");
      previousReview.classList.remove("active");
    }
  });
};

exports.activateTestimonies = activateTestimonies;
},{"./hotels.js":"11939eec345717ab6a3fb9affb60bd10"}],"11939eec345717ab6a3fb9affb60bd10":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hotels = void 0;
const hotels = [{
  name: "hotel tulemar",
  rating: 9.7,
  votes: 32,
  images: ["tulemar-1", "tulemar-2", "tulemar-3"],
  location: "Manuel Antonio, Costa Rica",
  id: 1,
  testimonies: [{
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "MICHEL GIMENEZ",
    date: "Sept 23, 2020",
    rating: 8.7,
    image: "user-1.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "CARLA KUMBERG",
    date: "Dic 23, 2019",
    rating: 9.1,
    image: "user-2.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "JOSEFINA DRAM",
    date: "Oct 23, 2018",
    rating: 7.0,
    image: "user-8.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "JOHN HALF",
    date: "Mar 22, 2017",
    rating: 6.4,
    image: "user-7.jpg"
  }]
}, {
  name: "hotel belvedere",
  rating: 5.3,
  votes: 432,
  images: ["belvedere-1", "belvedere-2", "belvedere-3"],
  location: "Riccione, Italia",
  id: 2,
  testimonies: [{
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "MICHEL GIMENEZ",
    date: "Sept 23, 2020",
    rating: 8.7,
    image: "user-1.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "CARLA KUMBERG",
    date: "Dic 23, 2019",
    rating: 9.1,
    image: "user-2.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "JOSEFINA DRAM",
    date: "Oct 23, 2018",
    rating: 7.0,
    image: "user-8.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "JOHN HALF",
    date: "Mar 22, 2017",
    rating: 6.4,
    image: "user-7.jpg"
  }]
}, {
  name: "hotel viroth",
  rating: 3.4,
  votes: 654,
  images: ["viroth-1", "viroth-2", "viroth-3"],
  location: "Siem Rap, Camboya",
  id: 3,
  testimonies: [{
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "MICHEL GIMENEZ",
    date: "Sept 23, 2020",
    rating: 8.7,
    image: "user-1.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "CARLA KUMBERG",
    date: "Dic 23, 2019",
    rating: 9.1,
    image: "user-2.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "JOSEFINA DRAM",
    date: "Oct 23, 2018",
    rating: 7.0,
    image: "user-8.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "JOHN HALF",
    date: "Mar 22, 2017",
    rating: 6.4,
    image: "user-7.jpg"
  }]
}, {
  name: "hotel amanda",
  rating: 7.9,
  votes: 24,
  images: ["amanda-1", "amanda-2", "amanda-3"],
  location: "Hengchung, Taiwán",
  id: 4,
  testimonies: [{
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "MICHEL GIMENEZ",
    date: "Sept 23, 2020",
    rating: 8.7,
    image: "user-1.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "CARLA KUMBERG",
    date: "Dic 23, 2019",
    rating: 9.1,
    image: "user-2.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "JOSEFINA DRAM",
    date: "Oct 23, 2018",
    rating: 7.0,
    image: "user-8.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "JOHN HALF",
    date: "Mar 22, 2017",
    rating: 6.4,
    image: "user-7.jpg"
  }]
}, {
  name: "hotel tuxerhof",
  rating: 9.2,
  votes: 472,
  images: ["tuxerhof-1", "tuxerhof-2", "tuxerhof-3"],
  location: "Tux, Austria",
  id: 5,
  testimonies: [{
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "MICHEL GIMENEZ",
    date: "Sept 23, 2020",
    rating: 8.7,
    image: "user-1.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "CARLA KUMBERG",
    date: "Dic 23, 2019",
    rating: 9.1,
    image: "user-2.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "JOSEFINA DRAM",
    date: "Oct 23, 2018",
    rating: 7.0,
    image: "user-8.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "JOHN HALF",
    date: "Mar 22, 2017",
    rating: 6.4,
    image: "user-7.jpg"
  }]
}, {
  name: "hotel quarter",
  rating: 4.6,
  votes: 347,
  images: ["quarter-1", "quarter-2", "quarter-3"],
  location: "Charleston, Estados Unidos",
  id: 6,
  testimonies: [{
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "MICHEL GIMENEZ",
    date: "Sept 23, 2020",
    rating: 8.7,
    image: "user-1.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "CARLA KUMBERG",
    date: "Dic 23, 2019",
    rating: 9.1,
    image: "user-2.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "JOSEFINA DRAM",
    date: "Oct 23, 2018",
    rating: 7.0,
    image: "user-8.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "JOHN HALF",
    date: "Mar 22, 2017",
    rating: 6.4,
    image: "user-7.jpg"
  }]
}, {
  name: "hotel pedregal",
  rating: 8.9,
  votes: 321,
  images: ["pedregal-1", "pedregal-2", "pedregal-3"],
  location: "Cabo San Lucas, Mexico",
  id: 7,
  testimonies: [{
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "MICHEL GIMENEZ",
    date: "Sept 23, 2020",
    rating: 8.7,
    image: "user-1.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "CARLA KUMBERG",
    date: "Dic 23, 2019",
    rating: 9.1,
    image: "user-2.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "JOSEFINA DRAM",
    date: "Oct 23, 2018",
    rating: 7.0,
    image: "user-8.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "JOHN HALF",
    date: "Mar 22, 2017",
    rating: 6.4,
    image: "user-7.jpg"
  }]
}, {
  name: "hotel belmond",
  rating: 1.5,
  votes: 356,
  images: ["belmond-1", "belmond-2", "belmond-3"],
  location: "Cuzco, Perú",
  id: 8,
  testimonies: [{
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "MICHEL GIMENEZ",
    date: "Sept 23, 2020",
    rating: 8.7,
    image: "user-1.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "CARLA KUMBERG",
    date: "Dic 23, 2019",
    rating: 9.1,
    image: "user-2.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "JOSEFINA DRAM",
    date: "Oct 23, 2018",
    rating: 7.0,
    image: "user-8.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "JOHN HALF",
    date: "Mar 22, 2017",
    rating: 6.4,
    image: "user-7.jpg"
  }]
}, {
  name: "hotel cappadocia",
  rating: 7.3,
  votes: 753,
  images: ["cappadocia-1", "cappadocia-2", "cappadocia-3"],
  location: "Urgup, Turkey",
  id: 9,
  testimonies: [{
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "MICHEL GIMENEZ",
    date: "Sept 23, 2020",
    rating: 8.7,
    image: "user-1.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "CARLA KUMBERG",
    date: "Dic 23, 2019",
    rating: 9.1,
    image: "user-2.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "JOSEFINA DRAM",
    date: "Oct 23, 2018",
    rating: 7.0,
    image: "user-8.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "JOHN HALF",
    date: "Mar 22, 2017",
    rating: 6.4,
    image: "user-7.jpg"
  }]
}, {
  name: "hotel hanoi",
  rating: 5.3,
  votes: 32,
  images: ["hanoi-1", "hanoi-2", "hanoi-3"],
  location: "Hanoi, Vietnam",
  id: 10,
  testimonies: [{
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "MICHEL GIMENEZ",
    date: "Sept 23, 2020",
    rating: 8.7,
    image: "user-1.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "CARLA KUMBERG",
    date: "Dic 23, 2019",
    rating: 9.1,
    image: "user-2.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "JOSEFINA DRAM",
    date: "Oct 23, 2018",
    rating: 7.0,
    image: "user-8.jpg"
  }, {
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    name: "JOHN HALF",
    date: "Mar 22, 2017",
    rating: 6.4,
    image: "user-7.jpg"
  }]
}];
exports.hotels = hotels;
},{}],"c8f44aad3388848cc317b1fdb2975557":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activateBookmark = void 0;

var _state = require("./state.js");

const activateBookmark = hotel => {
  const bookmarkContainer = document.querySelector(".app__content-details-bookmark");
  const bookmarkIcon = document.querySelector(".favorite"); // Al renderizarse la informacion del hotel lo primero que quiero es saber si este hotel esta como favorito o no para renderizar un icono u otro.

  let bookmarked;
  bookmarked = _state.state.bookmarks.filter(bookmark => {
    return bookmark.id === hotel.id;
  });

  if (bookmarked.length === 0) {
    bookmarkIcon.setAttribute("xlink:href", "./img/sprite.svg#icon-bookmarked");
    (0, _state.initiateBookmarks)();
  }

  if (bookmarked.length > 0) {
    bookmarkIcon.setAttribute("xlink:href", "./img/sprite.svg#icon-bookmark-fill");
    (0, _state.initiateBookmarks)();
  }

  _state.state.hotel = hotel;
  bookmarkContainer.addEventListener("click", e => {
    bookmarked = _state.state.bookmarks.filter(bookmark => {
      return bookmark.id === hotel.id;
    }); // Agrego el item a bookmarks del state y localStorage en caso de que no este agregado

    if (bookmarked.length === 0) {
      _state.state.bookmarks.push(hotel);

      bookmarkIcon.setAttribute("xlink:href", "./img/sprite.svg#icon-bookmark-fill");
      updateBookmarks();
    } // En caso de que ya este agregado a bookmarks, procedo a eliminarlo del localstorage y del state


    if (bookmarked.length > 0) {
      const index = _state.state.bookmarks.findIndex(hotelbookmarked => hotelbookmarked.id === hotel.id);

      _state.state.bookmarks.splice(index, 1);

      if (hotel.id === _state.state.hotel.id) _state.state.hotel.bookmarked = false;
      bookmarkIcon.setAttribute("xlink:href", "./img/sprite.svg#icon-bookmarked");
      updateBookmarks();
    }
  });
};

exports.activateBookmark = activateBookmark;

const updateBookmarks = () => {
  localStorage.setItem("bookmarks", JSON.stringify(_state.state.bookmarks));
  (0, _state.initiateBookmarks)();
};
},{"./state.js":"11b6e3460c5e8934d9c6cfd6c9252736"}],"11b6e3460c5e8934d9c6cfd6c9252736":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initiateBookmarks = exports.state = void 0;
const state = {
  bookmarks: [],
  hotel: {}
};
exports.state = state;

const initiateBookmarks = () => {
  let storage = localStorage.getItem("bookmarks");
  let iconSpan = document.querySelector(".bookmark-notification");

  if (storage) {
    state.bookmarks = JSON.parse(storage);
    iconSpan.innerHTML = `${JSON.parse(storage).length}`;
  }

  if (!storage) {
    iconSpan.innerHTML = `0`;
  }
};

exports.initiateBookmarks = initiateBookmarks;
},{}],"ec8b31275e6f771c8942f3e9f5049281":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + require('./relative-path')("bceeb79d3ab5e8c5", "7f6ccd725553c36b");
},{"./bundle-url":"2146da1905b95151ed14d455c784e7b7","./relative-path":"1b9943ef25c7bbdf0dd1b9fa91880a6c"}],"2146da1905b95151ed14d455c784e7b7":[function(require,module,exports) {
"use strict";

/* globals document:readonly */
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.


function getOrigin(url) {
  let matches = ('' + url).match(/(https?|file|ftp):\/\/[^/]+/);

  if (!matches) {
    throw new Error('Origin not found');
  }

  return matches[0];
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;
},{}],"1b9943ef25c7bbdf0dd1b9fa91880a6c":[function(require,module,exports) {
"use strict";

var resolve = require('./bundle-manifest').resolve;

module.exports = function (fromId, toId) {
  return relative(dirname(resolve(fromId)), resolve(toId));
};

function dirname(_filePath) {
  if (_filePath === '') {
    return '.';
  }

  var filePath = _filePath[_filePath.length - 1] === '/' ? _filePath.slice(0, _filePath.length - 1) : _filePath;
  var slashIndex = filePath.lastIndexOf('/');
  return slashIndex === -1 ? '.' : filePath.slice(0, slashIndex);
}

function relative(from, to) {
  if (from === to) {
    return '';
  }

  var fromParts = from.split('/');

  if (fromParts[0] === '.') {
    fromParts.shift();
  }

  var toParts = to.split('/');

  if (toParts[0] === '.') {
    toParts.shift();
  } // Find where path segments diverge.


  var i;
  var divergeIndex;

  for (i = 0; (i < toParts.length || i < fromParts.length) && divergeIndex == null; i++) {
    if (fromParts[i] !== toParts[i]) {
      divergeIndex = i;
    }
  } // If there are segments from "from" beyond the point of divergence,
  // return back up the path to that point using "..".


  var parts = [];

  for (i = 0; i < fromParts.length - divergeIndex; i++) {
    parts.push('..');
  } // If there are segments from "to" beyond the point of divergence,
  // continue using the remaining segments.


  if (toParts.length > divergeIndex) {
    parts.push.apply(parts, toParts.slice(divergeIndex));
  }

  return parts.join('/');
}

module.exports._dirname = dirname;
module.exports._relative = relative;
},{"./bundle-manifest":"ba8df6b71e73837c465d69bebde6e64d"}],"72607bb3e4b2d5ee4590dffdb0900457":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayRentals = void 0;

var _spinner = require("./spinner.js");

var _rentals = require("./rentals.js");

let content = document.querySelector(".app__content");

const displayRentals = () => {
  content.innerHTML = "";
  (0, _spinner.renderSpinner)();

  let markUp = _rentals.rentals.map(rental => {
    return `<div class="app__rentals-rental">
    <img src="./img/${rental.images[0]}.jpg" alt="">
  <img src="./img/${rental.images[1]}.jpg" alt="">
  <img src="./img/${rental.images[2]}.jpg" alt="">
  <div class="app__rentals-rental-details">
    <h2>${rental.name.toUpperCase()}</h2>
    <div class="app__rentals-rental-details-price">
      <p>$ ${rental.price}  <span>/hora</span></p>
    </div>
  </div>
  
  <div class="app__rentals-rental-details-tag">
   ${rental.tag === "airplane" ? `<ion-icon name="airplane-outline"></ion-icon>` : `<ion-icon name="car-sport-outline"></ion-icon>`}
  </div>
    </div>`;
  }).join("");

  setTimeout(() => {
    (0, _spinner.deleteSpinner)();
    content.innerHTML = `<div class="app__rentals">
    ${markUp}
    </div>`;
  }, 1000);
};

exports.displayRentals = displayRentals;
},{"./spinner.js":"340e904e425283c916ec404ddb1d2a6f","./rentals.js":"002da0ce35505ea42f51e34d5618b92a"}],"002da0ce35505ea42f51e34d5618b92a":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rentals = void 0;
const rentals = [{
  name: "Lamborghini Huracan",
  images: ["lambo-1", "lambo-2", "lambo-3"],
  price: "300",
  tag: "car"
}, {
  name: "Porsche Cayman GT4",
  images: ["porsche-1", "porsche-2", "porsche-3"],
  price: "200",
  tag: "car"
}, {
  name: "Jet global",
  images: ["jet-1", "jet-2", "jet-3"],
  price: "800",
  tag: "airplane"
}, {
  name: "Rolls Royce Ghost",
  images: ["royce-1", "royce-2", "royce-3"],
  price: "125",
  tag: "car"
}];
exports.rentals = rentals;
},{}],"e7ad69c400a0e6e245587ece8ed95d3c":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showInitialContent = void 0;

const showInitialContent = () => {
  let app = document.querySelector(".app__content");
  app.innerHTML = `<div class="app__content-initial">
    <p>
      Por favor busque el hotel en el que le gustaria hospedarse o
      simplemente seleccione nuestro menu de <span>HOTELES</span> para ver
      todos los que se encuentran disponibles 😃
    </p>
  </div>`;
};

exports.showInitialContent = showInitialContent;
},{}],"cccd03d524e6404cf97b89526adff956":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchAddEventListener = void 0;

var _hotels = require("./hotels.js");

var _renderHotels = require("./renderHotels.js");

let formSearch = document.querySelector(".app__nav-form");
let inputSearch = document.querySelector(".search-hotel");
const navItems = document.querySelectorAll(".app__sidebar-links-link");

const searchAddEventListener = () => {
  formSearch.addEventListener("submit", e => {
    e.preventDefault();
    const value = inputSearch.value.toLowerCase();

    const filteredHotels = _hotels.hotels.filter(hotel => {
      return hotel.name.startsWith(value);
    });

    inputSearch.value = "";
    navItems.forEach(item => {
      item.classList.remove("app__sidebar-links-link--active");
    });
    (0, _renderHotels.displayHotelsAndPagination)(0, filteredHotels);
  });
};

exports.searchAddEventListener = searchAddEventListener;
},{"./hotels.js":"11939eec345717ab6a3fb9affb60bd10","./renderHotels.js":"2dbf958396fb4a213bc8d25301295172"}]},{},["c3f593e9ba764da067eaa63f8413a6f6","d5453ddf98b92169eb6f5f7923a02919","9ec4b324fc4052d8f2f7a25a2c519fc9"], null)

//# sourceMappingURL=app.7d4f7360.js.map
