var scroll = (function () {
    
  function go_top() {

    var gotop = $("#gotop");

    gotop.on("click", function () {

      var target = $("html").offset().top;
      console.log(target);
      $("html, body").animate({scrollTop: target}, 600);
      return false;
  
    });
  
  }
  
  function menu_shadow() { 

    var menu = $(".menu");

    $(window).on("scroll", function () {
    
      var scrollTop = $(this).scrollTop();  
      if(scrollTop > 0) {
        menu.css({
          "box-shadow": "0 0 4px #000",
          "transition": ".4s linear"
        });
      
      } else {
        menu.css("box-shadow", "none");   
      }
  
    });
    
  }
  
  function sidebar_tag() {
      
    var sidebar_height = $("#sidebar").height();
    var sidebar_nav_clone = $("#sidebar-nav").clone().css("display", "none");
    var sidebar_nav_height = $("#sidebar-nav").height();
    var container_height = $("#container").height();
    
    if(container_height > sidebar_height + sidebar_nav_height) {
    
      var ad_lss = $("#ad-lss");
      ad_lss.after(sidebar_nav_clone);
      
      $(window).on("scroll", function (){

        var scrollTop = $(this).scrollTop();
        if(scrollTop > sidebar_height) {
          sidebar_nav_clone.css({
            "position": "fixed",
            "top": "62px",
            "z-index": "0 !important"
          }).fadeIn("1000");
        } else {
          sidebar_nav_clone.css({
            "position": "static",
          }).fadeOut("100");  
        }
          
      });
        
    }
    
  }
  
  return {
      
      go_top: go_top,
      menu_shadow: menu_shadow,
      sidebar_tag: sidebar_tag
      
  };

})();
scroll.go_top();
scroll.menu_shadow();
scroll.sidebar_tag();

var getMap = (function() {

  var geocoder = new google.maps.Geocoder();
  var map_canvas_id;

  function codeAddress(address) {

    var address = address;
    var mid = map_canvas_id;

    var mapOptions = {
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false
    };
    
    var map = new google.maps.Map(document.getElementById("map_canvas_" + mid), mapOptions);
    
    geocoder.geocode( { 'address': address}, function (results, status) {

      if (status == google.maps.GeocoderStatus.OK) {

        var location = results[0].geometry.location;
        map.setCenter(location);

        var marker = new google.maps.Marker({
          map: map,
          position: location
        });

        // console.log(location);
        makeLink(location, mid);

      } else {

        console.log('Geocode was not successful for the following reason: ' + status);

      }
    
    });

  }    

  function makeLink(location, mid) {
  
    var location_text = location + ""
    var link_location = location_text.replace(/[\(\)]/g, "");

    var map_link_p = $("<p>").addClass("map-link");
    var map_link_a = $("<a>").attr({"href": "//www.google.co.jp/maps?q=" + link_location, "target": "_blank"}).html('<i class="fa fa-external-link-square"></i>大きな地図で見る');
    var map_link = map_link_p.append(map_link_a );

    $("#map_canvas_" + mid).after(map_link);

    }

  return {
      
      map_canvas_id: map_canvas_id,

      getMapData: function() {
      
        var photo_data = $(".photo-data");
        var map_data = photo_data.find("li:eq(2)").find("a");

        map_data.each(function (i) {

          map_canvas_id = i;
          var $this = $(this);

          var map_address = $this.attr("title"); 
          var map_canvas = $("<div>").attr("id", "map_canvas_" + i).addClass("map-canvas"); 
          $this.parent().parent().after(map_canvas);
            
          codeAddress(map_address);

        }); 
      
      }
        
  };


})();

getMap.getMapData();


var site_search = (function () {
    
    function displayPage() {
        
        var url = location.href;
        console.log(url);
        
        if (url.indexOf("site_search") !== -1) {
            
            var content = $("#content");
            content.html("<gcse:searchresults-only></gcse:searchresults-only>");

        }

    }
    
    return {
        
        displayPage: displayPage
        
    };
    
})();
site_search.displayPage();
</script>

{block:IfDisqusShortname}
<script>
//<![CDATA[
(function () {
  var links = document.getElementsByTagName('a');
  var query = '?';
  for(var i = 0; i < links.length; i++) {

    if(links[i].href.indexOf('#disqus_thread') >= 0) {
      query += 'url' + i + '=' + encodeURIComponent(links[i].href) + '&';
    }

  }

  document.write('<script charset="utf-8" src="//disqus.com/forums/{text:Disqus Shortname}/get_num_replies.js' + query + '"></' + 'script>'   );

})();
//]]>