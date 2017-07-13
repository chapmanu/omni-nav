/*
 * OmniNav Module
 */
var OmniNav = (function() {
  var $;

  // Public Methods
  var build = function(jqLocalized, target) {
    init(jqLocalized);
    target = target ? target : 'default';
    var $omniNav = $('<nav id="omni-nav" />');
    $omniNav.text('OmniNav build for target: ' + target);
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
