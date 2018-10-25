var dataWestAreaRangePositions = [];

/*绘制西区范围*/
function creatWestAreaLandRange(map, callbackFn, showAllMarker) {
  if (dataWestAreaRangePositions.length > 0) {
    // 外多边形坐标数组和内多边形坐标数组
    var pointers = dataWestAreaRangePositions;
    var polygonOptions = {
      map: map,
      strokeColor: "rgb(249, 182, 32)",
      // strokeColor: color,
      strokeWeight: 4,
      fillColor: "rgb(249, 182, 32)",
      zIndex: 0,
      fillOpacity: 0.25,
      strokeOpacity: 0.8,
      // strokeOpacity: 0,
      /*strokeStyle: "dashed",
        strokeDasharray: [20,10],*/
      extData: {}
    };
    polygonWestAreaRange = new AMap.Polygon(polygonOptions);

    // console.log(polygon)
    polygonWestAreaRange.on("click", function () {
      console.log("地块被点击===================>");
      if (showAllMarker) {
        showAllMarker();
      }
      if (CanvasLayer) {
        CanvasLayer.hide();
      }
      if (LAYER_COURTYARD_SCHOOL_LINE) {
        LAYER_COURTYARD_SCHOOL_LINE.remove();
        LAYER_COURTYARD_SCHOOL_LINE = null;
      }
      if (window.makers){
        /*for (var i=0;i<window.makers.length;i++){
            window.makers[i].hide();
        }*/
        map.remove(window.makers);
      }
      $(".around-support-panel").hide();
      $(".around-support-con .active").removeClass("active");
      /*去掉住宅marker被选中属性*/
      /*if (window.courtyardMarkerList && courtyardMarkerList.getSelectedRecord()){
        /!*for (var i=0;i<window.makers.length;i++){
            window.makers[i].hide();
        }*!/
        courtyardMarkerList.clearSelected();
      }*/
    });
    polygonWestAreaRange.setPath(pointers);

    $(".zdy-full-cover-mask").remove();
    map.setFitView();
    map.setZoom(14);
    if (callbackFn) {
      callbackFn();
    }
  } else {
    $.ajax({
      url: "/v1/land/findWesternDistrictBoundary",
      type: "GET",
      dataType: "json",
      data: {},
      success: function (res) {
        // console.log(res)
        var positions = [];
        res.forEach(function (v, i) {
          positions.push([v[2], v[3]]);
        });

        // console.log(positions)
        var polygonOptions = {
          map: map,
          strokeColor: "#000",
          // strokeColor: color,
          strokeWeight: 5,
          fillColor: "#efede8",
          // fillOpacity: 0,
          /*strokeStyle: "dashed",
      strokeDasharray: [20,10],*/
          extData: {}
        };
        // 外多边形坐标数组和内多边形坐标数组
        var pointers = positions;
        dataWestAreaRangePositions = pointers;
        polygonWestAreaRange = new AMap.Polygon(polygonOptions);

        polygonWestAreaRange.on("click", function () {
          if (showAllMarker) {
            showAllMarker();
          }
          if (CanvasLayer) {
            CanvasLayer.hide();
          }
          if (LAYER_COURTYARD_SCHOOL_LINE) {
            LAYER_COURTYARD_SCHOOL_LINE.remove();
            LAYER_COURTYARD_SCHOOL_LINE = null;
          }
          if (window.makers){
            for (var i=0;i<window.makers.length;i++){
              window.makers[i].hide();
            }
          }
        });

        polygonWestAreaRange.setPath(pointers);
        $(".zdy-full-cover-mask").remove();
        map.setFitView();
        map.setZoom(14);
        if (callbackFn) {
          callbackFn();
        }
      },
      error: function (err) {
      }
    });
  }
}

/*绘制科研机构高校*/
function creatHighSchool() {
  $.ajax({
    url: "./jsonData/schoolgetAllByType.json",
    type: "GET",
    dataType: "json",
    data: {type: "普通高等学校,民办的其他高等教育机构"},
    success: function (res) {
      console.log(res);
      var res = res.datas;
      var result = [];
      for (var i = 0; i < res.length; i++) {
        if (res[i].coordinate) {
          var list = {};
          list = res[i];
          list.id = res[i].id;
          list.name = res[i].name;
          list.position = res[i].coordinate.split(",");
          result.push(list);
        }
      }
      $.ajax({
        url: "./jsonData/researchInstitutionsgetAll.json",
        type: "GET",
        dataType: "json",
        data: {},
        success: function (res) {
          console.log(res);
          var res = res.datas;
          for (var i = 0; i < res.length; i++) {
            if (res[i].coordinate) {
              var list = {};
              list = res[i];
              list.id = res[i].id;
              list.name = res[i].name;
              list.position = res[i].coordinate.split(",");
              result.push(list);
            }
          }
          var iconStyle = {
            defaultIconStyle: {
              src: "./images/high_school_marker_icon.png",
              style: {
                width: "40px",
                height: "50px"
              }
            },
            hoverIconStyle: {
              src: "./images/high_school_marker_icon.png",
              style: {
                width: "60px",
                height: "70px"
              }
            },
            selectedIconStyle: {
              src: "./images/high_school_marker_icon.png",
              style: {
                width: "60px",
                height: "70px"
              }
            }
          };
          creatResearchOrganMarkerPoint(map, {
            result: result,
            iconStyle: iconStyle
          });
        },
        error: function (err) {
          console.log(err);
        }
      });
    },
    error: function (err) {
      console.log(err);
    }
  });
}

/*绘制Marker功能科研机构标记列表*/
function creatResearchOrganMarkerPoint(map, options) {
  loadingFullAnimat("zdy-buildfull-cover-mask", "body");

  AMapUI.loadUI(
    ["misc/MarkerList", "overlay/SimpleMarker", "overlay/SimpleInfoWindow"],
    function (MarkerList, SimpleMarker, SimpleInfoWindow) {
      //即jQuery/Zepto
      // var $ = MarkerList.utils.$;

      var defaultIconStyle = options.iconStyle.defaultIconStyle, //默认的图标样式
        // hoverIconStyle = 'green', //鼠标hover时的样式
        hoverIconStyle = options.iconStyle.hoverIconStyle, //鼠标hover时的样式
        selectedIconStyle = options.iconStyle.selectedIconStyle; //选中时的图标样式
      var organIconStyle = {
        defaultIconStyle: {
          src: "./images/research_organ_marker_icon.png",
          style: {
            width: "40px",
            height: "50px"
          }
        },
        hoverIconStyle: {
          src: "./images/research_organ_marker_icon.png",
          style: {
            width: "60px",
            height: "70px"
          }
        },
        selectedIconStyle: {
          src: "./images/research_organ_marker_icon.png",
          style: {
            width: "60px",
            height: "70px"
          }
        }
      };
      var organIconStyle1 = {
        defaultIconStyle: {
          src: "./images/guo.png",
          style: {
            width: "40px",
            height: "50px"
          }
        },
        hoverIconStyle: {
          src: "./images/guo.png",
          style: {
            width: "60px",
            height: "70px"
          }
        },
        selectedIconStyle: {
          src: "./images/guo.png",
          style: {
            width: "60px",
            height: "70px"
          }
        }
      };
      var organIconStyle2 = {
        defaultIconStyle: {
          src: "./images/sheng.png",
          style: {
            width: "40px",
            height: "50px"
          }
        },
        hoverIconStyle: {
          src: "./images/sheng.png",
          style: {
            width: "60px",
            height: "70px"
          }
        },
        selectedIconStyle: {
          src: "./images/sheng.png",
          style: {
            width: "60px",
            height: "70px"
          }
        }
      };
      var organIconStyle3 = {
        defaultIconStyle: {
          src: "./images/shi.png",
          style: {
            width: "40px",
            height: "50px"
          }
        },
        hoverIconStyle: {
          src: "./images/shi.png",
          style: {
            width: "60px",
            height: "70px"
          }
        },
        selectedIconStyle: {
          src: "./images/shi.png",
          style: {
            width: "60px",
            height: "70px"
          }
        }
      };
      var organIconStyle4 = {
        defaultIconStyle: {
          src: "./images/research_organ_marker_icon_4.png",
          style: {
            width: "40px",
            height: "50px"
          }
        },
        hoverIconStyle: {
          src: "./images/research_organ_marker_icon_4.png",
          style: {
            width: "60px",
            height: "70px"
          }
        },
        selectedIconStyle: {
          src: "./images/research_organ_marker_icon_4.png",
          style: {
            width: "60px",
            height: "70px"
          }
        }
      };
      var iconOffset = {
        defaultOffset: new AMap.Pixel(-20, -35), //默认的图标样式
        hoverOffset: new AMap.Pixel(-28, -50), //鼠标hover时的样式
        selectedOffset: new AMap.Pixel(-28, -50) //选中时的图标样式
      };
      var markerList = new MarkerList({
        map: map,
        //ListElement对应的父节点或者ID
        // listContainer: "myList", //document.getElementById("myList"),
        //选中后显示

        //从数据中读取位置, 返回lngLat
        getPosition: function (item) {
          // return [item.longitude, item.latitude];
          return item.position;
        },
        //数据ID，如果不提供，默认使用数组索引，即index
        getDataId: function (item, index) {
          return item.id;
        },
        getInfoWindow: function (data, context, recycledInfoWindow) {
        },
        //构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
        getMarker: function (data, context, recycledMarker) {
          var label = String.fromCharCode("A".charCodeAt(0) + context.index);
          var restDefaultIconStyle;
          if (recycledMarker) {
            recycledMarker.setIconLabel(label);
            return;
          }
          if (data.schoolType) {
            restDefaultIconStyle = defaultIconStyle;
          } else {
            if (data.type.indexOf("国家") === 0) {
              restDefaultIconStyle = organIconStyle1.defaultIconStyle;
            } else if (data.type.indexOf("省级") === 0) {
              restDefaultIconStyle = organIconStyle2.defaultIconStyle;
            } else if (data.type.indexOf("市级") === 0) {
              restDefaultIconStyle = organIconStyle3.defaultIconStyle;
            } else {
              restDefaultIconStyle = organIconStyle4.defaultIconStyle;
            }
          }
          return new SimpleMarker({
            containerClassNames: "build-marker",
            iconStyle: restDefaultIconStyle,
            // iconLabel: label,
            //设置基点偏移
            offset: iconOffset.defaultOffset
          });
        },
        //构造列表元素，与getMarker类似，可以是函数，返回一个dom元素，或者模板 html string
        getListElement: function (data, context, recycledListElement) {
        },
        //列表节点上监听的事件
        listElementEvents: ["click", "mouseenter", "mouseleave"],
        //marker上监听的事件
        markerEvents: ["click", "mouseover", "mouseout"],
        //makeSelectedEvents:false,
        selectedClassNames: "selected",
        autoSetFitView: false
      });

      // window.markerList = markerList;

      markerList.on("selectedChanged", function (event, info) {
        // $("#myList").hide();
        var selectedIconStyleX;
        var defaultIconStyleX;
        map.setZoom(14);
        if (window.markerList) {
          var data = window.markerList.getAllMarkers();
          data.forEach(function (item, index) {
            item.hide();
          });
        }
        creatResearchOrganPanel(info);
        if (info.selected) {
          console.log(info);
          if (info.selected.marker) {
            if (info.selected.data.schoolType) {
              //更新为选中样式
              info.selected.marker.setIconStyle(selectedIconStyle);
            } else {
              //更新为选中样式

              if (info.selected.data.type.indexOf("国家") === 0) {
                selectedIconStyleX = organIconStyle1.selectedIconStyle;
              } else if (info.selected.data.type.indexOf("省级") === 0) {
                selectedIconStyleX = organIconStyle2.selectedIconStyle;
              } else if (info.selected.data.type.indexOf("市级") === 0) {
                selectedIconStyleX = organIconStyle3.selectedIconStyle;
              } else {
                selectedIconStyleX = organIconStyle4.selectedIconStyle;
              }

              info.selected.marker.setIconStyle(selectedIconStyleX);
            }
            info.selected.marker.setOffset(iconOffset.selectedOffset);
          }
        }

        if (info.unSelected && info.unSelected.marker) {
          if (info.unSelected.data.schoolType) {
            //更新为默认样式
            info.unSelected.marker.setIconStyle(defaultIconStyle);
          } else {
            if (info.selected.data.type.indexOf("国家") === 0) {
              defaultIconStyleX = organIconStyle1.defaultIconStyle;
            } else if (info.selected.data.type.indexOf("省级") === 0) {
              defaultIconStyleX = organIconStyle2.defaultIconStyle;
            } else if (info.selected.data.type.indexOf("市级") === 0) {
              defaultIconStyleX = organIconStyle3.defaultIconStyle;
            } else {
              defaultIconStyleX = organIconStyle4.defaultIconStyle;
            }
            info.unSelected.marker.setIconStyle(defaultIconStyleX);
          }
          info.unSelected.marker.setOffset(iconOffset.defaultOffset);
        }
      });

      markerList.on("listElementMouseenter markerMouseover", function (event,
                                                                       record) {
        var hoverIconStyleX;
        if (record && record.marker) {
          forcusMarker(record.marker);

          //this.openInfoWindowOnRecord(record);

          //非选中的id
          if (!this.isSelectedDataId(record.id)) {
            if (record.data.schoolType) {
              //设置为hover样式
              record.marker.setIconStyle(hoverIconStyle);
            } else {
              if (record.data.type.indexOf("国家") === 0) {
                hoverIconStyleX = organIconStyle1.hoverIconStyle;
              } else if (record.data.type.indexOf("省级") === 0) {
                hoverIconStyleX = organIconStyle2.hoverIconStyle;
              } else if (record.data.type.indexOf("市级") === 0) {
                hoverIconStyleX = organIconStyle3.hoverIconStyle;
              } else {
                hoverIconStyleX = organIconStyle4.hoverIconStyle;
              }
              record.marker.setIconStyle(hoverIconStyleX);
            }
            record.marker.setOffset(iconOffset.hoverOffset);
            //this.closeInfoWindow();
          }
        }
      });

      markerList.on("listElementMouseleave markerMouseout", function (event,
                                                                      record) {
        var defaultIconStyleX;
        if (record && record.marker) {
          if (!this.isSelectedDataId(record.id)) {
            if (record.data.schoolType) {
              //恢复默认样式
              record.marker.setIconStyle(defaultIconStyle);
            } else {
              if (record.data.type.indexOf("国家") === 0) {
                defaultIconStyleX = organIconStyle1.defaultIconStyle;
              } else if (record.data.type.indexOf("省级") === 0) {
                defaultIconStyleX = organIconStyle2.defaultIconStyle;
              } else if (record.data.type.indexOf("市级") === 0) {
                defaultIconStyleX = organIconStyle3.defaultIconStyle;
              } else {
                defaultIconStyleX = organIconStyle4.defaultIconStyle;
              }
              record.marker.setIconStyle(defaultIconStyleX);
            }
            record.marker.setOffset(iconOffset.defaultOffset);
          }
        }
      });

      //数据输出完成
      markerList.on("renderComplete", function (event, records) {
        $(".zdy-buildfull-cover-mask").remove();
        map.setFitView();
      });
      //渲染数据
      markerList.render(options.result);

      function forcusMarker(marker) {
        marker.setTop(true);
        // map.panBy(-580,40);
        //不在地图视野内
        if (!map.getBounds().contains(marker.getPosition())) {
          //移动到中心
          // map.setCenter(marker.getPosition());
        }
      }
    }
  );
}

