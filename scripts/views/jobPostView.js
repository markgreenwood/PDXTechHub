'use strict';
(function(module) {
  var jobView = {};

  jobView.renderJobResults = function (){
    JobPost.allJobPosts.forEach( function(job){
      console.log(job);
      $('#results-page').append( job.toHtml() );
      //JobPost.prototype.toHtml
    });
  };

  jobView.renderJobResults();
  module.jobView = jobView;


})(window);
