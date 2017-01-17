(function(module) {

  resultsController = {};

  resultsController.reveal = function() {
    $('.tab-content').hide();
    $('#results-page').fadeIn('slow');
    google.maps.event.trigger(resultsView.map, 'resize');
  };

  module.resultsController = resultsController;

})(window);
