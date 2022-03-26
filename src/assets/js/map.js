var App = new Object();
App.globals = new Object();

App.createMarkers = function () {
  var points = App.globals.MapPoints;
  var marker;

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];

    try {
      var a = pt.lat;
    } catch (e) {
      continue;
    }
    if (points[i].code == "H.Q.") {
      pt.marker = new google.maps.Marker({
        position: new google.maps.LatLng(25.236477, 55.35783),
        title: "DEIRA / ديرة الرئيسي",
        map: App.globals.locationMap,
      });

      pt.marker.infowindow = new google.maps.InfoWindow({
        content: "",
        size: new google.maps.Size(80, 80),
        maxWidth: 300,
      });
    } else {
      pt.marker = new google.maps.Marker({
        position: new google.maps.LatLng(pt.gps_lat, pt.gps_long),
        title: $("#" + pt.code).attr("location"),
        map: App.globals.locationMap,
      });

      var infodata = "<div style='width: 235px; padding:5px 12px;'>";

      if ($("#" + pt.code).attr("lang") == "eng") {
        infodata =
          infodata + "<b> " + $("#" + pt.code).attr("name") + "</b> <br /> ";
        if (
          $("#" + pt.code).attr("location") == undefined ||
          $("#" + pt.code).attr("location") == "-"
        ) {
        } else {
          infodata =
            infodata +
            "Address: " +
            $("#" + pt.code).attr("location") +
            "<br />";
        }

        if (
          $("#" + pt.code).attr("publicpobox") == undefined ||
          $("#" + pt.code).attr("publicpobox") == "N/A" ||
          $("#" + pt.code).attr("publicpobox") == ""
        ) {
        } else {
          infodata =
            infodata +
            " Public P.O.Box: " +
            $("#" + pt.code).attr("publicpobox") +
            "<br />";
        }
        infodata =
          infodata +
          " Open: " +
          $("#" + pt.code).attr("weekday") +
          "<br />" +
          "Timings: " +
          $("#" + pt.code).attr("timings") +
          "<br />" +
          "GPS: " +
          $("#" + pt.code).attr("gpslat") +
          ", " +
          $("#" + pt.code).attr("gpslon") +
          "</div>";
      } else if ($("#" + pt.code).attr("lang") == "urd") {
        infodata =
          infodata + "<b> " + $("#" + pt.code).attr("name") + "</b> <br /> ";
        if (
          $("#" + pt.code).attr("location") == undefined ||
          $("#" + pt.code).attr("location") == "-"
        ) {
        } else {
          infodata =
            infodata +
            "ایڈریس: " +
            $("#" + pt.code).attr("location") +
            "<br />";
        }

        if (
          $("#" + pt.code).attr("publicpobox") == undefined ||
          $("#" + pt.code).attr("publicpobox") == "N/A" ||
          $("#" + pt.code).attr("publicpobox") == ""
        ) {
        } else {
          infodata =
            infodata +
            "عوامی پی او باکس سروس: " +
            $("#" + pt.code).attr("publicpobox") +
            "<br />";
        }
        infodata =
          infodata +
          "دن کھلی: " +
          $("#" + pt.code).attr("weekday") +
          "<br />" +
          "اوقات: " +
          $("#" + pt.code).attr("timings") +
          "<br />" +
          "نقشے کے نقاط: " +
          $("#" + pt.code).attr("gpslat") +
          ", " +
          $("#" + pt.code).attr("gpslon") +
          "</div>";
      } else {
        infodata =
          infodata + "<b> " + $("#" + pt.code).attr("name") + "</b> <br /> ";
        if (
          $("#" + pt.code).attr("location") == undefined ||
          $("#" + pt.code).attr("location") == "-"
        ) {
        } else {
          infodata =
            infodata + "عنوان: " + $("#" + pt.code).attr("location") + "<br />";
        }

        if (
          $("#" + pt.code).attr("publicpobox") == undefined ||
          $("#" + pt.code).attr("publicpobox") == "N/A" ||
          $("#" + pt.code).attr("publicpobox") == ""
        ) {
        } else {
          infodata =
            infodata +
            " رقم صندوق الجمهور: " +
            $("#" + pt.code).attr("publicpobox") +
            "<br />";
        }
        infodata =
          infodata +
          " أيام العمل: " +
          $("#" + pt.code).attr("weekday") +
          "<br />" +
          "ساعات العمل: " +
          $("#" + pt.code).attr("timings") +
          "<br />" +
          "إحداثيات المركز : " +
          $("#" + pt.code).attr("gpslat") +
          ", " +
          $("#" + pt.code).attr("gpslon") +
          "</div>";
      }
      pt.marker.infowindow = new google.maps.InfoWindow({
        content: infodata,
        size: new google.maps.Size(80, 80),
        maxWidth: 300,
      });
    }

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
  App.globals.locationMap.setZoom(15);
};

App.mapMoveToPoint = function (el) {
  var pid = $(el).attr("id");
  var points = App.globals.MapPoints;
  var pt;
  //find relevant point
  for (var i = 0; i < points.length; i++) {
    try {
      var a = points[i].code;
    } catch (e) {
      continue;
    }

    if (points[i].code == pid) pt = points[i];
  }
  if (!pt || pt == undefined) return false;

  // $('#blkMe').block({ showOverlay: true, fadeIn:  200, timeout: 1000 });

  $("html, body").animate({ scrollTop: "0" }, 500, function () {
    //App.globals.locationMap.setCenter(newPoint);
    App.triggerMarker(pt.marker);
    $(".custom_locations").val(pid);
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
