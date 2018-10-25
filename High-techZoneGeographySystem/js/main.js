var map;
function mapInit(ControlBar){
    map = new AMap.Map('container', {
        resizeEnable: true,
        rotateEnable:true,
        pitchEnable:true,
        zoom: 12,
        pitch:0,
        rotation:0,
        viewMode:'3D',//开启3D视图,默认为关闭
        buildingAnimation:true,//楼块出现是否带动画
        expandZoomRange:true,
        zooms:[3,20],
        center:[104.068431,30.606147]
    });
    if(ControlBar){
        map.plugin(["AMap.ControlBar"],function(){
            var Options = {
                showZoomBar:true,
                showControlButton:true,
                position:{
                    // right:'10px',
                    // top:'10px'
                    left:'-90px',
                    bottom:'-175px'
                }
            };
            var controlBar = new AMap.ControlBar(Options)
            map.addControl(controlBar)
        });
    }

    //为地图注册click事件获取鼠标点击出的经纬度坐标
    // var clickEventListener = map.on('click', function(e) {
    //     //点击后设置为中心
    //     map.setCenter([e.lnglat.getLng(),e.lnglat.getLat()]);
    // });

    // map.plugin('AMap.Geolocation', function () {
    //     geolocation = new AMap.Geolocation({
    //         enableHighAccuracy: true,//是否使用高精度定位，默认:true
    //         timeout: 10000,          //超过10秒后停止定位，默认：无穷大
    //         maximumAge: 0,           //定位结果缓存0毫秒，默认：0
    //         convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
    //         showButton: true,        //显示定位按钮，默认：true
    //         buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
    //         buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
    //         showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
    //         showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
    //         panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
    //         zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    //     });
    //     map.addControl(geolocation);
    //     geolocation.getCurrentPosition();
    //     AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
    //     AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    //
    //     function onComplete (argument) {
    //         console.log('onComplete',argument);
    //     }
    //     function onError (argument) {
    //         console.log('onError',argument);
    //         //定位失败定位在火车南站
    //         map.setCenter([104.068431,30.606147]);
    //     }
    // });

    //自定义标记点
/*    AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {

        var lngLats = getGridLngLats(map.getCenter(), 5, 5);

        for(var i=0;i<lngLats.length;i++){
            var forclickMarker = new SimpleMarker({
                iconLabel: i+1,
                //自定义图标节点(img)的属性
                iconStyle: {

                    src: 'http://webapi.amap.com/theme/v1.3/markers/b/mark_b.png',
                    style: {
                        width: '20px',
                        height: '30px'
                    }
                },

                //设置基点偏移
                offset: new AMap.Pixel(-10, -30),

                map: map,
                showPositionPoint: true,
                position: lngLats[i],
                zIndex: 300
            });

            forclickMarker.on("click", function(){getMarkerPosition(this.getPosition())}); //覆盖物点击事件

            // forclickMarkers.push(forclickMarker)  //覆盖物点击事件
        }

        function getMarkerPosition (e) {
            console.log(e)
            //点击后设置为中心
            // map.setCenter([e.lnglat.getLng(),e.lnglat.getLat()]);
            map.setCenter([e.getLng(),e.getLat()]);
        }
    });*/

    /**
     * 返回一批网格排列的经纬度

     * @param  {AMap.LngLat} center 网格中心
     * @param  {number} colNum 列数
     * @param  {number} size  总数
     * @param  {number} cellX  横向间距
     * @param  {number} cellY  竖向间距
     * @return {Array}  返回经纬度数组
     */
    function getGridLngLats(center, colNum, size, cellX, cellY) {

        var pxCenter = map.lnglatToPixel(center);

        var rowNum = Math.ceil(size / colNum);

        var startX = pxCenter.getX(),
            startY = pxCenter.getY();

        cellX = cellX || 70;

        cellY = cellY || 70;


        var lngLats = [];

        for (var r = 0; r < rowNum; r++) {

            for (var c = 0; c < colNum; c++) {

                var x = startX + (c - (colNum - 1) / 2) * (cellX);

                var y = startY + (r - (rowNum - 1) / 2) * (cellY);

                lngLats.push(map.pixelToLngLat(new AMap.Pixel(x, y)));

                if (lngLats.length >= size) {
                    break;
                }
            }
        }
        return lngLats;
    }

}

