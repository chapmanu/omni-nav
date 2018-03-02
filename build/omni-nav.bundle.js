/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Web Widget Pattern
 * Based on http://alexmarandon.com/articles/web_widget_jquery/
 */
var OmniNav = __webpack_require__(1);

(function () {

    // Localize jQuery variable
    var jQuery;
    var jqSource = 'https://code.jquery.com/jquery-2.2.4.min.js';
    var jqHash = 'sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=';

    /******** Load jQuery if not present *********/
    if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.4.2') {
        var script_tag = document.createElement('script');
        script_tag.setAttribute("src", jqSource);
        script_tag.setAttribute("integrity", jqHash);
        script_tag.setAttribute("crossorigin", "anonymous");

        if (script_tag.readyState) {
            script_tag.onreadystatechange = function () {
                // For old versions of IE
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    scriptLoadHandler();
                }
            };
        } else {
            // Other browsers
            script_tag.onload = scriptLoadHandler;
        }
        // Try to find the head, otherwise default to the documentElement
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
    } else {
        // The jQuery version on the window is the one we want to use
        jQuery = window.jQuery;
        main();
    }

    /******** Called once jQuery has loaded ******/
    function scriptLoadHandler() {
        // Restore $ and window.jQuery to their previous values and store the
        // new jQuery in our local jQuery variable
        jQuery = window.jQuery.noConflict(true);
        // Call our main function
        main();
    }

    /******** Our main function ********/
    function main() {
        jQuery(document).ready(function ($) {
            var $omniNavContainter = $('nav#omni-nav');
            var target = $omniNavContainter.data('target');
            var $omniNav = OmniNav.build($, target);
            $('nav#omni-nav').replaceWith($omniNav);
        });
    }
})(); // We call our anonymous function immediately

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * OmniNav Module
 */