// 高校和科研机构信息面板
function creatResearchOrganPanel(options) {
  $(".right-top-md-style-xh")
    .removeClass("zoomIn")
    .addClass("zoomOut");
  $(".right-top-md-style-xh")
    .show()
    .removeClass("zoomOut")
    .addClass("zoomIn");
  $(".right-top-md-style-xh").unbind();

  if (options) {
    var landData = options.selected.data;
    tpl = `
          <div class="right-top-md-head">
              <div class="head-img">
                  <img src="./images/info_window_panel_logo.png" alt="">
              </div>
              <div class="close-img">
              </div>
              <div style="height: 1px;"></div>
              <div class="title" title="${landData.name}">${landData.name}</div>
          </div>
          <div class="right-top-md-body">
              <div class="body-address">
                  <div class="body-address-img">
                      <img src="./images/address_icon.png" alt="">
                  </div>
                  <div class="body-address-font">${landData.address}</div>
              </div>
              <div class="detail-desc" style="max-height: 300px;overflow-y: scroll;">
                <div class="desc-text">
                    ${
      landData.generalSituation
        ? landData.generalSituation
        : "暂无数据"
      }
                </div>
            </div>
          </div>`;
  }
  $(".right-top-md-style-xh")
    .html(tpl)
    .css("top", "317px");
  $(".right-top-md-style-xh").on("click", ".close-img", function () {
    $(".right-top-md-style-xh").hide();
    // $(".icon-ctrl-panel-xh").removeClass("active");
  });
}

/*科研机构*/
$(".function-land .research-organ,.research-organ-menu .high-school").on(
  "click",
  function () {
    if (!$(this).hasClass("active")) {
      loadingFullAnimat("zdy-full-cover-mask", "body");
      /*清除所有覆盖物*/
      map.clearMap();
      initControll();
      // $(".research-organ-menu").show();
      $(this).addClass("active");
      $(this)
        .parents(".item")
        .addClass("active");
      /*绘制所有地块显示范围*/
      creatWestAreaLandRange(map, function () {
        creatHighSchool();
        // creatResearchOrgan();
      });
      $(".icon-ctrl-panel-xh")
        .html(
          `
      <div class="icon-ctrl-head">
        <div class="title">图标示意</div>
    </div>
    <div class="icon-ctrl-body">
      <div class="icon-ctrl-body-item">
        <div class="icon-ctrl-body-item">
          <div class="color-img"><img src="./images/high_school_tips_icon.png" alt=""></div>
          <div class="item-text">高校</div>
        </div>
        <div class="icon-ctrl-body-item">
          <div class="color-img"><img src="./images/guo.png" alt=""></div>
          <div class="item-text">国家级</div>
        </div>
        <div class="icon-ctrl-body-item">
          <div class="color-img"><img src="./images/sheng.png" alt=""></div>
          <div class="item-text">省级</div>
        </div>
        <div class="icon-ctrl-body-item">
        <div class="color-img"><img src="./images/shi.png" alt=""></div>
        <div class="item-text">市级</div>
        </div>
      </div>
    </div>
      `
        )
        .addClass("active")
        .show();

      $(".land-panel-con-xh")
        .html(
          `
            <div class="item land-use-purpose" style="height: auto;">
            <div class="use-purpose-title"><span class="title">概况</span></div>
            <!-- <div class="use-purpose-bd" id="wastewaterPlantPanel-echarts"></div> -->
            <div class="icon-ctrl-body">
            <div class="icon-ctrl-body-item" style="width:540px; padding: 30px;">
                <div class="detail-desc">
                  <div class="icon-ctrl-body-item hospital" style="width:540px">
                      <div class="hospital-person-total" style="flex: 3; color:#000">科研机构数：</div>
                      <div>103</div>
                      <div style="flex: 3;"></div>
                      <div></div>
                  </div>
                  <div class="icon-ctrl-body-item hospital" style="width:540px">
                      <div class="hospital-person-total" style="flex: 3; color:#999">国家级科研机构数：</div>
                      <div style="color:#999">5</div>
                      <div style="flex: 3;"></div>
                      <div></div>
                  </div>
                <div class="icon-ctrl-body-item hospital" style="width:540px">
                      <div class="hospital-person-total" style="flex: 3; color:#999">省级科研机构数：</div>
                      <div style="color:#999">52</div>
                      <div style="flex: 3;"></div>
                      <div></div>
                  </div>
                  <div class="icon-ctrl-body-item hospital" style="width:540px">
                      <div class="hospital-person-total" style="flex: 3; color:#999">市级科研机构数：</div>
                      <div style="color:#999">46</div>
                      <div style="flex: 3;"></div>
                      <div></div>
                  </div>
                  <div class="icon-ctrl-body-item hospital" style="width:540px">
                      <div class="hospital-person-total" style="flex: 3; color:#000">高校数：</div>
                      <div calss="hospital-person-total-number">4 所</div>
                      <div class="hospital-person-total" style="flex: 3; color:#999"></div>
                      <div calss="hospital-person-total-number"></div>
                  </div>
                  <div class="icon-ctrl-body-item hospital" style="width:540px">
                      <div class="hospital-person-total" style="flex: 3; color:#999">985：</div>
                      <div calss="hospital-person-total-number">1 所</div>
                      <div class="hospital-person-total" style="flex: 3; color:#999">211：</div>
                      <div calss="hospital-person-total-number">1 所</div>
                  </div>
                </div>
              </div>
            </div>
            `
        )
        .show();


    }
  }
);
/*变电站信息面板*/

// 接口调用 公司列表
function getCompanyListAndShow(index, coordinate) {
  var distanceLess = index === 0 ? 0 : index * 1000 + 1000;
  var distanceMore = index === 0 ? 2000 : index * 1000 + 2000;
  distanceLess = index === 4 ? 5000 : distanceLess;
  distanceMore = index === 4 ? 10000 : distanceMore;
  var MAX_PAGE = 0;
  var PAGE = 1;
  var DATA;
  var MAX_INDEX;
  $.ajax({
    url: "./jsonData/getRangeCompany.json",
    method: "get",
    data: {
      coordinate: coordinate,
      distanceMore: distanceMore,
      distanceLess: distanceLess
    },
    success: function (res) {
      var data = [];
      for (var i = 0; i < res.companys.length; i++) {
        if (res.companys[i].coordinate) {
          var list = {};
          list = res.companys[i];
          list.address = res.companys[i].address;
          list.id = res.companys[i].id;
          list.name = res.companys[i].name;
          list.position = res.companys[i].coordinate.split(",");
          data.push(list);
        }
      }

      if (window.markerList) {
        var data_marker_list = window.markerList.getAllMarkers();
        console.log(
          "MARKERLIST CLICK++++++++++++++++++++++++++++++++++",
          data_marker_list
        );
        data_marker_list.forEach(function (item, index) {
          item.hide();
        });
      }
      BuildInfoXH(map, coordinate, data);

      DATA = res;
      MAX_PAGE = Math.ceil(DATA.companys.length / 10);
      MAX_INDEX = DATA.companys.length;
      renderCompanyListPanel(PAGE);
      registeCompanyListPre();
      registeCompanyListNext();
    }
  });

  function renderCompanyListPanel(index) {
    var tmpl = "";
    for (var i = index * 10; i < (index + 1) * 10; i++) {
      if (i === MAX_INDEX) {
        return;
      }
      tmpl += `
        <div class="company-list-xh">
          <div class="company-logo-xh"></div>
          <div class="company-name-xh">${DATA.companys[i].name}</div>
        </div>
        `;
    }
    $(".use-purpose-bd-company-list-xh")
      .html("")
      .html(tmpl);
  }

  function registeCompanyListPre() {
    $(".company-list-pre-button-xh")
      .unbind()
      .on("click", function () {
        PAGE = (PAGE - 1) % MAX_PAGE;
        renderCompanyListPanel(PAGE);
      });
  }

  function registeCompanyListNext() {
    $(".company-list-next-button-xh")
      .unbind()
      .on("click", function () {
        PAGE = (PAGE + 1) % MAX_PAGE;
        renderCompanyListPanel(PAGE);
      });
  }
}

function viewLandPanelXH(options) {
  var data = options.selected.data;
  $(".icon-ctrl-panel-xh").addClass("active");
  $(".microcosmic_container")
    .show()
    .removeClass("slideOutRight")
    .addClass("slideInRight");
  var tpl = `
    <div class="right-top-md-style right-top-md-style-xh">
      <div class="right-top-md-head">
          <div class="head-img">
              <img src="./images/info_window_panel_logo.png" alt="">
          </div>
          <div style="height: 1px;"></div>
          <div class="title" title="${data.name}">${data.name}</div>
      </div>
      <div class="right-top-md-body">
          <div class="body-address">
              <div class="body-address-img">
                  <img src="./images/address_icon.png" alt="">
              </div>
              <div class="body-address-font">${data.address}</div>
          </div>
          <div class="detail-desc">
              <div class="desc-text">
                  ${data.generalSituation}
              </div>
          </div>
          <div class="land-panel-con" style="width: 96%; margin: 0 auto; overflow: hidden; border: 1px solid #f9b620; border-radius: 20px;">
            <div class="item land-use-purpose land-use-purpose-km-xh">
                <div class="use-purpose-title">
                  <span class="title" style="float: left;">站内企业</span>
                  <div style="height: 50px; overflow: hidden; box-shadow: 35px -6px 21px -1px;">
                    <div class="km-item-box-xh">
                      <ul>
                        <li style="width: 80px; margin-left: 8px;">2公里以内</li>
                        <li>2-3公里</li>
                        <li>3-4公里</li>
                        <li>4-5公里</li>
                        <li>5-10公里</li>
                      </ul>
                    </div>
                    <!-- <div class="add-length-xh"></div> -->
                  </div>
                </div>
                <div class="use-purpose-bd use-purpose-bd-company-list-xh" id="land-proportion">
                  <div class="company-list-xh">
                    <div class="company-logo-xh"></div>
                    <div class="company-name-xh">华为科技有限责任公司</div>
                  </div>
                  <div class="company-list-xh">
                    <div class="company-logo-xh"></div>
                    <div class="company-name-xh">百度科技有限责任公司</div>
                  </div>
                  <div class="company-list-xh">
                    <div class="company-logo-xh"></div>
                    <div class="company-name-xh">滴滴科技有限责任公司</div>
                  </div>
                </div>
            </div>
          </div>
          <div class="pre-and-next-button-box-xh">
            <div class="company-list-pre-button-xh"></div>
            <div class="company-list-next-button-xh"></div>
          </div>
      </div>
  </div>
    `;
  $(".microcosmic_container .land-panel-con").html(tpl);
  var ulLeftLength = 0,
    MAX_LEFT_LENGTH = 350,
    LEFT_STEP = 70;
  $(".add-length-xh")
    .unbind()
    .on("click", function () {
      var beforeLeft = ulLeftLength;
      ulLeftLength = (ulLeftLength + LEFT_STEP) % (MAX_LEFT_LENGTH + LEFT_STEP);
      for (var i = 0; i < 20; i++) {
        (function (i) {
          setTimeout(function () {
            var l = beforeLeft + (ulLeftLength - beforeLeft) * (i + 1) / 20;
            $(".km-item-box-xh ul").css("left", `-${l}px`);
          }, i * 25);
        })(i);
      }
    });
  getCompanyListAndShow(0, data.coordinate);
  $($(".km-item-box-xh ul li")[0])
    .addClass("active")
    .siblings()
    .removeClass("active");

  $(".km-item-box-xh ul li")
    .unbind()
    .on("click", function () {
      var index = $(this).index();
      $(this)
        .addClass("active")
        .siblings()
        .removeClass("active");
      getCompanyListAndShow(index, data.coordinate);
    });
  $(".back-arrow-btn").removeClass("active");
}

// options: 变电站的三个坐标
function createCircle(centerPoint, type) {
  /*
  * 添加Canvas图层
  */
  var CONFIG = {
    bounds: {
      leftBottom: [103.67, 30.52],
      rightTop: [104.23, 30.98]
    },
    centerPoint: centerPoint,
    radius: 3000,
    fillStyle: "rgb(255, 83, 0)",
    lengthForOneKM: 70
  };
  var canvas = document.createElement("canvas");
  canvas.width = canvas.height = CONFIG.radius;
  var context = canvas.getContext("2d");
  context.fillStyle = CONFIG.fillStyle;
  context.strokeStyle = "white";
  context.globalAlpha = 1;
  context.lineWidth = 1;
  var radious = 0;
  var draw = function (argument) {
    context.clearRect(0, 0, CONFIG.radius, CONFIG.radius);
    var x = (
      CONFIG.radius /
      (CONFIG.bounds.rightTop[0] - CONFIG.bounds.leftBottom[0]) *
      (centerPoint[0] - CONFIG.bounds.leftBottom[0])
    ).toFixed(3);
    var y = (
      CONFIG.radius /
      (CONFIG.bounds.rightTop[1] - CONFIG.bounds.leftBottom[1]) *
      (CONFIG.bounds.rightTop[1] - centerPoint[1])
    ).toFixed(3);
    // context.fillRect(0,0,2000,2000);
    // context.globalAlpha = (context.globalAlpha-0.02+1)%1;
    // radious=(radious+1)%50;
    //11111111111111111111111111
    context.globalAlpha = 0.1;
    context.beginPath();
    context.arc(x, y, CONFIG.lengthForOneKM * 10, 0, 2 * Math.PI);
    context.fill();
    context.stroke();

    context.beginPath();
    context.arc(x, y, CONFIG.lengthForOneKM * 5, 0, 2 * Math.PI);
    context.fill();
    context.stroke();

    context.beginPath();
    context.arc(x, y, CONFIG.lengthForOneKM * 4, 0, 2 * Math.PI);
    context.fill();
    context.stroke();

    context.beginPath();
    context.arc(x, y, CONFIG.lengthForOneKM * 3, 0, 2 * Math.PI);
    context.fill();
    context.stroke();

    context.beginPath();
    context.arc(x, y, CONFIG.lengthForOneKM * 2, 0, 2 * Math.PI);
    context.fill();
    context.stroke();

    //2222222222222222222222222222222

    //333333333333333333333333333333333

    // context.fillStyle = "blue";
    // context.fillRect(46,104,10,10);
    // context.beginPath();
    // context.arc(50,110,40,0,2*Math.PI);
    // context.stroke();
    // context.fillStyle = "red";
    // context.fillRect(100,100,500,500);
    CanvasLayer.reFresh(); //2D视图时可以省略
    AMap.Util.requestAnimFrame(draw);
  };

  if (type === "住宅") {
    draw = function (argument) {
      context.clearRect(0, 0, CONFIG.radius, 2000);
      var x = (
        CONFIG.radius /
        (CONFIG.bounds.rightTop[0] - CONFIG.bounds.leftBottom[0]) *
        (centerPoint[0] - CONFIG.bounds.leftBottom[0])
      ).toFixed(3);
      var y = (
        CONFIG.radius /
        (CONFIG.bounds.rightTop[1] - CONFIG.bounds.leftBottom[1]) *
        (CONFIG.bounds.rightTop[1] - centerPoint[1])
      ).toFixed(3);
      context.globalAlpha = 0.2;
      context.beginPath();
      context.arc(x, y, 90, 0, 2 * Math.PI);
      context.fill();
      context.stroke();
      CanvasLayer.reFresh(); //2D视图时可以省略
      AMap.Util.requestAnimFrame(draw);
    };
  }

  var CanvasLayer = new AMap.CanvasLayer({
    canvas: canvas,
    bounds: new AMap.Bounds(
      CONFIG.bounds.leftBottom,
      CONFIG.bounds.rightTop
      // [103.880661784543,30.70941170844],
      // [103.990439116652,30.809838021823]
    ),
    zIndex: 110,
    zooms: [3, 18]
  });

  CanvasLayer.setMap(map);
  draw();

  window.CanvasLayer = CanvasLayer;
}