function menuwsLinks() {
    $(".circle-menu").on("click", ".circle-item1.curr .circle", function () {
        setTimeout(function () {
            window.location.href = "../macroscopic/index.html";
        }, 1200)

    })
    $(".circle-menu").on("click", ".circle-item2.curr .circle", function () {
        setTimeout(function () {
            window.location.href = "../middleViews/index.html";
        }, 1200)

    })
    $(".circle-menu").on("click", ".circle-item3.curr .circle", function () {
        setTimeout(function () {
            window.location.href = "../microcosmic/index.html";
        }, 1200)

    })
}
menuwsLinks();
(function(){

    /*右侧面板控制*/
    $(".back-arrow-btn").on("click",function(){
        if($(this).hasClass("active")){
            $(".time-colors-panel").css({right:"580px"});
          // $(".industry-last-colors-panel").css({right:"730px"});
          // $(".industry-breakdown-color-panel").css({right:"700px"});
            $(".microcosmic_container").addClass("slideInRight").removeClass("slideOutRight");
            $(".industry-land-infowindow").hide().addClass("slideOutRight").removeClass("slideInRight");
            $(".right-top-land-infowindow").hide().addClass("slideOutRight").removeClass("slideInRight");
            $(".industry-company-list-panel").hide().removeClass("slideInRight").addClass("slideOutRight");
            $(this).removeClass("active");
        }else{
            $(".time-colors-panel").css({right:"420px"});
            // $(".industry-last-colors-panel").css({right:"570px"});
            // $(".industry-breakdown-color-panel").css({right:"550px"});
            $(".microcosmic_container").addClass("slideOutRight").removeClass("slideInRight");
            /*判断是否在产业分布菜单*/
            if($(".build-switch .use-purpose-xh").hasClass("active")){
              $(".industry-land-infowindow").show().addClass("slideInRight").removeClass("slideOutRight");
              $(".industry-company-list-panel").show().addClass("slideInRight").removeClass("slideOutRight");
              $(".right-top-land-infowindow").hide().addClass("slideOutRight").removeClass("slideInRight");
            }else if($(".build-switch .sub-menu li.active").length>0){
              /*判断是否在左侧菜单模块里*/

              $(".industry-land-infowindow").hide().addClass("slideOutRight").removeClass("slideInRight");
              $(".industry-company-list-panel").hide().removeClass("slideInRight").addClass("slideOutRight");
              $(".right-top-land-infowindow").show().addClass("slideInRight").removeClass("slideOutRight");

            }else{
                /*在搜索的界面*/
              $(".industry-land-infowindow").hide().addClass("slideOutRight").removeClass("slideInRight");
              $(".industry-company-list-panel").hide().removeClass("slideInRight").addClass("slideOutRight");
              $(".right-top-land-infowindow").hide().removeClass("slideInRight").addClass("slideOutRight");
            }
            $(this).addClass("active");
        }
    })

    /*按钮菜单控制*/
    $(".circle-menu").on("click", function (event) {
        event.stopPropagation();
        $(".cover-mask").css("display", "block");
        if ($(this).hasClass("restactive")) {
            $(this).removeClass("restactive");
        }
        if ($(this).hasClass("active")) {
            hideCoverMask();
            return;
        }
        $(this).addClass("active");
        $(".circle-menu .item").stop(true).animate({ "width": "1.6927083333333333rem", "height": "1.6927083333333333rem" }, 600);
        $(".circle-menu .menu-top .circle").stop(true).animate({ width: "1.3697916666666667rem", height: "1.3697916666666667rem", top: "0.15625rem", left: "0.171875rem" }, 600);
        //                    $(".circle-item3").delay(200).animate({"left":"800px"});
        $(".circle-item3").animate({ "left": "4.166666666666667rem" });
        $(".circle-item2").animate({ "left": "2.0833333333333335rem" });
        $(".circle-item1").animate({ "left": "0px" });
        $(".circle-menu").find(".item").addClass("curr");

    })
    /*点击菜单*/
    $(".circle-menu").on("click", ".curr .circle", function (event) {
        event.stopPropagation();
        $obj = $(this).parents(".curr");
        $obj.addClass("active").css("zIndex", "102").siblings().removeClass("active").css("zIndex", "101");
        $x = $obj.position().left;
        $(".circle-menu .item").stop(true).animate({ left: $x }, 600, function () {
            publickHideCoverMask()
        });

    })
    /*点击遮罩层*/
    $(".cover-mask").on("click", function () {
        hideCoverMask();
    })
    function hideCoverMask() {
        /*找到当前菜单*/
        $activeItem = $(".circle-menu").find(".item.active");
        $x = $activeItem.position().left;
        $(".circle-menu .item").stop(true);
        $(".circle-menu .circle").stop(true);
        /*运动到当前菜单*/
        $activeItem.siblings().animate({ left: $x }, 600, function () {
            publickHideCoverMask()
        });
    }
    /*恢复为初始样式*/
    function publickHideCoverMask() {
        $(".circle-menu .menu-top .circle").animate({ width: "0.5052083333333334rem", height: "0.4947916666666667rem", top: "0.0625rem", left: "0.0625rem" }, 600);
        $(".circle-menu .item").removeClass("curr").animate({ "left": "0px", "width": "0.625rem", "height": "0.625rem" }, 600);
        $(".circle-menu").addClass("restactive").removeClass("active")
        $(".circle-menu").find(".item").removeClass("curr");
        $(".cover-mask").css("display", "none");
    }
    /* ===== search start ===== ===== ===== */
    $(".search_menu_box,.search_mask").on('click', function () {
        // console.log('000');
        if ($(".search_mask").hasClass('active')) {
            $(".search_mask").removeClass('active');
            $(".search_input_box").removeClass('active');
            $("#microcosmic_container").addClass("slideInRight").removeClass("slideOutRight");
        } else {
            $(".search_input").val("");
            $("#microcosmic_container").addClass("slideOutRight");
            if($(".back-arrow-btn").hasClass('active')){
                $(".back-arrow-btn").removeClass('active');
            }
            $(".search_mask").addClass('active');
            $(".search_input_box").addClass('active');
        }
    });
    /* ===== search the end ===== ===== ===== */

    /*panel scroll*/
    $(window).load(function () {
        $("#microcosmic_container .microcosmic_scroll").mCustomScrollbar({
            setHeight: '100%',
            theme: "minimal",
            scrollbarPosition: "outside"
        });
    });

    /*时间控件配置*/
    $.fn.datetimepicker.defaults = {
        language: "cn",
        startDate:new Date(new Date().getFullYear()-6,new Date().getMonth()),//七年前
        endDate:new Date()
    }
})()

