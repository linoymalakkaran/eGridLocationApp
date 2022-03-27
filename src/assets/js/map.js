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
  var points = App.globals.MapPoints;
  //close all other boxes
  for (var i = 0; i < points.length; i++) {
    try {
      var a = points[i].marker;
    } catch (e) {
      continue;
    }

    points[i].marker.infowindow.close();
  }
  marker.infowindow.open(App.globals.locationMap, marker);
  App.globals.locationMap.setCenter(marker.getPosition());
  App.globals.locationMap.setZoom(7);
};

App.mapMoveToPoint = function (locData) {
  const points = App.globals.MapPoints;
  $("html, body").animate({ scrollTop: "0" }, 500, function () {
    //App.globals.locationMap.setCenter(newPoint);
    App.triggerMarker(points[0].marker);
  });
  $.blockUI({
    showOverlay: true,
    fadeIn: 200,
    timeout: 1000,
    message:
      "<h5> يرجى الانتظار </h5><h5>Please wait </h5><h5>برائے مہربانی انتظار کریں</h5>",
    centerY: 0,
    css: { top: "50px", left: ($(window).width() - 10) / 2 + "px" },
  });
  $(parent.document).scrollTop(0);
};

App.mapMoveToPointDropdown = function (el) {
  var pid = $(el).val();

  var points = App.globals.MapPoints;
  var pt;
  //find relevant point
  for (var i = 0; i < points.length; i++) {
    if (points[i].code == pid) {
      pt = points[i];
    }
  }
  if (!pt || pt == undefined) return false;
  $("html, body").animate({ scrollTop: "10px" }, 1000, function () {
    //App.globals.locationMap.setCenter(newPoint);
    App.triggerMarker(pt.marker);

    $(".custom_locations").val(pid);
  });
};
