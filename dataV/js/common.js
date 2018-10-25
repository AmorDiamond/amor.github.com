(function(){
  $(".switch-btn").on("click",function () {
    $(this).toggleClass("lg-width");
  })
  $(".switch-btn .west-area").on("click",function () {
    // if($(".switch-btn").hasClass("lg-width")){
      location.href='index.html';
    // }
  })
  $(".switch-btn .south-area").on("click",function () {
    // if($(".switch-btn").hasClass("lg-width")){
      location.href='southArea.html';
    // }
  })
  $(".switch-btn .research-platform").on("click",function () {
    // if($(".switch-btn").hasClass("lg-width")) {
      location.href = 'researchPlatform.html';
    // }
  })
})()
var compare = function (prop,type) {
  return function (obj1, obj2) {
    var val1 = obj1[prop];
    var val2 = obj2[prop];
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1);
      val2 = Number(val2);
    }
    if(type == 'desc'){
      if (val1 < val2) {
        return 1;
      } else if (val1 > val2) {
        return -1;
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
  }
}
var requestRootPath = '/js/jsonData/';