function loadingAnimat(ele){
    /*加载效果*/
    var tpl = `<div class='zdy-cover-mask'>
							<div class='zdy-big-mask'></div>
							<div class="zdy-mask-con spinner">
							  <div class="spinner-container container1">
								<div class="circle1"></div>
								<div class="circle2"></div>
								<div class="circle3"></div>
								<div class="circle4"></div>
							  </div>
							  <div class="spinner-container container2">
								<div class="circle1"></div>
								<div class="circle2"></div>
								<div class="circle3"></div>
								<div class="circle4"></div>
							  </div>
							  <div class="spinner-container container3">
								<div class="circle1"></div>
								<div class="circle2"></div>
								<div class="circle3"></div>
								<div class="circle4"></div>
							  </div>
							</div>
						</div>`;
    $(ele).append(tpl);
}
function loadingFullAnimat(bigCover,ele){
    /*加载效果*/
    var tpl = `<div class='${bigCover}'>
							<div class='zdy-big-mask'></div>
							<div class="zdy-mask-con spinner">
							  <div class="spinner-container container1">
								<div class="circle1"></div>
								<div class="circle2"></div>
								<div class="circle3"></div>
								<div class="circle4"></div>
							  </div>
							  <div class="spinner-container container2">
								<div class="circle1"></div>
								<div class="circle2"></div>
								<div class="circle3"></div>
								<div class="circle4"></div>
							  </div>
							  <div class="spinner-container container3">
								<div class="circle1"></div>
								<div class="circle2"></div>
								<div class="circle3"></div>
								<div class="circle4"></div>
							  </div>
							</div>
						</div>`;
    $(ele).append(tpl);
}