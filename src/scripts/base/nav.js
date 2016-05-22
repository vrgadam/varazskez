// NAVIGATION MODULE

var $ = require('jquery');

var $header;
var $nav;
var $menuItems;
var sectionPositions = {};
var ACTIVATION_DISTANCE = 175;

// Initializes the navigation on a given element
function init(classSelector) {
  $header = $(classSelector);
  $nav = $header.find('nav');
  $menuItems = $($nav.find('ul li a'));

  // Initialize section positions
  updatePositions();

  // Set up event handlers
  $menuItems.each(function() {
    $(this).click(function(e) {
      var sectionSelector = $(e.delegateTarget).attr('href');
      e.preventDefault();
      scrollToPosition(sectionSelector.substring(1));
    });
  });

  $(window).resize(updatePositions);

  $(document).scroll(onScroll);
  updateActiveSection($(document).scrollTop());
}

// Updates the sectionPositions object. 
// Each section gets an attribute with the offset top position of the element.
function updatePositions() {
  $menuItems.each(function() {
    var sectionSelector = $(this).attr('href');

    sectionPositions[sectionSelector.substring(1)] = $(sectionSelector).offset().top;

  });
}

function onScroll() {
  var scroll = $(document).scrollTop();
  if (!$header.hasClass('docked') && scroll > $header.height()) {
    $header.addClass('docked');
  }

  if ($header.hasClass('docked') && scroll === 0) {
    $header.removeClass('docked');
  }
  updateActiveSection(scroll);
}

// Scrolls to the passed section's stored position 
function scrollToPosition(section) {
  var body = $('html, body');
  var position = section === 'home' ? 0 : sectionPositions[section] - (ACTIVATION_DISTANCE * 0.6);
  body.stop().animate({
    scrollTop: position
  }, '200', 'swing');
}

function updateActiveSection(scrollTop) {
  if (scrollTop < sectionPositions.services - ACTIVATION_DISTANCE) {
    var home = $menuItems.filter('.home');
    if (!home.hasClass('active')) {
      $menuItems.removeClass('active');
      home.addClass('active');
    }
  } else if (scrollTop < sectionPositions.about - ACTIVATION_DISTANCE) {
    var services = $menuItems.filter('.services');
    if (!services.hasClass('active')) {
      $menuItems.removeClass('active');
      services.addClass('active');
    }
  } else if (scrollTop < sectionPositions.contact - ACTIVATION_DISTANCE) {
    var about = $menuItems.filter('.about');
    if (!about.hasClass('active')) {
      $menuItems.removeClass('active');
      about.addClass('active');
    }
  } else {
    var contact = $menuItems.filter('.contact');
    if (!contact.hasClass('active')) {
      $menuItems.removeClass('active');
      contact.addClass('active');
    }
  }
}

module.exports.init = init;
