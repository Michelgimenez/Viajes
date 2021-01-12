// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
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
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/js/paginate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEventListenersInPagination = exports.paginate = void 0;

var _renderHotels = require("./renderHotels.js");

var paginate = function paginate(hotels) {
  var itemsPerPage = 4;
  var numberOfPages = Math.ceil(hotels.length / itemsPerPage);
  var newHotels = Array.from({
    length: numberOfPages
  }, function (_, index) {
    var start = index * itemsPerPage;
    return hotels.slice(start, start + itemsPerPage);
  });
  return newHotels;
};

exports.paginate = paginate;

var addEventListenersInPagination = function addEventListenersInPagination(buttonsContainer, index, pages) {
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
},{"./renderHotels.js":"src/js/renderHotels.js"}],"src/js/spinner.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteSpinner = exports.renderSpinner = void 0;

var renderSpinner = function renderSpinner() {
  var main = document.querySelector(".app__content");
  var markup = " <div class=\"spinner\">\n      <svg>\n        <use xlink:href=\"img/sprite.svg#icon-loader\"></use>\n      </svg>\n    </div>";
  main.innerHTML = markup;
};

exports.renderSpinner = renderSpinner;

var deleteSpinner = function deleteSpinner() {
  var spinner = document.querySelector(".spinner");
  spinner.remove();
};

exports.deleteSpinner = deleteSpinner;
},{}],"src/js/renderButtons.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderButtons = void 0;

var renderButtons = function renderButtons(container, pages, activeIndex) {
  var buttons = pages.map(function (page, index) {
    return " <button class=\"page-btn ".concat(activeIndex === index ? "active-btn" : "null", "\" data-index=").concat(index, ">").concat(index + 1, "</button>");
  });
  buttons.push(" <button class=\"next-button\"><ion-icon name=\"chevron-forward-outline\"></ion-icon></button>");
  buttons.unshift(" \n      <button class=\"prev-button\"><ion-icon name=\"chevron-back-outline\"></ion-icon></button>\n     ");
  container.innerHTML = buttons.join("");
};

exports.renderButtons = renderButtons;
},{}],"src/js/gallery.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activateGallery = void 0;
var counter;
var slides;
var nextBtn;
var prevBtn;

var activateGallery = function activateGallery() {
  slides = document.querySelectorAll(".slide");
  nextBtn = document.querySelector(".next-btn");
  prevBtn = document.querySelector(".prev-btn");
  counter = 0;
  slides.forEach(function (slide, index) {
    slide.style.left = "".concat(index * 100, "%");
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

var carousel = function carousel() {
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
    slide.style.transform = "translateX(-".concat(counter * 100, "%)");
  });
};
},{}],"src/js/hotels.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hotels = void 0;
var hotels = [{
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
},{}],"src/js/testimonies.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activateTestimonies = void 0;

var _hotels = require("./hotels.js");

var testimonies;
var buttonsContainer;
var nextReview;
var previousReview;

