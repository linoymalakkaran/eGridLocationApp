var App = new Object();
App.globals = new Object();

App.createMarkers = function () {
  const points = App.globals.MapPoints;

  for (let i = 0; i < points.length; i++) {
    const pt = points[i];

    pt.marker = new google.maps.Marker({
      position: new google.maps.LatLng(pt.LAT, pt.LON),
      title: pt.PNAME,
      map: App.globals.locationMap,
    });

    let infodata = "<div style='width: 235px; padding:5px 12px;'>";
    infodata = infodata + "<b> " + pt.PNAME + "</b> <br /> ";
    infodata = infodata + "county name: " + pt.CNTYNAME + "<br />";
    infodata =
      infodata + " Plant annual net generation: " + pt.PLNGENAN + "<br />";
    infodata =
      infodata +
      " YEAR: " +
      pt.YEAR +
      "<br />" +
      "Plant-level sector: " +
      pt.SECTOR +
      "<br />" +
      "GPS: " +
      pt.LAT +
      ", " +
      pt.LON +
      "</div>";

    pt.marker.infowindow = new google.maps.InfoWindow({
      content: infodata,
      size: new google.maps.Size(80, 80),
      maxWidth: 300,
    });

    google.maps.event.addListener(pt.marker, "click", function () {
      App.triggerMarker(this);
    });
  }

  App.globals.locationMap.setCenter(
    new google.maps.LatLng(points[0].gps_lat, points[0].gps_long)
  );
};

App.triggerMarker = function (marker) {
  const points = App.globals.MapPoints;
  //close all other boxes
  for (let i = 0; i < points.length; i++) {
    points[i].marker?.infowindow.close();
  }
  marker.infowindow.open(App.globals.locationMap, marker);
  App.globals.locationMap.setCenter(marker.getPosition());
  App.globals.locationMap.setZoom(7);
};

App.mapMoveToPoint = function (locData) {
  const locationObj = App.globals.MapPoints.filter((loc) => {
    return loc.SEQPLT20 === locData.SEQPLT20;
  })[0];
  $("html, body").animate({ scrollTop: "0" }, 500, function () {
    App.triggerMarker(locationObj.marker);
  });
  $.blockUI({
    showOverlay: true,
    fadeIn: 200,
    timeout: 1000,
    message: "<h5>Please wait while pointing to map location</h5>",
    centerY: 0,
    css: { top: "50px", left: ($(window).width() - 10) / 2 + "px" },
  });
  $(parent.document).scrollTop(0);
};
