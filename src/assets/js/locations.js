$(document).ready(function (e) {
  // smooth scrolling on locations page for collapsed state
  $("a[href*=#]:not([href=#])").click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html,body").animate(
          {
            scrollTop: target.offset().top,
          },
          800
        );
        //return false; keep it commented.
      }
    }
  });

  $("[data-open-layer]").on("click", function (event) {
    // when lcicked on locations in list, open a layer

    var popup = $(this).attr("data-open-layer"); // location_1

    $("#" + popup).fadeIn();

    $(this).parent().addClass("openlayer");
  });

  $(".closebtn").on("click", function (event) {
    // hide layer

    var id = $(this).attr("data-record-id"); // location_1

    $("#location_" + id).hide();

    $('[data-open-layer="location_' + id + '"]')
      .parent()
      .removeClass("openlayer");
  });

  $('[data-toggle="locations_tooltip"]').tooltip(); // tooltip

  // filter locations movement
  //$('.locations_boxes').mixItUp();

  // iniitial location + settings
  /*var map;
	var gmarkers = [];
	
	function initialize() {
		
		var locc = new google.maps.LatLng(25.230702, 55.355988);
		
		var myOptions = {
			zoom: 11,
			disableDefaultUI: true,
			center: locc,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
	}
	
	
	// locations
	initialize();
	//google.maps.event.addDomListener(window, 'resize', initialize);
	//google.maps.event.addDomListener(window, 'load', initialize);
	
	// infowindow
	var infowindow = new google.maps.InfoWindow({
		  maxWidth: 200
	  });
	  
	//var infowindow = new google.maps.InfoWindow();
	var marker, i;
	
	for (i = 0; i < locations.length; i++) {  
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map
		});
		gmarkers.push(marker);
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				infowindow.setContent(locations[i][0]);
				infowindow.open(map, marker);
			}
		})(marker, i));
	}
	
	// updated by zeeshan rasool 
	// now markers can be dynamic having data attrib and sharing same class.
	// panTo
	$(".locationsPage").on("click", ".open_loc", function() {
		google.maps.event.trigger(gmarkers[$(this).data('marker')], "click");
		var laLatLng = new google.maps.LatLng($(this).data('lat'), $(this).data('lng'));
		map.panTo(laLatLng);
	});*/

  ///////////
  var catgory_id = "all";
  var state_id = "all";
  var keyword = "";
  ////////////

  // dropwdown Select State
  $("#stateDropdown li a").click(function () {
    var state_id = $(this).attr("data-state-id"); //state id

    $("#current_state_name").val(state_id); // save state in a hidden field. use for ajax

    if (state_id === "all") {
      $(".states").each(function (index) {
        var access_id = $(this).attr("data-toggle-btn");

        var _section = $(".form_wrap").find(
          "[data-form-section='" + access_id + "']"
        );
        _section.css({ position: "relative", visibility: "visible" });
        $(this)
          .find("i")
          .removeClass("fa-chevron-up")
          .addClass("fa-chevron-down"); // fa-chevron-down
        $(this).parent().parent().addClass("isopen");
      });
    } else {
      // close all
      $(".states").each(function (index) {
        var access_id = $(this).attr("data-toggle-btn");
        var _section = $(".form_wrap").find(
          "[data-form-section='" + access_id + "']"
        );
        _section.css({ visibility: "hidden", position: "absolute" }); // data-form-section
        $(this)
          .find("i")
          .removeClass("fa-chevron-down")
          .addClass("fa-chevron-up"); // fa-chevron-down
        $(this).parent().parent().removeClass("isopen");
      });

      // open the selected
      var _section = $(".form_wrap").find(
        "[data-form-section='" + state_id + "']"
      );

      _section.css({ position: "relative", visibility: "visible" });

      var btn = $("[data-toggle-btn='" + state_id + "']");
      btn.find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down"); // fa-chevron-down
      btn.parent().parent().addClass("isopen");
    }
  });

  // this function sets the global filter variables which we will send to ajax files to update the map
  function set_filter_variables() {
    catgory_id = $("#current_category_id").val();
    catgory_id = catgory_id.replace(".category-", "");
    state_id = $("#current_state_name").val(); // state id
    keyword = $("#filter_keyword").val();
  }

  // filter category
  $("#categoryDropdown li a").on("click", function (event) {
    // dropdown category update map AJAX

    var selText = $(this).html();

    $("#categorySelection").html(selText);

    //$(this).parents('.form_dropdown').find('.dropdown-toggle').html( '<span class="fleft">' + selText+'</span> <span class="caret fright"></span>');

    $("#current_category_id").val($(this).attr("data-filter")); // save state in a hidden field. use for ajax

    set_filter_variables();

    // this function below, will update map markers. So when you need to update the map just call this function and pass it required params and it will load the map
    update_map_markers(state_id, catgory_id, keyword);
  });

  // i think we dont need to change this function. unless we want to add some more filters or any new updation
  function update_map_markers(state_id, catgory_id, keyword) {
    //  data/locations.json
    //  http://localhost:9000/rest/api/v2/locations
    $.ajax({
      url: "http://localhost:9000/rest/api/v2/locations",
      dataType: "json",
      cache: false,
      beforeSend: function (data) {
        console.log(data);
        $("#global_loader").show();
      },
      success: function (data) {
        var markers = data;
        if (
          !Array.isArray(markers) &&
          data.markers &&
          Array.isArray(data.markers)
        ) {
          markers = data.markers;
        }
        App.globals.MapPoints = markers;
        // markers via ajax

        /*App.globals.MapPoints = [  // all states with few locations in each state just for example. 

						{lat: 25.2821, lon: 55.3302, id: "1"},              // dubai                
					
						{lat: 25.154516667,lon: 55.233566667, id: "2"},                            
					
						{lat: 25.2488,lon: 55.4522, id: "3"}                         
				];*/
        console.log(data);
        var latlng = new google.maps.LatLng(data.map_lat, data.map_lng); // dubai by default. ,

        var myOptions = {
          zoom: 11,
          center: latlng,
          disableDefaultUI: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        };

        App.globals.locationMap = new google.maps.Map(
          document.getElementById("map_canvas"),
          myOptions
        );
        App.createMarkers();
        ///

        setTimeout(function () {
          $("#global_loader").hide();
          // we used this timeout to show the loader for temp,
        }, 400);
      },
    });
  }

  // auto compelte
  $("#filter_keyword").autocomplete({
    //  data/locations.json
    //  http://localhost:9000/rest/api/v2/locations
    source: "http://localhost:9000/rest/api/v2/locations",
    change: function (event, ui) {
      set_filter_variables();
      update_map_markers(state_id, catgory_id, keyword);
    },

    //source: [ "c++", "java", "php", "coldfusion", "javascript", "asp", "ruby" ]
  });
});
