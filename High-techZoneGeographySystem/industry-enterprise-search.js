/*产业企业搜索*/
/*标识地块*/
var searchLandMarker;
/*产业企业搜索*/
$(".build-switch .enterprise-search").on("click",function () {
  if(!$(this).hasClass("active")){
    map.clearMap();
    initControll();
    creatWestAreaLandRangeCj(map);
    $(".industry-enterprise-search-box").show();

    $(this).addClass("active");
    $(this).parents(".item").addClass("active");
  }
});
$("#enterprise-search-btn").on('click',function(e){
  if($(".enterprise-search-box").hasClass("active")){

    var name = $("#enterprise-search-input").val().trim();
    if(name != ''){

      map.clearMap();
      initControll();
      creatWestAreaLandRangeCj(map);

      $("#enterprise-search-input").val('');
      searhFlag = 0;
      $(".back-arrow-btn").removeClass("active");
      getCompanyLists(name);
    }

  }
  $("#enterprise-search-input").focus();
  $(".enterprise-search-box").toggleClass("active");
});
$("#enterprise-search-input").on('keydown',function(e){
  var key = e.keyCode;
  var name = $(this).val().trim();
  if(key == 13){

      if(name != ''){

        map.clearMap();
        initControll();
        creatWestAreaLandRangeCj(map);

        $(this).val('');
        $(".back-arrow-btn").removeClass("active");
        getCompanyLists(name);
      }

    $(".enterprise-search-box").toggleClass("active");
  }
});
/*搜索企业*/
var tpl = `<div class="right-panel company-list animated slideInRight">
            <div class="panel-hd">
                <div class="title">
                    <div class="title-con">
                        <!--<div class="back-box fl"><span class="back-btn"></span></div>-->
                        <div class="enterprise-search-name">
                            <h3 class="fl" id="titleName"><!-- 查询字段 --></h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="panel-menu-box">
                    <ul class="panel-menu" id="filterMenu">
                        <!-- 筛选条件展示域 -->
                         <!--<li class="active">全部</li>
                        <li filterName = "" filterValue="1">国有企业</li>
                        <li filterName = "" filterValue="2">民营企业</li>
                        <li filterName = "" filterValue="3">500强企业</li>
                        <li>外资企业</li>-->
                    </ul>
                </div>
                <div class="panel-menu-right" id="panel-menu-right">
                    <div class="panel-top">
                        <div class="panel-bd pop-index-0 animated active">
                            <div class="panel-content" id="companyList">
                                <!-- 列表展示页 -->
                                 <!--<div class="company-item">
                                    <div class="company-logo">
                                        <img src="../images/company_logo.png" alt="">
                                    </div>
                                    <div class="info">
                                        <div class="name">成都科技有限责任公司</div>
                                        <span>民企</span><span class="num">50人以下</span>
                                    </div>
                                </div>
                                <div class="company-item">
                                    <div class="company-logo">
                                        <img src="../images/company_logo.png" alt="">
                                    </div>
                                    <div class="info">
                                        <div class="name">成都科技有限责任公司</div>
                                        <span>民企</span><span class="num">50人以下</span>
                                    </div>
                                </div>-->
                            </div>
                        </div>
                    </div>
                    <div class="panel-bot">
                        <span id="companyPage" currentPage=1 totalPage=1>第1页，共1页</span>
                        <ul class="company-pagination">
                            <!-- <li class="active">1</li>
                            <li>2</li> -->
                            <li class="prev" id="prev">&laquo;</li>
                            <li class="number"><input type="text" id="pageNumber"></li>
                            <li style="width:50px" id="pageSubmit">确定</li>
                            <li class="next" id="next">&raquo;</li>
                            <li class="last" id="last">&raquo;</li>
                        </ul>
                        <!--<nav aria-label="...">
                            <ul class="pagination pagination-sm">
                                <li class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>
                                <li class="active"><a href="#">1 <span class="sr-only">(current)</span></a></li>
                                <li><a href="#">2 <span class="sr-only">(current)</span></a></li>
                                <li><a href="#">3 <span class="sr-only">(current)</span></a></li>
                                <li><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>
                            </ul>
                        </nav>-->
                    </div>
                </div>
            </div>
        </div>`;
