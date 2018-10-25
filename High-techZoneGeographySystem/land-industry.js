/*全局*/
var livingTotalIncome = 0;
var living10Income = 0;
var HighQualityListData = [];
var dataPolygonPurposeCateLands = {'工业用地':[],'公共设施及其他用地':[],'科研用地':[],'商服用地':[],'住宅用地':[],'储备用地':[]};
var defualtFillOpacity = 1;
var markerRankTextList = [];
var markerTextList = [];
/*产业分布楼宇信息*/
function parkBuildInfo(map,parkName){
  loadingFullAnimat("zdy-buildfull-cover-mask","body");
  var testData = [{
    "name": "天府创业园",
    /*"longitude": "104.038272",
    "latitude": "30.625205"*/
    "position": [103.951875,30.750365]
  }, {
    "name": "万安",
    "address": "望京街9号望京国际商业中心E座4层",
    // "longitude": "104.042587",
    // "latitude": "30.62061"
    "position": [103.95455,30.74993]
  }, {
    "name": "龙湖时代天街 ",
    "address": "望京阜通东大街6号院4号楼方恒购物中心4F层",
    // "longitude": "104.038154",
    // "latitude": "30.619601"
    "position": [103.920767,30.753842]
  }, {
    "name": "萃峰国际",
    "position": [103.974834,30.73939]
  }
    , {
      "name": "亚光",
      "position": [103.955894,30.748391]
    }
    , {
      "name": "四海产业园（西南国际医疗）",
      "position": [103.967366,30.737558]
    }
    , {
      "name": "智汇青年",
      "position": [103.921377,30.752295]
    }
    , {
      "name": "中衡网成都智能信息",
      "position": [103.965406,30.744592]
    }
    , {
      "name": "海科大厦",
      "position": [103.981461,30.72104]
    }
    , {
      "name": "融智总部工业园",
      "position": [103.944615,30.741166]
    }
    , {
      "name": "成都智能信息产业园",
      "position": [103.965587,30.744539]
    }
    , {
      "name": "创新中心（西区孵化园）",
      "position": [103.97243,30.732486]
    }
    , {
      "name": "电子科大西区科技园",
      "position": [103.974126,30.734139]
    }
    , {
      "name": "国腾（创智联邦）",
      "position": [103.970183,30.732598]
    }
    , {
      "name": "汇都总部公园",
      "position": [103.96571,30.737778]
    }
    , {
      "name": "顺康新科孵化楼",
      "position": [103.962295,30.737145]
    }
    , {
      "name": "中海社区（海科大厦）",
      "position": [103.981461,30.72104]
    }
    , {
      "name": "宝利根",
      "position": [103.926632,30.78936]
    }
    , {
      "name": "国腾科技园",
      "position": [103.969216,30.733314]
    }
    , {
      "name": "四川西南医疗",
      "position": [103.966301,30.737952]
    }
  ];

  AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow'],
    function(MarkerList, SimpleMarker, SimpleInfoWindow) {

      //即jQuery/Zepto
      // var $ = MarkerList.utils.$;

      var defaultIconStyle = {
          src: './images/build_position_icon.png',
          style: {
            width: '40px',
            height: '50px'
          }
        }, //默认的图标样式
        // hoverIconStyle = 'green', //鼠标hover时的样式
        hoverIconStyle = {
          src: './images/build_position_icon.png',
          style: {
            width: '60px',
            height: '70px'
          }
        }, //鼠标hover时的样式
        selectedIconStyle = {
          src: './images/build_position_icon.png',
          style: {
            width: '60px',
            height: '70px'
          }
        } //选中时的图标样式
      ;
      var iconOffset = {
        defaultOffset:new AMap.Pixel(-20, -35),//默认的图标样式
        hoverOffset:new AMap.Pixel(-28, -50),//鼠标hover时的样式
        selectedOffset:new AMap.Pixel(-28, -50)//选中时的图标样式
      };
      var markerList = new MarkerList({
        map: map,
        //ListElement对应的父节点或者ID
        // listContainer: "myList", //document.getElementById("myList"),
        //选中后显示

        //从数据中读取位置, 返回lngLat
        getPosition: function(item) {
          // return [item.longitude, item.latitude];
          return item.position;
        },
        //数据ID，如果不提供，默认使用数组索引，即index
        getDataId: function(item, index) {

          return item.id;
        },
        getInfoWindow: function(data, context, recycledInfoWindow) {
          var tpl = '<div class="build-info-window"><%- data.name %></div>';
          //MarkerList.utils.template支持underscore语法的模板
          var content = MarkerList.utils.template(tpl, {
            data: data
          });
          if (recycledInfoWindow) {

            // recycledInfoWindow.setInfoTitle(data.name);
            // recycledInfoWindow.setInfoBody(data.address);
            recycledInfoWindow.setContent(content);

            return recycledInfoWindow;
          }

          // return new SimpleInfoWindow({
          //     /*infoTitle: data.name,
          //     infoBody: data.address,*/
          //     offset: new AMap.Pixel(0, -37),
          //     content: content
          // });
          return new AMap.InfoWindow({
            /*infoTitle: data.name,
            infoBody: data.address,*/
            offset: new AMap.Pixel(-15, -37),
            content: content
          });
        },
        //构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
        getMarker: function(data, context, recycledMarker) {

          var label = String.fromCharCode('A'.charCodeAt(0) + context.index);

          if (recycledMarker) {
            recycledMarker.setIconLabel(label);
            return;
          }

          return new SimpleMarker({
            containerClassNames: 'build-marker',
            iconStyle: defaultIconStyle,
            // iconLabel: label,
            //设置基点偏移
            offset: iconOffset.defaultOffset
          });
        },
        //构造列表元素，与getMarker类似，可以是函数，返回一个dom元素，或者模板 html string
        getListElement: function(data, context, recycledListElement) {
          // console.log(data,context,recycledListElement)
          var label = String.fromCharCode('A'.charCodeAt(0) + context.index);

          //使用模板创建
          var innerHTML = MarkerList.utils.template(
            '<div class="poi-info-left">' +
            '    <h5 class="poi-title"><span class="fa fa-building-o build-name-icon"></span>' +
            '        <%- data.name %>' +
            '    </h5>' +
            '</div>' +
            '<div class="clear"></div>', {
              data: data,
              label: label
            });

          if (recycledListElement) {
            recycledListElement.innerHTML = innerHTML;
            return recycledListElement;
          }

          return '<li class="poibox">' +
            innerHTML +
            '</li>';
        },
        //列表节点上监听的事件
        listElementEvents: ['click', 'mouseenter', 'mouseleave'],
        //marker上监听的事件
        markerEvents: ['click', 'mouseover', 'mouseout'],
        //makeSelectedEvents:false,
        selectedClassNames: 'selected',
        autoSetFitView: false
      });

      window.markerList = markerList;

      markerList.on('selectedChanged', function(event, info) {
        // $("#myList").hide();
        // map.panBy(-580,40);
        map.setZoom(14);

        if (info.selected) {

          if (info.selected.marker) {
            viewIndustryBuildPanel(info.selected.data);
            //在地图上恢复产业分布地块颜色
            for (var i = 0; i < polygonEcoLands.lands.length; i++) {
              if (polygonEcoLands.lands[i].getExtData().slected) {
                polygonEcoLands.lands[i].setOptions({
                  strokeColor: polygonEcoLands.lands[i].getExtData().borderColor,
                  fillColor: polygonEcoLands.lands[i].getExtData().color,
                  strokeWeight: defaultStrokeWeight,
                });
                var oldExtData = polygonEcoLands.lands[i].getExtData();//先保存原始ExtData数据
                oldExtData.slected = false;//改变之前选中的状态为false
                polygonEcoLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
                break;
              }
            }
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

      markerList.on('listElementMouseenter markerMouseover', function(event, record) {

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

      markerList.on('listElementMouseleave markerMouseout', function(event, record) {

        if (record && record.marker) {

          if (!this.isSelectedDataId(record.id)) {
            //恢复默认样式
            record.marker.setIconStyle(defaultIconStyle);
            record.marker.setOffset(iconOffset.defaultOffset);
          }
        }
      });

      //数据输出完成
      markerList.on('renderComplete', function(event, records) {
        $(".zdy-buildfull-cover-mask").remove();
        // map.setFitView();
        // map.panBy(-580,40);

      });

      // markerList.on('*', function(type, event, res) {
      //     console.log(type, event, res);
      // });

      //加载数据
      function loadData(src, callback) {
        console.log(src)
        /*$.getJSON(src, function(data) {
            console.log(data.result)
for(var i=0;i<data.result.length;i++){
                if(parkName == data.result[i].name){

                    //渲染数据
                    markerList.render(data.result[i].info);
                }
}
        // markerList._dataSrc = src;

        //渲染数据
        // markerList.render(data);
        // markerList.render(testData);

        if (callback) {
            callback(null, data);
        }
        });*/
        // markerList.render(testData);
        $.ajax({
          // url:"/v1/company/getLet",
          url:"/v1/floor/findAll",
          // url:"/v1/company/findNotSingle",
          type:"GET",
          dataType:"json",
          data:{},
          success:function(res){
            var result = [];
            console.log(res)
            for(var i=0;i<res.length;i++){
              if(res[i].coordinate){
                var list={};
                list = res[i];
                list.id = res[i].id;
                // list.name = res[i].name;
                list.name = res[i].floorName;
                /*list.floorAddress = res[i].floorAddress;
                list.floorNature = res[i].floorNature ? res[i].floorNature : '未知';
                list.totalArea = res[i].totalArea && res[i].totalArea != '/' ? res[i].totalArea : '未知';
                list.officeFloorArea = res[i].officeFloorArea && res[i].officeFloorArea != '/' ? res[i].officeFloorArea : '未知';
                list.shopArea = res[i].shopArea && res[i].shopArea != '/' ? res[i].shopArea : '未知';
                list.hotelArea = res[i].hotelArea && res[i].hotelArea != '/' ? res[i].hotelArea : '未知';
                list.residentialArea = res[i].residentialArea && res[i].residentialArea != '/' ? res[i].residentialArea : '未知';
                list.parkingArea = res[i].parkingArea && res[i].parkingArea != '/' ? res[i].parkingArea : '未知';
                list.floorTotal = res[i].floorTotal ? res[i].floorTotal : '未知';
                list.occupancyRate = res[i].occupancyRate ? res[i].occupancyRate : '未知';*/
                list.position = res[i].coordinate.split(",");
                result.push(list);
              }
            }
            /*for(var k in res){
                var list={};
                list.name = k;
                list.position = res[k].split(",");
                result.push(list);
            }*/
            //渲染数据
            /*{coordinate:"103.951875,30.750365",
                floorAddress:"西区天宇路2号",
                floorName:"天府创业园"}*/
            /*[{
                "name": "海科大厦",
                "position": [103.981461,30.72104]
            }
                , {
                "name": "融智总部工业园",
                "position": [103.944615,30.741166]
            }]*/
            markerList.render(result);
          },error:function(err){
            console.log(err)
          }


        })
      }

      // loadData($btns.attr('data-path'));
      // loadData("http://localhost:63342/economic/middleViews/test.json");
      // loadData("/economic/middleViews/test.json");
      loadData();

      function forcusMarker(marker) {
        marker.setTop(true);
        // map.panBy(-580,40);
        //不在地图视野内
        if (!(map.getBounds().contains(marker.getPosition()))) {

          //移动到中心
          // map.setCenter(marker.getPosition());
        }
      }

      function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();

        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
          rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
      }

      function scrollListElementIntoView($listEle) {

        if (!isElementInViewport($listEle.get(0))) {
          $('#panel').scrollTop($listEle.offset().top - $listEle.parent().offset().top);
        }

        //闪动一下
        $listEle
          .one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
            function(e) {
              $(this).removeClass('flash animated');
            }).addClass('flash animated');
      }


    });
}

/*公共园区所有地块范围*/
function getParkAllPoints(map,callback){
  console.log("AllLand",+new Date())
  var AllLandStart = +new Date();
  var pointsArr=[];
  $.ajax({
    url: "./jsonData/findAll.json",
    type:"GET",
    dataType:"json",
    data:{},
    success:function(res){
      console.log("AllLandTime",(+new Date() - AllLandStart)/1000)
      // console.log(res)
      for(var i=0;i<res.length;i++){
        // pointsArr.push(res[i].points);
        var point_x_y = [];
        var pointItem = {id:"",position:"",inefficient:"",landArea:"",landUsrNature:""};
        for(var j=0;j<res[i].points.length;j++){
          point_x_y.push([res[i].points[j].point_80_x,res[i].points[j].point_80_y]);
        }
        pointItem.id = res[i].id;
        pointItem.unifiedLandMark = res[i].unifiedLandMark;
        pointItem.rightHolder = res[i].rightHolder;
        pointItem.actualUsers = res[i].actualUsers;
        pointItem.landIsLocated = res[i].landIsLocated;
        pointItem.inefficient = res[i].inefficient;
        pointItem.isSingle = res[i].isSingle;
        pointItem.landCardNumber = res[i].landCardNumber;
        /*按性质分类*/
        pointItem.generalType = res[i].generalType;
        /*实测面积*/
        pointItem.landArea = res[i].landArea;
        /*使用全面积*/
        pointItem.usageArea = res[i].usageArea;
        pointItem.landUsrNature = res[i].landUsrNature;
        pointItem.positions = point_x_y;
        pointsArr.push(pointItem);
      }
      dataPolygonAlls = pointsArr;
      if(callback){
        callback(pointsArr)
      }else{
        return pointsArr;
      }
    },
    error:function(err){
      console.log(err)
    }
  })
}
/*按分类分步获取园区经济梯度地块信息---产业分布菜单*/
function creatEcLandStep(map,time,type,callback){
  var pointsArr=[];
  var choosePointsArr=[];
  var needPointsArr=[];
  $.ajax({
    // url: "/v1/land/getGradientView",
    url: "./jsonData/findCompanyByEnterpriseType"+ type +".json",
    type:"GET",
    dataType:"json",
    data:{revenueTime:time,enterpriseType:type},
    success:function(res){
      // console.log(res)
      for(var i=0;i<res.length;i++){
        // pointsArr.push(res[i].points);
        var point_x_y = [];
        var pointItem = {id:"",position:"",enterpriseType:"",landArea:"",landUsrNature:""};
        for(var j=0;j<res[i].points.length;j++){
          point_x_y.push([res[i].points[j].point_80_x,res[i].points[j].point_80_y]);
        }
        pointItem.id = res[i].id;
        pointItem.unifiedLandMark = res[i].unifiedLandMark;
        pointItem.rightHolder = res[i].rightHolder;
        pointItem.landIsLocated = res[i].landIsLocated;
        pointItem.enterpriseType = res[i].enterpriseType;
        pointItem.ecoLv = 1;
        pointItem.actualUsers = res[i].actualUsers;
        pointItem.pricepermeter = res[i].pricepermeter;
        pointItem.operatingIncome = res[i].operatingIncome;
        pointItem.landCardNumber = res[i].landCardNumber;
        /*按性质分类*/
        pointItem.generalType = res[i].generalType;
        /*实测面积*/
        pointItem.landArea = res[i].landArea;
        /*使用全面积*/
        pointItem.usageArea = res[i].usageArea;
        pointItem.landUsrNature = res[i].landUsrNature;
        pointItem.positions = point_x_y;
        pointItem.companyId = res[i].companyId;
        pointItem.companyIcon = res[i].companyIcon;
        pointItem.typeBreakdown = res[i].typeBreakdown;
        pointsArr.push(pointItem);
      }
      if(callback){callback(pointsArr)}

    },
    error:function(err){
      console.log(err)
    }
  })

}
/*将分类分步获取园区经济梯度地块信息组装绘图---产业分布菜单*/
function groupEcLandStep(map,options,callback){
  var startTime = +new Date();
  /*请求新数据将保存的地块对象清除*/
  polygonEcoLands.lands=[];
  /*请求新数据将保存的单一分类数据清除*/
  dataPolygonEcoCateLands.living=[];
  dataPolygonEcoCateLands.electron=[];
  dataPolygonEcoCateLands.make=[];
  dataPolygonEcoCateLands.other=[];
  dataPolygonEcoCateLands.service=[];
  /*去除所有地块里含有经济等级的地块*/
  /*if(dataPolygonAlls.length>0){
    var allOptions = $.extend([],dataPolygonAlls,true);
    for (var i = 0; i < options.length; i++) {
      for (var j = 0; j < allOptions.length; j++) {
        if (options[i].unifiedLandMark == allOptions[j].unifiedLandMark) {
          allOptions.splice(j, 1);
          break;
        }
      }
    }
    dataPolygonEcoLands = allOptions.concat(options);

    // dataPolygonEcoLands = localStorage.setItem('dataPolygonEcoLands', JSON.stringify(dataPolygonEcoLands));

    var indexedDBdata = {type: 'dataPolygonEcoLands', data: dataPolygonEcoLands};
    indexeDBmethod.add('landData',indexedDBdata);
    newpointers = allOptions.concat(options);
    //-----
    creatIndustryDistributedLandAgain(map, dataPolygonEcoLands);
  }else{*/
    getParkAllPoints(map,function(allLandOptions) {
      var allOptions = $.extend([],allLandOptions,true);
      for (var i = 0; i < options.length; i++) {
        for (var j = 0; j < allOptions.length; j++) {
          if (options[i].unifiedLandMark == allOptions[j].unifiedLandMark) {
            allOptions.splice(j, 1);
            break;
          }
        }
      }
      dataPolygonEcoLands = allOptions.concat(options);

      // dataPolygonEcoLands = localStorage.setItem('dataPolygonEcoLands', JSON.stringify(dataPolygonEcoLands));

      var indexedDBdata = {type: 'dataPolygonEcoLands', data: dataPolygonEcoLands};
      indexeDBmethod.add('landData',indexedDBdata);
      newpointers = allOptions.concat(options);
      //-----
      creatIndustryDistributedLandAgain(map, dataPolygonEcoLands);
    })
  // }
}

/*将分类TOP经济地块单独信息绘图*/
function creatTopCateLandSingle(map,options,setCenter){
  polygonTopCateLands.lands=[];
  var allOptions = dataPolygonAlls;
  /*请求新数据将保存的排名清除*/
  topRank = {生物医药:[],电子信息:[],精密制造:[],其他:[],服务业:[]};
  /*去除所有地块里含有经济等级的地块*/
  for (var i = 0; i < options.length; i++) {
    for (var j = 0; j < allOptions.length; j++) {
      if (options[i].unifiedLandMark == allOptions[j].unifiedLandMark) {
        allOptions.splice(j, 1);
        break;
      }
    }
  }
  newpointers = allOptions.concat(options);
  var colors = ["#ff7e9f","#ff7e00","#a57c52","#7d7dff","#ff0000","#ffdf7e"];
  // var colors2 = ["#ff4141","#65e372","#4745ff","#dd7f34"];
  var colors3 = ["#994b5e","#994c00","#59432d","#4b4b99","#990000"];
  var color = defaultLandColor;
  var borderColor = "#fff";
  for(var i=0;i<newpointers.length;i++){
    color = defaultLandColor;
    borderColor = "#fff";
    if(newpointers[i].landType == "生物医药"){
      if(newpointers[i].type == "top"){
        color =colors3[0];
      }else if(newpointers[i].type == "last"){
        color =colors[0];
      }
      // var color ="transparent"
    }else if(newpointers[i].landType == "电子信息"){
      if(newpointers[i].type == "top"){
        color =colors3[1];
      }else if(newpointers[i].type == "last"){
        color =colors[1];
      }
    }else if(newpointers[i].landType == "精密制造"){
      if(newpointers[i].type == "top"){
        color =colors3[2];
      }else if(newpointers[i].type == "last"){
        color =colors[2];
      }
    }else if(newpointers[i].landType == "其他"){
      if(newpointers[i].type == "top"){
        color =colors3[3];
      }else if(newpointers[i].type == "last"){
        color =colors[3];
      }
    }else if(newpointers[i].landType == "服务业"){
      if(newpointers[i].type == "top"){
        color =colors3[4];
      }else if(newpointers[i].type == "last"){
        color =colors[4];
      }
    }else{
      borderColor = defaultBorderColor;
    }

    var polygonOptions = {
      map: map,
      strokeColor: borderColor,
      // strokeColor: color,
      strokeWeight: 2,
      fillColor: color,
      fillOpacity: 0.8,
      /*strokeStyle: "dashed",
      strokeDasharray: [20,10],*/
      extData: {
        id: newpointers[i].id,
        type: newpointers[i].type,
        landType: newpointers[i].landType,
        actualUsers: newpointers[i].actualUsers,
        pricepermeter: newpointers[i].pricepermeter,
        landCardNumber: newpointers[i].landCardNumber,
        landArea: newpointers[i].landArea,
        usageArea: newpointers[i].usageArea,
        /*按性质分类*/
        generalType: newpointers[i].generalType,
        landUsrNature: newpointers[i].landUsrNature,
        unifiedLandMark: newpointers[i].unifiedLandMark,
        landIsLocated: newpointers[i].landIsLocated,
        rightHolder: newpointers[i].rightHolder,
        governmentInvestment: newpointers[i].governmentInvestment,
        color: color,
        borderColor: borderColor,
        slected: false
      }
    };
    // 外多边形坐标数组和内多边形坐标数组
    var pointers = newpointers[i].positions;
    polygonTopLand = new AMap.Polygon(polygonOptions);
    polygonTopLand.on("click",function(e){
      /*看数据*/
      console.log(this.getExtData())
      if(!this.getExtData().slected){
        var lanTitle = idustryParkName;
        var landArea = this.getExtData().landArea;
        var landUsrNature = this.getExtData().landUsrNature;
        var that = this;
        var unifiedLandMark = this.getExtData().unifiedLandMark;
        chooseLanId = unifiedLandMark;
        // $(".industry-menu .menu-row:last-child li:first-child").click();
        // $(".industry-menu .menu-row:last-child li:first-child").siblings().hide();
        //在地图上改变当前点击的多边形
        for(var i=0;i<polygonTopCateLands.lands.length;i++){
          if(polygonTopCateLands.lands[i].getExtData().slected){
            polygonTopCateLands.lands[i].setOptions({strokeColor:polygonTopCateLands.lands[i].getExtData().borderColor,fillColor:polygonTopCateLands.lands[i].getExtData().color});
            var oldExtData = polygonTopCateLands.lands[i].getExtData();//先保存原始ExtData数据
            oldExtData.slected = false;//改变之前选中的状态为false
            polygonTopCateLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
            break;
          }
        }

        var newExtData = this.getExtData();
        newExtData.slected = true;
        this.setOptions({strokeColor:selectedColor,fillColor:selectedColor});
        this.setExtData(newExtData);
        var options = {lanTitle:lanTitle,landArea:landArea,landUsrNature:landUsrNature,polygon:that};
        // landInfoWindowFn(map,options,"polygonTopLands");
        viewLandPanel(this.getExtData())
      }
    })
    polygonTopLand.on("mouseover",function(e){
    })
    polygonTopLand.on("mouseout",function(e){
      // landInfoWindow.close()
    })
    // console.log(polygon)
    polygonTopLand.setPath(pointers);
    /*将TOP10的排名使用marker显示*/
    if(newpointers[i].type == "top"){
      var landType = newpointers[i].landType;
      topRank[landType].push(newpointers[i]);
      var index = topRank[landType].length;
      var text = new AMap.Text({
        text:index,
        map:map,
        position:[polygonTopLand.getBounds().getCenter().getLng(),polygonTopLand.getBounds().getCenter().getLat()]
      })
      text.setMap(map);
    }
    polygonTopCateLands.lands.push(polygonTopLand);
  }
  map.setFitView();
  map.panBy(-550, -40);
  $(".zdy-full-cover-mask").remove();
}
/*将用途地块单独信息绘图*/
function creatPurposeCateLandSingle(map,options,callback){
  polygonNatureLands.lands=[];
  // var allOptions = dataPolygonAlls;
    var allOptions = $.extend(true,[],dataPolygonNatureLands);
    var options = $.extend(true,[],options);
  for (var i = 0; i < options.length; i++) {
    options[i].isIndustryLand = true;
    for (var j = 0; j < allOptions.length; j++) {
      if (options[i].unifiedLandMark == allOptions[j].unifiedLandMark) {
        allOptions.splice(j, 1);
        break;
      }
    }
  }
  var colors = ["#07fff7","#a57c52","#2a8ab8","#ff7eff","#ff0000","#ffd041","#fff"];
  newpointers = allOptions.concat(options);
  //-----
  for(var i=0;i<newpointers.length;i++){
    var color = defaultLandColor;
    var borderColor = "#fff";
    if(newpointers[i].isIndustryLand){
      if(newpointers[i].generalType == "储备用地"){
        color =colors[0];
      }else if(newpointers[i].generalType == "工业用地"){
        color =colors[1];
      }else if(newpointers[i].generalType == "公共设施及其他用地"){
        color =colors[2];
      }else if(newpointers[i].generalType == "科研用地"){
        color =colors[3];
      }else if(newpointers[i].generalType == "商服用地"){
        color =colors[4];
      }else if(newpointers[i].generalType == "住宅用地"){
        color =colors[5];
      }else{
        // color =colors[6];
        borderColor = defaultBorderColor;
      }
    }else{
      // color =colors[6];
      borderColor = defaultBorderColor;
    }

    var polygonOptions = {
      map: map,
      strokeColor: borderColor,
      // strokeColor: color,
      strokeWeight: defaultStrokeWeight,
      fillColor: color,
      fillOpacity: 0.8,
      /*strokeStyle: "dashed",
      strokeDasharray: [20,10],*/
      extData: {
        id: newpointers[i].id,
        inefficient: newpointers[i].inefficient,
        type: newpointers[i].type,
        landType: newpointers[i].landType,
        landCardNumber: newpointers[i].landCardNumber,
        landArea: newpointers[i].landArea,
        usageArea: newpointers[i].usageArea,
        /*按性质分类*/
        generalType: newpointers[i].generalType,
        landUsrNature: newpointers[i].landUsrNature,
        actualUsers: newpointers[i].actualUsers,
        unifiedLandMark: newpointers[i].unifiedLandMark,
        landIsLocated: newpointers[i].landIsLocated,
        rightHolder: newpointers[i].rightHolder,
        theRealFunction: newpointers[i].theRealFunction,
        governmentInvestment: newpointers[i].governmentInvestment,
        color: color,
        borderColor: borderColor,
        slected: false
      }
    };
    // 外多边形坐标数组和内多边形坐标数组
    var pointers = newpointers[i].positions;
    polygonNatureLand = new AMap.Polygon(polygonOptions);
    polygonNatureLand.on("click",function(e){
      /*看数据*/
      console.log(this.getExtData())
      if(!this.getExtData().slected){
        var lanTitle = idustryParkName;
        var landArea = this.getExtData().landArea;
        var landUsrNature = this.getExtData().landUsrNature;
        var that = this;
        var unifiedLandMark = this.getExtData().unifiedLandMark;
        chooseLanId = unifiedLandMark;
        // $(".industry-menu .menu-row:last-child li:first-child").click();
        // $(".industry-menu .menu-row:last-child li:first-child").siblings().hide();
        //在地图上改变当前点击的多边形
        for(var i=0;i<polygonNatureLands.lands.length;i++){
          if(polygonNatureLands.lands[i].getExtData().slected){
            polygonNatureLands.lands[i].setOptions({
              strokeColor:"#fff",
              fillColor:polygonNatureLands.lands[i].getExtData().color,
              strokeWeight:defaultStrokeWeight
            });
            var oldExtData = polygonNatureLands.lands[i].getExtData();//先保存原始ExtData数据
            oldExtData.slected = false;//改变之前选中的状态为false
            polygonNatureLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
            break;
          }
        }
        var newExtData = this.getExtData();
        newExtData.slected = true;
        this.setOptions({strokeColor:selectedBorderColor,strokeWeight:selectedStrokeWeight});
        this.setExtData(newExtData);
        var options = {lanTitle:lanTitle,landArea:landArea,landUsrNature:landUsrNature,polygon:that};
        // landInfoWindowFn(map,options,"polygonNatureLands");
        /*单独请求低效用地数据*/
        if(this.getExtData().inefficient){
          getInefficientLandData(unifiedLandMark);
        }
        viewLandPanel(this.getExtData())
      }
    })
    polygonNatureLand.on("mouseover",function(e){
    })
    polygonNatureLand.on("mouseout",function(e){
      // landInfoWindow.close()
    })
    // console.log(polygon)
    polygonNatureLand.setPath(pointers);
    polygonNatureLands.lands.push(polygonNatureLand);
  }
  $(".zdy-full-cover-mask").remove();
  map.setFitView();
  map.setZoom(14);
  if(callback){callback()}
}
/*绘制性质地块--用途地块*/
function creatNatureLand(map){
  loadingFullAnimat("zdy-full-cover-mask","body");
  polygonNatureLands.lands=[];
  // var colors = ["#fff","#a57c52","#7edfff","#ff7eff","#ff0000","#ffdf7e","#5557ff"];
  var colors = ["#07fff7","#a57c52","#2a8ab8","#ff7eff","#ff0000","#ffd041","#2a8ab8"];
  // dataPolygonNatureLands = localStorage.getItem('dataPolygonNatureLands') ? JSON.parse(localStorage.getItem('dataPolygonNatureLands')) : dataPolygonNatureLands;
  /*判断内存是否存在数据*/
  if(dataPolygonNatureLands.length > 0){
    creatNatureLandAgain(map,dataPolygonNatureLands);
  }else{
    /*从indexedDB获取数据*/
    indexeDBmethod.byIndexGet('landData','dataPolygonNatureLands',function(res){
      var dbData = res;
      dataPolygonNatureLands = dbData ? dbData.data : dataPolygonNatureLands;
      if(dataPolygonNatureLands.length<1){
        var startTime = +new Date();
        console.log("开始性质请求",+new Date())
        var pointsArr=[];
        $.ajax({
          url: "./jsonData/findAllHasType.json",
          type:"GET",
          dataType:"json",
          data:{},
          success:function(res){
            console.log("请求性质用时",(+new Date()-startTime)/1000)
            var startTime2 = +new Date();
            console.log(res)
            for(var i=0;i<res.length;i++){
              if(!(res[i].generalType == '公共设施及其他用地' && res[i].unifiedLandMark.indexOf('5+2区域属性') > -1)){
                // pointsArr.push(res[i].points);
                var point_x_y = [];
                var pointItem = {id:"",position:"",inefficient:"",landArea:"",landUsrNature:""};
                for(var j=0;j<res[i].points.length;j++){
                  point_x_y.push([res[i].points[j].point_80_x,res[i].points[j].point_80_y]);
                }
                pointItem.id = res[i].id;
                pointItem.unifiedLandMark = res[i].unifiedLandMark;
                pointItem.rightHolder = res[i].rightHolder;
                pointItem.actualUsers = res[i].actualUsers;
                pointItem.landCardNumber = res[i].landCardNumber;
                pointItem.landIsLocated = res[i].landIsLocated;
                pointItem.inefficient = res[i].inefficient;
                pointItem.generalType = res[i].generalType;
                /*实测面积*/
                pointItem.landArea = res[i].landArea;
                /*使用全面积*/
                pointItem.usageArea = res[i].usageArea;
                pointItem.landUsrNature = res[i].landUsrNature;
                pointItem.theRealFunction = res[i].theRealFunction;
                pointItem.governmentInvestment = res[i].governmentInvestment;
                pointItem.positions = point_x_y;
                pointsArr.push(pointItem);
              }
            }
            dataPolygonNatureLands = pointsArr;
            // localStorage.setItem('dataPolygonNatureLands', JSON.stringify(pointsArr));
            var indexedDBdata = {type: 'dataPolygonNatureLands', data: pointsArr};
            indexeDBmethod.add('landData',indexedDBdata);
            newpointers = pointsArr;
            landMenuInfoWindow(newpointers);
            //-----
            creatNatureLandAgain(map,dataPolygonNatureLands);
          },error:function(err){
            console.log(err)
          }
        })
      }else{
        creatNatureLandAgain(map,dataPolygonNatureLands);
      }
    });

  }

}
/*土地用途--将已处理或缓存的数据绘制地图*/
function creatNatureLandAgain(map,dataOptions){
  var colors = ["#07fff7","#a57c52","#2a8ab8","#ff7eff","#ff0000","#ffd041","#2a8ab8"];
  /*请求新数据将保存的单一分类数据清除(切换时间会再次请求)*/
  dataPolygonPurposeCateLands['工业用地']=[];
  dataPolygonPurposeCateLands['公共设施及其他用地']=[];
  dataPolygonPurposeCateLands['科研用地']=[];
  dataPolygonPurposeCateLands['商服用地']=[];
  dataPolygonPurposeCateLands['住宅用地']=[];
  dataPolygonPurposeCateLands['储备用地']=[];
  newpointers = dataOptions;
  //-----
  landMenuInfoWindow(newpointers);
  var color;
  for(var i=0;i<newpointers.length;i++){

    if(newpointers[i].generalType == "储备用地"){
      // 保存的单一分类数据
      dataPolygonPurposeCateLands[newpointers[i].generalType].push(newpointers[i]);
      color =colors[0];
    }else if(newpointers[i].generalType == "工业用地"){
      // 保存的单一分类数据
      dataPolygonPurposeCateLands[newpointers[i].generalType].push(newpointers[i]);
      color =colors[1];
    }else if(newpointers[i].generalType == "公共设施及其他用地"){
      // 保存的单一分类数据
      dataPolygonPurposeCateLands[newpointers[i].generalType].push(newpointers[i]);
      color =colors[2];
    }else if(newpointers[i].generalType == "科研用地"){
      // 保存的单一分类数据
      dataPolygonPurposeCateLands[newpointers[i].generalType].push(newpointers[i]);
      color =colors[3];
    }else if(newpointers[i].generalType == "商服用地"){
      // 保存的单一分类数据
      dataPolygonPurposeCateLands[newpointers[i].generalType].push(newpointers[i]);
      color =colors[4];
    }else if(newpointers[i].generalType == "住宅用地"){
      // 保存的单一分类数据
      dataPolygonPurposeCateLands[newpointers[i].generalType].push(newpointers[i]);
      color =colors[5];
    }else{
      color =colors[6];
    }

    var polygonOptions = {
      map: map,
      strokeColor: defaultBorderColor,
      // strokeColor: color,
      strokeWeight: defaultStrokeWeight,
      fillColor: color,
      fillOpacity: defualtFillOpacity,
      /*strokeStyle: "dashed",
      strokeDasharray: [20,10],*/
      extData: {
        id: newpointers[i].id,
        inefficient: newpointers[i].inefficient,
        type: newpointers[i].type,
        landType: newpointers[i].landType,
        landCardNumber: newpointers[i].landCardNumber,
        landArea: newpointers[i].landArea,
        usageArea: newpointers[i].usageArea,
        /*按性质分类*/
        generalType: newpointers[i].generalType,
        landUsrNature: newpointers[i].landUsrNature,
        actualUsers: newpointers[i].actualUsers,
        unifiedLandMark: newpointers[i].unifiedLandMark,
        landIsLocated: newpointers[i].landIsLocated,
        rightHolder: newpointers[i].rightHolder,
        theRealFunction: newpointers[i].theRealFunction,
        governmentInvestment: newpointers[i].governmentInvestment,
        color: color,
        slected: false
      }
    };
    // 外多边形坐标数组和内多边形坐标数组
    var pointers = newpointers[i].positions;
    polygonNatureLand = new AMap.Polygon(polygonOptions);
    polygonNatureLand.on("click",function(e){
      /*看数据*/
      console.log(this.getExtData())
      if(!this.getExtData().slected){
        var lanTitle = idustryParkName;
        var landArea = this.getExtData().landArea;
        var landUsrNature = this.getExtData().landUsrNature;
        var that = this;
        var unifiedLandMark = this.getExtData().unifiedLandMark;
        chooseLanId = unifiedLandMark;
        // $(".industry-menu .menu-row:last-child li:first-child").click();
        // $(".industry-menu .menu-row:last-child li:first-child").siblings().hide();
        //在地图上改变当前点击的多边形
        for(var i=0;i<polygonNatureLands.lands.length;i++){
          if(polygonNatureLands.lands[i].getExtData().slected){
            polygonNatureLands.lands[i].setOptions({
              strokeColor:defaultBorderColor,
              fillColor:polygonNatureLands.lands[i].getExtData().color,
              strokeWeight:defaultStrokeWeight
            });
            var oldExtData = polygonNatureLands.lands[i].getExtData();//先保存原始ExtData数据
            oldExtData.slected = false;//改变之前选中的状态为false
            polygonNatureLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
            break;
          }
        }
        var newExtData = this.getExtData();
        newExtData.slected = true;
        this.setOptions({strokeColor:selectedBorderColor,strokeWeight:selectedStrokeWeight});
        this.setExtData(newExtData);
        var options = {lanTitle:lanTitle,landArea:landArea,landUsrNature:landUsrNature,polygon:that};
        // landInfoWindowFn(map,options,"polygonNatureLands");
        /*单独请求低效用地数据*/
        if(this.getExtData().inefficient){
          getInefficientLandData(unifiedLandMark);
        }
        viewLandPanel(this.getExtData())
      }
    })
    polygonNatureLand.on("mouseover",function(e){
    })
    polygonNatureLand.on("mouseout",function(e){
      // landInfoWindow.close()
    })
    // console.log(polygon)
    polygonNatureLand.setPath(pointers);
    polygonNatureLands.lands.push(polygonNatureLand);
  }
  $(".zdy-full-cover-mask").remove();
  map.setFitView();
  map.setZoom(14);
}

/*信息窗口*/
function landInfoWindowFn(map,options,polygonName){
  var lanTitle = options.lanTitle;
  var landArea = (options.landArea == " " || options.landArea == null) ? "未知" : options.landArea;
  var landUsrNature = (options.landUsrNature == " " || options.landUsrNature == null) ? "未知" : options.landUsrNature;
  var that = options.polygon;
  var unifiedLandMark = that.getExtData().unifiedLandMark;
  AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {
    landInfoWindow = new SimpleInfoWindow({
      //模板, underscore
      infoTitle: '<strong><%- title %></strong>',
      /*infoBody: '<p class="my-desc">' +
      //<%= 原值插入 ..
      '<%= img %>' +
      //<%- html编码后插入
      '<%- body %>' +
      '</p>',*/
      infoBody: `<div class="land-info">
												<div class="land-info-item">
													<div class="title">土地利用情况</div>
													<div class="land-desc"><%- body %></div>
												</div>
												<div class="land-info-item">
													<div class="title">项目占地面积</div>
													<div class="land-desc"><%= (landArea/666).toFixed(2) %>平方</div>
												</div>
												<div class="land-info-item">
													<div class="title">用地性质</div>
													<div class="land-desc"><%= landUsrNature %></div>
												</div>
												<div class="land-info-item">
													<div class="title">控制性规划</div>
													<div class="land-desc"><%- body %></div>
												</div>
											</div>`,
      //模板数据
      infoTplData: {
        title: lanTitle,
        landArea: landArea,
        landUsrNature: landUsrNature,
        body: '<---------内容--------->'
      },

      //基点指向marker的头部位置
      offset: new AMap.Pixel(80, 131)
    });
//                        infoWindow.open(map, [that.getBounds().northeast.lng,that.getBounds().northeast.lat]);
    landInfoWindow.open(map, [that.getBounds().northeast.lng,that.getBounds().northeast.lat-((that.getBounds().northeast.lat-that.getBounds().southwest.lat)/2)]);

    /*关闭信息窗口触发*/
    landInfoWindow.on("close",function (e) {
      console.log(e)
      if(!landInfoWindow.getIsOpen()){
        switchMenuLandPanle();
      }
      //在地图上改变点击的多边形
      if(polygonName == "polygons"){
        /*恢复地块样式*/
        if(polygons != undefined){
          for(var i=0;i<polygons.lands.length;i++){
            /*避免窗口自动关闭时覆盖点击的地块颜色*/
            if(polygons.lands[i].getExtData().slected && unifiedLandMark == polygons.lands[i].getExtData().unifiedLandMark){
              polygons.lands[i].setOptions({strokeColor:"#fff",fillColor:polygons.lands[i].getExtData().color});
              var oldExtData = polygons.lands[i].getExtData();//先保存原始ExtData数据
              oldExtData.slected = false;//改变之前选中的状态为false
              polygons.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
            }

          }
        }
      }else if(polygonName == "polygonEcoLands"){
        /*恢复经济地块样式*/
        if(polygonEcoLands != undefined){
          for(var i=0;i<polygonEcoLands.lands.length;i++){
            /*避免窗口自动关闭时覆盖点击的地块颜色*/
            if(polygonEcoLands.lands[i].getExtData().slected && unifiedLandMark == polygonEcoLands.lands[i].getExtData().unifiedLandMark){
              polygonEcoLands.lands[i].setOptions({strokeColor:"#fff",fillColor:polygonEcoLands.lands[i].getExtData().color});
              var oldExtData = polygonEcoLands.lands[i].getExtData();//先保存原始ExtData数据
              oldExtData.slected = false;//改变之前选中的状态为false
              polygonEcoLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
            }

          }
        }
      }else if(polygonName == "polygonTopLands"){
        /*恢复经济地块样式*/
        if(polygonTopLands != undefined){
          for(var i=0;i<polygonTopLands.lands.length;i++){
            /*避免窗口自动关闭时覆盖点击的地块颜色*/
            if(polygonTopLands.lands[i].getExtData().slected && unifiedLandMark == polygonTopLands.lands[i].getExtData().unifiedLandMark){
              polygonTopLands.lands[i].setOptions({strokeColor:"#fff",fillColor:polygonTopLands.lands[i].getExtData().color});
              var oldExtData = polygonTopLands.lands[i].getExtData();//先保存原始ExtData数据
              oldExtData.slected = false;//改变之前选中的状态为false
              polygonTopLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
            }

          }
        }
      }else if(polygonName == "polygonAlls"){
        /*恢复经济地块样式*/
        if(polygonAlls != undefined){
          for(var i=0;i<polygonAlls.lands.length;i++){
            /*避免窗口自动关闭时覆盖点击的地块颜色*/
            if(polygonAlls.lands[i].getExtData().slected && unifiedLandMark == polygonAlls.lands[i].getExtData().unifiedLandMark){
              polygonAlls.lands[i].setOptions({strokeColor:"#fff",fillColor:polygonAlls.lands[i].getExtData().color});
              var oldExtData = polygonAlls.lands[i].getExtData();//先保存原始ExtData数据
              oldExtData.slected = false;//改变之前选中的状态为false
              polygonAlls.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
            }

          }
        }
      }else if(polygonName == "polygonNatureLands"){
        /*恢复经济地块样式*/
        if(polygonNatureLands != undefined){
          for(var i=0;i<polygonNatureLands.lands.length;i++){
            /*避免窗口自动关闭时覆盖点击的地块颜色*/
            if(polygonNatureLands.lands[i].getExtData().slected && unifiedLandMark == polygonNatureLands.lands[i].getExtData().unifiedLandMark){
              polygonNatureLands.lands[i].setOptions({strokeColor:"#fff",fillColor:polygonNatureLands.lands[i].getExtData().color});
              var oldExtData = polygonNatureLands.lands[i].getExtData();//先保存原始ExtData数据
              oldExtData.slected = false;//改变之前选中的状态为false
              polygonNatureLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
            }

          }
        }
      }else if(polygonName == "polygonInefficients"){
        /*恢复经济地块样式*/
        if(polygonInefficients != undefined){
          for(var i=0;i<polygonInefficients.lands.length;i++){
            /*避免窗口自动关闭时覆盖点击的地块颜色*/
            if(polygonInefficients.lands[i].getExtData().slected && unifiedLandMark == polygonInefficients.lands[i].getExtData().unifiedLandMark){
              polygonInefficients.lands[i].setOptions({strokeColor:"#fff",fillColor:polygonInefficients.lands[i].getExtData().color});
              var oldExtData = polygonInefficients.lands[i].getExtData();//先保存原始ExtData数据
              oldExtData.slected = false;//改变之前选中的状态为false
              polygonInefficients.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
            }

          }
        }
      }else{
        /*处理通过调用infoWindow.close()方法关闭*/
        if(polygons != undefined && polygons.lands.length>0){
          for(var i=0;i<polygons.lands.length;i++){
            /*避免窗口自动关闭时覆盖点击的地块颜色*/
            if(polygons.lands[i].getExtData().slected && unifiedLandMark == polygons.lands[i].getExtData().unifiedLandMark){
              polygons.lands[i].setOptions({strokeColor:"#fff",fillColor:polygons.lands[i].getExtData().color});
              var oldExtData = polygons.lands[i].getExtData();//先保存原始ExtData数据
              oldExtData.slected = false;//改变之前选中的状态为false
              polygons.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
            }

          }
        }
        if(polygonEcoLands != undefined && polygonEcoLands.lands.length>0){
          for(var i=0;i<polygonEcoLands.lands.length;i++){
            /*避免窗口自动关闭时覆盖点击的地块颜色*/
            if(polygonEcoLands.lands[i].getExtData().slected && unifiedLandMark == polygonEcoLands.lands[i].getExtData().unifiedLandMark){
              polygonEcoLands.lands[i].setOptions({strokeColor:"#fff",fillColor:polygonEcoLands.lands[i].getExtData().color});
              var oldExtData = polygonEcoLands.lands[i].getExtData();//先保存原始ExtData数据
              oldExtData.slected = false;//改变之前选中的状态为false
              polygonEcoLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
            }

          }
        }
        if(polygonTopLands != undefined && polygonTopLands.lands.length>0){
          for(var i=0;i<polygonTopLands.lands.length;i++){
            /*避免窗口自动关闭时覆盖点击的地块颜色*/
            if(polygonTopLands.lands[i].getExtData().slected && unifiedLandMark == polygonTopLands.lands[i].getExtData().unifiedLandMark){
              polygonTopLands.lands[i].setOptions({strokeColor:"#fff",fillColor:polygonTopLands.lands[i].getExtData().color});
              var oldExtData = polygonTopLands.lands[i].getExtData();//先保存原始ExtData数据
              oldExtData.slected = false;//改变之前选中的状态为false
              polygonTopLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
            }

          }
        }
        if(polygonAlls != undefined && polygonAlls.lands.length>0){
          for(var i=0;i<polygonAlls.lands.length;i++){
            /*避免窗口自动关闭时覆盖点击的地块颜色*/
            if(polygonAlls.lands[i].getExtData().slected && unifiedLandMark == polygonAlls.lands[i].getExtData().unifiedLandMark){
              polygonAlls.lands[i].setOptions({strokeColor:"#fff",fillColor:polygonAlls.lands[i].getExtData().color});
              var oldExtData = polygonAlls.lands[i].getExtData();//先保存原始ExtData数据
              oldExtData.slected = false;//改变之前选中的状态为false
              polygonAlls.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
            }

          }
        }
        if(polygonNatureLands != undefined && polygonNatureLands.lands.length>0){
          for(var i=0;i<polygonNatureLands.lands.length;i++){
            /*避免窗口自动关闭时覆盖点击的地块颜色*/
            if(polygonNatureLands.lands[i].getExtData().slected && unifiedLandMark == polygonNatureLands.lands[i].getExtData().unifiedLandMark){
              polygonNatureLands.lands[i].setOptions({strokeColor:"#fff",fillColor:polygonNatureLands.lands[i].getExtData().color});
              var oldExtData = polygonNatureLands.lands[i].getExtData();//先保存原始ExtData数据
              oldExtData.slected = false;//改变之前选中的状态为false
              polygonNatureLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
            }

          }
        }
        if(polygonInefficients != undefined && polygonInefficients.lands.length>0){
          for(var i=0;i<polygonInefficients.lands.length;i++){
            /*避免窗口自动关闭时覆盖点击的地块颜色*/
            if(polygonInefficients.lands[i].getExtData().slected && unifiedLandMark == polygonInefficients.lands[i].getExtData().unifiedLandMark){
              polygonInefficients.lands[i].setOptions({strokeColor:"#fff",fillColor:polygonInefficients.lands[i].getExtData().color});
              var oldExtData = polygonInefficients.lands[i].getExtData();//先保存原始ExtData数据
              oldExtData.slected = false;//改变之前选中的状态为false
              polygonInefficients.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
            }

          }
        }
      }

    })
  })
}

/*绘制土地低效用地*/
function creatUserNouseLand(map) {
  loadingFullAnimat("zdy-full-cover-mask","body");
  polygonUseAndNouseLands.lands=[];
  // var colors = ["#f9b620","#ff7eff","#4747f1"];
  var colors = ["#07fff7","#a57c52","#2a8ab8","#ff7eff","#ff0000","#ffd041","transparent"];
  // dataPolygonNatureLands = localStorage.getItem('dataPolygonNatureLands') ? JSON.parse(localStorage.getItem('dataPolygonNatureLands')) : dataPolygonNatureLands;
  // dataPolygonUseAndNouse = localStorage.getItem('dataPolygonUseAndNouse') ? JSON.parse(localStorage.getItem('dataPolygonUseAndNouse')) : dataPolygonUseAndNouse;
  /*判断内存是否存在数据*/
  if(dataPolygonNatureLands.length>0 || dataPolygonUseAndNouse.length>0){
    var dataOptions = dataPolygonNatureLands.length > 0 ? dataPolygonNatureLands : dataPolygonUseAndNouse;
    creatUserNouseLandAgain(map,dataOptions);
  }else{
    indexeDBmethod.byIndexGet('landData','dataPolygonNatureLands',function(res){
      /*在indexedDB获取数据*/
      var dbData = res;
      dataPolygonNatureLands = dbData ? dbData.data : dataPolygonNatureLands;
      if(dataPolygonNatureLands.length<1 && dataPolygonUseAndNouse.length<1){
        var startTime = +new Date();
        console.log("开始性质请求",+new Date())
        var pointsArr=[];
        $.ajax({
          url: "/v1/land/findAllHasType",
          type:"GET",
          dataType:"json",
          data:{},
          success:function(res){
            console.log("请求性质用时",(+new Date()-startTime)/1000)
            var startTime2 = +new Date();
            console.log(res)
            for(var i=0;i<res.length;i++){
              // pointsArr.push(res[i].points);
              var point_x_y = [];
              var pointItem = {id:"",position:"",inefficient:"",landArea:"",landUsrNature:""};
              for(var j=0;j<res[i].points.length;j++){
                point_x_y.push([res[i].points[j].point_80_x,res[i].points[j].point_80_y]);
              }
              pointItem.id = res[i].id;
              pointItem.unifiedLandMark = res[i].unifiedLandMark;
              pointItem.rightHolder = res[i].rightHolder;
              pointItem.actualUsers = res[i].actualUsers;
              pointItem.landCardNumber = res[i].landCardNumber;
              pointItem.landIsLocated = res[i].landIsLocated;
              pointItem.inefficient = res[i].inefficient;
              pointItem.generalType = res[i].generalType;
              /*实测面积*/
              pointItem.landArea = res[i].landArea;
              /*使用全面积*/
              pointItem.usageArea = res[i].usageArea;
              pointItem.landUsrNature = res[i].landUsrNature;
              pointItem.governmentInvestment = res[i].governmentInvestment;
              pointItem.positions = point_x_y;
              pointsArr.push(pointItem);
            }
            dataPolygonUseAndNouse = pointsArr;

            //localStorage.setItem('dataPolygonUseAndNouse', JSON.stringify(pointsArr));
            var indexedDBdata = {type: 'dataPolygonUseAndNouse', data: pointsArr};
            indexeDBmethod.add('landData',indexedDBdata);
            newpointers = pointsArr;

            creatUserNouseLandAgain(map,dataPolygonUseAndNouse);
          },error:function(err){
            console.log(err)
          }
        })
      }else{

        var dataOptions = dataPolygonNatureLands.length > 0 ? dataPolygonNatureLands : dataPolygonUseAndNouse;
        creatUserNouseLandAgain(map,dataOptions);
      }
    })
  }
}
/*土地低效用地--将已处理或缓存的数据绘制地图*/
function creatUserNouseLandAgain(map,dataOptions){
  var colors = ["#07fff7","#a57c52","#2a8ab8","#ff7eff","#ff0000","#ffd041","transparent"];
  newpointers = dataOptions;
  //-----
  landLnadUseInfoWindow(newpointers);
  var color;
  for(var i=0;i<newpointers.length;i++){
    if(newpointers[i].generalType == "储备用地" && newpointers[i].inefficient){
      color =colors[0];
    }else if(newpointers[i].generalType == "工业用地" && newpointers[i].inefficient){
      color =colors[1];
    }else if(newpointers[i].generalType == "公共设施及其他用地" && newpointers[i].inefficient){
      color =colors[2];
    }else if(newpointers[i].generalType == "科研用地" && newpointers[i].inefficient){
      color =colors[3];
    }else if(newpointers[i].generalType == "商服用地" && newpointers[i].inefficient){
      color =colors[4];
    }else if(newpointers[i].generalType == "住宅用地" && newpointers[i].inefficient){
      color =colors[5];
    }else{
      color =colors[6];
    }
    /*if(newpointers[i].generalType == "储备用地"){
      color =colors[2];
      // var color ="transparent"
    }else{
      if(newpointers[i].inefficient){
        color =colors[1];
      }else{
        color =colors[0];
      }
    }*/

    var polygonOptions = {
      map: map,
      strokeColor: defaultBorderColor,
      // strokeColor: color,
      strokeWeight: defaultStrokeWeight,
      fillColor: color,
      fillOpacity: defualtFillOpacity,
      /*strokeStyle: "dashed",
      strokeDasharray: [20,10],*/
      extData: {
        id: newpointers[i].id,
        inefficient: newpointers[i].inefficient,
        type: newpointers[i].type,
        landType: newpointers[i].landType,
        landCardNumber: newpointers[i].landCardNumber,
        landArea: newpointers[i].landArea,
        usageArea: newpointers[i].usageArea,
        /*按性质分类*/
        generalType: newpointers[i].generalType,
        landUsrNature: newpointers[i].landUsrNature,
        actualUsers: newpointers[i].actualUsers,
        unifiedLandMark: newpointers[i].unifiedLandMark,
        landIsLocated: newpointers[i].landIsLocated,
        rightHolder: newpointers[i].rightHolder,
        governmentInvestment: newpointers[i].governmentInvestment,
        color: color,
        slected: false
      }
    };
    // 外多边形坐标数组和内多边形坐标数组
    var pointers = newpointers[i].positions;
    polygonNatureLand = new AMap.Polygon(polygonOptions);
    polygonNatureLand.on("click",function(e){
      /*看数据*/
      console.log(this.getExtData())
      if(!this.getExtData().slected){
        var lanTitle = idustryParkName;
        var landArea = this.getExtData().landArea;
        var landUsrNature = this.getExtData().landUsrNature;
        var that = this;
        var unifiedLandMark = this.getExtData().unifiedLandMark;
        chooseLanId = unifiedLandMark;
        // $(".industry-menu .menu-row:last-child li:first-child").click();
        // $(".industry-menu .menu-row:last-child li:first-child").siblings().hide();
        //在地图上改变当前点击的多边形
        for(var i=0;i<polygonNatureLands.lands.length;i++){
          if(polygonNatureLands.lands[i].getExtData().slected){
            polygonNatureLands.lands[i].setOptions({
              strokeColor:defaultBorderColor,
              fillColor:polygonNatureLands.lands[i].getExtData().color,
              strokeWeight:defaultStrokeWeight
            });
            var oldExtData = polygonNatureLands.lands[i].getExtData();//先保存原始ExtData数据
            oldExtData.slected = false;//改变之前选中的状态为false
            polygonNatureLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
            break;
          }
        }
        var newExtData = this.getExtData();
        newExtData.slected = true;
        this.setOptions({strokeColor:selectedBorderColor,strokeWeight:selectedStrokeWeight});
        this.setExtData(newExtData);
        var options = {lanTitle:lanTitle,landArea:landArea,landUsrNature:landUsrNature,polygon:that};
        // landInfoWindowFn(map,options,"polygonNatureLands");
        // viewLandPanel(this.getExtData(),true)
        viewInefficientLandPanel(this.getExtData(),true)
      }
    })
    polygonNatureLand.on("mouseover",function(e){
    })
    polygonNatureLand.on("mouseout",function(e){
      // landInfoWindow.close()
    })
    // console.log(polygon)
    polygonNatureLand.setPath(pointers);
    polygonNatureLands.lands.push(polygonNatureLand);
  }
  $(".zdy-full-cover-mask").remove();
  map.setFitView();
  map.setZoom(14);
}
/*获取低效用地地块数据*/
function getInefficientLandData(unifiedLandMark,options,isInefficient) {
  $.ajax({
    url: "./jsonData/findOneByMark1.json",
    type:"GET",
    dataType:"json",
    data:{mark:unifiedLandMark},
    success:function(res){
      console.log(res);
      var inefficientData = res.low[0];
      var landData = options;
      var tpl = '<div class="land-use-purpose-scroll"><div class="land-use-purpose-box">';
      if(landData.landUsrNature != "储备用地"){
        var allLand = dataPolygonNatureLands.length > 0 ? dataPolygonNatureLands : dataPolygonUseAndNouse;
        // var allUseLand = [];
        var allUseLandArea = 0;// 所有已使用地块面积
        var otherTypeUseLandArea = 0;// 其他已使用地块面积
        var nowTypeLandNum = [];// 当前类型地块数量
        var nowTypeLandArea = 0;// 当前类型地块的所有面积
        var nowLandArea = 0;// 当前地块的面积
        var otherSingleUseLandArea = 0;// 当前类型其他面积
        if(isInefficient){
          allLand.forEach(function(v,i){
            // if(v.generalType != "储备用地"){
            // allUseLand.push(v);
            if(v.inefficient){
              allUseLandArea += Number(v.landArea);
            }
            // }
            if(v.generalType == landData.landUsrNature && v.inefficient){
              nowTypeLandNum.push(v);
              nowTypeLandArea += Number(v.landArea);
            }
          });
        }else{
          allLand.forEach(function(v,i){
            // if(v.generalType != "储备用地"){
            // allUseLand.push(v);
            allUseLandArea += Number(v.landArea);
            // }
            if(v.generalType == landData.landUsrNature){
              nowTypeLandNum.push(v);
              nowTypeLandArea += Number(v.landArea);
            }
          });
        }
        nowTypeLandNum.forEach(function(v,i){
          if(v.id == landData.id){
            nowLandArea = Number(v.landArea);
          }
        });
        allUseLandArea = (allUseLandArea/666).toFixed(2);
        nowTypeLandArea = (nowTypeLandArea/666).toFixed(2);
        nowLandArea = (nowLandArea/666).toFixed(2);
        otherTypeUseLandArea = (allUseLandArea - nowLandArea);
        otherSingleUseLandArea = (nowTypeLandArea - nowLandArea);
        var otherTypeProportion = (otherTypeUseLandArea/allUseLandArea)*100;
        var nowTypeProportion = (nowLandArea/allUseLandArea)*100;
        var otherSingleProportion = (otherSingleUseLandArea/nowTypeLandArea)*100;
        var nowSigleProportion = (nowLandArea/nowTypeLandArea)*100;
        var leftText = '';
        var rightText = '';
        if(isInefficient){
          leftText = '地块占低效总比';
          rightText = '地块占本类低效占比';
        }else{
          leftText = '所选地块占西区土地占比';
          rightText = '所选地块占本类土地占比';
        }
        tpl += `<div class="item land-use-purpose">
                        <div class="use-purpose-title"><span class="title">用途占比</span></div>
                        <div class="use-purpose-bd fl" id="land-proportion2" style="width: 50%;"></div>
                        <div class="use-purpose-bd fl" id="land-proportion" style="width: 50%;"></div>
                        <div class="use-purpose-bt">
                          <div class="item">
                          <div class="pie-name">${rightText}</div>
                            <span class="single-proportion-now">其他：${otherSingleProportion.toFixed(2)}%</span>
                            <span class="single-proportion">${landData.landUsrNature}：${nowSigleProportion.toFixed(2)}%</span>
                          </div>
                          <div class="item">
                          <div class="pie-name">${leftText}</div>
                            <span class="type-proportion-all">其他：${otherTypeProportion.toFixed(2)}%</span>
                            <span class="type-proportion-now">${landData.landUsrNature}：${nowTypeProportion.toFixed(2)}%</span>
                          </div>
                        </div>
                    </div>`;
      }
      tpl += `<div class="item land-info-con">
                    <div class="use-purpose-title"><span class="title">土地信息</span></div>
                    <div class="land-info-bd">
                        <table class="table table-bordered" id="land-basic-data">
                            <tr>
                                <td class="nowrap land-row-title">土地证号:</td><td colspan="3">${landData.landCardNumber}</td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">权利人:</td><td colspan="3">${landData.rightHolder}</td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">实测面积:</td><td colspan="3">${landData.landArea}</td>
                            </tr>
                            <!--<tr>
                                <td class="nowrap land-row-title">土地坐落:</td><td colspan="3">${landData.landIsLocated}</td>
                            </tr>-->
                            <tr>
                                <td class="nowrap land-row-title">使用全面积:</td><td colspan="3">${landData.usageArea}</td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">用地性质:</td><td colspan="3">${landData.landUsrNature}</td>
                            </tr>
                            <!--<tr>
                                <td class="nowrap land-row-title">规划用途:</td><td colspan="3">${landData.landUsrNature}</td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">实际用途:</td><td colspan="3">${landData.theRealFunction}</td>
                            </tr>-->
                            <tr>
                                <td class="nowrap land-row-title">用地单位:</td><td colspan="3"><a href="javascript:void(0)" class="land-unit-detail" data-company="${landData.actualUsers}">${landData.actualUsers ? landData.actualUsers : '未知'}</a></td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">地块政府投入:</td><td colspan="3">${landData.governmentInvestment && landData.landArea ? (Number(landData.governmentInvestment) * parseInt(options.landArea)/10000).toFixed(2) + '万元' : '未知'}</td>
                            </tr>
                        </table>
                    </div>
                </div>`;
      tpl += '</div></div>';
      // $(".land-panel-con").html(tpl);
      $(".land-panel-con").html(tpl);
      if(landData.landUsrNature != "储备用地"){
        // creatLandPropor({legendData: [landData.landUsrNature,'其他'], serverData: [{value:nowLandArea, name:landData.landUsrNature},{value:otherTypeUseLandArea, name:'其他'}
        //   ],serverData2: [{value:nowLandArea, name:landData.landUsrNature},{value:otherSingleUseLandArea, name:'其他'}
        //   ]});

        creatLandPropor({legendData: ['所选地块','其他西区用地'], serverData: [{value:nowLandArea, name:'所选地块'},{value:otherTypeUseLandArea, name:'其他西区用地'}
          ]});
        creatLandPropor2({legendData: ['所选地块',`其他${landData.landUsrNature}`],serverData: [{value:nowLandArea, name:'所选地块'},{value:otherSingleUseLandArea, name:`其他${landData.landUsrNature}`}
          ]});
      }
      $(".land-panel-con .land-use-purpose-scroll").mCustomScrollbar({
        setHeight: '100%',
        theme: "minimal-dark",
        scrollbarPosition: "inside"
      })
      /*如果有低效用地信息*/
      if(res.low[0] && inefficientData.length>0){
        var inefficientTpl = `<div class="item land-info-con">
                            <div class="use-purpose-title"><span class="title">低效土地信息</span></div>
                                <div class="land-info-bd">
                                    <table class="table table-bordered">
                                        <tbody>
                                        <tr>
                                            <td class="nowrap land-row-title">土地面积:</td><td class="two-row">${inefficientData[3]}亩</td>
                                        </tr>
                                        <!--<tr>
                                            <td class="nowrap land-row-title">已开发土地面积:</td><td>${inefficientData[4]}亩</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">未开发土地面积:</td><td class="two-row">${inefficientData[5]}亩</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">协议签订时间:</td><td>${inefficientData[7] && inefficientData[7] != '/' ? inefficientData[7] : '未知'}</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">项目总投资或固定资产:</td><td class="two-row">${inefficientData[8] && inefficientData[8] != '/' ? inefficientData[8] : '未知'}</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">协议约定建设规模（亩）:</td><td>${inefficientData[9] && inefficientData[9] != '/' ? inefficientData[9] : '未知'}</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">约定动工时间（年月日）:</td><td class="two-row">${inefficientData[10] && inefficientData[10] != '/' ? inefficientData[10] : '未知'}</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">约定竣工时间（年月日）:</td><td>${inefficientData[11] && inefficientData[11] != '/' ? inefficientData[11] : '未知'}</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">项目首期建成时间（年月日）:</td><td class="two-row">${inefficientData[12] && inefficientData[12] != '/' ? inefficientData[12] : '未知'}</td>
                                        </tr>-->
                                        <tr>
                                            <td class="nowrap land-row-title">实际建成规模（亩）:</td><td>${inefficientData[13] && inefficientData[13] != '/' ? (inefficientData[13]/666).toFixed(2) : '未知'}</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">未建成面积（亩）:</td><td class="two-row">${inefficientData[14] && inefficientData[14] != '/' ? (inefficientData[14]/666).toFixed(2) : '未知'}</td>
                                        </tr>
                                        <!--<tr>
                                            <td class="nowrap land-row-title">企业2015年年产值（万元）:</td><td>${inefficientData[15] && inefficientData[15] != '/' ? inefficientData[15] : '未知'}</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">企业2015年年销售收入（万元）:</td><td class="two-row">${inefficientData[16] && inefficientData[16] != '/' ? inefficientData[16] : '未知'}</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">是否有下一步用地需求:</td><td>${inefficientData[17] && inefficientData[17] != '/' ? inefficientData[17] : '未知'}</td>
                                        </tr>-->
                                    </tbody></table>
                                </div>
                            </div>`;
        $(".land-panel-con .land-use-purpose-box").append(inefficientTpl);
        $(".land-panel-con .land-use-purpose-scroll").mCustomScrollbar("update");
      }else{
        var inefficientTpl = `<div class="item land-info-con">
                            <div class="use-purpose-title inefficient-use-purpose-title"><span class="title">低效土地信息</span></div>
                                <div class="land-info-bd" style="background: url('./images/notData.png') center no-repeat;height: 200px;background-size: contain;">
                                    
                                </div>
                            </div>`;
        $(".land-panel-con .land-use-purpose-box").append(inefficientTpl);
        $(".land-panel-con .land-use-purpose-scroll").mCustomScrollbar("update");
      }

    },error:function(err){
      console.log(err)
    }

  })
}
/*获取低效用地土地开发率地块数据*/
function getInefficientLandData2(unifiedLandMark,options,isInefficient) {
  $.ajax({
    url: "./jsonData/findOneByMark2.json",
    type:"GET",
    dataType:"json",
    data:{mark:unifiedLandMark},
    success:function(res){
      console.log(res);
      var inefficientData = res.low[0];
      var landData = options;
      var tpl = '<div class="land-use-purpose-scroll"><div class="land-use-purpose-box">';
      if(landData.landUsrNature != "储备用地" && res.low[0] && inefficientData.length>0){

        tpl += `<div class="item land-use-purpose">
                        <div class="use-purpose-title"><span class="title">用途占比</span></div>
                        <div class="use-purpose-bd" id="land-proportion"></div>
                        <div class="use-purpose-bt">
                          <div class="item" style="width: 100%;">
                            <span class="type-proportion-all">未开发：${(Number(inefficientData[5])/Number(inefficientData[3])*100).toFixed(2)}%</span>
                            <span class="type-proportion-now">已开发：${(Number(inefficientData[4])/Number(inefficientData[3])*100).toFixed(2)}%</span>
                          </div>
                        </div>
                    </div>`;
      }
      tpl += `<div class="item land-info-con">
                    <div class="use-purpose-title"><span class="title">土地信息</span></div>
                    <div class="land-info-bd">
                        <table class="table table-bordered" id="land-basic-data">
                            <tr>
                                <td class="nowrap land-row-title">土地证号:</td><td colspan="3">${landData.landCardNumber}</td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">权利人:</td><td colspan="3">${landData.rightHolder}</td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">实测面积:</td><td colspan="3">${landData.landArea}</td>
                            </tr>
                            <!--<tr>
                                <td class="nowrap land-row-title">土地坐落:</td><td colspan="3">${landData.landIsLocated}</td>
                            </tr>-->
                            <tr>
                                <td class="nowrap land-row-title">使用全面积:</td><td colspan="3">${landData.usageArea}</td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">用地性质:</td><td colspan="3">${landData.landUsrNature}</td>
                            </tr>
                            <!--<tr>
                                <td class="nowrap land-row-title">规划用途:</td><td colspan="3">${landData.landUsrNature}</td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">实际用途:</td><td colspan="3">${landData.theRealFunction}</td>
                            </tr>-->
                            <tr>
                                <td class="nowrap land-row-title">用地单位:</td><td colspan="3"><a href="javascript:void(0)" class="land-unit-detail" data-company="${landData.actualUsers}">${landData.actualUsers ? landData.actualUsers : '未知'}</a></td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">地块政府投入:</td><td colspan="3">${landData.governmentInvestment && options.landArea ? (Number(landData.governmentInvestment) * parseInt(options.landArea)/10000).toFixed(2) + '万元' : '未知'}</td>
                            </tr>
                        </table>
                    </div>
                </div>`;
      tpl += '</div></div>';
      // $(".land-panel-con").html(tpl);
      $(".land-panel-con").html(tpl);
      $(".land-panel-con .land-use-purpose-scroll").mCustomScrollbar({
        setHeight: '100%',
        theme: "minimal-dark",
        scrollbarPosition: "inside"
      })
      /*如果有低效用地信息*/
      if(res.low[0] && inefficientData.length>0){

        if(landData.landUsrNature != "储备用地"){
          // creatLandPropor({legendData: [landData.landUsrNature,'其他'], serverData: [{value:nowLandArea, name:landData.landUsrNature},{value:otherTypeUseLandArea, name:'其他'}
          //   ],serverData2: [{value:nowLandArea, name:landData.landUsrNature},{value:otherSingleUseLandArea, name:'其他'}
          //   ]});

          creatLandPropor({legendData: ['已开发土地面积','未开发'], serverData: [{value:inefficientData[4], name:'已开发土地面积'},{value:  Number(inefficientData[3])-Number(inefficientData[4]), name:'未开发'}
            ]});
        }
        var inefficientTpl = `<div class="item land-info-con">
                            <div class="use-purpose-title"><span class="title">低效土地信息</span></div>
                                <div class="land-info-bd">
                                    <table class="table table-bordered">
                                        <tbody>
                                        <tr>
                                            <td class="nowrap land-row-title">土地面积:</td><td class="two-row">${inefficientData[3]}亩</td>
                                        </tr>
                                        <!--<tr>
                                            <td class="nowrap land-row-title">已开发土地面积:</td><td>${inefficientData[4]}亩</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">未开发土地面积:</td><td class="two-row">${inefficientData[5]}亩</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">协议签订时间:</td><td>${inefficientData[7] && inefficientData[7] != '/' ? inefficientData[7] : '未知'}</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">项目总投资或固定资产:</td><td class="two-row">${inefficientData[8] && inefficientData[8] != '/' ? inefficientData[8] : '未知'}</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">协议约定建设规模（亩）:</td><td>${inefficientData[9] && inefficientData[9] != '/' ? inefficientData[9] : '未知'}</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">约定动工时间（年月日）:</td><td class="two-row">${inefficientData[10] && inefficientData[10] != '/' ? inefficientData[10] : '未知'}</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">约定竣工时间（年月日）:</td><td>${inefficientData[11] && inefficientData[11] != '/' ? inefficientData[11] : '未知'}</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">项目首期建成时间（年月日）:</td><td class="two-row">${inefficientData[12] && inefficientData[12] != '/' ? inefficientData[12] : '未知'}</td>
                                        </tr>-->
                                        <tr>
                                            <td class="nowrap land-row-title">实际建成规模（亩）:</td><td>${inefficientData[13] && inefficientData[13] != '/' ? (inefficientData[13]/666).toFixed(2) : '未知'}</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">未建成面积（亩）:</td><td class="two-row">${inefficientData[14] && inefficientData[14] != '/' ? (inefficientData[14]/666).toFixed(2) : '未知'}</td>
                                        </tr>
                                        <!--<tr>
                                            <td class="nowrap land-row-title">企业2015年年产值（万元）:</td><td>${inefficientData[15] && inefficientData[15] != '/' ? inefficientData[15] : '未知'}</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">企业2015年年销售收入（万元）:</td><td class="two-row">${inefficientData[16] && inefficientData[16] != '/' ? inefficientData[16] : '未知'}</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">是否有下一步用地需求:</td><td>${inefficientData[17] && inefficientData[17] != '/' ? inefficientData[17] : '未知'}</td>
                                        </tr>-->
                                    </tbody></table>
                                </div>
                            </div>`;
        $(".land-panel-con .land-use-purpose-box").append(inefficientTpl);
        $(".land-panel-con .land-use-purpose-scroll").mCustomScrollbar("update");
      }else{
        var inefficientTpl = `<div class="item land-info-con">
                            <div class="use-purpose-title inefficient-use-purpose-title"><span class="title">低效土地信息</span></div>
                                <div class="land-info-bd" style="background: url('./images/notData.png') center no-repeat;height: 200px;background-size: contain;">
                                    
                                </div>
                            </div>`;
        $(".land-panel-con .land-use-purpose-box").append(inefficientTpl);
        $(".land-panel-con .land-use-purpose-scroll").mCustomScrollbar("update");
      }

    },error:function(err){
      console.log(err)
    }

  })
}
/*创建地块占比饼图*/
function creatLandPropor(options){
  var myChart = echarts.init(document.getElementById('land-proportion'));
  var legendData = options.legendData;
  var serverData = {serverData: options.serverData};
  option = {
    // color: COLORS,
    title : {
      // text: '用地性质占比',
      x:'center',
      textStyle: {
        color: '#333',
        fontSize: 16
      },
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)",
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      },
      position: ['-10%', '65%']
    },
    legend: {
      left: 'center',
      // data: ['国有企业','私营企业','外商投资企业','集体所有制企业','股份制企业'],
      data: legendData,
      textStyle: {
        color: '#333',
        fontSize: 14
      },
      // top: '10%'
    },
    series : [
      {
        name: '用地性质占比',
        type: 'pie',
        center : ['50%', '40%'],
        radius : '45%',
        /*data:[
            {value:335, name:'国有企业'},
            {value:1548, name:'私营企业'},
            {value:234, name:'外商投资企业'},
            {value:135, name:'集体所有制企业'},
            {value:154, name:'股份制企业'}
        ],*/
        data:serverData.serverData,
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: true
          }
        },
        lableLine: {
          normal: {
            show: false
          },
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  myChart.setOption(option);
}
/*创建地块占比饼图*/
function creatLandPropor2(options){
  var myChart = echarts.init(document.getElementById('land-proportion2'));
  var legendData = options.legendData;
  var serverData = {serverData: options.serverData};
  option = {
    // color: COLORS,
    title : {
      // text: '用地性质占比',
      x:'center',
      textStyle: {
        color: '#333',
        fontSize: 16
      },
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)",
      axisPointer: {
        type: 'cross',
        crossStyleL: {
          color: '#999'
        }
      },
      position: ['50%', '65%']
    },
    legend: {
      left: 'center',
      // data: ['国有企业','私营企业','外商投资企业','集体所有制企业','股份制企业'],
      data: legendData,
      textStyle: {
        color: '#333',
        fontSize: 14
      },
      // top: '10%'
    },
    series : [
      {
        name: '用地面积占比',
        type: 'pie',
        center : ['50%', '40%'],
        radius : '45%',
        /*data:[
            {value:335, name:'国有企业'},
            {value:1548, name:'私营企业'},
            {value:234, name:'外商投资企业'},
            {value:135, name:'集体所有制企业'},
            {value:154, name:'股份制企业'}
        ],*/
        data:serverData.serverData,
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: true
          }
        },
        lableLine: {
          normal: {
            show: false
          },
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  myChart.setOption(option);
}

/*公共绘制Marker标记列表*/
function creatMarkerPoint(map,options){
  loadingFullAnimat("zdy-buildfull-cover-mask","body");

  AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow'],
    function(MarkerList, SimpleMarker, SimpleInfoWindow) {

      //即jQuery/Zepto
      // var $ = MarkerList.utils.$;

      var defaultIconStyle = options.iconStyle.defaultIconStyle, //默认的图标样式
        // hoverIconStyle = 'green', //鼠标hover时的样式
        hoverIconStyle = options.iconStyle.hoverIconStyle, //鼠标hover时的样式
        selectedIconStyle = options.iconStyle.selectedIconStyle //选中时的图标样式
      ;
      var iconOffset = {
        defaultOffset:new AMap.Pixel(-20, -35),//默认的图标样式
        hoverOffset:new AMap.Pixel(-28, -50),//鼠标hover时的样式
        selectedOffset:new AMap.Pixel(-28, -50)//选中时的图标样式
      };
      var markerList = new MarkerList({
        map: map,
        //ListElement对应的父节点或者ID
        // listContainer: "myList", //document.getElementById("myList"),
        //选中后显示

        //从数据中读取位置, 返回lngLat
        getPosition: function(item) {
          // return [item.longitude, item.latitude];
          return item.position;
        },
        //数据ID，如果不提供，默认使用数组索引，即index
        getDataId: function(item, index) {

          return item.id;
        },
        getInfoWindow: function(data, context, recycledInfoWindow) {
          var tpl = '<div class="build-info-window"><%- data.name %><div>';
          //MarkerList.utils.template支持underscore语法的模板
          var content = MarkerList.utils.template(tpl, {
            data: data
          });
          if (recycledInfoWindow) {

            // recycledInfoWindow.setInfoTitle(data.name);
            // recycledInfoWindow.setInfoBody(data.address);
            recycledInfoWindow.setContent(content);

            return recycledInfoWindow;
          }

          // return new SimpleInfoWindow({
          //     /*infoTitle: data.name,
          //     infoBody: data.address,*/
          //     offset: new AMap.Pixel(0, -37),
          //     content: content
          // });
          return new AMap.InfoWindow({
            /*infoTitle: data.name,
            infoBody: data.address,*/
            offset: new AMap.Pixel(-15, -37),
            content: content
          });
        },
        //构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
        getMarker: function(data, context, recycledMarker) {

          var label = String.fromCharCode('A'.charCodeAt(0) + context.index);

          if (recycledMarker) {
            recycledMarker.setIconLabel(label);
            return;
          }

          return new SimpleMarker({
            containerClassNames: 'build-marker',
            iconStyle: defaultIconStyle,
            // iconLabel: label,
            //设置基点偏移
            offset: iconOffset.defaultOffset
          });
        },
        //构造列表元素，与getMarker类似，可以是函数，返回一个dom元素，或者模板 html string
        getListElement: function(data, context, recycledListElement) {
          // console.log(data,context,recycledListElement)
          var label = String.fromCharCode('A'.charCodeAt(0) + context.index);

          //使用模板创建
          var innerHTML = MarkerList.utils.template(
            '<div class="poi-info-left">' +
            '    <h5 class="poi-title"><span class="fa fa-building-o build-name-icon"></span>' +
            '        <%- data.name %>' +
            '    </h5>' +
            '</div>' +
            '<div class="clear"></div>', {
              data: data,
              label: label
            });

          if (recycledListElement) {
            recycledListElement.innerHTML = innerHTML;
            return recycledListElement;
          }

          return '<li class="poibox">' +
            innerHTML +
            '</li>';
        },
        //列表节点上监听的事件
        listElementEvents: ['click', 'mouseenter', 'mouseleave'],
        //marker上监听的事件
        markerEvents: ['click', 'mouseover', 'mouseout'],
        //makeSelectedEvents:false,
        selectedClassNames: 'selected',
        autoSetFitView: false
      });

      window.markerList = markerList;

      markerList.on('selectedChanged', function(event, info) {
        // $("#myList").hide();
        map.setZoom(14);

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

      markerList.on('listElementMouseenter markerMouseover', function(event, record) {

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

      markerList.on('listElementMouseleave markerMouseout', function(event, record) {

        if (record && record.marker) {

          if (!this.isSelectedDataId(record.id)) {
            //恢复默认样式
            record.marker.setIconStyle(defaultIconStyle);
            record.marker.setOffset(iconOffset.defaultOffset);
          }
        }
      });

      //数据输出完成
      markerList.on('renderComplete', function(event, records) {
        $(".zdy-buildfull-cover-mask").remove();
        map.setFitView();

      });
      //渲染数据
      markerList.render(options.result);
      function forcusMarker(marker) {
        marker.setTop(true);
        // map.panBy(-580,40);
        //不在地图视野内
        if (!(map.getBounds().contains(marker.getPosition()))) {

          //移动到中心
          // map.setCenter(marker.getPosition());
        }
      }

      function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();

        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
          rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
      }

      function scrollListElementIntoView($listEle) {

        if (!isElementInViewport($listEle.get(0))) {
          $('#panel').scrollTop($listEle.offset().top - $listEle.parent().offset().top);
        }

        //闪动一下
        $listEle
          .one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
            function(e) {
              $(this).removeClass('flash animated');
            }).addClass('flash animated');
      }


    });
}
/*初始化上方*/
/*按分类分步获取园区经济梯度地块信息---产业高质量企业*/
function creatHighEnterpriseLandStep(map,time,type,callback){
  var pointsArr=[];
  var choosePointsArr=[];
  var needPointsArr=[];
  $.ajax({
    url: "./jsonData/findCompanyByEnterpriseType"+type+".json",
    type:"GET",
    dataType:"json",
    data:{revenueTime:time,enterpriseType:type},
    success:function(res){
      // console.log(res)
      for(var i=0;i<res.length;i++){
        // pointsArr.push(res[i].points);
        var point_x_y = [];
        var pointItem = {id:"",position:"",enterpriseType:"",landArea:"",landUsrNature:""};
        for(var j=0;j<res[i].points.length;j++){
          point_x_y.push([res[i].points[j].point_80_x,res[i].points[j].point_80_y]);
        }
        pointItem.id = res[i].id;
        pointItem.unifiedLandMark = res[i].unifiedLandMark;
        pointItem.rightHolder = res[i].rightHolder;
        pointItem.landIsLocated = res[i].landIsLocated;
        pointItem.enterpriseType = res[i].enterpriseType;
        pointItem.ecoLv = 1;
        pointItem.actualUsers = res[i].actualUsers;
        pointItem.pricepermeter = res[i].pricepermeter;
        pointItem.operatingIncome = res[i].operatingIncome;
        pointItem.landCardNumber = res[i].landCardNumber;
        /*按性质分类*/
        pointItem.generalType = res[i].generalType;
        /*实测面积*/
        pointItem.landArea = res[i].landArea;
        /*使用全面积*/
        pointItem.usageArea = res[i].usageArea;
        pointItem.landUsrNature = res[i].landUsrNature;
        pointItem.positions = point_x_y;
        pointItem.companyId = res[i].companyId;
        pointItem.companyIcon = res[i].companyIcon;
        pointItem.inefficient = res[i].inefficient;
        pointsArr.push(pointItem);
      }
      if(callback){callback(pointsArr)}

    },
    error:function(err){
      console.log(err)
    }
  })

}
/*将分类分步获取园区经济梯度地块信息组装绘图---产业高质量企业*/
function groupHighEnterpriseLandStep(map,options,time){
  $.ajax({
    url: "/v1/highQualityEvaluation/companyHighQualityTop10Proportion",
    type:"GET",
    dataType:"json",
    data:{year: time,companyIndustryType: '生物医药'},
    success:function(res){
      // console.log(11,res);
      var tpl = `<div class="text-c">
                    <div id="top10-proportion" style="width:100%;height: 200px;"></div>
                </div>`;
      $(".right-top-land-infowindow .title").html('高质量企业概况')
      $(".right-top-land-infowindow .icon-ctrl-scroll-con").html(tpl);

      creatHighEnterpriseTop10Proportion({},'前10名营业收入',res);
      if(HighQualityListData.length > 0){
        var lists = [];
        HighQualityListData.forEach(function(v,i){
          if(v.year == time && v.companyIndustryType == '生物医药'){
            lists.push(v);
          }
        });
        var tpl = ``;
        var listTpl = ``;
        lists.forEach(function (v,i) {
          listTpl += `<div class="land-company-item company-item flex" data-company="${v.companyName}">
                            <div class="logo">
                                ${i+1}
                            </div>
                            <div class="item name flex-cell"><div class="top-label">${v.companyName}</div></div>
                            <div class="jingji"><div class="top-label">${Number(v.highQuality.toFixed(2))}</div></div>
                        </div>`
        });
        tpl += `<div class="high-enterprise-company-bd">
                    <div class="company-con">
                        <div class="public-title"><span class="title">企业列表</span></div>
                        <div class="company-list high-enterprise-list-box">
                            ${listTpl}
                        </div>
                    </div>
                </div>`;
        $(".right-top-land-infowindow .icon-ctrl-scroll-con").append(tpl)
      }else{
        $.ajax({
          url: "./jsonData/companyHighQuality2.json",
          type:"GET",
          dataType:"json",
          data:{},
          success:function(res){
            // console.log(11,res);
            HighQualityListData = res;
            var lists = [];
            res.forEach(function(v,i){
              if(v.year == time && v.companyIndustryType == '生物医药'){
                lists.push(v);
              }
            });
            var tpl = ``;
            var listTpl = ``;
            lists.forEach(function (v,i) {
              listTpl += `<div class="land-company-item company-item flex" data-company="${v.companyName}">
                            <div class="logo">
                                ${i+1}
                            </div>
                            <div class="item name flex-cell"><div class="top-label">${v.companyName}</div></div>
                            <div class="jingji"><div class="top-label">${Number(v.highQuality.toFixed(2))}</div></div>
                        </div>`
            });
            tpl += `<div class="high-enterprise-company-bd">
                    <div class="company-con">
                        <div class="public-title"><span class="title">企业列表</span></div>
                        <div class="company-list high-enterprise-list-box">
                            ${listTpl}
                        </div>
                    </div>
                </div>`;
            $(".right-top-land-infowindow .icon-ctrl-scroll-con").append(tpl)
          }
        })

      }
    }
  });
  /*切换时间、初次加载默认绘制生物医药*/
  $(".living-land").addClass("active").parent().siblings().find(".color-blank").removeClass("active");
  /*判断内存里是否已存在所有地块数据*/
  /*if(dataPolygonAlls.length > 0){
    var allOptions = $.extend([],dataPolygonAlls,true);
    for (var i = 0; i < options.length; i++) {
      for (var j = 0; j < allOptions.length; j++) {
        if (options[i].unifiedLandMark == allOptions[j].unifiedLandMark) {
          allOptions.splice(j, 1);
          break;
        }
      }
    }
    dataPolygonHighEnterpriseLands = allOptions.concat(options);
    // localStorage.setItem('dataPolygonHighEnterpriseLands', JSON.stringify(dataPolygonHighEnterpriseLands));

    var indexedDBdata = {type: 'dataPolygonHighEnterpriseLands', data: dataPolygonHighEnterpriseLands};
    indexeDBmethod.add('landData',indexedDBdata);
    creatElectronLivingCateLandSingleAgain(map,'生物医药',time,dataPolygonHighEnterpriseLands);
  }else{*/
    /*去除所有地块里含有经济等级的地块*/
    getParkAllPoints(map,function(allLandOptions) {
      var allOptions = $.extend([],allLandOptions,true);
      for (var i = 0; i < options.length; i++) {
        for (var j = 0; j < allOptions.length; j++) {
          if (options[i].unifiedLandMark == allOptions[j].unifiedLandMark) {
            allOptions.splice(j, 1);
            break;
          }
        }
      }
      dataPolygonHighEnterpriseLands = allOptions.concat(options);
      // localStorage.setItem('dataPolygonHighEnterpriseLands', JSON.stringify(dataPolygonHighEnterpriseLands));

      var indexedDBdata = {type: 'dataPolygonHighEnterpriseLands', data: dataPolygonHighEnterpriseLands};
      indexeDBmethod.add('landData',indexedDBdata);
      creatElectronLivingCateLandSingleAgain(map,'生物医药',time,dataPolygonHighEnterpriseLands);
    })
  // }
}
/*将分类分步获取园区经济梯度地块信息组装绘图---产业高质量企业规上绘制*/
function groupHighEnterpriseScaleUpLandStep(map,options,time,type){
    /*去除所有地块里含有经济等级的地块*/
    getParkAllPoints(map,function(allLandOptions) {
      var allOptions = $.extend([],allLandOptions,true);
      for (var i = 0; i < options.length; i++) {
        for (var j = 0; j < allOptions.length; j++) {
          if (options[i].unifiedLandMark == allOptions[j].unifiedLandMark) {
            allOptions.splice(j, 1);
            break;
          }
        }
      }
      dataPolygonHighEnterpriseLands = allOptions.concat(options);
      // localStorage.setItem('dataPolygonHighEnterpriseLands', JSON.stringify(dataPolygonHighEnterpriseLands));

      var indexedDBdata = {type: 'dataPolygonHighEnterpriseLands', data: dataPolygonHighEnterpriseLands};
      indexeDBmethod.add('landData',indexedDBdata);
      var scaleEnterpriseLands = dataPolygonHighEnterpriseLands;
      scaleEnterpriseAllData[type].forEach(function(v,i){
        scaleEnterpriseLands.forEach(function(value,index){
          if(v.landBlockId == value.id || value.actualUsers == v.companyName){
            /*将企业信息添加到地块数据*/
            value.companyName = v.companyName;
            value.companyId = v.id;
          }
        })
      });
      creatScaleEnterpriseLandSingleAgain(map,type,time,scaleEnterpriseLands);
    })
}
/*产业地块信息面板控制*/
function viewIndustryLandPanel(options){
  /*关闭楼宇marker的名字信息框*/
  if("markerList" in window &&  markerList.getData().length > 0 && markerList.getInfoWindow()){
    markerList.getInfoWindow().close();
  }

  $(".microcosmic_container").show().removeClass("slideOutRight").addClass("slideInRight");
  $(".land-company-detail-box").hide().removeClass("slideInRight").addClass("slideOutRight");
  $(".right-top-land-infowindow").hide().removeClass("slideInRight").addClass("slideOutRight");
  $(".industry-land-infowindow").hide().removeClass("slideInRight").addClass("slideOutRight");
  $(".industry-company-list-panel").hide().removeClass("slideInRight").addClass("slideOutRight");
  $(".back-arrow-btn").removeClass("active");
  if(options.isIndustryLand){
    $(".time-colors-panel").css({right:"580px"});
    // $(".industry-breakdown-color-panel").css({right:"820px"});

  }else{
    $(".time-colors-panel").css({right:"10px"});
    // $(".industry-breakdown-color-panel").css({right:"270px"});
  }

  $(".land-company-detail-box").hide();
  if(options.enterpriseType){
    // var landData = options;
    /*避免赋值改变传参的数据*/
    var landData = $.extend(true, {}, options);
    landData.landCardNumber = (options.landCardNumber == null || options.landCardNumber == " ") ? "未知" : options.landCardNumber;
    landData.rightHolder = (options.rightHolder == null || options.rightHolder == " ") ? "未知" : options.rightHolder;
    landData.landArea = (options.landArea == null || options.landArea == " ") ? "未知" : (options.landArea/666).toFixed(2) + "亩";
    landData.landIsLocated = (options.landIsLocated == null || options.landIsLocated == " ") ? "未知" : options.landIsLocated;
    landData.usageArea = (options.usageArea == null || options.usageArea == " ") ? "未知" : (options.usageArea/666).toFixed(2) + "亩";
    /*如果有性质分类使用性质分类用途*/
    landData.landUsrNature = options.generalType ? options.generalType : (options.landUsrNature == null || options.landUsrNature == " ") ? "未知" : options.landUsrNature;
    var tpl = '';
    var listTpl = '';
    if(landData.enterpriseType){
      if(landData.enterpriseType == '生物医药'){
        var companyList = dataPolygonEcoCateLands.living.sort(compareFn('pricepermeter','desc'));
      }else if(landData.enterpriseType == '电子信息'){
        var companyList = dataPolygonEcoCateLands.electron.sort(compareFn('pricepermeter','desc'));
      }else if(landData.enterpriseType == '先进制造'){
        var companyList = dataPolygonEcoCateLands.make.sort(compareFn('pricepermeter','desc'));
      }
      if(companyList.length > 0){
        companyList.forEach(function(v,i){
          listTpl += `<div class="land-company-item company-item flex" data-company="${v.actualUsers}">
                            <div class="logo">
                                <img src="${v.companyIcon ? v.companyIcon : './images/company_list_logo.png'}" class="">
                            </div>
                            <div class="item name flex-cell"><div class="top-label">${v.actualUsers}</div><div class="bot-label">${v.landIsLocated}</div></div>
                            <div class="item shouru flex-cell"><div class="top-label">${Number(v.operatingIncome).toFixed(2)}</div><div class="bot-label">营业收入(万元)</div></div>
                            <div class="jingji flex-cell"><div class="top-label">${Number(v.pricepermeter).toFixed(2)}</div><div class="bot-label">地块每平米<br/>营收价值(万元)</div></div>
                        </div>`;
        });
      }
      /*tpl += `<div class="flex">
          <div class="flex-cell">
          <div class="land-info">
            <div class="land-industry-name">${landData.enterpriseType}</div>
            <div class="land-company-con" style="height: 200px;overflow: hidden">
              <div class="land-company-list">${listTpl}</div>
            </div>
            <div class="land-info-bot">
              <div>所属企业</div>
              <div>${landData.actualUsers}</div>
            </div>
          </div>
      </div>
      </div>`;*/
      tpl += `<div class="industry-company-list">
            <div class="industry-company-hd">
                <div class="time-item active" data-time="2017" data-type="${landData.enterpriseType}">2017</div>
                <div class="time-item" data-time="2016" data-type="${landData.enterpriseType}">2016</div>
                <div class="time-item" data-time="2015" data-type="${landData.enterpriseType}">2015</div>
            </div>
            <div class="industry-company-bd">
                <div class="own-company">
                    <span class="logo"><img src="${landData.companyIcon ? landData.companyIcon : '../images/company_list_logo.png'}" class=""></span><span class="name" data-company="${landData.actualUsers}">${landData.actualUsers}</span><span class="name-label fr">所属企业</span>
                </div>
                <div class="company-con">
                    <div class="public-title"><span class="title">${landData.enterpriseType}</span></div>
                    <div class="land-company-list-box">
                        <div class="company-list land-company-list">
                            <div class="company-list land-company-scroll-con">
                                ${listTpl}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="company-bot">
                    <span class="page-item preve-page"></span>
                    <span class="page-item next-page active"></span>
                </div>
            </div>
        </div>`;

      $(".land-panel-con").html(tpl);

      $(".industry-company-list .land-company-list").mCustomScrollbar({
        setHeight: '100%',
        theme: "minimal-dark",
        scrollbarPosition: "inside"
      });
    }
  }
}
/*地块信息面板控制*/
function viewLandPanel(options,isInefficient){
  $(".microcosmic_container").show().removeClass("slideOutRight").addClass("slideInRight");
  $(".land-company-detail-box").hide().removeClass("slideInRight").addClass("slideOutRight");
  $(".right-top-land-infowindow").hide().removeClass("slideInRight").addClass("slideOutRight");
  $(".back-arrow-btn").removeClass("active");
  $(".time-colors-panel").css({right:"580px"});
  // $(".land-panel").show().removeClass("slideOutRight").addClass("slideInRight");
  // var landData = options;
  /*避免赋值改变传参的数据*/
  var landData = $.extend(true, {}, options);
  landData.landCardNumber = (options.landCardNumber == null || options.landCardNumber == " ") ? "未知" : options.landCardNumber;
  landData.rightHolder = (options.rightHolder == null || options.rightHolder == " ") ? "未知" : options.rightHolder;
  landData.landArea = (options.landArea == null || options.landArea == " ") ? "未知" : (options.landArea/666).toFixed(2) + "亩";
  landData.landIsLocated = (options.landIsLocated == null || options.landIsLocated == " ") ? "未知" : options.landIsLocated;
  landData.usageArea = (options.usageArea == null || options.usageArea == " ") ? "未知" : (options.usageArea/666).toFixed(2) + "亩";
  /*实际用途*/
  landData.theRealFunction = (options.theRealFunction == null || options.theRealFunction == " ") ? "未知" : options.theRealFunction;
  /*如果有性质分类使用性质分类用途*/
  landData.landUsrNature = options.generalType ? options.generalType : (options.landUsrNature == null || options.landUsrNature == " ") ? "未知" : options.landUsrNature;
  /*判断是否低效用地*/
  if(options.inefficient){
    getInefficientLandData(landData.unifiedLandMark,landData,isInefficient);
  }else{

    var tpl = '<div class="land-use-purpose-scroll"><div class="land-use-purpose-box">';
    if(landData.landUsrNature != "储备用地"){
      var allLand = dataPolygonNatureLands.length > 0 ? dataPolygonNatureLands : dataPolygonUseAndNouse;
      // var allUseLand = [];
      var allUseLandArea = 0;// 所有已使用地块面积
      var otherTypeUseLandArea = 0;// 其他已使用地块面积
      var nowTypeLandNum = [];// 当前类型地块数量
      var nowTypeLandArea = 0;// 当前类型地块的所有面积
      var nowLandArea = 0;// 当前地块的面积
      var otherSingleUseLandArea = 0;// 当前类型其他面积
      if(isInefficient){
        allLand.forEach(function(v,i){
          // if(v.generalType != "储备用地"){
          // allUseLand.push(v);
          if(v.inefficient){
            allUseLandArea += Number(v.landArea);
          }
          // }
          if(v.generalType == landData.landUsrNature && v.inefficient){
            nowTypeLandNum.push(v);
            nowTypeLandArea += Number(v.landArea);
          }
        });
      }else{
        allLand.forEach(function(v,i){
          // if(v.generalType != "储备用地"){
          // allUseLand.push(v);
          allUseLandArea += Number(v.landArea);
          // }
          if(v.generalType == landData.landUsrNature){
            nowTypeLandNum.push(v);
            nowTypeLandArea += Number(v.landArea);
          }
        });
      }
      /*避免点击的地块不是低效用地，导致该类型地块无数据*/
      if(nowTypeLandNum.length > 0){
        nowTypeLandNum.forEach(function(v,i){
          if(v.id == landData.id){
            nowLandArea = Number(v.landArea);
          }
        });
      }else{
        nowLandArea = 0;
        nowTypeLandArea = 0;
      }
      allUseLandArea = (allUseLandArea/666).toFixed(2);
      nowTypeLandArea = (nowTypeLandArea/666).toFixed(2);
      nowLandArea = (nowLandArea/666).toFixed(2);
      otherTypeUseLandArea = (allUseLandArea - nowLandArea);
      otherSingleUseLandArea = (nowTypeLandArea - nowLandArea);
      var otherTypeProportion = (otherTypeUseLandArea/allUseLandArea)*100;
      var nowTypeProportion = (nowLandArea/allUseLandArea)*100;
      var otherSingleProportion = (otherSingleUseLandArea/nowTypeLandArea)*100;
      var nowSigleProportion = (nowLandArea/nowTypeLandArea)*100;
      var leftText = '';
      var rightText = '';
      if(isInefficient){
        leftText = '地块占低效总比';
        rightText = '地块占本类低效占比';
      }else{
        leftText = '所选地块占西区土地占比';
        rightText = '所选地块占本类土地占比';
      }
      tpl += `<div class="item land-use-purpose">
                        <div class="use-purpose-title"><span class="title">用途占比</span></div>
                        <div class="use-purpose-bd fl" id="land-proportion2" style="width: 50%"></div>
                        <div class="use-purpose-bd fl" id="land-proportion" style="width: 50%"></div>
                        <div class="use-purpose-bt">
                          <div class="item">
                          <div class="pie-name">${rightText}</div>
                            <span class="single-proportion-now">其他${landData.landUsrNature}：${otherSingleProportion.toFixed(2)}%</span>
                            <span class="single-proportion">所选地块：${nowSigleProportion.toFixed(2)}%</span>
                          </div>
                          <div class="item">
                          <div class="pie-name">${leftText}</div>
                            <span class="type-proportion-all">其他西区用地：${otherTypeProportion.toFixed(2)}%</span>
                            <span class="type-proportion-now">所选地块：${nowTypeProportion.toFixed(2)}%</span>
                          </div>
                        </div>
                    </div>`;
    }
    tpl += `<div class="item land-info-con">
                    <div class="use-purpose-title"><span class="title">土地信息</span></div>
                    <div class="land-info-bd">
                        <table class="table table-bordered" id="land-basic-data">
                            <tr>
                                <td class="nowrap land-row-title">土地证号:</td><td colspan="3">${landData.landCardNumber}</td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">权利人:</td><td colspan="3">${landData.rightHolder}</td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">实测面积:</td><td colspan="3">${landData.landArea}</td>
                            </tr>
                            <!--<tr>
                                <td class="nowrap land-row-title">土地坐落:</td><td colspan="3">${landData.landIsLocated}</td>
                            </tr>-->
                            <tr>
                                <td class="nowrap land-row-title">使用全面积:</td><td colspan="3">${landData.usageArea}</td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">用地性质:</td><td colspan="3">${landData.landUsrNature}</td>
                            </tr>
                            <!--<tr>
                                <td class="nowrap land-row-title">规划用途:</td><td colspan="3">${landData.landUsrNature}</td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">实际用途:</td><td colspan="3">${landData.theRealFunction}</td>
                            </tr>-->
                            <tr>
                                <td class="nowrap land-row-title">用地单位:</td><td colspan="3"><a href="javascript:void(0)" class="land-unit-detail" data-company="${landData.actualUsers}">${landData.actualUsers ? landData.actualUsers : "未知"}</a></td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">地块政府投入:</td><td colspan="3">${landData.governmentInvestment && options.landArea ? (Number(landData.governmentInvestment) * parseInt(options.landArea)/10000).toFixed(2) + '万元' : '未知'}</td>
                            </tr>
                        </table>
                    </div>
                </div>`;
    tpl += '</div></div>';
    // $(".land-panel-con").html(tpl);
    $(".land-panel-con").html(tpl);
    if(landData.landUsrNature != "储备用地"){
      // creatLandPropor({legendData: [landData.landUsrNature,'其他'], serverData: [{value:nowLandArea, name:landData.landUsrNature},{value:otherTypeUseLandArea, name:'其他'}
      //   ],serverData2: [{value:nowLandArea, name:landData.landUsrNature},{value:otherSingleUseLandArea, name:'其他'}
      //   ]});
      creatLandPropor({legendData: ['所选地块','其他西区用地'], serverData: [{value:nowLandArea, name:'所选地块'},{value:otherTypeUseLandArea, name:'其他西区用地'}
        ]});
      creatLandPropor2({legendData: ['所选地块',`其他${landData.landUsrNature}`],serverData: [{value:nowLandArea, name:'所选地块'},{value:otherSingleUseLandArea, name:`其他${landData.landUsrNature}`}
        ]});
    }
    $(".land-panel-con .land-use-purpose-scroll").mCustomScrollbar({
      setHeight: '100%',
      theme: "minimal-dark",
      scrollbarPosition: "inside"
    })
  }
}
/*低效用地地块信息面板控制*/
function viewInefficientLandPanel(options,isInefficient){
  $(".microcosmic_container").show().removeClass("slideOutRight").addClass("slideInRight");
  $(".land-company-detail-box").hide().removeClass("slideInRight").addClass("slideOutRight");
  $(".right-top-land-infowindow").hide().removeClass("slideInRight").addClass("slideOutRight");
  $(".back-arrow-btn").removeClass("active");
  $(".time-colors-panel").css({right:"580px"});
  // $(".land-panel").show().removeClass("slideOutRight").addClass("slideInRight");
  // var landData = options;
  /*避免赋值改变传参的数据*/
  var landData = $.extend(true, {}, options);
  landData.landCardNumber = (options.landCardNumber == null || options.landCardNumber == " ") ? "未知" : options.landCardNumber;
  landData.rightHolder = (options.rightHolder == null || options.rightHolder == " ") ? "未知" : options.rightHolder;
  landData.landArea = (options.landArea == null || options.landArea == " ") ? "未知" : (options.landArea/666).toFixed(2) + "亩";
  landData.landIsLocated = (options.landIsLocated == null || options.landIsLocated == " ") ? "未知" : options.landIsLocated;
  landData.usageArea = (options.usageArea == null || options.usageArea == " ") ? "未知" : (options.usageArea/666).toFixed(2) + "亩";
  /*实际用途*/
  landData.theRealFunction = (options.theRealFunction == null || options.theRealFunction == " ") ? "未知" : options.theRealFunction;
  /*如果有性质分类使用性质分类用途*/
  landData.landUsrNature = options.generalType ? options.generalType : (options.landUsrNature == null || options.landUsrNature == " ") ? "未知" : options.landUsrNature;
  /*判断是否低效用地*/
  if(options.inefficient){
    getInefficientLandData2(landData.unifiedLandMark,landData,isInefficient);
  }else{

    var tpl = '<div class="land-use-purpose-scroll"><div class="land-use-purpose-box">';
    if(landData.landUsrNature != "储备用地"){
    }
    tpl += `<div class="item land-info-con">
                    <div class="use-purpose-title"><span class="title">土地信息</span></div>
                    <div class="land-info-bd">
                        <table class="table table-bordered" id="land-basic-data">
                            <tr>
                                <td class="nowrap land-row-title">土地证号:</td><td colspan="3">${landData.landCardNumber}</td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">权利人:</td><td colspan="3">${landData.rightHolder}</td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">实测面积:</td><td colspan="3">${landData.landArea}</td>
                            </tr>
                            <!--<tr>
                                <td class="nowrap land-row-title">土地坐落:</td><td colspan="3">${landData.landIsLocated}</td>
                            </tr>-->
                            <tr>
                                <td class="nowrap land-row-title">使用全面积:</td><td colspan="3">${landData.usageArea}</td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">用地性质:</td><td colspan="3">${landData.landUsrNature}</td>
                            </tr>
                            <!--<tr>
                                <td class="nowrap land-row-title">规划用途:</td><td colspan="3">${landData.landUsrNature}</td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">实际用途:</td><td colspan="3">${landData.theRealFunction}</td>
                            </tr>-->
                            <tr>
                                <td class="nowrap land-row-title">用地单位:</td><td colspan="3"><a href="javascript:void(0)" class="land-unit-detail" data-company="${landData.actualUsers}">${landData.actualUsers ? landData.actualUsers : "未知"}</a></td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">地块政府投入:</td><td colspan="3">${landData.governmentInvestment && options.landArea ? (Number(landData.governmentInvestment) * parseInt(options.landArea)/10000).toFixed(2) + '万元' : '未知'}</td>
                            </tr>
                        </table>
                    </div>
                </div>`;
    tpl += '</div></div>';
    // $(".land-panel-con").html(tpl);
    $(".land-panel-con").html(tpl);
    $(".land-panel-con .land-use-purpose-scroll").mCustomScrollbar({
      setHeight: '100%',
      theme: "minimal-dark",
      scrollbarPosition: "inside"
    })
  }
}
/*地块信息面板与菜单面板切换*/
function switchMenuLandPanle(){
  $(".land-back-arrow-btn").removeClass("active")
  // $(".land-panel").hide();
  $(".pop-box").hide();
  $(".microcosmic_container").show();
}
/*start*/
/*高质量企业信息面板*/
function viewHighEnterpriseLandPanel(options){
  var companyId = options.companyId,
    company = options.actualUsers,
    enterpriseType = options.enterpriseType,
    isIndustryLand = options.isIndustryLand;
  /*判断是否点击空地块*/
  if(isIndustryLand){
    $(".microcosmic_container").show().removeClass("slideOutRight").addClass("slideInRight");
    $(".land-company-detail-box").hide().removeClass("slideInRight").addClass("slideOutRight");
    $(".right-top-land-infowindow").hide().removeClass("slideInRight").addClass("slideOutRight");
    $(".back-arrow-btn").removeClass("active");
    $(".time-colors-panel").css({right:"580px"});
    // $(".industry-last-colors-panel").css({right:"880px"});
    /*var tpl = `<div class="item high-enterprise-radar">
                        <div class="public-title">
                            <span class="title">高质量情况</span>
                            <div class="high-enterprise-own fr"><span class="high-enterprise-own-name" data-company="${company}">${company}</span><span class="high-enterprise-own-label">所属企业</span></div></div>
                        <div class="radar-bd" id="radar-bd"></div>
                    </div>
                    <div class="item high-enterprise-company-bd">
                        <div class="company-con">
                            <div class="public-title"><span class="title">企业列表</span></div>
                            <div class="company-list high-enterprise-list-box">
                                <div class="company-list high-enterprise-list">

                                </div>
                            </div>
                        </div>
                        <div class="company-bot">
                            <span class="page-item preve-page"></span>
                            <span class="page-item next-page active"></span>
                        </div>
                    </div>`;*/
    var tpl = `<div class="item high-enterprise-radar">
                        <div class="public-title">
                            <span class="title">高质量情况</span>
                            <span class="rank-num">${options.rankNum}</span>
                            <div class="high-enterprise-own fr"><span class="high-enterprise-own-name" data-company="${company}">${company}</span><span class="high-enterprise-own-label">所属企业</span></div></div>
                        <div class="radar-bd" id="radar-bd"></div>
                        <div class="radar-bt">
                            
                        </div>
                    </div>`;
    $(".land-panel-con").html(tpl);
    /*获取综合评分*/
    $.ajax({
      url: "/v1/highQualityEvaluation/highQuality",
      type:"GET",
      dataType:"json",
      data:{companyId: companyId},
      success:function(res){
        creatHighQualityRadarEcharts(res);
      }
    });
    /*获取产业排名*/
    /*var revenueTime = $(".datetimepicker-top-box input").val();
    $.ajax({
      url: '/v1/land/findCompanyTop10ByOperatingIncome',
      type: "GET",
      dataType: "json",
      data: {
        revenueTime: revenueTime,
        enterpriseType: enterpriseType
      },
      success: function (res) {
        console.log(res)
        var tpl = ``;
        res.forEach(function(v,i){
          tpl += `<div class="land-company-item company-item flex" data-company="${v.name}">
                            <div class="logo">
                                <img src="${v.companyIcon ? v.companyIcon : '../images/company_list_logo.png'}" class="">
                            </div>
                            <div class="item name flex-cell"><div class="top-label">${v.name}</div><div class="bot-label">${v.landIsLocated}</div></div>
                            <div class="item shouru flex-cell"><div class="top-label">${Number(v.operatingIncome).toFixed(2)}</div><div class="bot-label">营业收入(万元)</div></div>
                            <div class="jingji flex-cell"><div class="top-label">${Number(v.pricepermeter).toFixed(2)}</div><div class="bot-label">地块每平米营收价值(万元)</div></div>
                        </div>`;
        });
        $(".high-enterprise-list").html(tpl);
        $(".high-enterprise-company-bd .high-enterprise-list").mCustomScrollbar({
          setHeight: '100%',
          theme: "minimal-dark",
          scrollbarPosition: "inside"
        });
      },
      error: function (err) {
        console.log(err)
      }
    });*/

  }else{
    $(".microcosmic_container").hide().removeClass("slideInRight").addClass("slideOutRight");
    $(".right-top-land-infowindow").hide().removeClass("slideInRight").addClass("slideOutRight");
    $(".time-colors-panel").css({right:"10px"});
    // $(".industry-last-colors-panel").css({right:"310px"});
  }
}
/*产业分布楼宇信息面板*/
function viewIndustryBuildPanel(options){
  $(".microcosmic_container").show().removeClass("slideOutRight").addClass("slideInRight");
  $(".right-top-land-infowindow").hide().removeClass("slideInRight").addClass("slideOutRight");
  $(".industry-land-infowindow").hide().removeClass("slideInRight").addClass("slideOutRight");
  $(".land-company-detail-box").hide().removeClass("slideInRight").addClass("slideOutRight");
  $(".back-arrow-btn").removeClass("active");
  $(".time-colors-panel").css({right:"580px"});
  // $(".industry-breakdown-color-panel").css({right:"700px"});


  var tpl = '<div class="build-info-window">' +
    '<div class="info-item"><span class="info-label">名称:</span><%- data.name %></div>' +
    '<div class="info-item"><span class="info-label">地址:</span><%- data.floorAddress ? data.floorAddress : "未知" %></div>' +
    '<div class="info-item"><span class="info-label">楼宇性质:</span><%- data.floorNature ? data.floorNature : "未知" %></div>' +
    '<div class="info-item"><span class="info-label">总建面积:</span><%- data.totalArea && data.totalArea != "/" ? data.totalArea : "未知" %></div>' +
    '<div class="info-item"><span class="info-label">写字楼面积:</span><%- data.officeFloorArea && data.officeFloorArea != "/" ? data.officeFloorArea : "未知" %></div>' +
    '<div class="info-item"><span class="info-label">商铺面积:</span><%- data.shopArea && data.shopArea != "/" ? data.shopArea : "未知" %></div>' +
    '<div class="info-item"><span class="info-label">酒店面积:</span><%- data.hotelArea && data.hotelArea != "/" ? data.hotelArea : "未知" %></div>' +
    '<div class="info-item"><span class="info-label">住宅面积:</span><%- data.residentialArea && data.residentialArea != "/" ? data.residentialArea : "未知" %></div>' +
    '<div class="info-item"><span class="info-label">地下停车场面积:</span><%- data.parkingArea && data.parkingArea != "/" ? data.parkingArea : "未知" %></div>' +
    '<div class="info-item"><span class="info-label">栋数:</span><%- data.floorTotal ? data.floorTotal : "未知" %></div>' +
    '<div class="info-item"><span class="info-label">入住率:</span><%- data.occupancyRate ? Number(data.occupancyRate).toFixed(2) : "未知" %></div>' +
    '<div>';

  var buildInfo = $.extend({},options);
  buildInfo.floorAddress ? buildInfo.floorAddress : "未知";
  buildInfo.floorNature ? buildInfo.floorNature : "未知";
  buildInfo.totalArea && buildInfo.totalArea != "/" ? buildInfo.totalArea : "未知";
  buildInfo.officeFloorArea && buildInfo.officeFloorArea != "/" ? buildInfo.officeFloorArea : "未知";
  buildInfo.shopArea && buildInfo.shopArea != "/" ? buildInfo.shopArea : "未知";
  buildInfo.hotelArea && buildInfo.hotelArea != "/" ? buildInfo.hotelArea : "未知";
  buildInfo.residentialArea && buildInfo.residentialArea != "/" ? buildInfo.residentialArea : "未知";
  buildInfo.parkingArea && buildInfo.parkingArea != "/" ? buildInfo.parkingArea : "未知";
  buildInfo.floorTotal ? buildInfo.floorTotal : "未知";
  buildInfo.occupancyRate ? buildInfo.occupancyRate : "未知";
  var tpl = `<div class="industry-build-con">
            <div class="build-con-hd">
                <div class="logo"><img src="./images/build_logo.png" alt=""></div>
                <div class="name">${buildInfo.name}</div>
            </div>
            <div class="build-con-bd">
                <div class="build-address"><span class="address-icon"></span>${buildInfo.floorAddress ? buildInfo.floorAddress : '未知'}</div>
                <div class="build-info-box">
                    <div class="build-info">
                        <table>
                            <tr class="build-info-item">
                                <td class="build-label">名称：</td><td class="build-data">${buildInfo.name}</td>
                            </tr>
                            <tr class="build-info-item">
                                <td class="build-label">地址：</td><td class="build-data">${buildInfo.floorAddress ? buildInfo.floorAddress : '未知'}</td>
                            </tr>
                            <tr class="build-info-item">
                                <td class="build-label">楼宇性质：</td><td class="build-data">${buildInfo.floorNature ? buildInfo.floorNature : '未知'}</td>
                            </tr>
                            <tr class="build-info-item">
                                <td class="build-label">总建面积：</td><td class="build-data">${buildInfo.totalArea ? buildInfo.totalArea : '未知'}</td>
                            </tr>
                            <tr class="build-info-item">
                                <td class="build-label">写字楼面积：</td><td class="build-data">${buildInfo.officeFloorArea ? buildInfo.officeFloorArea : '未知'}</td>
                            </tr>
                            <tr class="build-info-item">
                                <td class="build-label">商铺面积：</td><td class="build-data">${buildInfo.shopArea ? buildInfo.shopArea : '未知'}</td>
                            </tr>
                            <tr class="build-info-item">
                                <td class="build-label">酒店面积：</td><td class="build-data">${buildInfo.hotelArea ? buildInfo.hotelArea : '未知'}</td>
                            </tr>
                            <tr class="build-info-item">
                                <td class="build-label">住宅面积：</td><td class="build-data">${buildInfo.residentialArea ? buildInfo.residentialArea : '未知'}</td>
                            </tr>
                            <tr class="build-info-item">
                                <td class="build-label">地下停车场面积：</td><td class="build-data">${buildInfo.parkingArea ? buildInfo.parkingArea : '未知'}</td>
                            </tr>
                            <tr class="build-info-item">
                                <td class="build-label">栋数：</td><td class="build-data">${buildInfo.floorTotal ? buildInfo.floorTotal : '未知'}</td>
                            </tr>
                            <tr class="build-info-item">
                                <td class="build-label">入住率：</td><td class="build-data">${buildInfo.occupancyRate ? Number(buildInfo.occupancyRate).toFixed(2) : '未知'}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>`;
  $(".land-panel-con").html(tpl);
  $(".industry-build-con .build-info").mCustomScrollbar({
    setHeight: '100%',
    theme: "minimal-dark",
    scrollbarPosition: "inside"
  });
}
/*控制企业详情面板关闭操作*/
$(".land-company-detail-box .close-company-detail").on("click",function(){
  var data = $(this).data('back');
  if(!data){
    $(".microcosmic_container").show();
  }else{
    $(".time-colors-panel").css({right: '420px'});
    $('.industry-land-infowindow').show().addClass('slideInRight').removeClass('slideOutRight');
    $('.industry-company-list-panel').show().addClass('slideInRight').removeClass('slideOutRight');
    //在地图上改变当前点击的多边形
    for (var i = 0; i < polygonEcoLands.lands.length; i++) {
      // if (polygonEcoLands.lands[i].getExtData().slected) {
      if (polygonEcoLands.lands[i].getExtData().borderColor != polygonEcoLands.lands[i].getOptions().strokeColor) {
        polygonEcoLands.lands[i].setOptions({
          strokeColor: polygonEcoLands.lands[i].getExtData().borderColor,
          fillColor: polygonEcoLands.lands[i].getExtData().color,
          strokeWeight: defaultStrokeWeight,
        });
        var oldExtData = polygonEcoLands.lands[i].getExtData();//先保存原始ExtData数据
        oldExtData.slected = false;//改变之前选中的状态为false
        polygonEcoLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
        break;
      }
    }
  }
  $(".land-company-detail-box").hide().removeClass("slideInRight").addClass("slideOutRight");
});
/*产业分布企业列表时间切换*/
$(".industry-company-list-panel").on("click",".industry-company-hd .time-item",function(){
  if(!$(this).hasClass("active")){
    var time = $(this).data("time");
    var type = $(this).data("type");
    $(this).addClass("active").siblings().removeClass("active");
    searchIndustryCompanyList(type);
    /*$.ajax({
      // url: "/v1/land/findAll",
      url: "/v1/land/findCompanyByEnterpriseType",
      type:"GET",
      dataType:"json",
      data:{revenueTime:time,enterpriseType:type},
      success:function(res){
        console.log(res);
        var listTpl = '';
        var companyList = res.sort(compareFn('pricepermeter','desc'));
        if(companyList.length > 0){
          companyList.forEach(function(v,i){
            listTpl += `<div class="land-company-item company-item flex" data-company="${v.actualUsers}">
                            <div class="logo">
                                <img src="../images/company_list_logo.png" class="">
                            </div>
                            <div class="item name flex-cell"><div class="top-label">${v.actualUsers}</div><div class="bot-label">${v.landIsLocated}</div></div>
                            <div class="item shouru flex-cell"><div class="top-label">${Number(v.operatingIncome).toFixed(2)}</div><div class="bot-label">营业收入(万元)</div></div>
                            <div class="jingji flex-cell"><div class="top-label">${Number(v.pricepermeter).toFixed(2)}</div><div class="bot-label">地块每平米营收价值(万元)</div></div>
                        </div>`;
          });
          $(".industry-company-bd .land-company-scroll-con").html(listTpl);
          $(".industry-company-list .land-company-list").mCustomScrollbar("scrollTo","top");
        }
      }
    });*/
  }
});
/*控制生物医药、电子信息和先进制造单一显示*/
/*$(".eco-color-xh .living-land").on("click",function(){
  if(!$(this).hasClass("active")){
    $(".industry-last-colors-panel .color-blank").removeClass("active");
    $(".microcosmic_container").hide().addClass("slideOutRight").removeClass("slideInRight");
    $(".right-top-land-infowindow").show().addClass("slideInRight").removeClass("slideOutRight");
    $(".time-colors-panel").css({"right":"420px"});
    $(".industry-last-colors-panel").css({"right":"570px"});
    /!*清除所有覆盖物*!/
    map.clearMap();
    creatWestAreaLandRangeCj(map);
    $(this).addClass("active").parent().siblings().find(".color-blank").removeClass("active");
    // creatLivingCateLandSingle(map);
    // creatElectronLivingCateLandSingle(map,"生物医药");

    loadingFullAnimat("zdy-full-cover-mask","body");
    if(highQualityAllData){
      newCreatElectronLivingCateLandSingle(map,"生物医药");
    }else{
      indexeDBmethod.byIndexGet('landData','highQualityAllData',function(res){
        var dbData = res;
        highQualityAllData = dbData ? dbData.data : highQualityAllData;
        if(highQualityAllData){
          newCreatElectronLivingCateLandSingle(map,"生物医药");
        }else{
          /!*获取所有综合评分的企业数据*!/
          $.ajax({
            // url: "/v1/land/findAll",
            url: "/v1/highQualityEvaluation/companyHighQuality",
            // url: "/v1/highQualityEvaluation/companyHighQuality2",
            type:"GET",
            dataType:"json",
            data:{},
            success:function(res){
              console.log(res);
              highQualityAllData = {};
              res.forEach(function(v,i){
                for(var value in v.highQuality){
                  var result = {};
                  result.id = v.company.id;
                  result.coordinate = v.company.coordinate;
                  result.industryType = v.company.industryType;
                  result.name = v.company.name;
                  result.qualityNum = v.highQuality[value];
                  if(highQualityAllData[value]){
                    if(highQualityAllData[value][v.company.industryType]){
                      highQualityAllData[value][v.company.industryType].push(result);
                    }else{
                      highQualityAllData[value][v.company.industryType] = [];
                      highQualityAllData[value][v.company.industryType].push(result);
                    }
                  }else{
                    highQualityAllData[value] = {};
                    highQualityAllData[value][v.company.industryType] = [];
                    highQualityAllData[value][v.company.industryType].push(result);
                  }
                }
              });
              // console.log(highQualityAllData)
              // localStorage.setItem('highQualityAllData', JSON.stringify(highQualityAllData));

              var indexedDBdata = {type: 'highQualityAllData', data: highQualityAllData};
              indexeDBmethod.add('landData',indexedDBdata);
              newCreatElectronLivingCateLandSingle(map,"生物医药");
            }
          });
        }
      });
    }
  }
});*/
/*控制生物医药、电子信息和先进制造单一显示*/
/*$(".eco-color-xh .electron-land").on("click",function(){
  if(!$(this).hasClass("active")){
    $(".industry-last-colors-panel .color-blank").removeClass("active");
    $(".microcosmic_container").hide().addClass("slideOutRight").removeClass("slideInRight");
    $(".right-top-land-infowindow").show().addClass("slideInRight").removeClass("slideOutRight");
    $(".time-colors-panel").css({"right":"420px"});
    $(".industry-last-colors-panel").css({"right":"570px"});
    /!*清除所有覆盖物*!/
    map.clearMap();
    creatWestAreaLandRangeCj(map);
    $(this).addClass("active").parent().siblings().find(".color-blank").removeClass("active");
    // creatElectronLivingCateLandSingle(map,"电子信息");
    loadingFullAnimat("zdy-full-cover-mask","body");
    newCreatElectronLivingCateLandSingle(map,"电子信息");
  }
});*/
/*控制生物医药、电子信息和先进制造单一显示*/
$(".eco-color-xh .color-list-bd .color-blank").on("click",function(){
  if(!$(this).hasClass("active")){
    var industryType = $(this).data('catname');
    var scaleType = $(".scale-enterprise-color-panel .color-blank.active").data('type');
    scaleType = scaleType == 'scaleUp' ? 'up' : 'down';
    $(".industry-last-colors-panel .color-blank").removeClass("active");
    $(".microcosmic_container").hide().addClass("slideOutRight").removeClass("slideInRight");
    $(".right-top-land-infowindow").show().addClass("slideInRight").removeClass("slideOutRight");
    $(".land-company-detail-box").hide().addClass("slideOutRight").removeClass("slideInRight");
    $(".time-colors-panel").css({"right":"420px"});
    // $(".industry-last-colors-panel").css({"right":"570px"});
    /*清除所有覆盖物*/
    map.clearMap();
    creatWestAreaLandRangeCj(map);
    $(this).addClass("active").parent().siblings().find(".color-blank").removeClass("active");
    // creatElectronLivingCateLandSingle(map,"先进制造");
    loadingFullAnimat("zdy-full-cover-mask","body");
      /*判断是否存在规上或规下的企业数据*/
      if(scaleEnterpriseAllData[scaleType].length > 0){
        newCreatElectronLivingCateLandSingle(map,industryType,scaleType);
      }else{
        var type = type;
        var time = $(".datetimepicker-scale-enterprise input").val();
        var lists1 = [];
        var lists2 = [];
        /*判断展示规上还是规下*/
        if(type == 'up'){
          /*规上企业单一业主综合评分信息*/
          $.ajax({
            url: './jsonData/overallRatingInfo'+time+'.json',
            type: 'GET',
            dataType: 'json',
            data: {year: time},
            success: function(res){
              // console.log(res)
              lists1 = res;
              // scaleEnterpriseAllData.up = lists1;
              // var indexedDBdata = {type: 'scaleEnterpriseAllData', data: scaleEnterpriseAllData};
              // indexeDBmethod.add('landData',indexedDBdata);
              // creatScaleEnterpriseLandSingleAgain(map,type,time,dataPolygonNatureLands)
              /*规上企业非单一业主综合评分信息*/
              $.ajax({
                url: '/v1/aboveNoSingleOverallRating/aboveNoSingleOverallRatingInfo',
                type: 'GET',
                dataType: 'json',
                data: {year: time},
                success: function(res){
                  // console.log(res)
                  lists2 = res;
                  var data = lists1.concat(lists2);
                  scaleEnterpriseAllData.up = data.sort(compareFn('score','desc'));
                  var indexedDBdata = {type: 'scaleEnterpriseAllData', data: scaleEnterpriseAllData};
                  indexeDBmethod.add('landData',indexedDBdata);
                  /*绘制选择的产业类型地块信息*/
                  newCreatElectronLivingCateLandSingle(map,industryType,scaleType);
                },error: function(err) {
                  console.log(err)
                }
              });
            },error: function(err) {
              console.log(err)
            }
          })
        }else{
          /*规下企业单一业主综合评分信息*/
          $.ajax({
            url: './jsonData/blowSingleOverallRatingInfo'+time+'.json',
            type: 'GET',
            dataType: 'json',
            data: {year: time},
            success: function(res){
              // console.log(res)
              lists1 = res;
              // scaleEnterpriseAllData.down = lists1;
              // var indexedDBdata = {type: 'scaleEnterpriseAllData', data: scaleEnterpriseAllData};
              // indexeDBmethod.add('landData',indexedDBdata);
              // creatScaleEnterpriseLandSingleAgain(map,type,time,dataPolygonNatureLands)
              /*规下企业非单一业主综合评分信息*/
              $.ajax({
                url: '/v1/blowNoSingleOverallRating/findAllBelowOverallRatingInfo',
                type: 'GET',
                dataType: 'json',
                data: {year: time},
                success: function(res){
                  // console.log(res)
                  lists2 = res;
                  var data = lists1.concat(lists2);
                  scaleEnterpriseAllData.down = data.sort(compareFn('score','desc'));
                  var indexedDBdata = {type: 'scaleEnterpriseAllData', data: scaleEnterpriseAllData};
                  indexeDBmethod.add('landData',indexedDBdata);
                  /*绘制选择的产业类型地块信息*/
                  newCreatElectronLivingCateLandSingle(map,industryType,scaleType);
                },error: function(err) {
                  console.log(err)
                }
              });
            },error: function(err) {
              console.log(err)
            }
          })

        }
      }
      /*if(HighQualityListData.length > 0){
        newCreatElectronLivingCateLandSingle(map,industryType,scaleType);
      }else{
        $.ajax({
          // url: "/v1/land/findAll",
          url: "/v1/highQualityEvaluation/companyHighQuality2",
          type:"GET",
          dataType:"json",
          data:{},
          success:function(res){
            // console.log(11,res);
            HighQualityListData = res;

            newCreatElectronLivingCateLandSingle(map,industryType,scaleType);
          }
        })
      }*/
    $(".industry-last-colors-panel").show();
    $(".right-top-land-infowindow .icon-ctrl-scroll").mCustomScrollbar("scrollTo",'top');
  }else{
    /*恢复绘制规上或规下地块信息*/
    $(this).removeClass("active");
    var scaleType = $(".scale-enterprise-color-panel .color-blank.active").data('type');
    scaleType = scaleType == 'scaleUp' ? 'up' : 'down';
    $(".industry-last-colors-panel .color-blank").removeClass("active");
    $(".microcosmic_container").hide().addClass("slideOutRight").removeClass("slideInRight");
    $(".right-top-land-infowindow").show().addClass("slideInRight").removeClass("slideOutRight");
    $(".land-company-detail-box").hide().addClass("slideOutRight").removeClass("slideInRight");
    $(".time-colors-panel").css({"right":"420px"});
    $(".industry-last-colors-panel").hide();
    // $(".industry-last-colors-panel").css({"right":"570px"});
    /*清除所有覆盖物*/
    map.clearMap();
    creatWestAreaLandRangeCj(map);
    var time = $(".datetimepicker-scale-enterprise input").val();
    var dataOptions = dataPolygonHighEnterpriseLands;
    /*判断当前选中的是否已经缓存啦数据*/
    if(scaleEnterpriseAllData[scaleType].length > 0){
      creatScaleEnterpriseLandSingleAgain(map,scaleType,time,dataOptions)
    }else{
      getScaleEnterpriseData(time,scaleType);
    }
  }
});

/*NEW MERGE将分类生物医药、电子信息和先进制造地块单独信息绘图*/
function newCreatElectronLivingCateLandSingle(map,type,scaleType){
  var time = $(".datetimepicker-scale-enterprise input").val();

  /*获取概况信息*/
  /*前十营业收入占比*/
  /*$.ajax({
    // url: "/v1/land/findAll",
    url: "/v1/highQualityEvaluation/companyHighQualityTop10Proportion",
    type:"GET",
    dataType:"json",
    data:{year: time,companyIndustryType: type},
    success:function(res){

      var tpl = `<div class="text-c">
                    <div id="top10-proportion" style="width:100%;height: 200px;"></div>
                </div>`;
      $(".right-top-land-infowindow .title").html('高质量企业概况')
      $(".right-top-land-infowindow .icon-ctrl-scroll-con").html(tpl)
      creatHighEnterpriseTop10Proportion({},'前10名营业收入',res);
      var lists = [];
      scaleEnterpriseAllData[scaleType].forEach(function(v,i){
        if(v.year == time && (v.enterpriseType == type || v.companyIndustryType == type)){
          lists.push(v);
        }
      });
      var tpl = ``;
      var listTpl = ``;
      lists.forEach(function (v,i) {
        listTpl += `<div class="land-company-item company-item flex" data-landid="${v.landBlockId}" data-company="${v.companyName}">
                        <div class="logo">
                            ${i+1}
                        </div>
                        <div class="item name flex-cell"><div class="top-label">${v.companyName}</div></div>
                        <div class="jingji"><div class="top-label">${Number(v.score.toFixed(2))}</div></div>
                    </div>`
      });
      tpl = `<div class="high-enterprise-company-bd">
                    <div class="company-con">
                        <div class="public-title"><span class="title">企业列表</span></div>
                        <div class="company-list high-enterprise-list-box">
                            ${listTpl}
                        </div>
                    </div>
                </div>`;

      $(".right-top-land-infowindow .icon-ctrl-scroll-con").append(tpl);

    }
  });*/
  var lists = [];
  scaleEnterpriseAllData[scaleType].forEach(function(v,i){
    if(v.year == time && (v.enterpriseType == type || v.companyIndustryType == type)){
      lists.push(v);
    }
  });
  var tpl = ``;
  var listTpl = ``;
  lists.forEach(function (v,i) {
    listTpl += `<div class="land-company-item company-item flex" data-landid="${v.landBlockId}" data-company="${v.companyName}">
                        <div class="logo">
                            ${i+1}
                        </div>
                        <div class="item name flex-cell"><div class="top-label">${v.companyName}</div></div>
                        <div class="jingji"><div class="top-label">${Number(v.score.toFixed(2))}</div></div>
                    </div>`
  });
  tpl += `<div class="high-enterprise-company-bd">
                    <div class="company-con">
                        <div class="public-title"><span class="title">企业列表</span></div>
                        <div class="company-list high-enterprise-list-box">
                            ${listTpl}
                        </div>
                    </div>
                </div>`;

  $(".right-top-land-infowindow .high-enterprise-company-bd").html(tpl);


  if(scaleEnterpriseAllData[scaleType].length>0){
    creatElectronLivingCateLandSingleAgain(map,type,time,dataPolygonHighEnterpriseLands,scaleType)
  }else{
    indexeDBmethod.byIndexGet('landData','scaleEnterpriseAllData',function(res) {
      var dbData = res;
      scaleEnterpriseAllData = dbData ? dbData.data : scaleEnterpriseAllData;
      creatElectronLivingCateLandSingleAgain(map,type,time,dataPolygonHighEnterpriseLands,scaleType)
    })
  }

}
/*产业高企--将已处理或缓存的数据绘图*/
function creatElectronLivingCateLandSingleAgain(map,type,time,dataOptions,scaleType){
  var time = time;
  /*请求新数据将保存的地块对象清除*/
  polygonHighEnterpriseLands.lands=[];
  /*请求新数据将保存的单一分类数据清除(切换时间会再次请求)*/
  dataPolygonEcoCateLands.living=[];
  dataPolygonEcoCateLands.electron=[];
  dataPolygonEcoCateLands.make=[];
  dataPolygonEcoCateLands.other=[];
  dataPolygonEcoCateLands.service=[];
  var industryType = type;
  var scaleType = scaleType;
  newpointers = dataOptions;
  //-----
  /*1级*/
  var colors = ["#f5d11d", "#12ffff", "#a57c52", "#7d7dff", "#ff0000"];
  /*2级*/
  var colors2 = ["#b3576e", "#b35900", "#59432d", "#5e5ebf", "#b30000"];
  /*3级*/
  var colors3 = ["#66323f", "#4d2600", "#0d0a06", "#3e3e7e", "#660000"];
  /*降序取前6*/
  /*if(industryType == '生物医药'){
    var sortHighQualityData = highQualityAllData[time]['生物医药'].sort(compareFn('qualityNum','desc'));
  }else if(type == '电子信息'){
    var sortHighQualityData = highQualityAllData[time]['电子信息'].sort(compareFn('qualityNum','desc'));
  }else{
    var sortHighQualityData = highQualityAllData[time]['先进制造'].sort(compareFn('qualityNum','desc'));
  }*/

    // var sortHighQualityData = highQualityAllData[time][industryType].sort(compareFn('qualityNum', 'desc'));
    var sortScaleEnterpriseAllData = [];
    for (var i = 0; i < scaleEnterpriseAllData[scaleType].length; i++) {
      if(scaleEnterpriseAllData[scaleType][i].enterpriseType == industryType || scaleEnterpriseAllData[scaleType][i].companyIndustryType == industryType){
        sortScaleEnterpriseAllData.push(scaleEnterpriseAllData[scaleType][i]);
      }
    }

    var markerResult = [];
    for (var i = 0; i < newpointers.length; i++) {
      var color = defaultLandColor;
      var borderColor = defaultBorderColor;
      var isIndustryLand = false;
      var rankNum = '';
      if(newpointers[i].enterpriseType == '生物医药'){
        /*保存单独信息供筛选*/
        dataPolygonEcoCateLands.living.push(newpointers[i]);
      }else if(newpointers[i].enterpriseType == '电子信息'){
        dataPolygonEcoCateLands.electron.push(newpointers[i]);
      }else if(newpointers[i].enterpriseType == '先进制造'){
        dataPolygonEcoCateLands.make.push(newpointers[i]);
      }

      // if ((newpointers[i].enterpriseType == industryType)) {
        /*添加公司Id到地块*/
        // for (var j = 0; j < sortHighQualityData.length; j++) {
        for (var j = 0; j < sortScaleEnterpriseAllData.length; j++) {

          // if (sortHighQualityData[j].name == newpointers[i].actualUsers) {
          /*判断规上规下数据里的产业类型和地块的数据匹配*/
          if ((sortScaleEnterpriseAllData[j].enterpriseType == industryType || sortScaleEnterpriseAllData[j].companyIndustryType == industryType) && (sortScaleEnterpriseAllData[j].landBlockId == newpointers[i].id || sortScaleEnterpriseAllData[j].companyName == newpointers[i].actualUsers)) {
            //
            // for (var k = 0; k < sortScaleEnterpriseAllData.length; k++) {
            //   if (sortScaleEnterpriseAllData[k].landBlockId == newpointers[i].id || sortScaleEnterpriseAllData[k].companyName == newpointers[i].actualUsers) {
              /*判断是否属于规上和规下数据里*/
                // companyId = sortLivingHighQualityData[j].id;
                isIndustryLand = true;
                rankNum = j + 1;
                if (j == 0) {
                  color = "#1139ff";
                  borderColor = "#1139ff";
                } else if (j == 1) {
                  color = "#124dff";
                  borderColor = "#124dff";
                } else if (j == 2) {
                  color = "#1261ff";
                  borderColor = "#1261ff";
                } else if (j == 3) {
                  color = "#1275ff";
                  borderColor = "#1275ff";
                } else if (j == 4) {
                  color = "#1288ff";
                  borderColor = "#1288ff";
                } else if (j == 5) {
                  color = "#129cff";
                  borderColor = "#129cff";
                } else if (j == 6) {
                  color = "#12b0ff";
                  borderColor = "#12b0ff";
                } else if (j == 7) {
                  color = "#12c4ff";
                  borderColor = "#12c4ff";
                } else if (j == 8) {
                  color = "#12d7ff";
                  borderColor = "#12d7ff";
                } else if (j == 9) {
                  color = "#12ebff";
                  borderColor = "#12ebff";
                } else {
                  color = "#12ffff";
                  borderColor = "#12ffff";
                }
            //   }
            // }
          }else{
            borderColor = defaultBorderColor;
          }
        }
      // } else {
      //   borderColor = defaultBorderColor;
      // }
      var polygonOptions = {
        map: map,
        strokeColor: borderColor,
        // strokeColor: color,
        strokeWeight: defaultStrokeWeight,
        fillColor: color,
        // fillColor: 'transparent',
        fillOpacity: 0.8,
        /*strokeStyle: "dashed",
    strokeDasharray: [20,10],*/
        extData: {
          id: newpointers[i].id,
          ecoLv: newpointers[i].ecoLv,
          actualUsers: newpointers[i].actualUsers,
          pricepermeter: newpointers[i].pricepermeter,
          landCardNumber: newpointers[i].landCardNumber,
          landArea: newpointers[i].landArea,
          usageArea: newpointers[i].usageArea,
          /*按性质分类*/
          generalType: newpointers[i].generalType,
          enterpriseType: newpointers[i].enterpriseType,
          landUsrNature: newpointers[i].landUsrNature,
          unifiedLandMark: newpointers[i].unifiedLandMark,
          landIsLocated: newpointers[i].landIsLocated,
          rightHolder: newpointers[i].rightHolder,
          color: color,
          borderColor: borderColor,
          companyId: newpointers[i].companyId,
          companyName: newpointers[i].companyName,
          companyIcon: newpointers[i].companyIcon,
          isIndustryLand: isIndustryLand,
          rankNum: rankNum,
          slected: false
        }
      };
      // 外多边形坐标数组和内多边形坐标数组
      var pointers = newpointers[i].positions;
      polygonHighLand = new AMap.Polygon(polygonOptions);
      polygonHighLand.on("click", function (e) {
        /*看数据*/
        console.log(this.getExtData())
        if (!this.getExtData().slected) {
          var lanTitle = idustryParkName;
          var landArea = this.getExtData().landArea;
          var landUsrNature = this.getExtData().landUsrNature;
          var that = this;
          var unifiedLandMark = this.getExtData().unifiedLandMark;
          chooseLanId = unifiedLandMark;

          //在地图上改变当前点击的多边形
          for (var i = 0; i < polygonHighEnterpriseLands.lands.length; i++) {
            if (polygonHighEnterpriseLands.lands[i].getExtData().borderColor != polygonHighEnterpriseLands.lands[i].getOptions().strokeColor) {
              polygonHighEnterpriseLands.lands[i].setOptions({
                strokeColor: polygonHighEnterpriseLands.lands[i].getExtData().borderColor,
                fillColor: polygonHighEnterpriseLands.lands[i].getExtData().color,
                strokeWeight: defaultStrokeWeight
              });
              var oldExtData = polygonHighEnterpriseLands.lands[i].getExtData();//先保存原始ExtData数据
              oldExtData.slected = false;//改变之前选中的状态为false
              polygonHighEnterpriseLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
              // break;
            }
          }
          var newExtData = this.getExtData();
          newExtData.slected = true;
          this.setOptions({strokeColor: selectedBorderColor, strokeWeight: selectedStrokeWeight});
          this.setExtData(newExtData);
          var options = {
            lanTitle: lanTitle,
            landArea: landArea,
            landUsrNature: landUsrNature,
            polygon: that
          };
          // landInfoWindowFn(map, options, "polygonEcLands");

          // viewHighEnterpriseLandPanel(this.getExtData());
          viewScaleEnterpriseLandInfo(this.getExtData(),scaleType);
        }
      });
      polygonHighLand.setPath(pointers);
      /*标识前十*/
      for (var j = 0; j < 10; j++) {
        // if (sortHighQualityData[j] && sortHighQualityData[j].name == newpointers[i].actualUsers && newpointers[i].enterpriseType == industryType) {
        if (sortScaleEnterpriseAllData[j] && (sortScaleEnterpriseAllData[j].enterpriseType == industryType || sortScaleEnterpriseAllData[j].companyIndustryType == industryType) && (sortScaleEnterpriseAllData[j].landBlockId == newpointers[i].id || sortScaleEnterpriseAllData[j].companyName == newpointers[i].actualUsers)) {

          // for (var k = 0; k < sortScaleEnterpriseAllData.length; k++) {
          //   if (sortScaleEnterpriseAllData[k].landBlockId == newpointers[i].id || sortScaleEnterpriseAllData[k].companyName == newpointers[i].actualUsers) {
              /*判断是否属于规上和规下数据里*/
              var markerList = {};
              markerList = polygonHighLand.getExtData();

              markerList.ranking = j + 1;

              var markerText = new AMap.Text({
                map: map,
                textAlign: 'center',
                text: '<div class="high-enterprise-rank">' + markerList.ranking + '</div>',
                position: polygonHighLand.getBounds().getCenter(),
                extData: {landId: polygonHighLand.getExtData().id}
              });
              markerText.on("click", function () {
                //在地图上改变之前点击的多边形
                for (var i = 0; i < polygonHighEnterpriseLands.lands.length; i++) {
                  if (polygonHighEnterpriseLands.lands[i].getExtData().slected) {
                    polygonHighEnterpriseLands.lands[i].setOptions({
                      strokeColor: polygonHighEnterpriseLands.lands[i].getExtData().borderColor,
                      fillColor: polygonHighEnterpriseLands.lands[i].getExtData().color,
                      strokeWeight: defaultStrokeWeight
                    });
                    var oldExtData = polygonHighEnterpriseLands.lands[i].getExtData();//先保存原始ExtData数据
                    oldExtData.slected = false;//改变之前选中的状态为false
                    polygonHighEnterpriseLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
                    break;
                  }
                }
                for (var i = 0; i < polygonHighEnterpriseLands.lands.length; i++) {
                  if (this.getExtData().landId == polygonHighEnterpriseLands.lands[i].getExtData().id) {
                    var newExtData = polygonHighEnterpriseLands.lands[i].getExtData();
                    newExtData.slected = true;
                    polygonHighEnterpriseLands.lands[i].setOptions({
                      strokeColor: selectedBorderColor,
                      strokeWeight: selectedStrokeWeight
                    });
                    polygonHighEnterpriseLands.lands[i].setExtData(newExtData);

                    // viewHighEnterpriseLandPanel(polygonHighEnterpriseLands.lands[i].getExtData());

                    viewScaleEnterpriseLandInfo(polygonHighEnterpriseLands.lands[i].getExtData(),scaleType);
                  }
                }
              });
              markerResult.push(markerText);

          //   }
          // }
        }
      }


      polygonHighEnterpriseLands.lands.push(polygonHighLand)
    }
    markerRankTextList = markerResult;
    // creatHighEnterpriseMarkerPoint(map,{result: markerResult});
    map.setFitView();
    map.setZoom(14);
    $(".zdy-full-cover-mask").remove();
}
/*点击高企Marker标记对应地块*/
function getLnadForHighEnterpriseMarker(options){
  //在地图上改变当前点击的多边形
  for (var i = 0; i < polygonHighEnterpriseLands.lands.length; i++) {
    if (polygonHighEnterpriseLands.lands[i].getExtData().slected) {
      polygonHighEnterpriseLands.lands[i].setOptions({
        strokeColor: polygonHighEnterpriseLands.lands[i].getExtData().borderColor,
        fillColor: polygonHighEnterpriseLands.lands[i].getExtData().color,
        strokeWeight: defaultStrokeWeight
      });
      var oldExtData = polygonHighEnterpriseLands.lands[i].getExtData();//先保存原始ExtData数据
      oldExtData.slected = false;//改变之前选中的状态为false
      polygonHighEnterpriseLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
      break;
    }
  }
  for (var i = 0; i < polygonHighEnterpriseLands.lands.length; i++) {
    if(options.companyId == polygonHighEnterpriseLands.lands[i].getExtData().companyId){
      polygonHighEnterpriseLands.lands[i].setOptions({
        strokeColor: selectedBorderColor,
        strokeWeight: selectedStrokeWeight
      });
      var newExtData = polygonHighEnterpriseLands.lands[i].getExtData();
      newExtData.slected = true;
      polygonHighEnterpriseLands.lands[i].setExtData(newExtData);
      console.log(polygonHighEnterpriseLands.lands[i])
    }
  }
}

/*绘制西区范围*/
function creatWestAreaLandRangeCj(map,isUseLand){
  if(isUseLand){
    var fillColor = '#2a8ab8';
    var fillOpacity = 1;
  }else{
    var fillColor = 'rgb(249, 182, 32)';
    var fillOpacity = 0.2;
  }
  if(dataWestAreaRangePositions.length > 0){

      // 外多边形坐标数组和内多边形坐标数组
      var pointersWestArea = dataWestAreaRangePositions;
      var polygonOptionsWestArea = {
        map: map,
        strokeColor: 'rgb(249, 182, 32)',
        // strokeColor: color,
        strokeWeight: 4,
        fillColor: fillColor,
        fillOpacity: fillOpacity,
        strokeOpacity: 0.8,
        /*strokeStyle: "dashed",
        strokeDasharray: [20,10],*/
        extData: {}
      };
      polygonWestAreaRange = new AMap.Polygon(polygonOptionsWestArea);

      // console.log(polygon)
      polygonWestAreaRange.setPath(pointersWestArea);

    // if(callbackFn){callbackFn()}
  }else{
    $.ajax({
      url: '/v1/land/findWesternDistrictBoundary',
      type: 'GET',
      dataType: 'json',
      data: {},
      success: function(res){
        // console.log(res)
        var positions = [];
        res.forEach(function (v,i) {
          positions.push([v[2],v[3]]);
        });

        // console.log(positions)
        var polygonOptionsWestArea = {
          map: map,
          strokeColor: '#c48c5c',
          // strokeColor: color,
          strokeWeight: 4,
          fillColor: fillColor,
          fillOpacity: fillOpacity,
          strokeOpacity: 0.8,
          /*strokeStyle: "dashed",
      strokeDasharray: [20,10],*/
          extData: {}
        };
        // 外多边形坐标数组和内多边形坐标数组
        var pointersWestArea = positions;
        dataWestAreaRangePositions = pointersWestArea;
        polygonWestAreaRange = new AMap.Polygon(polygonOptionsWestArea);

        polygonWestAreaRange.setPath(pointers);
        // if(callbackFn){callbackFn()}
      },error:function(err) {

      }
    })
  }
}
/*end*/
/*产业分布-xh*/
$(".item2.cy-land .use-purpose-xh").on("click",function(oEvent){
  oEvent.stopPropagation();
  $(".build-menu").show();
  if(!$(this).hasClass("active")) {
    loadingFullAnimat("zdy-full-cover-mask", "body");
    // $(".datetimepicker-box").show();
    $(".datetimepicker-top-box").hide();
    chooseLanId = null;
    landInfoWindow.close();
    /*单独移除所有polygon*/
    // var allPolygons = polygons.lands.concat(polygonEcoLands.lands,polygonTopLands.lands,polygonNatureLands.lands,polygonInefficients.lands)
    // map.remove(allPolygons)
    /*清除所有覆盖物*/
    map.clearMap();

    initControll();
    landChanyeFenbuInfoWindow();
    creatWestAreaLandRangeCj(map);

    /*判断是否存在按综合质量排名的企业列表*/
    if (HighQualityListData.length > 0) {
      searchIndustryCompanyList('生物医药');
    } else {
      $.ajax({
        // url: "/v1/land/findAll",
        url: "./jsonData/companyHighQuality2.json",
        type: "GET",
        dataType: "json",
        data: {},
        success: function (res) {
          // console.log(11,res);
          HighQualityListData = res;
          searchIndustryCompanyList('生物医药');
        }, error: function (err) {

        }
      });
    }

    // dataPolygonEcoLands = localStorage.getItem('dataPolygonEcoLands') ? JSON.parse(localStorage.getItem('dataPolygonEcoLands')) : dataPolygonEcoLands;
    if (dataPolygonEcoLands.length > 0) {
      creatIndustryDistributedLandAgain(map, dataPolygonEcoLands);
    } else {
      indexeDBmethod.byIndexGet('landData', 'dataPolygonEcoLands', function (res) {
        var dbData = res;
        dataPolygonEcoLands = dbData ? dbData.data : dataPolygonEcoLands;
        if (dataPolygonEcoLands.length > 0) {
          $(".eco-color-xh .color-item").addClass("active");
          creatIndustryDistributedLandAgain(map, dataPolygonEcoLands);
        } else {
          var time = new Date().getFullYear() - 1;
          // creatEcoLand(map,time);
          var industryCat = ["生物医药", "电子信息", "先进制造"];
          var countNum = 0;
          var ecoLandCopy = [];
          var ecoLandList = [];
          var startTime = +new Date();
          for (var i = 0; i < industryCat.length; i++) {
            console.log("开始分类梯度请求", +new Date())
            creatEcLandStep(map, time, industryCat[i], function (options) {
              countNum++;
              ecoLandCopy.push(options);
              if (countNum == industryCat.length) {
                for (var i = 0; i < ecoLandCopy.length; i++) {
                  for (var j = 0; j < ecoLandCopy[i].length; j++)
                    ecoLandList.push(ecoLandCopy[i][j])
                }
                console.log("分类梯度请求End", (+new Date() - startTime) / 1000)
                /*ecoLandList所有的梯度数据*/
                groupEcLandStep(map, ecoLandList, function () {
                  searchIndustryCompanyList('生物医药');
                });
              }
              // map.setFitView();
              // map.setZoom(14);
            });
          }
          ;
        }
      })
    }
    if ("markerList" in window && markerList.getData().length > 0) {
      //清除marker数据
      markerList.render([]);
    }

    // $(".land-choose-time").show();
    $(".time-colors-panel").show();
    $(".industry-color").show().siblings().hide();
    $(".build-menu").show();
    $(this).addClass("active");
    $(this).parents(".item").addClass("active");

    $(".industry-company-list-panel").show().addClass('slideInRight').removeClass('slideOutRight');
    // map.setFitView();
    // map.panBy(-580, 40);
    map.setFitView();
    map.setZoom(14);
  }
})
/*产业分布--将已处理或缓存的数据绘制地图*/
function creatIndustryDistributedLandAgain(map,dataOptions){
  polygonEcoLands.lands=[];
  /*请求新数据将保存的单一分类数据清除*/
  dataPolygonEcoCateLands.living=[];
  dataPolygonEcoCateLands.electron=[];
  dataPolygonEcoCateLands.make=[];
  newpointers = dataOptions;
  //-----
  /*1级*/
  var colors = ["#f61d1d", "#1139ff","#51b706", "#c4ae8d", "#7d7dff"];
  /*2级*/
  var colors2 = ["#b3576e", "#b35900", "#59432d", "#5e5ebf", "#b30000"];
  /*3级*/
  var colors3 = ["#66323f", "#4d2600", "#0d0a06", "#3e3e7e", "#660000"];
  markerTextList = [];
  for (var i = 0; i < newpointers.length; i++) {
    var color = defaultLandColor;
    var borderColor = "#fff";
    var isIndustryLand = null;
    if(newpointers[i].actualUsers){
      color = colors[3];
    }
    if ((newpointers[i].enterpriseType == "生物医药")) {
      dataPolygonEcoCateLands.living.push(newpointers[i]);
      color = colors[0];
      isIndustryLand = true;
      // var color ="transparent"
    } else if (newpointers[i].enterpriseType == "电子信息") {
      dataPolygonEcoCateLands.electron.push(newpointers[i]);
      color = colors[1];
      isIndustryLand = true;
    } else if (newpointers[i].enterpriseType == "先进制造") {
      dataPolygonEcoCateLands.make.push(newpointers[i]);
      color = colors[2];
      isIndustryLand = true;
    }else{
      borderColor = defaultBorderColor;
    }
    var polygonOptions = {
      map: map,
      strokeColor: borderColor,
      // strokeColor: color,
      strokeWeight: defaultStrokeWeight,
      fillColor: color,
      fillOpacity: 0.8,
      /*strokeStyle: "dashed",
  strokeDasharray: [20,10],*/
      extData: {
        id: newpointers[i].id,
        ecoLv: newpointers[i].ecoLv,
        actualUsers: newpointers[i].actualUsers,
        pricepermeter: newpointers[i].pricepermeter,
        landCardNumber: newpointers[i].landCardNumber,
        landArea: newpointers[i].landArea,
        usageArea: newpointers[i].usageArea,
        /*按性质分类*/
        generalType: newpointers[i].generalType,
        enterpriseType: newpointers[i].enterpriseType,
        landUsrNature: newpointers[i].landUsrNature,
        unifiedLandMark: newpointers[i].unifiedLandMark,
        landIsLocated: newpointers[i].landIsLocated,
        rightHolder: newpointers[i].rightHolder,
        color: color,
        borderColor: borderColor,
        isIndustryLand : isIndustryLand,
        slected: false
      }
    };
    // 外多边形坐标数组和内多边形坐标数组
    var pointers = newpointers[i].positions;
    polygonEcLand = new AMap.Polygon(polygonOptions);
    polygonEcLand.on("click", function (e) {
      /*看数据*/
      console.log(this.getExtData())
      if (!this.getExtData().slected) {
        var lanTitle = idustryParkName;
        var landArea = this.getExtData().landArea;
        var landUsrNature = this.getExtData().landUsrNature;
        var that = this;
        var unifiedLandMark = this.getExtData().unifiedLandMark;
        chooseLanId = unifiedLandMark;
        //在地图上改变当前点击的多边形
        for (var i = 0; i < polygonEcoLands.lands.length; i++) {
          // if (polygonEcoLands.lands[i].getExtData().slected) {
          if (polygonEcoLands.lands[i].getExtData().borderColor != polygonEcoLands.lands[i].getOptions().strokeColor) {
            polygonEcoLands.lands[i].setOptions({
              strokeColor: polygonEcoLands.lands[i].getExtData().borderColor,
              fillColor: polygonEcoLands.lands[i].getExtData().color,
              strokeWeight: defaultStrokeWeight
            });
            var oldExtData = polygonEcoLands.lands[i].getExtData();//先保存原始ExtData数据
            oldExtData.slected = false;//改变之前选中的状态为false
            polygonEcoLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
            break;
          }
        }
        var newExtData = this.getExtData();
        newExtData.slected = true;
        this.setOptions({strokeColor:selectedBorderColor, strokeWeight:selectedStrokeWeight});
        this.setExtData(newExtData);
        var options = {
          lanTitle: lanTitle,
          landArea: landArea,
          landUsrNature: landUsrNature,
          polygon: that
        };
        // landInfoWindowFn(map, options, "polygonEcLands");
        // viewIndustryLandPanel(this.getExtData())
        getCompanyInfomations(this.getExtData().actualUsers)
      }
    })
    polygonEcLand.on("mouseover", function (e) {
      for(var i = 0; i < markerTextList.length;i++){
        markerTextList[i].hide();
      }
      for(var i = 0; i < markerTextList.length;i++){
        if(markerTextList[i].getExtData().landId == this.getExtData().id){
          markerTextList[i].show();
        }
      }
    });
    polygonEcLand.on("mouseout", function (e) {
      // landInfoWindow.close()
      for(var i = 0; i < markerTextList.length;i++){
        markerTextList[i].hide();
      }
    })
    // console.log(polygon)
    polygonEcLand.setPath(pointers);
    polygonEcoLands.lands.push(polygonEcLand);
    // localStorage.setItem('dataPolygonEcoCateLands', JSON.stringify(dataPolygonEcoCateLands));
    if ((newpointers[i].enterpriseType == "生物医药" || newpointers[i].enterpriseType == "电子信息" || newpointers[i].enterpriseType == "先进制造")) {
      var markerText = new AMap.Text({
        map: map,
        textAlign: 'center',
        text: '<div class="industry-fenbu-marker">'+polygonEcLand.getExtData().actualUsers+'</div>',
        position: polygonEcLand.getBounds().getCenter(),
        extData: {landId:polygonEcLand.getExtData().id}
      });
      markerText.on("click",function(){
        //在地图上改变之前点击的多边形
        for (var i = 0; i < polygonEcoLands.lands.length; i++) {
          // if (polygonEcoLands.lands[i].getExtData().slected) {
          if (polygonEcoLands.lands[i].getExtData().borderColor != polygonEcoLands.lands[i].getOptions().strokeColor) {
            polygonEcoLands.lands[i].setOptions({
              strokeColor: polygonEcoLands.lands[i].getExtData().borderColor,
              fillColor: polygonEcoLands.lands[i].getExtData().color,
              strokeWeight: defaultStrokeWeight
            });
            var oldExtData = polygonEcoLands.lands[i].getExtData();//先保存原始ExtData数据
            oldExtData.slected = false;//改变之前选中的状态为false
            polygonEcoLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
            break;
          }
        }
        for (var i = 0; i < polygonEcoLands.lands.length; i++) {
          if(this.getExtData().landId == polygonEcoLands.lands[i].getExtData().id){
            var newExtData = polygonEcoLands.lands[i].getExtData();
            newExtData.slected = true;
            polygonEcoLands.lands[i].setOptions({strokeColor:selectedBorderColor, strokeWeight:selectedStrokeWeight});
            polygonEcoLands.lands[i].setExtData(newExtData);

            // viewIndustryLandPanel(polygonEcoLands.lands[i].getExtData());
            getCompanyInfomations(polygonEcoLands.lands[i].getExtData().actualUsers);
          }
        }
      });
      markerText.hide();
      markerTextList.push(markerText);
    }

  }
  map.setFitView();
  // map.panBy(-550, -40);
  map.setZoom(14);
  $(".zdy-full-cover-mask").remove();
}
var hasBuild = false;
$("div.build-menu .sub-menu2").on("click", function() {
  // if(hasBuild) {
  if ("markerList" in window && markerList.getData().length > 0) {
    //清除marker数据
    markerList.render([]);
    hasBuild = false;
    map.setZoom(14);
  } else {
    parkBuildInfo(map, '');
    hasBuild = true;
  }
})

/*产业--规上、规下企业*/
var scaleEnterpriseAllData = {up: [], down: []};//规上规下企业数据
var dataPolygonScaleTypeSingleLands = {up: [], down: []};//保存规上与规下单独地块数据
var polygonScaleEnterpriseLands = {lands: []};//保存已绘制好的地块数据
/*高质量企业、评价*/
$(".build-switch .high-quality").on("click",function(){
  if(!$(this).hasClass("active")) {
    /*清除后十名色块选中*/
    $(".industry-last-colors-panel .color-blank").removeClass("active");
    /*清除产业类型色块选中*/
    $(".eco-color-xh .color-blank").removeClass("active");
    loadingFullAnimat("zdy-full-cover-mask", "body");

    chooseLanId = null;
    landInfoWindow.close();
    /*单独移除所有polygon*/
    // var allPolygons = polygons.lands.concat(polygonEcoLands.lands,polygonTopLands.lands,polygonNatureLands.lands,polygonInefficients.lands)
    // map.remove(allPolygons)
    /*清除所有覆盖物*/
    map.clearMap();

    initControll();
    creatWestAreaLandRangeCj(map);
    $(".right-top-land-infowindow").show().addClass("slideInRight").removeClass("slideOutRight");
    /*修改为绘制一种产业*/
    // var emList = $(".eco-color-xh").find(".color-blank");
    // var type = null;
    // $.each(emList,function(v,i){
    //   if($(this).hasClass("active")){
    //     type = $(this).data("catname");
    //   }
    // });
    // type = type == 'living' ? '生物医药' : type == 'electron' ? '电子信息' : '先进制造';
    // var time = $(".datetimepicker-top-box input").val();

    $(".eco-color-xh .color-item").addClass("active");

    /*色块图列 恢复选中规上*/
    $(".scale-enterprise-color .scale-up-land").addClass("active").parent().siblings().find(".color-blank").removeClass("active");
    var time = Number($(".datetimepicker-scale-enterprise input").val());
    var type = 'up';
    // dataPolygonHighEnterpriseLands = localStorage.getItem('dataPolygonHighEnterpriseLands') ? JSON.parse(localStorage.getItem('dataPolygonHighEnterpriseLands')) : dataPolygonHighEnterpriseLands;
    // highQualityAllData = localStorage.getItem('highQualityAllData') ? JSON.parse(localStorage.getItem('highQualityAllData')) : highQualityAllData;
    if(dataPolygonHighEnterpriseLands.length > 0){
      /*判断是否存在综合评价的企业列表*/
      if(scaleEnterpriseAllData[type].length > 0){

        // var scaleEnterpriseLands = $.extend([],dataPolygonHighEnterpriseLands,true);
        var scaleEnterpriseLands = dataPolygonHighEnterpriseLands;
        scaleEnterpriseAllData[type].forEach(function(v,i){
          scaleEnterpriseLands.forEach(function(value,index){
            if(v.landBlockId == value.id || value.actualUsers == v.companyName){
              /*将企业信息添加到地块数据*/
              value.companyName = v.companyName;
              value.companyId = v.id;
            }
          })
        });

        creatScaleEnterpriseLandSingleAgain(map,type,time,scaleEnterpriseLands);
      }else{
        getScaleEnterpriseData(time,type);
      }
    }else{
      indexeDBmethod.byIndexGet('landData','dataPolygonHighEnterpriseLands',function(res){
        var dbData = res;
        dataPolygonHighEnterpriseLands = dbData ? dbData.data : dataPolygonHighEnterpriseLands;
        if ( dataPolygonHighEnterpriseLands.length > 0) {
          /*从indexedDB取数据*/
          /*判断是否存在综合评价的企业列表*/
          if(scaleEnterpriseAllData[type].length > 0){

            // var scaleEnterpriseLands = $.extend([],dataPolygonHighEnterpriseLands,true);
            var scaleEnterpriseLands = dataPolygonHighEnterpriseLands;
            scaleEnterpriseAllData[type].forEach(function(v,i){
              scaleEnterpriseLands.forEach(function(value,index){
                if(v.landBlockId == value.id || value.actualUsers == v.companyName){
                  /*将企业信息添加到地块数据*/
                  value.companyName = v.companyName;
                  value.companyId = v.id;
                }
              })
            });

            creatScaleEnterpriseLandSingleAgain(map,type,time,scaleEnterpriseLands);
          }else{
            getScaleEnterpriseData(time,type);
          }
        } else {
          getHighQualityEnterpriseLandData(time,type);
        }
      });
    }

    $(".right-top-land-infowindow .icon-ctrl-scroll").mCustomScrollbar({
      setHeight: '100%',
      theme: "minimal-dark",
      scrollbarPosition: "inside"
    });

    /*判断内存是否已存在数据*/
    /*if(dataPolygonHighEnterpriseLands.length > 0){
      /!*判断是否存在综合评价的企业列表*!/
      if(HighQualityListData.length > 0){
        newCreatElectronLivingCateLandSingle(map,type);
        $(".right-top-land-infowindow .icon-ctrl-scroll").mCustomScrollbar({
          setHeight: '100%',
          theme: "minimal-dark",
          scrollbarPosition: "inside"
        });
      }else{
        $.ajax({
          // url: "/v1/land/findAll",
          url: "/v1/highQualityEvaluation/companyHighQuality2",
          type:"GET",
          dataType:"json",
          data:{},
          success:function(res){
            // console.log(11,res);
            HighQualityListData = res;

            newCreatElectronLivingCateLandSingle(map,type);
            $(".right-top-land-infowindow .icon-ctrl-scroll").mCustomScrollbar({
              setHeight: '100%',
              theme: "minimal-dark",
              scrollbarPosition: "inside"
            });
          }
        })
      }
    }else{
      indexeDBmethod.byIndexGet('landData','dataPolygonHighEnterpriseLands',function(res){
        var dbData = res;
        dataPolygonHighEnterpriseLands = dbData ? dbData.data : dataPolygonHighEnterpriseLands;
        if ( dataPolygonHighEnterpriseLands.length > 0) {
          /!*从indexedDB取数据*!/
          // creatElectronLivingCateLandSingle(map,type);
          /!*判断是否存在综合评价的企业列表*!/
          if(HighQualityListData.length > 0){
            newCreatElectronLivingCateLandSingle(map,type);
            $(".right-top-land-infowindow .icon-ctrl-scroll").mCustomScrollbar({
              setHeight: '100%',
              theme: "minimal-dark",
              scrollbarPosition: "inside"
            });
          }else{
            $.ajax({
              // url: "/v1/land/findAll",
              url: "/v1/highQualityEvaluation/companyHighQuality2",
              type:"GET",
              dataType:"json",
              data:{},
              success:function(res){
                // console.log(11,res);
                HighQualityListData = res;

                newCreatElectronLivingCateLandSingle(map,type);
                $(".right-top-land-infowindow .icon-ctrl-scroll").mCustomScrollbar({
                  setHeight: '100%',
                  theme: "minimal-dark",
                  scrollbarPosition: "inside"
                });
              }
            })
          }
        } else {
          // var time = new Date().getFullYear()-1;
          var time = 2016;
          /!*获取所有综合评分的企业列表数据*!/
          $.ajax({
            // url: "/v1/land/findAll",
            url: "/v1/highQualityEvaluation/companyHighQuality",
            // url: "/v1/highQualityEvaluation/companyHighQuality2",
            type:"GET",
            dataType:"json",
            data:{},
            success:function(res){
              console.log(res);
              highQualityAllData = {};
              res.forEach(function(v,i){
                for(var value in v.highQuality){
                  var result = {};
                  result.id = v.company.id;
                  result.coordinate = v.company.coordinate;
                  result.industryType = v.company.industryType;
                  result.name = v.company.name;
                  result.qualityNum = v.highQuality[value];
                  if(highQualityAllData[value]){
                    if(highQualityAllData[value][v.company.industryType]){
                      highQualityAllData[value][v.company.industryType].push(result);
                    }else{
                      highQualityAllData[value][v.company.industryType] = [];
                      highQualityAllData[value][v.company.industryType].push(result);
                    }
                  }else{
                    highQualityAllData[value] = {};
                    highQualityAllData[value][v.company.industryType] = [];
                    highQualityAllData[value][v.company.industryType].push(result);
                  }
                }
              });
              // console.log(highQualityAllData)
              // localStorage.setItem('highQualityAllData', JSON.stringify(highQualityAllData));

              var indexedDBdata = {type: 'highQualityAllData', data: highQualityAllData};
              indexeDBmethod.add('landData',indexedDBdata);
              getHighEnterpriseLandData();
            }
          });

          /!*获取概况信息*!/
          $.ajax({
            // url: "/v1/land/findAll",
            url: "/v1/highQualityEvaluation/companyHighQualityTop10Proportion",
            type:"GET",
            dataType:"json",
            data:{year: time,companyIndustryType: type},
            success:function(res){
              // console.log(11,res);
              var tpl = `<div class="text-c">
                    <div id="top10-proportion" style="width:100%;height: 200px;"></div>
                </div>`;
              $(".right-top-land-infowindow .title").html('高质量企业概况')
              $(".right-top-land-infowindow .icon-ctrl-scroll-con").html(tpl);

              creatHighEnterpriseTop10Proportion({},'前10名营业收入',res);
              if(HighQualityListData.length > 0){
                var lists = [];
                HighQualityListData.forEach(function(v,i){
                  if(v.year == time && v.companyIndustryType == type){
                    lists.push(v);
                  }
                });
                var tpl = ``;
                var listTpl = ``;
                lists.forEach(function (v,i) {
                  listTpl += `<div class="land-company-item company-item flex" data-company="${v.companyName}">
                        <div class="logo">
                            ${i+1}
                        </div>
                        <div class="item name flex-cell"><div class="top-label">${v.companyName}</div></div>
                        <div class="jingji"><div class="top-label">${Number(v.highQuality.toFixed(2))}</div></div>
                    </div>`
                });
                tpl = `<div class="high-enterprise-company-bd">
                    <div class="company-con">
                        <div class="public-title"><span class="title">企业列表</span></div>
                        <div class="company-list high-enterprise-list-box">
                            ${listTpl}
                        </div>
                    </div>
                </div>`;
                $(".right-top-land-infowindow .icon-ctrl-scroll-con").append(tpl)
              }else{
                $.ajax({
                  // url: "/v1/land/findAll",
                  url: "/v1/highQualityEvaluation/companyHighQuality2",
                  type:"GET",
                  dataType:"json",
                  data:{},
                  success:function(res){
                    // console.log(11,res);
                    HighQualityListData = res;
                    var lists = [];
                    res.forEach(function(v,i){
                      if(v.year == time && v.companyIndustryType == '生物医药'){
                        lists.push(v);
                      }
                    });
                    var tpl = ``;
                    var listTpl = ``;
                    lists.forEach(function (v,i) {
                      listTpl += `<div class="land-company-item company-item flex" data-company="${v.companyName}">
                            <div class="logo">
                                ${i+1}
                            </div>
                            <div class="item name flex-cell"><div class="top-label">${v.companyName}</div></div>
                            <div class="jingji"><div class="top-label">${Number(v.highQuality.toFixed(2))}</div></div>
                        </div>`
                    });
                    tpl += `<div class="high-enterprise-company-bd">
                    <div class="company-con">
                        <div class="public-title"><span class="title">企业列表</span></div>
                        <div class="company-list high-enterprise-list-box">
                            ${listTpl}
                        </div>
                    </div>
                </div>`;
                    $(".right-top-land-infowindow .icon-ctrl-scroll-con").append(tpl)
                  }
                })
              }
            }
          });


          // creatEcoLand(map,time);
          function getHighEnterpriseLandData(){
            var industryCat = ["生物医药","电子信息","先进制造"];
            var countNum = 0;
            var ecoLandCopy = [];
            var ecoLandList = [];
            var startTime = +new Date();
            for(var i=0;i<industryCat.length;i++){
              console.log("开始分类梯度请求",+new Date())
              creatHighEnterpriseLandStep(map,time,industryCat[i],function(options){
                countNum++;
                ecoLandCopy.push(options);
                if(countNum == industryCat.length){
                  for(var i=0;i<ecoLandCopy.length;i++){
                    for(var j=0;j<ecoLandCopy[i].length;j++)
                      ecoLandList.push(ecoLandCopy[i][j])
                  }
                  /!*ecoLandList所有的梯度数据*!/
                  groupHighEnterpriseLandStep(map,ecoLandList,time);
                }
                // map.setFitView();
                // map.setZoom(14);
              });
            };
            $(".right-top-land-infowindow .icon-ctrl-scroll").mCustomScrollbar({
              setHeight: '100%',
              theme: "minimal-dark",
              scrollbarPosition: "inside"
            });
          }
        }
      })

    }*/

    $(".time-colors-panel").show();
    $(".time-colors-panel").css({"right":"420px"});
    // $(".industry-last-colors-panel").show();
    // $(".industry-last-colors-panel").css({"right":"720px"});
    // $(".land-choose-time").show();
    // $(".datetimepicker-top-box").show();
    $(".eco-color-xh").show().siblings().hide();
    $(".scale-enterprise-color-panel").show();
    $(this).addClass("active");
    $(this).parents(".item").addClass("active");

    // $(".industry-menu .menu-row:last-child li").show();
    // map.setFitView();
    // map.panBy(-580, 40);
  }
});
/*产业高质量企业--首次获取默认时间的地块数据*/
function getHighQualityEnterpriseLandData(time,type) {
  var type = type;
  var time = time;
  /*判断是否存在规上规下的企业数据*/
  if(scaleEnterpriseAllData[type].length > 0){
    creatFirstHighEnterpriseScaleLand(time,type);
  }else{
    getHighQualityEnterpriseScaleData(time,type);
  }
  // $(".right-top-land-infowindow .icon-ctrl-scroll").mCustomScrollbar({
  //   setHeight: '100%',
  //   theme: "minimal-dark",
  //   scrollbarPosition: "inside"
  // });
}
/*按照产业类型查询所有高质量的地块数据并绘制规上和规下*/
function creatFirstHighEnterpriseScaleLand(time,type){
  var type = type;
  var time = time;
  var industryCat = ["生物医药","电子信息","先进制造"];
  var countNum = 0;
  var ecoLandCopy = [];
  var ecoLandList = [];
  for(var i=0;i<industryCat.length;i++){
    console.log("开始分类梯度请求",+new Date())
    creatHighEnterpriseLandStep(map,time,industryCat[i],function(options){
      countNum++;
      ecoLandCopy.push(options);
      if(countNum == industryCat.length){
        for(var i=0;i<ecoLandCopy.length;i++){
          for(var j=0;j<ecoLandCopy[i].length;j++)
            ecoLandList.push(ecoLandCopy[i][j])
        }
        /*ecoLandList所有的梯度数据*/
        groupHighEnterpriseScaleUpLandStep(map,ecoLandList,time,type);
      }
      // map.setFitView();
      // map.setZoom(14);
    });
  };
}
/*产业高质量企业--首次查询默认时间的规上规下数据*/
function getHighQualityEnterpriseScaleData(time,type) {
  var type = type;
  var time = time;
  var lists1 = [];
  var lists2 = [];
  /*判断展示规上还是规下*/
  if(type == 'up'){
    /*规上企业单一业主综合评分信息*/
    $.ajax({
      url: './jsonData/overallRatingInfo'+time+'.json',
      type: 'GET',
      dataType: 'json',
      data: {year: time},
      success: function(res){
        // console.log(res)
        lists1 = res;
        // scaleEnterpriseAllData.up = lists1;
        // var indexedDBdata = {type: 'scaleEnterpriseAllData', data: scaleEnterpriseAllData};
        // indexeDBmethod.add('landData',indexedDBdata);
        // creatScaleEnterpriseLandSingleAgain(map,type,time,dataPolygonNatureLands)
        /*规上企业非单一业主综合评分信息*/
        $.ajax({
          url: './jsonData/aboveNoSingleOverallRatingInfo'+time+'.json',
          type: 'GET',
          dataType: 'json',
          data: {year: time},
          success: function(res){
            // console.log(res)
            lists2 = res;
            var data = lists1.concat(lists2);
            scaleEnterpriseAllData.up = data.sort(compareFn('score','desc'));
            var indexedDBdata = {type: 'scaleEnterpriseAllData', data: scaleEnterpriseAllData};
            indexeDBmethod.add('landData',indexedDBdata);
            creatFirstHighEnterpriseScaleLand(time,type);
          },error: function(err) {
            console.log(err)
          }
        });
      },error: function(err) {
        console.log(err)
      }
    })
  }else{
    /*规下企业单一业主综合评分信息*/
    $.ajax({
      url: './jsonData/blowSingleOverallRatingInfo'+time+'.json',
      type: 'GET',
      dataType: 'json',
      data: {year: time},
      success: function(res){
        // console.log(res)
        lists1 = res;
        // scaleEnterpriseAllData.down = lists1;
        // var indexedDBdata = {type: 'scaleEnterpriseAllData', data: scaleEnterpriseAllData};
        // indexeDBmethod.add('landData',indexedDBdata);
        // creatScaleEnterpriseLandSingleAgain(map,type,time,dataPolygonNatureLands)
        /*规下企业非单一业主综合评分信息*/
        $.ajax({
          url: '/v1/blowNoSingleOverallRating/findAllBelowOverallRatingInfo',
          type: 'GET',
          dataType: 'json',
          data: {year: time},
          success: function(res){
            // console.log(res)
            lists2 = res;
            var data = lists1.concat(lists2);
            scaleEnterpriseAllData.down = data.sort(compareFn('score','desc'));
            var indexedDBdata = {type: 'scaleEnterpriseAllData', data: scaleEnterpriseAllData};
            indexeDBmethod.add('landData',indexedDBdata);
            creatFirstHighEnterpriseScaleLand(time,type);
          },error: function(err) {
            console.log(err)
          }
        });
      },error: function(err) {
        console.log(err)
      }
    })

  }
}
/*点击高质量产业分布图列*/
function indeustryColorsSwitch() {
  /*修改为绘制一种产业*/
  var emList = $(".eco-color-xh").find(".color-blank");
  var type = null;
  $.each(emList,function(v,i){
    if($(this).hasClass("active")){
      type = $(this).data("catname");
    }
  });
  type = type == 'living' ? '生物医药' : type == 'electron' ? '电子信息' : '先进制造';
  var time = $(".datetimepicker-top-box input").val();

  $(".eco-color-xh .color-item").addClass("active");
  // dataPolygonHighEnterpriseLands = localStorage.getItem('dataPolygonHighEnterpriseLands') ? JSON.parse(localStorage.getItem('dataPolygonHighEnterpriseLands')) : dataPolygonHighEnterpriseLands;
  // highQualityAllData = localStorage.getItem('highQualityAllData') ? JSON.parse(localStorage.getItem('highQualityAllData')) : highQualityAllData;
  /*判断内存是否已存在数据*/
  if(dataPolygonHighEnterpriseLands.length > 0){
    /*判断是否存在综合评价的企业列表*/
    if(HighQualityListData.length > 0){
      newCreatElectronLivingCateLandSingle(map,type);
      $(".right-top-land-infowindow .icon-ctrl-scroll").mCustomScrollbar({
        setHeight: '100%',
        theme: "minimal-dark",
        scrollbarPosition: "inside"
      });
    }else{
      $.ajax({
        // url: "/v1/land/findAll",
        url: "./jsonData/companyHighQuality2.json",
        type:"GET",
        dataType:"json",
        data:{},
        success:function(res){
          // console.log(11,res);
          HighQualityListData = res;

          newCreatElectronLivingCateLandSingle(map,type);
          $(".right-top-land-infowindow .icon-ctrl-scroll").mCustomScrollbar({
            setHeight: '100%',
            theme: "minimal-dark",
            scrollbarPosition: "inside"
          });
        }
      })
    }
  }else{
    indexeDBmethod.byIndexGet('landData','dataPolygonHighEnterpriseLands',function(res){
      var dbData = res;
      dataPolygonHighEnterpriseLands = dbData ? dbData.data : dataPolygonHighEnterpriseLands;
      if ( dataPolygonHighEnterpriseLands.length > 0) {
        /*从indexedDB取数据*/
        // creatElectronLivingCateLandSingle(map,type);
        /*判断是否存在综合评价的企业列表*/
        if(HighQualityListData.length > 0){
          newCreatElectronLivingCateLandSingle(map,type);
          $(".right-top-land-infowindow .icon-ctrl-scroll").mCustomScrollbar({
            setHeight: '100%',
            theme: "minimal-dark",
            scrollbarPosition: "inside"
          });
        }else{
          $.ajax({
            // url: "/v1/land/findAll",
            url: "./jsonData/companyHighQuality2.json",
            type:"GET",
            dataType:"json",
            data:{},
            success:function(res){
              // console.log(11,res);
              HighQualityListData = res;

              newCreatElectronLivingCateLandSingle(map,type);
              $(".right-top-land-infowindow .icon-ctrl-scroll").mCustomScrollbar({
                setHeight: '100%',
                theme: "minimal-dark",
                scrollbarPosition: "inside"
              });
            }
          })
        }
      } else {
        // var time = new Date().getFullYear()-1;
        var time = $(".datetimepicker-scale-enterprise input").val();
        /*获取所有综合评分的企业列表数据*/
        $.ajax({
          // url: "/v1/land/findAll",
          url: "/v1/highQualityEvaluation/companyHighQuality",
          // url: "/v1/highQualityEvaluation/companyHighQuality2",
          type:"GET",
          dataType:"json",
          data:{},
          success:function(res){
            console.log(res);
            highQualityAllData = {};
            res.forEach(function(v,i){
              for(var value in v.highQuality){
                var result = {};
                result.id = v.company.id;
                result.coordinate = v.company.coordinate;
                result.industryType = v.company.industryType;
                result.name = v.company.name;
                result.qualityNum = v.highQuality[value];
                if(highQualityAllData[value]){
                  if(highQualityAllData[value][v.company.industryType]){
                    highQualityAllData[value][v.company.industryType].push(result);
                  }else{
                    highQualityAllData[value][v.company.industryType] = [];
                    highQualityAllData[value][v.company.industryType].push(result);
                  }
                }else{
                  highQualityAllData[value] = {};
                  highQualityAllData[value][v.company.industryType] = [];
                  highQualityAllData[value][v.company.industryType].push(result);
                }
              }
            });
            // console.log(highQualityAllData)
            // localStorage.setItem('highQualityAllData', JSON.stringify(highQualityAllData));

            var indexedDBdata = {type: 'highQualityAllData', data: highQualityAllData};
            indexeDBmethod.add('landData',indexedDBdata);
            getHighEnterpriseLandData();
          }
        });

        /*获取概况信息*/
        $.ajax({
          // url: "/v1/land/findAll",
          url: "/v1/highQualityEvaluation/companyHighQualityTop10Proportion",
          type:"GET",
          dataType:"json",
          data:{year: time,companyIndustryType: type},
          success:function(res){
            // console.log(11,res);
            var tpl = `<div class="text-c">
                    <div id="top10-proportion" style="width:100%;height: 200px;"></div>
                </div>`;
            $(".right-top-land-infowindow .title").html('高质量企业概况')
            $(".right-top-land-infowindow .icon-ctrl-scroll-con").html(tpl);

            creatHighEnterpriseTop10Proportion({},'前10名营业收入',res);
            if(HighQualityListData.length > 0){
              var lists = [];
              HighQualityListData.forEach(function(v,i){
                if(v.year == time && v.companyIndustryType == type){
                  lists.push(v);
                }
              });
              var tpl = ``;
              var listTpl = ``;
              lists.forEach(function (v,i) {
                listTpl += `<div class="land-company-item company-item flex" data-company="${v.companyName}">
                        <div class="logo">
                            ${i+1}
                        </div>
                        <div class="item name flex-cell"><div class="top-label">${v.companyName}</div></div>
                        <div class="jingji"><div class="top-label">${Number(v.highQuality.toFixed(2))}</div></div>
                    </div>`
              });
              tpl = `<div class="high-enterprise-company-bd">
                    <div class="company-con">
                        <div class="public-title"><span class="title">企业列表</span></div>
                        <div class="company-list high-enterprise-list-box">
                            ${listTpl}
                        </div>
                    </div>
                </div>`;
              $(".right-top-land-infowindow .icon-ctrl-scroll-con").append(tpl)
            }else{
              $.ajax({
                // url: "/v1/land/findAll",
                url: "./jsonData/companyHighQuality2.json",
                type:"GET",
                dataType:"json",
                data:{},
                success:function(res){
                  // console.log(11,res);
                  HighQualityListData = res;
                  var lists = [];
                  res.forEach(function(v,i){
                    if(v.year == time && v.companyIndustryType == '生物医药'){
                      lists.push(v);
                    }
                  });
                  var tpl = ``;
                  var listTpl = ``;
                  lists.forEach(function (v,i) {
                    listTpl += `<div class="land-company-item company-item flex" data-company="${v.companyName}">
                            <div class="logo">
                                ${i+1}
                            </div>
                            <div class="item name flex-cell"><div class="top-label">${v.companyName}</div></div>
                            <div class="jingji"><div class="top-label">${Number(v.highQuality.toFixed(2))}</div></div>
                        </div>`
                  });
                  tpl += `<div class="high-enterprise-company-bd">
                    <div class="company-con">
                        <div class="public-title"><span class="title">企业列表</span></div>
                        <div class="company-list high-enterprise-list-box">
                            ${listTpl}
                        </div>
                    </div>
                </div>`;
                  $(".right-top-land-infowindow .icon-ctrl-scroll-con").append(tpl)
                }
              })
            }
          }
        });


        // creatEcoLand(map,time);
        function getHighEnterpriseLandData(){
          var industryCat = ["生物医药","电子信息","先进制造"];
          var countNum = 0;
          var ecoLandCopy = [];
          var ecoLandList = [];
          var startTime = +new Date();
          for(var i=0;i<industryCat.length;i++){
            console.log("开始分类梯度请求",+new Date())
            creatHighEnterpriseLandStep(map,time,industryCat[i],function(options){
              countNum++;
              ecoLandCopy.push(options);
              if(countNum == industryCat.length){
                for(var i=0;i<ecoLandCopy.length;i++){
                  for(var j=0;j<ecoLandCopy[i].length;j++)
                    ecoLandList.push(ecoLandCopy[i][j])
                }
                /*ecoLandList所有的梯度数据*/
                groupHighEnterpriseLandStep(map,ecoLandList,time);
              }
              // map.setFitView();
              // map.setZoom(14);
            });
          };
          $(".right-top-land-infowindow .icon-ctrl-scroll").mCustomScrollbar({
            setHeight: '100%',
            theme: "minimal-dark",
            scrollbarPosition: "inside"
          });
        }
      }
    })

  }

  $(".time-colors-panel").show();
  $(".time-colors-panel").css({"right":"420px"});
  $(".industry-last-colors-panel").show();
  // $(".industry-last-colors-panel").css({"right":"720px"});
  // $(".land-choose-time").show();
  // $(".datetimepicker-top-box").show();
  $(".eco-color-xh").show().siblings().hide();
  $(".scale-enterprise-color-panel").show();
  $(this).addClass("active");
  $(this).parents(".item").addClass("active");
}
var highQualityAllData = null;
/*关闭面板*/
$(".close-pop").on("click",function(){
  $(".pop-box").removeClass("zoomIn").addClass("zoomOut");
  $(".pop-box").hide();
  if(polygons != undefined && polygons.lands.length>0){
    for(var i=0;i<polygons.lands.length;i++){
      /*避免窗口自动关闭时覆盖点击的地块颜色*/
      if(polygons.lands[i].getExtData().slected){
        polygons.lands[i].setOptions({strokeColor:"#fff",fillColor:polygons.lands[i].getExtData().color});
        var oldExtData = polygons.lands[i].getExtData();//先保存原始ExtData数据
        oldExtData.slected = false;//改变之前选中的状态为false
        polygons.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
      }

    }
  }
  if(polygonEcoLands != undefined && polygonEcoLands.lands.length>0){
    for(var i=0;i<polygonEcoLands.lands.length;i++){
      /*避免窗口自动关闭时覆盖点击的地块颜色*/
      if(polygonEcoLands.lands[i].getExtData().slected){
        polygonEcoLands.lands[i].setOptions({strokeColor:"#fff",fillColor:polygonEcoLands.lands[i].getExtData().color});
        var oldExtData = polygonEcoLands.lands[i].getExtData();//先保存原始ExtData数据
        oldExtData.slected = false;//改变之前选中的状态为false
        polygonEcoLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
      }

    }
  }
  if(polygonTopLands != undefined && polygonTopLands.lands.length>0){
    for(var i=0;i<polygonTopLands.lands.length;i++){
      /*避免窗口自动关闭时覆盖点击的地块颜色*/
      if(polygonTopLands.lands[i].getExtData().slected){
        polygonTopLands.lands[i].setOptions({strokeColor:"#fff",fillColor:polygonTopLands.lands[i].getExtData().color});
        var oldExtData = polygonTopLands.lands[i].getExtData();//先保存原始ExtData数据
        oldExtData.slected = false;//改变之前选中的状态为false
        polygonTopLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
      }

    }
  }
  if(polygonAlls != undefined && polygonAlls.lands.length>0){
    for(var i=0;i<polygonAlls.lands.length;i++){
      /*避免窗口自动关闭时覆盖点击的地块颜色*/
      if(polygonAlls.lands[i].getExtData().slected){
        polygonAlls.lands[i].setOptions({strokeColor:"#fff",fillColor:polygonAlls.lands[i].getExtData().color});
        var oldExtData = polygonAlls.lands[i].getExtData();//先保存原始ExtData数据
        oldExtData.slected = false;//改变之前选中的状态为false
        polygonAlls.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
      }

    }
  }
  if(polygonNatureLands != undefined && polygonNatureLands.lands.length>0){
    for(var i=0;i<polygonNatureLands.lands.length;i++){
      /*避免窗口自动关闭时覆盖点击的地块颜色*/
      if(polygonNatureLands.lands[i].getExtData().slected){
        polygonNatureLands.lands[i].setOptions({strokeColor:"#fff",fillColor:polygonNatureLands.lands[i].getExtData().color});
        var oldExtData = polygonNatureLands.lands[i].getExtData();//先保存原始ExtData数据
        oldExtData.slected = false;//改变之前选中的状态为false
        polygonNatureLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
      }

    }
  }
  if(polygonInefficients != undefined && polygonInefficients.lands.length>0){
    for(var i=0;i<polygonInefficients.lands.length;i++){
      /*避免窗口自动关闭时覆盖点击的地块颜色*/
      if(polygonInefficients.lands[i].getExtData().slected){
        polygonInefficients.lands[i].setOptions({strokeColor:"#fff",fillColor:polygonInefficients.lands[i].getExtData().color});
        var oldExtData = polygonInefficients.lands[i].getExtData();//先保存原始ExtData数据
        oldExtData.slected = false;//改变之前选中的状态为false
        polygonInefficients.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
      }

    }
  }
  if(polygonTopCompanyLands != undefined && polygonTopCompanyLands.lands.length>0){
    for(var i=0;i<polygonTopCompanyLands.lands.length;i++){
      /*避免窗口自动关闭时覆盖点击的地块颜色*/
      if(polygonTopCompanyLands.lands[i].getExtData().slected){
        polygonTopCompanyLands.lands[i].setOptions({strokeColor:"#fff",fillColor:polygonTopCompanyLands.lands[i].getExtData().color});
        var oldExtData = polygonTopCompanyLands.lands[i].getExtData();//先保存原始ExtData数据
        oldExtData.slected = false;//改变之前选中的状态为false
        polygonTopCompanyLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
      }

    }
  }
});

$(".choose-park-buid").on("click",function(){
  $("#myList").toggle("fast");
  $(".build-arrow").toggleClass("active");
})

$(".choose-park-buid").on("click",function(){
  $("#myList").toggle("fast");
  $(".build-arrow").toggleClass("active");
})
/*企业详情*/
$(".land-panel-con").on("click",".land-company-item,.land-unit-detail,.own-company .name,.high-enterprise-own-name",function(){
  var companyName = $(this).data("company");
  var enterType = $(this).data("type");
  if(companyName){
    $('.close-company-detail').data('back',false);
    /*切换回基本信息显示*/
    $(".land-company-detail-tab .detail-tab-item").eq(0).addClass("active").siblings().removeClass("active");
    $(".land-company-detail .land-company-detail-con").eq(0).show().siblings().hide();
    $.ajax({
      url: './jsonData/findCompanyByName.json',
      // url: '/v1/company/findCompanyParam',
      type: "GET",
      dataType: "json",
      data: {
        name: companyName
        // companyName: '四川光恒通信技术有限公司'
      },
      success: function (res) {
        console.log(res)
        var data = res.company;
        var radarData = res.obj;
        $(".microcosmic_container").hide();
        $(".land-company-detail-box").show().removeClass("slideOutRight").addClass("slideInRight");
        var logoSrc = data.companyIcon ? data.companyIcon : './images/company_list_logo.png';
        $(".land-company-detail-hd .company-detail-title .logo").attr("src",logoSrc);
        $(".land-company-detail-hd .company-detail-title .title").html(companyName);
        var personnelTpl = '<table class="table table-bordered"><tr><th>年份</th><th>人数(人)</th></tr>';
        var actualTaxTpl = '<table class="table table-bordered"><tr><th>年份</th><th>税收(千元)</th></tr>';
        var supportAmountTpl = '<table class="table table-bordered"><tr><th>年份</th><th>补贴(千元)</th></tr>';
        var foulWaterTpl = '<table class="table table-bordered"><tr><th>年份</th><th>排污(kg)</th></tr>';
        var productTpl = '<table class="table table-bordered"><tr><th>年份</th><th>产品</th></tr>';
        data.chains = data.chains.sort(compareFn('year','desc'));
        data.chains.forEach(function(v,i){
          personnelTpl += `<tr><td>${v.year}</td><td>${v.numberOfEmployees ? v.numberOfEmployees : "未知"}</td></tr>`;
          actualTaxTpl += `<tr><td>${v.year}</td><td>${v.actualTax ? v.actualTax : "未知"}</td></tr>`;
          supportAmountTpl += `<tr><td>${v.year}</td><td>${v.supportAmount ? v.supportAmount : "未知"}</td></tr>`;
          foulWaterTpl += `<tr><td>${v.year}</td><td>${v.emissionsRights ? v.emissionsRights : "未知"}</td></tr>`;
          productTpl += `<tr><td>${v.year}</td><td>${v.product ? v.product : "未知"}</td></tr>`;
        });
        personnelTpl += `</table>`;
        actualTaxTpl += `</table>`;
        supportAmountTpl += `</table>`;
        foulWaterTpl += `</table>`;
        productTpl += `</table>`;
        $("#personnel").html(personnelTpl);
        $("#product").html(productTpl);
        $("#foul-water").html(foulWaterTpl);
        $("#tax-revenue").html(actualTaxTpl);
        $("#enterprise-subsidy").html(supportAmountTpl);
        $("#scale-type").html(`${data.regulatoryCompanies ? data.regulatoryCompanies : '未知'}`);
        $("#has-land").html(`${data.isHasLand ? data.isHasLand : '未知'}`);
        var registerTpl = `<table class="table table-bordered">
                              <tr><td class="nowrap">地址(住所)</td><td>${data.address ? data.address : '未知'}</td><td class="nowrap">统一社会信用代码</td><td>${data.creditCode ? data.creditCode : '未知'}</td></tr>
                              <tr><td class="nowrap">组织机构代码</td><td>${data.organizationCode ? data.organizationCode : '未知'}</td><td class="nowrap">企业类型</td><td>${data.enterpriseType ? data.enterpriseType : '未知'}</td></tr>
                              <tr><td class="nowrap">行业类型</td><td>${data.industryType ? data.industryType : '未知'}</td><td class="nowrap">注册资本</td><td>${data.funds ? data.funds : '未知'}</td></tr>
                              <tr><td class="nowrap">注册资本币种</td><td>${data.currencyType ? data.currencyType : "未知"}</td><td class="nowrap">成立时间</td><td>${timestampToTime(data.establishTime)}</td></tr>
                              <tr><td class="nowrap">营业期限自</td><td>${timestampToTime(data.operatingPeriodStrat)}</td><td class="nowrap">营业期限至</td><td>${timestampToTime(data.operatingPeriodEnd)}</td></tr>
                              <tr><td class="nowrap">经营范围</td><td colspan="3">${data.range}</td></tr>
                              <tr><td class="nowrap">登记机关</td><td colspan="3">${data.registrationAuthority ? data.registrationAuthority : "未知"}</td></tr>
                              <tr><td class="nowrap">登记状态</td><td>${data.registrationType ? data.registrationType : "未知"}</td><td class="nowrap">核准日期</td><td>${timestampToTime(data.approvedTime)}</td></tr>
                            </table>`;

        $(".company-detail-register").html(registerTpl);
        // creatShouruEcharts(data.chains);
        // creatChanzhiEcharts(data.chains);
        // creatEnergyEcharts(data.chains);
        creatCompanyDetailEcharts(data.chains);
        /*判断是否在综合评价菜单进入详情*/
        if(enterType){
          var time = $(".datetimepicker-scale-enterprise input").val();
          /*获取规上规下综合评分*/
          $.ajax({
            url: "./jsonData/highQualityNewName.json",
            type:"GET",
            dataType:"json",
            data:{year: time,companyName: companyName},
            success:function(res){
              if(enterType == 'scaleup'){
                /*规上综合评价*/
                creatScaleEnterpriseRadarEcharts(res,'scaleEnterprise');
              }else if(enterType == 'scaledown'){
                /*规下综合评价*/
                creatScaleDownEnterpriseRadarEcharts(res,'scaleEnterprise');
              }
            }
          });
        }else{
          /*高质量综合评价*/
          creatRadarEcharts(radarData);
        }
        /*企业资质信息*/
        getCompanyAptitudeInfo(data.certifications);
        /*企业正负面信息--信用*/
        getCompanyCreditInfo(data.positiveCredit,data.negativeCredit);
        /*企业政府土地补贴*/
        getCompanyLandSubsidies(companyName);
        /*税务登记信息*/
        getCompanyTaxationsInfo(data.taxations);
        /*商标信息*/
        getCompanyTrademarkInfo();
        /*查询专利信息*/
        $.ajax({
          url: './jsonData/findCompanyParam.json',
          type: "GET",
          dataType: "json",
          data: {
            companyName:companyName
          },
          success: function (res) {
            var data = res.patent;
            /*专利信息*/
            getCompanyPatentInfo(data);
          },error: function(err){

          }
        });
        /*查询企业所属机构信息*/
        $.ajax({
          url: './jsonData/getByRelyUnit.json',
          type: "GET",
          dataType: "json",
          data: {
            companyName:companyName
          },
          success: function (res) {
            var data = res;
            /*所属机构*/
            getCompanyOwnMechanismInfo(data);
          },error: function(err){

          }
        });

        /*软件著作权信息*/
        getCompanyCopyrightInfo();
        /*作品著作权信息*/
        getCompanyWorksCopyrightInfo();
        /*ICP信息*/
        getCompanyICPCopyrightInfo();

        $(".land-company-detail-con").mCustomScrollbar({
          setHeight: '100%',
          theme: "minimal-dark",
          scrollbarPosition: "inside"
        });
      },
      error: function (err) {
        console.log(err)
      }
    })
  }
});
/*产业分布概况企业列表进入详情*/
$('.industry-company-list-panel').on('click','.land-company-row ',function(){
  var name = $(this).data('company');
  getCompanyInfomations(name);
});
function creatShouruEcharts(options) {
  var myChart = echarts.init(document.getElementById('business-income'));
  var dataAxis = [];
  var yMax = 500;
  var dataShadow = [];
  // const tu1 = JSON.parse(options.income);
  const tu1 = options;
  tu1.sort(compareFn('year'));
  var data = [];
  for (var i = 0; i < tu1.length; i++) {
    if (tu1[i].year !== String(new Date().getFullYear())) {
      data.push(tu1[i].mainIncome);
      dataAxis.push(tu1[i].year);
    }
  }
  /*7年*/
  if (data.length > 7) {
    data = data.slice(data.length - 7, data.length);
    dataAxis = dataAxis.slice(dataAxis.length - 7, dataAxis.length);
  }

  /*for (let i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
  }*/

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: function (params) {
        var tar = params[0];
        // console.log(tar)
        return tar.name + '年总收入' + ' : ' + tar.value + '万';
      }
    },
    title: {
      text: '公司几年内收入变化图',
      left: 'center', // 居中
      top: 20, // 距离上边框距离
      textStyle: {
        color: '#bcbdbf'          // 主标题文字颜色
      }
    },
    xAxis: {
      name: '年份',
      nameTextStyle: {
        color: '#bcbdbf'
      },
      position: 'bottom',
      data: dataAxis,
      axisLabel: {
        inside: true,
        textStyle: {
          color: '#fff'
        }
      },
      axisTick: {
        show: true
      },
      axisLine: {
        show: true
      },
      z: 10
    },
    yAxis: {
      name: '总销量(万)',
      nameTextStyle: {
        color: '#bcbdbf'
      },
      axisLine: {
        show: true
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        textStyle: {
          color: '#bcbdbf'
        }
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      { // For shadow
        type: 'bar',
        itemStyle: {
          normal: { color: 'rgba(0,0,0,0.05)' }
        },
        barGap: '-100%',
        barCategoryGap: '40%',
        data: dataShadow,
        animation: false
      },
      {
        type: 'bar',
        itemStyle: {
          normal: {
            color: '#1eb5d4'
          },
          emphasis: {
            color: '#1eb5d4'
          }
        },
        label: {
          normal: {
            show: true,
            position: 'top',
            formatter: function (params) {
              return params.data + '万';
            }
          }
        },
        data: data
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}
function creatCompanyDetailEcharts(options) {
  var myChart = echarts.init(document.getElementById('business-income'));
  var legendData = ['营业收入','产值','能耗'];
  var xAxisData = [];
  var seriesData = [
    {
      name:'营业收入',
      type:'line',
      data:[]
    },
    {
      name:'产值',
      type:'line',
      data:[]
    },
    {
      name:'能耗',
      type:'line',
      yAxisIndex: 1,
      data:[]
    }
  ];
  // const tu1 = JSON.parse(options.income);
  const tu1 = options;
  tu1.sort(compareFn('year'));
  for (var i = 0; i < tu1.length; i++) {
    if (tu1[i].year !== String(new Date().getFullYear())) {
      seriesData[0].data.push(tu1[i].mainIncome);
      seriesData[1].data.push(tu1[i].outputValue);
      seriesData[2].data.push(tu1[i].energyConsumption);
      xAxisData.push(tu1[i].year);
    }
  }
  /*7年*/
  /*if (seriesData[0].data.length > 7) {
    seriesData[0].data = seriesData[0].data.slice(seriesData[0].data.length - 7, seriesData[0].data.length);
    xAxisData = xAxisData.slice(xAxisData.length - 7, xAxisData.length);
  }*/
  if (xAxisData.length > 7) {
    xAxisData = xAxisData.slice(xAxisData.length - 7, xAxisData.length);
  }
  for(var i = 0; i < seriesData.length; i++){
    if (seriesData[i].data.length > 7) {
      seriesData[i].data = seriesData[i].data.slice(seriesData[i].data.length - 7, seriesData[i].data.length);
    }
  }
  /*for (let i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
  }*/

  const option = {
    title: {
      text: '经济与能耗',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: legendData,
      left: 'center',
      top: '10%'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData
    },
    yAxis: [{
      name: '万',
      type: 'value'
    },{
      name: '吨煤',
      type: 'value'
    }],
    series: seriesData
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}
function creatChanzhiEcharts(options) {
  var myChart = echarts.init(document.getElementById('output-value'));
  var dataAxis = [];
  var yMax = 500;
  var dataShadow = [];
  // const tu1 = JSON.parse(options.income);
  var tu1 = options;
  tu1.sort(compareFn('year'));
  var data = [];
  for (var i = 0; i < tu1.length; i++) {
    if (tu1[i].year !== String(new Date().getFullYear())) {
      data.push(tu1[i].outputValue);
      dataAxis.push(tu1[i].year);
    }
  }
  /*7年*/
  if (data.length > 7) {
    data = data.slice(data.length - 7, data.length);
    dataAxis = dataAxis.slice(dataAxis.length - 7, dataAxis.length);
  }

  /*for (let i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
  }*/

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: function (params) {
        var tar = params[0];
        // console.log(tar)
        return tar.name + '年产值' + ' : ' + tar.value + '万';
      }
    },
    title: {
      text: '公司几年内产值变化图',
      left: 'center', // 居中
      top: 20, // 距离上边框距离
      textStyle: {
        color: '#bcbdbf'          // 主标题文字颜色
      }
    },
    xAxis: {
      name: '年份',
      nameTextStyle: {
        color: '#bcbdbf'
      },
      position: 'bottom',
      data: dataAxis,
      axisLabel: {
        inside: true,
        textStyle: {
          color: '#fff'
        }
      },
      axisTick: {
        show: true
      },
      axisLine: {
        show: true
      },
      z: 10
    },
    yAxis: {
      name: '总产值(万)',
      nameTextStyle: {
        color: '#bcbdbf'
      },
      axisLine: {
        show: true
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        textStyle: {
          color: '#bcbdbf'
        }
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      { // For shadow
        type: 'bar',
        itemStyle: {
          normal: { color: 'rgba(0,0,0,0.05)' }
        },
        barGap: '-100%',
        barCategoryGap: '40%',
        data: dataShadow,
        animation: false
      },
      {
        type: 'bar',
        itemStyle: {
          normal: {
            color: '#1eb5d4'
          },
          emphasis: {
            color: '#1eb5d4'
          }
        },
        label: {
          normal: {
            show: true,
            position: 'top',
            formatter: function (params) {
              return params.data + '万';
            }
          }
        },
        data: data
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}
function creatEnergyEcharts(options) {
  var myChart = echarts.init(document.getElementById('energy'));
  var tu1 = options;
  var dataAxis = [];
  tu1.sort(compareFn('year'));
  var data = [];
  for (var i = 0; i < tu1.length; i++) {
    if (tu1[i].year !== String(new Date().getFullYear())) {
      data.push(tu1[i].energyConsumption);
      dataAxis.push(tu1[i].year);
    }
  }
  /*7年*/
  if (data.length > 7) {
    data = data.slice(data.length - 7, data.length);
    dataAxis = dataAxis.slice(dataAxis.length - 7, dataAxis.length);
  }
  var option = {
    xAxis: {
      name: '年',
      type: 'category',
      data: dataAxis
    },
    yAxis: {
      name: '吨煤',
      type: 'value'
    },
    series: [{
      data: data,
      type: 'line'
    }]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}
/*高质量企业综合评价组装*/
function creatRadarEcharts(options) {
  var myChart = echarts.init(document.getElementById('evaluate'));
  var legendData = [];
  var indicatorData = [];
  var seriesData = [];
  console.log(options)
  var copyObj = {};
  /*获取数据里的年份,避免数据没有年份*/
  for(var value in options){
    for(var j in options[value]){
      if(!copyObj[j]){
        copyObj[j] = [];
      }
    }
  }

  for(var value in options){
    /*给没有年份的数据赋值0*/
    for(var year in copyObj){
      if(!options[value][year]){
        options[value][year] = 0;
      }
    }
    /*根据年份分组数据*/
    for(var j in options[value]){
      copyObj[j].push(options[value][j]);
      legendData.push(j);
    }
    indicatorData.push({name:value,min:0});
  }
  /*将分组处理的数据处理为图表数据*/
  for(var i in copyObj){
    seriesData.push({value:copyObj[i],name:i});
  }
  option = {
    title: {
      text: '企业综合评价',
      left: 'center'
    },
    tooltip: {
      position: ['20%','80%'],
    },
    legend: {
      data: legendData,
      top: '10%'
    },
    radar: {
      // shape: 'circle',
      name: {
        textStyle: {
          color: '#fff',
          backgroundColor: '#999',
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      indicator: indicatorData,
      radius: '50%',
      center: ['50%', '60%']
    },
    series: [{
      name: '企业综合评价',
      type: 'radar',
      // areaStyle: {normal: {}},
      data : seriesData
    }]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}
/*土地政府补贴*/
function getCompanyLandSubsidies(companyName) {
  $.ajax({
    url: '/v1/land/findLandAllowance',
    type: 'GET',
    dataType: 'json',
    data: {companyName: companyName},
    success: function(res){
      $("#land-subsidy").html(`${(res/10000).toFixed(2)}万元`);

    },error: function (err) {

    }
  })
}
/*绘制高质量企业雷达图*/
function creatHighQualityRadarEcharts(options) {
  var time = Number($(".datetimepicker-top-box input").val());
  var myChart = echarts.init(document.getElementById('radar-bd'));
  // var legendData = [];
  var legendData = [time];
  var indicatorData = [];
  var seriesData = [];
  console.log(options)
  var copyObj = {};
  /*获取数据里的年份,避免数据没有年份*/
  for(var value in options){
    for(var j in options[value]){
      if(!copyObj[j]){
        copyObj[j] = [];
      }
    }
  }

  for(var value in options){
    /*给没有年份的数据赋值0*/
    for(var year in copyObj){
      if(!options[value][year]){
        options[value][year] = 0;
      }
    }
    /*根据年份分组数据*/
    for(var j in options[value]){
      copyObj[j].push(options[value][j]);
      // legendData.push(j);
    }
    indicatorData.push({name:value,min:0});
  }
  /*将分组处理的数据处理为图表数据*/
  /*for(var i in copyObj){
    seriesData.push({value:copyObj[i],name:i});
  }*/
  seriesData.push({value:copyObj[time],name:time});
  var hoverTips = {'单位排污权增加值':'单位排污权增加值=工业增加值(万元)/核定的排污权(kg)',
    '亩均增加值':'亩均增加值=工业增加值(万元)/用地面积(亩)',
    '全员劳动生产率':'全员劳动生产率=工业增加值(万元)/年平均职工人数(人数）',
    '研究与试验发展经费支出占主营业务收入比重':'研究与试验发展经费支出占主营业务收入比重=研发经费支出(万元)/主营业务收入(万元)',
    '单位能耗增加值':'单位能耗增加值=工业增加值(万元)/综合能耗(吨)',
    '亩均增值税':'亩均增值税=增值税(万元)/用地面积(亩）'};
  var tpl = `<table class="table table-bordered high-enterprise-table">`;
  copyObj[time].forEach(function(v,i){
    console.log(v)
    tpl += `<tr title="${hoverTips[indicatorData[i].name]}" data-hover="${hoverTips[indicatorData[i].name]}"><td class="nowrap">${indicatorData[i].name}</td><td class="">${v}</td></tr>`;
  });
  tpl += `</table>`
  $(".high-enterprise-radar .radar-bt").html(tpl);
  option = {
    title: {
      text: '企业综合评价',
      left: 'center'
    },
    tooltip: {},
    legend: {
      data: legendData,
      top: '10%'
    },
    radar: {
      // shape: 'circle',
      name: {
        textStyle: {
          color: '#fff',
          backgroundColor: '#999',
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      indicator: indicatorData,
      radius: '50%',
      center: ['50%', '60%']
    },
    series: [{
      name: '企业综合评价',
      type: 'radar',
      // areaStyle: {normal: {}},
      data : seriesData
    }]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}
/*格式化排序*/
function compareFn(prop,type) {
  return function (obj1, obj2) {
    var val1 = obj1[prop];
    var val2 = obj2[prop];
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1);
      val2 = Number(val2);
    }
    if(type == 'desc'){
      if (val1 > val2) {
        return -1;
      } else if (val1 < val2) {
        return 1;
      } else {
        return 0;
      }
    }else{
      if (val1 < val2) {
        return -1;
      } else if (val1 > val2) {
        return 1;
      } else {
        return 0;
      }
    }
  };
}
/*ECO单一数据*/
$(".eco-color").on("click",".color-blank",function(){
  /*$(this).parent().toggleClass("active");
  var dataLands = [];
  var chooseCates = $(".eco-color .color-item.active .color-blank");
  /!*处理选中的地块数据*!/
  $.each(chooseCates,function(){
      var catname = $(this).data("catname");
      var dataLandArr = dataPolygonEcoCateLands[catname];
      $.each(dataLandArr,function(){
          dataLands.push(this);
      });
  })
  // var dataLands = dataPolygonEcoCateLands[catname];
  /!*清除所有覆盖物*!/
  map.clearMap();
  creatEcCateLandSingle(map,dataLands);*/
})
/*TOP单一数据*/
$(".top-color").on("click",".color-blank",function(){
  $(this).parent().toggleClass("active");
  var dataLands = [];
  var chooseCates = $(".top-color .color-item.active .color-blank");
  $.each(chooseCates,function(){
    var catname = $(this).data("catname");
    var dataLandArr = dataPolygonTopCateLands[catname];
    $.each(dataLandArr,function(){
      dataLands.push(this);
    });
  })
  /*清除所有覆盖物*/
  map.clearMap();
  creatWestAreaLandRangeCj(map);
  // var catname = $(this).data("catname");
  // var dataLands = dataPolygonTopCateLands[catname];
  creatTopCateLandSingle(map,dataLands);
})
/*用地性质 土地用途*/
$(".build-switch .use-purpose").on("click",function(){
  if(!$(this).hasClass("active")) {
    loadingFullAnimat("zdy-full-cover-mask", "body");
    chooseLanId = null;
    landInfoWindow.close();
    /*单独移除所有polygon*/
    // var allPolygons = polygons.lands.concat(polygonEcoLands.lands,polygonTopLands.lands,polygonNatureLands.lands,polygonInefficients.lands)
    // map.remove(allPolygons)
    // map.remove(map.getAllOverlays("polygon"));
    /*清除所有覆盖物*/
    map.clearMap();

    initControll();
    creatWestAreaLandRangeCj(map,true);

    creatNatureLand(map);

    if ("markerList" in window && markerList.getData().length > 0) {
      //清除marker数据
      markerList.render([]);
    }

    $(".time-colors-panel").show();
    $(".nature-color").show().siblings().hide();
    $(this).addClass("active");
    $(this).parents(".item").addClass("active");

    // $(".industry-menu .menu-row:last-child li").show();
    // map.setFitView();
    // map.panBy(-580, 40);
  }
})
/*土地低效用地数据*/
$(".build-switch .use-situation").on("click",function () {
  if(!$(this).hasClass("active")) {
    loadingFullAnimat("zdy-full-cover-mask", "body");
    chooseLanId = null;
    landInfoWindow.close();
    /*单独移除所有polygon*/
    // var allPolygons = polygons.lands.concat(polygonEcoLands.lands,polygonTopLands.lands,polygonNatureLands.lands,polygonInefficients.lands)
    // map.remove(allPolygons)
    // map.remove(map.getAllOverlays("polygon"));
    /*清除所有覆盖物*/
    map.clearMap();
    initControll();
    creatWestAreaLandRangeCj(map);
    creatUserNouseLand(map)

    if ("markerList" in window && markerList.getData().length > 0) {
      //清除marker数据
      markerList.render([]);
    }

    $(".time-colors-panel").show();
    $(".use-nouse-color").show().siblings().hide();
    $(this).addClass("active");
    $(this).parents(".item").addClass("active");

    // $(".industry-menu .menu-row:last-child li").show();
    // map.setFitView();
    // map.panBy(-580, 40);
  }
})
/*时间*/
$("#datetimepicker").find("input").val(new Date().getFullYear()-1);
$("#datetimepicker").datetimepicker({
  autoclose: 1,
  startView: 4,
  minView: 4,
  forceParse: 0,
  startDate:2015,
  endDate:new Date().getFullYear()-1
}).on("changeYear",function(ev){
  loadingFullAnimat("zdy-full-cover-mask", "body");
  $(".eco-color .color-item").addClass("active");
  console.log(ev)
  /*单独移除所有polygon*/
  // var allPolygons = polygons.lands.concat(polygonEcoLands.lands,polygonTopLands.lands,polygonNatureLands.lands,polygonInefficients.lands)
  // map.remove(allPolygons)
  /*清除所有覆盖物*/
  map.clearMap();
  creatWestAreaLandRangeCj(map);
  var chooseTime = new Date(ev.date.valueOf()).getFullYear();
  console.log(chooseTime)
  // creatEcoLand(map,console);
  var industryCat = ["生物医药","电子信息","精密制造","其他","服务业"];
  var countNum = 0;
  var ecoLandCopy = [];
  var ecoLandList = [];
  var startTime = +new Date();
  for(var i=0;i<industryCat.length;i++){
    console.log("开始请求",+new Date())
    creatEcLandStep(map,chooseTime,industryCat[i],function(options){
      countNum++;
      ecoLandCopy.push(options);
      if(countNum == industryCat.length){
        for(var i=0;i<ecoLandCopy.length;i++){
          for(var j=0;j<ecoLandCopy[i].length;j++)
            ecoLandList.push(ecoLandCopy[i][j])
        }
        console.log((+new Date()-startTime)/1000)
        /*ecoLandList所有的梯度数据*/
        groupEcLandStep(map,ecoLandList);
      }
    });
  };
});
// $("#datetimepicker-top").find("input").val(new Date().getFullYear()-1);
$("#datetimepicker-top").find("input").val(2016);
$("#datetimepicker-top").datetimepicker({
  autoclose: 1,
  startView: 4,
  minView: 4,
  forceParse: 0,
  startDate:2015,
  endDate:new Date().getFullYear()-1
}).on("changeYear",function(ev){
  loadingFullAnimat("zdy-full-cover-mask", "body");
  $(".eco-color .color-item").addClass("active");
  $(".microcosmic_container").hide().removeClass("slideInRight").addClass("slideOutRight");
  $(".land-company-detail-box").hide().removeClass("slideInRight").addClass("slideOutRight");
  $(".time-colors-panel").css({right:"420px"});
  console.log(ev)
  /*单独移除所有polygon*/
  // var allPolygons = polygons.lands.concat(polygonEcoLands.lands,polygonTopLands.lands,polygonNatureLands.lands,polygonInefficients.lands)
  // map.remove(allPolygons)
  /*清除所有覆盖物*/
  map.clearMap();
  creatWestAreaLandRangeCj(map);
  var chooseTime = new Date(ev.date.valueOf()).getFullYear();
  console.log(chooseTime)
  // creatEcoLand(map,console);
  var industryCat = ["生物医药","电子信息","先进制造"];
  var countNum = 0;
  var ecoLandCopy = [];
  var ecoLandList = [];
  for(var i=0;i<industryCat.length;i++){
    creatHighEnterpriseLandStep(map,chooseTime,industryCat[i],function(options){
      countNum++;
      ecoLandCopy.push(options);
      if(countNum == industryCat.length){
        for(var i=0;i<ecoLandCopy.length;i++){
          for(var j=0;j<ecoLandCopy[i].length;j++)
            ecoLandList.push(ecoLandCopy[i][j])
        }
        /*ecoLandList所有的梯度数据*/
        groupHighEnterpriseLandStep(map,ecoLandList,chooseTime);
      }
    });
  };
});
/*土地用途单一数据*/
$(".nature-color").on("click",".color-blank",function(){
  // $(this).parent().toggleClass("active");
  $(this).toggleClass("active");
  var dataLands = [];
  var chooseCates = $(".nature-color .color-item .color-blank.active");
  /*处理选中的地块数据*/
  $.each(chooseCates,function(){
    var catname = $(this).data("catname");
    var dataLandArr = dataPolygonPurposeCateLands[catname];
    $.each(dataLandArr,function(){
      dataLands.push(this);
    });
  })
  // var dataLands = dataPolygonEcoCateLands[catname];
  /*清除所有覆盖物*/
  map.clearMap();
  creatWestAreaLandRangeCj(map);
  creatPurposeCateLandSingle(map,dataLands,function(){

    var allLand = dataPolygonNatureLands.length > 0 ? dataPolygonNatureLands : dataPolygonUseAndNouse;

    var tpl = ``;
    tpl += `<div class="item land-use-proportion">
                        <div class="public-title"><span class="title">用途占比</span></div>
                        <div class="land-use-purpose-con">
                          <div class="land-use-purpose-scroll">
                            <div class="land-use-purpose-con">
                            
                            </div>
                        </div>
                    </div>`;
    $(".land-panel-con").html(tpl);
    var chooseCates = $(".nature-color .color-item .color-blank.active");
    /*获取所有工业用地和低效用地*/
    var totalGongyeLandNum = 0;
    var totalInefficientLandNum = 0;
    allLand.forEach(function(v,i){
      if(v.generalType == '工业用地'){
        totalGongyeLandNum++;
      }
      if(v.inefficient){
        totalInefficientLandNum++;
      }
    });
    var tpl = `<div class="text-c"><span>工业用地：</span>${totalGongyeLandNum}<span>低效用地：</span>${totalInefficientLandNum}</div>`;
    $(".land-use-purpose-con").append(tpl);
    /*处理选中的地块数据*/
    $.each(chooseCates,function(){
      var catname = $(this).data("catname");
      // var allUseLand = [];
      var allUseLandArea = 0;// 所有已使用地块面积
      var otherTypeUseLandArea = 0;// 其他已使用地块面积
      var nowTypeLandArea = 0;// 当前类型地块的所有面积
      var nowLandArea = 0;// 当前地块的面积
      var otherSingleUseLandArea = 0;// 当前类型其他面积

      allLand.forEach(function(v,i){
        // if(v.generalType != "储备用地"){
          // allUseLand.push(v);
          allUseLandArea += Number(v.landArea);
        // }
        if(v.generalType == catname){
          nowTypeLandArea += Number(v.landArea);
        }
      });
      allUseLandArea = Math.round(allUseLandArea);
      nowTypeLandArea = Math.round(nowTypeLandArea);
      otherTypeUseLandArea = Math.round(allUseLandArea - nowTypeLandArea);

      var otherTypeProportion = (otherTypeUseLandArea/allUseLandArea)*100;
      var nowTypeProportion = (nowTypeLandArea/allUseLandArea)*100;

      var emEchartId;
      if(catname == '工业用地'){
        emEchartId = 'single-gongye-land-proportion';
      }else if(catname == '公共设施及其他用地'){
        emEchartId = 'single-gonggong-land-proportion';
      }else if(catname == '科研用地'){
        emEchartId = 'single-keyan-land-proportion';
      }else if(catname == '商服用地'){
        emEchartId = 'single-shangfu-land-proportion';
      }else if(catname == '住宅用地'){
        emEchartId = 'single-zhuzhai-land-proportion';
      }else if(catname == '储备用地'){
        emEchartId = 'single-chubei-land-proportion';
      }
      var echartItemTpl = `<div class="item">
                              <div class="use-purpose-bd" id="${emEchartId}" style="width: 540px;height: 250px"></div>
                              <div class="use-purpose-bt text-c">
                                  <span class="type-proportion-all">其他：${otherTypeProportion.toFixed(2)}%</span>
                                  <span class="type-proportion-now">${catname}：${nowTypeProportion.toFixed(2)}%</span>
                              </div>
                            </div>`;
      $(".land-use-purpose-con").append(echartItemTpl);
      creatSingleTypeLandPropor({legendData: [catname,'其他'], serverData: [{value:nowTypeLandArea, name:catname},{value:otherTypeUseLandArea, name:'其他'}
        ]},catname);
    });
    $(".microcosmic_container").show().removeClass("slideOutRight").addClass("slideInRight");
    $(".time-colors-panel").css({'right':'580px'});

    $(".land-panel-con .land-use-purpose-scroll").mCustomScrollbar({
      setHeight: '100%',
      theme: "minimal-dark",
      scrollbarPosition: "inside"
    })
  });
})
function creatSingleTypeLandPropor(options,type){
  if(type == '工业用地'){
    var myChart = echarts.init(document.getElementById('single-gongye-land-proportion'));
  }else if(type == '公共设施及其他用地'){
    var myChart = echarts.init(document.getElementById('single-gonggong-land-proportion'));
  }else if(type == '科研用地'){
    var myChart = echarts.init(document.getElementById('single-keyan-land-proportion'));
  }else if(type == '商服用地'){
    var myChart = echarts.init(document.getElementById('single-shangfu-land-proportion'));
  }else if(type == '住宅用地'){
    var myChart = echarts.init(document.getElementById('single-zhuzhai-land-proportion'));
  }else if(type == '储备用地'){
    var myChart = echarts.init(document.getElementById('single-chubei-land-proportion'));
  }
  var legendData = options.legendData;
  var serverData = {serverData: options.serverData,serverData2: options.serverData2};
  option = {
    // color: COLORS,
    title : {
      text: type + '占比',
      x:'center',
      textStyle: {
        color: '#333',
        fontSize: 16
      },
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)",
      axisPointer: {
        type: 'cross',
        crossStyleL: {
          color: '#999'
        }
      },
    },
    legend: {
      left: 'center',
      // data: ['国有企业','私营企业','外商投资企业','集体所有制企业','股份制企业'],
      data: legendData,
      textStyle: {
        color: '#333',
        fontSize: 14
      },
      top: '10%'
    },
    series : [
      {
        name: '用地性质占比',
        type: 'pie',
        center : ['50%', '50%'],
        radius : '45%',
        /*data:[
            {value:335, name:'国有企业'},
            {value:1548, name:'私营企业'},
            {value:234, name:'外商投资企业'},
            {value:135, name:'集体所有制企业'},
            {value:154, name:'股份制企业'}
        ],*/
        data:serverData.serverData,
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: true
          }
        },
        lableLine: {
          normal: {
            show: false
          },
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  myChart.setOption(option);
}
/*地块菜单概况控制*/
function landMenuInfoWindow(options){
  /*console.log(options)
  options.forEach(function(v,i){
    if(v.generalType){

    }
  });*/
  $(".time-colors-panel").css({right:'420px'});
  $(".right-top-land-infowindow .icon-ctrl-head .title").html('土地用途概况');
  $(".right-top-land-infowindow").show().addClass("slideInRight").removeClass("slideOutRight");
  var tpl = `<div class="item-infowindow echarts" id="gongye-land-area-proportion"></div>
            <div class="">
                <table class="table table-bordered">
                    <tr><th>类型</th><th>面积(亩)</th><th>占比(%)</th></tr>
                    <tr><td>工业用地</td><td>28365</td><td>${((28365/60249)*100).toFixed(2)}</td></tr>
                    <tr><td>公共设施及其他</td><td>17628</td><td>${((17628/60249)*100).toFixed(2)}</td></tr>
                    <tr><td>科研用地</td><td>158.5</td><td>${((158.5/60249)*100).toFixed(2)}</td></tr>
                    <tr><td>商服用地</td><td>1162.6</td><td>${((1162.6/60249)*100).toFixed(2)}</td></tr>
                    <tr><td>住宅用地</td><td>4507</td><td>${((4507/60249)*100).toFixed(2)}</td></tr>
                    <tr><td>储备用地</td><td>8427.9</td><td>${((8427.9/60249)*100).toFixed(2)}</td></tr>
                </table>
            </div>`;

  $(".right-top-land-infowindow .icon-ctrl-scroll-con").html(tpl);
  // $(".right-top-land-infowindow .icon-ctrl-scroll").mCustomScrollbar({
  //   setHeight: '100%',
  //   theme: "minimal-dark",
  //   scrollbarPosition: "inside"
  // });
  var data = ['工业用地','公共设施及其他','科研用地','商服用地','住宅用地','储备用地'];
  // data.forEach(function(v,i){
  //   creatLandAreaPropor({},v);
  // });
  creatLandAreaPropor({},['工业用地','公共设施及其他','科研用地','商服用地','住宅用地','储备用地']);
  function creatLandAreaPropor(options,type){
    var COLORS = ['#a57c52','#2a8ab8','#ff7eff','#ff0000','#ffd041','#07fff7'];
    var options = {legendData:[],serverData:[]};
      var myChart = echarts.init(document.getElementById('gongye-land-area-proportion'));
      options.legendData = type;
      options.serverData = [
        {value:28365, name:'工业用地'},
        {value:17628, name:'公共设施及其他'},
        {value:158.5, name:'科研用地'},
        {value:1162.6, name:'商服用地'},
        {value:4507, name:'住宅用地'},
        {value:8427.9, name:'储备用地'}
        ];

    var legendData = options.legendData;
    var serverData = {serverData: options.serverData};
    var option = {
      color: COLORS,
      title : {
        text: '用地性质占比',
        x:'center',
        textStyle: {
          color: '#333',
          fontSize: 16
        },
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        axisPointer: {
          type: 'cross',
          crossStyleL: {
            color: '#999'
          }
        },
      },
      legend: {
        left: 'center',
        // data: ['国有企业','私营企业','外商投资企业','集体所有制企业','股份制企业'],
        data: legendData,
        textStyle: {
          color: '#333',
          fontSize: 14
        },
        top: 'bottom'
      },
      series : [
        {
          name: '用地性质占比',
          type: 'pie',
          center : ['50%', '50%'],
          radius : '45%',
          /*data:[
              {value:335, name:'国有企业'},
              {value:1548, name:'私营企业'},
              {value:234, name:'外商投资企业'},
              {value:135, name:'集体所有制企业'},
              {value:154, name:'股份制企业'}
          ],*/
          data:serverData.serverData,
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          lableLine: {
            normal: {
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    myChart.setOption(option);
  }
  function creatLandAreaPropor2(options,type){
    var totalArea = 60922;
    var options = {legendData:[],serverData:[]};

      var myChart = echarts.init(document.getElementById('gonggong-land-area-proportion'));
      options.legendData = [type,'其他'];
      options.serverData = [{value:17628, name:type},{value:totalArea, name:'其他'}];

    var legendData = options.legendData;
    var serverData = {serverData: options.serverData};
    var option = {
      // color: COLORS,
      title : {
        text: type + '占比',
        x:'center',
        textStyle: {
          color: '#333',
          fontSize: 16
        },
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        axisPointer: {
          type: 'cross',
          crossStyleL: {
            color: '#999'
          }
        },
      },
      legend: {
        left: 'center',
        // data: ['国有企业','私营企业','外商投资企业','集体所有制企业','股份制企业'],
        data: legendData,
        textStyle: {
          color: '#333',
          fontSize: 14
        },
        top: '10%'
      },
      series : [
        {
          name: '用地性质占比',
          type: 'pie',
          center : ['50%', '50%'],
          radius : '45%',
          /*data:[
              {value:335, name:'国有企业'},
              {value:1548, name:'私营企业'},
              {value:234, name:'外商投资企业'},
              {value:135, name:'集体所有制企业'},
              {value:154, name:'股份制企业'}
          ],*/
          data:serverData.serverData,
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          lableLine: {
            normal: {
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    myChart.setOption(option);
  }
  function creatLandAreaPropor3(options,type){
    var totalArea = 60922;
    var other = 60922-158.5;
    var options = {legendData:[],serverData:[]};

      var myChart = echarts.init(document.getElementById('keyan-land-area-proportion'));
      options.legendData = [type,'其他'];
      options.serverData = [{value:158.5, name:type},{value:other, name:'其他'}];

    var legendData = options.legendData;
    var serverData = {serverData: options.serverData};
    var option = {
      // color: COLORS,
      title : {
        text: type + '占比',
        x:'center',
        textStyle: {
          color: '#333',
          fontSize: 16
        },
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        axisPointer: {
          type: 'cross',
          crossStyleL: {
            color: '#999'
          }
        },
      },
      legend: {
        left: 'center',
        // data: ['国有企业','私营企业','外商投资企业','集体所有制企业','股份制企业'],
        data: legendData,
        textStyle: {
          color: '#333',
          fontSize: 14
        },
        top: '10%'
      },
      series : [
        {
          name: '用地性质占比',
          type: 'pie',
          center : ['50%', '50%'],
          radius : '45%',
          /*data:[
              {value:335, name:'国有企业'},
              {value:1548, name:'私营企业'},
              {value:234, name:'外商投资企业'},
              {value:135, name:'集体所有制企业'},
              {value:154, name:'股份制企业'}
          ],*/
          data:serverData.serverData,
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          lableLine: {
            normal: {
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    myChart.setOption(option);
  }
  function creatLandAreaPropor4(options,type){
    var totalArea = 60922;
    var options = {legendData:[],serverData:[]};

      var myChart = echarts.init(document.getElementById('shangfu-land-area-proportion'));
      options.legendData = [type,'其他'];
      options.serverData = [{value:1162.6, name:type},{value:totalArea, name:'其他'}];

    var legendData = options.legendData;
    var serverData = {serverData: options.serverData};
    var option = {
      // color: COLORS,
      title : {
        text: type + '占比',
        x:'center',
        textStyle: {
          color: '#333',
          fontSize: 16
        },
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        axisPointer: {
          type: 'cross',
          crossStyleL: {
            color: '#999'
          }
        },
      },
      legend: {
        left: 'center',
        // data: ['国有企业','私营企业','外商投资企业','集体所有制企业','股份制企业'],
        data: legendData,
        textStyle: {
          color: '#333',
          fontSize: 14
        },
        top: '10%'
      },
      series : [
        {
          name: '用地性质占比',
          type: 'pie',
          center : ['50%', '50%'],
          radius : '45%',
          /*data:[
              {value:335, name:'国有企业'},
              {value:1548, name:'私营企业'},
              {value:234, name:'外商投资企业'},
              {value:135, name:'集体所有制企业'},
              {value:154, name:'股份制企业'}
          ],*/
          data:serverData.serverData,
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          lableLine: {
            normal: {
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    myChart.setOption(option);
  }
  function creatLandAreaPropor5(options,type){

    var totalArea = 60922;
      var myChart = echarts.init(document.getElementById('zhuzhai-land-area-proportion'));
      options.legendData = [type,'其他'];
      options.serverData = [{value:4507, name:type},{value:totalArea, name:'其他'}];

    var legendData = options.legendData;
    var serverData = {serverData: options.serverData};
    var option = {
      // color: COLORS,
      title : {
        text: type + '占比',
        x:'center',
        textStyle: {
          color: '#333',
          fontSize: 16
        },
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        axisPointer: {
          type: 'cross',
          crossStyleL: {
            color: '#999'
          }
        },
      },
      legend: {
        left: 'center',
        // data: ['国有企业','私营企业','外商投资企业','集体所有制企业','股份制企业'],
        data: legendData,
        textStyle: {
          color: '#333',
          fontSize: 14
        },
        top: '10%'
      },
      series : [
        {
          name: '用地性质占比',
          type: 'pie',
          center : ['50%', '50%'],
          radius : '45%',
          /*data:[
              {value:335, name:'国有企业'},
              {value:1548, name:'私营企业'},
              {value:234, name:'外商投资企业'},
              {value:135, name:'集体所有制企业'},
              {value:154, name:'股份制企业'}
          ],*/
          data:serverData.serverData,
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          lableLine: {
            normal: {
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    myChart.setOption(option);
  }
}
/*产业分布概况控制*/
function landChanyeFenbuInfoWindow() {
  $(".time-colors-panel").css({right:'420px'});
  $(".right-top-land-infowindow").hide().addClass("slideOutRight").removeClass("slideInRight");
  $(".industry-land-infowindow").show().addClass("slideInRight").removeClass("slideOutRight");
  /*生物医药面积*/
  var livingArea = 1512.70;
  /*电子信息面积*/
  var electronArea = 9317.34;
  /*先进制造面积*/
  var makeArea = 1548.33;
  /*总面积*/
  var totalArea = 17978.33;
  /*其他面积*/
  var otherArea = (totalArea - makeArea - electronArea - livingArea);
  var tpl = `<div class="echarts" id="chanye-fenbu-Proportion">电子信息相对集中，生物医药相对分散</div>
                <div class="con">
                <table class="table table-bordered">
                    <tr><th>类型</th><th>面积(亩)</th><th>占比(%)</th></tr>
                    <tr><td>生物总面积</td><td>${livingArea}</td><td>${((livingArea / totalArea) * 100).toFixed(2)}%</td></tr>
                    <tr><td>电子信息总面积</td><td>${electronArea}</td><td>${((electronArea / totalArea) * 100).toFixed(2)}%</td></tr>
                    <tr><td>先进制造总面积</td><td>${makeArea}</td><td>${((makeArea / totalArea) * 100).toFixed(2)}%</td></tr>
                    <tr><td>其他总面积</td><td>${otherArea}</td><td>${((otherArea / totalArea) * 100).toFixed(2)}%</td></tr>
                </table>
            </div>`;
  $(".industry-land-infowindow .icon-ctrl-scroll-con").html(tpl);

  var options = {
    legendData:['生物总面积','电子信息总面积','先进制造总面积','其他总面积'],
    seriesData:[
      {value:livingArea, name:'生物总面积'},
      {value:electronArea, name:'电子信息总面积'},
      {value:makeArea, name:'先进制造总面积'},
      {value:otherArea, name:'其他总面积'}
      ],
    title:'产业分布面积占比',
    seriesName:'面积占比',
    emId:'chanye-fenbu-Proportion'
  };
  publicCreatLandAreaProportion(options);
}
/*获取产业分布概况企业列表数据*/
function searchIndustryCompanyList(type){
  var time = 2017;
  time = $('.industry-company-list-panel').find(".time-item.active").data('time');
  var tpl = '';
  var listTpl = '';
  var enterpriseType = type ? type : '生物医药';

  var lists = [];
  if(enterpriseType == '所有产业'){
    /*取出所选择时间的所有数据*/
    HighQualityListData.forEach(function(v,i){
      if(v.year == time){
        lists.push(v);
      }
    });
  }else{
    /*取出所选择时间的以及所选择产业类型的数据*/
    HighQualityListData.forEach(function(v,i){
      if(v.year == time && v.companyIndustryType == enterpriseType){
        lists.push(v);
      }
    });
  }
  lists.forEach(function (v,i) {
    listTpl += `<div class="land-company-row company-item flex" data-company="${v.companyName}">
                        <div class="logo">
                            ${i+1}
                        </div>
                        <div class="item name flex-cell"><div class="top-label">${v.companyName}</div></div>
                        <div class="quality-num"><div class="top-label">${Number(v.highQuality.toFixed(2))}</div></div>
                    </div>`
  });

      /*var tpl = ``;
      var listTpl = ``;
    if(enterpriseType == '生物医药'){
      var companyList = dataPolygonEcoCateLands.living.sort(compareFn('pricepermeter','desc'));
    }else if(enterpriseType == '电子信息'){
      var companyList = dataPolygonEcoCateLands.electron.sort(compareFn('pricepermeter','desc'));
    }else if(enterpriseType == '先进制造'){
      var companyList = dataPolygonEcoCateLands.make.sort(compareFn('pricepermeter','desc'));
    }
    if(companyList.length > 0){
      companyList.forEach(function(v,i){
        listTpl += `<div class="land-company-item company-item flex" data-company="${v.actualUsers}">
                            <div class="logo">
                                <img src="${v.companyIcon ? v.companyIcon : '../images/company_list_logo.png'}" class="">
                            </div>
                            <div class="item name flex-cell"><div class="top-label">${v.actualUsers}</div><div class="bot-label">${v.landIsLocated}</div></div>
                            <div class="item shouru flex-cell"><div class="top-label">${Number(v.operatingIncome).toFixed(2)}</div><div class="bot-label">营业收入<br/>(万元)</div></div>
                            <div class="jingji flex-cell"><div class="top-label">${Number(v.pricepermeter).toFixed(2)}</div><div class="bot-label">地块每平米<br/>营收价值(万元)</div></div>
                        </div>`;
      });
    }
    tpl += `<div class="industry-company-list">
            <div class="industry-company-hd">
                <div class="time-item active" data-time="2017" data-type="${enterpriseType}">2017</div>
                <div class="time-item" data-time="2016" data-type="${enterpriseType}">2016</div>
                <div class="time-item" data-time="2015" data-type="${enterpriseType}">2015</div>
            </div>
            <div class="industry-company-bd">
                <div class="company-con">
                    <div class="public-title">
                      <span class="title">${enterpriseType}</span>
                      <div class="type-tab flex">
                        <div class="type-tab-item active" data-type="生物医药">生物医药</div>
                        <div class="type-tab-item" data-type="电子信息">电子信息</div>
                        <div class="type-tab-item" data-type="先进制造">先进制造</div>
                      </div>
                    </div>
                    <div class="land-company-list-box">
                        <div class="company-list land-company-list">
                            <div class="company-list land-company-scroll-con">
                                ${listTpl}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;*/

    $(".industry-company-list-panel .land-company-scroll-con").html(listTpl);

    $(".industry-company-list .land-company-list").mCustomScrollbar({
      setHeight: '100%',
      theme: "minimal-dark",
      scrollbarPosition: "inside"
    });
};
/*土地低效用地概况控制*/
function landLnadUseInfoWindow(options) {
  $(".time-colors-panel").css({right:'420px'});
  $(".right-top-land-infowindow .icon-ctrl-head .title").html('低效用地概况');
  $(".right-top-land-infowindow").show().addClass("slideInRight").removeClass("slideOutRight");
  var listTpl = ``;
  /*listTpl += `<tr><td>工业用地</td><td>4415</td><td>${((4415/4415)*100).toFixed(2)}</td></tr>
              <tr><td>公共设施及其他</td><td>0</td><td>${((0/4415)*100).toFixed(2)}</td></tr>
              <tr><td>科研用地</td><td>0</td><td>${((0/4415)*100).toFixed(2)}</td></tr>
              <tr><td>商服用地</td><td>0</td><td>${((0/4415)*100).toFixed(2)}</td></tr>
              <tr><td>住宅用地</td><td>0</td><td>${((0/4415)*100).toFixed(2)}</td></tr>
              <tr><td>储备用地</td><td>0</td><td>${((0/4415)*100).toFixed(2)}</td></tr>`;*/
  var tpl = `<div class="item-infowindow echarts" id="dixiaoforgongye-land-area-proportion"></div>
              <table class="table table-bordered">
                  <tr><th>类型</th><th>面积(亩)</th><th>占比(%)</th></tr>
                  <tr><td>未开发用地</td><td>1030.04</td><td>${(1030.04/4415*100).toFixed(2)}%</td></tr>
                  <tr><td>已开发工业用地</td><td>${(4415-1030.04)}</td><td>${((4415-1030.04)/4415*100).toFixed(2)}%</td></tr>
              </table>
              <div class="item-infowindow echarts" id="dixiaoforwest-land-area-proportion"></div>
               <table class="table table-bordered">
                  <tr><th>类型</th><th>面积(亩)</th><th>占比(%)</th></tr>
                  <tr><td>未开发用地</td><td>1030.04</td><td>${(1030.04/60249*100).toFixed(2)}%</td></tr>
                  <tr><td>已开发西区用地</td><td>${(60249-1030.04)}</td><td>${((60249-1030.04)/60249*100).toFixed(2)}%</td></tr>
              </table>
            <div class="">
                <div class="item">低效用地占西区总面积占比:${((4415/60249)*100).toFixed(2)}%</div>
            </div>
            <div class="">
                <div class="item">低效工业用地占工业用地占比:${((4415/28365)*100).toFixed(2)}%</div>
            </div>`;

  $(".right-top-land-infowindow .icon-ctrl-scroll-con").html(tpl);
  $(".right-top-land-infowindow .icon-ctrl-scroll").mCustomScrollbar({
    setHeight: '100%',
    theme: "minimal-dark",
    scrollbarPosition: "inside"
  });
  var data = ['工业用地','公共设施及其他','科研用地','商服用地','住宅用地','储备用地'];
  // data.forEach(function(v,i){
  //   creatLandAreaPropor({},v);
  // });
  // creatLandAreaPropor({},['工业用地','公共设施及其他','科研用地','商服用地','住宅用地','储备用地']);
  creatLandAreaPropor({},['未开发用地','已开发工业用地']);
  creatLandAreaPropor2({},['未开发用地','已开发西区用地']);
  function creatLandAreaPropor(options,type){
    var COLORS = ['#a57c52','#2a8ab8','#ff7eff','#ff0000','#ffd041','#07fff7'];
    var options = {legendData:[],serverData:[]};
    var myChart = echarts.init(document.getElementById('dixiaoforgongye-land-area-proportion'));
    options.legendData = type;
    options.serverData = [
      {value:1030.04, name:'未开发用地'},
      {value:(4415-1030.04), name:'已开发工业用地'}
    ];

    var legendData = options.legendData;
    var serverData = {serverData: options.serverData};
    var option = {
      title : {
        text: '低效用地占比',
        x:'center',
        textStyle: {
          color: '#333',
          fontSize: 16
        },
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        axisPointer: {
          type: 'cross',
          crossStyleL: {
            color: '#999'
          }
        },
        position: ['20%', '82%']
      },
      legend: {
        left: 'center',
        // data: ['国有企业','私营企业','外商投资企业','集体所有制企业','股份制企业'],
        data: legendData,
        textStyle: {
          color: '#333',
          fontSize: 14
        },
        top: 'bottom'
      },
      series : [
        {
          name: '低效用地占比',
          type: 'pie',
          center : ['50%', '50%'],
          radius : '45%',
          /*data:[
              {value:335, name:'国有企业'},
              {value:1548, name:'私营企业'},
              {value:234, name:'外商投资企业'},
              {value:135, name:'集体所有制企业'},
              {value:154, name:'股份制企业'}
          ],*/
          data:serverData.serverData,
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          lableLine: {
            normal: {
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    myChart.setOption(option);
  }
  function creatLandAreaPropor2(options,type){
    var COLORS = ['#a57c52','#2a8ab8','#ff7eff','#ff0000','#ffd041','#07fff7'];
    var options = {legendData:[],serverData:[]};
    var myChart = echarts.init(document.getElementById('dixiaoforwest-land-area-proportion'));
    options.legendData = type;
    options.serverData = [
      {value:1030.04, name:'未开发用地'},
      {value:(60249 - 1030.04), name:'已开发西区用地'}
    ];

    var legendData = options.legendData;
    var serverData = {serverData: options.serverData};
    var option = {
      title : {
        text: '低效与西区用地占比',
        x:'center',
        textStyle: {
          color: '#333',
          fontSize: 16
        },
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        axisPointer: {
          type: 'cross',
          crossStyleL: {
            color: '#999'
          }
        },
        position: ['20%', '82%']
      },
      legend: {
        left: 'center',
        // data: ['国有企业','私营企业','外商投资企业','集体所有制企业','股份制企业'],
        data: legendData,
        textStyle: {
          color: '#333',
          fontSize: 14
        },
        top: 'bottom'
      },
      series : [
        {
          name: '低效用地占比',
          type: 'pie',
          center : ['50%', '50%'],
          radius : '45%',
          /*data:[
              {value:335, name:'国有企业'},
              {value:1548, name:'私营企业'},
              {value:234, name:'外商投资企业'},
              {value:135, name:'集体所有制企业'},
              {value:154, name:'股份制企业'}
          ],*/
          data:serverData.serverData,
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          lableLine: {
            normal: {
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    myChart.setOption(option);
  }
  function creatLandAreaPropor3(options,type){
    var options = {legendData:[],serverData:[]};
    var myChart = echarts.init(document.getElementById('gongyeforgongye-land-area-proportion'));
    options.legendData = type;
    options.serverData = [
      {value:4415, name:'低效工业用地'},
      {value:28365, name:'工业用地'}
    ];

    var legendData = options.legendData;
    var serverData = {serverData: options.serverData};
    var option = {
      title : {
        text: '低效工业用地占比',
        x:'center',
        textStyle: {
          color: '#333',
          fontSize: 16
        },
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        axisPointer: {
          type: 'cross',
          crossStyleL: {
            color: '#999'
          }
        },
      },
      legend: {
        left: 'center',
        // data: ['国有企业','私营企业','外商投资企业','集体所有制企业','股份制企业'],
        data: legendData,
        textStyle: {
          color: '#333',
          fontSize: 14
        },
        top: 'bottom'
      },
      series : [
        {
          name: '低效用地占比',
          type: 'pie',
          center : ['50%', '50%'],
          radius : '45%',
          /*data:[
              {value:335, name:'国有企业'},
              {value:1548, name:'私营企业'},
              {value:234, name:'外商投资企业'},
              {value:135, name:'集体所有制企业'},
              {value:154, name:'股份制企业'}
          ],*/
          data:serverData.serverData,
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          lableLine: {
            normal: {
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    myChart.setOption(option);
  }
  function creatZonghePropor(options,type){
    var totalArea = 60922;
    var nowLandArea = 719.4885;
    var options = {legendData:[],serverData:[]};
    var myChart = echarts.init(document.getElementById('zonghe-land-area-proportion'));
    options.legendData = [type,'其他'];
    options.serverData = [{value:nowLandArea, name:type},{value:totalArea, name:'其他'}];

    var legendData = options.legendData;
    var serverData = {serverData: options.serverData};
    var option = {
      // color: COLORS,
      title : {
        text: type + '占比',
        x:'center',
        textStyle: {
          color: '#333',
          fontSize: 16
        },
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        axisPointer: {
          type: 'cross',
          crossStyleL: {
            color: '#999'
          }
        },
      },
      legend: {
        left: 'center',
        // data: ['国有企业','私营企业','外商投资企业','集体所有制企业','股份制企业'],
        data: legendData,
        textStyle: {
          color: '#333',
          fontSize: 14
        },
        top: '10%'
      },
      series : [
        {
          name: '用地性质占比',
          type: 'pie',
          center : ['50%', '50%'],
          radius : '45%',
          /*data:[
              {value:335, name:'国有企业'},
              {value:1548, name:'私营企业'},
              {value:234, name:'外商投资企业'},
              {value:135, name:'集体所有制企业'},
              {value:154, name:'股份制企业'}
          ],*/
          data:serverData.serverData,
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          lableLine: {
            normal: {
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    myChart.setOption(option);
  }
}
/*高企前十收入占比图表*/
function creatHighEnterpriseTop10Proportion(options,type,num){
  var totalArea = 100-(num*100);
  var nowNum = num*100;
  var options = {legendData:[],serverData:[]};
  var myChart = echarts.init(document.getElementById('top10-proportion'));
  options.legendData = [type,'其他'];
  options.serverData = [{value:nowNum, name:type},{value:totalArea, name:'其他'}];

  var legendData = options.legendData;
  var serverData = {serverData: options.serverData};
  var option = {
    // color: COLORS,
    title : {
      text: type + '占比',
      x:'center',
      textStyle: {
        color: '#333',
        fontSize: 16
      },
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)",
      axisPointer: {
        type: 'cross',
        crossStyleL: {
          color: '#999'
        }
      },
    },
    legend: {
      left: 'center',
      // data: ['国有企业','私营企业','外商投资企业','集体所有制企业','股份制企业'],
      data: legendData,
      textStyle: {
        color: '#333',
        fontSize: 14
      },
      top: '10%'
    },
    series : [
      {
        name: '用地性质占比',
        type: 'pie',
        center : ['50%', '60%'],
        radius : '45%',
        /*data:[
            {value:335, name:'国有企业'},
            {value:1548, name:'私营企业'},
            {value:234, name:'外商投资企业'},
            {value:135, name:'集体所有制企业'},
            {value:154, name:'股份制企业'}
        ],*/
        data:serverData.serverData,
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: true
          }
        },
        lableLine: {
          normal: {
            show: false
          },
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  myChart.setOption(option);
}
/*高质量企业列表点击标识地块*/
$(".right-top-land-infowindow").on("click",".land-company-item",function(){
  var companyName = $(this).data("company");
  var landBlockId = $(this).data("landid");
  $(this).addClass("active").siblings().removeClass("active");
  //在地图上改变当前点击的多边形
  for (var i = 0; i < polygonHighEnterpriseLands.lands.length; i++) {
    // if (polygonHighEnterpriseLands.lands[i].getExtData().slected) {
    if (polygonHighEnterpriseLands.lands[i].getExtData().borderColor != polygonHighEnterpriseLands.lands[i].getOptions().strokeColor) {
      polygonHighEnterpriseLands.lands[i].setOptions({
        strokeColor: polygonHighEnterpriseLands.lands[i].getExtData().borderColor,
        fillColor: polygonHighEnterpriseLands.lands[i].getExtData().color,
        strokeWeight: defaultStrokeWeight
      });
      var oldExtData = polygonHighEnterpriseLands.lands[i].getExtData();//先保存原始ExtData数据
      oldExtData.slected = false;//改变之前选中的状态为false
      polygonHighEnterpriseLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
      // break;
    }
  }
  for(var i = 0; i < polygonHighEnterpriseLands.lands.length; i++){
    if(polygonHighEnterpriseLands.lands[i].getExtData().id == landBlockId || polygonHighEnterpriseLands.lands[i].getExtData().actualUsers == companyName){
      var newExtData = polygonHighEnterpriseLands.lands[i].getExtData();
      // newExtData.slected = true;
      polygonHighEnterpriseLands.lands[i].setOptions({strokeColor:selectedBorderColor, strokeWeight:selectedStrokeWeight});
      polygonHighEnterpriseLands.lands[i].setExtData(newExtData);
      var centerPositon = polygonHighEnterpriseLands.lands[i].getBounds().getCenter();
      var centerBounds = polygonHighEnterpriseLands.lands[i].getBounds();
      // map.setCenter(centerPositon);
      map.setBounds(centerBounds);
      // map.setZoom(16)
    }
  }
  /*polygonHighEnterpriseLands.lands.forEach(function(v,i){
    if(v.getExtData().actualUsers == companyName){
      var newExtData = v.getExtData();
      newExtData.slected = true;
      v.setOptions({strokeColor:selectedBorderColor, strokeWeight:selectedStrokeWeight});
      v.setExtData(newExtData);
      var centerPositon = v.getBounds().getCenter();
      // map.setCenter(centerPositon);
      map.setBounds(v.getBounds());
      // map.setZoom(16)
    }
  })*/
});
/*绘制一个饼图图表*/
function publicCreatLandAreaProportion(options,type){
  var data = {legendData:options.legendData,seriesData:options.seriesData};
  var title = options.title;
  var seriesName = options.seriesName;
  var emId = options.emId;
  var myChart = echarts.init(document.getElementById(emId));
  /*options.legendData = type;
  options.serverData = [
    {value:28365, name:'工业用地'},
    {value:17628, name:'公共设施及其他'},
    {value:158.5, name:'科研用地'},
    {value:1162.6, name:'商服用地'},
    {value:4507, name:'住宅用地'},
    {value:8427.9, name:'储备用地'}
  ];*/

  var legendData = data.legendData;
  var seriesData = data.seriesData;
  var option = {
    // color: COLORS,
    title : {
      text: title,
      x:'center',
      textStyle: {
        color: '#333',
        fontSize: 16
      },
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)",
      axisPointer: {
        type: 'cross',
        crossStyleL: {
          color: '#999'
        }
      },
      position: ['10%','75%']
    },
    legend: {
      left: 'center',
      // data: ['国有企业','私营企业','外商投资企业','集体所有制企业','股份制企业'],
      data: legendData,
      textStyle: {
        color: '#333',
        fontSize: 14
      },
      top: 'bottom'
    },
    series : [
      {
        name: seriesName,
        type: 'pie',
        center : ['50%', '50%'],
        radius : '45%',
        /*data:[
            {value:335, name:'国有企业'},
            {value:1548, name:'私营企业'},
            {value:234, name:'外商投资企业'},
            {value:135, name:'集体所有制企业'},
            {value:154, name:'股份制企业'}
        ],*/
        data:seriesData,
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: true
          }
        },
        lableLine: {
          normal: {
            show: false
          },
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  myChart.setOption(option);
}
/*产业-标准厂房*/
$(".build-switch .industry-orkwshop").on("click",function(){
  if(!$(this).hasClass("active")) {
    loadingFullAnimat("zdy-full-cover-mask", "body");

    $(".datetimepicker-box").hide();
    $(".datetimepicker-top-box").hide();
    /*单独移除所有polygon*/
    // var allPolygons = polygons.lands.concat(polygonEcoLands.lands,polygonTopLands.lands,polygonNatureLands.lands,polygonInefficients.lands)
    // map.remove(allPolygons)
    /*清除所有覆盖物*/
    map.clearMap();

    initControll();
    creatWestAreaLandRangeCj(map);
    $(".right-top-land-infowindow").show().addClass("slideInRight").removeClass("slideOutRight");
    creatWorkshopLand(map);

    $(".time-colors-panel").show();
    $(".workshop-color").show().siblings().hide();
    $(this).addClass("active");
    $(this).parents(".item").addClass("active");
  }
});
/*绘制产业-标准厂房*/
function creatWorkshopLand(map){
  loadingFullAnimat("zdy-full-cover-mask","body");
  polygonNatureLands.lands=[];
  // var colors = ["#fff","#a57c52","#7edfff","#ff7eff","#ff0000","#ffdf7e","#5557ff"];
  var colors = ["#07fff7","#a57c52","#2a8ab8","#ff7eff","#ff0000","#ffd041","#2a8ab8"];
  // dataPolygonNatureLands = localStorage.getItem('dataPolygonNatureLands') ? JSON.parse(localStorage.getItem('dataPolygonNatureLands')) : dataPolygonNatureLands;
  /*判断内存是否存在数据*/
  if(dataPolygonNatureLands.length>0){
    creatWorkshopLandAgain(map,dataPolygonNatureLands);
  }else{
    indexeDBmethod.byIndexGet('landData','dataPolygonNatureLands',function(res){
      /*从indexedDB获取数据*/
      var dbData = res;
      dataPolygonNatureLands = dbData ? dbData.data : dataPolygonNatureLands;
      if(dataPolygonNatureLands.length<1){
        var startTime = +new Date();
        console.log("开始性质请求",+new Date())
        var pointsArr=[];
        $.ajax({
          url: "/v1/land/findAllHasType",
          type:"GET",
          dataType:"json",
          data:{},
          success:function(res){
            console.log("请求性质用时",(+new Date()-startTime)/1000)
            var startTime2 = +new Date();
            // console.log(res)
            for(var i=0;i<res.length;i++){
              // pointsArr.push(res[i].points);
              var point_x_y = [];
              var pointItem = {id:"",position:"",inefficient:"",landArea:"",landUsrNature:""};
              for(var j=0;j<res[i].points.length;j++){
                point_x_y.push([res[i].points[j].point_80_x,res[i].points[j].point_80_y]);
              }
              pointItem.id = res[i].id;
              pointItem.unifiedLandMark = res[i].unifiedLandMark;
              pointItem.rightHolder = res[i].rightHolder;
              pointItem.actualUsers = res[i].actualUsers;
              pointItem.landCardNumber = res[i].landCardNumber;
              pointItem.landIsLocated = res[i].landIsLocated;
              pointItem.inefficient = res[i].inefficient;
              pointItem.generalType = res[i].generalType;
              /*实测面积*/
              pointItem.landArea = res[i].landArea;
              /*使用全面积*/
              pointItem.usageArea = res[i].usageArea;
              pointItem.landUsrNature = res[i].landUsrNature;
              pointItem.theRealFunction = res[i].theRealFunction;
              pointItem.governmentInvestment = res[i].governmentInvestment;
              pointItem.positions = point_x_y;
              pointsArr.push(pointItem);
            }
            dataPolygonNatureLands = pointsArr;
            // localStorage.setItem('dataPolygonNatureLands', JSON.stringify(dataPolygonNatureLands));

            var indexedDBdata = {type: 'dataPolygonNatureLands', data: pointsArr};
            indexeDBmethod.add('landData',indexedDBdata);
            newpointers = pointsArr;

            creatWorkshopLandAgain(map,dataPolygonNatureLands);
          },error:function(err){
            console.log(err)
          }
        })
      }else{
        creatWorkshopLandAgain(map,dataPolygonNatureLands);
      }
    })

  }

}
/*产业厂房--将已处理或缓存的数据绘制地图*/
function creatWorkshopLandAgain(map,dataOptions){
  var colors = ["#07fff7","#a57c52","#2a8ab8","#ff7eff","#ff0000","#ffd041","#2a8ab8"];
  newpointers = dataOptions;
  //-----
  landChanyeWorkshopInfoWindow();
  for(var i=0;i<newpointers.length;i++){
    var color = defaultLandColor;
    if(newpointers[i].landUsrNature == "厂房"){
      if(newpointers[i].actualUsers == "成都高投科技园物业服务有限公司"){
        color =colors[3];
      }else{
        color =colors[0];
      }
    }

    var polygonOptions = {
      map: map,
      strokeColor: defaultBorderColor,
      // strokeColor: color,
      strokeWeight: defaultStrokeWeight,
      fillColor: color,
      fillOpacity: defualtFillOpacity,
      /*strokeStyle: "dashed",
      strokeDasharray: [20,10],*/
      extData: {
        id: newpointers[i].id,
        inefficient: newpointers[i].inefficient,
        type: newpointers[i].type,
        landType: newpointers[i].landType,
        landCardNumber: newpointers[i].landCardNumber,
        landArea: newpointers[i].landArea,
        usageArea: newpointers[i].usageArea,
        /*按性质分类*/
        generalType: newpointers[i].generalType,
        landUsrNature: newpointers[i].landUsrNature,
        actualUsers: newpointers[i].actualUsers,
        unifiedLandMark: newpointers[i].unifiedLandMark,
        landIsLocated: newpointers[i].landIsLocated,
        rightHolder: newpointers[i].rightHolder,
        theRealFunction: newpointers[i].theRealFunction,
        governmentInvestment: newpointers[i].governmentInvestment,
        color: color,
        slected: false
      }
    };
    // 外多边形坐标数组和内多边形坐标数组
    var pointers = newpointers[i].positions;
    polygonNatureLand = new AMap.Polygon(polygonOptions);
    polygonNatureLand.on("click",function(e){
      /*看数据*/
      console.log(this.getExtData())
      if(!this.getExtData().slected){
        var lanTitle = idustryParkName;
        var landArea = this.getExtData().landArea;
        var landUsrNature = this.getExtData().landUsrNature;
        var that = this;
        var unifiedLandMark = this.getExtData().unifiedLandMark;
        chooseLanId = unifiedLandMark;
        // $(".industry-menu .menu-row:last-child li:first-child").click();
        // $(".industry-menu .menu-row:last-child li:first-child").siblings().hide();
        //在地图上改变当前点击的多边形
        for(var i=0;i<polygonNatureLands.lands.length;i++){
          if(polygonNatureLands.lands[i].getExtData().slected){
            polygonNatureLands.lands[i].setOptions({
              strokeColor:defaultBorderColor,
              fillColor:polygonNatureLands.lands[i].getExtData().color,
              strokeWeight:defaultStrokeWeight
            });
            var oldExtData = polygonNatureLands.lands[i].getExtData();//先保存原始ExtData数据
            oldExtData.slected = false;//改变之前选中的状态为false
            polygonNatureLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
            break;
          }
        }
        var newExtData = this.getExtData();
        newExtData.slected = true;
        this.setOptions({strokeColor:selectedBorderColor,strokeWeight:selectedStrokeWeight});
        this.setExtData(newExtData);
        var options = {lanTitle:lanTitle,landArea:landArea,landUsrNature:landUsrNature,polygon:that};
        // landInfoWindowFn(map,options,"polygonNatureLands");
        /*单独请求低效用地数据*/
        if(this.getExtData().inefficient){
          getInefficientLandData(unifiedLandMark);
        }
        viewWorkshopLandPanel(this.getExtData())
      }
    })
    polygonNatureLand.on("mouseover",function(e){
    })
    polygonNatureLand.on("mouseout",function(e){
      // landInfoWindow.close()
    })
    // console.log(polygon)
    polygonNatureLand.setPath(pointers);
    polygonNatureLands.lands.push(polygonNatureLand);
  }
  $(".zdy-full-cover-mask").remove();
  map.setFitView();
  map.setZoom(14);
}
/*产业标准厂房概况控制*/
function landChanyeWorkshopInfoWindow() {
  $(".time-colors-panel").css({right:'420px'});
  $(".right-top-land-infowindow .icon-ctrl-head .title").html("标准厂房概况");
  $(".industry-land-infowindow").hide().addClass("slideOutRight").removeClass("slideInRight");
  $(".right-top-land-infowindow").show().addClass("slideInRight").removeClass("slideOutRight");
  var tpl = `<div class="workshop-vacant-proportion">
                <div class="title">总空置率</div>
                <div class="con">${((243835/666)/(648873/666)).toFixed(2)*100}%</div>
                <div class="title">高投空置率</div>
                <div class="con">47%</div>
              </div>
              <div class="echarts" id="chanye-all-workshop-echarts"></div>
               <div>
                <table class="table table-bordered">
                    <tr><td>总建筑面积:</td><td>${(648873/666).toFixed(2)}亩</td></tr>
                    <tr><td>高投面积:</td><td>${(473636/666).toFixed(2)}亩</td></tr>
                </table>
               </div>
              <div class="echarts" id="chanye-vacant-workshop-echarts"></div>
              <div>
                <table class="table table-bordered">
                    <tr><td>空置总面积:</td><td>${(243835/666).toFixed(2)}亩</td></tr>
                    <tr><td>高投面积:</td><td>${(222598/666).toFixed(2)}亩</td></tr>
                </table>
              </div>`;
  $(".right-top-land-infowindow .icon-ctrl-scroll-con").html(tpl);
  $(".right-top-land-infowindow .icon-ctrl-scroll").mCustomScrollbar({
    setHeight: '100%',
    theme: "minimal-dark",
    scrollbarPosition: "inside"
  });

  var options = {
    legendData:['总建筑面积','高投面积'],
    seriesData:[
      {value:(648873/666).toFixed(2), name:'总建筑面积'},
      {value:(473636/666).toFixed(2), name:'高投面积'}
    ],
    title:'高投厂房面积占比',
    seriesName:'面积占比',
    emId:'chanye-all-workshop-echarts'
  };
  publicCreatLandAreaProportion(options);
  var options2 = {
    legendData:['空置面积','高投面积'],
    seriesData:[
      {value:(243835/666).toFixed(2), name:'空置面积'},
      {value:(222598/666).toFixed(2), name:'高投面积'}
    ],
    title:'高投厂房面积占比',
    seriesName:'面积占比',
    emId:'chanye-vacant-workshop-echarts'
  };
  publicCreatLandAreaProportion(options2);
}
/*标准厂房地块信息面板控制*/
function viewWorkshopLandPanel(options){
  $(".microcosmic_container").show().removeClass("slideOutRight").addClass("slideInRight");
  $(".land-company-detail-box").hide().removeClass("slideInRight").addClass("slideOutRight");
  $(".right-top-land-infowindow").hide().removeClass("slideInRight").addClass("slideOutRight");
  $(".back-arrow-btn").removeClass("active");
  $(".time-colors-panel").css({right:"580px"});
  // $(".land-panel").show().removeClass("slideOutRight").addClass("slideInRight");
  // var landData = options;
  /*避免赋值改变传参的数据*/
  var landData = $.extend(true, {}, options);
  landData.landCardNumber = (options.landCardNumber == null || options.landCardNumber == " ") ? "未知" : options.landCardNumber;
  landData.rightHolder = (options.rightHolder == null || options.rightHolder == " ") ? "未知" : options.rightHolder;
  landData.landArea = (options.landArea == null || options.landArea == " ") ? "未知" : (options.landArea/666).toFixed(2) + "亩";
  landData.landIsLocated = (options.landIsLocated == null || options.landIsLocated == " ") ? "未知" : options.landIsLocated;
  landData.usageArea = (options.usageArea == null || options.usageArea == " ") ? "未知" : (options.usageArea/666).toFixed(2) + "亩";
  /*实际用途*/
  landData.theRealFunction = (options.theRealFunction == null || options.theRealFunction == " ") ? "未知" : options.theRealFunction;
  /*如果有性质分类使用性质分类用途*/
  landData.landUsrNature = options.generalType ? options.generalType : (options.landUsrNature == null || options.landUsrNature == " ") ? "未知" : options.landUsrNature;
  /*判断是否低效用地*/
  if(options.inefficient){
    getWorkshopInefficientLandData(landData.unifiedLandMark,landData);
  }else{

    var tpl = '<div class="land-use-purpose-scroll"><div class="land-use-purpose-box">';
    tpl += `<div class="item land-info-con">
                    <div class="use-purpose-title"><span class="title">土地信息</span></div>
                    <div class="land-info-bd">
                        <table class="table table-bordered" id="land-basic-data">
                            <tr>
                                <td class="nowrap land-row-title">土地证号:</td><td colspan="3">${landData.landCardNumber}</td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">权利人:</td><td colspan="3">${landData.rightHolder}</td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">实测面积:</td><td colspan="3">${landData.landArea}</td>
                            </tr>
                            <!--<tr>
                                <td class="nowrap land-row-title">土地坐落:</td><td colspan="3">${landData.landIsLocated}</td>
                            </tr>-->
                            <tr>
                                <td class="nowrap land-row-title">使用全面积:</td><td colspan="3">${landData.usageArea}</td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">用地性质:</td><td colspan="3">${landData.landUsrNature}</td>
                            </tr>
                            <!--<tr>
                                <td class="nowrap land-row-title">规划用途:</td><td colspan="3">${landData.landUsrNature}</td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">实际用途:</td><td colspan="3">${landData.theRealFunction}</td>
                            </tr>-->
                            <tr>
                                <td class="nowrap land-row-title">用地单位:</td><td colspan="3"><a href="javascript:void(0)" class="land-unit-detail" data-company="${landData.actualUsers}">${landData.actualUsers ? landData.actualUsers : "未知"}</a></td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">地块政府投入:</td><td colspan="3">${landData.governmentInvestment && options.landArea ? (Number(landData.governmentInvestment) * parseInt(options.landArea)/10000).toFixed(2) + '万元' : '未知'}</td>
                            </tr>
                        </table>
                    </div>
                </div>`;
    tpl += '</div></div>';
    // $(".land-panel-con").html(tpl);
    $(".land-panel-con").html(tpl);
    $(".land-panel-con .land-use-purpose-scroll").mCustomScrollbar({
      setHeight: '100%',
      theme: "minimal-dark",
      scrollbarPosition: "inside"
    })
  }
}
/*获取标准厂房低效用地信息*/
function getWorkshopInefficientLandData(unifiedLandMark,options){
  $.ajax({
    url: "./jsonData/findOneByMark1.json",
    type:"GET",
    dataType:"json",
    data:{mark:unifiedLandMark},
    success:function(res){
      console.log(res);
      var inefficientData = res.low[0];
      var landData = options;
      var tpl = '<div class="land-use-purpose-scroll"><div class="land-use-purpose-box">';
      tpl += `<div class="item land-info-con">
                    <div class="use-purpose-title"><span class="title">土地信息</span></div>
                    <div class="land-info-bd">
                        <table class="table table-bordered" id="land-basic-data">
                            <tr>
                                <td class="nowrap land-row-title">土地证号:</td><td colspan="3">${landData.landCardNumber}</td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">权利人:</td><td colspan="3">${landData.rightHolder}</td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">实测面积:</td><td colspan="3">${landData.landArea}</td>
                            </tr>
                            <!--<tr>
                                <td class="nowrap land-row-title">土地坐落:</td><td colspan="3">${landData.landIsLocated}</td>
                            </tr>-->
                            <tr>
                                <td class="nowrap land-row-title">使用全面积:</td><td colspan="3">${landData.usageArea}</td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">用地性质:</td><td colspan="3">${landData.landUsrNature}</td>
                            </tr>
                            <!--<tr>
                                <td class="nowrap land-row-title">规划用途:</td><td colspan="3">${landData.landUsrNature}</td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">实际用途:</td><td colspan="3">${landData.theRealFunction}</td>
                            </tr>-->
                            <tr>
                                <td class="nowrap land-row-title">用地单位:</td><td colspan="3"><a href="javascript:void(0)" class="land-unit-detail" data-company="${landData.actualUsers}">${landData.actualUsers}</a></td>
                            </tr>
                            <tr>
                                <td class="nowrap land-row-title">地块政府投入:</td><td colspan="3">${landData.governmentInvestment && options.landArea ? (Number(landData.governmentInvestment) * parseInt(options.landArea)/10000).toFixed(2) + '万元' : '未知'}</td>
                            </tr>
                        </table>
                    </div>
                </div>`;
      tpl += '</div></div>';
      // $(".land-panel-con").html(tpl);
      $(".land-panel-con").html(tpl);
      $(".land-panel-con .land-use-purpose-scroll").mCustomScrollbar({
        setHeight: '100%',
        theme: "minimal-dark",
        scrollbarPosition: "inside"
      })
      /*如果有低效用地信息*/
      if(res.low[0] && inefficientData.length>0){
        var inefficientTpl = `<div class="item land-info-con">
                            <div class="use-purpose-title"><span class="title">低效土地信息</span></div>
                                <div class="land-info-bd">
                                    <table class="table table-bordered">
                                        <tbody>
                                        <tr>
                                            <td class="nowrap land-row-title">土地面积:</td><td class="two-row">${inefficientData[3]}亩</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">已开发土地面积:</td><td>${inefficientData[4]}亩</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">未开发土地面积:</td><td class="two-row">${inefficientData[5]}亩</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">协议签订时间:</td><td>${inefficientData[7] && inefficientData[7] != '/' ? inefficientData[7] : '未知'}</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">项目总投资或固定资产:</td><td class="two-row">${inefficientData[8] && inefficientData[8] != '/' ? inefficientData[8] : '未知'}</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">协议约定建设规模（亩）:</td><td>${inefficientData[9] && inefficientData[9] != '/' ? inefficientData[9] : '未知'}</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">约定动工时间（年月日）:</td><td class="two-row">${inefficientData[10] && inefficientData[10] != '/' ? inefficientData[10] : '未知'}</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">约定竣工时间（年月日）:</td><td>${inefficientData[11] && inefficientData[11] != '/' ? inefficientData[11] : '未知'}</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">项目首期建成时间（年月日）:</td><td class="two-row">${inefficientData[12] && inefficientData[12] != '/' ? inefficientData[12] : '未知'}</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">实际建成规模（亩）:</td><td>${inefficientData[13] && inefficientData[13] != '/' ? (inefficientData[13]/666).toFixed(2) : '未知'}</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">未建成面积（亩）:</td><td class="two-row">${inefficientData[14] && inefficientData[14] != '/' ? (inefficientData[14]/666).toFixed(2) : '未知'}</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">企业2015年年产值（万元）:</td><td>${inefficientData[15] && inefficientData[15] != '/' ? inefficientData[15] : '未知'}</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">企业2015年年销售收入（万元）:</td><td class="two-row">${inefficientData[16] && inefficientData[16] != '/' ? inefficientData[16] : '未知'}</td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap land-row-title">是否有下一步用地需求:</td><td>${inefficientData[17] && inefficientData[17] != '/' ? inefficientData[17] : '未知'}</td>
                                        </tr>
                                    </tbody></table>
                                </div>
                            </div>`;
        $(".land-panel-con .land-use-purpose-box").append(inefficientTpl);
        $(".land-panel-con .land-use-purpose-scroll").mCustomScrollbar("update");
      }else{
        var inefficientTpl = `<div class="item land-info-con">
                            <div class="use-purpose-title inefficient-use-purpose-title"><span class="title">低效土地信息</span></div>
                                <div class="land-info-bd" style="background: url('../images/notData.png') center no-repeat;height: 200px;background-size: contain;">
                                    
                                </div>
                            </div>`;
        $(".land-panel-con .land-use-purpose-box").append(inefficientTpl);
        $(".land-panel-con .land-use-purpose-scroll").mCustomScrollbar("update");
      }

    },error:function(err){
      console.log(err)
    }

  })
}
/*产业高质量企业后十名控制*/
$(".industry-last-colors-panel .land-colors-list .color-blank").on("click",function(){
  /*获取当前显示的产业类型*/
  var emList = $(".eco-color-xh").find(".color-blank");
  var type = null;
  var scaleType = $(".scale-enterprise-color-panel .color-blank.active").data("type");
  scaleType = scaleType == 'scaleUp' ? 'up' : 'down';
  $.each(emList,function(v,i){
    if($(this).hasClass("active")){
      type = $(this).data("catname");
    }
  });
  // type = type == 'living' ? '生物医药' : type == 'electron' ? '电子信息' : '先进制造';
  /*判断有没有选择产业类型*/
  // var checkedIndustry = $(".eco-color-xh .color-blank.active");
  // if(checkedIndustry.length < 1){
  //   alert('请选择产业类型！');
  //   return;
  // }
  /*判断是否后十名按钮*/
  if($(this).hasClass("last-10-land")){
    if(!$(this).hasClass("active")){
      // $(".eco-color-xh .color-blank").removeClass("active");
      /*后十名按钮*/
      $(".industry-last-colors-panel .color-blank").removeClass("active");
      $(this).addClass("active");
      map.clearMap();
      creatWestAreaLandRangeCj(map);


      creatHighEnterpriseLast10Land(map,type,scaleType);
    }
  }else{
    /*低效按钮*/
    if($(".last-10-land").hasClass("active")){
      map.clearMap();
      creatWestAreaLandRangeCj(map);
      if($(this).hasClass("active")){
        /*恢复后十名样式*/
        creatHighEnterpriseLast10Land(map,type,scaleType);
      }else{
        creatHighEnterpriseLast10InefficientLand(map,type,scaleType);
      }

      $(this).toggleClass("active");
    }else{
      alert('请选择后十名')
    }
  }

});
/*绘制高质量企业后十名地块*/
function creatHighEnterpriseLast10Land(map,type,scaleType){
  /*请求新数据将保存的地块对象清除*/
  polygonHighEnterpriseLands.lands=[];
  var time = $(".datetimepicker-scale-enterprise input").val();
  var industryType = type;
  var scaleType = scaleType;
  newpointers = dataPolygonHighEnterpriseLands;
  //-----
  /*1级*/
  var colors = ["#f5d11d", "#12ffff", "#a57c52", "#7d7dff", "#ff0000"];
  /*2级*/
  var colors2 = ["#b3576e", "#b35900", "#59432d", "#5e5ebf", "#b30000"];
  /*3级*/
  var colors3 = ["#66323f", "#4d2600", "#0d0a06", "#3e3e7e", "#660000"];
  /*降序取前6*/
  /*if(type == '生物医药'){
    var sortAscLivingHighQualityData = highQualityAllData[time]['生物医药'].sort(compareFn('qualityNum'));
  }else{
    var sortAscElectronHighQualityData = highQualityAllData[time]['电子信息'].sort(compareFn('qualityNum'));
  }*/
  // var sortAscHighQualityData = highQualityAllData[time][industryType].sort(compareFn('qualityNum'));
  var sortScaleEnterpriseAllData = [];
  /*取出需要的产业类型的规上规下的数据*/
  for (var i = 0; i < scaleEnterpriseAllData[scaleType].length; i++) {
    if(scaleEnterpriseAllData[scaleType][i].enterpriseType == industryType || scaleEnterpriseAllData[scaleType][i].companyIndustryType == industryType){
      sortScaleEnterpriseAllData.push(scaleEnterpriseAllData[scaleType][i]);
    }
  }
  var markerResult = [];
  for (var i = 0; i < newpointers.length; i++) {
    var color = defaultLandColor;
    var borderColor = defaultBorderColor;
    var isIndustryLand = false;
    var rankNum = '';

    // if ((newpointers[i].enterpriseType == industryType)) {
      /*添加公司Id到地块*/
      for(var j = 0; j < 10; j++){
        /*取后面十条数据*/
        var index = sortScaleEnterpriseAllData.length - (j+1);
            if (sortScaleEnterpriseAllData[index] && (sortScaleEnterpriseAllData[index].enterpriseType == industryType || sortScaleEnterpriseAllData[index].companyIndustryType == industryType) && (sortScaleEnterpriseAllData[index].landBlockId == newpointers[i].id || sortScaleEnterpriseAllData[index].companyName == newpointers[i].actualUsers)) {
              /*判断是否属于规上和规下数据里*/
              // companyId = sortLivingHighQualityData[j].id;
              isIndustryLand = true;
              color = "#01d1dd";
              borderColor = "#01d1dd";
              /*if(j == 0){
                color = "#1139ff";
                borderColor = "#1139ff";
              }else if(j == 1){
                color = "#124dff";
                borderColor = "#124dff";
              }else if(j == 2){
                color = "#1261ff";
                borderColor = "#1261ff";
              }else if(j == 3){
                color = "#1275ff";
                borderColor = "#1275ff";
              }else if(j == 4){
                color = "#1288ff";
                borderColor = "#1288ff";
              }else if(j == 5){
                color = "#129cff";
                borderColor = "#129cff";
              }else if(j == 6){
                color = "#12b0ff";
                borderColor = "#12b0ff";
              }else if(j == 7){
                color = "#12c4ff";
                borderColor = "#12c4ff";
              }else if(j == 8){
                color = "#12d7ff";
                borderColor = "#12d7ff";
              }else if(j == 9){
                color = "#12ebff";
                borderColor = "#12ebff";
              }else{
                color = "#12ffff";
                borderColor = "#12ffff";
              }*/

            }else{
              borderColor = defaultBorderColor;
            }
      }
      // var color ="transparent"
    // }else{
    //   borderColor = defaultBorderColor;
    // }

    var polygonOptions = {
      map: map,
      strokeColor: borderColor,
      // strokeColor: color,
      strokeWeight: defaultStrokeWeight,
      fillColor: color,
      // fillColor: 'transparent',
      fillOpacity: 0.8,
      /*strokeStyle: "dashed",
  strokeDasharray: [20,10],*/
      extData: {
        id: newpointers[i].id,
        ecoLv: newpointers[i].ecoLv,
        actualUsers: newpointers[i].actualUsers,
        pricepermeter: newpointers[i].pricepermeter,
        landCardNumber: newpointers[i].landCardNumber,
        landArea: newpointers[i].landArea,
        usageArea: newpointers[i].usageArea,
        /*按性质分类*/
        generalType: newpointers[i].generalType,
        enterpriseType: newpointers[i].enterpriseType,
        landUsrNature: newpointers[i].landUsrNature,
        unifiedLandMark: newpointers[i].unifiedLandMark,
        landIsLocated: newpointers[i].landIsLocated,
        rightHolder: newpointers[i].rightHolder,
        color: color,
        borderColor: borderColor,
        companyId: newpointers[i].companyId,
        companyName: newpointers[i].companyName,
        companyIcon: newpointers[i].companyIcon,
        isIndustryLand: isIndustryLand,
        rankNum: rankNum,
        slected: false
      }
    };
    // 外多边形坐标数组和内多边形坐标数组
    var pointers = newpointers[i].positions;
    polygonHighLand = new AMap.Polygon(polygonOptions);
    polygonHighLand.on("click", function (e) {
      /*看数据*/
      console.log(this.getExtData())
      if (!this.getExtData().slected) {
        var lanTitle = idustryParkName;
        var landArea = this.getExtData().landArea;
        var landUsrNature = this.getExtData().landUsrNature;
        var that = this;
        var unifiedLandMark = this.getExtData().unifiedLandMark;
        chooseLanId = unifiedLandMark;

        //在地图上改变当前点击的多边形
        for (var i = 0; i < polygonHighEnterpriseLands.lands.length; i++) {
          if (polygonHighEnterpriseLands.lands[i].getExtData().borderColor != polygonHighEnterpriseLands.lands[i].getOptions().strokeColor) {
            polygonHighEnterpriseLands.lands[i].setOptions({
              strokeColor: polygonHighEnterpriseLands.lands[i].getExtData().borderColor,
              fillColor: polygonHighEnterpriseLands.lands[i].getExtData().color,
              strokeWeight: defaultStrokeWeight
            });
            var oldExtData = polygonHighEnterpriseLands.lands[i].getExtData();//先保存原始ExtData数据
            oldExtData.slected = false;//改变之前选中的状态为false
            polygonHighEnterpriseLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
            break;
          }
        }
        var newExtData = this.getExtData();
        newExtData.slected = true;
        this.setOptions({strokeColor:selectedBorderColor, strokeWeight:selectedStrokeWeight});
        this.setExtData(newExtData);
        var options = {
          lanTitle: lanTitle,
          landArea: landArea,
          landUsrNature: landUsrNature,
          polygon: that
        };
        // landInfoWindowFn(map, options, "polygonEcLands");

        // viewHighEnterpriseLandPanel(this.getExtData());
        viewScaleEnterpriseLandInfo(this.getExtData(),scaleType);
      }
    });
    polygonHighLand.setPath(pointers);
    /*if(type == '生物医药'){
      for (var j = 0; j < 10; j++){
        if(sortAscLivingHighQualityData[j].name == newpointers[i].actualUsers && newpointers[i].enterpriseType == "生物医药"){
          var markerList={};
          markerList = polygonHighLand.getExtData();

          markerList.ranking = j+1;

          var markerText = new AMap.Text({
            map: map,
            textAlign: 'center',
            text: '<div class="high-enterprise-rank">'+markerList.ranking+'</div>',
            position: polygonHighLand.getBounds().getCenter()
          });
          markerResult.push(markerText);
        }
      }
    }else{
      /!*电子信息*!/
      for (var j = 0; j < 10; j++){
        if(sortAscElectronHighQualityData[j].name == newpointers[i].actualUsers && newpointers[i].enterpriseType == "电子信息"){
          var markerList={};
          markerList = polygonHighLand.getExtData();

          markerList.ranking = j+1;

          var markerText = new AMap.Text({
            map: map,
            textAlign: 'center',
            text: '<div class="high-enterprise-rank">'+markerList.ranking+'</div>',
            position: polygonHighLand.getBounds().getCenter()
          });
          markerResult.push(markerText);
        }
      }
    }*/

    polygonHighEnterpriseLands.lands.push(polygonHighLand)
  }
  // markerRankTextList = markerResult;
  // creatHighEnterpriseMarkerPoint(map,{result: markerResult});
  map.setFitView();
  map.setZoom(14);
  $(".zdy-full-cover-mask").remove();
}
/*绘制高质量企业后十名低效地块*/
function creatHighEnterpriseLast10InefficientLand(map,type,scaleType){
  /*请求新数据将保存的地块对象清除*/
  polygonHighEnterpriseLands.lands=[];
  var time = $(".datetimepicker-top-box input").val();
  var industryType = type;
  newpointers = dataPolygonHighEnterpriseLands;
  //-----
  /*1级*/
  var colors = ["#f5d11d", "#12ffff", "#a57c52", "#7d7dff", "#ff0000"];
  /*2级*/
  var colors2 = ["#b3576e", "#b35900", "#59432d", "#5e5ebf", "#b30000"];
  /*3级*/
  var colors3 = ["#66323f", "#4d2600", "#0d0a06", "#3e3e7e", "#660000"];
  /*降序取前6*/
  /*if(type == '生物医药'){
    var sortAscLivingHighQualityData = highQualityAllData[time]['生物医药'].sort(compareFn('qualityNum'));
  }else{
    var sortAscElectronHighQualityData = highQualityAllData[time]['电子信息'].sort(compareFn('qualityNum'));
  }*/
  // var sortAscHighQualityData = highQualityAllData[time][industryType].sort(compareFn('qualityNum'));
  var sortScaleEnterpriseAllData = [];
  /*取出需要的产业类型的规上规下的数据*/
  for (var i = 0; i < scaleEnterpriseAllData[scaleType].length; i++) {
    if(scaleEnterpriseAllData[scaleType][i].enterpriseType == industryType || scaleEnterpriseAllData[scaleType][i].companyIndustryType == industryType){
      sortScaleEnterpriseAllData.push(scaleEnterpriseAllData[scaleType][i]);
    }
  }

  var markerResult = [];
  for (var i = 0; i < newpointers.length; i++) {
    var color = defaultLandColor;
    var borderColor = defaultBorderColor;
    var isIndustryLand = false;
    var rankNum = '';
      /*添加公司Id到地块*/
      for(var j = 0; j < 10; j++){
        /*取后面十条数据*/
        var index = sortScaleEnterpriseAllData.length - (j+1);
        if (sortScaleEnterpriseAllData[index] && (sortScaleEnterpriseAllData[index].enterpriseType == industryType || sortScaleEnterpriseAllData[index].companyIndustryType == industryType) && (sortScaleEnterpriseAllData[index].landBlockId == newpointers[i].id || sortScaleEnterpriseAllData[index].companyName == newpointers[i].actualUsers)) {
          /*判断是否属于规上和规下数据里*/
          // companyId = sortLivingHighQualityData[j].id;
          isIndustryLand = true;
          color = "#01d1dd";
          if(newpointers[i].inefficient){
            borderColor = "#dd0001";
          }else{
            borderColor = "#01d1dd";
          }
        }else{
          borderColor = defaultBorderColor;
        }
      }
    var polygonOptions = {
      map: map,
      strokeColor: borderColor,
      // strokeColor: color,
      strokeWeight: defaultStrokeWeight,
      fillColor: color,
      // fillColor: 'transparent',
      fillOpacity: 0.8,
      /*strokeStyle: "dashed",
  strokeDasharray: [20,10],*/
      extData: {
        id: newpointers[i].id,
        ecoLv: newpointers[i].ecoLv,
        actualUsers: newpointers[i].actualUsers,
        pricepermeter: newpointers[i].pricepermeter,
        landCardNumber: newpointers[i].landCardNumber,
        landArea: newpointers[i].landArea,
        usageArea: newpointers[i].usageArea,
        /*按性质分类*/
        generalType: newpointers[i].generalType,
        enterpriseType: newpointers[i].enterpriseType,
        landUsrNature: newpointers[i].landUsrNature,
        unifiedLandMark: newpointers[i].unifiedLandMark,
        landIsLocated: newpointers[i].landIsLocated,
        rightHolder: newpointers[i].rightHolder,
        color: color,
        borderColor: borderColor,
        companyId: newpointers[i].companyId,
        companyName: newpointers[i].companyName,
        companyIcon: newpointers[i].companyIcon,
        isIndustryLand: isIndustryLand,
        rankNum: rankNum,
        slected: false
      }
    };
    // 外多边形坐标数组和内多边形坐标数组
    var pointers = newpointers[i].positions;
    polygonHighLand = new AMap.Polygon(polygonOptions);
    polygonHighLand.on("click", function (e) {
      /*看数据*/
      console.log(this.getExtData())
      if (!this.getExtData().slected) {
        var lanTitle = idustryParkName;
        var landArea = this.getExtData().landArea;
        var landUsrNature = this.getExtData().landUsrNature;
        var that = this;
        var unifiedLandMark = this.getExtData().unifiedLandMark;
        chooseLanId = unifiedLandMark;

        //在地图上改变当前点击的多边形
        for (var i = 0; i < polygonHighEnterpriseLands.lands.length; i++) {
          if (polygonHighEnterpriseLands.lands[i].getExtData().borderColor != polygonHighEnterpriseLands.lands[i].getOptions().strokeColor) {
            polygonHighEnterpriseLands.lands[i].setOptions({
              strokeColor: polygonHighEnterpriseLands.lands[i].getExtData().borderColor,
              fillColor: polygonHighEnterpriseLands.lands[i].getExtData().color,
              strokeWeight: defaultStrokeWeight
            });
            var oldExtData = polygonHighEnterpriseLands.lands[i].getExtData();//先保存原始ExtData数据
            oldExtData.slected = false;//改变之前选中的状态为false
            polygonHighEnterpriseLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
            // break;
          }
        }
        var newExtData = this.getExtData();
        newExtData.slected = true;
        this.setOptions({strokeColor:selectedBorderColor, strokeWeight:selectedStrokeWeight});
        this.setExtData(newExtData);
        var options = {
          lanTitle: lanTitle,
          landArea: landArea,
          landUsrNature: landUsrNature,
          polygon: that
        };
        // landInfoWindowFn(map, options, "polygonEcLands");

        // viewHighEnterpriseLandPanel(this.getExtData());
        viewScaleEnterpriseLandInfo(this.getExtData(),scaleType);
      }
    });
    polygonHighLand.setPath(pointers);
    /*if(type == '生物医药'){
      for (var j = 0; j < 10; j++){
        if(sortAscLivingHighQualityData[j].name == newpointers[i].actualUsers && newpointers[i].enterpriseType == "生物医药"){
          var markerList={};
          markerList = polygonHighLand.getExtData();

          markerList.ranking = j+1;

          var markerText = new AMap.Text({
            map: map,
            textAlign: 'center',
            text: '<div class="high-enterprise-rank">'+markerList.ranking+'</div>',
            position: polygonHighLand.getBounds().getCenter()
          });
          markerResult.push(markerText);
        }
      }
    }else{
      /!*电子信息*!/
      for (var j = 0; j < 10; j++){
        if(sortAscElectronHighQualityData[j].name == newpointers[i].actualUsers && newpointers[i].enterpriseType == "电子信息"){
          var markerList={};
          markerList = polygonHighLand.getExtData();

          markerList.ranking = j+1;

          var markerText = new AMap.Text({
            map: map,
            textAlign: 'center',
            text: '<div class="high-enterprise-rank">'+markerList.ranking+'</div>',
            position: polygonHighLand.getBounds().getCenter()
          });
          markerResult.push(markerText);
        }
      }
    }*/

    polygonHighEnterpriseLands.lands.push(polygonHighLand)
  }
  // markerRankTextList = markerResult;
  // creatHighEnterpriseMarkerPoint(map,{result: markerResult});
  map.setFitView();
  map.setZoom(14);
  $(".zdy-full-cover-mask").remove();
}
/*产业分布搜索控制*/
$(".industry-fenbu-search .search-btn").on("click",function(){
  /*关闭楼宇marker的名字信息框*/
  if("markerList" in window &&  markerList.getData().length > 0 && markerList.getInfoWindow()){
    markerList.getInfoWindow().close();
  }
  $(".search-cover-mask").css({display:"block"});
  $(".search_input_box").css({transform:'scale(1,1)'});
});
$(".search-cover-mask").on("click",function(){
  $(".search_input_box").css({transform:'scale(0,0)'});
  $(this).css({display:"none"});
});
/*点击搜索*/
$(".search_input_box .search_btn").on("click",function(){
  var val = $(".search_input_box input").val().trim();
  if(val){
    getSearchCompanyList();
  }else{
    alert("请输入关键字进行搜索！")
  }
});
/*enter触发搜索*/
$(".search_input_box input").on("keydown",function(e){
  var val = $(".search_input_box input").val().trim();
  if(e.keyCode == 13){
    if(val){
      getSearchCompanyList();
    }else{
      alert("请输入关键字进行搜索！")
    }
  }
});
/*搜索获取企业列表*/
function getSearchCompanyList(){
  $(".search_input_box").css({transform:'scale(0,0)'});
  $(".search-cover-mask").css({display:"none"});
  loadingFullAnimat("zdy-full-cover-mask", "body");
  var val = $(".search_input_box input").val().trim();
  $.ajax({
    url: '/v1/company/findCompanyLikeName',
    dataType: 'json',
    type: 'GET',
    data: {name: val},
    success: function(res){
      console.log(res);
      showSearchCompanyListPanel(val,res);
      $(".search_input_box input").val("");
      $(".zdy-full-cover-mask").remove();
    },error: function(err){

      $(".zdy-full-cover-mask").remove();
    }
  })


};
/*处理搜索获取的企业列表*/
function showSearchCompanyListPanel(search,options) {
  var search = search;
  var data = options;
  $(".time-colors-panel").css({right: '580px'});
  $(".industry-land-infowindow").hide().addClass("slideOutRight").removeClass("slideInRight");
  $(".right-top-land-infowindow").hide().addClass("slideOutRight").removeClass("slideInRight");
  $(".microcosmic_container").show().addClass("slideInRight").removeClass("slideOutRight");
  var tpl = ``;
  var listTpl = ``;
  data.forEach(function(v,i){
    listTpl += `<div class="search-company-item company-item flex" data-company="${v.name}">
                  <div class="logo">
                      <img src="./images/company_list_logo.png" class="mCS_img_loaded">
                  </div>
                  <div class="item name flex-cell"><div class="top-label">${v.name}</div></div>
                  <div class="item shouru flex-cell"><div class="top-label">${v.industryType ? v.industryType : '未知产业'}</div></div>
                </div>`
  });
  tpl += `<div class="search-company-con">
            <div class="search-company-hd"><div class="title">${search}</div></div>
            <div class="search-company-bd">
             <div class="search-company-scroll">
                <div class="company-list land-company-list">
                  ${listTpl}
                </div>
             </div>
            </div>
          </div>`;
  $(".land-panel-con").html(tpl);

  $(".land-panel-con .search-company-scroll").mCustomScrollbar({
    setHeight: '100%',
    theme: "minimal-dark",
    scrollbarPosition: "inside"
  })
}
/*通过操作搜索的企业列表获标识地块*/
$(".land-panel-con").on("click",".search-company-con .search-company-item",function(){
  $(this).addClass("active").siblings().removeClass("active");
  var name = $(this).data("company");
  markLandForCompany(name);
});
/*标识地块*/
function markLandForCompany(options){
  var company = options;
  //在地图上改变之前点击的多边形
  for (var i = 0; i < polygonEcoLands.lands.length; i++) {
    if (polygonEcoLands.lands[i].getExtData().borderColor != polygonEcoLands.lands[i].getOptions().strokeColor) {
      polygonEcoLands.lands[i].setOptions({
        strokeColor: polygonEcoLands.lands[i].getExtData().borderColor,
        fillColor: polygonEcoLands.lands[i].getExtData().color,
        strokeWeight: defaultStrokeWeight
      });
      var oldExtData = polygonEcoLands.lands[i].getExtData();//先保存原始ExtData数据
      oldExtData.slected = false;//改变之前选中的状态为false
      polygonEcoLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
      // break;
    }
  }

  for (var i = 0; i < polygonEcoLands.lands.length; i++) {
    if(polygonEcoLands.lands[i].getExtData().actualUsers == company){
      var newExtData = polygonEcoLands.lands[i].getExtData();
      // newExtData.slected = true;
      polygonEcoLands.lands[i].setOptions({strokeColor: selectedBorderColor, strokeWeight: selectedStrokeWeight});
      polygonEcoLands.lands[i].setExtData(newExtData);

      var centerBounds = polygonEcoLands.lands[i].getBounds();
      // map.setCenter(centerPositon);
      map.setBounds(centerBounds);
    }
  }
};
/*产业分布二级产业控制*/
$(".industry-color .electron-land").on("click",function (){
  var category = $(this).data("category");
  if(category){
    loadingFullAnimat("zdy-full-cover-mask", "body");
    if ("markerList" in window && markerList.getData().length > 0) {
      //清除marker数据
      markerList.render([]);
      hasBuild = false;
    }
    map.clearMap();
    if($(this).hasClass("active")){
      $(".industry-color .color-list-bd .color-blank").removeClass("active");
      $(".industry-breakdown-color-panel").hide().addClass("slideOutRight").removeClass("slideInRight");
      /*恢复产业分布地块*/
      var newpointers = dataPolygonEcoLands;
      //-----
      /*1级*/
      var colors = ["#f61d1d", "#1139ff","#51b706", "#c4ae8d", "#7d7dff"];
      for (var i = 0; i < newpointers.length; i++) {
        var color = defaultLandColor;
        var borderColor = "#fff";
        var isIndustryLand = null;
        if(newpointers[i].actualUsers){
          color = colors[3];
        }
        if ((newpointers[i].enterpriseType == "生物医药")) {
          color = colors[0];
          isIndustryLand = true;
          // var color ="transparent"
        } else if (newpointers[i].enterpriseType == "电子信息") {
          color = colors[1];
          isIndustryLand = true;
        } else if (newpointers[i].enterpriseType == "先进制造") {
          color = colors[2];
          isIndustryLand = true;
        }else{
          borderColor = defaultBorderColor;
        }
        var polygonOptions = {
          map: map,
          strokeColor: borderColor,
          // strokeColor: color,
          strokeWeight: defaultStrokeWeight,
          fillColor: color,
          fillOpacity: 0.8,
          /*strokeStyle: "dashed",
      strokeDasharray: [20,10],*/
          extData: {
            id: newpointers[i].id,
            ecoLv: newpointers[i].ecoLv,
            actualUsers: newpointers[i].actualUsers,
            pricepermeter: newpointers[i].pricepermeter,
            landCardNumber: newpointers[i].landCardNumber,
            landArea: newpointers[i].landArea,
            usageArea: newpointers[i].usageArea,
            /*按性质分类*/
            generalType: newpointers[i].generalType,
            enterpriseType: newpointers[i].enterpriseType,
            landUsrNature: newpointers[i].landUsrNature,
            unifiedLandMark: newpointers[i].unifiedLandMark,
            landIsLocated: newpointers[i].landIsLocated,
            rightHolder: newpointers[i].rightHolder,
            color: color,
            borderColor: borderColor,
            isIndustryLand : isIndustryLand,
            slected: false
          }
        };
        // 外多边形坐标数组和内多边形坐标数组
        var pointers = newpointers[i].positions;
        polygonEcLand = new AMap.Polygon(polygonOptions);
        polygonEcLand.on("click", function (e) {
          /*看数据*/
          console.log(this.getExtData())
          if (!this.getExtData().slected) {
            var lanTitle = idustryParkName;
            var landArea = this.getExtData().landArea;
            var landUsrNature = this.getExtData().landUsrNature;
            var that = this;
            var unifiedLandMark = this.getExtData().unifiedLandMark;
            chooseLanId = unifiedLandMark;
            //在地图上改变当前点击的多边形
            for (var i = 0; i < polygonEcoLands.lands.length; i++) {
              // if (polygonEcoLands.lands[i].getExtData().slected) {
              if (polygonEcoLands.lands[i].getExtData().borderColor != polygonEcoLands.lands[i].getOptions().strokeColor) {
                polygonEcoLands.lands[i].setOptions({
                  strokeColor: polygonEcoLands.lands[i].getExtData().borderColor,
                  fillColor: polygonEcoLands.lands[i].getExtData().color,
                  strokeWeight: defaultStrokeWeight
                });
                var oldExtData = polygonEcoLands.lands[i].getExtData();//先保存原始ExtData数据
                oldExtData.slected = false;//改变之前选中的状态为false
                polygonEcoLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
                break;
              }
            }
            var newExtData = this.getExtData();
            newExtData.slected = true;
            this.setOptions({strokeColor:selectedBorderColor, strokeWeight:selectedStrokeWeight});
            this.setExtData(newExtData);
            var options = {
              lanTitle: lanTitle,
              landArea: landArea,
              landUsrNature: landUsrNature,
              polygon: that
            };
            // landInfoWindowFn(map, options, "polygonEcLands");
            viewIndustryLandPanel(this.getExtData())
          }
        })
        polygonEcLand.on("mouseover", function (e) {
        })
        polygonEcLand.on("mouseout", function (e) {
          // landInfoWindow.close()
        })
        // console.log(polygon)
        polygonEcLand.setPath(pointers);
        polygonEcoLands.lands.push(polygonEcLand)

      }
      map.setFitView();
      // map.panBy(-550, -40);
      map.setZoom(14);
      $(".zdy-full-cover-mask").remove();

    }else{
      $(".industry-color .color-list-bd .color-blank").removeClass("active");
      $(".industry-breakdown-color-panel").show().addClass("slideInRight").removeClass("slideOutRight");
      $(this).addClass("active");
      creatTypeBreakdownLand(category)
    }
  }
  var tpl = `<div class="land-colors-list">
                  <div class="color-list-title">二级分类</div>
                  <div class="color-list-bd">
                    <div class="color-item"><span class="color-blank network-land"></span>网络通信</div>
                    <div class="color-item"><span class="color-blank circuit-land"></span>集成电路</div>
                    <div class="color-item"><span class="color-blank intelligent-land"></span>智能终端</div>
                    <div class="color-item"><span class="color-blank newtype-land"></span>新型显示</div>
                  </div>
              </div>`;

  $(".industry-breakdown-color-panel").html(tpl);
  // $(".industry-breakdown-color-panel").css({right:"550px"});
});
/*绘制产业分布二级产业地块*/
function creatTypeBreakdownLand(category){
  var newpointers = dataPolygonEcoLands;
  //-----
  /*1级*/
  var colors = ["#1261ff", "#12bcff","#88f3ff","#aad8dc", "#c4ae8d"];
  for (var i = 0; i < newpointers.length; i++) {

    var color = defaultLandColor;
    var borderColor = "#fff";
    var isIndustryLand = null;

    if(category == newpointers[i].enterpriseType){
      if ((newpointers[i].typeBreakdown == "网络通信")) {
        color = colors[0];
        isIndustryLand = true;
        // var color ="transparent"
      } else if (newpointers[i].typeBreakdown == "集成电路") {
        color = colors[1];
        isIndustryLand = true;
      } else if (newpointers[i].typeBreakdown == "智能终端") {
        color = colors[2];
        isIndustryLand = true;
      } else if (newpointers[i].typeBreakdown == "新型显示") {
        color = colors[3];
        isIndustryLand = true;
      }else{
        borderColor = defaultBorderColor;
      }
    }else{
      borderColor = defaultBorderColor;
    }
    var polygonOptions = {
      map: map,
      strokeColor: borderColor,
      // strokeColor: color,
      strokeWeight: defaultStrokeWeight,
      fillColor: color,
      fillOpacity: 0.8,
      /*strokeStyle: "dashed",
  strokeDasharray: [20,10],*/
      extData: {
        id: newpointers[i].id,
        ecoLv: newpointers[i].ecoLv,
        actualUsers: newpointers[i].actualUsers,
        pricepermeter: newpointers[i].pricepermeter,
        landCardNumber: newpointers[i].landCardNumber,
        landArea: newpointers[i].landArea,
        usageArea: newpointers[i].usageArea,
        /*按性质分类*/
        generalType: newpointers[i].generalType,
        enterpriseType: newpointers[i].enterpriseType,
        landUsrNature: newpointers[i].landUsrNature,
        unifiedLandMark: newpointers[i].unifiedLandMark,
        landIsLocated: newpointers[i].landIsLocated,
        rightHolder: newpointers[i].rightHolder,
        color: color,
        borderColor: borderColor,
        isIndustryLand : isIndustryLand,
        slected: false
      }
    };
    // 外多边形坐标数组和内多边形坐标数组
    var pointers = newpointers[i].positions;
    polygonEcLand = new AMap.Polygon(polygonOptions);
    polygonEcLand.on("click", function (e) {
      /*看数据*/
      console.log(this.getExtData())
      if (!this.getExtData().slected) {
        var lanTitle = idustryParkName;
        var landArea = this.getExtData().landArea;
        var landUsrNature = this.getExtData().landUsrNature;
        var that = this;
        var unifiedLandMark = this.getExtData().unifiedLandMark;
        chooseLanId = unifiedLandMark;
        //在地图上改变当前点击的多边形
        for (var i = 0; i < polygonEcoLands.lands.length; i++) {
          // if (polygonEcoLands.lands[i].getExtData().slected) {
          if (polygonEcoLands.lands[i].getExtData().borderColor != polygonEcoLands.lands[i].getOptions().strokeColor) {
            polygonEcoLands.lands[i].setOptions({
              strokeColor: polygonEcoLands.lands[i].getExtData().borderColor,
              fillColor: polygonEcoLands.lands[i].getExtData().color,
              strokeWeight: defaultStrokeWeight
            });
            var oldExtData = polygonEcoLands.lands[i].getExtData();//先保存原始ExtData数据
            oldExtData.slected = false;//改变之前选中的状态为false
            polygonEcoLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
            break;
          }
        }
        var newExtData = this.getExtData();
        newExtData.slected = true;
        this.setOptions({strokeColor:selectedBorderColor, strokeWeight:selectedStrokeWeight});
        this.setExtData(newExtData);
        var options = {
          lanTitle: lanTitle,
          landArea: landArea,
          landUsrNature: landUsrNature,
          polygon: that
        };
        // landInfoWindowFn(map, options, "polygonEcLands");
        viewIndustryLandPanel(this.getExtData())
      }
    })
    polygonEcLand.on("mouseover", function (e) {
    })
    polygonEcLand.on("mouseout", function (e) {
      // landInfoWindow.close()
    })
    // console.log(polygon)
    polygonEcLand.setPath(pointers);
    polygonEcoLands.lands.push(polygonEcLand)

  }
  map.setFitView();
  // map.panBy(-550, -40);
  map.setZoom(14);
  $(".zdy-full-cover-mask").remove();
};
/*企业详情tab栏切换*/
$(".land-company-detail .land-company-detail-tab .detail-tab-item").on("click",function(){
  $(this).addClass("active").siblings().removeClass("active");
  $(".land-company-detail .land-company-detail-con").eq($(this).index()).show().siblings().hide();
});
/*组装企业资质信息*/
function getCompanyAptitudeInfo(options) {
  console.log(options)
  var data = options;
  var listTpl = ``;
  data.forEach(function(v,i){
    listTpl += `<tr><td>${v.name}</td><td>${v.content}</td><td class="nowrap">${timestampToTime(v.validityEnd)}</td></tr>`
  });
  var tpl = `<table class="table table-bordered">
                <tr><th>许可事项/证书名称</th><th>许可内容/范围</th><th>有效期至</th></tr>
                ${listTpl}
            </table>`;

  $(".company-detail-aptitude-con").html(tpl);
}
/*组装企业信用信息*/
function getCompanyCreditInfo(positiveOptions,negativeOptions) {
  console.log(positiveOptions,negativeOptions)
  var positiveData = positiveOptions;
  var negativeData = negativeOptions;
  var listTpl = ``;
  var negativeListTpl = ``;
  positiveData.forEach(function(v,i){
    listTpl += `<tr><td>${v.positiveCreditType ? v.positiveCreditType : '未知'}</td><td>${v.name}</td><td>${v.content ? v.content : '未知'}</td><td>${v.validityEnd ? v.validityEnd : '未知'}</td><td class="nowrap">${v.year}</td></tr>`
  });
  negativeData.forEach(function(v,i){
    negativeListTpl += `<tr><td>${v.negativeCreditType}</td><td>${timestampToTime(v.date)}</td><td>${v.illegalTypes}</td><td>${v.punishmentType}</td><td>${v.content}</td></tr>`
  });
  var tpl = `<table class="table table-bordered">
                <tr><th>正面类型</th><th>奖励事项/荣誉名称</th><th>表彰奖励内容</th><th>奖励级别/评级</th><th>年度</th></tr>
                ${listTpl}
            </table>
            <table class="table table-bordered">
                <tr><th>负面类型</th><th>立案日期/决定日期</th><th>违法行为类型</th><th>处罚类型</th><th>行政处罚内容/原因</th></tr>
                ${negativeListTpl}
            </table>`;
  $(".company-detail-credit-con").html(tpl);
}
/*组装企业税务登记信息*/
function getCompanyTaxationsInfo(options) {
  var data = options;;
  var listTpl = ``;
  if(data && data.length>0){
    data.forEach(function(v,i){
      listTpl += `<tr>
                  <td>${v.registrationType ? v.registrationType : '未知'}</td>
                  <td>${v.certificationDate ? timestampToTime(v.certificationDate) : '未知'}</td>
                  <td>${v.taxAuthority ? v.taxAuthority : '未知'}</td>
                  <td class="nowrap">${v.createDate ? timestampToTime(v.createDate) : '未知'}</td>
                  <td class="nowrap">${v.modifyDate ? timestampToTime(v.modifyDate) : '未知'}</td>
                </tr>`
    });
  }
  var tpl = `<table class="table table-bordered">
                <tr><th>注册类型</th><th>发证日期</th><th>主管税务机关</th><th>创建时间</th><th>修改时间</th></tr>
                ${listTpl}
            </table>`;
  $(".company-detail-taxations-con").html(tpl);
}
/*组装企业商标信息*/
function getCompanyTrademarkInfo(options) {
  var data = options;
  var listTpl = ``;
  if(data && data.length>0){

    data.forEach(function(v,i){
      listTpl += `<tr>
                  <td>${v.trademarkName ? v.trademarkName : '未知'}</td>
                  <td>${v.regCode ? v.regCode : '未知'}</td>
                  <td>${v.classificationCode ? v.classificationCode : '未知'}</td>
                  <td>${v.classification ? v.classification : '未知'}</td>
                  <td>${v.applicationDate ? v.applicationDate : '未知'}</td>
                  <td>${v.pictureLink ? v.pictureLink : '未知'}</td>
                  <td>${v.proccessDate ? v.proccessDate : '未知'}</td>
                  <td>${v.processContent ? v.processContent : '未知'}</td>
                </tr>`
    });
  }
  var tpl = `<table class="table table-bordered">
                <tr>
                  <th>商标名称</th>
                  <th>注册号</th>
                  <th>分类码</th>
                  <th>分类名</th>
                  <th>申请日期</th>
                  <th>商标链接</th>
                  <th>流程日期</th>
                  <th>流程内容</th>
                </tr>
                ${listTpl}
              </table>
            </table>`;
  $(".company-detail-trademark-con").html(tpl);
}
/*组装企业专利信息*/
function getCompanyPatentInfo(options) {
  var data = options.sort(compareFn('applicationDate','desc'));
  var listTpl = ``;
  if(data && data.length>0){

    data.forEach(function(v,i){
      listTpl += `<tr>
                  <td>${v.patentName ? v.patentName : '未知'}</td>
                  <td>${v.patentType ? v.patentType : '未知'}</td>
                  <td class="nowrap">${v.applicationDate ? timestampToTime(v.applicationDate) : '未知'}</td>
                  <td>${v.patentCode ? v.patentCode : '未知'}</td>
                </tr>`
    });
  }
  var tpl = `<table class="table table-bordered">
                <tr>
                  <th>专利名称</th>
                  <th>类型</th>
                  <th>申请日期</th>
                  <th>专利号</th>
                </tr>
                ${listTpl}
              </table>
            </table>`;
  $(".company-detail-patent-con").html(tpl);
}
/*组装企业软件著作权信息*/
function getCompanyCopyrightInfo(options) {
  var data = options;
  var listTpl = ``;
  if(data && data.length>0){

    data.forEach(function(v,i){
      listTpl += `<tr>
                  <td>${v.enterpriseName ? v.enterpriseName : '未知'}</td>
                  <td>${v.softwareName ? v.softwareName : '未知'}</td>
                  <td>${v.SoftwareAbbreviated ? v.SoftwareAbbreviated : '未知'}</td>
                  <td>${v.regDate ? v.regDate : '未知'}</td>
                </tr>`
    });
  }
  var tpl = `<table class="table table-bordered">
                <tr>
                  <th>企业名称</th>
                  <th>软件全称</th>
                  <th>软件简称</th>
                  <th>登记日期</th>
                </tr>
                ${listTpl}
              </table>
            </table>`;
  $(".company-detail-copyright-con").html(tpl);
}
/*组装企业作品著作权信息*/
function getCompanyWorksCopyrightInfo(options) {
  var data = options;
  var listTpl = ``;
  if(data && data.length>0){

    data.forEach(function(v,i){
      listTpl += `<tr>
                  <td>${v.enterpriseName ? v.enterpriseName : '未知'}</td>
                  <td>${v.worksName ? v.worksName : '未知'}</td>
                  <td>${v.worksType ? v.worksType : '未知'}</td>
                  <td>${v.completedDate ? v.completedDate : '未知'}</td>
                </tr>`
    });
  }
  var tpl = `<table class="table table-bordered">
                <tr>
                  <th>企业名称</th>
                  <th>作品名称</th>
                  <th>类别</th>
                  <th>完成日期</th>
                </tr>
                ${listTpl}
              </table>
            </table>`;
  $(".company-detail-workscopyright-con").html(tpl);
}
/*组装企业ICP信息*/
function getCompanyICPCopyrightInfo(options) {
  var data = options;
  var listTpl = ``;

  if(data && data.length>0){

    data.forEach(function(v,i){
      listTpl += `<tr>
                  <td>${v.enterpriseName ? v.enterpriseName : '未知'}</td>
                  <td>${v.homepageURL ? v.homepageURL : '未知'}</td>
                  <td>${v.websiteName ? v.websiteName : '未知'}</td>
                  <td>${v.auditDate ? v.auditDate : '未知'}</td>
                  <td>${v.domainName ? v.domainName : '未知'}</td>
                  <td>${v.newestDate ? v.newestDate : '未知'}</td>
                </tr>`
    });
  }
  var tpl = `<table class="table table-bordered">
                <tr>
                  <th>公司名称</th>
                  <th>主页 URL</th>
                  <th>备案许可号</th>
                  <th>网站名称</th>
                  <th>核查日期</th>
                  <th>域名</th>
                  <th>最后更新时间</th>
                </tr>
                ${listTpl}
              </table>
            </table>`;
  $(".company-detail-icp-con").html(tpl);
}
/*组装企业所属机构信息*/
function getCompanyOwnMechanismInfo(options) {
  var data = options;
  var listTpl = ``;

  if(data && data.length>0){

    data.forEach(function(v,i){
      listTpl += `<tr>
                  <td>${v.name ? v.name : '未知'}</td>
                  <td>${v.address ? v.address : '未知'}</td>
                  <td>${v.approvalTime ? timestampToTime(v.approvalTime) : '未知'}</td>
                  <td>${v.type ? v.type : '未知'}</td>
                  <td>${v.relyUnit ? v.relyUnit : '未知'}</td>
                  <!--<td>${v.generalSituation ? v.generalSituation : '未知'}</td>-->
                  <td>${v.level ? v.level : '未知'}</td>
                </tr>`
    });
  }
  var tpl = `<table class="table table-bordered">
                <tr>
                  <th class="nowrap">名称</th>
                  <th class="nowrap">地址</th>
                  <th class="nowrap">获批时间</th>
                  <th class="nowrap">类别</th>
                  <th class="nowrap">依托单位</th>
                  <!--<th>概况</th>-->
                  <th class="nowrap">级别</th>
                </tr>
                ${listTpl}
              </table>
            </table>`;
  $(".company-own-mechanism").html(tpl);
}
/*时间戳转换*/
function timestampToTime(timestamp) {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  Y = date.getFullYear() + '-';
  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  D = date.getDate() + ' ';
  h = date.getHours() ? date.getHours() + ':' : '';
  m = date.getMinutes() ? date.getMinutes() + ':' : '';
  s = date.getSeconds();
  if(h || m || s){
    return Y+M+D+h+m+s;
  }else{
    return Y+M+D;
  }
}
/*获取企业详情方法*/
function getCompanyInfomations(companyName){

  $(".microcosmic_container").hide().removeClass("slideOutRight").addClass("slideInRight");
  $(".land-company-detail-box").hide().removeClass("slideInRight").addClass("slideOutRight");
  $(".right-top-land-infowindow").hide().removeClass("slideInRight").addClass("slideOutRight");
  $(".industry-land-infowindow").hide().removeClass("slideInRight").addClass("slideOutRight");
  $(".industry-company-list-panel").hide().removeClass("slideInRight").addClass("slideOutRight");
  if(companyName){
    $(".time-colors-panel").css({right: '580px'});
    $('.close-company-detail').data('back',true);
    $(".back-arrow-btn").removeClass("active");
    /*切换回基本信息显示*/
    $(".land-company-detail-tab .detail-tab-item").eq(0).addClass("active").siblings().removeClass("active");
    $(".land-company-detail .land-company-detail-con").eq(0).show().siblings().hide();
    $.ajax({
      url: './jsonData/findCompanyByName.json',
      type: "GET",
      dataType: "json",
      data: {
        name: companyName
      },
      success: function (res) {
        console.log(res)
        var data = res.company;
        var radarData = res.obj;
        $(".land-company-detail-box").show().removeClass("slideOutRight").addClass("slideInRight");
        var logoSrc = data.companyIcon ? data.companyIcon : './images/company_list_logo.png';
        $(".land-company-detail-hd .company-detail-title .logo").attr("src",logoSrc);
        $(".land-company-detail-hd .company-detail-title .title").html(companyName);
        var personnelTpl = '<table class="table table-bordered"><tr><th>年份</th><th>人数(人)</th></tr>';
        var actualTaxTpl = '<table class="table table-bordered"><tr><th>年份</th><th>税收(千元)</th></tr>';
        var supportAmountTpl = '<table class="table table-bordered"><tr><th>年份</th><th>补贴(千元)</th></tr>';
        var foulWaterTpl = '<table class="table table-bordered"><tr><th>年份</th><th>排污(kg)</th></tr>';
        var productTpl = '<table class="table table-bordered"><tr><th>年份</th><th>产品</th></tr>';
        data.chains = data.chains.sort(compareFn('year','desc'));
        data.chains.forEach(function(v,i){
          personnelTpl += `<tr><td>${v.year}</td><td>${v.numberOfEmployees ? v.numberOfEmployees : "未知"}</td></tr>`;
          actualTaxTpl += `<tr><td>${v.year}</td><td>${v.actualTax ? v.actualTax : "未知"}</td></tr>`;
          supportAmountTpl += `<tr><td>${v.year}</td><td>${v.supportAmount ? v.supportAmount : "未知"}</td></tr>`;
          foulWaterTpl += `<tr><td>${v.year}</td><td>${v.emissionsRights ? v.emissionsRights : "未知"}</td></tr>`;
          productTpl += `<tr><td>${v.year}</td><td>${v.product ? v.product : "未知"}</td></tr>`;
        });
        personnelTpl += `</table>`;
        actualTaxTpl += `</table>`;
        supportAmountTpl += `</table>`;
        foulWaterTpl += `</table>`;
        productTpl += `</table>`;
        $("#personnel").html(personnelTpl);
        $("#product").html(productTpl);
        $("#foul-water").html(foulWaterTpl);
        $("#tax-revenue").html(actualTaxTpl);
        $("#enterprise-subsidy").html(supportAmountTpl);
        $("#scale-type").html(`${data.regulatoryCompanies ? data.regulatoryCompanies : '未知'}`);
        $("#has-land").html(`${data.isHasLand ? data.isHasLand : '未知'}`);
        var registerTpl = `<table class="table table-bordered">
                              <tr><td class="nowrap">地址(住所)</td><td>${data.address ? data.address : '未知'}</td><td class="nowrap">统一社会信用代码</td><td>${data.creditCode ? data.creditCode : '未知'}</td></tr>
                              <tr><td class="nowrap">组织机构代码</td><td>${data.organizationCode ? data.organizationCode : '未知'}</td><td class="nowrap">企业类型</td><td>${data.enterpriseType ? data.enterpriseType : '未知'}</td></tr>
                              <tr><td class="nowrap">行业类型</td><td>${data.industryType ? data.industryType : '未知'}</td><td class="nowrap">注册资本</td><td>${data.funds ? data.funds : '未知'}</td></tr>
                              <tr><td class="nowrap">注册资本币种</td><td>${data.currencyType ? data.currencyType : "未知"}</td><td class="nowrap">成立时间</td><td>${timestampToTime(data.establishTime)}</td></tr>
                              <tr><td class="nowrap">营业期限自</td><td>${timestampToTime(data.operatingPeriodStrat)}</td><td class="nowrap">营业期限至</td><td>${timestampToTime(data.operatingPeriodEnd)}</td></tr>
                              <tr><td class="nowrap">经营范围</td><td colspan="3">${data.range}</td></tr>
                              <tr><td class="nowrap">登记机关</td><td colspan="3">${data.registrationAuthority ? data.registrationAuthority : "未知"}</td></tr>
                              <tr><td class="nowrap">登记状态</td><td>${data.registrationType ? data.registrationType : "未知"}</td><td class="nowrap">核准日期</td><td>${timestampToTime(data.approvedTime)}</td></tr>
                            </table>`;

        $(".company-detail-register").html(registerTpl);
        // creatShouruEcharts(data.chains);
        // creatChanzhiEcharts(data.chains);
        // creatEnergyEcharts(data.chains);
        creatCompanyDetailEcharts(data.chains);
        creatRadarEcharts(radarData);
        /*企业资质信息*/
        getCompanyAptitudeInfo(data.certifications);
        /*企业正负面信息--信用*/
        getCompanyCreditInfo(data.positiveCredit,data.negativeCredit);
        /*企业政府土地补贴*/
        getCompanyLandSubsidies(companyName);
        /*税务登记信息*/
        getCompanyTaxationsInfo(data.taxations);
        /*商标信息*/
        getCompanyTrademarkInfo();
        /*查询专利信息*/
        $.ajax({
          url: './jsonData/findCompanyParam.json',
          type: "GET",
          dataType: "json",
          data: {
            companyName:companyName
          },
          success: function (res) {
            var data = res.patent;
            /*专利信息*/
            getCompanyPatentInfo(data);
          },error: function(err){

          }
        });
        /*查询企业所属机构信息*/
        $.ajax({
          url: './jsonData/getByRelyUnit.json',
          type: "GET",
          dataType: "json",
          data: {
            companyName:companyName
          },
          success: function (res) {
            var data = res;
            /*所属机构*/
            getCompanyOwnMechanismInfo(data);
          },error: function(err){

          }
        });
        /*软件著作权信息*/
        getCompanyCopyrightInfo();
        /*作品著作权信息*/
        getCompanyWorksCopyrightInfo();
        /*ICP信息*/
        getCompanyICPCopyrightInfo();

        $(".land-company-detail-con").mCustomScrollbar({
          setHeight: '100%',
          theme: "minimal-dark",
          scrollbarPosition: "inside"
        });
      },
      error: function (err) {
        console.log(err)
      }
    })
  }else{
    $(".time-colors-panel").css({right: '10px'});
    $(".land-company-detail-box").hide().removeClass("slideInRight").addClass("slideOutRight");
  }
}
/*产业分布企业列表类型切换*/
$('.industry-company-list-panel').on('click','.type-tab .type-tab-item',function(){
  if(!$(this).hasClass('active')){
    $(this).addClass('active').siblings().removeClass('active');
    var time = 2017;
    time = $('.industry-company-list-panel').find(".time-item.active").data('time');

    var type = $(this).data('type');
    $('.industry-company-list-panel .title').html(type);
    $('.industry-company-list-panel .time-item').data('type',type);

    searchIndustryCompanyList(type);

    $(".industry-company-list .land-company-list").mCustomScrollbar("scrollTo","top");

    /*$.ajax({
      // url: "/v1/land/findAll",
      url: "/v1/land/findCompanyByEnterpriseType",
      type:"GET",
      dataType:"json",
      data:{revenueTime:time,enterpriseType:type},
      success:function(res){
        console.log(res);
        var listTpl = '';
        var companyList = res.sort(compareFn('pricepermeter','desc'));
        if(companyList.length > 0){
          companyList.forEach(function(v,i){
            listTpl += `<div class="land-company-item company-item flex" data-company="${v.actualUsers}">
                              <div class="logo">
                                  <img src="../images/company_list_logo.png" class="">
                              </div>
                              <div class="item name flex-cell"><div class="top-label">${v.actualUsers}</div><div class="bot-label">${v.landIsLocated}</div></div>
                              <div class="item shouru flex-cell"><div class="top-label">${Number(v.operatingIncome).toFixed(2)}</div><div class="bot-label">营业收入(万元)</div></div>
                              <div class="jingji flex-cell"><div class="top-label">${Number(v.pricepermeter).toFixed(2)}</div><div class="bot-label">地块每平米营收价值(万元)</div></div>
                          </div>`;
          });
          $(".industry-company-bd .land-company-scroll-con").html(listTpl);
          $(".industry-company-list .land-company-list").mCustomScrollbar("scrollTo","top");
        }
      }
    });*/
  }
});
/*indexedDB操作*/
function openDB (name,version,callback) {
  var version=version || 1;
  var request=window.indexedDB.open(name,version);
  request.onerror=function(e){
    console.log(e.currentTarget.error.message);
  };
  request.onsuccess=function(e){
    db = myDB.db = e.target.result;

    if(callback){callback()}
  };
  request.onupgradeneeded=function(e){
    var db=e.target.result;
    if(!db.objectStoreNames.contains('landData')){
      var objectStore = db.createObjectStore('landData',{keyPath:"type"});
      // 定义存储对象的数据项
      objectStore.createIndex('type', 'type', {
        unique: true
      });
    }
    console.log('DB version changed to '+version);
  };
}

var indexeDBmethod = {
  add: function (storeName,newItem) {
    var transaction = db.transaction([storeName], "readwrite");
    // 打开已经存储的数据对象
    var objectStore = transaction.objectStore(storeName);
    // 添加到数据对象中
    var objectStoreRequest = objectStore.add(newItem);
    objectStoreRequest.onsuccess = function(event) {
      // method.show();
    };
  },
  edit: function (storeName,type, data) {
    // 编辑数据
    var transaction = db.transaction([storeName], "readwrite");
    // 打开已经存储的数据对象
    var objectStore = transaction.objectStore(storeName);
    // 获取存储的对应键的存储对象
    var objectStoreRequest = objectStore.get(type);
    // 获取成功后替换当前数据
    objectStoreRequest.onsuccess = function(event) {
      // 当前数据
      var myRecord = objectStoreRequest.result;
      // 遍历替换
      for (var key in data) {
        if (typeof myRecord[key] != 'undefined') {
          myRecord[key] = data[key];
        }
      }
      // 更新数据库存储数据
      objectStore.put(myRecord);
    };
  },
  del: function (storeName,type) {
    // 打开已经存储的数据对象
    var objectStore = db.transaction([storeName], "readwrite").objectStore(storeName);
    // 直接删除
    var objectStoreRequest = objectStore.delete(type);
    // 删除成功后
    objectStoreRequest.onsuccess = function() {
      // method.show();
    };
  },
  get: function (storeName) {
    // 最终要展示的HTML数据
    var lists = [];
    // 打开对象存储，获得游标列表
    var objectStore = db.transaction(storeName).objectStore(storeName);
    objectStore.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      // 如果游标没有遍历完，继续下面的逻辑
      if (cursor) {
        lists.push(cursor.value);
        // 继续下一个游标项
        cursor.continue();
        // 如果全部遍历完毕
      } else {
        console.log(lists);
        return lists;
      }
    }
  },
  byIndexGet: function (storeName,type,callback){
    var transaction=db.transaction(storeName);
    var store=transaction.objectStore(storeName);
    var index = store.index("type");
    index.get(type).onsuccess=function(e){
      var result=e.target.result;
      if(callback){
        callback(result)
      }
    }
  }
}
/*判断数据版本*/
function getVersionNum(){
  var localVersion;
  indexeDBmethod.byIndexGet('landData','version',function(result){
    if(result){
      $.ajax({
        url: './jsonData/getVersion.json',
        type: 'GET',
        dataType: 'json',
        success: function(res){
          console.log(res)
          if(result.data != res.version){
            /*版本号不一致，清除已储存数据*/
            indexeDBmethod.del('landData','dataPolygonEcoLands');
            indexeDBmethod.del('landData','dataPolygonHighEnterpriseLands');
            indexeDBmethod.del('landData','dataPolygonNatureLands');
            indexeDBmethod.del('landData','highQualityAllData');
            indexeDBmethod.edit('landData','version',{type: 'version',data: res.version})
          }
        },error: function(err){

        }
      })
    }else{
      $.ajax({
        url: './jsonData/getVersion.json',
        type: 'GET',
        dataType: 'json',
        success: function(res){
          console.log(res)
          indexeDBmethod.add('landData',{type: 'version',data: res.version})
        },error: function(err){

        }
      })
    }
  })
}
/*本地储存配置*/
var myDB={
  name:'test',
  version:1,
  db:null
};
var dbName= myDB.name;
var db;

/*标识地块--自用*/
var searchLandMarker;
$("#land-search").on('keydown',function(e){
  var key = e.keyCode;
  var companyName = $(this).val().trim();
  if(key == 13){
    var splitStr = companyName.split(',');
    if(splitStr.length > 1){
      if(searchLandMarker)map.remove(searchLandMarker);
      searchLandMarker = new AMap.Marker({
        map: map,
        position: splitStr
      })
      map.setCenter(splitStr)
      return;
    }
    var len = polygonNatureLands.lands.length;
    //在地图上改变当前点击的多边形
    for (var i = 0; i < len; i++) {
      // if (polygonHighEnterpriseLands.lands[i].getExtData().slected) {
      if (polygonNatureLands.lands[i].getExtData().borderColor != polygonNatureLands.lands[i].getOptions().strokeColor) {
        polygonNatureLands.lands[i].setOptions({
          strokeColor: defaultBorderColor,
          fillColor: polygonNatureLands.lands[i].getExtData().color,
          strokeWeight: defaultStrokeWeight
        });
        var oldExtData = polygonNatureLands.lands[i].getExtData();//先保存原始ExtData数据
        oldExtData.slected = false;//改变之前选中的状态为false
        polygonNatureLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
        // break;
      }
    }
    for(var i = 0; i < len; i++){
      if(polygonNatureLands.lands[i].getExtData().rightHolder == companyName){
        var newExtData = polygonNatureLands.lands[i].getExtData();
        // newExtData.slected = true;
        polygonNatureLands.lands[i].setOptions({strokeColor:selectedBorderColor, strokeWeight:selectedStrokeWeight});
        polygonNatureLands.lands[i].setExtData(newExtData);
        var centerPositon = polygonNatureLands.lands[i].getBounds().getCenter();
        var centerBounds = polygonNatureLands.lands[i].getBounds();
        // map.setCenter(centerPositon);
        map.setBounds(centerBounds);
        // map.setZoom(16)
      }
    }

  }
});