function BuildInfoXH(map, coordinate, data) {
  loadingFullAnimat("zdy-buildfull-cover-mask", "body");

  AMapUI.loadUI(
    ["misc/MarkerList", "overlay/SimpleMarker", "overlay/SimpleInfoWindow"],
    function (MarkerList, SimpleMarker, SimpleInfoWindow) {
      //即jQuery/Zepto
      // var $ = MarkerList.utils.$;

      var defaultIconStyle = {
          src: "./images/build_position_icon.png",
          style: {
            width: "40px",
            height: "50px"
          }
        }, //默认的图标样式
        // hoverIconStyle = 'green', //鼠标hover时的样式
        hoverIconStyle = {
          src: "./images/build_position_icon.png",
          style: {
            width: "60px",
            height: "70px"
          }
        }, //鼠标hover时的样式
        selectedIconStyle = {
          src: "./images/build_position_icon.png",
          style: {
            width: "60px",
            height: "70px"
          }
        }; //选中时的图标样式
      var iconOffset = {
        defaultOffset: new AMap.Pixel(-20, -35), //默认的图标样式
        hoverOffset: new AMap.Pixel(-28, -50), //鼠标hover时的样式
        selectedOffset: new AMap.Pixel(-28, -50) //选中时的图标样式
      };
      var markerList = new MarkerList({
        map: map,
        //ListElement对应的父节点或者ID
        listContainer: "myList", //document.getElementById("myList"),
        //选中后显示

        //从数据中读取位置, 返回lngLat
        getPosition: function (item) {
          // return [item.longitude, item.latitude];
          return item.position;
        },
        //数据ID，如果不提供，默认使用数组索引，即index
        getDataId: function (item, index) {
          return item.id;
        },
        getInfoWindow: function (data, context, recycledInfoWindow) {
        },
        //构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
        getMarker: function (data, context, recycledMarker) {
          var label = String.fromCharCode("A".charCodeAt(0) + context.index);

          if (recycledMarker) {
            recycledMarker.setIconLabel(label);
            return;
          }

          return new SimpleMarker({
            containerClassNames: "build-marker",
            iconStyle: defaultIconStyle,
            // iconLabel: label,
            //设置基点偏移
            offset: iconOffset.defaultOffset
          });
        },
        //构造列表元素，与getMarker类似，可以是函数，返回一个dom元素，或者模板 html string
        getListElement: function (data, context, recycledListElement) {
        },
        //列表节点上监听的事件
        listElementEvents: ["click", "mouseenter", "mouseleave"],
        //marker上监听的事件
        markerEvents: ["click", "mouseover", "mouseout"],
        //makeSelectedEvents:false,
        selectedClassNames: "selected",
        autoSetFitView: false
      });

      window.markerList = markerList;

      markerList.on("selectedChanged", function (event, info) {
        // $("#myList").hide();
        // map.panBy(-580,40);
        map.setZoom(14);

        console.log("MARKERLIST CLICK++++++++++++++++++++++++++++++++++");

        $("#myList").slideUp("fast");
        $(".build-arrow").removeClass("active");
        if (info.selected) {
          $(".choose-park-buid-name").html(info.selected.data.name);
          chooseBuildName = info.selected.data.name;
          chooseBuildId = info.selected.data.id;

          /*if($(".industry-menu .menu-row:last-child li.active").length){
              $(".industry-menu .menu-row:last-child li.active").click();
          }else{
              $(".industry-menu .menu-row:last-child li:first-child").click();
          }*/
          console.log(info);

          if (info.selected.marker) {
            //更新为选中样式
            info.selected.marker.setIconStyle(selectedIconStyle);
            info.selected.marker.setOffset(iconOffset.selectedOffset);
          }

          //选中并非由列表节点上的事件触发，将关联的列表节点移动到视野内
          if (!info.sourceEventInfo.isListElementEvent) {
            if (info.selected.listElement) {
              scrollListElementIntoView($(info.selected.listElement));
            }
          }
        }

        if (info.unSelected && info.unSelected.marker) {
          //更新为默认样式
          info.unSelected.marker.setIconStyle(defaultIconStyle);
          info.unSelected.marker.setOffset(iconOffset.defaultOffset);
        }
      });

      markerList.on("listElementMouseenter markerMouseover", function (event,
                                                                       record) {
        if (record && record.marker) {
          forcusMarker(record.marker);

          //this.openInfoWindowOnRecord(record);

          //非选中的id
          if (!this.isSelectedDataId(record.id)) {
            //设置为hover样式
            record.marker.setIconStyle(hoverIconStyle);
            record.marker.setOffset(iconOffset.hoverOffset);
            //this.closeInfoWindow();
          }
        }
      });

      markerList.on("listElementMouseleave markerMouseout", function (event,
                                                                      record) {
        if (record && record.marker) {
          if (!this.isSelectedDataId(record.id)) {
            //恢复默认样式
            record.marker.setIconStyle(defaultIconStyle);
            record.marker.setOffset(iconOffset.defaultOffset);
          }
        }
      });

      //数据输出完成
      markerList.on("renderComplete", function (event, records) {
        $(".zdy-buildfull-cover-mask").remove();
        map.setFitView();
        // map.panBy(-580,40);
      });

      //加载数据
      // function loadData(src, callback) {
      //   console.log(src)
      //   $.ajax({
      //     // url:"/v1/company/getLet",
      //     url:"/v1/transformerStation/getAroundCompany",
      //     type:"GET",
      //     dataType:"json",
      //     data:{
      //       coordinate: coordinate,
      //       distance: 3000
      //     },
      //     success:function(res){
      //       console.log("变电站周围的企业==========================================", res);
      //       // $(".zdy-buildfull-cover-mask").remove();
      //       var result = [];
      //       for(var i=0;i<100;i++){
      //         if(res.companys[i].coordinate){
      //           var list={};
      //           list = res.companys[i];
      //           list.address = res.companys[i].address;
      //           list.id = res.companys[i].id;
      //           list.name = res.companys[i].name;
      //           list.position = res.companys[i].coordinate.split(",");
      //           result.push(list);
      //         }
      //       }
      //       markerList.render(result);
      //     },error:function(err){
      //       console.log(err)
      //     }

      //   })
      // }

      // if(data) {
      markerList.render(data);
      // } else {
      //   loadData();
      // }

      function forcusMarker(marker) {
        marker.setTop(true);
        marker.setzIndex(200);
        // map.panBy(-580,40);
        //不在地图视野内
        if (!map.getBounds().contains(marker.getPosition())) {
          //移动到中心
          // map.setCenter(marker.getPosition());
        }
      }

      function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();

        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
          (window.innerHeight ||
            document.documentElement
              .clientHeight) /*or $(window).height() */ &&
          rect.right <=
          (window.innerWidth ||
            document.documentElement.clientWidth) /*or $(window).width() */
        );
      }

      function scrollListElementIntoView($listEle) {
        if (!isElementInViewport($listEle.get(0))) {
          $("#panel").scrollTop(
            $listEle.offset().top - $listEle.parent().offset().top
          );
        }

        //闪动一下
        $listEle
          .one(
            "webkitAnimationEnd oanimationend msAnimationEnd animationend",
            function (e) {
              $(this).removeClass("flash animated");
            }
          )
          .addClass("flash animated");
      }
    }
  );
}

// CanvasLayers[0].hide();
// (function(map){
/*变电站信息*/
function parkBuildInfoXH(map, parkName) {
  loadingFullAnimat("zdy-buildfull-cover-mask", "body");

  AMapUI.loadUI(
    ["misc/MarkerList", "overlay/SimpleMarker", "overlay/SimpleInfoWindow"],
    function (MarkerList, SimpleMarker, SimpleInfoWindow) {
      //即jQuery/Zepto
      // var $ = MarkerList.utils.$;

      var defaultIconStyle = {
          src: "./images/electric_station_marker_icon.png",
          style: {
            width: "40px",
            height: "50px"
          }
        }, //默认的图标样式
        // hoverIconStyle = 'green', //鼠标hover时的样式
        hoverIconStyle = {
          src: "./images/electric_station_marker_icon.png",
          style: {
            width: "60px",
            height: "70px"
          }
        }, //鼠标hover时的样式
        selectedIconStyle = {
          src: "./images/electric_station_marker_icon.png",
          style: {
            width: "60px",
            height: "70px"
          }
        }; //选中时的图标样式
      var signalStationIconStyle = {
        defaultIconStyle : {
          src: "./images/signal_station_marker_icon.png",
          style: {
            width: "40px",
            height: "50px"
          }
        }, //默认的图标样式
        // hoverIconStyle = 'green', //鼠标hover时的样式
        hoverIconStyle : {
          src: "./images/signal_station_marker_icon.png",
          style: {
            width: "60px",
            height: "70px"
          }
        }, //鼠标hover时的样式
        selectedIconStyle : {
          src: "./images/signal_station_marker_icon.png",
          style: {
            width: "60px",
            height: "70px"
          }
        } //选中时的图标样式
      }

      var iconOffset = {
        defaultOffset: new AMap.Pixel(-20, -35), //默认的图标样式
        hoverOffset: new AMap.Pixel(-28, -50), //鼠标hover时的样式
        selectedOffset: new AMap.Pixel(-28, -50) //选中时的图标样式
      };
      var markerList = new MarkerList({
        map: map,
        //ListElement对应的父节点或者ID
        listContainer: "myList", //document.getElementById("myList"),
        //选中后显示

        //从数据中读取位置, 返回lngLat
        getPosition: function (item) {
          // return [item.longitude, item.latitude];
          return item.position;
        },
        //数据ID，如果不提供，默认使用数组索引，即index
        getDataId: function (item, index) {
          return item.id;
        },
        getInfoWindow: function (data, context, recycledInfoWindow) {
        },
        //构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
        getMarker: function (data, context, recycledMarker) {
          var label = String.fromCharCode("A".charCodeAt(0) + context.index);

          if (recycledMarker) {
            recycledMarker.setIconLabel(label);
            return;
          }
          var iconStyle = null;
          if(data.name.indexOf('通信基站') > -1){
            iconStyle = signalStationIconStyle.defaultIconStyle;
          }else{
            iconStyle = defaultIconStyle;
          }
          return new SimpleMarker({
            containerClassNames: "build-marker",
            iconStyle: iconStyle,
            // iconLabel: label,
            //设置基点偏移
            offset: iconOffset.defaultOffset
          });
        },
        //构造列表元素，与getMarker类似，可以是函数，返回一个dom元素，或者模板 html string
        getListElement: function (data, context, recycledListElement) {
        },
        //列表节点上监听的事件
        listElementEvents: ["click", "mouseenter", "mouseleave"],
        //marker上监听的事件
        markerEvents: ["click", "mouseover", "mouseout"],
        //makeSelectedEvents:false,
        selectedClassNames: "selected",
        autoSetFitView: false
      });

      // window.markerList = markerList;

      markerList.on("selectedChanged", function (event, info) {
        // $("#myList").hide();
        // map.panBy(-580,40);
        /*判断是否通信基站*/
        if(info.selected.data.name.indexOf('通信基站') < 0){
          map.setZoom(14);

          console.log("MARKERLIST CLICK++++++++++++++++++++++++++++++++++");
          if (window.markerList) {
            var data = window.markerList.getAllMarkers();
            console.log(
              "MARKERLIST CLICK++++++++++++++++++++++++++++++++++",
              data
            );
            data.forEach(function (item, index) {
              item.hide();
            });
          }

          if (window.CanvasLayer) {
            window.CanvasLayer.hide();
          }
          createCircle(info.selected.data.position);
          viewLandPanelXH(info);

          $("#myList").slideUp("fast");
          $(".build-arrow").removeClass("active");
          if (info.selected) {
            $(".choose-park-buid-name").html(info.selected.data.name);
            chooseBuildName = info.selected.data.name;
            chooseBuildId = info.selected.data.id;

            /*if($(".industry-menu .menu-row:last-child li.active").length){
                $(".industry-menu .menu-row:last-child li.active").click();
            }else{
                $(".industry-menu .menu-row:last-child li:first-child").click();
            }*/
            console.log(info);
            // 加载周围的企业
            // BuildInfoXH(map, info.selected.data.position.join(','));

            if (info.selected.marker) {
              //更新为选中样式
              if(info.selected.data.name.indexOf('通信基站') > -1){
                info.selected.marker.setIconStyle(signalStationIconStyle.selectedIconStyle);
              }else{
                info.selected.marker.setIconStyle(selectedIconStyle);
              }
              info.selected.marker.setOffset(iconOffset.selectedOffset);
            }

            //选中并非由列表节点上的事件触发，将关联的列表节点移动到视野内
            if (!info.sourceEventInfo.isListElementEvent) {
              if (info.selected.listElement) {
                scrollListElementIntoView($(info.selected.listElement));
              }
            }
          }

          if (info.unSelected && info.unSelected.marker) {
            //更新为默认样式
            if(info.unSelected.data.name.indexOf('通信基站') > -1){
              info.unSelected.marker.setIconStyle(signalStationIconStyle.defaultIconStyle);
            }else {
              info.unSelected.marker.setIconStyle(defaultIconStyle);
            }
            info.unSelected.marker.setOffset(iconOffset.defaultOffset);
          }
        }
      });

      markerList.on("listElementMouseenter markerMouseover", function (event,
                                                                       record) {
        if (record && record.marker) {
          forcusMarker(record.marker);

          //this.openInfoWindowOnRecord(record);

          //非选中的id
          if (!this.isSelectedDataId(record.id)) {
            //设置为hover样式
            if(record.data.name.indexOf('通信基站') > -1){
              record.marker.setIconStyle(signalStationIconStyle.hoverIconStyle);
            }else {
              record.marker.setIconStyle(hoverIconStyle);
            }
            record.marker.setOffset(iconOffset.hoverOffset);
            //this.closeInfoWindow();
          }
        }
      });

      markerList.on("listElementMouseleave markerMouseout", function (event,
                                                                      record) {
        if (record && record.marker) {
          if (!this.isSelectedDataId(record.id)) {
            //恢复默认样式
            if(record.data.name.indexOf('通信基站') > -1){
              record.marker.setIconStyle(signalStationIconStyle.defaultIconStyle);
            }else {
              record.marker.setIconStyle(defaultIconStyle);
            }
            record.marker.setOffset(iconOffset.defaultOffset);
          }
        }
      });

      //数据输出完成
      markerList.on("renderComplete", function (event, records) {
        $(".zdy-buildfull-cover-mask").remove();
        map.setFitView();
        // map.panBy(-580,40);
      });

      //加载数据
      function loadData(src, callback) {
        console.log(src);
        $.ajax({
          // url:"/v1/company/getLet",
          url: "./jsonData/transformerStationgetAll.json",
          type: "GET",
          dataType: "json",
          data: {},
          success: function (res) {
            var result = [];
            for (var i = 0; i < res.datas.length; i++) {
              if (res.datas[i].coordinate) {
                var list = {};
                list = res.datas[i];
                list.address = res.datas[i].address;
                list.id = res.datas[i].id;
                list.name = res.datas[i].name;
                list.position = res.datas[i].coordinate.split(",");
                result.push(list);
              }
            }

            $(".icon-ctrl-panel-xh")
              .html(
                `
                                  <div class="icon-ctrl-head">
                                    <div class="title">图标示意</div>
                                  </div>
                                  <div class="icon-ctrl-body">
                                      <div class="icon-ctrl-body-item" style="width: 125px;">
                                          <div class="color-img"><img src="./images/electric_station_tips_icon.png" alt=""></div>
                                          <div class="item-text">变电站</div>
                                      </div>
                                      <div class="icon-ctrl-body-item">
                                          <div class="color-img"><img src="./images/enterprise_tips_icon.png" alt=""></div>
                                          <div class="item-text">企业</div>
                                      </div>
                                      <!--<div class="icon-ctrl-body-item">-->
                                          <!--<div class="color-img"><img src="../images/research_organ_tips_icon.png" alt=""></div>-->
                                          <!--<div class="item-text">通信基站</div>-->
                                      <!--</div>-->
                                  </div>`
              )
              .addClass("active")
              // .css("max-width", "200px")
              .show();


            $(".land-panel-con-xh")
              .html(
                `
                <div class="item land-use-purpose" style="height: auto;">
                    <div class="use-purpose-title"><span class="title">概况</span></div>
                    <!-- <div class="use-purpose-bd" id="wastewaterPlantPanel-echarts"></div> -->
                    <div style="padding: 10px 0 1px 50px;">
                        <p style="margin: 60px 30px;font-size: 22px;">变电站总数 <span style="margin-left: 100px;">${res.datas.length}</span></p>
                        <!--<p style="margin: 60px 30px;font-size: 22px;">通讯基站总数 <span style="margin-left: 100px;">380</span></p>-->
                    </div>
                </div>`
              )
              // .css("max-width", "200px")
              .show();

            /*$.ajax({
              // url:"/v1/company/getLet",
              url: "/v1/communicationStation/findAll",
              type: "GET",
              dataType: "json",
              data: {},
              success: function (res) {
                for (var i = 0; i < res.datas.length; i++) {
                  if (res.datas[i].coordinate) {
                    var list = {};
                    list = res.datas[i];
                    list.address = res.datas[i].address;
                    list.id = res.datas[i].id;
                    list.name = res.datas[i].name;
                    list.position = res.datas[i].coordinate.split(",");
                    result.push(list);
                  }
                }

                markerList.render(result);
              },
              error: function (err) {
                console.log(err);
              }
            });*/
            markerList.render(result);
          },
          error: function (err) {
            console.log(err);
          }
        });

      }

      loadData();

      function forcusMarker(marker) {
        marker.setTop(true);
        // map.panBy(-580,40);
        //不在地图视野内
        if (!map.getBounds().contains(marker.getPosition())) {
          //移动到中心
          // map.setCenter(marker.getPosition());
        }
      }

      function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();

        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
          (window.innerHeight ||
            document.documentElement
              .clientHeight) /*or $(window).height() */ &&
          rect.right <=
          (window.innerWidth ||
            document.documentElement.clientWidth) /*or $(window).width() */
        );
      }

      function scrollListElementIntoView($listEle) {
        if (!isElementInViewport($listEle.get(0))) {
          $("#panel").scrollTop(
            $listEle.offset().top - $listEle.parent().offset().top
          );
        }

        //闪动一下
        $listEle
          .one(
            "webkitAnimationEnd oanimationend msAnimationEnd animationend",
            function (e) {
              $(this).removeClass("flash animated");
            }
          )
          .addClass("flash animated");
      }
    }
  );

  // CanvasLayer.show();
}

