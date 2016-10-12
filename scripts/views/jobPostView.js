'use strict';
(function(module) {
  var jobView = {};

  jobView.renderJobResults = function(){
    JobPost.allJobPosts.forEach(function(job){
      console.log('inside forEach loop', job);
      $('#job-results').append( job.toHtml() );
      //JobPost.prototype.toHtml
    });
  };
  JobPost.fetchResults(jobView.renderJobResults);

  module.jobView = jobView;


})(window);
