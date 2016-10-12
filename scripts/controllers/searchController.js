(function(module) {

  searchController = {};

  searchController.reveal = function() {
    $('.tab-content').hide();
    $('#landing-page').fadeIn('slow');
  };

  searchController.initSearch = function() {

  };
  
  module.searchController = searchController;

})(window);
