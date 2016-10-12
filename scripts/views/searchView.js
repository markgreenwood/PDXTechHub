(function(module) {
  searchView = {};

  searchView.handleSubmitButton = function() {
    $('#submit-search').on('click', function() {
      var city = $('#city-selector').val();
      var radius = $('#radius-selector').val();
      var biztype = $('#biz-type-selector').val();
      console.log('City: ' + city + ', Radius: ' + radius + ', Biztype: ' + biztype);
    });
  };

  searchView.handleSubmitButton();

  module.searchView = searchView;

})(window);
