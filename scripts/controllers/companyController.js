(function(module) {

  companyController = {};

  companyController.reveal = function() {
    $('.tab-content').hide();
    $('#company-page').fadeIn('slow');
  };

  module.companyController = companyController;

})(window);
