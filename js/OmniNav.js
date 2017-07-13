/*
 * OmniNav Module
 */
var OmniNav = (function() {
  var $;

  // Public Methods
  var build = function(jqLocalized) {
    init(jqLocalized);
    var $omniNav = $('<nav id="omni-nav" />');
    $omniNav.text('This content has been dynamically loaded!');
    return $omniNav;
  }

  // Private Methods
  var init = function(jqLocalized) {
    $ = jqLocalized;
    console.log("OmniNav initialized.");
  };

  // Public API
  return {
    build: build
  };
})();

module.exports = OmniNav;
