
'use strict';
(function(module) {
  var resultsView = {};
  resultsView.map = {};

  resultsView.renderJobResults = function(){
    $('#job-listings').empty();
    JobPost.allJobPosts.forEach(function(job){
      console.log('inside forEach loop', job);
      $('#job-listings').append( job.toHtml() );
      //JobPost.prototype.toHtml
    });
  };

  var pdxLoc = {lat: 45.5231, lng: -122.6765};

  resultsView.initMap = function() {
    setTimeout(function() {
      resultsView.map = new google.maps.Map(document.getElementById('map-results'), {
        center: pdxLoc,
        zoom: 12
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

    resultsView.map.panTo(pdxLoc);
    google.maps.event.trigger(resultsView.map, 'resize');
    var mkrdata = JobPost.allJobPosts.map(function(post) {
      return {
        lat: post.latitude,
        lng: post.longitude,
        company: post.company
      };
    });
    resultsView.placeMarkers(mkrdata);
    resultsView.map.panTo(pdxLoc);
    google.maps.event.trigger(resultsView.map, 'resize');
  };

  resultsView.renderResultsPage = function() {
    resultsView.renderJobResults();
    resultsView.renderMap();
  };

  resultsView.getResults = function(searchparams) {
    JobPost.fetchResults(searchparams, resultsView.renderResultsPage);
  };

  module.resultsView = resultsView;
  module.pdxLoc = pdxLoc;

})(window);