/*功能-变电站-xh*/
$(".item.item4.function-land .sub-menu .electric-station").on("click", function (oEvent) {
  if (!$(this).hasClass("active")) {
    loadingFullAnimat("zdy-full-cover-mask", "body");
    // map.setFitView();
    // map.setZoom(14);
    map.clearMap();
    oEvent.stopPropagation();
    if ("markerList" in window && markerList.getData().length > 0) {
      //清除marker数据
      markerList.render([]);
    }
    initControll();
    $(this).addClass("active");
    $(this)
      .parents(".item")
      .addClass("active")
      .siblings()
      .removeClass("active");

    // $(".industry-menu .menu-row:last-child li").show();
    // map.setFitView();
    // map.panBy(-580, 40);
    // map.setFitView();
    // map.setZoom(14);
    /*绘制所有地块显示范围*/
    creatWestAreaLandRange(map, function () {
      parkBuildInfoXH(map, "");
    });
  }
});
// })(map)

/*功能模块*/

// 污水处理厂信息面板
function wastewaterPlantPanelXH(options) {
  // $(".icon-ctrl-panel-xh").addClass("active");

  $(".right-top-md-style-xh")
    .removeClass("zoomIn")
    .addClass("zoomOut");
  $(".right-top-md-style-xh")
    .show()
    .removeClass("zoomOut")
    .addClass("zoomIn");
  $(".right-top-md-style-xh").unbind();

  if (options) {
    var landData = options.selected.data;
    tpl = `
        <div class="right-top-md-head">
            <div class="head-img">
                <img src="./images/info_window_panel_logo.png" alt="">
            </div>
            <div class="close-img">
            </div>
            <div style="height: 1px;"></div>
            <div class="title" title="${landData.name}">${landData.name}</div>
        </div>
        <div class="right-top-md-body">
            <div class="body-address">
                <div class="body-address-img">
                    <img src="./images/address_icon.png" alt="">
                </div>
                <div class="body-address-font">${landData.address}</div>
            </div>
            <div class="detail-desc">
              <div class="desc-text">
                  ${landData.desc}
              </div>
          </div>
        </div>`;
  }
  $(".right-top-md-style-xh")
    .css("top", "435px")
    .html(tpl)
    .show();
  $(".right-top-md-style-xh").on("click", ".close-img", function () {
    $(".right-top-md-style-xh").hide();
    // $(".icon-ctrl-panel-xh").removeClass("active");
  });
}

// 标记功能-污水处理厂模块
function wastewaterPlantInfoXH(map, parkName) {
  loadingFullAnimat("zdy-buildfull-cover-mask", "body");

  AMapUI.loadUI(
    ["misc/MarkerList", "overlay/SimpleMarker", "overlay/SimpleInfoWindow"],
    function (MarkerList, SimpleMarker, SimpleInfoWindow) {
      //即jQuery/Zepto
      // var $ = MarkerList.utils.$;

      var defaultIconStyle = {
          src: "./images/foul_water_marker_icon.png",
          style: {
            width: "40px",
            height: "50px"
          }
        }, //默认的图标样式
        // hoverIconStyle = 'green', //鼠标hover时的样式
        hoverIconStyle = {
          src: "./images/foul_water_marker_icon.png",
          style: {
            width: "60px",
            height: "70px"
          }
        }, //鼠标hover时的样式
        selectedIconStyle = {
          src: "./images/foul_water_marker_icon.png",
          style: {
            width: "60px",
            height: "70px"
          }
        }; //选中时的图标样式
      var iconOffset = {
        defaultOffset: new AMap.Pixel(-20, -35), //默认的图标样式
        hoverOffset: new AMap.Pixel(-28, -50), //鼠标hover时的样式
        selectedOffset: new AMap.Pixel(-28, -50) //选中时的图标样式
      };
      var markerList = new MarkerList({
        map: map,
        //ListElement对应的父节点或者ID
        listContainer: "myList", //document.getElementById("myList"),
        //选中后显示

        //从数据中读取位置, 返回lngLat
        getPosition: function (item) {
          // return [item.longitude, item.latitude];
          return item.position;
        },
        //数据ID，如果不提供，默认使用数组索引，即index
        getDataId: function (item, index) {
          return item.id;
        },
        getInfoWindow: function (data, context, recycledInfoWindow) {
        },
        //构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
        getMarker: function (data, context, recycledMarker) {
          var label = String.fromCharCode("A".charCodeAt(0) + context.index);

          if (recycledMarker) {
            recycledMarker.setIconLabel(label);
            return;
          }

          return new SimpleMarker({
            containerClassNames: "build-marker",
            iconStyle: defaultIconStyle,
            // iconLabel: label,
            //设置基点偏移
            offset: iconOffset.defaultOffset
          });
        },
        //构造列表元素，与getMarker类似，可以是函数，返回一个dom元素，或者模板 html string
        getListElement: function (data, context, recycledListElement) {
        },
        //列表节点上监听的事件
        listElementEvents: ["click", "mouseenter", "mouseleave"],
        //marker上监听的事件
        markerEvents: ["click", "mouseover", "mouseout"],
        //makeSelectedEvents:false,
        selectedClassNames: "selected",
        autoSetFitView: false
      });

      // window.markerList = markerList;

      markerList.on("selectedChanged", function (event, info) {
        // $("#myList").hide();
        // map.panBy(-580,40);
        map.setZoom(14);

        if (window.markerList) {
          var data = window.markerList.getAllMarkers();
          console.log(
            "MARKERLIST CLICK++++++++++++++++++++++++++++++++++",
            data
          );
          data.forEach(function (item, index) {
            item.hide();
          });
        }

        // CanvasLayer.show();
        wastewaterPlantPanelXH(info);
        // $(".land-panel-con-xh").hide();
        // viewLandPanelXH(info);
        if (info.selected) {
          chooseBuildName = info.selected.data.name;
          chooseBuildId = info.selected.data.id;

          /*if($(".industry-menu .menu-row:last-child li.active").length){
              $(".industry-menu .menu-row:last-child li.active").click();
          }else{
              $(".industry-menu .menu-row:last-child li:first-child").click();
          }*/
          console.log(info);
          // 加载周围的企业
          // BuildInfoXH(map, info.selected.data.position.join(','));

          if (info.selected.marker) {
            //更新为选中样式
            info.selected.marker.setIconStyle(selectedIconStyle);
            info.selected.marker.setOffset(iconOffset.selectedOffset);
          }

          //选中并非由列表节点上的事件触发，将关联的列表节点移动到视野内
          if (!info.sourceEventInfo.isListElementEvent) {
            if (info.selected.listElement) {
              scrollListElementIntoView($(info.selected.listElement));
            }
          }
        }

        if (info.unSelected && info.unSelected.marker) {
          //更新为默认样式
          info.unSelected.marker.setIconStyle(defaultIconStyle);
          info.unSelected.marker.setOffset(iconOffset.defaultOffset);
        }
      });

      markerList.on("listElementMouseenter markerMouseover", function (event,
                                                                       record) {
        if (record && record.marker) {
          forcusMarker(record.marker);

          //this.openInfoWindowOnRecord(record);

          //非选中的id
          if (!this.isSelectedDataId(record.id)) {
            //设置为hover样式
            record.marker.setIconStyle(hoverIconStyle);
            record.marker.setOffset(iconOffset.hoverOffset);
            //this.closeInfoWindow();
          }
        }
      });

      markerList.on("listElementMouseleave markerMouseout", function (event,
                                                                      record) {
        if (record && record.marker) {
          if (!this.isSelectedDataId(record.id)) {
            //恢复默认样式
            record.marker.setIconStyle(defaultIconStyle);
            record.marker.setOffset(iconOffset.defaultOffset);
          }
        }
      });

      //数据输出完成
      markerList.on("renderComplete", function (event, records) {
        $(".zdy-buildfull-cover-mask").remove();
        map.setFitView();
        // map.panBy(-580,40);
      });

      //加载数据
      function loadData(src, callback) {
        console.log(src);
        $.ajax({
          // url:"/v1/company/getLet",
          url: "./jsonData/wastewaterPlantfindAll.json",
          type: "GET",
          dataType: "json",
          data: {},
          success: function (res) {
            console.log("污水处理厂================》", res);
            var result = [];
            for (var i = 0; i < res.length; i++) {
              if (res[i].coordinate) {
                var list = {};
                list = res[i];
                list.address = res[i].address;
                list.id = res[i].id;
                list.name = res[i].name;
                list.amount = res[i].amount;
                list.desc = res[i].desc;
                list.position = res[i].coordinate.split(",");
                result.push(list);
              }
            }
            markerList.render(result);
          },
          error: function (err) {
            console.log(err);
          }
        });
      }

      loadData();

      function forcusMarker(marker) {
        marker.setTop(true);
        // map.panBy(-580,40);
        //不在地图视野内
        if (!map.getBounds().contains(marker.getPosition())) {
          //移动到中心
          // map.setCenter(marker.getPosition());
        }
      }

      function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();

        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
          (window.innerHeight ||
            document.documentElement
              .clientHeight) /*or $(window).height() */ &&
          rect.right <=
          (window.innerWidth ||
            document.documentElement.clientWidth) /*or $(window).width() */
        );
      }

      function scrollListElementIntoView($listEle) {
        if (!isElementInViewport($listEle.get(0))) {
          $("#panel").scrollTop(
            $listEle.offset().top - $listEle.parent().offset().top
          );
        }

        //闪动一下
        $listEle
          .one(
            "webkitAnimationEnd oanimationend msAnimationEnd animationend",
            function (e) {
              $(this).removeClass("flash animated");
            }
          )
          .addClass("flash animated");
      }
    }
  );

  // CanvasLayer.show();
}

