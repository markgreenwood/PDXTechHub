(function(module) {

  function JobPost(opts) {
    Object.keys(opts).forEach(function(key) {
      this[key] = opts[key];
    }, this);
  }

  JobPost.allJobPosts = [];

  JobPost.fetchResults = function() {
    var url = 'http://cors.io/?http://api.indeed.com/ads/apisearch?publisher=7094754948491444&q=javascript&l=portland,or&sort=&radius=&st=&jt=&start=&limit=50&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2&format=json';
    $.getJSON(url + '', function(data) {
      console.log(data);
    });
  };

  module.JobPost = JobPost;

})(window);
