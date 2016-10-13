
'use strict';
(function(module) {
  var resultsView = {};
  resultsView.map = {};

  resultsView.renderJobResults = function(){
    $('#job-results').empty();
    JobPost.allJobPosts.forEach(function(job){
      console.log('inside forEach loop', job);
      $('#job-results').append( job.toHtml() );
      //JobPost.prototype.toHtml
    });
  };

  resultsView.initMap = function() {
    var pdxLoc = {lat: 45.512794, lng: -122.679565};
    setTimeout(function() {
      resultsView.map = new google.maps.Map(document.getElementById('map-results'), {
        center: pdxLoc,
        zoom: 13
      });
    }, 2000);

  };

  resultsView.placeMarkers = function(marker_data) {
    marker_data.forEach(function(mkr) {
      mkr.marker = new google.maps.Marker({
        position: {lat: mkr.lat, lng: mkr.lng},
        map: resultsView.map,
        title: mkr.company
      });
    });
  };

  resultsView.renderMap = function() {
    console.log('rendering map');
    var mkrdata = JobPost.allJobPosts.map(function(post) {
      return {
        lat: post.latitude,
        lng: post.longitude,
        company: post.company
      };
    });
    resultsView.placeMarkers(mkrdata);
  };

  resultsView.renderResultsPage = function() {
    resultsView.renderJobResults();
    resultsView.renderMap();
  };

  resultsView.getResults = function(searchparams) {
    JobPost.fetchResults(searchparams, resultsView.renderResultsPage);
  };

  module.resultsView = resultsView;

})(window);