/*功能-污水处理厂模块-xh*/
$(".item.item4.function-land .sub-menu .foul-water").on("click", function (oEvent) {
  if (!$(this).hasClass("active")) {
    loadingFullAnimat("zdy-full-cover-mask", "body");
    console.log(
      ".item.item4.function-land .sub-menu .foul-water================================================================"
    );
    // map.setFitView();
    // map.setZoom(14);
    map.clearMap();
    oEvent.stopPropagation();
    initControll();
    if ("markerList" in window && markerList.getData().length > 0) {
      //清除marker数据
      markerList.render([]);
    }
    $(this).addClass("active");
    $(this)
      .parents(".item")
      .addClass("active")
      .siblings()
      .removeClass("active");

    // $(".industry-menu .menu-row:last-child li").show();
    // map.setFitView();
    // map.panBy(-580, 40);
    // map.setFitView();
    // map.setZoom(14);
    /*绘制所有地块显示范围*/
    creatWestAreaLandRange(map, function () {
      wastewaterPlantInfoXH(map, "");
    });

    // (function(){
    $.ajax({
      url: "./jsonData/productAndDealWith.json",
      method: "get",
      success: function (res) {
        $(".land-panel-con-xh")
          .html(
            `
          <div class="item land-use-purpose" style="height: auto;">
              <div class="use-purpose-title"><span class="title">概况</span></div>
              <div class="use-purpose-bd" id="wastewaterPlantPanel-echarts"></div>
              <div style="padding: 10px 0 1px 50px;">
                  <p>工业废水占总污水处理比 47%</p>
                  <p>生活污水比工业废水还高</p>
                  <p>日均处理10万的合作污水处理厂还要处理郫县的污水</p>
              </div>
          </div>
        `
          )
          .show();
        createWastewaterPlantPanel(res);
      }
    });

    // })()

    function createWastewaterPlantPanel(options) {
      var myChart = echarts.init(
        document.getElementById("wastewaterPlantPanel-echarts")
      );
      var totalProudct = [];
      var totalDealWith = [];
      var real = [];
      var year = [];

      options.forEach(function (item, index) {
        totalProudct.push(-item["totalProudct"]);
        totalDealWith.push(item["totalDealWith"]);
        real.push((item["totalDealWith"] - item["totalProudct"]).toFixed(2));
        year.push(item["year"]);
      });

      option = {
        title: {
          text: "工业废水占总污水处理比",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : ({d}%)"
        },
        legend: {
          x: "center",
          y: "bottom",
          data: ["工业废水", "其他"]
        },
        toolbox: {
          show: false,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {
              show: true,
              type: ["pie", "funnel"]
            },
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        series: [
          {
            name: "占总处理量",
            type: "pie",
            radius: [20, 80],
            roseType: "area",
            data: [
              {value: 4.7, name: "工业废水"},
              {value: 5.3, name: "其他"}
            ]
          }
        ]
      };
      myChart.setOption(option);
    }

    $(".icon-ctrl-panel-xh")
      .html(
        `
      <div class="icon-ctrl-head">
        <div class="title">图标示意</div>
      </div>
      <div class="icon-ctrl-body">
          <div class="icon-ctrl-body-item">
              <div class="color-img"><img src="./images/foul_water_tips_icon.png" alt=""></div>
              <div class="item-text">污水处理厂</div>
          </div>
          <div class="icon-ctrl-body-item">
              <div class="color-img"><img src="./images/enterprise_tips_icon.png" alt=""></div>
              <div class="item-text">企业</div>
          </div>
      </div>`
      )
      // .css("max-width", "200px")
      .show()
      .addClass("active");
  }
});

/*生活-住宅模块*/

// 生活-住宅 连接住宅和学校

var LAYER_COURTYARD_SCHOOL_LINE = null;

function wasteCourtyardCreateLineXH(options) {
  loadingFullAnimat("zdy-buildfull-cover-mask", "body");
  AMapUI.loadUI(
    ["misc/MarkerList", "overlay/SimpleMarker", "overlay/SimpleInfoWindow"],
    function (MarkerList, SimpleMarker, SimpleInfoWindow) {
      var defaultIconStyle = {
          src: "./images/school_marker_icon.png",
          style: {
            width: "40px",
            height: "50px"
          }
        }, //默认的图标样式
        // hoverIconStyle = 'green', //鼠标hover时的样式
        hoverIconStyle = {
          src: "./images/school_marker_icon.png",
          style: {
            width: "60px",
            height: "70px"
          }
        }, //鼠标hover时的样式
        selectedIconStyle = {
          src: "./images/school_marker_icon.png",
          style: {
            width: "60px",
            height: "70px"
          }
        }; //选中时的图标样式

      //   幼儿园标记
      var ChildDefaultIconStyle = {
          src: "./images/child_school_marker_icon.png",
          style: {
            width: "40px",
            height: "50px"
          }
        }, //默认的图标样式
        // hoverIconStyle = 'green', //鼠标hover时的样式
        ChildHoverIconStyle = {
          src: "./images/child_school_marker_icon.png",
          style: {
            width: "60px",
            height: "70px"
          }
        }, //鼠标hover时的样式
        ChildSelectedIconStyle = {
          src: "./images/child_school_marker_icon.png",
          style: {
            width: "60px",
            height: "70px"
          }
        }; //选中时的图标样式
      var iconOffset = {
        defaultOffset: new AMap.Pixel(-20, -35), //默认的图标样式
        hoverOffset: new AMap.Pixel(-28, -50), //鼠标hover时的样式
        selectedOffset: new AMap.Pixel(-28, -50) //选中时的图标样式
      };
      var markerList = new MarkerList({
        map: map,
        //ListElement对应的父节点或者ID
        listContainer: "myList", //document.getElementById("myList"),
        //选中后显示

        //从数据中读取位置, 返回lngLat
        getPosition: function (item) {
          // return [item.longitude, item.latitude];
          return item.position;
        },
        //数据ID，如果不提供，默认使用数组索引，即index
        getDataId: function (item, index) {
          return item.id;
        },
        getInfoWindow: function (data, context, recycledInfoWindow) {
        },
        //构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
        getMarker: function (data, context, recycledMarker) {
          var label = String.fromCharCode("A".charCodeAt(0) + context.index);

          if (recycledMarker) {
            recycledMarker.setIconLabel(label);
            return;
          }

          // 判断是幼儿园还是其他"学校"
          if (data.schoolType === "幼儿园") {
            return new SimpleMarker({
              containerClassNames: "build-marker",
              iconStyle: ChildDefaultIconStyle,
              // iconLabel: label,
              //设置基点偏移
              offset: iconOffset.defaultOffset
            });
          } else {
            return new SimpleMarker({
              containerClassNames: "build-marker",
              iconStyle: defaultIconStyle,
              // iconLabel: label,
              //设置基点偏移
              offset: iconOffset.defaultOffset
            });
          }
        },
        //构造列表元素，与getMarker类似，可以是函数，返回一个dom元素，或者模板 html string
        getListElement: function (data, context, recycledListElement) {
        },
        //列表节点上监听的事件
        listElementEvents: ["click", "mouseenter", "mouseleave"],
        //marker上监听的事件
        markerEvents: ["click", "mouseover", "mouseout"],
        //makeSelectedEvents:false,
        selectedClassNames: "selected",
        autoSetFitView: false
      });

      window.markerList = markerList;
      console.log(
        "ALL MAKERS+++++++++++++++++++++",
        markerList.getAllMarkers()
      );

      markerList.on("selectedChanged", function (event, info) {
        // $("#myList").hide();
        // map.panBy(-580,40);
        map.setZoom(14);

        console.log("MARKERLIST CLICK++++++++++++++++++++++++++++++++++");

        // CanvasLayer.show();
        // wasteCourtyardPanelXH(info);
        // wasteCourtyardCreateLineXH(info.selected.data);
        // viewLandPanelXH(info);

        if (info.selected) {
          $(".right-top-md-style-school-xh")
            .html(
              `
              <div class="right-top-md-head">
                  <div class="head-img">
                      <img src="./images/info_window_panel_logo.png" alt="">
                  </div>
                  <div class="close-img">
                  </div>
                  <div style="height: 1px;"></div>
                  <div class="title" title="${info.selected.data.name}">${
                info.selected.data.name
                }</div>
              </div>
              <div class="right-top-md-body">
                  <div class="body-address">
                      <div class="body-address-img">
                          <img src="./images/address_icon.png" alt="">
                      </div>
                      <div class="body-address-font">${
                info.selected.data.address
                }</div>
                  </div>
                  <div class="body-desc">
                      <div class="body-desc-item right-line">
                          <div class="person-number">${
                info.selected.data.galleryful
                  ? info.selected.data.galleryful
                  : "暂无数据"
                }</div>
                          <div class="person-desc">可容纳人数</div>
                      </div>
                  </div>
                  <!-- <div class="detail-desc">
                      <div class="desc-text">
                          ${
                info.selected.data.generalSituation
                  ? info.selected.data.generalSituation
                  : "暂无数据"
                }
                      </div>
                  </div> -->
              </div>
            `
            )
            .css("top", "595px")
            .show();

          $(".right-top-md-style-school-xh .close-img")
            .unbind()
            .on("click", function () {
              $(".right-top-md-style-school-xh").hide();
            });
        }

        $("#myList").slideUp("fast");
        $(".build-arrow").removeClass("active");
        if (info.selected) {
          $(".choose-park-buid-name").html(info.selected.data.name);
          chooseBuildName = info.selected.data.name;
          chooseBuildId = info.selected.data.id;

          /*if($(".industry-menu .menu-row:last-child li.active").length){
              $(".industry-menu .menu-row:last-child li.active").click();
          }else{
              $(".industry-menu .menu-row:last-child li:first-child").click();
          }*/
          console.log(info);
          // 加载周围的企业
          // BuildInfoXH(map, info.selected.data.position.join(','));

          if (info.selected.marker) {
            // 更新为选中样式
            if (info.selected.data.schoolType === "幼儿园") {
              info.selected.marker.setIconStyle(ChildSelectedIconStyle);
            } else {
              info.selected.marker.setIconStyle(selectedIconStyle);
            }
            info.selected.marker.setOffset(iconOffset.selectedOffset);
          }

          //选中并非由列表节点上的事件触发，将关联的列表节点移动到视野内
          if (!info.sourceEventInfo.isListElementEvent) {
            if (info.selected.listElement) {
              scrollListElementIntoView($(info.selected.listElement));
            }
          }
        }

        if (info.unSelected && info.unSelected.marker) {
          // 更新为默认样式
          if (info.unSelected.data.schoolType === "幼儿园") {
            info.unSelected.marker.setIconStyle(ChildDefaultIconStyle);
          } else {
            info.unSelected.marker.setIconStyle(defaultIconStyle);
          }
          info.unSelected.marker.setOffset(iconOffset.defaultOffset);
        }
      });

      markerList.on("listElementMouseenter markerMouseover", function (event,
                                                                       record) {
        if (record && record.marker) {
          forcusMarker(record.marker);

          //this.openInfoWindowOnRecord(record);

          //非选中的id
          if (!this.isSelectedDataId(record.id)) {
            // 设置为hover样式
            if (record.data.schoolType === "幼儿园") {
              record.marker.setIconStyle(ChildHoverIconStyle);
            } else {
              record.marker.setIconStyle(hoverIconStyle);
            }
            record.marker.setOffset(iconOffset.hoverOffset);
            //this.closeInfoWindow();
          }
        }
      });

      markerList.on("listElementMouseleave markerMouseout", function (event,
                                                                      record) {
        if (record && record.marker) {
          if (!this.isSelectedDataId(record.id)) {
            //恢复默认样式
            if (record.data.schoolType === "幼儿园") {
              record.marker.setIconStyle(ChildDefaultIconStyle);
            } else {
              record.marker.setIconStyle(defaultIconStyle);
            }
            record.marker.setOffset(iconOffset.defaultOffset);
          }
        }
      });

      //数据输出完成
      markerList.on("renderComplete", function (event, records) {
        $(".zdy-buildfull-cover-mask").remove();
        // map.setFitView();
        // map.panBy(-580,40);
      });

      var loaded = false;

      function createVisualMap(lines) {
        if (loaded) return;
        loaded = true;
        if (LAYER_COURTYARD_SCHOOL_LINE) {
          LAYER_COURTYARD_SCHOOL_LINE.remove();
          LAYER_COURTYARD_SCHOOL_LINE = null;
        }

        var amap = Loca.create(map);
        var layer = Loca.visualLayer({
          container: amap,
          blendMode: "lighter",
          type: "line",
          shape: "line"
        });

        layer.setData(lines, {
          lnglat: "line"
        });
        layer.setOptions({
          style: {
            lineWidth: 0.3,
            curveness: 0.2,
            // stroke: 'rgba(49, 80, 189, 0.2)'
            stroke: "#ff0000"
          }
        });

        LAYER_COURTYARD_SCHOOL_LINE = layer;
        layer.render();
      }

      //加载数据
      function loadData(src, callback) {
        console.log(src);
        $.ajax({
          // url:"/v1/company/getLet",
          url: "./jsonData/courtyardfindOne.json",
          type: "GET",
          dataType: "json",
          data: {id: options.id},
          success: function (res) {
            $(".land-info table td.number").html(res.schoolNumber);
            console.log("住宅周围的学校================》", res);
            var result = [];
            var lines = [];
            var data = res.schools;
            var schoolCount = 0;
            var childSchoolCount = 0;
            for (var i = 0; i < data.length; i++) {
              if (data[i].coordinate) {
                var list = {};
                list = data[i];
                list.address = data[i].address;
                list.id = data[i].id;
                list.name = data[i].name;
                list.schoolType = data[i].schoolType;
                list.position = data[i].coordinate.split(",");
                result.push(list);

                lines.push({line: [options.position, list.position]});
                // 改变面板中的学校个数和幼儿园个数
                if (data[i].schoolType === "幼儿园") {
                  childSchoolCount += 1;
                } else {
                  schoolCount += 1;
                }
              }
            }
            $(".right-top-md-style-xh .body-desc-item .school-number").html(
              `${schoolCount}`
            );
            $(
              ".right-top-md-style-xh .body-desc-item .child-school-number"
            ).html(`${childSchoolCount}`);
            $(".right-top-md-style-xh .detail-desc .degree-number-a").html(
              `${res.employedRatio}`
            );
            $(".right-top-md-style-xh .detail-desc .degree-number-b").html(
              `${res.permanentRatio}`
            );
            createVisualMap(lines);
            markerList.render(result);
          },
          error: function (err) {
            console.log(err);
          }
        });
      }

      loadData();

      function forcusMarker(marker) {
        marker.setTop(true);
        // map.panBy(-580,40);
        //不在地图视野内
        if (!map.getBounds().contains(marker.getPosition())) {
          //移动到中心
          // map.setCenter(marker.getPosition());
        }
      }

      function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();

        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
          (window.innerHeight ||
            document.documentElement
              .clientHeight) /*or $(window).height() */ &&
          rect.right <=
          (window.innerWidth ||
            document.documentElement.clientWidth) /*or $(window).width() */
        );
      }

      function scrollListElementIntoView($listEle) {
        if (!isElementInViewport($listEle.get(0))) {
          $("#panel").scrollTop(
            $listEle.offset().top - $listEle.parent().offset().top
          );
        }

        //闪动一下
        $listEle
          .one(
            "webkitAnimationEnd oanimationend msAnimationEnd animationend",
            function (e) {
              $(this).removeClass("flash animated");
            }
          )
          .addClass("flash animated");
      }
    }
  );
}

// 生活-住宅信息面板
function wasteCourtyardPanelXH(options) {
  var tpl = "";

  $(".icon-ctrl-panel-xh").addClass("active");

  $(".right-top-md-style-xh")
    .removeClass("zoomIn")
    .addClass("zoomOut");
  $(".right-top-md-style-xh")
    .show()
    .removeClass("zoomOut")
    .addClass("zoomIn");
  if (options) {
    var landData = options.selected.data;
    var number;
    if (landData.floatingPopulation + landData.registerPopulation) {
      number =
        landData.floatingPopulation + landData.registerPopulation + " 人";
    } else if (landData.number) {
      number = landData.number + " 户";
    } else {
      number = "未知";
    }
    tpl = `
        <div class="right-top-md-head">
            <div class="head-img">
                <img src="./images/info_window_panel_logo.png" alt="">
            </div>
            <div class="close-img">
            </div>
            <div style="height: 1px;"></div>
            <div class="title" title="${landData.name}">${landData.name}</div>
        </div>
        <div class="right-top-md-body">
            <div class="body-address">
                <div class="body-address-img">
                    <img src="./images/address_icon.png" alt="">
                </div>
                <div class="body-address-font">${landData.address}</div>
            </div>
            
            <div class="body-desc">
                <div class="body-desc-item right-line">
                    <div class="person-number">${number}</div>
                    <div class="person-desc">人口</div>
                </div>
                <div class="body-desc-item right-line">
                    <div class="school-number">31</div>
                    <div class="school-desc">周围学校个数</div>
                </div>
                <div class="body-desc-item">
                    <div class="child-school-number">10</div>
                    <div class="child-school-desc">周围幼儿园个数</div>
                </div>
            </div>
        </div>`;
  }

  $(".right-top-md-style-xh")
    .html(tpl)
    .css("top", "353px");
  $(".right-top-md-style-xh .close-img").on("click", function () {
    $(".right-top-md-style-xh").hide();
    // $(".icon-ctrl-panel-xh").removeClass("active");
  });
}

