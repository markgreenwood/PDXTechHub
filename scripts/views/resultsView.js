
'use strict';
(function(module) {
  var resultsView = {};

  // A "global" map object which will get the Google map
  resultsView.map = {};

  // Display the job listings in the job-listings box
  resultsView.renderJobResults = function(){
    $('#job-listings').empty();
    JobPost.allJobPosts.forEach(function(job){
      //console.log('inside forEach loop', job);
      $('#job-listings').append( job.toHtml() );
    });
  };

  var pdxLoc = {lat: 45.5231, lng: -122.6765};

  // Initializes the Google map object
  resultsView.initMap = function() {
    // setTimeout(function() {
    resultsView.map = new google.maps.Map(document.getElementById('map-display'), {
      center: pdxLoc,
      zoom: 12
    });
    // }, 2000);

    google.maps.event.addListenerOnce(resultsView.map, 'bounds_changed', function() {
      resultsView.map.panTo({lat: 45.5231, lng: -122.6765});
      resultsView.map.setZoom(12);
      console.log('Map center: ', resultsView.map.getCenter().toString());
    });
  };

  // Takes an array of passed in marker_data (lat, lng, company), creates
  // Google map markers and places them on the map
  resultsView.placeMarkers = function(marker_data) {
    marker_data.forEach(function(mkr) {
      mkr.marker = new google.maps.Marker({
        position: {lat: mkr.lat, lng: mkr.lng},
        map: resultsView.map,
        title: mkr.company
      });
    });
  };

  // Renders the map by generating the marker data for each job listings
  // and calling placeMarkers with the data
  resultsView.renderMap = function() {
    console.log('rendering map');

    // resultsView.map.panTo(pdxLoc);
    var mkrdata = JobPost.allJobPosts.map(function(post) {
      return {
        lat: post.latitude,
        lng: post.longitude,
        company: post.company
      };
    });
    console.log('Map center (before placeMarkers): ', resultsView.map.getCenter().toString());
    resultsView.placeMarkers(mkrdata);
    console.log('Map center (after placeMarkers): ', resultsView.map.getCenter().toString());
    resultsView.map.panTo(pdxLoc);
    console.log('Map center (after panTo PDX): ', resultsView.map.getCenter().toString());
    setTimeout(function() {google.maps.event.trigger(resultsView.map, 'resize');}, 500);
    console.log('Map center (after trigger resize): ', resultsView.map.getCenter().toString());
  };

  // Renders the entire results page by first rendering job results
  // and then rendering the map
  resultsView.renderResultsPage = function() {
    resultsView.renderJobResults();
    resultsView.renderMap();
    console.log('Map center (after renderMap): ', resultsView.map.getCenter().toString());
  };

  // When the search parameters are selected and the Submit button is clicked,
  // this function feeds the search parameters to fetchResults along with the
  // callback function to render the results page afterwards
  resultsView.getResults = function(searchparams) {
    JobPost.fetchResults(searchparams, resultsView.renderResultsPage);
  };

  module.resultsView = resultsView;
  module.pdxLoc = pdxLoc;

})(window);
