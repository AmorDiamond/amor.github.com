function navLineBar() {
	var lineBar = $(".line-bar"),leftP,barW;
	var hasCurr = $(".nav .curr");
	var resetP = hasCurr.position().left;
	var resetW = hasCurr.outerWidth();
	lineBar.css({"left":resetP,"width":resetW});

	$(".nav").on("mouseenter","li",function () {
		leftP = $(this).position().left;
		barW = $(this).outerWidth();
		lineBar.css({"left":leftP,"width":barW});
		// console.log(leftP)  
		// console.log(lineBar)  
	}).on("mouseleave","li",function () {
		lineBar.css({"left":resetP,"width":resetW}); 
	})
};

function srollToPosition(target) {

	scrollTimer = setInterval(function(){

		/*实时获得滚动条位置*/
		returnTopP = $(document).scrollTop();/*火狐不支持$("body")*/
		/*计算滚动到最终位置的总距离*/
		range = returnTopP-Math.ceil(target);/*避免IE下获得的位置不是整数*/
		
		/*设置滚动步长speed*/
		speed =  Math.ceil(Math.abs(range)/10);

		if (speed > 0) {

			/*返回指定位置过程中禁止鼠标滚动*/
			wheelScroll();

			/*判断range的正负(如果是正，说明往上滚动，否则往下滚动)*/
			if(range > 0){
				$(document).scrollTop((returnTopP-speed));
			}else{
				$(document).scrollTop((returnTopP+speed));
			}
			
		}else{
			// $("body").scrollTop(0);
			clearInterval(scrollTimer);
			
			/*返回指定位置后解除鼠标滚动*/
			$(document).unbind("mousewheel DOMMouseScroll")
		}
	},20)
};


function returnTop(){
	var returnTopP;
	var speed;
	// var timer;
	var oEvent = $(document) || $("body");
	$(document).on("scroll",function () {
		returnTopP = $(document).scrollTop();/*火狐不支持$("body")*/

		if(returnTopP > 300) {

			$(".fixed-head").slideDown("fast");

			// $(".return-top").css({"display":"block"});
			$(".return-top").slideDown("fast");
		}else{

			$(".fixed-head").slideUp("fast");

			$(".return-top").slideUp("fast");
		}
	})
	$(".return-top").on("click",function () {
		
		srollToPosition(0)
		// timer = setInterval(function(){

		// 	/*实时获得滚动条位置*/
		// 	returnTopP = $("body").scrollTop();
		// 	/*计算滚动到最终位置的总距离*/
		// 	range = returnTopP-target;
		// 	/*设置滚动步长speed*/
		// 	speed =  Math.ceil(range/10);

		// 	if (speed > 0) {
		// 		$("body").scrollTop((returnTopP-speed));
		// 	}else{
		// 		// $("body").scrollTop(0);
		// 		clearInterval(timer);
		// 	}
		// },30)
	})
}

function returnTopAnimate(){
		
	$(".return-top").on("click",function(){
		$("body").animate({
			scrollTop:0
		},500)

	})
}


/*监听鼠标滚动*/
function wheelScroll(){
	$(document).on("mousewheel DOMMouseScroll", function(e){
			e.preventDefault();
			
			// var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
			// console.log(delta)
			
	});
}