// 标记生活-住宅模块
function wasteCourtyardInfoXH(map, parkName) {
  loadingFullAnimat("zdy-buildfull-cover-mask", "body");

  AMapUI.loadUI(
    ["misc/MarkerList", "overlay/SimpleMarker", "overlay/SimpleInfoWindow"],
    function (MarkerList, SimpleMarker, SimpleInfoWindow) {
      //即jQuery/Zepto
      // var $ = MarkerList.utils.$;

      var defaultIconStyle = {
          src: "./images/house_marker_icon.png",
          style: {
            width: "40px",
            height: "50px"
          }
        }, //默认的图标样式
        // hoverIconStyle = 'green', //鼠标hover时的样式
        hoverIconStyle = {
          src: "./images/house_marker_icon.png",
          style: {
            width: "60px",
            height: "70px"
          }
        }, //鼠标hover时的样式
        selectedIconStyle = {
          src: "./images/house_marker_icon.png",
          style: {
            width: "60px",
            height: "70px"
          }
        }; //选中时的图标样式
      var iconOffset = {
        defaultOffset: new AMap.Pixel(-20, -35), //默认的图标样式
        hoverOffset: new AMap.Pixel(-28, -50), //鼠标hover时的样式
        selectedOffset: new AMap.Pixel(-28, -50) //选中时的图标样式
      };
      var markerList = new MarkerList({
        map: map,
        //ListElement对应的父节点或者ID
        listContainer: "myList", //document.getElementById("myList"),
        //选中后显示

        //从数据中读取位置, 返回lngLat
        getPosition: function (item) {
          // return [item.longitude, item.latitude];
          return item.position;
        },
        //数据ID，如果不提供，默认使用数组索引，即index
        getDataId: function (item, index) {
          return item.id;
        },
        getInfoWindow: function (data, context, recycledInfoWindow) {
        },
        //构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
        getMarker: function (data, context, recycledMarker) {
          var label = String.fromCharCode("A".charCodeAt(0) + context.index);

          if (recycledMarker) {
            recycledMarker.setIconLabel(label);
            return;
          }

          return new SimpleMarker({
            containerClassNames: "build-marker",
            iconStyle: defaultIconStyle,
            // iconLabel: label,
            //设置基点偏移
            offset: iconOffset.defaultOffset
          });
        },
        //构造列表元素，与getMarker类似，可以是函数，返回一个dom元素，或者模板 html string
        getListElement: function (data, context, recycledListElement) {
        },
        //列表节点上监听的事件
        listElementEvents: ["click", "mouseenter", "mouseleave"],
        //marker上监听的事件
        markerEvents: ["click", "mouseover", "mouseout"],
        //makeSelectedEvents:false,
        selectedClassNames: "selected",
        autoSetFitView: false
      });

      window.courtyardMarkerList = markerList;

      markerList.on("selectedChanged", function (event, info) {
        $(".around-support-con .active").removeClass("active");
        typeTotal=0;
        $(".around-support-panel").show();
        // $("#myList").hide();
        // map.panBy(-580,40);
        map.setZoom(15);
        if (window.markerList) {
          var data = window.markerList.getAllMarkers();
          console.log(
            "MARKERLIST CLICK++++++++++++++++++++++++++++++++++",
            data
          );
          data.forEach(function (item, index) {
            item.hide();
          });
        }
        if (window.courtyardMarkerList) {
          var data = window.courtyardMarkerList.getAllMarkers();
          data.forEach(function (item, index) {
            var positions = item.getPosition();
            if (
              positions.lng + "," + positions.lat ===
              info.selected.data.coordinate
            ) {
              return false;
            }
            item.hide();
          });
        }

        if (window.CanvasLayer) {
          window.CanvasLayer.hide();
        }
        createCircle(info.selected.data.position, "住宅");

        $(".active.icon-ctrl-panel-xh").addClass("active");

        // CanvasLayer.show();
        wasteCourtyardPanelXH(info);
        wasteCourtyardCreateLineXH(info.selected.data);
        // viewLandPanelXH(info);

        $("#myList").slideUp("fast");
        $(".build-arrow").removeClass("active");
        if (info.selected) {
          $(".choose-park-buid-name").html(info.selected.data.name);
          chooseBuildName = info.selected.data.name;
          chooseBuildId = info.selected.data.id;

          /*if($(".industry-menu .menu-row:last-child li.active").length){
              $(".industry-menu .menu-row:last-child li.active").click();
          }else{
              $(".industry-menu .menu-row:last-child li:first-child").click();
          }*/
          console.log(info);
          // 加载周围的企业
          // BuildInfoXH(map, info.selected.data.position.join(','));

          if (info.selected.marker) {

            if (window.makers){
              /*for (var i=0;i<window.makers.length;i++){
                  window.makers[i].hide();
              }*/
              map.remove(window.makers);
            }

            /*var aroundType = $(".icon-ctrl-panel-xh .around-type").val();
            if(aroundType){
              loadingFullAnimat("zdy-full-cover-mask", "body");
            }
            if(aroundType == '加油站'){
              search('汽车服务',info.selected.data.position,1,'加油站');
            }else if(aroundType == '汽车维修店'){
              search('汽车维修',info.selected.data.position,1,'汽车维修店');
            }else if(aroundType == '超市'){
              search('购物服务',info.selected.data.position,1,'超市');
            }else if(aroundType == '酒店'){
              search('住宿服务',info.selected.data.position,1,'酒店');
            }else if(aroundType == '银行'){
              search('金融保险服务',info.selected.data.position,1,'银行');
            }else if(aroundType == '饭店'){
              search('餐饮服务',info.selected.data.position,1,'中餐厅;外国餐厅');
            }else if(aroundType == '购物中心'){
              search('购物服务',info.selected.data.position,1,'购物中心');
            }else{
              $(".land-panel-con-xh .detail-desc .desc-text .around-type-total").html("");
            }*/

            /*生活住宅-周边配套下拉改变触发事件*/
            /*$(".icon-ctrl-panel-xh").on("change",".around-type",function(){
              if (window.courtyardMarkerList){
                /!*for (var i=0;i<window.makers.length;i++){
                    window.makers[i].hide();
                }*!/
                console.log(courtyardMarkerList);
                if(courtyardMarkerList.getSelectedRecord()){
                  if (window.makers){
                    /!*for (var i=0;i<window.makers.length;i++){
                        window.makers[i].hide();
                    }*!/
                    map.remove(window.makers);
                  }
                  var aroundType = $(".icon-ctrl-panel-xh .around-type").val();
                  var positions = [courtyardMarkerList.getSelectedRecord().position.getLng(),courtyardMarkerList.getSelectedRecord().position.getLat()];
                  if(aroundType){
                    loadingFullAnimat("zdy-full-cover-mask", "body");
                  }
                  if(aroundType == '加油站'){
                    search('汽车服务',positions,1,'加油站');
                  }else if(aroundType == '汽车维修店'){
                    search('汽车维修',positions,1,'汽车维修店');
                  }else if(aroundType == '超市'){
                    search('购物服务',positions,1,'超市');
                  }else if(aroundType == '酒店'){
                    search('住宿服务',positions,1,'酒店');
                  }else if(aroundType == '银行'){
                    search('金融保险服务',positions,1,'银行');
                  }else if(aroundType == '饭店'){
                    search('餐饮服务',positions,1,'中餐厅;外国餐厅');
                  }else if(aroundType == '购物中心'){
                    search('购物服务',positions,1,'购物中心');
                  }else{
                    $(".land-panel-con-xh .detail-desc .desc-text .around-type-total").html("");
                  }
                }
              }
            });*/
            // aroundSupportControl();

            //更新为选中样式
            info.selected.marker.setIconStyle(selectedIconStyle);
            info.selected.marker.setOffset(iconOffset.selectedOffset);
          }

          //选中并非由列表节点上的事件触发，将关联的列表节点移动到视野内
          if (!info.sourceEventInfo.isListElementEvent) {
            if (info.selected.listElement) {
              scrollListElementIntoView($(info.selected.listElement));
            }
          }
        }

        if (info.unSelected && info.unSelected.marker) {
          //更新为默认样式
          info.unSelected.marker.setIconStyle(defaultIconStyle);
          info.unSelected.marker.setOffset(iconOffset.defaultOffset);
        }
      });

      window.makers=new Array();
      var typeTotal=0;
      var aroundTypeInfoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(-5, -22)});
      //查询周边配套
      function search(type,point,num,needType,aroundType) {
        if(num == 1){
          typeTotal=0;
        }
        var aroundType = aroundType;
        /*var iconStyles = {
          gasStationIcon: './images/around_gas_station_tips_icon.png',
          bankIcon: './images/around_bank_tips_icon.png',
          carServiceIcon: './images/around_car_service_tips_icon.png',
          hotelIcon: './images/around_hotel_tips_icon.png',
          restaurantIcon: './images/around_restaurant_tips_icon.png',
          supermaketIcon: './images/around_supermarket_tips_icon.png',
          shoppingIcon: './images/around_shopping_tips_icon.png'
        };*/
        var iconSize = {size: new AMap.Size(43, 48),imageSize: new AMap.Size(43, 48)};  //图标、图片大小
        var iconStyles = {
          gasStationIcon: new AMap.Icon({
            size: iconSize.size,  //图标大小
            image: "./images/around_gas_station_tips_icon.png",
            imageSize: iconSize.imageSize,  //图片大小
            // imageOffset: new AMap.Pixel(-11, 0)
          }),
          bankIcon: new AMap.Icon({
            size: iconSize.size,
            image: "./images/around_bank_tips_icon.png",
            imageSize: iconSize.imageSize
          }),
          carServiceIcon: new AMap.Icon({
            size: iconSize.size,
            image: "./images/around_car_service_tips_icon.png",
            imageSize: iconSize.imageSize
          }),
          hotelIcon: new AMap.Icon({
            size: iconSize.size,
            image: "./images/around_hotel_tips_icon.png",
            imageSize: iconSize.imageSize
          }),
          restaurantIcon: new AMap.Icon({
            size: iconSize.size,
            image: "./images/around_restaurant_tips_icon.png",
            imageSize: iconSize.imageSize
          }),
          supermaketIcon: new AMap.Icon({
            size: iconSize.size,
            image: "./images/around_supermarket_tips_icon.png",
            imageSize: iconSize.imageSize
          }),
          shoppingIcon: new AMap.Icon({
            size: iconSize.size,
            image: "./images/around_shopping_tips_icon.png",
            imageSize: iconSize.imageSize
          }),
        };
        var iconStyle = iconStyles.gasStationIcon;
        if(aroundType == '加油站'){
          iconStyle = iconStyles.gasStationIcon;
        }else if(aroundType == '汽车维修店'){
          iconStyle = iconStyles.carServiceIcon;
        }else if(aroundType == '超市'){
          iconStyle = iconStyles.supermaketIcon;
        }else if(aroundType == '酒店'){
          iconStyle = iconStyles.hotelIcon;
        }else if(aroundType == '银行'){
          iconStyle = iconStyles.bankIcon;
        }else if(aroundType == '饭店'){
          iconStyle = iconStyles.restaurantIcon;
        }else if(aroundType == '购物中心'){
          iconStyle = iconStyles.shoppingIcon;
        }
        AMap.plugin(["AMap.PlaceSearch"], function() {
          var placeSearchMarkers = new AMap.PlaceSearch({ //构造地点查询类
            pageSize: 50,
            type: type,
            city: "成都", //城市
            showCover:false,
            pageIndex:num
          });
          placeSearchMarkers.searchNearBy('', point, 1000, function(status, result) {
            if (status === 'complete' && result.info === 'OK'){
              var list=0;
              if (result.poiList.count>50){
                list=result.poiList.pois.length;
              }else {
                list=result.poiList.count;
              }
              for (var i=0;i<list;i++){
                var splitType = needType.split(';');
                if(splitType.length > 1){
                  splitType.forEach(function(v){
                    if(result.poiList.pois[i].type.indexOf(v) > -1){
                      var marker=new AMap.Marker({
                        icon: iconStyle,
                        position: result.poiList.pois[i].location,
                        map:map,
                        extData:{name:result.poiList.pois[i].name}
                      });
                      marker.on("mouseover",function(e){
                        aroundTypeInfoWindow.setContent(e.target.getExtData().name);
                        aroundTypeInfoWindow.open(map, e.target.getPosition());
                      });
                      marker.on("mouseout",function(e){
                        aroundTypeInfoWindow.close();
                      });
                      makers.push(marker);
                      typeTotal++;
                    }
                  })
                }else{
                  if(result.poiList.pois[i].type.indexOf(needType) > -1){
                    var marker=new AMap.Marker({
                      icon: iconStyle,
                      position: result.poiList.pois[i].location,
                      map:map,
                      extData:{name:result.poiList.pois[i].name}
                    });
                    marker.on("mouseover",function(e){
                      aroundTypeInfoWindow.setContent(e.target.getExtData().name);
                      aroundTypeInfoWindow.open(map, e.target.getPosition());
                    });
                    marker.on("mouseout",function(e){
                      aroundTypeInfoWindow.close();
                    });
                    makers.push(marker);
                    typeTotal++;
                  }
                }
              }
              if (result.poiList.count>50){
                if (list==50){
                  var page=num+1;
                  search(type,point,page,needType,aroundType);
                }else{
                  if(needType){
                    $(".land-panel-con-xh .detail-desc .desc-text .around-type-total").html(`<p>${aroundType}数<span style="margin-left: 60px;" class="degree-number-b">${typeTotal}</span></p>`);
                    $(".zdy-full-cover-mask").remove();
                  }
                }
              }else{
                if(needType){
                  $(".land-panel-con-xh .detail-desc .desc-text .around-type-total").html(`<p>${aroundType}数<span style="margin-left: 60px;" class="degree-number-b">${typeTotal}</span></p>`);
                  $(".zdy-full-cover-mask").remove();
                }
              }
            }else{
              if(needType){
                $(".land-panel-con-xh .detail-desc .desc-text .around-type-total").html(`<p>${aroundType}数<span style="margin-left: 60px;" class="degree-number-b">${typeTotal}</span></p>`);
                $(".zdy-full-cover-mask").remove();
              }
            }
          });
        });

      }


      /*生活住宅周边配套控制*/
      function aroundSupportControl() {
        $(".around-support-panel").show();
        $(".around-support-con .around-support-item").on("click",function(){
          if(!$(this).hasClass("active")){
            $(this).addClass("active").siblings().removeClass("active");
            var aroundType = $(this).data("type");
            console.log(aroundType)
            if(aroundType){
              loadingFullAnimat("zdy-full-cover-mask", "body");
            }
              if (window.makers){
                /*for (var i=0;i<window.makers.length;i++){
                    window.makers[i].hide();
                }*/
                map.remove(window.makers);
              }
            var positions = [courtyardMarkerList.getSelectedRecord().position.getLng(),courtyardMarkerList.getSelectedRecord().position.getLat()];
            if(aroundType == '加油站'){
              search('汽车服务',positions,1,'加油站',aroundType);
            }else if(aroundType == '汽车维修店'){
              search('汽车维修',positions,1,'汽车维修店',aroundType);
            }else if(aroundType == '超市'){
              search('购物服务',positions,1,'超市',aroundType);
            }else if(aroundType == '酒店'){
              search('住宿服务',positions,1,'酒店',aroundType);
            }else if(aroundType == '银行'){
              search('金融保险服务',positions,1,'银行',aroundType);
            }else if(aroundType == '饭店'){
              search('餐饮服务',positions,1,'中餐厅;外国餐厅',aroundType);
            }else if(aroundType == '购物中心'){
              search('购物服务',positions,1,'购物中心',aroundType);
            }else{
              $(".land-panel-con-xh .detail-desc .desc-text .around-type-total").html("");
            }
          }else{
            if (window.makers){
              /*for (var i=0;i<window.makers.length;i++){
                  window.makers[i].hide();
              }*/
              map.remove(window.makers);
            }
            $(this).removeClass("active");
          }

        });
      }


      markerList.on("listElementMouseenter markerMouseover", function (event,
                                                                       record) {
        if (record && record.marker) {
          forcusMarker(record.marker);

          //this.openInfoWindowOnRecord(record);

          //非选中的id
          if (!this.isSelectedDataId(record.id)) {
            //设置为hover样式
            record.marker.setIconStyle(hoverIconStyle);
            record.marker.setOffset(iconOffset.hoverOffset);
            //this.closeInfoWindow();
          }
        }
      });

      markerList.on("listElementMouseleave markerMouseout", function (event,
                                                                      record) {
        if (record && record.marker) {
          if (!this.isSelectedDataId(record.id)) {
            //恢复默认样式
            record.marker.setIconStyle(defaultIconStyle);
            record.marker.setOffset(iconOffset.defaultOffset);
          }
        }
      });

      //数据输出完成
      markerList.on("renderComplete", function (event, records) {
        $(".zdy-buildfull-cover-mask").remove();
        map.setFitView();
        // map.panBy(-580,40);
      });

      //加载数据
      function loadData(src, callback) {
        console.log(src);
        $.ajax({
          // url:"/v1/company/getLet",
          url: "./jsonData/courtyardgetAll.json",
          type: "GET",
          dataType: "json",
          data: {},
          success: function (res) {
            console.log("住宅================》", res);
            var result = [];
            var data = res.courtyards;
            for (var i = 0; i < data.length; i++) {
              if (data[i].coordinate) {
                var list = {};
                list = data[i];
                list.address = data[i].address;
                list.id = data[i].id;
                list.name = data[i].name;
                list.number = data[i].number;
                list.general_situation = data[i].general_situation;
                list.position = data[i].coordinate.split(",");
                result.push(list);
              }
            }
            $(".land-panel-con-xh")
              .html(
                `
                <div class="item land-use-purpose" style="height: auto;">
                <div class="use-purpose-title"><span class="title">概况</span></div>
                <!-- <div class="use-purpose-bd" id="wastewaterPlantPanel-echarts"></div> -->
                <div class="icon-ctrl-body">
                <div class="icon-ctrl-body-item" style="width:540px; padding: 30px;">
                    <div class="detail-desc">
                      <div class="desc-text">
                        <p>住宅数<span style="margin-left: 60px;" class="degree-number-b">${res.courtyardsNumber}</span>
                        </p>
                        <p>户数<span style="margin-left: 60px;" class="degree-number-b">${res.households}</span>
                        </p>
                        <p>百人学位数（以常住人口）<span style="margin-left: 60px;" class="degree-number-b">${res.permanentRatio.toFixed(2)}</span>
                          <span class="describeIcon">
                            <span class="tic tic-circle-question-o"></span>
                            <span class="discribeBox block">
                              <span class="triangle-with-shadow"></span>
                              <span class="describeContent block f14" style="z-index: 100;line-height: 24px;">
                                <span class="text-left sec-c2 block">学校规模/常住人口*100
                                </span>
                              </span>
                            </span>
                          </span>
                        </p>
                         <p>百人幼儿园学位数<span style="margin-left: 60px;" class="degree-number-b">2.5</span>
                        </p>
                         <p>百人义务教育学位数<span style="margin-left: 60px;" class="degree-number-b">5.56</span>
                        </p>
                         <p>区域就业人员住房配套情况<span style="margin-left: 60px;" class="degree-number-b">${res.supporting.toFixed(2)}</span>
                          <span class="describeIcon">
                            <span class="tic tic-circle-question-o"></span>
                            <span class="discribeBox block">
                              <span class="triangle-with-shadow"></span>
                              <span class="describeContent block f14" style="z-index: 100;line-height: 24px;">
                                <span class="text-left sec-c2 block">户数/从业人员
                                </span>
                              </span>
                            </span>
                          </span>
                        </p>
                        <div class="around-type-total"></div>
                      </div>
                    </div>
                  </div>
                </div>
                `
              )
              .show();
            markerList.render(result);
          },
          error: function (err) {
            console.log(err);
          }
        });
      }

      loadData();

      function forcusMarker(marker) {
        marker.setTop(true);
        // map.panBy(-580,40);
        //不在地图视野内
        if (!map.getBounds().contains(marker.getPosition())) {
          //移动到中心
          // map.setCenter(marker.getPosition());
        }
      }

      function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();

        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
          (window.innerHeight ||
            document.documentElement
              .clientHeight) /*or $(window).height() */ &&
          rect.right <=
          (window.innerWidth ||
            document.documentElement.clientWidth) /*or $(window).width() */
        );
      }

      function scrollListElementIntoView($listEle) {
        if (!isElementInViewport($listEle.get(0))) {
          $("#panel").scrollTop(
            $listEle.offset().top - $listEle.parent().offset().top
          );
        }

        //闪动一下
        $listEle
          .one(
            "webkitAnimationEnd oanimationend msAnimationEnd animationend",
            function (e) {
              $(this).removeClass("flash animated");
            }
          )
          .addClass("flash animated");
      }
    }
  );

  // CanvasLayer.show();
}

