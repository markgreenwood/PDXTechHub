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
  var beavLoc = {lat: 45.4847392, lng: -122.8756857};
  var greshLoc = {lat: 45.5103064,lng: -122.5030907};
  var hboroLoc = {lat: 45.532203, lng: -123.0055282};
  var tigLoc = {lat: 45.4248036, lng: -122.8595462};

  // Initializes the Google map object
  resultsView.initMap = function() {
    resultsView.map = new google.maps.Map(document.getElementById('map-display'), {
      center: pdxLoc,
      zoom: 12
    });
    

    google.maps.event.addListenerOnce(resultsView.map, 'tilesloaded', function() {
      // alert('tiles loaded!');
      resultsView.map.panTo(pdxLoc);
      resultsView.map.setZoom(12);
    });
  };

  google.maps.event.addDomListener(window, "load", resultsView.initMap);

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
  resultsView.renderMap = function(city, radius) {
    var cityLocs = {
      'Portland': pdxLoc,
      'Beaverton': beavLoc,
      'Hillsboro': hboroLoc,
      'Gresham': greshLoc,
      'Tigard': tigLoc
    };

    var zoom = {
      '5 mi': 12,
      '10 mi': 11,
      '15 mi': 10,
      '20 mi': 9,
      '25 mi': 9
    };

    var mkrdata = JobPost.allJobPosts.map(function(post) {
      return {
        lat: post.latitude,
        lng: post.longitude,
        company: post.company
      };
    });
    resultsView.placeMarkers(mkrdata);
    var cityLoc = new google.maps.LatLng(cityLocs[city]);
    console.log('cityLoc = ', cityLoc.toString());
    resultsView.map.panTo(cityLoc);
    resultsView.map.setZoom(zoom[radius]);
  };

  // Renders the entire results page by first rendering job results
  // and then rendering the map
  resultsView.renderResultsPage = function(city, radius) {
    console.log('renderResultsPage called with city: ', city, ' radius: ', radius);
    resultsView.renderJobResults();
    resultsView.renderMap(city, radius);
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
