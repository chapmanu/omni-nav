var OmniNav2 = (function() {

  // Constants
  var TABLET_BREAKPOINT = 768; //px
  var DESKTOP_BREAKPOINT = 1300; //px
  var OMNINAV_BASE_HEIGHT = 60; //px

  // Module Vars
  var $container,
      $utilityNav,
      $primaryNav,
      searchAPI;

  // Module Functions
  var initialize = function(container) {
    // Key DOM elements.
    $container = container;
    $utilityNav = $container.find('.utility-nav');
    $primaryNav = $container.find('#primary-nav');

    // Mark OmniNav v2 presence on page.
    $('html').addClass('omni-nav-v2');

    // Initialize submodules.
    OffCanvasNav.init();

    var omniNavId = $container.attr('id'),
        primarySearchId = 'primary-nav-search',
        utilitySearchId = 'utility-nav-search';

    /*
     * We only initialize one form based on window size. This reduces the number
     * of accessibility errors/alerts caused by Google Custom search code that
     * we can't change.
     */
    if ($(window).width() >= TABLET_BREAKPOINT) {
      searchAPI = GoogleCustomSearch.init(omniNavId, utilitySearchId);
    }
    else {
      searchAPI = GoogleCustomSearch.init(omniNavId, primarySearchId);
    }

    bindEventHandlers();
  };

  var bindEventHandlers = function() {
    $('.utility-nav-trigger').on('click', onUtilityNavClick);
    $utilityNav.find('li.utility-has-dropdown').on('click', onUtilityNavDropdownClick);

    var hideSearchResultsTimeoutId = null;
    $(window).on('resize', function() {
      clearTimeout(hideSearchResultsTimeoutId);
      hideSearchResultsTimeoutId = setTimeout(hideSearchResults, 250);
    });
  };

  var hideSearchResults = function() {
    if ( searchAPI.isOpen() ) {
      searchAPI.hideResults();
    }
  };

  var getOmninavHeight = function() {
    // Primary Nav
    // The primary nav will always show, this is the minimum
    var height = OMNINAV_BASE_HEIGHT;

    // On mobile screen, omninav is always just primary nav
    if ( $(window).width() < TABLET_BREAKPOINT ) {
      return height;
    }

    // Global Nav
    // Always stacked on tablet, so should be primary nav + global nav height
    var isTabletSize = ($(window).width() >= TABLET_BREAKPOINT) && ($(window).width() < DESKTOP_BREAKPOINT);
    if ( isTabletSize) {
      height += OMNINAV_BASE_HEIGHT;
    }

    // By default when you load the page for the first time, the utility nav is closed
    // so its height will never need to be accounted for in this case
    return height;
  };

  var onUtilityNavClick = function() {
    // Set gradual transition for padding adjustments after initial load
    // Timing and duration match slideToggle defaults
    $('html.omni-nav-v2').css('transition', 'padding-top 400ms ease-in-out');
    $('.primary-nav-action').toggleClass("utility-open");

    if ($(window).width() >= DESKTOP_BREAKPOINT) {
      // slideToggle() sets display: block and overflow: hidden by default
      // utility-nav-container needs to be table-cell, and all utility-nav divs need overflow: visible
      $utilityNav.find('.utility-nav-container').slideToggle(10, function() {
        $(this).css('display', 'table-cell');
        $(this).css('overflow', 'visible');
      });

      // Main utility-nav div
      $utilityNav.toggleClass('utility-nav-open').slideToggle(function() {
        $(this).css('overflow', 'visible');
      });

      // Other utility nav trigger classes
      $('html.omni-nav-v2').toggleClass('utility-nav-open');
      $primaryNav.removeClass('search-open');

      // Sets focus on search input field, if utility nav is being opened
      if ($('.utility-nav-open').length > 0) {
        // Focus needs a slight delay to allow the utility nav to come down all the way
        setTimeout(function(){
          $('#utility-nav-search').find('.cu-search-box').find('input.gsc-input').focus();
        },300);
      }
    }
    else if ( $(window).width() >= TABLET_BREAKPOINT && $(window).width() < DESKTOP_BREAKPOINT ) {
      // On tablet, utility-links don't show, only utility-search should toggle in container
      $utilityNav.find('.utility-nav-container.utility-search').slideToggle(10, function() {
        $(this).css('display', 'table-cell');
        $(this).css('overflow', 'visible');
      });

      // Make sure utility-links doesn't still have display: table-cell
      $utilityNav.find('.utility-nav-container.utility-links').css('display', 'none');
      // Main utility-nav div
      $utilityNav.toggleClass('utility-nav-open').slideToggle(function() {
        $(this).css('overflow', 'visible');
      });

      // Other utility nav trigger classes
      $('html.omni-nav-v2').toggleClass('utility-nav-open');
      $primaryNav.removeClass('search-open');

      // Sets focus on search input field, if utility nav is being opened
      if ($('.utility-nav-open').length > 0) {
        // Focus needs a slight delay to allow the utility nav to come down all the way
        setTimeout(function(){
          $('#utility-nav-search').find('.cu-search-box').find('input.gsc-input').focus();
        },300);
      }
    }
    else {
      $utilityNav.removeClass('utility-nav-open');
      $('html.omni-nav-v2').removeClass('utility-nav-open');
      $primaryNav.toggleClass('search-open');
      // Sets focus for search input field
      if ($('.search-open').length > 0) $('#primary-nav-search').find('.cu-search-box').find('input.gsc-input').focus();
    }


    var primaryNavClasses = document.getElementById('primary-nav').classList;

    // jQuery < 3.0 doesn't support addClass/removeClass for SVGs
    // See Stack Overflow question: https://stackoverflow.com/questions/8638621/jquery-svg-why-cant-i-addclass
    if (primaryNavClasses.contains("search-open") || $utilityNav.hasClass('utility-nav-open')) {
      // Toggle open iff one of the search bars is open
      $('.icon-open-search').attr("class", "icon-open-search hide");
      $('.icon-close-search').attr("class", "icon-close-search");
    } else {
      $('.icon-open-search').attr("class", "icon-open-search");
      $('.icon-close-search').attr("class", "icon-close-search hide");
    }
  };

  var onUtilityNavDropdownClick = function(e) {
    e.stopPropagation();

    // This is to prevent Search From and Social dropdowns from overlapping
    // Search From (.search-type) has a different parent than the other dropdowns so it needs a different selector to hide the other dropdowns
    if ( $(this)[0].classList.contains('search-type') ) {
      $('.utility-links').find('.utility-has-dropdown').removeClass('dropdown-open');
    }
    else {
      $(this).siblings('.utility-has-dropdown').removeClass('dropdown-open');
      $('.utility-search').find('.utility-has-dropdown').removeClass('dropdown-open');
    }

    $(this).toggleClass('dropdown-open');
    $(document).on("click", onDocumentClick);
  };

  var onDocumentClick = function() {
    $('li.utility-has-dropdown').removeClass('dropdown-open');
    $(document).off("click", onDocumentClick);
  };

  var onSearchInput = function() {
    $('.search-icon').addClass('hide');
    $(document).on("click", function() {
      // resets search input box when user clicks outside
      $utilityNav.find('input:text').val("");
      $primaryNav.find('input:text').val("");
      $('.search-icon').removeClass('hide');
    });
  };

  // This module handles functionality associated with OffCanvasNav in particular.
  var OffCanvasNav = (function() {

    // Module Vars
    var $offCanvasLinks;

    // Module Functions
    var initialize = function() {
      $offCanvasLinks = $('#js-off-canvas-nav > ul > li > a');
      syncLinkWidths();
      bindEventHandlers();
    };

    var syncLinkWidths = function() {
      var width = $('#js-off-canvas-nav > ul').width();
      $offCanvasLinks.css('width', width);
    };

    var bindEventHandlers = function() {
      enableMenusToggle();
      enableOffCanvasNavHandlers();

      var syncLinkWidthsTimeoutId;
      $(window).on('resize', function() {
        clearTimeout(syncLinkWidthsTimeoutId);
        syncLinkWidthsTimeoutId = setTimeout(syncLinkWidths, 500);
      });
    };

    var enableMenusToggle = function() {
      // Enables toggle to slide main/umbrella menus back and forth.
      $('a.toggle-menu-label').on('click', function(e) {
        // Toggles headers.
        $('div#umbrella-logo').toggle('blind');

        // Slide-toggles the menus.
        $('div#off-canvas-umbrella').toggle('slide');
      });
    };

    var enableOffCanvasNavHandlers = function() {
      // Selector for close-off-canvas can't be an ID because branded pages have it in 2 places
      // SiteImprove reports duplicate IDs
      var offCanvasSelectors = '#js-off-canvas-trigger, .js-close-off-canvas-nav, #js-off-canvas-overlay';

      $(offCanvasSelectors).on('click', function(event) {
        event.preventDefault();
        $('#js-off-canvas-nav-container').toggleClass('open');
        $('#js-off-canvas-overlay').toggleClass('active');
        $('body').toggleClass('no-scroll');
      });

      $('#js-off-canvas-nav-container .toggle').on('click', function() {
        $(this).parent().toggleClass('open'); // Targets li
        $(this).parent().find('ul').slideToggle();
      });
    };

    return {
      init: initialize
    };
  })();

  // Return for OmniNav2 module
  return {
    init: initialize
  };
})();