/*生活-住宅模块-xh*/
$(".item.item3.life-land .sub-menu .house").on("click", function (oEvent) {
  if (!$(this).hasClass("active")) {
    loadingFullAnimat("zdy-full-cover-mask", "body");
    // map.setFitView();
    // map.setZoom(14);
    map.clearMap();
    oEvent.stopPropagation();
    initControll();
    if ("markerList" in window && markerList.getData().length > 0) {
      //清除marker数据
      markerList.render([]);
    }
    $(this).addClass("active");
    $(this)
      .parents(".item")
      .addClass("active")
      .siblings()
      .removeClass("active");

    // $(".industry-menu .menu-row:last-child li").show();
    // map.setFitView();
    // map.panBy(-580, 40);
    map.setFitView();
    map.setZoom(14);
    /*绘制所有地块显示范围*/
    creatWestAreaLandRange(
      map,
      function () {
        wasteCourtyardInfoXH(map, "");
      },
      function () {
        if (window.markerList) {
          var data = window.markerList.getAllMarkers();
          data.forEach(function (item, index) {
            item.hide();
          });
        }
        if (window.courtyardMarkerList) {
          var courtyardData = window.courtyardMarkerList.getAllMarkers();
          courtyardData.forEach(function (item, index) {
            item.show();
          });
        }
        if (window.placeSearch){
          window.placeSearch.clear();
        }
      }
    );
    $(".icon-ctrl-panel-xh")
      .html(
        `
            <div class="icon-ctrl-head">
                <div class="title">图标示意</div>
            </div>
            <div class="icon-ctrl-body">
                <div class="icon-ctrl-body-item" style="width: 125px;">
                    <div class="color-img"><img src="./images/house_tips_icon.png" alt=""></div>
                    <div class="item-text">住宅</div>
                </div>
                <div class="icon-ctrl-body-item">
                    <div class="color-img"><img src="./images/child_school_tips_icon.png" alt=""></div>
                    <div class="item-text">幼儿园</div>
                </div>
                <div class="icon-ctrl-body-item">
                    <div class="color-img"><img src="./images/school_tips_icon.png" alt=""></div>
                    <div class="item-text">中小学</div>
                </div>
            </div>`
      )
      .addClass("active")
      .show();


  }
});

/*生活-医院模块*/

// 生活-医院信息面板
function wasteCourtyardHospitalXH(options, total) {
  var czrkzs = Number(total.total.split("万人")[0]).toFixed(0) + "万人";
  $(".icon-ctrl-panel-xh")
    .html(
      `
      <div class="icon-ctrl-head">
        <div class="title">图标示意</div>
    </div>
    <div class="icon-ctrl-body">
      <div class="icon-ctrl-body-item">
          <div class="color-img"><img src="./images/hospital_tips_icon.png" alt=""></div>
          <div class="item-text">医院</div>
      </div>
    </div>
      `
    )
    .addClass("active");

  $(".right-top-md-style-xh")
    .removeClass("zoomIn")
    .addClass("zoomOut");
  $(".right-top-md-style-xh")
    .show()
    .removeClass("zoomOut")
    .addClass("zoomIn");

  if (options) {
    var landData = options.selected.data;
    tpl = `
        <div class="right-top-md-head">
            <div class="head-img">
                <img src="./images/info_window_panel_logo.png" alt="">
            </div>
            <div class="close-img">
            </div>
            <div style="height: 1px;"></div>
            <div class="title" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${
      landData.name
      }">${landData.name}</div>
        </div>
        <div class="right-top-md-body">
            <div class="body-address">
                <div class="body-address-img">
                    <img src="./images/address_icon.png" alt="">
                </div>
                <div class="body-address-font">${landData.address}</div>
            </div>
            <div class="detail-desc" style="margin:30px 0 0 20px;">
                <div class="icon-ctrl-body-item hospital" style="width:540px">
                    <div class="hospital-person-total" style="margin: 0 0 0 30px; color:#999">职工人数</div>
                    <div calss="hospital-person-total-number">${
      options.selected.data.generalSituation.split(";")[1]
      }</div>
                    <div class="hospital-person-total" style="margin: 0 0 0 30px; color:#999">建筑面积</div>
                    <div calss="hospital-person-total-number">${
      options.selected.data.generalSituation.split(";")[0]
      }</div>
                </div>
            </div>
            <div class="detail-desc" style="margin: 10px 20px;">
              <div class="icon-ctrl-body-item hospital" style="width:540px">
                <div class="hospital-person-total" style="margin: 0 0 0 30px; color:#999">床位</div>
                <div calss="hospital-person-total-number">${
      options.selected.data.outpatientNumDay
        ? options.selected.data.outpatientNumDay
        : "暂无数据"
      }</div>
                <div class="hospital-person-total" style="margin-right: 15px; color:#999"></div>
                <div calss="hospital-person-total-number"></div>
              </div>
            </div>
        </div>`;
  }
  $(".right-top-md-style-xh")
    .html(tpl)
    .css("top", "255px");
  $(".right-top-md-style-xh").on("click", ".close-img", function () {
    $(".right-top-md-style-xh").hide();
    // $(".icon-ctrl-panel-xh").removeClass("active");
  });
}

