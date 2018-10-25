/*产业--规上、规下企业*/
var scaleEnterpriseAllData = {up: [], down: []};//规上规下企业数据
var dataPolygonScaleTypeSingleLands = {up: [], down: []};//保存规上与规下单独地块数据
var polygonScaleEnterpriseLands = {lands: []};//保存已绘制好的地块数据
$(".build-switch .scale-enterprise").on("click",function () {
  if(!$(this).hasClass("active")){
    loadingFullAnimat("zdy-full-cover-mask", "body");
    /*
    1、清空地图上所有覆盖物
    2、绘制规上规下地块
    3、控制轨上轨下概况和色块图列
    */
    map.clearMap();
    initControll();
    creatWestAreaLandRangeCj(map);
    $(".right-top-land-infowindow").show().addClass("slideInRight").removeClass("slideOutRight");
    /*色块图列 恢复选中规上*/
    $(".scale-enterprise-color .scale-up-land").addClass("active").parent().siblings().find(".color-blank").removeClass("active");

    var time = Number($(".datetimepicker-scale-enterprise input").val());
    var type = 'up';
    /*判断内存是否已存在数据*/
    if(dataPolygonNatureLands.length > 0){
      /*判断是否存在综合评价的企业列表*/
      if(scaleEnterpriseAllData[type].length > 0){

        var scaleEnterpriseLands = $.extend([],dataPolygonNatureLands,true);
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
      indexeDBmethod.byIndexGet('landData','dataPolygonNatureLands',function(res){
        var dbData = res;
        dataPolygonNatureLands = dbData ? dbData.data : dataPolygonNatureLands;
        if ( dataPolygonNatureLands.length > 0) {
          /*从indexedDB取数据*/
          // creatElectronLivingCateLandSingle(map,type);
          /*判断是否存在综合评价的企业列表*/
          /*判断是否存在综合评价的企业列表*/
          if(scaleEnterpriseAllData[type].length > 0){

            var scaleEnterpriseLands = $.extend([],dataPolygonNatureLands,true);
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
          getScaleEnterpriseData(time,type);
        }
      })

    }

    $(".right-top-land-infowindow .icon-ctrl-scroll").mCustomScrollbar({
      setHeight: '100%',
      theme: "minimal-dark",
      scrollbarPosition: "inside"
    });

    $(".time-colors-panel").show();
    $(".time-colors-panel").css({"right":"420px"});
    $(".land-choose-time").show();
    $(".datetimepicker-scale-enterprise").show();
    $(".scale-enterprise-color").show().siblings().hide();
    $(this).addClass("active");
    $(this).parents(".item").addClass("active");
  }
});
/*规上规下切换*/
$(".scale-enterprise-color .color-blank").on("click",function () {
  var type = $(this).data('type');
  if(!$(this).hasClass("active")){
    $(".microcosmic_container").hide().addClass("slideOutRight").removeClass("slideInRight");
    $(".land-company-detail-box").hide().addClass("slideOutRight").removeClass("slideInRight");
    $(".right-top-land-infowindow").show().addClass("slideInRight").removeClass("slideOutRight");
    $(".time-colors-panel").css({"right":"420px"});

    /*清除后十名色块选中*/
    $(".industry-last-colors-panel .color-blank").removeClass("active");
    /*清除产业类型色块选中*/
    $(".eco-color-xh .color-blank").removeClass("active");
    /*隐藏后十名色块面板*/
    $(".industry-last-colors-panel").hide();
    /*清除所有覆盖物*/
    map.clearMap();
    // initControll();
    creatWestAreaLandRangeCj(map);
    $(this).addClass("active").parent().siblings().find(".color-blank").removeClass("active");
    /*$(".time-colors-panel").show();
    $(".time-colors-panel").css({"right":"420px"});
    $(".land-choose-time").show();
    $(".datetimepicker-scale-enterprise").show();
    $(".scale-enterprise-color").show().siblings().hide();*/
    // creatLivingCateLandSingle(map);
    // creatElectronLivingCateLandSingle(map,"生物医药");

    loadingFullAnimat("zdy-full-cover-mask","body");
    type = type == 'scaleUp' ? 'up' : 'down';
    var time = $(".datetimepicker-scale-enterprise input").val();
    // var dataOptions = dataPolygonNatureLands;
    var dataOptions = dataPolygonHighEnterpriseLands;
    /*判断当前选中的是否已经缓存啦数据*/
    if(scaleEnterpriseAllData[type].length > 0){
      creatScaleEnterpriseLandSingleAgain(map,type,time,dataOptions)
    }else{
      getScaleEnterpriseData(time,type);
    }
  }
});
/*产业规上企业--首次查询默认时间的数据*/
function getScaleEnterpriseDataOld(time,type) {
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
            var scaleEnterpriseLands = $.extend([],dataPolygonNatureLands,true);
            scaleEnterpriseAllData[type].forEach(function(v,i){
              scaleEnterpriseLands.forEach(function(value,index){
                if(v.landBlockId == value.id || value.actualUsers == v.companyName){
                  /*将企业信息添加到地块数据*/
                  value.companyName = v.companyName;
                  value.companyId = v.id;
                }
              })
            });
            creatScaleEnterpriseLandSingleAgain(map,type,time,scaleEnterpriseLands)
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
          url: './jsonData/findAllBelowOverallRatingInfo'+time+'.json',
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
            var scaleEnterpriseLands = $.extend([],dataPolygonNatureLands,true);
            scaleEnterpriseAllData[type].forEach(function(v,i){
              scaleEnterpriseLands.forEach(function(value,index){
                if(v.landBlockId == value.id || value.actualUsers == v.companyName){
                  /*将企业信息添加到地块数据*/
                  value.companyName = v.companyName;
                  value.companyId = v.id;
                }
              })
            });
            creatScaleEnterpriseLandSingleAgain(map,type,time,scaleEnterpriseLands)
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
/*产业规上企业--首次查询默认时间的数据*/
function getScaleEnterpriseData(time,type) {
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
            var scaleEnterpriseLands = $.extend([],dataPolygonHighEnterpriseLands,true);
            scaleEnterpriseAllData[type].forEach(function(v,i){
              scaleEnterpriseLands.forEach(function(value,index){
                if(v.landBlockId == value.id || value.actualUsers == v.companyName){
                  /*将企业信息添加到地块数据*/
                  value.companyName = v.companyName;
                  value.companyId = v.id;
                }
              })
            });
            creatScaleEnterpriseLandSingleAgain(map,type,time,scaleEnterpriseLands)
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
          url: './jsonData/findAllBelowOverallRatingInfo'+time+'.json',
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
            var scaleEnterpriseLands = $.extend([],dataPolygonHighEnterpriseLands,true);
            scaleEnterpriseAllData[type].forEach(function(v,i){
              scaleEnterpriseLands.forEach(function(value,index){
                if(v.landBlockId == value.id || value.actualUsers == v.companyName){
                  /*将企业信息添加到地块数据*/
                  value.companyName = v.companyName;
                  value.companyId = v.id;
                }
              })
            });
            creatScaleEnterpriseLandSingleAgain(map,type,time,scaleEnterpriseLands)
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
/*产业规上企业--将已处理或缓存的数据绘图*/
function creatScaleEnterpriseLandSingleAgain(map,type,time,dataOptions){
  var time = time;
  var scaleType = type;
  var regulatoryCompanies = scaleType == 'up' ? '规上企业' : '规下企业';
  /*获取概况信息*/
  /*营业收入占比*/
  /*$.ajax({
    // url: "/v1/land/findAll",
    url: "/v1/aboveNoSingleOverallRating/findTop10Accounting",
    type:"GET",
    dataType:"json",
    data:{year: time,regulatoryCompanies: regulatoryCompanies},
    success:function(res){

      var tpl = `<div class="text-c">
                    <div id="top10-proportion" style="width:100%;height: 200px;"></div>
                </div>`;
      $(".right-top-land-infowindow .title").html('高质量评价概况')
      $(".right-top-land-infowindow .icon-ctrl-scroll-con").html(tpl)
      var data = (res.top10/res.total).toFixed(2);
      creatHighEnterpriseTop10Proportion({},'前10名营业收入',data);
      var lists = [];
      scaleEnterpriseAllData[scaleType].forEach(function(v,i){
        if(v.year == time){
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

  var tpl = `<div class="review-con">
                    <!--<div id="top10-proportion" style="width:100%;height: 200px;"></div>-->
                    <div class="review-item"><span class="text">高质量评估企业数：</span><span class="num">194家</span></div>
                    <!--<div class="review-item"><span class="text">综合评价企业数：</span><span class="num">253家</span></div>-->
                    <div class="review-item"><span class="text">有地企业数：</span><span class="num">194家</span></div>
                    <div class="review-item"><span class="text">无地企业数：</span><span class="num">2885家</span></div>
                </div>`;
  $(".right-top-land-infowindow .title").html('高质量评价概况')
  $(".right-top-land-infowindow .icon-ctrl-scroll-con").html(tpl);
  // var res = 0.78;
  // creatHighEnterpriseTop10Proportion({},'前10名营业收入',res);

  var lists = [];
  scaleEnterpriseAllData[scaleType].forEach(function(v,i){
    if(v.year == time){
      lists.push(v);
    }
  });
  var tpl = ``;
  var listTpl = ``;
  lists.forEach(function (v,i) {
    listTpl += `<div class="overview-company-item company-item flex" data-landid="${v.landBlockId}" data-company="${v.companyName}">
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
  $(".right-top-land-infowindow .icon-ctrl-scroll-con").append(tpl);

  $(".right-top-land-infowindow .icon-ctrl-scroll").mCustomScrollbar("scrollTo","top");


  /*请求新数据将保存的地块对象清除*/
  polygonScaleEnterpriseLands.lands=[];

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

  var sortScaleEnterpriseAllData = scaleEnterpriseAllData[scaleType];

  var markerResult = [];
  for (var i = 0; i < newpointers.length; i++) {
    var color = defaultLandColor;
    var borderColor = defaultBorderColor;
    var isIndustryLand = false;
    var rankNum = '';


    // if ((newpointers[i].enterpriseType == industryType)) {
      /*添加公司Id到地块*/
      for (var j = 0; j < sortScaleEnterpriseAllData.length; j++) {
        if (sortScaleEnterpriseAllData[j].landBlockId == newpointers[i].id || sortScaleEnterpriseAllData[j].companyName == newpointers[i].actualUsers) {
          // companyId = sortLivingHighQualityData[j].id;
          isIndustryLand = true;
          rankNum = j + 1;

          if (j == 0) {
            color = "#f61d1d";
            borderColor = "#f61d1d";
          } else if (j == 1) {
            color = "#f52f1d";
            borderColor = "#f52f1d";
          } else if (j == 2) {
            color = "#f5411d";
            borderColor = "#f5411d";
          } else if (j == 3) {
            color = "#f5531d";
            borderColor = "#f5531d";
          } else if (j == 4) {
            color = "#f5651d";
            borderColor = "#f5651d";
          } else if (j == 5) {
            color = "#f5771d";
            borderColor = "#f5771d";
          } else if (j == 6) {
            color = "#f5891d";
            borderColor = "#f5891d";
          } else if (j == 7) {
            color = "#f59b1d";
            borderColor = "#f59b1d";
          } else if (j == 8) {
            color = "#f5ad1d";
            borderColor = "#f5ad1d";
          } else if (j == 9) {
            color = "#f5bf1d";
            borderColor = "#f5bf1d";
          } else {
            color = "#f5d11d";
            borderColor = "#f5d11d";
          }
        }
      }
      // var color ="transparent"
    /*}
    else {
      borderColor = defaultBorderColor;
    }*/
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
        for (var i = 0; i < polygonScaleEnterpriseLands.lands.length; i++) {
          if (polygonScaleEnterpriseLands.lands[i].getExtData().borderColor != polygonScaleEnterpriseLands.lands[i].getOptions().strokeColor) {
            polygonScaleEnterpriseLands.lands[i].setOptions({
              strokeColor: polygonScaleEnterpriseLands.lands[i].getExtData().borderColor,
              fillColor: polygonScaleEnterpriseLands.lands[i].getExtData().color,
              strokeWeight: defaultStrokeWeight
            });
            var oldExtData = polygonScaleEnterpriseLands.lands[i].getExtData();//先保存原始ExtData数据
            oldExtData.slected = false;//改变之前选中的状态为false
            polygonScaleEnterpriseLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
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

        viewScaleEnterpriseLandInfo(this.getExtData(),scaleType);
      }
    });
    polygonHighLand.setPath(pointers);
    /*标识前十*/
    for (var j = 0; j < 10; j++) {
      if (sortScaleEnterpriseAllData[j] && (sortScaleEnterpriseAllData[j].landBlockId == newpointers[i].id || sortScaleEnterpriseAllData[j].companyName == newpointers[i].actualUsers)) {
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
          for (var i = 0; i < polygonScaleEnterpriseLands.lands.length; i++) {
            if (polygonScaleEnterpriseLands.lands[i].getExtData().slected) {
              polygonScaleEnterpriseLands.lands[i].setOptions({
                strokeColor: polygonScaleEnterpriseLands.lands[i].getExtData().borderColor,
                fillColor: polygonScaleEnterpriseLands.lands[i].getExtData().color,
                strokeWeight: defaultStrokeWeight
              });
              var oldExtData = polygonScaleEnterpriseLands.lands[i].getExtData();//先保存原始ExtData数据
              oldExtData.slected = false;//改变之前选中的状态为false
              polygonScaleEnterpriseLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
              break;
            }
          }
          for (var i = 0; i < polygonScaleEnterpriseLands.lands.length; i++) {
            if (this.getExtData().landId == polygonScaleEnterpriseLands.lands[i].getExtData().id) {
              var newExtData = polygonScaleEnterpriseLands.lands[i].getExtData();
              newExtData.slected = true;
              polygonScaleEnterpriseLands.lands[i].setOptions({
                strokeColor: selectedBorderColor,
                strokeWeight: selectedStrokeWeight
              });
              polygonScaleEnterpriseLands.lands[i].setExtData(newExtData);

              viewScaleEnterpriseLandInfo(polygonScaleEnterpriseLands.lands[i].getExtData(),scaleType);
            }
          }
        });
        markerResult.push(markerText);
      }
    }


    polygonScaleEnterpriseLands.lands.push(polygonHighLand)
  }
  markerRankTextList = markerResult;
  // creatHighEnterpriseMarkerPoint(map,{result: markerResult});
  map.setFitView();
  map.setZoom(14);
  $(".zdy-full-cover-mask").remove();
}
/*将规上规下地块分别单独信息绘图*/
function creatScaleEnterpriseLandSingle(map,type){
  var time = $(".datetimepicker-top-box input").val();

  /*获取概况信息*/
      var res = 0.78;
      var tpl = `<div class="text-c">
                    <div id="top10-proportion" style="width:100%;height: 200px;"></div>
                </div>`;
      $(".right-top-land-infowindow .title").html('高质量评价概况')
      $(".right-top-land-infowindow .icon-ctrl-scroll-con").html(tpl)
      creatHighEnterpriseTop10Proportion({},'前10名营业收入',res);
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
      tpl = `<div class="high-enterprise-company-bd">
                    <div class="company-con">
                        <div class="public-title"><span class="title">企业列表</span></div>
                        <div class="company-list high-enterprise-list-box">
                            ${listTpl}
                        </div>
                    </div>
                </div>`;

      $(".right-top-land-infowindow .icon-ctrl-scroll-con").append(tpl);


  if(highQualityAllData){
    creatElectronLivingCateLandSingleAgain(map,type,time,dataPolygonHighEnterpriseLands)
  }else{
    indexeDBmethod.byIndexGet('landData','highQualityAllData',function(res) {
      var dbData = res;
      highQualityAllData = dbData ? dbData.data : highQualityAllData;
      creatElectronLivingCateLandSingleAgain(map,type,time,dataPolygonHighEnterpriseLands)
    })
  }

}
/*点击产业规上企业地块查看数据*/
function viewScaleEnterpriseLandInfo(options,type){
  var time = $(".datetimepicker-scale-enterprise input").val();
  var actualUsers = options.actualUsers ? options.actualUsers : options.rightHolder,
    companyName = options.companyName,
    companyId = options.companyId,
    enterpriseType = options.enterpriseType,
    isIndustryLand = options.isIndustryLand;
  /*判断是否点击空地块*/
  if(isIndustryLand){
    $(".microcosmic_container").show().removeClass("slideOutRight").addClass("slideInRight");
    $(".land-company-detail-box").hide().removeClass("slideInRight").addClass("slideOutRight");
    $(".right-top-land-infowindow").hide().removeClass("slideInRight").addClass("slideOutRight");
    $(".back-arrow-btn").removeClass("active");
    $(".time-colors-panel").css({right:"580px"});
    $(".industry-last-colors-panel").css({right:"730px"});
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
                            <span class="title high-enterprise-evalua-info-title">高质量评价情况</span>
                            <span class="rank-num">${options.rankNum}</span>
                            <div class="high-enterprise-own fr"><span class="high-enterprise-own-name" data-type="scale${type}" data-company="${companyName}">${companyName}</span><span class="high-enterprise-own-label">所属企业</span></div></div>
                        <div class="radar-bd" id="radar-bd"></div>
                        <div class="radar-bt">
                            
                        </div>
                    </div>`;
    $(".land-panel-con").html(tpl);
    /*获取综合评分*/
    $.ajax({
      url: "./jsonData/highQualityNewName.json",
      type:"GET",
      dataType:"json",
      data:{year: time,companyName: companyName},
      success:function(res){
        if(type == 'up'){
          creatScaleEnterpriseRadarEcharts(res);
        }else{
          creatScaleDownEnterpriseRadarEcharts(res);
        }
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
    $(".industry-last-colors-panel").css({right:"160px"});
  }
}
/*绘制产业规上企业评价雷达图*/
function creatScaleEnterpriseRadarEcharts(allOptions,enterLocal) {
  var time = Number($(".datetimepicker-scale-enterprise input").val());
  if(enterLocal == 'scaleEnterprise'){
    var echartsTitle = '企业综合评价';
    var myChart = echarts.init(document.getElementById('evaluate'));
  }else{
    var echartsTitle = '企业高质量评价';
    var myChart = echarts.init(document.getElementById('radar-bd'));
  }
  // var legendData = [];
  var legendData = [time];
  var indicatorData = [];
  var seriesData = [];
  var options = allOptions.obj;
  var formulaData = allOptions.date;
  console.log(allOptions)
  // var copyObj = {};
  var copyValue = [];
  /*获取数据里的年份,避免数据没有年份*/
  /*for(var value in options){
    for(var j in options[value]){
      if(!copyObj[j]){
        copyObj[j] = [];
      }
    }
  }*/

  /*for(var value in options){
    /!*给没有年份的数据赋值0*!/
    for(var year in copyObj){
      if(!options[value][year]){
        options[value][year] = 0;
      }
    }
    /!*根据年份分组数据*!/
    for(var j in options[value]){
      copyObj[j].push(options[value][j]);
      // legendData.push(j);
    }
    indicatorData.push({name:value,min:0});
  }*/
  for(var value in options){
    if(value != '综合评分'){
      var valueData = options[value] ? options[value] : 0;
      copyValue.push(valueData.toFixed(2));
      indicatorData.push({name:value,min:0});
    }else{
      var valueData = options[value] ? options[value] : 0;
      var overviewData = valueData.toFixed(2)
    }
  }
  /*将分组处理的数据处理为图表数据*/
  /*for(var i in copyObj){
    seriesData.push({value:copyObj[i],name:i});
  }*/
  // seriesData.push({value:copyObj[time],name:time});
  seriesData.push({value:copyValue,name:time});
  var hoverTips = {'单位排污权工业增加值':'单位排污权工业增加值=工业增加值(万元)('+Number(formulaData['工业增加值']).toFixed(2)+')/核定的排污权(吨)('+Number(formulaData['核定排污权']).toFixed(2)+')',
    '亩均工业增加值':'亩均工业增加值=工业增加值(万元)('+Number(formulaData['工业增加值']).toFixed(2)+')/用地面积(亩)('+Number(formulaData['用地面积']).toFixed(2)+')',
    '全员劳动生产率':'全员劳动生产率=工业增加值(万元)('+Number(formulaData['工业增加值']).toFixed(2)+')/年平均职工人数(人数)('+formulaData['人数']+')',
    '研发投入占主营业务收入比重':'研发投入占主营业务收入比重=研发经费支出(万元)('+Number(formulaData['研发经费']).toFixed(2)+')/主营业务收入(万元)('+Number(formulaData['主营业收入']).toFixed(2)+')',
    '单位能耗工业增加值':'单位能耗工业增加值=工业增加值(万元)('+Number(formulaData['工业增加值']).toFixed(2)+')/综合能耗(吨标煤)('+Number(formulaData['综合能耗']).toFixed(2)+')',
    '亩均税收':'亩均税收=税收实际贡献(万元)('+Number(formulaData['税收实际贡献']).toFixed(2)+')/用地面积(亩)('+Number(formulaData['用地面积']).toFixed(2)+')'};
  var tpl = `<table class="table table-bordered high-enterprise-table">`;
  if(copyValue && copyValue.length > 0){
    copyValue.forEach(function(v,i){
      console.log(v)
      tpl += `<tr title="${hoverTips[indicatorData[i].name]}" data-hover="${hoverTips[indicatorData[i].name]}"><td class="nowrap">${indicatorData[i].name}</td><td class="">${v}</td></tr>`;
    });
  }
  tpl += `<tr><td>综合评分</td><td>${overviewData}</td></tr></table>`
  $(".high-enterprise-radar .radar-bt").html(tpl);
  option = {
    title: {
      text: echartsTitle,
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
      name: echartsTitle,
      type: 'radar',
      // areaStyle: {normal: {}},
      data : seriesData
    }]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option,true);
}
/*绘制产业规下企业评价雷达图*/
function creatScaleDownEnterpriseRadarEchartsOld(allOptions,enterLocal) {
  var time = Number($(".datetimepicker-scale-enterprise input").val());
  if(enterLocal == 'scaleEnterprise'){
    var echartsTitle = '企业综合评价';
    var myChart = echarts.init(document.getElementById('evaluate'));
  }else{
    var echartsTitle = '企业高质量评价';
    var myChart = echarts.init(document.getElementById('radar-bd'));
  }
  // var legendData = [];
  var legendData = [time];
  var indicatorData = [];
  var seriesData = [];
  var options = allOptions.obj;
  var formulaData = allOptions.date;
  console.log(allOptions)
  // var copyObj = {};
  var copyValue = [];
  /*获取数据里的年份,避免数据没有年份*/
  for(var value in options){

    if(value != '综合评分'){
      if(value == '亩均税收'){

        var valueData = options[value] ? options[value] : 0;
        copyValue.push(valueData.toFixed(2));
        indicatorData.push({name:value,min:0});
      }
    }else{
      var valueData = options[value] ? options[value] : 0;
      var overviewData = valueData.toFixed(2)
    }
  }
  /*将分组处理的数据处理为图表数据*/
  /*for(var i in copyObj){
    seriesData.push({value:copyObj[i],name:i});
  }*/
  // seriesData.push({value:copyObj[time],name:time});
  seriesData.push({value:copyValue,name:time});
  var hoverTips = {'亩均工业增加值':'亩均工业增加值=工业增加值(万元)('+Number(formulaData['工业增加值']).toFixed(2)+')/用地面积(亩)('+Number(formulaData['用地面积']).toFixed(2)+')',
                    '亩均税收':'亩均税收=税收实际贡献(万元)('+Number(formulaData['税收实际贡献']).toFixed(2)+')/用地面积(亩)('+Number(formulaData['用地面积']).toFixed(2)+')'};
  var tpl = `<table class="table table-bordered high-enterprise-table">`;
  if(copyValue && copyValue.length>0){
    copyValue.forEach(function(v,i){
      console.log(v)
      tpl += `<tr title="${hoverTips[indicatorData[i].name]}" data-hover="${hoverTips[indicatorData[i].name]}"><td class="nowrap">${indicatorData[i].name}</td><td class="">${v}</td></tr>`;
    });
  }
  tpl += `<tr><td>综合评分</td><td>${overviewData}</td></tr></table></table>`
  $(".high-enterprise-radar .radar-bt").html(tpl);
  option = {
    title: {
      text: echartsTitle,
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
      name: echartsTitle,
      type: 'radar',
      // areaStyle: {normal: {}},
      data : seriesData
    }]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option,true);
}
/*绘制产业规下企业评价雷达图*/
function creatScaleDownEnterpriseRadarEcharts(allOptions,enterLocal) {
  var time = Number($(".datetimepicker-scale-enterprise input").val());
  if(enterLocal == 'scaleEnterprise'){
    var echartsTitle = '企业综合评价';
    var myChart = echarts.init(document.getElementById('evaluate'));
  }else{
    var echartsTitle = '企业高质量评价';
    var myChart = echarts.init(document.getElementById('radar-bd'));
  }
  // var legendData = [];
  var legendData = [time];
  var indicatorData = [];
  var seriesData = [];
  var options = allOptions.obj;
  var formulaData = allOptions.date;
  console.log(allOptions)
  // var copyObj = {};
  var copyValue = [];
  /*获取数据里的年份,避免数据没有年份*/
  for(var value in options){

    if(value != '综合评分'){
      if(value == '亩均税收'){

        var valueData = options[value] ? options[value] : 0;
        copyValue.push(valueData.toFixed(2));
        indicatorData.push({name:value,min:0});
      }
    }else{
      var valueData = options[value] ? options[value] : 0;
      var overviewData = valueData.toFixed(2)
    }
  }
  /*将分组处理的数据处理为图表数据*/
  /*for(var i in copyObj){
    seriesData.push({value:copyObj[i],name:i});
  }*/
  // seriesData.push({value:copyObj[time],name:time});
  seriesData.push({value:copyValue,name:time});
  var hoverTips = {'亩均工业增加值':'亩均工业增加值=工业增加值(万元)('+Number(formulaData['工业增加值']).toFixed(2)+')/用地面积(亩)('+Number(formulaData['用地面积']).toFixed(2)+')',
                    '亩均税收':'亩均税收=税收实际贡献(万元)('+Number(formulaData['税收实际贡献']).toFixed(2)+')/用地面积(亩)('+Number(formulaData['用地面积']).toFixed(2)+')'};
  var tpl = `<table class="table table-bordered high-enterprise-table">`;
  if(copyValue && copyValue.length>0){
    copyValue.forEach(function(v,i){
      console.log(v)
      tpl += `<tr title="${hoverTips[indicatorData[i].name]}" data-hover="${hoverTips[indicatorData[i].name]}"><td class="nowrap">${indicatorData[i].name}</td><td class="">${v}</td></tr>`;
    });
  }
  tpl += `<tr><td>综合评分</td><td>${overviewData}</td></tr></table></table>`
  $(".high-enterprise-radar .radar-bt").html(tpl);

  var option = {
    title:{
      text: echartsTitle,
      left: 'center'
    },
    tooltip : {
      formatter: "{a} <br/>{b} : {c}"
    },
    toolbox: {
    },
    series: [
      {
        name: echartsTitle,
        type: 'gauge',
        title: {
          offsetCenter: [0, '-35%'],
        },
        max: 150,
        radius: '80%',
        center : ['50%', '55%'],
        detail: {formatter:'{value}'},
        data: seriesData
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option,true);
}
/*产业综合评价企业列表点击标识地块*/
$(".right-top-land-infowindow").on("click",".overview-company-item",function(){
  var landBlockId = $(this).data("landid");
  var companyName = $(this).data("company");
  $(this).addClass("active").siblings().removeClass("active");
  //在地图上改变当前点击的多边形
  for (var i = 0; i < polygonScaleEnterpriseLands.lands.length; i++) {
    // if (polygonHighEnterpriseLands.lands[i].getExtData().slected) {
    if (polygonScaleEnterpriseLands.lands[i].getExtData().borderColor != polygonScaleEnterpriseLands.lands[i].getOptions().strokeColor) {
      polygonScaleEnterpriseLands.lands[i].setOptions({
        strokeColor: polygonScaleEnterpriseLands.lands[i].getExtData().borderColor,
        fillColor: polygonScaleEnterpriseLands.lands[i].getExtData().color,
        strokeWeight: defaultStrokeWeight
      });
      var oldExtData = polygonScaleEnterpriseLands.lands[i].getExtData();//先保存原始ExtData数据
      oldExtData.slected = false;//改变之前选中的状态为false
      polygonScaleEnterpriseLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
      // break;
    }
  }
  for(var i = 0; i < polygonScaleEnterpriseLands.lands.length; i++){
    if(polygonScaleEnterpriseLands.lands[i].getExtData().id == landBlockId || polygonScaleEnterpriseLands.lands[i].getExtData().actualUsers == companyName){
      var newExtData = polygonScaleEnterpriseLands.lands[i].getExtData();
      // newExtData.slected = true;
      polygonScaleEnterpriseLands.lands[i].setOptions({strokeColor:selectedBorderColor, strokeWeight:selectedStrokeWeight});
      polygonScaleEnterpriseLands.lands[i].setExtData(newExtData);
      var centerPositon = polygonScaleEnterpriseLands.lands[i].getBounds().getCenter();
      var centerBounds = polygonScaleEnterpriseLands.lands[i].getBounds();
      // map.setCenter(centerPositon);
      map.setBounds(centerBounds);
      // map.setZoom(16)
    }
  }
});
/*产业规上企业时间控制*/
$("#datetimepicker-scale-enterprise").find("input").val(2017);
$("#datetimepicker-scale-enterprise").datetimepicker({
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
  $(".right-top-land-infowindow").show().addClass("slideInRight").removeClass("slideOutRight");
  $(".time-colors-panel").css({right:"420px"});

  /*清除后十名色块选中*/
  $(".industry-last-colors-panel .color-blank").removeClass("active");
  /*清除产业类型色块选中*/
  $(".eco-color-xh .color-blank").removeClass("active");
  /*隐藏后十名色块*/
  $(".industry-last-colors-panel").hide();
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
  var type = $(".scale-enterprise-color .color-blank.active").data('type');
  type = type == 'scaleUp' ? 'up' : 'down';
  /*切换时间清除之前保存的数据，避免规上与规下切换保存的数据时间不同*/
  scaleEnterpriseAllData.up = [];
  scaleEnterpriseAllData.down = [];
  getScaleEnterpriseData(chooseTime,type);
});