var activateTestimonies = function activateTestimonies(testimonies) {
  buttonsContainer = document.querySelector(".app__content-hotel-reviews-change");
  previousReview = document.querySelector(".previous-review");
  nextReview = document.querySelector(".next-review");
  var activeTestimonies = document.querySelectorAll(".active");
  nextReview.classList.add("active");
  buttonsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("next-review")) {
      var nextTestimonies = testimonies.slice(2, 4);
      activeTestimonies.forEach(function (testimonie, i) {
        testimonie.classList.remove("active");
        var testimonieContent = nextTestimonies[i];
        setTimeout(function () {
          testimonie.innerHTML = "";
          testimonie.innerHTML = "\n            <p>\n              ".concat(testimonieContent.description, "\n            </p>\n      \n            <div class=\"app__content-hotel-reviews-review-details\">\n              <img src=\"img/").concat(testimonieContent.image, "\" alt=\"\" />\n              <div class=\"app__content-hotel-reviews-review-details-user\">\n                <h3> ").concat(testimonieContent.name, "</h3>\n                <p>Sept 23, 2020</p>\n              </div>\n              <div class=\"app__content-hotel-reviews-review-details-rating\">\n                <p> ").concat(testimonieContent.rating, "</p>\n              </div>\n            </div>\n          ");
          testimonie.classList.add("active");
        }, 1000);
      });
      nextReview.classList.remove("active");
      previousReview.classList.add("active");
    }

    if (e.target.classList.contains("previous-review")) {
      var previousTestimonies = testimonies.slice(0, 2);
      activeTestimonies.forEach(function (testimonie, i) {
        testimonie.classList.remove("active");
        setTimeout(function () {
          testimonie.innerHTML = "";
          var testimonieContent = previousTestimonies[i];
          testimonie.innerHTML = "\n          <p>\n            ".concat(testimonieContent.description, "\n          </p>\n    \n          <div class=\"app__content-hotel-reviews-review-details\">\n            <img src=\"img/").concat(testimonieContent.image, "\" alt=\"\" />\n            <div class=\"app__content-hotel-reviews-review-details-user\">\n              <h3> ").concat(testimonieContent.name, "</h3>\n              <p>Sept 23, 2020</p>\n            </div>\n            <div class=\"app__content-hotel-reviews-review-details-rating\">\n              <p> ").concat(testimonieContent.rating, "</p>\n            </div>\n          </div>\n        ");
          testimonie.classList.add("active");
        }, 1000);
      });
      nextReview.classList.add("active");
      previousReview.classList.remove("active");
    }
  });
};

exports.activateTestimonies = activateTestimonies;
},{"./hotels.js":"src/js/hotels.js"}],"src/js/state.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initiateBookmarks = exports.state = void 0;
var state = {
  bookmarks: [],
  hotel: {}
};
exports.state = state;

var initiateBookmarks = function initiateBookmarks() {
  var storage = localStorage.getItem("bookmarks");
  var iconSpan = document.querySelector(".bookmark-notification");

  if (storage) {
    state.bookmarks = JSON.parse(storage);
    iconSpan.innerHTML = "".concat(JSON.parse(storage).length);
  }

  if (!storage) {
    iconSpan.innerHTML = "0";
  }
};

exports.initiateBookmarks = initiateBookmarks;
},{}],"src/js/bookmark.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activateBookmark = void 0;

var _state = require("./state.js");

