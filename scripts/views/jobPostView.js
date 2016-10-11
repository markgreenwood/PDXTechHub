(function(module) {
  searchView = {};
  resultsView = {};
  companyView = {};
  favoritesView = {};

  searchView.reveal = function() {
    $('.tab-content').hide();
    $('#landing-page').fadeIn('slow');
  }

  resultsView.reveal = function() {
    $('.tab-content').hide();
    $('#results-page').fadeIn('slow');
  }

  companyView.reveal = function() {
    $('.tab-content').hide();
    $('#company-page').fadeIn('slow');
  }

  favoritesView.reveal = function() {
    $('.tab-content').hide();
    $('#favorites-page').fadeIn('slow');
  }

  module.searchView = searchView;
  module.resultsView = resultsView;
  module.companyView = companyView;
  module.favoritesView = favoritesView;

})(window);
