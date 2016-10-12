(function(module) {

  resultsController = {};

  resultsController.reveal = function() {
    $('.tab-content').hide();
    $('#results-page').fadeIn('slow');
  };

  module.resultsController = resultsController;

})(window);
