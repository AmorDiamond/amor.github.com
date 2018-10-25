(function () {
  var myChart = echarts.init(document.getElementById("scale-echart"));
  var dataAxis = ['规上','高新技术','上市','新三板','四板挂牌','上亿元'];
  var data = [119, 175, 10, 14, 7, 87];

  $(window).resize(function() {
    myChart.resize();
  });
  var option = {
    title: {
      text: '规模企业',
      left: 'center',
      textStyle: {color: '#a8bffc'}
    },
    tooltip: {
      show: true
    },
    grid: {
      left: '15%',
      right: '15%'
    },
    xAxis: {
      name: '企业',
      nameTextStyle: {
        color: '#a8bffc'
      },
      data: dataAxis,
      axisLabel: {
        textStyle: {
          color: '#a8bffc'
        }
      },
      /*axisTick: {
        show: false
      },*/
      axisLine: {
        lineStyle:{
          color: '#414960'
        }
      },
      z: 10
    },
    yAxis: {
      name: '家',
      nameTextStyle: {
        color: '#a8bffc'
      },
      /* axisTick: {
        show: false
      },*/
      axisLine: {
        lineStyle:{
          color: '#414960'
        }
      },
      splitLine:{
        show: false
      },
      axisLabel: {
        textStyle: {
          color: '#a8bffc'
        }
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        barWidth: '30%',
        label: {
          show: true,
          color: '#a8bffc',
          position: 'top'
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#4fb794'},
                {offset: 0.5, color: '#369fab'},
                {offset: 1, color: '#1480c9'}
              ]
            )
          },
          emphasis: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#1480c9'},
                {offset: 0.7, color: '#369fab'},
                {offset: 1, color: '#4fb794'}
              ]
            )
          }
        },
        data: data
      }
    ]
  };
  myChart.setOption(option);

  // var myNatureChart = echarts.init(document.getElementById("nature-echart"));
  var natureOption = {
    color: ['#137fca','#4fb794','#69c1fe'],
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // legend: {
    //   orient: 'vertical',
    //   left: 'left',
    //   data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    // },
    series : [
      {
        name: '访问来源',
        type: 'pie',
        radius : '70%',
        center: ['50%', '45%'],
        data:[
          {value:335, name:'直接访问'},
          {value:310, name:'邮件营销'},
          {value:234, name:'联盟广告'}
        ],
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
  // myNatureChart.setOption(natureOption);
})();

/*(function(){

  var myChart = echarts.init(document.getElementById("lv-type"));
  var dataAxis = ['外商投资','港澳台投资','国有企业','私营企业','有限责任公司','股份有限公司','其他'];
  var data = [38, 12, 3, 67, 12, 26, 5];
  var yMax = 500;
  var dataShadow = [];
  window.onresize = function(){
    myChart.resize();
  }
  var option = {
    title: {
      text: '等级注册类型',
      left: 'center',
      top: '20%',
      textStyle: {
        color: '#a8bffc',
        fontSize: '14px'
      }
    },
    tooltip: {
      show: true,
      confine: true
    },
    grid: {
      left: '20%',
      right: '30%',
      top: 30,
    },
    xAxis: {
      name: '类型',
      nameTextStyle: {
        color: '#a8bffc'
      },
      data: dataAxis,
      axisLabel: {
        textStyle: {
          color: '#a8bffc'
        },
        rotate: 50
      },
      /!*axisTick: {
        show: false
      },*!/
      axisLine: {
        lineStyle:{
          color: '#414960'
        }
      },
      z: 10
    },
    yAxis: {
      name: '企业数',
      nameTextStyle: {
        color: '#a8bffc'
      },
      /!* axisTick: {
        show: false
      },*!/
      axisLine: {
        lineStyle:{
          color: '#414960'
        }
      },
      splitLine:{
        show: false
      },
      max: function(value) {
        return value.max + 100;
      },
      axisLabel: {
        textStyle: {
          color: '#a8bffc'
        }
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        barWidth: '40%',
        label: {
          show: true,
          color: '#a8bffc',
          position: 'top'
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#4fb794'},
                {offset: 0.5, color: '#369fab'},
                {offset: 1, color: '#1480c9'}
              ]
            )
          },
          emphasis: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#1480c9'},
                {offset: 0.7, color: '#369fab'},
                {offset: 1, color: '#4fb794'}
              ]
            )
          }
        },
        data: data
      }
    ]
  };
  myChart.setOption(option);
})();*/
/*(function(){

  var myChart = echarts.init(document.getElementById("industry-type"));
  var dataAxis = ['电子信息','生物医药','先进制造','现代服务业'];
  var data = [133, 30, 88, 15];
  window.onresize = function(){
    myChart.resize();
  }
  var option = {
    title: {
      text: '产业分类',
      left: 'center',
      top: '20%',
      textStyle: {
        color: '#a8bffc',
        fontSize: '14px'
      }
    },
    tooltip: {
      show: true,
      confine: true
    },
    grid: {
      left: '20%',
      right: '30%',
      top: 30,
    },
    xAxis: {
      name: '类型',
      nameTextStyle: {
        color: '#a8bffc'
      },
      data: dataAxis,
      axisLabel: {
        textStyle: {
          color: '#a8bffc'
        },
        rotate: 50
      },
      /!*axisTick: {
        show: false
      },*!/
      axisLine: {
        lineStyle:{
          color: '#414960'
        }
      },
      z: 10
    },
    yAxis: {
      name: '企业数',
      nameTextStyle: {
        color: '#a8bffc'
      },
      /!* axisTick: {
        show: false
      },*!/
      axisLine: {
        lineStyle:{
          color: '#414960'
        }
      },
      splitLine:{
        show: false
      },
      max: function(value) {
        return value.max + 100;
      },
      axisLabel: {
        textStyle: {
          color: '#a8bffc'
        }
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        barWidth: '40%',
        label: {
          show: true,
          color: '#a8bffc',
          position: 'top'
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#4fb794'},
                {offset: 0.5, color: '#369fab'},
                {offset: 1, color: '#1480c9'}
              ]
            )
          },
          emphasis: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#1480c9'},
                {offset: 0.7, color: '#369fab'},
                {offset: 1, color: '#4fb794'}
              ]
            )
          }
        },
        data: data
      }
    ]
  };
  myChart.setOption(option);
})();*/


/*(function(){

  var myChart = echarts.init(document.getElementById("lv-type2"));
  var dataAxis = ['外商投资','港澳台投资','国有企业','私营企业','有限责任公司','股份有限公司','其他'];
  var data = [29990, 5053, 309, 4515, 24569, 6784, 1141];
  window.onresize = function(){
    myChart.resize();
  }
  var option = {
    title: {
      text: '等级注册类型',
      left: 'center',
      top: '20%',
      textStyle: {
        color: '#a8bffc',
        fontSize: '14px'
      }
    },
    tooltip: {
      show: true,
      confine: true
    },
    grid: {
      left: '30%',
      right: '30%',
      top: 30,
    },
    xAxis: {
      name: '类型',
      nameTextStyle: {
        color: '#a8bffc'
      },
      data: dataAxis,
      axisLabel: {
        textStyle: {
          color: '#a8bffc'
        },
        rotate: 50
      },
      /!*axisTick: {
        show: false
      },*!/
      axisLine: {
        lineStyle:{
          color: '#414960'
        }
      },
      z: 10
    },
    yAxis: {
      name: '从业人数',
      nameTextStyle: {
        color: '#a8bffc'
      },
      /!* axisTick: {
        show: false
      },*!/
      axisLine: {
        lineStyle:{
          color: '#414960'
        }
      },
      splitLine:{
        show: false
      },
      max: function(value) {
        return value.max + 20000;
      },
      axisLabel: {
        textStyle: {
          color: '#a8bffc'
        }
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        barWidth: '40%',
        label: {
          show: true,
          color: '#a8bffc',
          position: 'top'
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#4fb794'},
                {offset: 0.5, color: '#369fab'},
                {offset: 1, color: '#1480c9'}
              ]
            )
          },
          emphasis: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#1480c9'},
                {offset: 0.7, color: '#369fab'},
                {offset: 1, color: '#4fb794'}
              ]
            )
          }
        },
        data: data
      }
    ]
  };
  myChart.setOption(option);
})();*/

/*(function(){

  var myChart = echarts.init(document.getElementById("industry-type2"));
  var dataAxis = ['电子信息','生物医药','先进制造','现代服务业'];
  var data = [649.79, 58.38, 672.47, 2.06];
  window.onresize = function(){
    myChart.resize();
  }
  var option = {
    title: {
      text: '产业分类',
      left: 'center',
      top: '20%',
      textStyle: {
        color: '#a8bffc',
        fontSize: '14px'
      }
    },
    tooltip: {
      show: true,
      confine: true
    },
    grid: {
      left: '20%',
      right: '30%',
      top: 30,
    },
    xAxis: {
      name: '类型',
      nameTextStyle: {
        color: '#a8bffc'
      },
      data: dataAxis,
      axisLabel: {
        textStyle: {
          color: '#a8bffc'
        },
        rotate: 50
      },
      /!*axisTick: {
        show: false
      },*!/
      axisLine: {
        lineStyle:{
          color: '#414960'
        }
      },
      z: 10
    },
    yAxis: {
      name: '工业总产值(亿元)',
      nameTextStyle: {
        color: '#a8bffc'
      },
      /!* axisTick: {
        show: false
      },*!/
      axisLine: {
        lineStyle:{
          color: '#414960'
        }
      },
      splitLine:{
        show: false
      },
      max: function(value) {
        return value.max + 500;
      },
      axisLabel: {
        textStyle: {
          color: '#a8bffc'
        }
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        barWidth: '40%',
        label: {
          show: true,
          color: '#a8bffc',
          position: 'top'
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#4fb794'},
                {offset: 0.5, color: '#369fab'},
                {offset: 1, color: '#1480c9'}
              ]
            )
          },
          emphasis: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#1480c9'},
                {offset: 0.7, color: '#369fab'},
                {offset: 1, color: '#4fb794'}
              ]
            )
          }
        },
        data: data
      }
    ]
  };
  myChart.setOption(option);
})();*/

/*(function(){

  var governmentChart = echarts.init(document.getElementById("government-input"));

  $(window).resize(function() {
    governmentChart.resize();
  });
  var seriesData = [
    {value:143586, name:'产业资金'},
    {value:1426983, name:'税收减免'},
    {value:90038, name:'研发投入'}
  ];
  var governmentOption = {
    color: ['#137fca','#4fb794','#69c1fe','#729bfe'],
    title: {
      text: '政府投入',
      subtext: '总共1660607千元',
      subtextStyle: {
        color: '#4fb794'
      },
      left: 'center',
      textStyle: {
        color: '#a8bffc',
      }
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c}千元 ({d}%)"
    },
    // legend: {
    //   orient: 'vertical',
    //   left: 'left',
    //   data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    // },
    series : [
      {
        name: '政府投入',
        type: 'pie',
        radius : '60%',
        center: ['50%', '50%'],
        data: seriesData,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          show: true,
          formatter: '{b}\n{c}千元'
        }
      }
    ]
  };
  governmentChart.setOption(governmentOption);
})();*/

(function(){

  var entries = [
    { label: '手机',fontColor:'#3bb885',fontSize:34,  target: '_button' },
    { label: 'CPU',fontColor:'#53b885',fontSize:28,target: '_top' },
    { label: '频率系列产品', url: '', target: '_top' },
    { label: '半导体元器件制造',fontColor:'#0d7ac1',fontSize:28,  target: '_top' },
    { label: '液晶显示面板',fontColor:'#2783c1',  target: '_top' },
    { label: '计算机整机制造',fontColor:'#3d8ec1',  target: '_top' },
    { label: 'RFID生产',fontColor:'#4d9ac1', target: '_top' },
    { label: '微波器件生产',fontColor:'#60a3c1',  target: '_top' },
    { label: '数字电视机顶盒',  target: '_top' },
    { label: '电源滤波器生产',  target: '_top' },
    { label: '生产避雷器',fontColor:'#6495ED',fontSize:28,  target: '_top' },
    { label: '第二代居民身份证验证机具',  target: '_top' },
    { label: '测评设备生产、集成软件开发',  target: '_top' },
    { label: '无线电监测测向系统',  target: '_top' },
    { label: '网络工程项目',fontColor:'#4eb895',fontSize:28,  target: '_top' },
    { label: '生产及经营新型电子器件',fontColor:'#5ab89d',  target: '_top' },
    { label: '研制生产电子产品',fontColor:'#53b8a9',  target: '_top' },
    { label: '集成电路封装',fontColor:'#54b8b8', target: '_top' },
    { label: '连接器',fontColor:'#7db3b8',  target: '_top' },
    { label: '半导体元器件制造',fontColor:'#8aa5b8',  target: '_top' },
    { label: '生产SLP',  target: '_top' },
    { label: '触摸显示屏生产',  target: '_top' },
    { label: '通信系统手机',  target: '_top' },
    { label: '制造计算机产品',  target: '_top' },
    { label: '集成电路',  target: '_top' },
    { label: '电子元件',  target: '_top' },
    { label: '光纤光缆制造',  target: '_top' },
    { label: '单纤双向组件',  target: '_top' },
    { label: '液晶玻璃研发制造',  target: '_top' },
    { label: '微波组件',  target: '_top' },
  ];
  // for(var i=0;i<JSON.parse(result.evaluate).value.length;i++){
  //   entries[i].label = JSON.parse(result.evaluate).value[i];
  // }
  var settings = {
    entries: entries,
//                width: "100%",
    width: '100%',
    height: '55%',
   radius: '80%',//图像大小
    radiusMin: 75,
    bgDraw: true,
    bgColor: 'transparent',
    opacityOver: 1.00,
    opacityOut: 0.3,//控制悬停与一个标签上时,其他标签的透明度
    opacitySpeed: 6,
    fov: 800,
    speed: 0.5,//控制旋转速度
    fontFamily: 'Oswald, Arial, sans-serif',
    fontSize: '18',
    fontColor: '#56a5ca',
    fontWeight: 'normal',//bold
    fontStyle: 'normal',//italic
    fontStretch: 'normal',//wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
    fontToUpperCase: true,
    tooltipFontFamily: 'Oswald, Arial, sans-serif',
    tooltipFontSize: '11',
    tooltipFontColor: 'red',
    tooltipFontWeight: 'normal',//bold
    tooltipFontStyle: 'normal',//italic
    tooltipFontStretch: 'normal',//wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
    tooltipFontToUpperCase: false,
    tooltipTextAnchor: 'left',
    tooltipDiffX: 0,
    tooltipDiffY: 10

  };

  //var svg3DTagCloud = new SVG3DTagCloud( document.getElementById( 'holder'  ), settings );
  $( '#word-cloud' ).svg3DTagCloud( settings );
})();

/*(function(){

  var myChart = echarts.init(document.getElementById("quality-situation"));
  var dataAxis = ['工业总产值','营业收入','进出口','固定资产','固定资产投资','实缴税收','减免税收'];
  var data = [1488, 347, 1941, 219, 127, 29, 14];
  /!*window.onresize = function(){
    myChart.resize();
  }*!/
  $(window).resize(function() {
    myChart.resize();
  });
  var option = {
    title: {
      text: '质量情况',
      left: 'center',
      textStyle: {color: '#a8bffc'}
    },
    tooltip: {
      show: true
    },
    grid: {
      left: '15%',
      right: '15%',
      top: '15%',
      bottom: '30%',
    },
    xAxis: {
      name: '类型',
      nameTextStyle: {
        color: '#a8bffc'
      },
      data: dataAxis,
      axisLabel: {
        textStyle: {
          color: '#a8bffc'
        }
      },
      /!*axisTick: {
        show: false
      },*!/
      axisLine: {
        lineStyle:{
          color: '#414960'
        }
      },
      z: 10
    },
    yAxis: {
      name: '亿元',
      nameTextStyle: {
        color: '#a8bffc'
      },
      /!* axisTick: {
        show: false
      },*!/
      axisLine: {
        lineStyle:{
          color: '#414960'
        }
      },
      splitLine:{
        show: false
      },
      axisLabel: {
        textStyle: {
          color: '#a8bffc'
        }
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        barWidth: '30%',
        label: {
          show: true,
          color: '#a8bffc',
          position: 'top'
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#4fb794'},
                {offset: 0.5, color: '#369fab'},
                {offset: 1, color: '#1480c9'}
              ]
            )
          },
          emphasis: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#1480c9'},
                {offset: 0.7, color: '#369fab'},
                {offset: 1, color: '#4fb794'}
              ]
            )
          }
        },
        data: data
      }
    ]
  };
  myChart.setOption(option);
})();*/

(function(){
  $(".left-panel").on("click",function(){
    $(this).addClass("active");
    initRightPnale();
    $(".map-container").addClass("bg-blur");
    $(".more-left-panel").addClass("active");
    $(".page-title").addClass("active");
    $(".color-list").addClass("active");
    $(".switch-btn").addClass("active");
  });
  $(".right-panel").on("click",function(){
    $(this).addClass("active");
    initLeftPnale();
    $(".map-container").addClass("bg-blur");
    $(".xcj_more-facilities-box").addClass("active");
    $(".page-title").addClass("active");
    $(".color-list").addClass("active");
    $(".switch-btn").addClass("active");
  })
  $(".more-left-panel").on("click",function () {
    $(this).removeClass("active");
    // $(".map-container").removeClass("bg-blur");
    // $(".left-panel").removeClass("active");
    // $(".page-title").removeClass("active");
    // $(".color-list").removeClass("active");
    initLeftPnale();
  })
  $(".xcj_more-facilities-box").on("click",function () {
    $(this).removeClass("active");
    // $(".map-container").removeClass("bg-blur");
    // $(".right-panel").removeClass("active");
    // $(".page-title").removeClass("active");
    // $(".color-list").removeClass("active");
    initRightPnale();
  })
  function initLeftPnale() {
    $(".more-left-panel").removeClass("active");
    $(".map-container").removeClass("bg-blur");
    $(".left-panel").removeClass("active");
    $(".switch-btn").removeClass("active");
    $(".page-title").removeClass("active");
    $(".color-list").removeClass("active");
  }
  function initRightPnale() {
    $(".xcj_more-facilities-box").removeClass("active");
    $(".map-container").removeClass("bg-blur");
    $(".right-panel").removeClass("active");
    $(".switch-btn").removeClass("active");
    $(".page-title").removeClass("active");
    $(".color-list").removeClass("active");
  }
})()