var activateBookmark = function activateBookmark(hotel) {
  var bookmarkContainer = document.querySelector(".app__content-details-bookmark");
  var bookmarkIcon = document.querySelector(".favorite"); // Al renderizarse la informacion del hotel lo primero que quiero es saber si este hotel esta como favorito o no para renderizar un icono u otro.

  var bookmarked;
  bookmarked = _state.state.bookmarks.filter(function (bookmark) {
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
  bookmarkContainer.addEventListener("click", function (e) {
    bookmarked = _state.state.bookmarks.filter(function (bookmark) {
      return bookmark.id === hotel.id;
    }); // Agrego el item a bookmarks del state y localStorage en caso de que no este agregado

    if (bookmarked.length === 0) {
      _state.state.bookmarks.push(hotel);

      bookmarkIcon.setAttribute("xlink:href", "./img/sprite.svg#icon-bookmark-fill");
      updateBookmarks();
    } // En caso de que ya este agregado a bookmarks, procedo a eliminarlo del localstorage y del state


    if (bookmarked.length > 0) {
      var index = _state.state.bookmarks.findIndex(function (hotelbookmarked) {
        return hotelbookmarked.id === hotel.id;
      });

      _state.state.bookmarks.splice(index, 1);

      if (hotel.id === _state.state.hotel.id) _state.state.hotel.bookmarked = false;
      bookmarkIcon.setAttribute("xlink:href", "./img/sprite.svg#icon-bookmarked");
      updateBookmarks();
    }
  });
};

exports.activateBookmark = activateBookmark;

var updateBookmarks = function updateBookmarks() {
  localStorage.setItem("bookmarks", JSON.stringify(_state.state.bookmarks));
  (0, _state.initiateBookmarks)();
};
},{"./state.js":"src/js/state.js"}],"src/js/renderHotels.js":[function(require,module,exports) {
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

var initialApp = document.querySelector(".app__content");
var hotelsContainer;
var buttonsContainer;
var index = 0;
var pages = [];
pages = (0, _paginate.paginate)(_hotels.hotels);

var displayHotelInformation = function displayHotelInformation(hotel) {
  (0, _spinner.renderSpinner)();
  var markUp = "<div class=\"app__content-gallery slider\" data-id=".concat(hotel.id, ">\n  <ion-icon name=\"chevron-forward-outline\" class=\"next-btn\"></ion-icon>\n  <figure class=\"slide\">\n    <img src=\"./img/").concat(hotel.images[0], ".jpg\" alt=\"\" />\n  </figure>\n  <figure class=\"slide\">\n    <img src=\"./img/").concat(hotel.images[1], ".jpg\" alt=\"\" />\n  </figure>\n  <figure class=\"slide\">\n    <img src=\"./img/").concat(hotel.images[2], ".jpg\" alt=\"\" />\n  </figure>\n  <ion-icon name=\"chevron-back-outline\" class=\"prev-btn\"></ion-icon>\n</div>\n\n<div class=\"app__content-details\">\n  <div class=\"app__content-details-name\">\n    <h2>").concat(hotel.name, "</h2>\n    <div class=\"app__content-details-name-stars\">\n      ").concat(hotel.rating > 9 ? "<svg class=\"overview__icon-star\">\n      <use xlink:href=\"img/sprite.svg#icon-star\"></use>\n    </svg>\n    <svg class=\"overview__icon-star\">\n      <use xlink:href=\"img/sprite.svg#icon-star\"></use>\n    </svg>\n    <svg class=\"overview__icon-star\">\n      <use xlink:href=\"img/sprite.svg#icon-star\"></use>\n    </svg>\n    <svg class=\"overview__icon-star\">\n      <use xlink:href=\"img/sprite.svg#icon-star\"></use>\n    </svg>\n    <svg class=\"overview__icon-star\">\n      <use xlink:href=\"img/sprite.svg#icon-star\"></use>\n    </svg>" : hotel.rating < 9 && hotel.rating > 7 ? "<svg class=\"overview__icon-star\">\n    <use xlink:href=\"img/sprite.svg#icon-star\"></use>\n  </svg>\n  <svg class=\"overview__icon-star\">\n    <use xlink:href=\"img/sprite.svg#icon-star\"></use>\n  </svg>\n  <svg class=\"overview__icon-star\">\n    <use xlink:href=\"img/sprite.svg#icon-star\"></use>\n  </svg>\n  <svg class=\"overview__icon-star\">\n    <use xlink:href=\"img/sprite.svg#icon-star\"></use>\n  </svg>" : hotel.rating < 7 && hotel.rating > 5 ? "<svg class=\"overview__icon-star\">\n  <use xlink:href=\"img/sprite.svg#icon-star\"></use>\n</svg>\n<svg class=\"overview__icon-star\">\n  <use xlink:href=\"img/sprite.svg#icon-star\"></use>\n</svg>\n<svg class=\"overview__icon-star\">\n  <use xlink:href=\"img/sprite.svg#icon-star\"></use>\n</svg>" : hotel.rating < 5 && hotel.rating > 3 ? "<svg class=\"overview__icon-star\">\n<use xlink:href=\"img/sprite.svg#icon-star\"></use>\n</svg>\n<svg class=\"overview__icon-star\">\n<use xlink:href=\"img/sprite.svg#icon-star\"></use>\n</svg>" : hotel.rating < 3 ? "<svg class=\"overview__icon-star\">\n<use xlink:href=\"img/sprite.svg#icon-star\"></use>\n</svg>" : "", "\n    </div>\n  </div>\n  <div class=\"app__content-details-bookmark\">\n  <svg >\n  <use xlink:href=\"./img/sprite.svg#icon-bookmarked\" class=\"favorite\"></use>\n</svg>\n  </div>\n  <div class=\"app__content-details-location\">\n    <div class=\"app__content-details-location-details\">\n      <svg class=\"overview__icon-location\">\n        <use xlink:href=\"img/sprite.svg#icon-location-pin\"></use>\n      </svg>\n      <a href=\"#\" class=\"location-name\">").concat(hotel.location, "</a>\n    </div>\n    <div class=\"app__content-details-location-votes\">\n      <h3>").concat(hotel.rating, "</h3>\n      <p>").concat(hotel.votes, " VOTOS</p>\n    </div>\n  </div>\n</div>\n\n<div class=\"app__content-hotel\">\n  <div class=\"app__content-hotel-details\">\n    <div class=\"app__content-hotel-details-description\">\n      <p>\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi\n        nisi dignissimos debitis ratione sapiente saepe. Accusantium\n        cumque, quas, ut corporis incidunt deserunt quae architecto\n        voluptate.\n      </p>\n      <p>\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi\n        nisi dignissimos debitis ratione sapiente saepe. Accusantium\n        cumque, quas, ut corporis incidunt deserunt quae architecto\n        voluptate.\n      </p>\n    </div>\n\n    <div class=\"line\"></div>\n    <div class=\"app__content-hotel-details-features\">\n      <div class=\"feature\">\n        <ion-icon name=\"chevron-forward-outline\"> </ion-icon> Cerca de\n        la playa\n      </div>\n      <div class=\"feature\">\n        <ion-icon name=\"chevron-forward-outline\"> </ion-icon> Viaje\n        gratis al aeropuerto\n      </div>\n      <div class=\"feature\">\n        <ion-icon name=\"chevron-forward-outline\"> </ion-icon> Desayuno\n        incluido\n      </div>\n      <div class=\"feature\">\n        <ion-icon name=\"chevron-forward-outline\"> </ion-icon> Wi-fi\n        gratuito\n      </div>\n      <div class=\"feature\">\n        <ion-icon name=\"chevron-forward-outline\"> </ion-icon> Mascotas\n        permitidas\n      </div>\n      <div class=\"feature\">\n        <ion-icon name=\"chevron-forward-outline\"> </ion-icon> Perfecto\n        para familias\n      </div>\n      <div class=\"feature\">\n        <ion-icon name=\"chevron-forward-outline\"> </ion-icon> Vista al\n        mar\n      </div>\n      <div class=\"feature\">\n        <ion-icon name=\"chevron-forward-outline\"> </ion-icon> Aire\n        acondicionado\n      </div>\n    </div>\n\n    <div class=\"line\"></div>\n    <div class=\"app__content-hotel-details-recommend\">\n      <p>Michel y otras 3 personas recomiendan este hotel</p>\n      <div class=\"recommend-friends\">\n        <img\n          src=\"img/user-3.jpg\"\n          alt=\"photo\"\n          class=\"recommend__photo\"\n        />\n        <img\n          src=\"img/user-4.jpg\"\n          alt=\"photo\"\n          class=\"recommend__photo\"\n        />\n        <img\n          src=\"img/user-5.jpg\"\n          alt=\"photo\"\n          class=\"recommend__photo\"\n        />\n        <img\n          src=\"img/user-6.jpg\"\n          alt=\"photo\"\n          class=\"recommend__photo\"\n        />\n      </div>\n    </div>\n  </div>\n\n  <div class=\"app__content-hotel-reviews\">\n    ").concat(hotel.testimonies.map(function (testimonie) {
    return "<div class=\"app__content-hotel-reviews-review active\">\n      <p>\n        ".concat(testimonie.description, "\n      </p>\n\n      <div class=\"app__content-hotel-reviews-review-details\">\n        <img src=\"img/").concat(testimonie.image, "\" alt=\"\" />\n        <div class=\"app__content-hotel-reviews-review-details-user\">\n          <h3> ").concat(testimonie.name, "</h3>\n          <p>Sept 23, 2020</p>\n        </div>\n        <div class=\"app__content-hotel-reviews-review-details-rating\">\n          <p> ").concat(testimonie.rating, "</p>\n        </div>\n      </div>\n    </div>");
  }).slice(0, 2).join(""), "\n    \n    <div class=\"app__content-hotel-reviews-change\">\n      <ion-icon\n        name=\"chevron-back-outline\"\n        class=\"previous-review\"\n      ></ion-icon>\n      <ion-icon\n        name=\"chevron-forward-outline\"\n        class=\"next-review\"\n      ></ion-icon>\n    </div>\n  </div>\n</div>\n\n<div class=\"app__content-cta\">\n  <button class=\"btn\">\n    <span class=\"btn__visible\">RESERVAR AHORA</span>\n    <span class=\"btn__invisible\">4 HABITACIONES DISPONIBLES</span>\n  </button>\n</div>");
  setTimeout(function () {
    (0, _spinner.deleteSpinner)();
    initialApp.innerHTML = markUp;
    (0, _gallery.activateGallery)();
    (0, _testimonies.activateTestimonies)(hotel.testimonies);
    (0, _state.initiateBookmarks)();
    (0, _bookmark.activateBookmark)(hotel);
  }, 1000);
};

exports.displayHotelInformation = displayHotelInformation;

var addEventListenersInHotels = function addEventListenersInHotels() {
  window.addEventListener("hashchange", function (e) {
    var hash = Number(window.location.hash.slice(1));

    var hotelDetails = _hotels.hotels.filter(function (hotel) {
      return hotel.id === hash;
    });

    initialApp.innerHTML = "";
    displayHotelInformation(hotelDetails[0]);
  });
};

exports.addEventListenersInHotels = addEventListenersInHotels;

var renderHotels = function renderHotels(hotels) {
  var hotelsPerPage = hotels.map(function (hotel) {
    return "<a href=\"#".concat(hotel.id, "\" class=\"app__hotels-hotel dataset-id=").concat(hotel.id, "\">\n  <img src=\"./img/").concat(hotel.images[0], ".jpg\" alt=\"\">\n  <img src=\"./img/").concat(hotel.images[1], ".jpg\" alt=\"\">\n  <img src=\"./img/").concat(hotel.images[2], ".jpg\" alt=\"\">\n  <div class=\"app__hotels-hotel-details\">\n    <h2>").concat(hotel.name.toUpperCase(), "</h2>\n    <div class=\"app__hotels-hotel-details-location\">\n      <svg>\n        <use xlink:href=\"img/sprite.svg#icon-location-pin\"></use>\n      </svg>\n      <p href=\"#\">").concat(hotel.location, "</p>\n    </div>\n    <div class=\"app__hotels-hotel-details-stars\">\n      ").concat(hotel.rating > 9 ? "<svg class=\"overview__icon-star\">\n    <use xlink:href=\"img/sprite.svg#icon-star\"></use>\n  </svg>\n  <svg class=\"overview__icon-star\">\n    <use xlink:href=\"img/sprite.svg#icon-star\"></use>\n  </svg>\n  <svg class=\"overview__icon-star\">\n    <use xlink:href=\"img/sprite.svg#icon-star\"></use>\n  </svg>\n  <svg class=\"overview__icon-star\">\n    <use xlink:href=\"img/sprite.svg#icon-star\"></use>\n  </svg>\n  <svg class=\"overview__icon-star\">\n    <use xlink:href=\"img/sprite.svg#icon-star\"></use>\n  </svg>" : hotel.rating < 9 && hotel.rating > 7 ? "<svg class=\"overview__icon-star\">\n  <use xlink:href=\"img/sprite.svg#icon-star\"></use>\n</svg>\n<svg class=\"overview__icon-star\">\n  <use xlink:href=\"img/sprite.svg#icon-star\"></use>\n</svg>\n<svg class=\"overview__icon-star\">\n  <use xlink:href=\"img/sprite.svg#icon-star\"></use>\n</svg>\n<svg class=\"overview__icon-star\">\n  <use xlink:href=\"img/sprite.svg#icon-star\"></use>\n</svg>" : hotel.rating < 7 && hotel.rating > 5 ? "<svg class=\"overview__icon-star\">\n<use xlink:href=\"img/sprite.svg#icon-star\"></use>\n</svg>\n<svg class=\"overview__icon-star\">\n<use xlink:href=\"img/sprite.svg#icon-star\"></use>\n</svg>\n<svg class=\"overview__icon-star\">\n<use xlink:href=\"img/sprite.svg#icon-star\"></use>\n</svg>" : hotel.rating < 5 && hotel.rating > 3 ? "<svg class=\"overview__icon-star\">\n<use xlink:href=\"img/sprite.svg#icon-star\"></use>\n</svg>\n<svg class=\"overview__icon-star\">\n<use xlink:href=\"img/sprite.svg#icon-star\"></use>\n</svg>" : hotel.rating < 3 ? "<svg class=\"overview__icon-star\">\n<use xlink:href=\"img/sprite.svg#icon-star\"></use>\n</svg>" : "", "\n    </div>\n  </div>\n  \n  <div class=\"app__content-details-location-votes\">\n    <h3>").concat(hotel.rating, "</h3>\n    <p>").concat(hotel.votes, " VOTOS</p>\n  </div>\n  </a>\n  ");
  }).join("");
  return "<div class=\"app__hotels\">\n      ".concat(hotelsPerPage, "\n      <div class=\"app__hotels-pagination\">\n      <div class=\"app__hotels-pagination-buttons\"></div>\n      </div> \n      </div>");
};

exports.renderHotels = renderHotels;

var displayHotelsAndPagination = function displayHotelsAndPagination() {
  var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var filteredHotels = arguments.length > 1 ? arguments[1] : undefined;
  initialApp.innerHTML = "";
  (0, _spinner.renderSpinner)();
  pages = (0, _paginate.paginate)(filteredHotels ? filteredHotels : _hotels.hotels);

  if (pages.length === 0) {
    setTimeout(function () {
      (0, _spinner.deleteSpinner)();
      var markUp = "<div class=\"not-found\">\n    <p>No se pudo encontrar ningun hotel con ese nombre...</p>\n    </div>";
      initialApp.innerHTML = markUp;
    }, 1000);
    return;
  }

  var markUp = renderHotels(pages[index]);
  setTimeout(function () {
    (0, _spinner.deleteSpinner)();
    initialApp.innerHTML = markUp;
    buttonsContainer = document.querySelector(".app__hotels-pagination-buttons");
    (0, _renderButtons.renderButtons)(buttonsContainer, pages, index);
  }, 1000);
  setTimeout(function () {
    (0, _paginate.addEventListenersInPagination)(buttonsContainer, index, pages);
    hotelsContainer = document.querySelector(".app__hotels");
    addEventListenersInHotels(hotelsContainer);
  }, 1100);
};

exports.displayHotelsAndPagination = displayHotelsAndPagination;
},{"./paginate.js":"src/js/paginate.js","./spinner.js":"src/js/spinner.js","./renderButtons.js":"src/js/renderButtons.js","./gallery.js":"src/js/gallery.js","./testimonies.js":"src/js/testimonies.js","./bookmark.js":"src/js/bookmark.js","./hotels.js":"src/js/hotels.js","./state.js":"src/js/state.js"}],"src/js/rentals.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rentals = void 0;
var rentals = [{
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
},{}],"src/js/renderRentals.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayRentals = void 0;