// 标记生活-医院模块
function wasteCourtyardHospitalInfoXH(map, parkName) {
  loadingFullAnimat("zdy-buildfull-cover-mask", "body");
  // 常驻人口总数
  var total;

  AMapUI.loadUI(
    ["misc/MarkerList", "overlay/SimpleMarker", "overlay/SimpleInfoWindow"],
    function (MarkerList, SimpleMarker, SimpleInfoWindow) {
      //即jQuery/Zepto
      // var $ = MarkerList.utils.$;

      var defaultIconStyle = {
          src: "./images/hospital_marker_icon.png",
          style: {
            width: "40px",
            height: "50px"
          }
        }, //默认的图标样式
        // hoverIconStyle = 'green', //鼠标hover时的样式
        hoverIconStyle = {
          src: "./images/hospital_marker_icon.png",
          style: {
            width: "60px",
            height: "70px"
          }
        }, //鼠标hover时的样式
        selectedIconStyle = {
          src: "./images/hospital_marker_icon.png",
          style: {
            width: "60px",
            height: "70px"
          }
        }; //选中时的图标样式
      var iconOffset = {
        defaultOffset: new AMap.Pixel(-20, -35), //默认的图标样式
        hoverOffset: new AMap.Pixel(-28, -50), //鼠标hover时的样式
        selectedOffset: new AMap.Pixel(-28, -50) //选中时的图标样式
      };
      var markerList = new MarkerList({
        map: map,
        //ListElement对应的父节点或者ID
        listContainer: "myList", //document.getElementById("myList"),
        //选中后显示

        //从数据中读取位置, 返回lngLat
        getPosition: function (item) {
          // return [item.longitude, item.latitude];
          return item.position;
        },
        //数据ID，如果不提供，默认使用数组索引，即index
        getDataId: function (item, index) {
          return item.id;
        },
        getInfoWindow: function (data, context, recycledInfoWindow) {
        },
        //构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
        getMarker: function (data, context, recycledMarker) {
          var label = String.fromCharCode("A".charCodeAt(0) + context.index);

          if (recycledMarker) {
            recycledMarker.setIconLabel(label);
            return;
          }

          return new SimpleMarker({
            containerClassNames: "build-marker",
            iconStyle: defaultIconStyle,
            // iconLabel: label,
            //设置基点偏移
            offset: iconOffset.defaultOffset
          });
        },
        //构造列表元素，与getMarker类似，可以是函数，返回一个dom元素，或者模板 html string
        getListElement: function (data, context, recycledListElement) {
        },
        //列表节点上监听的事件
        listElementEvents: ["click", "mouseenter", "mouseleave"],
        //marker上监听的事件
        markerEvents: ["click", "mouseover", "mouseout"],
        //makeSelectedEvents:false,
        selectedClassNames: "selected",
        autoSetFitView: false
      });

      // window.markerList = markerList;

      markerList.on("selectedChanged", function (event, info) {
        // $("#myList").hide();
        // map.panBy(-580,40);
        map.setZoom(14);
        if (window.markerList) {
          var data = window.markerList.getAllMarkers();
          data.forEach(function (item, index) {
            item.hide();
          });
        }

        wasteCourtyardHospitalXH(info, total);

        $("#myList").slideUp("fast");
        $(".build-arrow").removeClass("active");
        if (info.selected) {
          $(".choose-park-buid-name").html(info.selected.data.name);
          chooseBuildName = info.selected.data.name;
          chooseBuildId = info.selected.data.id;

          /*if($(".industry-menu .menu-row:last-child li.active").length){
              $(".industry-menu .menu-row:last-child li.active").click();
          }else{
              $(".industry-menu .menu-row:last-child li:first-child").click();
          }*/
          console.log(info);
          // 加载周围的企业
          // BuildInfoXH(map, info.selected.data.position.join(','));

          if (info.selected.marker) {
            //更新为选中样式
            info.selected.marker.setIconStyle(selectedIconStyle);
            info.selected.marker.setOffset(iconOffset.selectedOffset);
          }

          //选中并非由列表节点上的事件触发，将关联的列表节点移动到视野内
          if (!info.sourceEventInfo.isListElementEvent) {
            if (info.selected.listElement) {
              scrollListElementIntoView($(info.selected.listElement));
            }
          }
        }

        if (info.unSelected && info.unSelected.marker) {
          //更新为默认样式
          info.unSelected.marker.setIconStyle(defaultIconStyle);
          info.unSelected.marker.setOffset(iconOffset.defaultOffset);
        }
      });

      markerList.on("listElementMouseenter markerMouseover", function (event,
                                                                       record) {
        if (record && record.marker) {
          forcusMarker(record.marker);

          //this.openInfoWindowOnRecord(record);

          //非选中的id
          if (!this.isSelectedDataId(record.id)) {
            //设置为hover样式
            record.marker.setIconStyle(hoverIconStyle);
            record.marker.setOffset(iconOffset.hoverOffset);
            //this.closeInfoWindow();
          }
        }
      });

      markerList.on("listElementMouseleave markerMouseout", function (event,
                                                                      record) {
        if (record && record.marker) {
          if (!this.isSelectedDataId(record.id)) {
            //恢复默认样式
            record.marker.setIconStyle(defaultIconStyle);
            record.marker.setOffset(iconOffset.defaultOffset);
          }
        }
      });

      //数据输出完成
      markerList.on("renderComplete", function (event, records) {
        $(".zdy-buildfull-cover-mask").remove();
        map.setFitView();
        // map.panBy(-580,40);
      });

      //加载数据
      function loadData(src, callback) {
        console.log(src);
        $.ajax({
          // url:"/v1/company/getLet",
          url: "./jsonData/hospitalfindAll.json",
          type: "GET",
          dataType: "json",
          data: {},
          success: function (res) {
            console.log("生活--医院================》", res);
            var result = [];
            var data = res.hospital;
            total = res;
            total.length = data.length;
            var czrkzs =
              Number(total.total.split("万人")[0]).toFixed(0) + "万人";
            $(".icon-ctrl-panel-xh")
              .html(
                `
                <div class="icon-ctrl-head">
                  <div class="title">概况</div>
                </div>
                <div class="icon-ctrl-body">
                    <div class="icon-ctrl-body-item">
                        <div class="color-img"><img src="./images/hospital_tips_icon.png" alt=""></div>
                        <div class="item-text">医院</div>
                    </div>
                </div>`
              )
              .addClass("active")
              .css("width", "125px")
              .show();

            $(".land-panel-con-xh")
              .html(
                `
  <div class="item land-use-purpose" style="height: auto;">
      <div class="use-purpose-title"><span class="title">概况</span></div>
      <!-- <div class="use-purpose-bd" id="wastewaterPlantPanel-echarts"></div> -->
      <div class="icon-ctrl-body">
        <div class="icon-ctrl-body-item hospital" style="width:540px">
            <div class="hospital-person-total" style="margin: 0 0 0 30px; color:#999">常驻人口总数</div>
            <div calss="hospital-person-total-number">22.3万人</div>
            <div class="hospital-person-total" style="margin: 0 0 0 30px; color:#999">医院总数</div>
            <div calss="hospital-person-total-number">${total.length}</div>
        </div>
        <div class="icon-ctrl-body-item hospital" style="width:540px">
            <div class="hospital-person-total" style="margin: 0 0 0 30px; color:#999">千人床位数</div>
            <div calss="hospital-person-total-number">${total.bedRatio.toFixed(
                  0
                )}</div>
            <div class="hospital-person-total" style="margin: 0 0 0 30px; color:#999">三级甲等医院数</div>
            <div calss="hospital-person-total-number">${total.grade3}</div>
        </div>
        <div class="icon-ctrl-body-item hospital" style="width:540px">
            <div class="hospital-person-total" style="margin: 0 0 0 30px; color:#999">一级医院数</div>
            <div calss="hospital-person-total-number">${total.grade1}</div>
            <div style="margin: 0 0 0 30px;"></div><div></div>
        </div>
        <div class="icon-ctrl-body-item hospital" style="width:540px">
            <div class="hospital-person-total" style="margin: 0 0 0 30px; color:#000">全国医疗卫生服务体系规划纲要（2015—2020年）要求在2020年</div>
        </div>
        <div class="icon-ctrl-body-item hospital" style="width:540px">
            <div class="hospital-person-total" style="margin: 0 0 0 30px; color:#999">每千人床位数</div>
            <div calss="hospital-person-total-number">6 张</div>
            <div class="hospital-person-total" style="margin: 0 0 0 30px; color:#999">每千人床医院数</div>
            <div calss="hospital-person-total-number">5 </div>
        </div>
        <div class="icon-ctrl-body-item hospital" style="width:540px">
            <div class="hospital-person-total" style="margin: 0 0 0 30px; color:#999">每千人职业医师数</div>
            <div calss="hospital-person-total-number">2.5 人</div>
            <div class="hospital-person-total" style="margin: 0 0 0 30px; color:#999">每千人注册护士数</div>
            <div calss="hospital-person-total-number">3.14 人</div>
        </div>
      </div>
  </div>
`
              )
              .show();
            for (var i = 0; i < data.length; i++) {
              if (data[i].coordinate) {
                var list = {};
                list = data[i];
                list.address = data[i].address;
                list.id = data[i].id;
                list.name = data[i].name;
                list.generalSituation = data[i].generalSituation;
                list.outpatientNumDay = data[i].outpatientNumDay;
                // list.general_situation = data[i].general_situation;
                list.position = data[i].coordinate.split(",");
                result.push(list);
              }
            }
            markerList.render(result);
          },
          error: function (err) {
            console.log(err);
          }
        });
      }

      loadData();

      function forcusMarker(marker) {
        marker.setTop(true);
        // map.panBy(-580,40);
        //不在地图视野内
        if (!map.getBounds().contains(marker.getPosition())) {
          //移动到中心
          // map.setCenter(marker.getPosition());
        }
      }

      function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();

        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
          (window.innerHeight ||
            document.documentElement
              .clientHeight) /*or $(window).height() */ &&
          rect.right <=
          (window.innerWidth ||
            document.documentElement.clientWidth) /*or $(window).width() */
        );
      }

      function scrollListElementIntoView($listEle) {
        if (!isElementInViewport($listEle.get(0))) {
          $("#panel").scrollTop(
            $listEle.offset().top - $listEle.parent().offset().top
          );
        }

        //闪动一下
        $listEle
          .one(
            "webkitAnimationEnd oanimationend msAnimationEnd animationend",
            function (e) {
              $(this).removeClass("flash animated");
            }
          )
          .addClass("flash animated");
      }
    }
  );

  // CanvasLayer.show();
}

/*生活-医院模块-xh*/
$(".item.item3.life-land .sub-menu .hospital").on("click", function (oEvent) {
  if (!$(this).hasClass("active")) {
    loadingFullAnimat("zdy-full-cover-mask", "body");
    // map.setFitView();
    // map.setZoom(14);
    map.clearMap();
    oEvent.stopPropagation();
    initControll();
    if ("markerList" in window && markerList.getData().length > 0) {
      //清除marker数据
      markerList.render([]);
    }

    $(this).addClass("active");
    $(this)
      .parents(".item")
      .addClass("active")
      .siblings()
      .removeClass("active");

    // $(".industry-menu .menu-row:last-child li").show();
    // map.setFitView();
    // map.panBy(-580, 40);
    // map.setFitView();
    // map.setZoom(14);

    /*绘制所有地块显示范围*/
    creatWestAreaLandRange(map, function () {
      wasteCourtyardHospitalInfoXH(map, "");
    });
  }
});
/**/
var typeTotal=0;
var aroundTypeInfoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(-5, -22)});
//查询周边配套
function search(type,point,num,needType,aroundType) {
  if(num == 1){
    typeTotal=0;
  }
  var aroundType = aroundType;
  /*var iconStyles = {
    gasStationIcon: './images/around_gas_station_tips_icon.png',
    bankIcon: './images/around_bank_tips_icon.png',
    carServiceIcon: './images/around_car_service_tips_icon.png',
    hotelIcon: './images/around_hotel_tips_icon.png',
    restaurantIcon: './images/around_restaurant_tips_icon.png',
    supermaketIcon: './images/around_supermarket_tips_icon.png',
    shoppingIcon: './images/around_shopping_tips_icon.png'
  };*/
  var iconSize = {size: new AMap.Size(43, 48),imageSize: new AMap.Size(43, 48)};  //图标、图片大小
  var iconStyles = {
    gasStationIcon: new AMap.Icon({
      size: iconSize.size,  //图标大小
      image: "./images/around_gas_station_tips_icon.png",
      imageSize: iconSize.imageSize,  //图片大小
      // imageOffset: new AMap.Pixel(-11, 0)
    }),
    bankIcon: new AMap.Icon({
      size: iconSize.size,
      image: "./images/around_bank_tips_icon.png",
      imageSize: iconSize.imageSize
    }),
    carServiceIcon: new AMap.Icon({
      size: iconSize.size,
      image: "./images/around_car_service_tips_icon.png",
      imageSize: iconSize.imageSize
    }),
    hotelIcon: new AMap.Icon({
      size: iconSize.size,
      image: "./images/around_hotel_tips_icon.png",
      imageSize: iconSize.imageSize
    }),
    restaurantIcon: new AMap.Icon({
      size: iconSize.size,
      image: "./images/around_restaurant_tips_icon.png",
      imageSize: iconSize.imageSize
    }),
    supermaketIcon: new AMap.Icon({
      size: iconSize.size,
      image: "./images/around_supermarket_tips_icon.png",
      imageSize: iconSize.imageSize
    }),
    shoppingIcon: new AMap.Icon({
      size: iconSize.size,
      image: "./images/around_shopping_tips_icon.png",
      imageSize: iconSize.imageSize
    }),
  };
  var iconStyle = iconStyles.gasStationIcon;
  if(aroundType == '加油站'){
    iconStyle = iconStyles.gasStationIcon;
  }else if(aroundType == '汽车维修店'){
    iconStyle = iconStyles.carServiceIcon;
  }else if(aroundType == '超市'){
    iconStyle = iconStyles.supermaketIcon;
  }else if(aroundType == '酒店'){
    iconStyle = iconStyles.hotelIcon;
  }else if(aroundType == '银行'){
    iconStyle = iconStyles.bankIcon;
  }else if(aroundType == '饭店'){
    iconStyle = iconStyles.restaurantIcon;
  }else if(aroundType == '购物中心'){
    iconStyle = iconStyles.shoppingIcon;
  }
  AMap.plugin(["AMap.PlaceSearch"], function() {
    var placeSearchMarkers = new AMap.PlaceSearch({ //构造地点查询类
      pageSize: 50,
      type: type,
      city: "成都", //城市
      showCover:false,
      pageIndex:num
    });
    placeSearchMarkers.searchNearBy('', point, 1000, function(status, result) {
      if (status === 'complete' && result.info === 'OK'){
        var list=0;
        if (result.poiList.count>50){
          list=result.poiList.pois.length;
        }else {
          list=result.poiList.count;
        }
        for (var i=0;i<list;i++){
          var splitType = needType.split(';');
          if(splitType.length > 1){
            splitType.forEach(function(v){
              if(result.poiList.pois[i].type.indexOf(v) > -1){
                var marker=new AMap.Marker({
                  icon: iconStyle,
                  position: result.poiList.pois[i].location,
                  map:map,
                  extData:{name:result.poiList.pois[i].name}
                });
                marker.on("mouseover",function(e){
                  aroundTypeInfoWindow.setContent(e.target.getExtData().name);
                  aroundTypeInfoWindow.open(map, e.target.getPosition());
                });
                marker.on("mouseout",function(e){
                  aroundTypeInfoWindow.close();
                });
                makers.push(marker);
                typeTotal++;
              }
            })
          }else{
            if(result.poiList.pois[i].type.indexOf(needType) > -1){
              var marker=new AMap.Marker({
                icon: iconStyle,
                position: result.poiList.pois[i].location,
                map:map,
                extData:{name:result.poiList.pois[i].name}
              });
              marker.on("mouseover",function(e){
                aroundTypeInfoWindow.setContent(e.target.getExtData().name);
                aroundTypeInfoWindow.open(map, e.target.getPosition());
              });
              marker.on("mouseout",function(e){
                aroundTypeInfoWindow.close();
              });
              makers.push(marker);
              typeTotal++;
            }
          }
        }
        if (result.poiList.count>50){
          if (list==50){
            var page=num+1;
            search(type,point,page,needType,aroundType);
          }else{
            if(needType){
              $(".land-panel-con-xh .detail-desc .desc-text .around-type-total").html(`<p>${aroundType}数<span style="margin-left: 60px;" class="degree-number-b">${typeTotal}</span></p>`);
              $(".zdy-full-cover-mask").remove();
            }
          }
        }else{
          if(needType){
            $(".land-panel-con-xh .detail-desc .desc-text .around-type-total").html(`<p>${aroundType}数<span style="margin-left: 60px;" class="degree-number-b">${typeTotal}</span></p>`);
            $(".zdy-full-cover-mask").remove();
          }
        }
      }else{
        if(needType){
          $(".land-panel-con-xh .detail-desc .desc-text .around-type-total").html(`<p>${aroundType}数<span style="margin-left: 60px;" class="degree-number-b">${typeTotal}</span></p>`);
          $(".zdy-full-cover-mask").remove();
        }
      }
    });
  });

}


/*生活住宅周边配套控制*/
function aroundSupportControl() {
  $(".around-support-con .around-support-item").on("click",function(){
    if(!$(this).hasClass("active")){
      $(this).addClass("active").siblings().removeClass("active");
      var aroundType = $(this).data("type");
      console.log(aroundType)
      if(aroundType){
        loadingFullAnimat("zdy-full-cover-mask", "body");
      }
      if (window.makers){
        /*for (var i=0;i<window.makers.length;i++){
            window.makers[i].hide();
        }*/
        map.remove(window.makers);
      }
      var positions = [courtyardMarkerList.getSelectedRecord().position.getLng(),courtyardMarkerList.getSelectedRecord().position.getLat()];
      if(aroundType == '加油站'){
        search('汽车服务',positions,1,'加油站',aroundType);
      }else if(aroundType == '汽车维修店'){
        search('汽车维修',positions,1,'汽车维修店',aroundType);
      }else if(aroundType == '超市'){
        search('购物服务',positions,1,'超市',aroundType);
      }else if(aroundType == '酒店'){
        search('住宿服务',positions,1,'酒店',aroundType);
      }else if(aroundType == '银行'){
        search('金融保险服务',positions,1,'银行',aroundType);
      }else if(aroundType == '饭店'){
        search('餐饮服务',positions,1,'中餐厅;外国餐厅',aroundType);
      }else if(aroundType == '购物中心'){
        search('购物服务',positions,1,'购物中心',aroundType);
      }else{
        $(".land-panel-con-xh .detail-desc .desc-text .around-type-total").html("");
      }
    }else{
      if (window.makers){
        /*for (var i=0;i<window.makers.length;i++){
            window.makers[i].hide();
        }*/
        map.remove(window.makers);
      }
      $(this).removeClass("active");
    }

  });
}
aroundSupportControl();