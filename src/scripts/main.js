(function() {
    var $ = require('jquery');
    window.j = $;
    var Navigation = require('./base/nav.js');

    $(document).ready(function() {
        Navigation.init('.main-header');

        $('.row').addClass('hidden');
    });

})();