var _spinner = require("./spinner.js");

var _rentals = require("./rentals.js");

var content = document.querySelector(".app__content");

var displayRentals = function displayRentals() {
  content.innerHTML = "";
  (0, _spinner.renderSpinner)();

  var markUp = _rentals.rentals.map(function (rental) {
    return "<div class=\"app__rentals-rental\">\n    <img src=\"./img/".concat(rental.images[0], ".jpg\" alt=\"\">\n  <img src=\"./img/").concat(rental.images[1], ".jpg\" alt=\"\">\n  <img src=\"./img/").concat(rental.images[2], ".jpg\" alt=\"\">\n  <div class=\"app__rentals-rental-details\">\n    <h2>").concat(rental.name.toUpperCase(), "</h2>\n    <div class=\"app__rentals-rental-details-price\">\n      <p>$ ").concat(rental.price, "  <span>/hora</span></p>\n    </div>\n  </div>\n  \n  <div class=\"app__rentals-rental-details-tag\">\n   ").concat(rental.tag === "airplane" ? "<ion-icon name=\"airplane-outline\"></ion-icon>" : "<ion-icon name=\"car-sport-outline\"></ion-icon>", "\n  </div>\n    </div>");
  }).join("");

  setTimeout(function () {
    (0, _spinner.deleteSpinner)();
    content.innerHTML = "<div class=\"app__rentals\">\n    ".concat(markUp, "\n    </div>");
  }, 1000);
};

