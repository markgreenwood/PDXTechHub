(function(module) {

  searchController = {};

  searchController.reveal = function() {
    $('.tab-content').hide();
    $('#landing-page').fadeIn('slow');
  };
  
  module.searchController = searchController;

})(window);
