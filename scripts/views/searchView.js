(function(module) {
  searchView = {};

  searchView.handleSubmitButton = function() {
    $('#submit-search').on('click', function() {
      var city = $('#city-selector').val();
      var radius = $('#radius-selector').val();
      var lang = $('#language-selector').val();
      console.log('City: ' + city + ', Radius: ' + radius + ', Language: ' + lang);
      resultsView.getResults({ 'city': city, 'radius': radius, 'language': lang });
    });
  };

  searchView.handleSubmitButton();

  module.searchView = searchView;

})(window);
