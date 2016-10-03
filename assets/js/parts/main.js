$(document).ready(function() {
    $('.location-header .location-header-title').click(function() {
        $(this).closest('.location-header').toggleClass('active');
    });
});