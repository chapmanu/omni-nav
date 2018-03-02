/*
 * OmniNav Module
 */
var OmniNav = (function() {
  // Constants
  var HOME_PAGE_URL = 'https://www.chapman.edu/';
  var LOGO_URL = 'https://www.chapman.edu/_assets/chapman_logo_horizontal_color-899d76a351f8eb188ab8100081a3640f5c4bb1ed26e0999f72922d290f9cae5e.png';

  // Globals
  var $;

  // Public Methods
  var build = function(jqLocalized, target) {
    init(jqLocalized);
    target = target ? target : 'default';

    var $omniNav = buildNav(target);
    return $omniNav;
  }

  // Private Methods
  var init = function(jqLocalized) {
    $ = jqLocalized;
  };

  var buildNav = function(target) {
    console.log("Building OmniNav for target: " + target);
    var $omniNav = $('#omni-nav-v2');
    var $primary = buildPrimaryNav();
    $omniNav.append($primary);
    return $omniNav;
  };

  var buildLogoLink = function() {
    var $a = $('<a />').attr({
        class: 'primary-logo',
        href: HOME_PAGE_URL,
        title: 'Chapman University Website Home Page'
    });
    var $img = $('<img />').attr('src', LOGO_URL);
    $a.append($img);
    return $a;
  };

  var buildPrimaryNav = function() {
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
    var $logo = buildLogoLink();
    $primary.append($offCanvas, $logo);
    return $primary;
  }

  var buildOffCanvasSVG = function() {
    // Using document.createElementNS("http://www.w3.org/2000/svg", "svg") didn't work here to create inline SVGs
    var $paths = '<path d="M1 3h14v2h-14v-2z"></path><path d="M1 7h14v2h-14v-2z"></path><path d="M1 11h14v2h-14v-2z"></path>';
    var $svg = '<svg xmlns="http://www.w3.org/2000/svg" class="hamburger-icon" viewBox="0 0 16 16">' + $paths + '</svg>';
    return $svg;
  }

  var buildChapmanLogoSVG = function() {

  }

  // Public API
  return {
    build: build
  };
})();

module.exports = OmniNav;
