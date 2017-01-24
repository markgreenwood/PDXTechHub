(function(module) {

  // Constructor for JobPost
  function JobPost(opts) {
    Object.keys(opts).forEach(function(key) {
      this[key] = opts[key];
    }, this);
  }

  // The array which will hold the list of all JobPosts from our API call
  JobPost.allJobPosts = [];

  // Render a JobPost as HTML for display
  JobPost.prototype.toHtml = function() {
    var source = $('#job-template').html();
    var template = Handlebars.compile(source);
    var html = template(this);
    return html;
  };

  // fetchResults is the method that gets all the JobPosts and populates
  // the allJobPosts array. It checks localStorage to see if there are
  // cached results, and loads from there if there are. If not, it passes
  // our search criteria to the API via an AJAX call, loads the array, and
  // caches the results in localStorage. Finally, after the array is
  // populated, nextFunction (passed in function) is executed - this is
  // the callback that renders the results page once we have data.

  JobPost.fetchResults = function(searchparams, nextFunction) {
    // if search_str is not defined, use default search
    var search_str = 'l=' + searchparams.city + ',or&radius=' + searchparams.radius.replace(/[ ]*mi/, '') + '&q=' + searchparams.language + '&sort=&st=&jt=&start=&limit=50&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2&format=json';
    console.log(search_str);
    // var search_str = 'l=portland,or&radius=20&q=python&sort=&st=&jt=&start=&limit=50&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2&format=json';

    if (/*localStorage.getItem('jobListings')*/ false) { // Temporarily turning off localStorage to get API call working
      JobPost.loadAll(pullLocalStorage());
      nextFunction();
      console.log('Map center (after fetchResults): ', resultsView.map.getCenter().toString());
    } else {
      var url = '/indeed/ads/apisearch?publisher=7094754948491444&' + search_str;

      $.getJSON(url, function(data) {
        //console.log(data);
        JobPost.loadAll(data.results);
        nextFunction(searchparams.city, searchparams.radius);
        console.log('Map center (after fetchResults): ', resultsView.map.getCenter().toString());
        populateLocalStorage();
      });
    }
  };

  // loadAll populates the JobPost.allJobPosts array from raw JSON data
  JobPost.loadAll = function (jobPostData) {
    JobPost.allJobPosts = []; // clear the listings for each new search
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
