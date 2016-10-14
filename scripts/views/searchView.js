(function(module) {
  searchView = {};

  // Click listener for the Submit button which fires off the search, and then
  // redirects the user to the results page
  searchView.handleSubmitButton = function() {
    $('#submit-search').on('click', function() {
      var city = $('#city-selector').val();
      var radius = $('#radius-selector').val();
      var lang = $('#language-selector').val();
      //console.log('City: ' + city + ', Radius: ' + radius + ', Language: ' + lang);
      resultsView.getResults({ 'city': city, 'radius': radius, 'language': lang });
      resultsController.reveal();
    });
  };

  // Register the click listener
  searchView.handleSubmitButton();

  module.searchView = searchView;

})(window);
