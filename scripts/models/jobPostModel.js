(function(module) {

  function JobPost(opts) {
    Object.keys(opts).forEach(function(key) {
      this[key] = opts[key];
    }, this);
  }

  JobPost.allJobPosts = [];

  JobPost.prototype.toHtml = function() {
    var source = $('#job-template').html();
    var template = Handlebars.compile(source);
    var html = template(this);
    return html;
  };

  JobPost.fetchResults = function(searchparams, nextFunction) {
    // if search_str is not defined, use default search
    var search_str = 'l=' + searchparams.city + ',or&radius=' + searchparams.radius + '&q=' + searchparams.language + '&sort=&st=&jt=&start=&limit=50&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2&format=json';

    // var search_str = search_str || 'q=javascript&l=portland,or&sort=&radius=&st=&jt=&start=&limit=50&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2&format=json';
    //TODO: Eventually route this through server.js to avoid CORS issues

    if (localStorage.getItem('jobListings')) {
      JobPost.loadAll(pullLocalStorage());
      nextFunction();
    } else {
      var url = 'http://cors.io/?http://api.indeed.com/ads/apisearch?publisher=7094754948491444&' + search_str;

      $.getJSON(url, function(data) {
        console.log(data);
        JobPost.loadAll(data.results);
        nextFunction();
      });
      populateLocalStorage();
    }
  };

  JobPost.loadAll = function (jobPostData) {
    jobPostData.forEach(function(job) {
      JobPost.allJobPosts.push(new JobPost(job));
    });
  };

  // Helper functions
  function populateLocalStorage() {
    localStorage.setItem('jobListings', JSON.stringify(JobPost.allJobPosts));
  }

  function pullLocalStorage() {
    var jobsFromLocalStorage = JSON.parse(localStorage.getItem('jobListings'));
    return jobsFromLocalStorage;
  }

  module.JobPost = JobPost;

})(window);
