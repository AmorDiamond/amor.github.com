(function(){
  /*GROUP*/
  const researchGroupData = [
    /*{
      name: '生物医学组',
      total: 999,
      times: 999,
      problem: 400,
      completeNum: 91,
      completeStatus: '已完成',
      companys: [
        {name: '成都明旺乳业有限公司',times: 1,status: '完成'},
        {name: '成都普天电缆股份有限公司',times: 1,status: '进行中'},
        {name: '成都华宇制药有限公司',times: 1,status: '未开始'},
        {name: '成都明旺乳业有限公司',times: 1,status: '完成'},
        {name: '四川太平洋药业有限责任公司',times: 1,status: '完成'},
      ]
    },
    {
      name: 'XXXX组',
      total: 998,
      times: 997,
      problem: 200,
      completeNum: 91,
      completeStatus: '已完成',
      companys: [
        {name: '成都明旺乳业有限公司',times: 1,status: '完成'},
        {name: '成都普天电缆股份有限公司',times: 1,status: '进行中'},
        {name: '成都华宇制药有限公司',times: 1,status: '未开始'},
        {name: '成都明旺乳业有限公司',times: 1,status: '完成'},
        {name: '四川太平洋药业有限责任公司',times: 1,status: '完成'},
      ]
    },
    {
      name: 'XXXX组',
      total: 997,
      times: 997,
      problem: 300,
      completeNum: 91,
      completeStatus: '进行中',
      companys: [
        {name: '成都明旺乳业有限公司',times: 1,status: '完成'},
        {name: '成都普天电缆股份有限公司',times: 1,status: '进行中'},
        {name: '成都华宇制药有限公司',times: 1,status: '未开始'},
        {name: '成都明旺乳业有限公司',times: 1,status: '完成'},
        {name: '四川太平洋药业有限责任公司',times: 1,status: '完成'},
      ]
    }*/
  ];
  /*PROMOTE*/
  const researchPromoteData = {
    item1: {
      researchTotal: 291,
      researchTimes: 201,
      completeTeams: [
        /*{name: '生物医学组', status: '完成'},
        {name: '数字游戏3组', status: '未完成'},
        {name: '中药生物组', status: '完成'},
        {name: '化学药组', status: '完成'},
        {name: '软件及外包1组', status: '完成'},
        {name: '航空航天组', status: '完成'},
        {name: '系统集成服务2组', status: '完成'},
        {name: '互联网应用软件组', status: '完成'}*/
        ]
    },
    item2: [
      /*'电子信息制造组','数字游戏3组','互联网应用软件组','软件及外包组','物联网组','系统集成服务2组','化学药组','中药生物组','生物医学组','航空航天组'*/
    ],
    item3: [
      /*{name: '西门子工业自动化产品(成都)有限公司',value: 11120},
      {name: '英特尔产品(成都)有限公司',value: 11020},
      {name: '成都恒瑞制药有限公司',value: 11000},
      {name: '成都明旺乳业有限公司',value: 10000},
      {name: '成都华宇制药有限公司',value: 9980},
      {name: '东晶锐康晶体(成都)有限公司',value: 9621},
      {name: '希望深蓝空调制造有限公司',value: 8643},
      {name: '成都阜特科技股份有限公司',value: 6464},
      {name: '成都中光电科技有限公司',value: 4223},
      {name: '成都普天电缆股份有限公司',value: 2111}*/
    ],
    item4: {
      todayVisitCount: 59135,
      hotWordDegree: [
        {name: '总体',value: 787},
        {name: 'PC',value: 356},
        {name: '360',value: 431}
      ],
      hotWordDegreeReport: [
        {name: '总体',value: 1582},
        {name: 'PC',value: 796},
        {name: '360',value: 785}
      ]
    }
  };
  /*ANALYSIS*/
  const researchAnalysisData = {
    highQualityBusiness: [
      /*'成都明旺乳业有限公司',
      '成都华宇制药有限公司',
      '东晶锐康晶体(成都)有限公司',
      '希望深蓝空调制造有限公司',
      '成都阜特科技股份有限公司',
      '东晶锐康晶体(成都)有限公司',
      '希望深蓝空调制造有限公司',
      '成都阜特科技股份有限公司',
      '成都中光电科技有限公司',
      '成都普天电缆股份有限公司'*/
    ],
    dangerousBusiness: [
      '索尔思光电（成都）有限公司',
      '四川西南交大铁路发展股份有限公司',
      '富通光纤光缆（成都）有限公司',
      '四川汇源星辰光电有限公司',
      '四川太平洋药业有限责任公司',
      '敦阳泰克科技（成都）有限公司',
      '四川红宇创智信息科技有限责任公司',
      '四川光恒通信技术有限公司',
      '四川百纳科技有限责任公司',
      '赫比(成都)精密塑胶制品有限公司'
    ],
    potentialBusiness: [
      '索尔思光电（成都）有限公司',
      '四川西南交大铁路发展股份有限公司',
      '富通光纤光缆（成都）有限公司',
      '四川汇源星辰光电有限公司',
      '四川太平洋药业有限责任公司',
      '敦阳泰克科技（成都）有限公司',
      '四川红宇创智信息科技有限责任公司',
      '四川光恒通信技术有限公司',
      '四川百纳科技有限责任公司',
      '赫比(成都)精密塑胶制品有限公司'
    ],
    ventureBusiness: [
      /*'西门子工业自动化产品(成都)有限公司',
      '英特尔产品(成都)有限公司',
      '成都恒瑞制药有限公司',
      '成都明旺乳业有限公司',
      '成都华宇制药有限公司',
      '东晶锐康晶体(成都)有限公司',
      '希望深蓝空调制造有限公司',
      '成都阜特科技股份有限公司',
      '成都中光电科技有限公司',
      '成都普天电缆股份有限公司'*/
    ],
    shouruTop5: [
      /*{name: '东晶锐康晶体(成都)有限公司',value: 9621},
      {name: '希望深蓝空调制造有限公司',value: 8643},
      {name: '成都阜特科技股份有限公司',value: 6464},
      {name: '成都中光电科技有限公司',value: 4223},
      {name: '成都普天电缆股份有限公司',value: 2111}*/
    ],
    shuishouTop5: [
      /*{name: '东晶锐康晶体(成都)有限公司',value: 9621},
      {name: '希望深蓝空调制造有限公司',value: 8643},
      {name: '成都阜特科技股份有限公司',value: 6464},
      {name: '成都中光电科技有限公司',value: 4223},
      {name: '成都普天电缆股份有限公司',value: 2111}*/
    ],
    researchCount: {
      researchTotal: 300,
      realNum: 156,
      companys: [
        {name: '成都日报报业集团', problem: '税收关系不在高新区'},
        {name: '成都君盛元熙广告有限公司', problem: '税收关系不在高新区'},
        {name: '成都市康肾源医药有限公司', problem: '税收关系不在高新区'},
        {name: '四川建华科技有限公司', problem: '税收关系不在高新区'},
        {name: '爱斯特（成都）生物制药股份有限公司', problem: '税收关系不在高新区'},
        {name: '成都华网电力工程咨询有限公司', problem: '税收关系不在高新区'},
        {name: '成都弘海电气有限公司', problem: '税收关系不在高新区'},
        {name: '成都普罗米新科技股份有限公司', problem: '税收关系不在高新区'},
        {name: '成都创新风险投资有限公司', problem: '税收关系不在高新区'},
        {name: '四川省杜臣物流有限公司', problem: '税收关系不在高新区'},
        {name: '成都中科大旗软件有限公司', problem: '企业重复'},
        {name: '中科院成都信息技术股份有限公司', problem: '企业重复'},
        {name: '成都中科信息技术有限公司', problem: '企业正常更名'},
        {name: '四川三联卷烟材料有限公司', problem: '企业正常更名'},
        {name: '成都国信安信息产业基地有限公司', problem: '企业重复'},
        {name: '四川亚卓教育科技有限公司', problem: '企业正常更名'}
      ],
      moneyTotal: 986,
      moneyDebtRatio: 31,
    }
  }
  /*PROBLEM*/
  const researchProblemData = {
    item1: {
      problemType: [],
      problemTotal: ''
    },
    item2: {
      averageHandleTime: '',
      averageAcceptTime: '',
      totalHandleTime: '',
      totalAcceptTime: '',
      problemTotal: ''
    },
  };

  const RequestDataFn = function(url,type,data) {
    const requestData = data ? data : {};
    return $.ajax({
      url: url,
      type: type,
      dataType: 'json',
      data: requestData,
      beforeSend: function(){
        console.log('开始');
        // showLoadingImgFn
      }
    }).always(function() {
      // remove loading image maybe
    })
    /*.done(function (res) {
    console.log(res)
  })*/
      .fail(function (err) {
        console.log(err)
      });
  }
  /*GROUP*/
  RequestDataFn('/demo/dataV/jsonData/researchGroup.json','GET').done(function(res){
    const data = res.researchQuantity['调研情况'];
    const dataB = res.groupProblemHandling;
    const dataC = res.whetherToComplete[0];
    const proportionData = res.allResearchQuantity;
    for (let item in data){
      if(item){
        let problem = 0;
        let completeNum = 0;
        let completeStatus = '';
        for(let i=0;i<dataB.length;i++){
          if(item == dataB[i]['小组名']){
            problem = dataB[i]['调研问题总数'];
            completeNum = dataB[i]['已完成问题数'];
            /*if(problem == completeNum){
              completeStatus = '已完成';
            }else{
              completeStatus = (completeNum/problem *100)+'%';
            }*/
            break;
          }
        }

        /*for(let status in dataC){
          console.log(status)
          if(item == status){
            completeStatus = dataC[status];
            break;
          }
        }*/
        dataC[item] ? completeStatus = dataC[item] : '未知';
        const companys = [];
        // const companyListData = data[item]['企业列表'].slice(1,6);
        const companyListData = data[item]['企业列表'];
        const successStatusList = [];
        const doingStatusList = [];
        const stopStatusList = [];
        companyListData.forEach((v,i) => {
          const companyItem = {
            name: v['企业名称'],
            times: v['调研次数'],
            status: v['调研状态']
          };
          if(v['调研状态'] == '完成'){
            successStatusList.push(companyItem);
          }else if(v['调研状态'] == '进行中'){
            doingStatusList.push(companyItem);
          }else if(v['调研状态'] == '未开始'){
            stopStatusList.push(companyItem);
          }
          companys.push(companyItem);
        })

        const itemObj = {
          name: item,
          total: data[item]['组调研企业总数'],
          times: data[item]['组调研日志总数'],
          problem: problem,
          completeNum: completeNum,
          completeStatus: completeStatus,
          companys: companys,
          totalProportion: ((doingStatusList.length + successStatusList.length)/Number(data[item]['组调研企业总数'])*100) == 100 ? 100 : ((doingStatusList.length + successStatusList.length)/Number(data[item]['组调研企业总数'])*100).toFixed(2),
          timesProportion: (Number(data[item]['组调研日志总数'])/Number(proportionData['调研日志数总和'])*100) == 100 ? 100 : (Number(data[item]['组调研日志总数'])/Number(proportionData['调研日志数总和'])*100).toFixed(2)
        };
        researchGroupData.push(itemObj);
      }
    }
    formatResearchGroupHtml();
  });
  function formatResearchGroupHtml(){
    let tpl = ``;
    researchGroupData.forEach((v) => {
      tpl += `<div class="swiper-slide" data-name="${v.name}">${v.name}</div>`;
  })
    /*tpl += `<div class="swiper-slide">生物医学组</div>
                <div class="swiper-slide">XXXX组</div>
                <div class="swiper-slide">XXXX组</div>`;*/
    $('.research-group-switch-label .swiper-wrapper').html(tpl);
    let switchTpl = ``;
    researchGroupData.forEach((v) => {
      let listTpl = ``;
    v.companys.forEach((item) => {
      listTpl += `<div class="row">
                      <div class="td row-name" data-name="${item.name}" title="${item.name}">${item.name}</div>
                      <div class="td">${item.times}</div>
                      <div class="td ${item.status == '未开始' ? 'error': item.status == '进行中' ? 'doing' : 'success'}">${item.status}</div>
                  </div>`;
  });
    switchTpl += `<div class="swiper-slide">
              <div class="left-con fl flex-column">
                  <div class="item-top">
                      <div class="number">调研企业总数：<span>${v.total}</span>家</div>
                      <div class="flex proportion-box">
                        <div class="line-bar flex-cell"><div class="color-bar" style="width: ${v.totalProportion}%;"></div></div><span>${v.totalProportion}%</span>
                      </div>
                  </div>
                  <div class="flex-cell">
                      <div class="switch-list-con research-group-list">
                          <div class="scroll-box">
                            <div class="list-con">
                                <div class="row">
                                    <div class="td th name">企业名</div>
                                    <div class="td th">次数</div>
                                    <div class="td th">状态</div>
                                </div>
                                ${listTpl}
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="right-con fr flex-column">
                  <div class="item-top">
                      <div class="number">调研企业次数：<span>${v.times}</span>次</div>
                      <!--<div class="flex proportion-box">
                        <div class="line-bar flex-cell"><div class="color-bar" style="width: ${v.timesProportion}%;"></div></div><span>${v.timesProportion}%</span>
                      </div>-->
                  </div>
                  <div class="flex-cell flex-column item-middle">
                      <div class="number">问题总数：<span>${v.problem}</span>个</div>
                      <div class="flex-cell">
                          <div class="research-total-end">
                              <span class="row">已完成<span>${v.completeNum}</span></span>
                          </div>
                      </div>
                  </div>
                  <div class="item-bottom">
                      <div class="number">调研报告完成情况：<span class="research-status">${v.completeStatus}</span></div>
                      <!--<div class="line-bar"><div class="color-bar" style="width: ${v.completeStatus == '已完成' ? '100%' : '50%'};"></div></div>-->
                  </div>
              </div>
          </div>`;
  })
    $('.swiper-container-switch .swiper-wrapper').html(switchTpl);

    $('.swiper-container-switch .research-group-list .scroll-box').mCustomScrollbar({theme:"minimal"});

  }
/*  $.when(
    $.getJSON(researchGroupJsonUrlA),
    $.getJSON(researchGroupJsonUrlE),
    $.getJSON(researchGroupJsonUrlK)
  ).then(function(resultA, resultB, resultC) {
    // console.log(resultA, resultB, resultC);

    const data = resultA[0].content['调研情况'];
    const dataB = resultB[0].content;
    const dataC = resultC[0].content[0];
    console.log(data,dataB,dataC);
    for (let item in data){
      if(item){
        let problem = 0;
        let completeNum = 0;
        let completeStatus = '';
        for(let i=0;i<dataB.length;i++){
          if(item == dataB[i]['小组名']){
            problem = dataB[i]['调研问题总数'];
            completeNum = dataB[i]['已完成问题数'];
            /!*if(problem == completeNum){
              completeStatus = '已完成';
            }else{
              completeStatus = (completeNum/problem *100)+'%';
            }*!/
            break;
          }
        }

        /!*for(let status in dataC){
          console.log(status)
          if(item == status){
            completeStatus = dataC[status];
            break;
          }
        }*!/
        dataC[item] ? completeStatus = dataC[item] : '未知';
        const companys = [];
        // const companyListData = data[item]['企业列表'].slice(1,6);
        const companyListData = data[item]['企业列表'];
        companyListData.forEach((v,i) => {
          const companyItem = {
            name: v['企业名称'],
            times: v['调研次数'],
            status: v['调研状态']
          };
        companys.push(companyItem);
      })

        const itemObj = {
          name: item,
          total: data[item]['组调研企业总数'],
          times: data[item]['组调研日志总数'],
          problem: problem,
          completeNum: completeNum,
          completeStatus: completeStatus,
          companys: companys
        };
        researchGroupData.push(itemObj);
      }
    }
    let tpl = ``;
    console.log(researchGroupData)
    researchGroupData.forEach((v) => {
      tpl += `<div class="swiper-slide" data-name="${v.name}">${v.name}</div>`;
  })
    /!*tpl += `<div class="swiper-slide">生物医学组</div>
                <div class="swiper-slide">XXXX组</div>
                <div class="swiper-slide">XXXX组</div>`;*!/
    $('.research-group-switch-label .swiper-wrapper').html(tpl);
    let switchTpl = ``;
    researchGroupData.forEach((v) => {
      let listTpl = ``;
    v.companys.forEach((item) => {
      listTpl += `<div class="row">
                      <div class="td row-name" title="${item.name}">${item.name}</div>
                      <div class="td">${item.times}</div>
                      <div class="td ${item.status == '未开始' ? 'error': item.status == '进行中' ? 'doing' : 'success'}">${item.status}</div>
                  </div>`;
  });
    switchTpl += `<div class="swiper-slide">
              <div class="left-con fl flex-column">
                  <div class="item-top">
                      <div class="number">调研企业总数：<span>${v.total}</span>家</div>
                      <div class="line-bar"><div class="color-bar" style="width: 80%;"></div></div>
                  </div>
                  <div class="flex-cell">
                      <div class="switch-list-con research-group-list">
                          <div class="scroll-box">
                            <div class="list-con">
                                <div class="row">
                                    <div class="td th name">企业名</div>
                                    <div class="td th">次数</div>
                                    <div class="td th">状态</div>
                                </div>
                                ${listTpl}
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="right-con fr flex-column">
                  <div class="item-top">
                      <div class="number">调研企业次数：<span>${v.times}</span>次</div>
                      <div class="line-bar"><div class="color-bar" style="width: ${v.times ? '80' : '0'}%;"></div></div>
                  </div>
                  <div class="flex-cell flex-column item-middle">
                      <div class="number">问题总数：<span>${v.problem}</span>个</div>
                      <div class="flex-cell">
                          <div class="research-total-end">
                              <span class="row">已完成<span>${v.completeNum}</span></span>
                          </div>
                      </div>
                  </div>
                  <div class="item-bottom">
                      <div class="number">调研报告完成情况：<span class="research-status">${v.completeStatus}</span></div>
                      <!--<div class="line-bar"><div class="color-bar" style="width: ${v.completeStatus == '已完成' ? '100%' : '50%'};"></div></div>-->
                  </div>
              </div>
          </div>`;
  })
    $('.swiper-container-switch .swiper-wrapper').html(switchTpl);

    $('.swiper-container-switch .research-group-list .scroll-box').mCustomScrollbar({theme:"minimal"})
  });*/


  /*PROMOTE*/
  RequestDataFn('/demo/dataV/jsonData/findBySurveyAdvanceName.json').done(function(res){
    // console.log(res);
    /*PROMOTE--item1*/
    /*PROMOTE的小组状态列表*/
    const wherherToCompleteeData = res.whetherToCompletee[0];
    const completeTeams = [];
    for(let item in wherherToCompleteeData){
      if(item){
        const itemObj = {
          name: item,
          completeStatus: wherherToCompleteeData[item]
        };
        completeTeams.push(itemObj);
      }
    }
    researchPromoteData.item1.completeTeams = completeTeams;
    /*PROMOTE的小组状态列表END*/

    const researchNumTimes = res.researchQuantity;
    researchPromoteData.item1.researchTotal = researchNumTimes['所有小组调研企业数总和'];
    researchPromoteData.item1.researchTimes = researchNumTimes['调研日志数总和'];

    /*PROMOTE--item2*/
    const promoteRankEChartData = res.teamProgress;
    const rankData = [];
    promoteRankEChartData.forEach((v) => {
      const itemObj = {name: '', value: ''};
    for(let i in v){
      if(i){
        itemObj.name = i;
        itemObj.value = v[i];
      }
    }
    rankData.push(itemObj);
  })
    rankData.sort(compare('value','desc'));
    // console.log(rankData)
    const sliceRankData = rankData.slice(0,10);
    const companyRankData = [];
    for(let i=0;i<sliceRankData.length; i++){
      companyRankData.push(sliceRankData[i].name);
    };

    researchPromoteData.item2 = companyRankData;

    /*PROMOTE--item3*/
    const promoteTop10Data = res.topTenCompanies['访问企业系统次数排名前十的调研企业'];
    promoteTop10Data.forEach((v) => {
      const itemObj = {
        name: v['企业名称'],
        value: v['访问总次数']
      }
      researchPromoteData.item3.push(itemObj);
  })

    /*PROMOTE--item4*/
    const todayVistNumData = res.topTenCompanies['企业系统当日访问总次数'];
    researchPromoteData.item4.todayVisitCount = todayVistNumData['访问总次数'];

    /*格式化html展示*/
    formatPromoteHtml();
  });
  function formatPromoteHtml(){
    /*PROMOTE--item1*/
    const completeTeamData = researchPromoteData.item1;

    /*PROMOTE的小组状态列表*/
    const completeTeamList = completeTeamData.completeTeams;
    let completeList = ``;
    completeTeamList.forEach((v) => {
      completeList += `<div class="row">
                        <div class="td">${v.name}</div>
                        <div class="td  ${v.completeStatus == '未完成' ? 'error': v.completeStatus == '进行中' ? 'doing' : 'success'}">${v.completeStatus}</div>
                    </div>`
  })
    $('.complete-team-list').append(completeList);
    $('.complete-team-box .scroll-con').mCustomScrollbar({theme: 'minimal'});
    /*PROMOTE的小组状态列表END*/

    $('.complete-team-count .research-total span').html(completeTeamData.researchTotal);
    $('.complete-team-count .research-times span').html(completeTeamData.researchTimes);

    /*PROMOTE--item2*/
    const myChart = echarts.init(document.getElementById('research-echart'));
    // var dataAxis = ['电子信息制造组','数字游戏3组','互联网应用软件组','软件及外包组','物联网组','系统集成服务2组','化学药组','中药生物组','生物医学组','航空航天组'];
    var dataAxis = researchPromoteData.item2;
    var data = [];
    for (let i = dataAxis.length; i>0; i--) {
      data.push(i)
    }

    $(window).resize(function() {
      myChart.resize();
    });
    const option = {
      tooltip: {
        show: true,
        formatter: function (params) {
          // console.log(params);
          return params.name + '：' + (params.dataIndex + 1);
        }
      },
      grid: {
        top: 30,
        left: '15%',
        right: '15%'
      },
      xAxis: {
        name: '小组',
        nameTextStyle: {
          color: '#a8bffc'
        },
        data: dataAxis,
        axisLabel: {
          textStyle: {
            color: '#a8bffc'
          },
          rotate: 30,
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
        name: '排名',
        nameTextStyle: {
          color: '#a8bffc'
        },
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle:{
            color: '#414960'
          }
        },
        splitLine:{
          show: false
        },
        axisLabel: {
          show: false,
          textStyle: {
            color: '#a8bffc'
          }
        }
      },
      /*dataZoom: [
        {
          type: 'inside'
        }
      ],*/
      series: [
        {
          type: 'bar',
          barWidth: '30%',
          label: {
            show: true,
            color: '#a8bffc',
            position: 'top',
            fontWeight: 'bold',
            fontSize: 20,
            formatter: function (params) {
              return params.dataIndex + 1;
            }
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


    /*PROMOTE--item3*/
    const visitTop10Data = researchPromoteData.item3;
    let visitTop10Tpl = ``;
    visitTop10Data.forEach((v,i) => {
      visitTop10Tpl += `<div class="row">
                        <div class="td">${i + 1}</div>
                        <div class="td">${v.name}</div>
                        <!--<div class="td"><div class="line-bar"><div class="color-bar" style="width: ${v.value/visitTop10Data[0].value*100}%"></div><span>${v.value}</span></div></div>-->
                        <div class="td"><div class="line-bar"><div class="color-bar" style="width: ${(10-i)*10}%"></div><span>${v.value}</span></div></div>
                    </div>`;
  })

    $('.research-visit-top10 .table-list').html(visitTop10Tpl);

    /*PROMOTE--item4*/
    const todayVisitCountData = researchPromoteData.item4;
    $('.today-visit-count .research-promote-left-bg span').html(todayVisitCountData.todayVisitCount);

    const todayVisitCountChart1 = echarts.init(document.getElementById('research-promote-right-bg1'));

    const todayVisitDataAxis = [];
    const todayVisitData = [];
    const todayVisitHotWordData = todayVisitCountData.hotWordDegree;
    todayVisitHotWordData.forEach((v) => {
      todayVisitDataAxis.push(v.name);
    todayVisitData.push(v.value);
  })
    $(window).resize(function() {
      todayVisitCountChart1.resize();
    });
    const todayVisitOption1 = {
      title: {
        text: '调研',
        left: 'center',
        textStyle: {color: '#a8bffc'}
      },
      tooltip: {
        show: true
      },
      grid: {
        top: 30,
        bottom: 25,
        left: '15%',
        right: '25%'
      },
      xAxis: {
        name: '类别',
        nameTextStyle: {
          color: '#a8bffc'
        },
        data: todayVisitDataAxis,
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
        name: '指数值',
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
          data: todayVisitData
        }
      ]
    };
    todayVisitCountChart1.setOption(todayVisitOption1);


    const todayVisitCountChartReport = echarts.init(document.getElementById('research-promote-right-bg'));

    const todayVisitDataAxisReport = [];
    const todayVisitDataReport = [];
    const todayVisitHotWordDataReport = todayVisitCountData.hotWordDegreeReport;
    todayVisitHotWordDataReport.forEach((v) => {
      todayVisitDataAxisReport.push(v.name);
    todayVisitDataReport.push(v.value);
  })
    $(window).resize(function() {
      todayVisitCountChartReport.resize();
    });
    const todayVisitOptionReport = {
      title: {
        text: '调研报告',
        left: 'center',
        textStyle: {color: '#a8bffc'}
      },
      tooltip: {
        show: true
      },
      grid: {
        top: 30,
        bottom: 25,
        left: '15%',
        right: '25%'
      },
      xAxis: {
        name: '类别',
        nameTextStyle: {
          color: '#a8bffc'
        },
        data: todayVisitDataAxisReport,
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
        name: '指数值',
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
          data: todayVisitDataReport
        }
      ]
    };
    todayVisitCountChartReport.setOption(todayVisitOptionReport);

  }
  /*PROMOTE--item1*/
  const researchPromoteJsonUrlA = '/economic/datavPage/js/jsonData/apiA.json';
  const researchPromoteJsonUrlC = '/economic/datavPage/js/jsonData/apiC.json';
  /*$.getJSON(researchPromoteJsonUrlA,function(result){
    researchPromoteData.item1.researchTotal = result.content['所有小组调研企业数总和'];
    researchPromoteData.item1.researchTimes = result.content['调研日志数总和'];
    const completeTeamData = researchPromoteData.item1;
    $('.complete-team-count .research-total span').html(completeTeamData.researchTotal);
    $('.complete-team-count .research-times span').html(completeTeamData.researchTimes);
  });*/
  /*PROMOTE--item2*/
  /*$.getJSON(researchPromoteJsonUrlC,function(result){
    const dataC = result.content;
    const rankData = [];
    dataC.forEach((v) => {
      const itemObj = {name: '', value: ''};
      for(let i in v){
        if(i){
          itemObj.name = i;
          itemObj.value = v[i];
        }
      }
      rankData.push(itemObj);
    })
    rankData.sort(compare('value','desc'));
    // console.log(rankData)
    const sliceRankData = rankData.slice(0,10);
    const companyRankData = [];
      for(let i=0;i<sliceRankData.length; i++){
        companyRankData.push(sliceRankData[i].name);
      };

    researchPromoteData.item2 = companyRankData;

    const myChart = echarts.init(document.getElementById('research-echart'));
    // var dataAxis = ['电子信息制造组','数字游戏3组','互联网应用软件组','软件及外包组','物联网组','系统集成服务2组','化学药组','中药生物组','生物医学组','航空航天组'];
    var dataAxis = researchPromoteData.item2;
    var data = [];
    for (let i = dataAxis.length; i>0; i--) {
      data.push(i)
    }

    $(window).resize(function() {
      myChart.resize();
    });
    const option = {
      tooltip: {
        show: true,
        formatter: function (params) {
          // console.log(params);
          return params.name + '：' + (params.dataIndex + 1);
        }
      },
      grid: {
        top: 30,
        left: '15%',
        right: '15%'
      },
      xAxis: {
        name: '小组',
        nameTextStyle: {
          color: '#a8bffc'
        },
        data: dataAxis,
        axisLabel: {
          textStyle: {
            color: '#a8bffc'
          },
          rotate: 30,
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
        name: '排名',
        nameTextStyle: {
          color: '#a8bffc'
        },
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle:{
            color: '#414960'
          }
        },
        splitLine:{
          show: false
        },
        axisLabel: {
          show: false,
          textStyle: {
            color: '#a8bffc'
          }
        }
      },
      /!*dataZoom: [
        {
          type: 'inside'
        }
      ],*!/
      series: [
        {
          type: 'bar',
          barWidth: '30%',
          label: {
            show: true,
            color: '#a8bffc',
            position: 'top',
            fontWeight: 'bold',
            fontSize: 20,
            formatter: function (params) {
              return params.dataIndex + 1;
            }
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
  });*/


  /*PROMOTE--item3*/
  const visitTop10Url = '/economic/datavPage/js/jsonData/apiD.json';
  /*$.getJSON(visitTop10Url,function(result){
    const data = result.content['访问企业系统次数排名前十的调研企业'];
    data.forEach((v) => {
      const itemObj = {
        name: v['企业名称'],
        value: v['访问总次数']
      }
      researchPromoteData.item3.push(itemObj);
    })
    const visitTop10Data = researchPromoteData.item3;
    let visitTop10Tpl = ``;
    visitTop10Data.forEach((v,i) => {
      visitTop10Tpl += `<div class="row">
                        <div class="td">${i + 1}</div>
                        <div class="td">${v.name}</div>
                        <!--<div class="td"><div class="line-bar"><div class="color-bar" style="width: ${v.value/visitTop10Data[0].value*100}%"></div><span>${v.value}</span></div></div>-->
                        <div class="td"><div class="line-bar"><div class="color-bar" style="width: ${(10-i)*10}%"></div><span>${v.value}</span></div></div>
                    </div>`;
  })

    $('.research-visit-top10 .table-list').html(visitTop10Tpl);

  });*/


  /*PROMOTE--item4*/
  const researchPromoteJsonUrlD = '/economic/datavPage/js/jsonData/apiD.json';
  /*$.getJSON(researchPromoteJsonUrlD,function(result){
    const data = result.content['企业系统当日访问总次数'];
    console.log(data)
    researchPromoteData.item4.todayVisitCount = data['访问总次数'];
    const todayVisitCountData = researchPromoteData.item4;
    $('.today-visit-count .research-promote-left-bg span').html(todayVisitCountData.todayVisitCount);

    const todayVisitCountChart1 = echarts.init(document.getElementById('research-promote-right-bg1'));

    const todayVisitDataAxis = [];
    const todayVisitData = [];
    const todayVisitHotWordData = todayVisitCountData.hotWordDegree;
    todayVisitHotWordData.forEach((v) => {
      todayVisitDataAxis.push(v.name);
    todayVisitData.push(v.value);
  })
    $(window).resize(function() {
      todayVisitCountChart1.resize();
    });
    const todayVisitOption1 = {
      title: {
        text: '调研',
        left: 'center',
        textStyle: {color: '#a8bffc'}
      },
      tooltip: {
        show: true
      },
      grid: {
        top: 30,
        bottom: 25,
        left: '15%',
        right: '25%'
      },
      xAxis: {
        name: '类别',
        nameTextStyle: {
          color: '#a8bffc'
        },
        data: todayVisitDataAxis,
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
        name: '指数值',
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
          data: todayVisitData
        }
      ]
    };
    todayVisitCountChart1.setOption(todayVisitOption1);


    const todayVisitCountChartReport = echarts.init(document.getElementById('research-promote-right-bg'));

    const todayVisitDataAxisReport = [];
    const todayVisitDataReport = [];
    const todayVisitHotWordDataReport = todayVisitCountData.hotWordDegreeReport;
    todayVisitHotWordDataReport.forEach((v) => {
      todayVisitDataAxisReport.push(v.name);
    todayVisitDataReport.push(v.value);
  })
    $(window).resize(function() {
      todayVisitCountChartReport.resize();
    });
    const todayVisitOptionReport = {
      title: {
        text: '调研报告',
        left: 'center',
        textStyle: {color: '#a8bffc'}
      },
      tooltip: {
        show: true
      },
      grid: {
        top: 30,
        bottom: 25,
        left: '15%',
        right: '25%'
      },
      xAxis: {
        name: '类别',
        nameTextStyle: {
          color: '#a8bffc'
        },
        data: todayVisitDataAxisReport,
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
        name: '指数值',
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
          data: todayVisitDataReport
        }
      ]
    };
    todayVisitCountChartReport.setOption(todayVisitOptionReport);
  });*/


  /*ANALYSIS*/
  RequestDataFn('/demo/dataV/jsonData/findByResearchEnterpriseName.json','GET').done(function(res){
    console.log(res)
    /*ANALYSIS--item1*/
    const upDownBusinessData = res.questionnaireAnalysis[0];
    const highQualityBusinessCopy = [];
    const ventureBusinessCopy = [];
    for(let item in upDownBusinessData){
      const highQualityBusiness = upDownBusinessData[item]['2018成长性增长20%以上，且2019成长性增长20%以上'];
      const ventureBusiness = upDownBusinessData[item]['2018成长性下滑20%以内，且2019成长性下滑20%以内'];
      if(highQualityBusiness.length){
        highQualityBusinessCopy.push(...highQualityBusiness);
      }
      if(ventureBusiness.length){
        ventureBusinessCopy.push(...ventureBusiness);
      }
    }
	researchAnalysisData.highQualityBusiness = highQualityBusinessCopy;
	researchAnalysisData.ventureBusiness = ventureBusinessCopy;
	
    /*ANALYSIS--item2--item3*/
    const businessIncomeData = res.businessIncome;
    const shouruData = [];
    const shuishouData = [];
    // res.businessIncome.filter(function(item){
    for(let i in businessIncomeData) {
      const item = res.businessIncome[i]
      if (item['营业收入']['2018年一季度营业收入'] && item['营业收入']['2018年一季度营业收入'] != '无') {

        let itemObj;
        let itemObjValue;
        if (item['营业收入']['2018年一季度营业收入'].indexOf('万') > -1) {
          itemObjValue = Number(item['营业收入']['2018年一季度营业收入'].split('万')[0]);
        } else if (item['营业收入']['2018年一季度营业收入'].indexOf('\t') > -1) {
          itemObjValue = Number(item['营业收入']['2018年一季度营业收入'].split('\t')[0]);
        } else {
          itemObjValue = Number(item['营业收入']['2018年一季度营业收入']);
        }
        itemObj = {name: item['企业名称'], value: itemObjValue};
        shouruData.push(itemObj);
      }
      if (item['税收']['2018年一季度税收'] && item['税收']['2018年一季度税收'] != '无') {

        let shuishouItemObjValue;
        if (item['税收']['2018年一季度税收'].indexOf('万') > -1) {
          shuishouItemObjValue = Number(item['税收']['2018年一季度税收'].split('万')[0]);
        } else if (item['税收']['2018年一季度税收'].indexOf('\t') > -1) {
          shuishouItemObjValue = Number(item['税收']['2018年一季度税收'].split('\t')[0]);
        } else {
          shuishouItemObjValue = Number(item['税收']['2018年一季度税收']);
        }
        let shuishouItemObj = {name: item['企业名称'], value: shuishouItemObjValue};
        shuishouData.push(shuishouItemObj);
      }
    }
    // });

    shouruData.sort(compare('value','desc'));
    shuishouData.sort(compare('value','desc'));
    const shouruData2 = shouruData.slice(1,6);
    const shuishouData2 = shuishouData.slice(1,6);
    shouruData2.forEach((v) => {
      const itemObj = {name: v.name,value: v.value};
      researchAnalysisData.shouruTop5.push(itemObj);
    });
      shuishouData2.forEach((v) => {
        const itemObj = {name: v.name,value: v.value};
      researchAnalysisData.shuishouTop5.push(itemObj);
    });

    /*--item4*/
    researchAnalysisData.researchCount.researchTotal = Number(res.researchQuantity['所有小组调研企业数总和']);
    researchAnalysisData.researchCount.moneyDebtRatio = Number(res.corporateLiabilities['平均资产负债率']);
    researchAnalysisData.researchCount.moneyTotal = Number(res.corporateLiabilities['资金缺口总数']);

    formatResearchAnalysisHtml();
  });
  function formatResearchAnalysisHtml(){
    /*ANALYSIS--item1*/
    /*优质企业*/
    let highQualityBusinessTpl = ``;
    const highQualityBusinessData = researchAnalysisData.highQualityBusiness;
    if(highQualityBusinessData.length>0){
      highQualityBusinessData.forEach((v) => {
        highQualityBusinessTpl += `<div class="row">${v['企业名称']}</div>`;
    });
    }else{
      highQualityBusinessTpl += `<div class="text-c">暂无数据</div>`
    }
    $('.highQualityBusiness .list').html(highQualityBusinessTpl);
    $('.highQualityBusiness .scroll-con').mCustomScrollbar({theme: 'minimal'});
    /*危险企业*/
    /*let dangerousBusinessTpl = ``;
    const dangerousBusinessData = researchAnalysisData.dangerousBusiness;
    dangerousBusinessData.forEach((v) => {
      dangerousBusinessTpl += `<div class="row">${v}</div>`;
    });
    $('.dangerousBusiness .list').append(dangerousBusinessTpl);*/

    /*--item2*/
    /*潜力企业*/
    /*let potentialBusinessTpl = ``;
    const potentialBusinessData = researchAnalysisData.potentialBusiness;
    potentialBusinessData.forEach((v) => {
      potentialBusinessTpl += `<div class="row">${v}</div>`;
    });
    $('.potentialBusiness .list').append(potentialBusinessTpl);*/
    /*风险企业*/
    let ventureBusinessTpl = ``;
    const ventureBusinessData = researchAnalysisData.ventureBusiness;
    if(ventureBusinessData.length>0){
      ventureBusinessData.forEach((v) => {
        ventureBusinessTpl += `<div class="row">${v['企业名称']}</div>`;
    });
    }else{
      ventureBusinessTpl += `<div class="text-c">暂无数据</div>`;
    }
    $('.ventureBusiness .list').html(ventureBusinessTpl);
    $('.ventureBusiness .scroll-con').mCustomScrollbar({theme: 'minimal'});


    /*ANALYSIS--item2*/
    let shouruTop5List = ``;
    const shouruTop5Data = researchAnalysisData.shouruTop5;
    shouruTop5Data.forEach((v,i) => {
      shouruTop5List += `<div class="row">
                          <div class="td">${i + 1}</div>
                          <div class="td">${v.name}</div>
                          <div class="td"><div class="line-bar"><div class="color-bar" style="width: ${(10 - i)*10}%"></div><span>${v.value}</span></div></div>
                      </div>`;
    });
    $('.research-shouru-top5 .table-list').html(shouruTop5List);

    /*ANALYSIS--item3*/

    let shuishouTop5List = ``;
    const shuishouTop5Data = researchAnalysisData.shuishouTop5;
    shuishouTop5Data.forEach((v,i) => {
      shuishouTop5List += `<div class="row">
                          <div class="td">${i + 1}</div>
                          <div class="td">${v.name}</div>
                          <div class="td"><div class="line-bar"><div class="color-bar" style="width: ${(10 - i)*10}%"></div><span>${v.value}</span></div></div>
                      </div>`;
    });
    $('.research-shuishou-top5 .table-list').html(shuishouTop5List);

    /*ANALYSIS--item4*/

    const researchTotal = researchAnalysisData.researchCount.researchTotal;
    const moneyDebtRatio = researchAnalysisData.researchCount.moneyDebtRatio;
    const moneyTotal = researchAnalysisData.researchCount.moneyTotal;
    const analysisCountTpl = `<div class="item-row">
                                <div class="number">调研企业总数：<span>${researchTotal}</span></div>
                                <!--<div class="line-bar"><div class="color-bar" style="width: 50%"></div></div>-->
                            </div>
                            <div class="item-row">
                                <div class="number moneyTotal">资金缺口总数：<span>${moneyTotal}</span>万元</div>
                                <!--<div class="line-bar"><div class="color-bar" style="width: 50%"></div></div>-->
                            </div>
                            <div class="item-row">
                                <div class="number moneyDebtRatio">资产负债率：<span>${moneyDebtRatio.toFixed(1)}</span>%</div>
                                <div class="line-bar"><div class="color-bar" style="width: ${moneyDebtRatio}%"></div></div>
                            </div>`
    $('.research-item3-column .right-con').html(analysisCountTpl);

    const companyData = researchAnalysisData.researchCount.companys;
    let analysisCountListTpl =``;
    companyData.forEach((v) => {
      analysisCountListTpl += `<div class="row"><div class="td name">${v.name}</div><div class="td problem-type">${v.problem}</div></div>`
    })
    $('.research-item3-column .middle-con .list').html(analysisCountListTpl);
    $('.research-item3-column .middle-con .list').mCustomScrollbar({theme: 'minimal'});

  }
  /*--item1*/
  const researchAnalysisJsonUrlJ = '/economic/datavPage/js/jsonData/apiJ.json';
  /*$.getJSON(researchAnalysisJsonUrlJ,function(result){
    const data = result.content[0];
    for(let item in data){
      const highQualityBusiness = data[item]['2018成长性增长20%以上，且2019成长性增长20%以上'];
      const ventureBusiness = data[item]['2018成长性下滑20%以内，且2019成长性下滑20%以内'];
      if(highQualityBusiness){
        researchAnalysisData.highQualityBusiness.concat(highQualityBusiness);
      }
      if(ventureBusiness){
        researchAnalysisData.ventureBusiness.concat(ventureBusiness);
      }
    }
    /!*优质企业*!/
    let highQualityBusinessTpl = ``;
    const highQualityBusinessData = researchAnalysisData.highQualityBusiness;
    if(highQualityBusinessData.length>0){
      highQualityBusinessData.forEach((v) => {
        highQualityBusinessTpl += `<div class="row">${v['企业名称']}</div>`;
      });
    }else{
      highQualityBusinessTpl += `<div class="text-c">暂无数据</div>`
    }
    $('.highQualityBusiness .list').append(highQualityBusinessTpl);
    /!*危险企业*!/
    /!*let dangerousBusinessTpl = ``;
    const dangerousBusinessData = researchAnalysisData.dangerousBusiness;
    dangerousBusinessData.forEach((v) => {
      dangerousBusinessTpl += `<div class="row">${v}</div>`;
    });
    $('.dangerousBusiness .list').append(dangerousBusinessTpl);*!/

    /!*--item2*!/
    /!*潜力企业*!/
    /!*let potentialBusinessTpl = ``;
    const potentialBusinessData = researchAnalysisData.potentialBusiness;
    potentialBusinessData.forEach((v) => {
      potentialBusinessTpl += `<div class="row">${v}</div>`;
    });
    $('.potentialBusiness .list').append(potentialBusinessTpl);*!/
    /!*风险企业*!/
    let ventureBusinessTpl = ``;
    const ventureBusinessData = researchAnalysisData.ventureBusiness;
    if(ventureBusinessData.length>0){
      ventureBusinessData.forEach((v) => {
        ventureBusinessTpl += `<div class="row">${v['企业名称']}</div>`;
      });
    }else{
      ventureBusinessTpl += `<div class="text-c">暂无数据</div>`;
    }
    $('.ventureBusiness .list').append(ventureBusinessTpl);
  });*/

  /*--item2*/
  /*收入*/
  const shouruTop5Url = '/economic/datavPage/js/jsonData/apiH.json';
  /*$.getJSON(shouruTop5Url,function(result){
    const data = [];
    const shuishouData = [];
    result.content.filter(function(item){
      if(item['营业收入']['2018年一季度营业收入'] && item['营业收入']['2018年一季度营业收入'] != '无'){

        let itemObj;
        let itemObjValue;
        if(item['营业收入']['2018年一季度营业收入'].indexOf('万') > -1){
          itemObjValue = Number(item['营业收入']['2018年一季度营业收入'].split('万')[0]);
        }else if(item['营业收入']['2018年一季度营业收入'].indexOf('\t') > -1){
          itemObjValue = Number(item['营业收入']['2018年一季度营业收入'].split('\t')[0]);
        }else{
          itemObjValue = Number(item['营业收入']['2018年一季度营业收入']);
        }
        itemObj = {name: item['企业名称'],value: itemObjValue};
        data.push(itemObj);
      }
      if(item['税收']['2018年一季度税收'] && item['税收']['2018年一季度税收'] != '无'){

        let shuishouItemObjValue;
        if(item['税收']['2018年一季度税收'].indexOf('万') > -1){
          shuishouItemObjValue = Number(item['税收']['2018年一季度税收'].split('万')[0]);
        }else if(item['税收']['2018年一季度税收'].indexOf('\t') > -1){
          shuishouItemObjValue = Number(item['税收']['2018年一季度税收'].split('\t')[0]);
        }else{
          shuishouItemObjValue = Number(item['税收']['2018年一季度税收']);
        }
        let shuishouItemObj = {name: item['企业名称'],value: shuishouItemObjValue};
        shuishouData.push(shuishouItemObj);
      }

    });
    data.sort(compare('value','desc'));
    shuishouData.sort(compare('value','desc'));
    const data2 = data.slice(1,6);
    const shuishouData2 = shuishouData.slice(1,6);
    console.log(data2)
    data2.forEach((v) => {
      const itemObj = {name: v.name,value: v.value};
      researchAnalysisData.shouruTop5.push(itemObj);
    });
    shuishouData2.forEach((v) => {
      const itemObj = {name: v.name,value: v.value};
      researchAnalysisData.shuishouTop5.push(itemObj);
    });
    let shouruTop5List = ``;
    const shouruTop5Data = researchAnalysisData.shouruTop5;
    shouruTop5Data.forEach((v,i) => {
      shouruTop5List += `<div class="row">
                          <div class="td">${i + 1}</div>
                          <div class="td">${v.name}</div>
                          <div class="td"><div class="line-bar"><div class="color-bar" style="width: ${(10 - i)*10}%"></div><span>${v.value}</span></div></div>
                      </div>`;
    })
    $('.research-shouru-top5 .table-list').html(shouruTop5List);

    let shuishouTop5List = ``;
    const shuishouTop5Data = researchAnalysisData.shuishouTop5;
    shuishouTop5Data.forEach((v,i) => {
      shuishouTop5List += `<div class="row">
                          <div class="td">${i + 1}</div>
                          <div class="td">${v.name}</div>
                          <div class="td"><div class="line-bar"><div class="color-bar" style="width: ${(10 - i)*10}%"></div><span>${v.value}</span></div></div>
                      </div>`;
    })
    $('.research-shuishou-top5 .table-list').html(shuishouTop5List);
  });*/

  /*--item3*/
  /*$.getJSON(researchPromoteJsonUrlA,function(result){

    researchAnalysisData.researchCount.researchTotal = result.content['所有小组调研企业数总和'];
    const researchCount = {
      "code":"200",
      "codeDesc":"请求成功",
      "content":{
        "平均资产负债率":68.595,
        "资金缺口总数":1600
      },
      "success":true
    }
    researchAnalysisData.researchCount.moneyDebtRatio = researchCount.content['平均资产负债率'];
    researchAnalysisData.researchCount.moneyTotal = researchCount.content['资金缺口总数'];
    const analysisCountTpl = `<div class="item-row">
                                <div class="number">调研企业总数：<span>${researchAnalysisData.researchCount.researchTotal}</span></div>
                                <div class="line-bar"><div class="color-bar" style="width: 50%"></div></div>
                            </div>
                            <div class="item-row">
                                <div class="number moneyTotal">资金缺口总数：<span>${researchAnalysisData.researchCount.moneyTotal}</span>万元</div>
                                <div class="line-bar"><div class="color-bar" style="width: 50%"></div></div>
                            </div>
                            <div class="item-row">
                                <div class="number moneyDebtRatio">资产负债率：<span>${researchAnalysisData.researchCount.moneyDebtRatio.toFixed(1)}</span>%</div>
                                <div class="line-bar"><div class="color-bar" style="width: ${researchAnalysisData.researchCount.moneyDebtRatio}%"></div></div>
                            </div>`
    $('.research-item3-column .right-con').html(analysisCountTpl);
  });

  const companyData = researchAnalysisData.researchCount.companys;
  let analysisCountListTpl =``;
  companyData.forEach((v) => {
    analysisCountListTpl += `<div class="row"><div class="td name">${v.name}</div><div class="td problem-type">${v.problem}</div></div>`
  })
  $('.research-item3-column .middle-con .list').html(analysisCountListTpl);
  $('.research-item3-column .middle-con .list').mCustomScrollbar({theme: 'minimal'});*/

  /*Problem*/

  RequestDataFn('/demo/dataV/jsonData/businessProblemSituation.json','GET').done(function(res){
    const researchProblemEchart = res.questionCategory;
    const researchProblemHandle = res.stageProblemHandling;
    /*--item1*/
    researchProblemData.item1.problemType = researchProblemEchart['分类列表'];
    researchProblemData.item1.problemTotal = researchProblemEchart['累计收集问题总件数'];
    /*--item2*/
    researchProblemData.item2.averageHandleTime = researchProblemHandle['平均处理时间'];
    researchProblemData.item2.averageAcceptTime = researchProblemHandle['平均受理时间'];
    researchProblemData.item2.totalHandleTime = researchProblemHandle['总共处理时间'];
    researchProblemData.item2.totalAcceptTime = researchProblemHandle['总共受理时间'];
    researchProblemData.item2.problemTotal = researchProblemHandle['已完成问题数'];
    formatResearchProblemHtml();
  });
  function formatResearchProblemHtml(){
    /*--item1*/
    var problemMyChart = echarts.init(document.getElementById('problem-echart'));
    var echartData = researchProblemData.item1.problemType;
    var problemTotal = researchProblemData.item1.problemTotal;
    $('.problem-handle .number span').html(problemTotal);

    const legendData = [];
    const seriseData = [];
    for(let i in echartData){
      legendData.push(i);
      seriseData.push({value:echartData[i], name:i});
    }
    $(window).resize(function() {
      problemMyChart.resize();
    });
    const ProblemOption = {
      color: ['#137fca','#3392be','#4fb794','#76f7d1','#76f5f7','#6ac95e','#89d55b','#adeb88'],
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      /*legend: {
        orient: 'vertical',
        left: 'left',
        data: legendData
      },*/
      series : [
        {
          name: '问题分类情况',
          type: 'pie',
          radius : '80%',
          center: ['50%', '52%'],
          data:seriseData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            /*formatter: function (params) {
              console.log(params)
              return params.name + '(<span>'+ params.data.value +'</span>)';
            }*/
            formatter: [
              '{a|{b}（}'+'{b|{c}}{a|）}'
            ].join('\n'),

            rich: {
              a: {
                color: '#a8bffc'
              },
              b: {
                fontSize: 18,
                fontFamily: 'Microsoft YaHei',
                color: '#a8bffc'
              }
            }
          },
          /*labelLine: {
            lineStyle: {
              color: '#a8bffc'
            }
          }*/
        }
      ]
    };
    problemMyChart.setOption(ProblemOption);

    /*--item2*/
    const acceptTimeNum = Number(researchProblemData.item2.averageAcceptTime.split('小时')[0]);
    const handleTimeNum = Number(researchProblemData.item2.averageHandleTime.split('小时')[0]);
    const acceptTotalTimeNum = Number(researchProblemData.item2.totalAcceptTime.split('小时')[0]);
    const handleTotalTimeNum = Number(researchProblemData.item2.totalHandleTime.split('小时')[0]);
    $('.research-problem-time .left-con .number span').html(researchProblemData.item2.averageAcceptTime);
    const acceptProportion = acceptTimeNum/acceptTotalTimeNum*100 == 100 ? 100 : (acceptTimeNum/acceptTotalTimeNum*100).toFixed(2);
    $('.research-problem-time .left-con .color-bar').css({width: acceptProportion + '%'});
    $('.research-problem-time .left-con .time-box span').html(acceptProportion + '%');
    const handleProportion = handleTimeNum/handleTotalTimeNum*100 == 100 ? 100 : (handleTimeNum/handleTotalTimeNum*100).toFixed(2);
    $('.research-problem-time .right-con .color-bar').css({width: handleProportion + '%'});
    $('.research-problem-time .right-con .time-box span').html(handleProportion + '%');
    $('.research-problem-time .right-con .number span').html(researchProblemData.item2.averageHandleTime);
    $('.research-problem-time .middle-con .number span').html(researchProblemData.item2.problemTotal);
  }
  /*var problemMyChart = echarts.init(document.getElementById('problem-echart'));
  const problemCollectionDataUrl = '/economic/datavPage/js/jsonData/apiB.json';
  const problemHandleDataUrl = '/economic/datavPage/js/jsonData/apiF.json';
  $.getJSON(problemCollectionDataUrl,function(result){
    console.log(11,result)
    researchProblemData.item1.problemType = result.content['分类列表'];
    researchProblemData.item1.problemTotal = result.content['累计收集问题总件数'];
    var echartData = researchProblemData.item1.problemType;
    var problemTotal = researchProblemData.item1.problemTotal;
    $('.problem-handle .number span').html(problemTotal);

    const legendData = [];
    const seriseData = [];
    for(let i in echartData){
      legendData.push(i);
      seriseData.push({value:echartData[i], name:i});
    }
    $(window).resize(function() {
      problemMyChart.resize();
    });
    const ProblemOption = {
      color: ['#137fca','#3392be','#4fb794','#76f7d1','#76f5f7','#6ac95e','#89d55b','#adeb88'],
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      /!*legend: {
        orient: 'vertical',
        left: 'left',
        data: legendData
      },*!/
      series : [
        {
          name: '问题分类情况',
          type: 'pie',
          radius : '80%',
          center: ['50%', '52%'],
          data:seriseData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            /!*formatter: function (params) {
              console.log(params)
              return params.name + '(<span>'+ params.data.value +'</span>)';
            }*!/
            formatter: [
              '{a|{b}（}'+'{b|{c}}{a|）}'
            ].join('\n'),

            rich: {
              a: {
                color: '#a8bffc'
              },
              b: {
                fontSize: 18,
                fontFamily: 'Microsoft YaHei',
                color: '#a8bffc'
              }
            }
          },
          /!*labelLine: {
            lineStyle: {
              color: '#a8bffc'
            }
          }*!/
        }
      ]
    };
    problemMyChart.setOption(ProblemOption);
  });
  $.getJSON(problemHandleDataUrl,function(result){
    console.log(22,result)
    const data = result.content;
    researchProblemData.item2.averageHandleTime = data['平均处理时间'];
    researchProblemData.item2.averageAcceptTime = data['平均受理时间'];
    researchProblemData.item2.problemTotal = data['已完成问题数'];
    console.log(researchProblemData.item2)
    $('.research-problem-time .left-con span').html(researchProblemData.item2.averageAcceptTime);
    $('.research-problem-time .right-con span').html(researchProblemData.item2.averageHandleTime);
    $('.research-problem-time .middle-con span').html(researchProblemData.item2.problemTotal);
  });*/


  /*点击调研小组企业列表获取详情*/
  $('.research-group-box').on('click','.research-group-list .row-name',function(e){
    e.stopPropagation();
    const name = $(this).data('name');
    RequestDataFn('/demo/dataV/jsonData/getCompanyDetailsByName.json','GET',{name: name}).done(function(res){
      console.log(res)
      const detailData = res.companyDetails[name][0];
      formatCompanyMoreHtml(detailData);
      $('.research-group-box .company-more-info').show();
      $('.research-group-box .research-group-con').addClass('active');
    });
  });
  $('.research-group-box .company-more-info').on('click',function(e){
    e.stopPropagation();
  })
  $('.company-more-info .item-tab').on('click',function(){
    const index = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    $('.item-column').eq(index).show().siblings().hide();
  });
  $('.more-tab-con .scroll-con').mCustomScrollbar({theme: 'minimal'});
  function formatCompanyMoreHtml(options){
    const problemData = options['调研问题'];
    const logsData = options['调研日志'];
    let tpl = `<div class="row">
                  <div class="td th">问题类型</div>
                  <div class="td th">问题标题</div>
                  <div class="td th">问题描述</div>
                  <div class="td th">问题回答</div>
              </div>`;
    if(problemData.length>0){
      problemData.forEach((v) => {
        tpl += `<div class="row">
                <div class="td">${v['问题类型']}</div>
                <div class="td">${v['问题标题'] ? v['问题标题'] : '无'}</div>
                <div class="td"><div class="td-con">${v['问题描述'] ? v['问题描述'] : '无'}</div></div>
                <div class="td"><div class="td-con">${v['问题回答'] ? v['问题回答'] : '无'}</div></div>
            </div>`
      });
    }else{
      tpl += `<div class="row text-c"><div class="td"></div><div class="td"></div><div class="td">无数据！</div><div class="td"></div></div>`
    }
    $('.more-tab-con .more-info-problem').html(tpl);
    let logsTpl = `<div class="row">
                        <div class="td th">调研方式</div>
                        <div class="td th">联系人职位</div>
                        <div class="td th">日志内容</div>
                        <div class="td th">调研时间</div>
                        <div class="td th">联系人电话</div>
                        <div class="td th">联系人姓名</div>
                    </div>`;
    if(logsData.length>0){
      logsData.forEach((v) => {
        logsTpl += `<div class="row">
                    <div class="td">${v['调研方式']}</div>
                    <div class="td">${v['联系人职位'] ? v['联系人职位'] : '无'}</div>
                    <div class="td"><div class="td-con">${v['日志内容']}</div></div>
                    <div class="td">${v['调研时间']}</div>
                    <div class="td">${v['联系人电话'] ? v['联系人电话'] : '无'}</div>
                    <div class="td">${v['联系人姓名'] ? v['联系人姓名'] : '无'}</div>
                </div>`;
      });
    }else{
      logsTpl += `<div class="row text-c"><div class="td"></div><div class="td"></div><div class="td">无数据！</div><div class="td"></div><div class="td"></div><div class="td"></div></div>`;
    }
    $('.more-tab-con .more-info-logs').html(logsTpl);
  }
})()