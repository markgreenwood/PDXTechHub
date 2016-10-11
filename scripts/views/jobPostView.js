'use strict';
(function(module) {
  var jobView = {};

  jobView.renderJobResults = function(){
    console.log('running render job results on ' + JobPost.allJobPosts.length + 'objects');
    JobPost.allJobPosts.forEach(function(job){
      console.log('inside forEach loop');
      $('#results-page').append(job.toHtml() );
      //JobPost.prototype.toHtml
    });
  };
  JobPost.fetchResults(jobView.renderJobResults);

  module.jobView = jobView;


})(window);
