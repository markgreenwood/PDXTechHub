
'use strict';
(function(module) {
  var resultsView = {};
  resultsView.map = {};

  resultsView.renderJobResults = function(){
    JobPost.allJobPosts.forEach(function(job){
      console.log('inside forEach loop', job);
      $('#job-results').append( job.toHtml() );
      //JobPost.prototype.toHtml
    });
  };


  resultsView.renderMap = function() {
    console.log('rendering map');
  };

  resultsView.renderResultsPage = function() {
    resultsView.renderJobResults();
    resultsView.renderMap();
  };

  JobPost.fetchResults(resultsView.renderResultsPage);

  module.resultsView = resultsView;


})(window);