var GoogleCustomSearch = (function() {
  var GCS_ENGINE_ID = '015856566681218627934:2ndbiubovo4';
  var GCS_SOURCE = location.protocol + '//www.google.com/cse/cse.js?cx=' + GCS_ENGINE_ID;

  var $omniNav,
      searchAPI;

  var initialize = function(omniNavId, searchBoxId) {
    $omniNav = $('#' + omniNavId);

    // Google Search JavaScript API
    // Source: https://developers.google.com/custom-search/docs/element#javascript
    window.__gcse = {
      parsetags: 'explicit',    // Components are rendered only with explicit calls
      callback: onGoogleSearchInitialized
    };

    loadGoogleSearchIfNotLoaded();

    searchAPI = new SearchComponent(searchBoxId);
    return searchAPI;
  };

  var loadGoogleSearchIfNotLoaded = function() {
    // GCS is also loaded in omni-nav.js. Only load script if it doesnt exist already.
    var alreadyLoaded = $('script[src="'+ GCS_SOURCE +'"]').length > 0;
    if ( ! alreadyLoaded ) {
      (function(){
        var cx = GCS_ENGINE_ID;
        var gcse = document.createElement('script');
        gcse.type = 'text/javascript';
        gcse.async = true;
        gcse.src = GCS_SOURCE;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(gcse, s);
      })();
    }
  }

  var onGoogleSearchInitialized = function() {
    searchAPI.init();
  };

  /*
   * This object represents the Search component (search form and results block). It wraps
   * the Google element[0] and jQuery $elements representing the component in order to
   * provide an API tailored to OmniNav.
   *
   * [0] https://developers.google.com/custom-search/docs/element#cse-element
   */
  var SearchComponent = function(containerId) {
    // Constants
    var SEARCH_RESULTS_BASE_URL = "//www.chapman.edu/search-results/index.aspx?",
        ENTER_KEY = 13,
        ESC_KEY = 27,
        DEFAULT_FILTER_TEXT = "Search From";

    // Internal Attrs
    var $container,
        $searchBox,
        $searchResultsContainer,
        $searchResults,
        $selectedSearchFilter,
        $moreResultsButton,
        gcsElement,
        resizeTimeoutId;

    var init = function() {
      // jQuery Elements
      $container = $('#' + containerId);
      $searchBox = $container.find(".cu-search-box");
      $searchResultsContainer = $container.find('.search-results-container');
      $searchResults = $container.find('.cu-search-results');
      $selectedSearchFilter = $container.find('.selected-search-filter');
      $moreResultsButton = $('<a>', {
        class: "more-results",
        href: SEARCH_RESULTS_BASE_URL,
        text: "See more results"
      });

      renderGoogleSearchMarkup();
      applyStyleAdjustments();
      bindEventHandlers();

      // The Google Custom Search Element object. Can only be called after
      // renderGoogleSearchMarkup.
      gcsElement = google.search.cse.element.getElement(containerId);
    };

    var applyStyleAdjustments = function() {
      updateSearchResultsHeight();

      // These must be applied after Google's markup has been rendered.
      $searchBox.find('input.gsc-input').attr('placeholder', 'Search');
      $searchResults.find('.gsc-control-cse').append($moreResultsButton);
      document.querySelector('img.gsc-branding-img').alt = "Google"; // for accessibility
    };

    var bindEventHandlers = function() {
      $searchBox.find('input.gsc-search-button').on('click', onSearchEnter);
      $searchBox.find('input.gsc-input').on('keyup', onSearchEnter);
      $container.find('.search-filter-option').on('click', onSearchFilterClick);
      $searchBox.find('.gsc-clear-button').on('click', hideResults);
      $(window).on('resize', onSearchResultsResize);
    };

    var isOpen = function() {
      return $container.hasClass('search-results-open');
    };

    var hideResults = function() {
      // Reset results.
      $searchResultsContainer.hide();
      $omniNav.removeClass('search-results-open');
      $container.removeClass('search-results-open');
      unlockScroll();
      gcsElement.clearAllResults();
      $(document).off('keyup', onSearchEsc);
      $(document).off('click', onDocumentClick);

      // Clear search filters.
      var hasSearchFilters = $container.find('.search-filter-option').length;
      if ( hasSearchFilters ) $selectedSearchFilter.text(DEFAULT_FILTER_TEXT);
    };

    var renderGoogleSearchMarkup = function() {
      // Each GCS element must have a unique id to use as its gname.
      var searchBoxDiv = $searchBox[0];
      var searchResultsDiv = $searchResults[0];

      var searchBoxConfig = {
        gname: containerId,
        div: searchBoxDiv,
        tag: 'searchbox',
        attributes: {
          enableAutoComplete: true,
          autoCompleteMatchType: 'any',
          resultSetSize: 6,
          enableHistory: false
        }
      };

      var searchResultsConfig = {
        gname: containerId,
        div: searchResultsDiv,
        tag: 'searchresults',
        attributes: {
          linkTarget: '_self',
          enableOrderBy: true
        }
      };

      google.search.cse.element.render(searchBoxConfig, searchResultsConfig);
    };

    var updateSearchResultsHeight = function() {
      $searchResultsContainer.height($(window).height());
    };

    var onSearchEnter = function(e) {
      // The autocomplete container is not present until the user starts typing
      // Add click event listener the first time it shows up
      bindAutocomplete();

      var resultsRequested = e.type == 'click' || e.which == ENTER_KEY;
      var searchTermsPresent = gcsElement.getInputQuery().length > 0;
      if( resultsRequested && searchTermsPresent ) {
        showResults();
      }
    };

    var onSearchFilterClick = function() {
      $selectedSearchFilter.text($(this).text());
    };

    var onSearchResultsResize = function() {
      clearTimeout(resizeTimeoutId);
      resizeTimeoutId = setTimeout(updateSearchResultsHeight, 500);
    };

    var bindAutocomplete = function() {
      // Bind only once: use a data flag to track binding.
      var autoCompleteIsBound = $container.data('autoCompleteIsBound');
      if ( autoCompleteIsBound ) return;

      $container.data('autoCompleteIsBound', true);

      // Bind callback: when autocomplete option is clicked, show results. Interval
      // allows time for autoCompleteTable to be added to DOM.
      var intervalId = setInterval(function() {
        var $autoCompleteTable = $(".gsc-completion-container");
        var autoCompleteLoaded = $autoCompleteTable.length > 0;

        if ( autoCompleteLoaded ) {
          $autoCompleteTable.on("click", onAutoCompleteClick);
          clearInterval(intervalId);
        }
      }, 100);
    };

    var onAutoCompleteClick = function() {
      setTimeout(showResults, 100);
    };

    var showResults = function() {
      var term = gcsElement.getInputQuery();
      var moreResultsUrl = SEARCH_RESULTS_BASE_URL + 'q=' + encodeURIComponent(term);
      var hasSearchFilters = $container.find('.search-filter-option').length;

      // Update More Results button.
      $moreResultsButton.text('See more results for "' + term + '"');
      $moreResultsButton.attr('href', moreResultsUrl);

      // Mark results open.
      $omniNav.addClass('search-results-open');
      $container.addClass('search-results-open');

      // Bind callbacks.
      lockScroll();
      $(document).on('keyup', onSearchEsc);
      $(document).on('click', onDocumentClick);

      // Trigger a click on the GCS tab corresponding to the search type dropdown selection
      // unfortunately GCS does not provide a callback for when search results
      // are returned so must use timeout
      if ( hasSearchFilters ) {
        setTimeout(function() {
          //tabs are created after each search executes so don't cache these selectors
          $('.gsc-tabsArea .gsc-tabHeader').each(function() {
            if ($(this).text() == $selectedSearchFilter.text()) {
              $(this).trigger('click');
              return false;
            }
          });

          $searchResultsContainer.fadeIn(200);
        }, 500);
      }
      else {
        $searchResultsContainer.fadeIn(200);
      }
    };

    var onSearchEsc = function(e) {
      if ( e.which == ESC_KEY ) { hideResults(); }
    };

    var onDocumentClick = function(e) {
      if( $(e.target).is($searchResults, $searchBox) ||
          $searchResults.has(e.target).length ||
          $searchBox.has(e.target).length ) {
        return;
      }
      hideResults();
    };

    var lockScroll = function() {
      // lock scroll position, but retain settings for later
      var xLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
      var yTop = window.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop;
      var scrollPosition = [xLeft, yTop];

      var html = $('html');
      html.data('scroll-position', scrollPosition);
      html.data('previous-overflow', html.css('overflow'));
      html.css('overflow', 'hidden');
      window.scrollTo(xLeft, yTop);
    };

    var unlockScroll = function() {
      var html = $('html');
      var scrollPosition = html.data('scroll-position');
      html.css('overflow', 'visible');
      window.scrollTo(scrollPosition[0], scrollPosition[1]);
    };

    // Returns API
    return {
      init: init,
      isOpen: isOpen,
      hideResults: hideResults
    };
  }

  return {
    init: initialize
  };
})();

module.exports = OmniNav2;
