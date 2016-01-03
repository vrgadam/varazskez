(function() {
    var $ = require('jquery');

    var Navigation = require('./base/nav.js');

    $(document).ready(function() {
        Navigation.init('.site-nav');
    });

})();
