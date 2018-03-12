/*
 * OmniNav Module
 */
var OmniNav = (function() {
  // Constants
  var HOME_PAGE_URL = 'https://www.chapman.edu/';
  var PRIMARY_LINKS = [
    "About",
    "Academics",
    "Admission",
    "Arts",
    "Campus Life",
    "Research",
    "Support"
  ];

  // Array formats:
  // [list item label, href, icomoon icon class]
  var ABOUT_MENU = [
    ["Overview", "https://www.chapman.edu/about/index.aspx", "icon-file-text"],
    ["Maps and Directions", "https://www.chapman.edu/about/maps-directions/index.aspx", "icon-location"],
    ["Visit Chapman", "https://www.chapman.edu/about/visit-chapman/index.aspx", "icon-california"],
    ["Discover Chapman", "https://www.chapman.edu/discover/index.html", "icon-cu-monogram"],
    ["Our Campus", "https://www.chapman.edu/about/campus/index.aspx", "icon-office"],
    ["Facts and History", "https://www.chapman.edu/about/facts-history/index.aspx", "icon-cu-monogram"],
    ["Administration", "https://www.chapman.edu/about/administration/index.aspx", "icon-cu-window"],
    ["Contact Us", "https://www.chapman.edu/about/contact-us.aspx", "icon-envelop"]
  ];

  var ACADEMICS_MENU = [
    ["Overview", "https://www.chapman.edu/academics/index.aspx", "icon-file-text"],
    ["Degrees &amp; Programs", "https://www.chapman.edu/academics/degrees-and-programs.aspx", "icon-graduation"],
    ["Schools &amp; Colleges", "https://www.chapman.edu/academics/schools-colleges.aspx", "icon-library2"],
    ["Academic Calendar", "https://www.chapman.edu/academics/academic-calendar.aspx", "icon-calendar4"],
    ["Libraries", "https://www.chapman.edu/academics/libraries/index.aspx", "icon-books"],
    ["Course Catalogs", "https://www.chapman.edu/academics/course-catalogs/index.aspx", "icon-book2"],
    ["International Study", "https://www.chapman.edu/international-studies/index.aspx", "icon-earth"]
  ];

  var ADMISSION_MENU = [
    ["Overview", "https://www.chapman.edu/admission/index.aspx", "icon-file-text"],
    ["Undergraduate Admission", "https://www.chapman.edu/admission/undergraduate/index.aspx", "icon-bookmark"],
    ["Undergraduate Application", "https://www.chapman.edu/admission/undergraduate/applynow.aspx", "icon-pencil5"],
    ["Graduate Admission", "https://www.chapman.edu/admission/graduate/index.aspx", "icon-bookmark2"],
    ["Graduate Application", "https://www.chapman.edu/admission/graduate/applynow.aspx", "icon-pencil5"],
    ["Affordability", "https://www.chapman.edu/admission/undergraduate/afford.aspx", "icon-calculate2"],
    ["Financial Aid Calculator", "https://www.chapman.edu/students/tuition-and-aid/financial-aid/net-cost-calculator/index.aspx", "icon-calculate"],
    ["Campus Tours", "https://www.chapman.edu/admission/undergraduate/visit.aspx", "icon-office"]
  ];

  var ARTS_MENU = [[]]; // Currently no dropdown for Arts

  var CAMPUS_LIFE_MENU = [
    ["Overview", "https://www.chapman.edu/campus-life/index.aspx", "icon-file-text"],
    ["Athletics", "http://www.chapmanathletics.com/landing/index", "icon-paw"],
    ["Diversity and Inclusion", "https://www.chapman.edu/diversity/index.aspx", "icon-hand"],
    ["Events", "https://events.chapman.edu/", "icon-calendar4"],
    ["Fish Interfaith Center", "https://www.chapman.edu/about/fish-interfaith-center/index.aspx", "icon-earth"],
    ["Health and Safety", "https://www.chapman.edu/students/health-and-safety/index.aspx", "icon-heart3"],
    ["Residence Life", "https://www.chapman.edu/students/services/housing-and-residence/index.aspx", "icon-home2"],
    ["Student Life", "https://www.chapman.edu/students/life/index.aspx", "icon-smiley"]
  ];

  var RESEARCH_MENU = [
    ["Overview", "https://www.chapman.edu/research/index.aspx", "icon-file-text"],
    ["Sponsored Projects Services", "https://www.chapman.edu/research/sponsored-projects-services/index.aspx", "icon-medal"],
    ["Research Integrity", "https://www.chapman.edu/research/integrity/index.aspx", "icon-clipboard5"],
    ["Institutes and Centers", "https://www.chapman.edu/research/institutes-and-centers/index.aspx", "icon-library4"],
    ["Center for Undergraduate Excellence", "https://www.chapman.edu/research/office-undergraduate-research-creative-activity/index.aspx", "icon-lamp8"],
    ["Graduate Research Support", "https://www.chapman.edu/research/graduate-research/index.aspx", "icon-microscope"]
  ];

  var SUPPORT_MENU = [
    ["Overview", "https://www.chapman.edu/support-chapman/index.aspx", "icon-file-text"],
    ["Contact Development", "https://www.chapman.edu/support-chapman/contact-us.aspx", "icon-envelop"],
    ["Get Involved", "https://www.chapman.edu/support-chapman/get-involved.aspx", "icon-hand"],
    ["Areas to Support", "https://www.chapman.edu/support-chapman/ways-to-give/areas-to-support.aspx", "icon-cu-monogram"],
    ["Alumni", "https://www.chapman.edu/alumni/index.aspx", "icon-paw"]
  ];

  var PRIMARY_DROPDOWN_MENUS = [
    ABOUT_MENU,
    ACADEMICS_MENU,
    ADMISSION_MENU,
    ARTS_MENU,
    CAMPUS_LIFE_MENU,
    RESEARCH_MENU,
    SUPPORT_MENU
  ];

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

  /* PRIMARY NAV */
  var buildPrimaryNav = function() {
    var $primary = $('<div />').attr('id', 'primary-nav');

    // Left Container
    var $leftContainer = buildLeftNavContainer();

    // Logo Container
    var $logo = buildLogoContainer();

    //Right Container
    var $rightContainer = buildRightNavContainer();

    //Global Nav Container
    var $globalNav = buildGlobalNav();

    $primary.append($leftContainer, $logo, $rightContainer, $globalNav);
    return $primary;
  }

  var buildLeftNavContainer = function() {
    var $leftContainer = $('<div />').attr('class', 'nav-container left-nav-container');
    var $offCanvasTrigger = $('<a />').attr({
        class: 'off-canvas-trigger primary-nav-icon',
        href: '#',
        id: 'js-off-canvas-trigger',
        role: 'button',
        title: 'Access links to the pages within this section of the website and to other sections of the website',
        'aria-label': 'Access links to the pages within this section of the website and to other sections of the website'
    });

    var offCanvasIcon = buildOffCanvasSVG();
    $offCanvasTrigger.append(offCanvasIcon);
    $leftContainer.append($offCanvasTrigger);
    return $leftContainer;
  }

  var buildLogoContainer = function() {
    var $logoContainer = $('<div />').attr('class', 'nav-container logo-container');
    var $wrapper = $('<div />').attr('class', 'cu-logo-wrapper');
    var $primaryLogo = $('<div />').attr('class', 'primary-logo');
    var $logoLink = $('<a />').attr({
      href: HOME_PAGE_URL,
      title: "Chapman University Website Home Page"
    });
    var svgLogo = buildChapmanLogoSVG();
    $logoLink.append(svgLogo);
    $primaryLogo.append($logoLink);
    $wrapper.append($primaryLogo);
    return $logoContainer.append($wrapper);
  }

  // Contains search icon (utility nav trigger) and login icon (login menu dropdown)
  var buildRightNavContainer = function() {
    var $rightContainer = $('<div />').attr('class', 'nav-container right-nav-container');

    // Login Menu Dropdown
    var $loginTrigger = $('<div />').attr('class', 'primary-nav-action login-trigger');
    var $loginIconText = $('<div />').attr('class', 'nav-icon-text');
    $loginIconText.append("Log In");
    $loginTrigger.append(buildLoginTrigger(), $loginIconText, buildLoginDropdownMenu());

    // Utility nav search icon
    var $utilityTrigger = $('<div />').attr('class', 'primary-nav-action utility-nav-trigger');
    var $utilityIconText = $('<div />').attr('class', 'nav-icon-text');
    $utilityIconText.append("Find");
    $utilityTrigger.append(buildUtilityNavTrigger(), $utilityIconText);

    return $rightContainer.append($utilityTrigger, $loginTrigger);
  }

  var buildUtilityNavTrigger = function() {
    var $a = $('<a />').attr('class', 'primary-nav-icon');
    var searchOpenIcon = buildOpenSearchIcon();
    var searchCloseIcon = buildCloseSearchIcon();
    return $a.append(searchOpenIcon, searchCloseIcon);
  }

  var buildLoginTrigger = function() {
    var $a = $('<a />').attr('class', 'primary-nav-icon').attr('role', 'button');
    var loginSVG = buildLoginIcon();
    return $a.append(loginSVG);
  }

  var buildLoginDropdownMenu = function() {
    // SVGs for different icons on dropdown menu
    var blackboard = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M50.4 174.2C47.2 112.2 1 139.3 0 118.1c-0.5-8.2 4.5-6.7 7.7-7 1.7 0 5 1.2 26.2 0.2 39.1-2.2 76.5-5.7 113.9-7.7 110.9-6 114.4 60.8 114.9 70.6 1.5 29.4-13.5 54.6-45.4 66.3v1.7c56.1 10 73.8 33.7 76 74.3 3.2 60.3-35.4 100-108.7 104 -66.8 3.7-89.8 3.2-112.4 4.5 -11.5 0.5-22.7 3-32.4 3.5s-14.7 0.7-15-5.7c-0.7-14.7 38.9-5.5 36.7-49.4L50.4 174.2 50.4 174.2zM108.5 220.1c1.2 21.2 6.2 24.2 32.4 24.4l26.2-1.5c34.2-1.7 46.4-20.4 44.6-53.1 -2.5-42.4-36.6-68.3-77.3-66.1 -29.4 1.5-30.2 18-28.7 44.1L108.5 220.1 108.5 220.1zM115.5 350.5c2.2 42.4 14.5 54.9 58.3 52.4 44.1-2.5 65.3-32.9 62.8-77 -1.5-26.2-16.7-66.1-98.2-61.6 -26.2 1.5-27.2 13-25.9 35.7L115.5 350.5 115.5 350.5z"/><path d="M321.9 138.1c-1.7-32.7-28.4-11.5-29.4-27.9 -0.5-11.5 20.9-6 61.8-34.4 3.2-1.7 4.7-3.5 8-3.7 5-0.2 3.7 9.7 4 13l9.7 177.8c17-17.2 35.9-32.9 58.6-34.2 52.1-2.7 74.3 41.6 75.8 72.8C514.1 370.1 477 408 421.6 411c-40.6 2.2-54.9-15-61.3-14.7 -8.2 0.5-12 18.7-21.9 19.2 -3.2 0.2-5-1.2-5.2-4.7 -0.2-3.2 2.5-13.2 1.2-36.2L321.9 138.1 321.9 138.1zM380.7 350.8c2 37.4 36.6 43.9 49.9 43.1 37.4-2 43.6-38.4 42.1-67.6 -1.7-34.2-19.9-65.8-62.3-63.6 -13 0.7-33.7 10-32.9 26.4L380.7 350.8 380.7 350.8z"/></svg>';
    var fenestra = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 28.1 28.1"><style type="text/css">.st0{fill:#ffffff;}</style><polygon class="st0" points="13 14.5 0 27.5 0 14.5 "/><polygon class="st0" points="0 13.6 0 0.6 13 13.6 "/><polygon class="st0" points="27.5 0 14.5 13 14.5 0 "/><polygon class="st0" points="13.6 13 0.6 0 13.6 0 "/><polygon class="st0" points="15.1 13.6 28.1 0.6 28.1 13.6 "/><polygon class="st0" points="28.1 14.5 28.1 27.5 15.1 14.5 "/><polygon class="st0" points="13.6 15 0.6 28.1 13.6 28.1 "/><polygon class="st0" points="14.5 15 14.5 28.1 27.5 28.1 "/></svg>';
    var mail = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 448 448"><path d="M416 376V184c-5.2 6-11 11.5-17.2 16.5C363 228 327 256 292.2 285c-18.8 15.8-42 35-68 35h-0.5c-26 0-49.2-19.2-68-35C121 256 85 228 49.2 200.5c-6.2-5-12-10.5-17.2-16.5v192c0 4.2 3.8 8 8 8h368C412.2 384 416 380.2 416 376zM416 113.2c0-6.2 1.5-17.2-8-17.2H40c-4.2 0-8 3.8-8 8 0 28.5 14.2 53.2 36.8 71 33.5 26.2 67 52.8 100.2 79.2 13.2 10.8 37.2 33.8 54.8 33.8h0.5c17.5 0 41.5-23 54.8-33.8 33.2-26.5 66.8-53 100.2-79.2C395.5 162.2 416 134.5 416 113.2zM448 104v272c0 22-18 40-40 40H40c-22 0-40-18-40-40V104c0-22 18-40 40-40h368C430 64 448 82 448 104z"/></svg>';

    var $loginMenu = $('<div />').attr('class', 'login-menu');
    var $list = $('<ul />');
    $list.append(buildLoginMenuItem(blackboard, "Blackboard", "https://blackboard.chapman.edu/"));
    $list.append(buildLoginMenuItem(fenestra, "My Chapman", "https://my.chapman.edu/"));
    $list.append(buildLoginMenuItem(mail, "Staff &amp; Faculty Email", "https://exchange.chapman.edu/"));
    $list.append(buildLoginMenuItem(mail, "PantherMail", "https://www.chapman.edu/panthermail"));
    $list.append(buildLoginMenuItem(fenestra, "My Window", "https://mywindow.chapman.edu/"));
    return $loginMenu.append($list);
  }

  var buildLoginMenuItem = function(svgIcon, label, linkHref) {
    var $listItem = $('<li />');
    var $itemLink = $('<a />').attr('href', linkHref);
    $itemLink.append(svgIcon, label);
    return $listItem.append($itemLink);
  }

  /* GLOBAL NAV */
  var buildGlobalNav = function() {
    var $globalNavContainer = $('<div />').attr('class', 'nav-container global-nav');
    var $globalDiv = $('<div />').attr('id', 'cu-global-nav');
    var $globalNavTag = $('<nav />').attr('aria-label', 'global navigation menu');
    var $globalNavList = $('<ul />').attr('class', 'global-nav-links');

    for (var i = 0; i < PRIMARY_LINKS.length; i++) {
      var label = PRIMARY_LINKS[i];
      if (label != "Arts") {
        $globalNavList.append(buildPrimaryLink(label, PRIMARY_DROPDOWN_MENUS[i]));
      }
      // Arts is the only primary link that currently has no dropdown
      else {
        var $artListItem = $('<li />').attr('class', 'primary-link');
        var artLink = '<a href="https://www.chapman.edu/arts/index.aspx">Arts</a>';
        $artListItem.append(artLink);
        $globalNavList.append($artListItem);
      }
    }
    $globalNavTag.append($globalNavList);
    $globalDiv.append($globalNavTag);
    return $globalNavContainer.append($globalDiv);
  }

  var buildPrimaryLink = function(label, dropdownMenu) {
    var $listItem = $('<li />').attr('class', 'primary-link');
    var a = '<a>' + label + '</a>';
    $listItem.append(a);
    return $listItem.append(buildGlobalDropdown(dropdownMenu));
  }

  var buildGlobalDropdown = function(listItems) {
    var $dropdownDiv = $('<div />').attr('class', 'global-nav-dropdown');
    var $list = $('<ul />');

    for ( var x = 0; x < listItems.length; x++) {
      // listItems[x] => ["Overview", "https://www.chapman.edu/about/index.aspx", "icon-file-text"]
      $list.append(buildGlobalDropdownItem(listItems[x]));
    }
    return $dropdownDiv.append($list);
  }

  var buildGlobalDropdownItem = function(listItem) {
    // listItem[0] => title/label
    // listItem[1] => href
    // listItem[2] => class name (icon)
    var $li = $('<li />');
    var $a = $('<a />').attr({
      href: listItem[1],
      class: listItem[2]
    });
    $a.append(listItem[0]);
    return $li.append($a);
  }

  /* SVG ICONS */
  // For some reason, document.createElementNS("http://www.w3.org/2000/svg", "svg") doesn't work to create inline SVGs
  var buildOpenSearchIcon = function() {
    var paths = '<g><path d="M16 13.5l-4.695-4.695c0.444-0.837 0.695-1.792 0.695-2.805 0-3.314-2.686-6-6-6s-6 2.686-6 6 2.686 6 6 6c1.013 0 1.968-0.252 2.805-0.695l4.695 4.695 2.5-2.5zM2 6c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4z"></path><path d="M9 5h-2v-2h-2v2h-2v2h2v2h2v-2h2z"></path></g>';
    var svg = '<svg viewBox="0 0 16 16" class="icon-open-search">' + paths + '</svg>';
    return svg;
  }

  var buildCloseSearchIcon = function() {
    var paths = '<g><path d="M16 13.5l-4.695-4.695c0.444-0.837 0.695-1.792 0.695-2.805 0-3.314-2.686-6-6-6s-6 2.686-6 6 2.686 6 6 6c1.013 0 1.968-0.252 2.805-0.695l4.695 4.695 2.5-2.5zM2 6c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4z"></path><path d="M3 5h6v2h-6v-2z"></path></g>';
    var svg = '<svg viewBox="0 0 16 16" class="icon-close-search hide">' + paths + '</svg>';
    return svg;
  }

  var buildLoginIcon = function() {
    var path = '<g><path d="M4 5c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4s-4-1.791-4-4zM12 10h-8c-2.209 0-4 1.791-4 4v1h16v-1c0-2.209-1.791-4-4-4z"/></g>';
    var svg = '<svg viewBox="0 0 16 16">' + path + '</svg>';
    return svg;
  }

  var buildOffCanvasSVG = function() {
    var paths = '<path d="M1 3h14v2h-14v-2z"></path><path d="M1 7h14v2h-14v-2z"></path><path d="M1 11h14v2h-14v-2z"></path>';
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" class="hamburger-icon" viewBox="0 0 16 16">' + paths + '</svg>';
    return svg;
  }

  var buildChapmanLogoSVG = function() {
    var defs = "<defs><style>.cls-1{fill:#a50034;}.cls-2{fill:#231f20;}</style></defs>";
    var paths = '<path class="cls-1" d="M13.04 14.46L0 27.49V14.46h13.04zM0 13.62V.59l13.04 13.03H0zM27.49 0L14.46 13.03V0h13.03zM13.62 13.03L.59 0h13.03v13.03zM15.05 13.62L28.08.59v13.03H15.05zM28.08 14.46v13.03L15.05 14.46h13.03zM13.62 15.05L.59 28.08h13.03V15.05zM14.46 15.05v13.03h13.03L14.46 15.05z"/><g><path class="cls-2" d="M48 10.33c-.66-2.52-2.06-3.2-4.21-3.2-3.94 0-5.7 3-5.7 6.42 0 4.23 2.17 7 5.72 7 2.45 0 3.59-1.18 4.67-3.48l.52.09c-.28.94-.77 2.7-1.12 3.53a19.67 19.67 0 0 1-4.12.61c-5.54 0-7.87-3.77-7.87-7.25 0-4.51 3.48-7.65 8.28-7.65a16.32 16.32 0 0 1 3.97.6c.18 1.21.26 2.17.39 3.31zM61.73 13V9.91c0-2.39-.18-2.54-1.93-2.67v-.51h5.78v.5c-1.84.13-2 .29-2 2.67v7.9c0 2.39.18 2.54 2 2.67V21h-5.95v-.5c1.93-.13 2.1-.29 2.1-2.67V13.9h-7.6v3.9c0 2.39.18 2.54 2 2.67V21h-5.81v-.5c1.8-.13 2-.29 2-2.67V9.91c0-2.39-.18-2.54-2.06-2.67v-.51H56v.5c-1.71.13-1.88.29-1.88 2.67V13h7.6zM75.28 20.47l.7-.09c.81-.09.9-.33.68-1-.15-.53-.79-2.23-1.4-3.81h-4.45c-.22.57-.79 2.28-1.1 3.2-.42 1.27-.22 1.56.77 1.64l.66.07V21h-4.69v-.5c1.42-.15 1.6-.29 2.37-2.23L73.33 6.6l.5-.2 1.56 4.16c1 2.78 2 5.57 2.85 7.8.7 1.84 1 2 2.34 2.1V21h-5.3v-.5zm-4.18-5.74H75l-2-5.39zM85.25 17.8c0 2.39.18 2.54 2.3 2.67V21h-6.11v-.5c1.8-.13 2-.29 2-2.67V9.91c0-2.39-.17-2.54-1.86-2.67v-.51h5.52a6 6 0 0 1 3.64.92 3.52 3.52 0 0 1 1.4 3 4.52 4.52 0 0 1-4.27 4.4 8.1 8.1 0 0 1-1 0l-1.62-.42v3.17zm0-3.77a4.43 4.43 0 0 0 1.64.26c1.38 0 3.18-.72 3.18-3.57 0-2.39-1.25-3.35-3.51-3.35a3.48 3.48 0 0 0-1.12.11c-.13 0-.2.15-.2.59v6zM97.53 6.73l5.3 11.27L108 6.73h3.62v.5c-1.91.15-2 .24-2 2.67l.18 7.89c.07 2.45.13 2.52 2.06 2.67V21h-5.78v-.5c1.92-.18 1.92-.25 1.92-2.7l-.06-8.8h-.09l-5.37 11.77h-.55l-5.06-11.5-.22 6.11a27.5 27.5 0 0 0 0 3.94c.11.81.64 1 2.06 1.14V21h-5.19v-.5c1.23-.11 1.69-.33 1.84-1.14a35.15 35.15 0 0 0 .37-4.16l.27-4.63c.15-2.94 0-3.18-2.06-3.33v-.51h3.62zM121.55 20.47l.7-.09c.81-.09.9-.33.68-1-.15-.53-.79-2.23-1.4-3.81h-4.45c-.22.57-.79 2.28-1.1 3.2-.42 1.27-.22 1.56.77 1.64l.66.07V21h-4.69v-.5c1.42-.15 1.6-.29 2.37-2.23L119.6 6.6l.5-.2 1.56 4.16c1 2.78 2 5.57 2.85 7.8.7 1.84 1 2 2.34 2.1V21h-5.3v-.5zm-4.19-5.74h3.88l-1.93-5.39zM140.73 21.13h-.57l-9.51-11.55v5.59a34.11 34.11 0 0 0 .18 4.16c.11.77.7 1.07 2.15 1.14V21h-5.26v-.5c1.2 0 1.77-.37 1.88-1.14a34 34 0 0 0 .18-4.16v-4.79c0-1.58 0-1.93-.42-2.43a2.42 2.42 0 0 0-1.93-.75v-.5h3.2l9.23 11v-5.19a33.94 33.94 0 0 0-.18-4.16c-.11-.77-.7-1.07-2.15-1.14v-.51h5.26v.5c-1.21 0-1.77.37-1.88 1.14a33.94 33.94 0 0 0-.18 4.16v8.59zM154.83 6.73v.5c-1.75.13-1.93.29-1.93 2.67v4.58a7.47 7.47 0 0 0 .92 4.25 3.59 3.59 0 0 0 3.18 1.52 3.73 3.73 0 0 0 3.22-1.64 9.67 9.67 0 0 0 1-4.87v-1.18a34.41 34.41 0 0 0-.22-4.18c-.11-.77-.7-1.07-2.15-1.14v-.51h5.26v.5c-1.21 0-1.77.37-1.88 1.14a34.41 34.41 0 0 0-.18 4.18V14c0 2.54-.39 4.34-1.67 5.7a6.15 6.15 0 0 1-7.65.46c-1.16-.94-1.69-2.43-1.69-4.93V9.91c0-2.39-.18-2.54-2-2.67v-.51h5.79zM178.32 21.13h-.57l-9.51-11.55v5.59a34 34 0 0 0 .17 4.16c.11.77.7 1.07 2.15 1.14V21h-5.26v-.5c1.21 0 1.77-.37 1.88-1.14a34.23 34.23 0 0 0 .17-4.16v-4.79c0-1.58 0-1.93-.42-2.43a2.42 2.42 0 0 0-1.93-.74v-.51h3.2l9.22 11v-5.19a34.24 34.24 0 0 0-.17-4.16c-.11-.77-.7-1.07-2.15-1.14v-.51h5.26v.5c-1.21 0-1.78.37-1.88 1.14a34.22 34.22 0 0 0-.17 4.16v8.59zM185.51 17.8c0 2.39.17 2.54 2 2.67V21h-5.81v-.5c1.8-.13 2-.29 2-2.67V9.91c0-2.39-.17-2.54-2-2.67v-.51h5.78v.5c-1.8.13-2 .29-2 2.67v7.9zM195.24 21.11c-1.49-3.92-3.59-9.33-4.54-11.77-.7-1.82-1-2-2.32-2.1v-.51h5.32v.5l-.7.09c-.81.11-.94.33-.7 1 .57 1.62 2.26 5.94 3.86 10 1.14-3 3-8 3.51-9.42.42-1.25.2-1.53-.79-1.64l-.66-.07v-.46H203v.5c-1.47.15-1.66.31-2.48 2.24-.29.68-3 7.19-4.65 11.63h-.66zM205.9 9.91c0-2.39-.17-2.54-1.93-2.67v-.51h9.6c0 .37.13 2 .24 3.2l-.55.07a4 4 0 0 0-.79-2c-.35-.37-1.07-.53-2.41-.53h-1.67c-.61 0-.66 0-.66.68v5H210c1.88 0 2-.13 2.17-1.75h.55v4.34h-.55a2.35 2.35 0 0 0-.46-1.49 2.77 2.77 0 0 0-1.71-.28h-2.21v3.88c0 1.25.13 1.91.55 2.17a5 5 0 0 0 2.23.26c1.25 0 2.28-.11 2.76-.63a6.08 6.08 0 0 0 1.05-2.15l.55.07c-.11.61-.59 2.85-.77 3.44h-10.41v-.5c2-.13 2.15-.29 2.15-2.67V9.91zM220 17.8c0 2.39.17 2.54 2 2.67V21h-5.83v-.5c1.84-.13 2-.29 2-2.67V9.91c0-2.39-.17-2.54-1.93-2.67v-.51h5.57a6.4 6.4 0 0 1 3.46.75 3.19 3.19 0 0 1 1.45 2.8 4.09 4.09 0 0 1-2.89 3.83c.39.66 1.29 2.17 2 3.13a20.17 20.17 0 0 0 1.84 2.41 2.83 2.83 0 0 0 1.64 1.1v.42H229c-2.52-.07-3.29-.83-4.12-2-.68-1-1.6-2.61-2.21-3.64a1.4 1.4 0 0 0-1.38-.79H220v3.06zm0-3.73h1.27a3.24 3.24 0 0 0 2.19-.59 3.53 3.53 0 0 0 1.27-2.89 3.06 3.06 0 0 0-3.31-3.22 3.87 3.87 0 0 0-1.23.11c-.13 0-.2.15-.2.59v6zM230.55 17.12c.35 1 1.47 3.46 3.79 3.46a2.59 2.59 0 0 0 2.72-2.83c0-1.86-1.42-2.63-2.83-3.31-.72-.35-3.68-1.38-3.68-4 0-2.17 1.64-4 4.51-4a6.44 6.44 0 0 1 1.82.29 8.55 8.55 0 0 0 .83.24c.09.77.22 1.64.39 3l-.55.07c-.37-1.29-1-2.83-3-2.83a2.28 2.28 0 0 0-2.37 2.43c0 1.62 1.16 2.34 2.83 3.09 1.45.64 3.75 1.53 3.75 4.25 0 2.54-2.08 4.4-4.86 4.4a7 7 0 0 1-2.08-.33c-.55-.17-.94-.35-1.21-.46-.17-.57-.42-2.13-.64-3.31zM244.28 17.8c0 2.39.17 2.54 2 2.67V21h-5.78v-.5c1.8-.13 2-.29 2-2.67V9.91c0-2.39-.17-2.54-2-2.67v-.51h5.78v.5c-1.8.13-2 .29-2 2.67v7.9zM254.73 17.8c0 2.39.18 2.54 2.32 2.67V21h-6.4v-.5c2.06-.13 2.24-.29 2.24-2.67V7.46h-1c-2 0-2.54.29-2.87.7a5.81 5.81 0 0 0-.77 1.88h-.55c.09-1.34.22-2.74.26-3.86h.31a1 1 0 0 0 1.14.55h9a1.05 1.05 0 0 0 1-.55h.31c0 .92.13 2.52.24 3.79l-.56.03a4.26 4.26 0 0 0-.79-2c-.37-.42-1.05-.57-2.41-.57h-1.47V17.8zM267.95 17.8c0 2.39.17 2.54 2.28 2.67V21h-6.31v-.5c2-.13 2.19-.29 2.19-2.67V15.3a2.27 2.27 0 0 0-.48-1.31c-1-1.71-1.84-3.29-2.78-4.91s-1-1.69-2.3-1.84v-.51h5.28v.5l-1 .13c-.55.09-.7.28-.33 1 1 1.84 2 3.66 3.07 5.46.92-1.75 1.91-3.55 2.72-5.35.37-.79.2-1-.63-1.1l-.88-.11v-.53h4.82v.5c-1.47.13-1.58.42-2.5 1.86s-1.82 3-2.76 4.8a1.89 1.89 0 0 0-.37 1.18v2.73z"/></g>';
    var svgLogo = '<svg class="chapman-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 273.58 28.08">' + defs + paths + '</svg>';
    return svgLogo;
  }

  // Public API
  return {
    build: build
  };
})();

module.exports = OmniNav;