function getCompanyLists(name,searchFilter,currentPage){
  $(".microcosmic_container").show().addClass("slideInRight").removeClass("slideOutRight");
  var name = name;
  $.ajax({
    url: '/v1/company/find',
    type: 'GET',
    dataType: 'json',
    data: {
      requirement: name,
      filter: searchFilter,
      currentPage: currentPage,
      pageSize: htmlPageSize
    },
    success: function(res){
      console.log(res);
      var datas = res;
      map.remove(searchCompanyMarkers);
      map.remove(searchOneCompanyMarkers);
      for (var i = 0; i<res.length;i++){
        if(res[i].coordinate){
          console.log(res[i]);
        }
      }
      if(searhFlag==0){
        $(".microcosmic_container .land-panel-con").html(tpl);
      }
      $(".right-panel .panel-bd").mCustomScrollbar({
        setHeight:'100%',
        theme:"minimal",
        scrollbarPosition: "outside"
      });

      if(datas.datas.length>0){
        var htmlCurrentPage = datas.pagination.currentPage;
        var htmlTotal = datas.pagination.totalPage;
        $("#companyPage").attr({"currentPage":htmlCurrentPage,"totalPage":htmlTotal});
        $("#companyPage").html("第"+htmlCurrentPage+"页，共"+htmlTotal+"页");
        $("#companyList").empty();
        var companyDatas = datas.datas;
        if(searhFlag==0){
          var filterDatas = datas.filters[0].enterpriseType;//这里先写死只有一个纬度
          $("#filterMenu").empty();
          var filterData = "<li class='active'>全部</li>";
          $("#filterMenu").append(filterData);
          for(var i=0;i<filterDatas.length;i++){
            var tagBeforeName = (filterDatas[i].slice(0,filterDatas[i].lastIndexOf('(')));
            tagBeforeName = tagBeforeName.length > 6  ? tagBeforeName.slice(0,6) + '...' : tagBeforeName;
            var tagNameNum = filterDatas[i].slice(filterDatas[i].lastIndexOf('('));
            filterData = "<li filterName = 'enterpriseType' filterValue='"+filterDatas[i]+"'>"+tagBeforeName + tagNameNum+"</li>";
            $("#filterMenu").append(filterData);
          }
        }
        for(var i=0;i<companyDatas.length;i++){
          // companyId = companyDatas[i].id;
          // companyId = companyId.split("_")[0];
          var companyName = companyDatas[i].companyName;
          var enterpriseType = companyDatas[i].enterpriseType ? companyDatas[i].enterpriseType : '未知';
          // companyName = name + companyName.split("</font>")[1];
          /*var companyData = "<div class='company-item animated flipInX' companyName='"+companyName+"' data-coordinate='" +companyDatas[i].coordinate+ "'>" +
              "<div class='company-logo'><img src='../images/company_list_logo.png' alt=''></div>" +
              "<div class='info'>" +
                "<div class='name'>"+companyDatas[i].name+"</div>" +
                "<span>"+enterpriseType+"</span><span class='num'>"+"</span>" +
              "</div>" +
            "</div>";*/
          var companyData = `<div class="company-item animated flipInX" companyName="${companyName}" data-coordinate="${companyDatas[i].coordinate}"><div class="company-logo"><img src="../images/company_list_logo.png" alt=""></div><div class="info">
              <div class="name">${companyDatas[i].name}</div>
                <span>${enterpriseType}</span><span class="num"></span>
                </div>
              </div>`;
          $("#companyList").append(companyData);
        }
        searhFlag = 1;
        /*var map = new AMap.Map('container', {
          resizeEnable: true,
          rotateEnable: true,
          pitchEnable: true,
          zoom: 12,
          pitch: 0,
          rotation: 0,
          viewMode: '3D',//开启3D视图,默认为关闭
          buildingAnimation: true,//楼块出现是否带动画
          expandZoomRange: true,
          zooms: [3, 20],
          center: [104.045489, 30.628723]
        });*/
        for (var i = 0; i < companyDatas.length; i++) {
          var position = companyDatas[i].coordinate ? companyDatas[i].coordinate.split(',') : companyDatas[i].coordinate;
          var marker = new AMap.Marker({
            position: position,
            title:companyDatas[i].name,
            map:map,
            content:'<div class="company-list-addr">' +
            '<span>'+companyDatas[i].name+'</span>' +
            '</div>'
          });
          searchCompanyMarkers.push(marker);
        }
        map.setFitView();
        map.panBy(-580,40);

        $(".microcosmic_container").find("#titleName").html(name);
        searchName = name;

        /**/
        $(".microcosmic_container .land-panel-con .panel-menu-box").mCustomScrollbar({
          setHeight: '100%',
          theme: "minimal-dark",
          scrollbarPosition: "inside"
        });

      }else{
        var img = "<div class='not-data'></div>"
        $("#companyList").append(img);
      }

    },error: function(err) {
      console.log(err)
    }
  })
}
var searchCompanyMarkers = [];
var searchOneCompanyMarkers = [];
var searhFlag = 0;
var campanyId;
var htmlPageSize = 8;
var filterCondition;
var searchName;
/*翻页控制*/
companyPagesControl();
function companyPagesControl() {
  //翻页的前一页
  $(".microcosmic_container").on("click","#prev",function(){
    var htmlCurrentPage = $("#companyPage").attr("currentPage");
    if(htmlCurrentPage>1){
      getCompanyLists(searchName,filterCondition,htmlCurrentPage-1);
    }
  })
  //翻页的后一页
  $(".microcosmic_container").on("click","#next",function(){
    var htmlCurrentPage = $("#companyPage").attr("currentPage");
    var htmlTotalPage = $("#companyPage").attr("totalPage");
    if(htmlCurrentPage<htmlTotalPage){
      getCompanyLists(searchName,filterCondition,parseInt(htmlCurrentPage)+1);
    }
  })
  //翻页的最后一页
  $(".microcosmic_container").on("click","#last",function(){
    var htmlTotalPage = $("#companyPage").attr("totalPage");
    getCompanyLists(searchName,filterCondition,htmlTotalPage);
  })
  //翻页的自定义页
  $(".microcosmic_container").on("click","#pageSubmit",function(){
    var htmlTotalPage = $("#companyPage").attr("totalPage");
    var customizedPage = $("#pageNumber")[0].value;
    if(!isNaN(customizedPage)){
      if(parseInt(customizedPage)>htmlTotalPage){
        customizedPage = htmlTotalPage;
      }else if(parseInt(customizedPage)<1){
        customizedPage = 1;
      }else{
        alert("页数不合法")
      }
      getCompanyLists(searchName,filterCondition,customizedPage);
    }
  })


  $(".microcosmic_container").on("click",".panel-menu li",function(){
    if($(this).attr("filterValue")==undefined){
      filterCondition = '';
    }else{
      var filterName = $(this).attr("filterName");
      // var filterValue = $(this).attr("filterValue").split("(")[0];
      var filterValue = $(this).attr("filterValue");
      var filterValue = filterValue.slice(0,filterValue.lastIndexOf('('));
      filterCondition = filterName+","+filterValue;
    }
    getCompanyLists(searchName,filterCondition);//,$("#companyPage").attr("currentPage")

    $(".right-panel .panel-bd").mCustomScrollbar({
      setHeight:'100%',
      theme:"minimal",
      scrollbarPosition: "outside"
    });
    $(this).addClass("active").siblings().removeClass("active");
//                $(".right-panel").find(".panel-bd").removeClass("slideInRight slideOutLeft");
//                $(".right-panel").find(".panel-bd").eq($(".right-panel").find(".panel-bd.active").index()).addClass("slideOutLeft");
//
////                $(".right-panel").find(".panel-bd").eq($(this).index()).css({"transform":" matrix(1, 0, 0, 1, 0, 0)"}).addClass("active").siblings().css({"transform":" matrix(1, 0, 0, 1, 545, 794)"}).removeClass("active");
//                $(".right-panel").find(".panel-bd").eq($(this).index()).addClass("active slideInRight").siblings().addClass("slideOutLeft").removeClass("active");
  })

  /*$(".back-btn").on("click",function(){
    $("#microcosmic_container").removeClass("slideInRight").addClass("slideOutRight");
    setTimeout(function(){
      window.location.href = "index.html";
    },500)

  });*/

  $(".microcosmic_container").on("click",".panel-menu-right .company-item",function(){
    var name = $(this).attr("companyName");
    var coordinate = $(this).data("coordinate");
    map.remove(searchCompanyMarkers);
    map.remove(searchOneCompanyMarkers);
    getSearchCompanyInfomations(name);
    if(coordinate){
      var position = coordinate.split(',');
      var marker = new AMap.Marker({
        position: position,
        title:name,
        map:map,
        content:'<div class="company-list-addr">' +
        '<span>'+name+'</span>' +
        '</div>'
      });
      map.setFitView();
      map.panBy(-580,40);
      searchOneCompanyMarkers.push(marker);
    }
  })
}
/*获取企业详情*/
/*获取企业详情方法*/
function getSearchCompanyInfomations(companyName){
  if(companyName){
    $('.close-company-detail').data('back',false);
    $(".microcosmic_container").hide().removeClass("slideOutRight").addClass("slideInRight");
    $(".land-company-detail-box").hide().removeClass("slideInRight").addClass("slideOutRight");
    $(".right-top-land-infowindow").hide().removeClass("slideInRight").addClass("slideOutRight");
    $(".industry-land-infowindow").hide().removeClass("slideInRight").addClass("slideOutRight");
    $(".industry-company-list-panel").hide().removeClass("slideInRight").addClass("slideOutRight");
    $(".back-arrow-btn").removeClass("active");
    /*切换回基本信息显示*/
    $(".land-company-detail-tab .detail-tab-item").eq(0).addClass("active").siblings().removeClass("active");
    $(".land-company-detail .land-company-detail-con").eq(0).show().siblings().hide();
    $.ajax({
      url: '/v1/company/findCompanyByName',
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
  }
}