var OmniNav = function () {
  // Constants
  var HOME_PAGE_URL = 'https://www.chapman.edu/';
  var LOGO_URL = 'https://www.chapman.edu/_assets/chapman_logo_horizontal_color-899d76a351f8eb188ab8100081a3640f5c4bb1ed26e0999f72922d290f9cae5e.png';

  // Globals
  var $;

  // Public Methods
  var build = function build(jqLocalized, target) {
    init(jqLocalized);
    target = target ? target : 'default';

    var $omniNav = buildNav(target);
    return $omniNav;
  };

  // Private Methods
  var init = function init(jqLocalized) {
    $ = jqLocalized;
  };

  var buildNav = function buildNav(target) {
    console.log("Building OmniNav for target: " + target);
    var $omniNav = $('#omni-nav-v2');
    var $primary = buildPrimaryNav();
    $omniNav.append($primary);
    return $omniNav;
  };

  var buildLogoLink = function buildLogoLink() {
    var $a = $('<a />').attr({
      class: 'primary-logo',
      href: HOME_PAGE_URL,
      title: 'Chapman University Website Home Page'
    });
    var $img = $('<img />').attr('src', LOGO_URL);
    $a.append($img);
    return $a;
  };

  var buildPrimaryNav = function buildPrimaryNav() {
    var $primary = $('<div />').attr('id', 'primary-nav');
    var $offCanvas = $('<div />').attr('class', 'nav-container left-nav-container');
    var $offCanvasTrigger = $('<a />').attr({
      class: 'off-canvas-trigger primary-nav-icon',
      href: '#',
      id: 'js-off-canvas-trigger',
      role: 'button',
      title: 'Access links to the pages within this section of the website and to other sections of the website',
      'aria-label': 'Access links to the pages within this section of the website and to other sections of the website'
    });

    var $offCanvasIcon = buildOffCanvasSVG();
    $offCanvasTrigger.append($offCanvasIcon);
    $offCanvas.append($offCanvasTrigger);
    var $logo = buildLogoContainer();
    $primary.append($offCanvas, $logo);
    return $primary;
  };

  var buildLogoContainer = function buildLogoContainer() {
    var $logoContainer = $('<div />').attr('class', 'nav-container logo-container');
    var wrapper = $('<div />').attr('class', 'cu-logo-wrapper');
    var primaryLogo = $('<div />').attr('class', 'primary-logo');
    var logoLink = $('<a />').attr({
      href: HOME_PAGE_URL,
      title: "Chapman University Website Home Page"
    });
    var svgLogo = buildChapmanLogoSVG();
    logoLink.append(svgLogo);
    primaryLogo.append(logoLink);
    wrapper.append(primaryLogo);
    return $logoContainer.append(wrapper);
  };

  var buildOffCanvasSVG = function buildOffCanvasSVG() {
    // Using document.createElementNS("http://www.w3.org/2000/svg", "svg") didn't work here to create inline SVGs
    var paths = '<path d="M1 3h14v2h-14v-2z"></path><path d="M1 7h14v2h-14v-2z"></path><path d="M1 11h14v2h-14v-2z"></path>';
    var $svg = '<svg xmlns="http://www.w3.org/2000/svg" class="hamburger-icon" viewBox="0 0 16 16">' + paths + '</svg>';
    return $svg;
  };

  var buildChapmanLogoSVG = function buildChapmanLogoSVG() {
    var defs = "<defs><style>.cls-1{fill:#a50034;}.cls-2{fill:#231f20;}</style></defs>";
    var paths = '<path class="cls-1" d="M13.04 14.46L0 27.49V14.46h13.04zM0 13.62V.59l13.04 13.03H0zM27.49 0L14.46 13.03V0h13.03zM13.62 13.03L.59 0h13.03v13.03zM15.05 13.62L28.08.59v13.03H15.05zM28.08 14.46v13.03L15.05 14.46h13.03zM13.62 15.05L.59 28.08h13.03V15.05zM14.46 15.05v13.03h13.03L14.46 15.05z"/><g><path class="cls-2" d="M48 10.33c-.66-2.52-2.06-3.2-4.21-3.2-3.94 0-5.7 3-5.7 6.42 0 4.23 2.17 7 5.72 7 2.45 0 3.59-1.18 4.67-3.48l.52.09c-.28.94-.77 2.7-1.12 3.53a19.67 19.67 0 0 1-4.12.61c-5.54 0-7.87-3.77-7.87-7.25 0-4.51 3.48-7.65 8.28-7.65a16.32 16.32 0 0 1 3.97.6c.18 1.21.26 2.17.39 3.31zM61.73 13V9.91c0-2.39-.18-2.54-1.93-2.67v-.51h5.78v.5c-1.84.13-2 .29-2 2.67v7.9c0 2.39.18 2.54 2 2.67V21h-5.95v-.5c1.93-.13 2.1-.29 2.1-2.67V13.9h-7.6v3.9c0 2.39.18 2.54 2 2.67V21h-5.81v-.5c1.8-.13 2-.29 2-2.67V9.91c0-2.39-.18-2.54-2.06-2.67v-.51H56v.5c-1.71.13-1.88.29-1.88 2.67V13h7.6zM75.28 20.47l.7-.09c.81-.09.9-.33.68-1-.15-.53-.79-2.23-1.4-3.81h-4.45c-.22.57-.79 2.28-1.1 3.2-.42 1.27-.22 1.56.77 1.64l.66.07V21h-4.69v-.5c1.42-.15 1.6-.29 2.37-2.23L73.33 6.6l.5-.2 1.56 4.16c1 2.78 2 5.57 2.85 7.8.7 1.84 1 2 2.34 2.1V21h-5.3v-.5zm-4.18-5.74H75l-2-5.39zM85.25 17.8c0 2.39.18 2.54 2.3 2.67V21h-6.11v-.5c1.8-.13 2-.29 2-2.67V9.91c0-2.39-.17-2.54-1.86-2.67v-.51h5.52a6 6 0 0 1 3.64.92 3.52 3.52 0 0 1 1.4 3 4.52 4.52 0 0 1-4.27 4.4 8.1 8.1 0 0 1-1 0l-1.62-.42v3.17zm0-3.77a4.43 4.43 0 0 0 1.64.26c1.38 0 3.18-.72 3.18-3.57 0-2.39-1.25-3.35-3.51-3.35a3.48 3.48 0 0 0-1.12.11c-.13 0-.2.15-.2.59v6zM97.53 6.73l5.3 11.27L108 6.73h3.62v.5c-1.91.15-2 .24-2 2.67l.18 7.89c.07 2.45.13 2.52 2.06 2.67V21h-5.78v-.5c1.92-.18 1.92-.25 1.92-2.7l-.06-8.8h-.09l-5.37 11.77h-.55l-5.06-11.5-.22 6.11a27.5 27.5 0 0 0 0 3.94c.11.81.64 1 2.06 1.14V21h-5.19v-.5c1.23-.11 1.69-.33 1.84-1.14a35.15 35.15 0 0 0 .37-4.16l.27-4.63c.15-2.94 0-3.18-2.06-3.33v-.51h3.62zM121.55 20.47l.7-.09c.81-.09.9-.33.68-1-.15-.53-.79-2.23-1.4-3.81h-4.45c-.22.57-.79 2.28-1.1 3.2-.42 1.27-.22 1.56.77 1.64l.66.07V21h-4.69v-.5c1.42-.15 1.6-.29 2.37-2.23L119.6 6.6l.5-.2 1.56 4.16c1 2.78 2 5.57 2.85 7.8.7 1.84 1 2 2.34 2.1V21h-5.3v-.5zm-4.19-5.74h3.88l-1.93-5.39zM140.73 21.13h-.57l-9.51-11.55v5.59a34.11 34.11 0 0 0 .18 4.16c.11.77.7 1.07 2.15 1.14V21h-5.26v-.5c1.2 0 1.77-.37 1.88-1.14a34 34 0 0 0 .18-4.16v-4.79c0-1.58 0-1.93-.42-2.43a2.42 2.42 0 0 0-1.93-.75v-.5h3.2l9.23 11v-5.19a33.94 33.94 0 0 0-.18-4.16c-.11-.77-.7-1.07-2.15-1.14v-.51h5.26v.5c-1.21 0-1.77.37-1.88 1.14a33.94 33.94 0 0 0-.18 4.16v8.59zM154.83 6.73v.5c-1.75.13-1.93.29-1.93 2.67v4.58a7.47 7.47 0 0 0 .92 4.25 3.59 3.59 0 0 0 3.18 1.52 3.73 3.73 0 0 0 3.22-1.64 9.67 9.67 0 0 0 1-4.87v-1.18a34.41 34.41 0 0 0-.22-4.18c-.11-.77-.7-1.07-2.15-1.14v-.51h5.26v.5c-1.21 0-1.77.37-1.88 1.14a34.41 34.41 0 0 0-.18 4.18V14c0 2.54-.39 4.34-1.67 5.7a6.15 6.15 0 0 1-7.65.46c-1.16-.94-1.69-2.43-1.69-4.93V9.91c0-2.39-.18-2.54-2-2.67v-.51h5.79zM178.32 21.13h-.57l-9.51-11.55v5.59a34 34 0 0 0 .17 4.16c.11.77.7 1.07 2.15 1.14V21h-5.26v-.5c1.21 0 1.77-.37 1.88-1.14a34.23 34.23 0 0 0 .17-4.16v-4.79c0-1.58 0-1.93-.42-2.43a2.42 2.42 0 0 0-1.93-.74v-.51h3.2l9.22 11v-5.19a34.24 34.24 0 0 0-.17-4.16c-.11-.77-.7-1.07-2.15-1.14v-.51h5.26v.5c-1.21 0-1.78.37-1.88 1.14a34.22 34.22 0 0 0-.17 4.16v8.59zM185.51 17.8c0 2.39.17 2.54 2 2.67V21h-5.81v-.5c1.8-.13 2-.29 2-2.67V9.91c0-2.39-.17-2.54-2-2.67v-.51h5.78v.5c-1.8.13-2 .29-2 2.67v7.9zM195.24 21.11c-1.49-3.92-3.59-9.33-4.54-11.77-.7-1.82-1-2-2.32-2.1v-.51h5.32v.5l-.7.09c-.81.11-.94.33-.7 1 .57 1.62 2.26 5.94 3.86 10 1.14-3 3-8 3.51-9.42.42-1.25.2-1.53-.79-1.64l-.66-.07v-.46H203v.5c-1.47.15-1.66.31-2.48 2.24-.29.68-3 7.19-4.65 11.63h-.66zM205.9 9.91c0-2.39-.17-2.54-1.93-2.67v-.51h9.6c0 .37.13 2 .24 3.2l-.55.07a4 4 0 0 0-.79-2c-.35-.37-1.07-.53-2.41-.53h-1.67c-.61 0-.66 0-.66.68v5H210c1.88 0 2-.13 2.17-1.75h.55v4.34h-.55a2.35 2.35 0 0 0-.46-1.49 2.77 2.77 0 0 0-1.71-.28h-2.21v3.88c0 1.25.13 1.91.55 2.17a5 5 0 0 0 2.23.26c1.25 0 2.28-.11 2.76-.63a6.08 6.08 0 0 0 1.05-2.15l.55.07c-.11.61-.59 2.85-.77 3.44h-10.41v-.5c2-.13 2.15-.29 2.15-2.67V9.91zM220 17.8c0 2.39.17 2.54 2 2.67V21h-5.83v-.5c1.84-.13 2-.29 2-2.67V9.91c0-2.39-.17-2.54-1.93-2.67v-.51h5.57a6.4 6.4 0 0 1 3.46.75 3.19 3.19 0 0 1 1.45 2.8 4.09 4.09 0 0 1-2.89 3.83c.39.66 1.29 2.17 2 3.13a20.17 20.17 0 0 0 1.84 2.41 2.83 2.83 0 0 0 1.64 1.1v.42H229c-2.52-.07-3.29-.83-4.12-2-.68-1-1.6-2.61-2.21-3.64a1.4 1.4 0 0 0-1.38-.79H220v3.06zm0-3.73h1.27a3.24 3.24 0 0 0 2.19-.59 3.53 3.53 0 0 0 1.27-2.89 3.06 3.06 0 0 0-3.31-3.22 3.87 3.87 0 0 0-1.23.11c-.13 0-.2.15-.2.59v6zM230.55 17.12c.35 1 1.47 3.46 3.79 3.46a2.59 2.59 0 0 0 2.72-2.83c0-1.86-1.42-2.63-2.83-3.31-.72-.35-3.68-1.38-3.68-4 0-2.17 1.64-4 4.51-4a6.44 6.44 0 0 1 1.82.29 8.55 8.55 0 0 0 .83.24c.09.77.22 1.64.39 3l-.55.07c-.37-1.29-1-2.83-3-2.83a2.28 2.28 0 0 0-2.37 2.43c0 1.62 1.16 2.34 2.83 3.09 1.45.64 3.75 1.53 3.75 4.25 0 2.54-2.08 4.4-4.86 4.4a7 7 0 0 1-2.08-.33c-.55-.17-.94-.35-1.21-.46-.17-.57-.42-2.13-.64-3.31zM244.28 17.8c0 2.39.17 2.54 2 2.67V21h-5.78v-.5c1.8-.13 2-.29 2-2.67V9.91c0-2.39-.17-2.54-2-2.67v-.51h5.78v.5c-1.8.13-2 .29-2 2.67v7.9zM254.73 17.8c0 2.39.18 2.54 2.32 2.67V21h-6.4v-.5c2.06-.13 2.24-.29 2.24-2.67V7.46h-1c-2 0-2.54.29-2.87.7a5.81 5.81 0 0 0-.77 1.88h-.55c.09-1.34.22-2.74.26-3.86h.31a1 1 0 0 0 1.14.55h9a1.05 1.05 0 0 0 1-.55h.31c0 .92.13 2.52.24 3.79l-.56.03a4.26 4.26 0 0 0-.79-2c-.37-.42-1.05-.57-2.41-.57h-1.47V17.8zM267.95 17.8c0 2.39.17 2.54 2.28 2.67V21h-6.31v-.5c2-.13 2.19-.29 2.19-2.67V15.3a2.27 2.27 0 0 0-.48-1.31c-1-1.71-1.84-3.29-2.78-4.91s-1-1.69-2.3-1.84v-.51h5.28v.5l-1 .13c-.55.09-.7.28-.33 1 1 1.84 2 3.66 3.07 5.46.92-1.75 1.91-3.55 2.72-5.35.37-.79.2-1-.63-1.1l-.88-.11v-.53h4.82v.5c-1.47.13-1.58.42-2.5 1.86s-1.82 3-2.76 4.8a1.89 1.89 0 0 0-.37 1.18v2.73z"/></g>';
    var $svgLogo = '<svg class="chapman-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 273.58 28.08">' + defs + paths + '</svg>';
    return $svgLogo;
  };

  // Public API
  return {
    build: build
  };
}();

module.exports = OmniNav;

/***/ })
/******/ ]);