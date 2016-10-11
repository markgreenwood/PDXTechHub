(function(module) {

  favoritesController = {};

  favoritesController.reveal = function() {
    $('.tab-content').hide();
    $('#favorites-page').fadeIn('slow');
  };

  module.favoritesController = favoritesController;

})(window);
