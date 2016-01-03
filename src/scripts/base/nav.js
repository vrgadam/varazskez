// NAVIGATION MODULE

var $ = require('jquery');
var ResponsiveNav = require('responsive-nav');

var $menuItems;
var sectionPositions = {};
var PRICES_URL = '#prices';

// Initializes the navigation on a given element
function init(classSelector) {
    var nav = ResponsiveNav(classSelector, {
        closeOnNavClick: true
    });

    $menuItems = $($(classSelector).first().find('ul li a'));

    // Initialize section positions
    updatePositions();

    // Set up event handlers
    $menuItems.each(function() {
        $(this).click(function(e) {
            var sectionSelector = $(e.delegateTarget).attr('href');
            if (sectionSelector !== PRICES_URL) {
                e.preventDefault();
                scrollToPosition(sectionSelector.substring(1));
            }
        });
    });

    $(window).resize(updatePositions);
}

// Updates the sectionPositions object. 
// Each section gets an attribute with the top position of the element.
function updatePositions() {
    $menuItems.each(function() {
        var sectionSelector = $(this).attr('href');
        if (sectionSelector !== PRICES_URL) {
            sectionPositions[sectionSelector.substring(1)] =
                $(sectionSelector).offset().top - 40;
        }
    });
}

// Scrolls to the passed section's stored position 
function scrollToPosition(section) {
    var body = $('html, body');
    body.stop().animate({
        scrollTop: sectionPositions[section]
    }, '200', 'swing');
}


module.exports.init = init;
