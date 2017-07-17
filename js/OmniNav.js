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
    var $omniNav = $('<nav id="omni-nav" class="post-build" />');
    var $logo = buildLogoLink();
    $omniNav.append($logo);
    return $omniNav;
  };

  var buildLogoLink = function() {
    var $a = $('<a />').attr('id', 'omni-nav-logo')
                       .attr('href', HOME_PAGE_URL)
                       .attr('title', 'Chapman University Website Home Page');
    var $img = $('<img />').attr('src', LOGO_URL);
    $a.append($img);
    return $a;
  };

  // Public API
  return {
    build: build
  };
})();

module.exports = OmniNav;