exports.displayRentals = displayRentals;
},{"./spinner.js":"src/js/spinner.js","./rentals.js":"src/js/rentals.js"}],"src/js/nav.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initiateNavEventListeners = void 0;

var _renderHotels = require("./renderHotels.js");

var _renderRentals = require("./renderRentals.js");

var linksContainer = document.querySelector(".app__sidebar-links");
var navItems = document.querySelectorAll(".app__sidebar-links-link");

var initiateNavEventListeners = function initiateNavEventListeners() {
  linksContainer.addEventListener("click", function (e) {
    navItems.forEach(function (item) {
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
},{"./renderHotels.js":"src/js/renderHotels.js","./renderRentals.js":"src/js/renderRentals.js"}],"src/js/initialContent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showInitialContent = void 0;

var showInitialContent = function showInitialContent() {
  var app = document.querySelector(".app__content");
  app.innerHTML = "<div class=\"app__content-initial\">\n    <p>\n      Por favor busque el hotel en el que le gustaria hospedarse o\n      simplemente seleccione nuestro menu de <span>HOTELES</span> para ver\n      todos los que se encuentran disponibles \uD83D\uDE03\n    </p>\n  </div>";
};

exports.showInitialContent = showInitialContent;
},{}],"src/js/search.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchAddEventListener = void 0;

var _hotels = require("./hotels.js");

var _renderHotels = require("./renderHotels.js");

var formSearch = document.querySelector(".app__nav-form");
var inputSearch = document.querySelector(".search-hotel");
var navItems = document.querySelectorAll(".app__sidebar-links-link");

var searchAddEventListener = function searchAddEventListener() {
  formSearch.addEventListener("submit", function (e) {
    e.preventDefault();
    var value = inputSearch.value.toLowerCase();

    var filteredHotels = _hotels.hotels.filter(function (hotel) {
      return hotel.name.startsWith(value);
    });

    inputSearch.value = "";
    navItems.forEach(function (item) {
      item.classList.remove("app__sidebar-links-link--active");
    });
    (0, _renderHotels.displayHotelsAndPagination)(0, filteredHotels);
  });
};

exports.searchAddEventListener = searchAddEventListener;
},{"./hotels.js":"src/js/hotels.js","./renderHotels.js":"src/js/renderHotels.js"}],"src/js/app.js":[function(require,module,exports) {
"use strict";

var _nav = require("./nav.js");

var _initialContent = require("./initialContent.js");

var _search = require("./search.js");

var _state = require("./state.js");

var init = function init() {
  (0, _initialContent.showInitialContent)();
  (0, _nav.initiateNavEventListeners)();
  (0, _search.searchAddEventListener)();
  (0, _state.initiateBookmarks)();
};

window.addEventListener("load", init);
},{"./nav.js":"src/js/nav.js","./initialContent.js":"src/js/initialContent.js","./search.js":"src/js/search.js","./state.js":"src/js/state.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
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
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51573" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
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
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
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
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","src/js/app.js"], null)
//# sourceMappingURL=/app.77c12427.js.map