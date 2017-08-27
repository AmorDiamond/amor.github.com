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


//发送验证码时添加cookie
function addCookie(c_name,value,expiresHours){ 
	//判断是否设置过期时间,0代表关闭浏览器时失效
	if(expiresHours>0){ 
		var exdate=new Date(); 
		exdate.setTime(exdate.getTime()+expiresHours*1000); 
		document.cookie=c_name+ "=" +escape(value)+((expiresHours==null) ? "" : ";expires="+exdate.toGMTString());
	}else{
		// $.cookie(name, escape(value));
		document.cookie=c_name+ "=" +escape(value);
	}

} 
//修改cookie的值
function editCookie(c_name,value,expiresHours){ 
	if(expiresHours>0){ 
		var exdate=new Date(); 
		exdate.setTime(exdate.getTime()+expiresHours*1000); //单位是毫秒
		
		document.cookie=c_name+ "=" +escape(value)+((expiresHours==null) ? "" : ";expires="+exdate.toGMTString());
	} else{
		document.cookie=c_name+ "=" +escape(value);
	}
} 
//根据名字获取cookie的值
function getCookieValue(c_name){ 
	if (document.cookie.length>0){
	  c_start=document.cookie.indexOf(c_name + "=")
	  if (c_start!=-1){ 
		    c_start=c_start + c_name.length+1 
		    c_end=document.cookie.indexOf(";",c_start)
		    if (c_end==-1) c_end=document.cookie.length
		    return unescape(document.cookie.substring(c_start,c_end))
	    } 
  	}
	return ""
}


//发送验证码
function sendCode(obj,times,cookie_name){
	console.log(cookie_name)
	addCookie(cookie_name,times,60);//添加cookie记录,有效时间60s
	settime(obj,cookie_name);//开始倒计时
}
//开始倒计时
var countdown;
function settime(obj,cookie_name) { 
	countdown=getCookieValue(cookie_name);
	console.log(document.cookie);
	if (countdown == 0 || countdown == null) { 
		obj.removeAttr("disabled"); 
		obj.html("获取验证码");
		clearTimeout(timerOut); 
		return;
	} else { 
		obj.attr("disabled", true); 
		obj.html("重新发送(" + countdown + ")"); 
		countdown--;
		editCookie(cookie_name,countdown,countdown+1);
	}
	var timerOut = setTimeout(function() { settime(obj,cookie_name) },1000) //每1000毫秒执行一次	
}


/*验证登录*/
function loginCheck (obj) {
	var frm = $(obj)[0];
	var isMobile = frm.elements['mobile-code'];
	var msg='';
	if(isMobile){
		var mobile = frm.elements['user'].value;
		var mobile_code = frm.elements['mobile-code'].value;
		if(!mobile){
			msg +='手机号码不能为空！\n';
		}
		if(!mobile_code){
			msg +='校验码不能为空！\n';
			
		}

	}else{
		var user = frm.elements['user'].value;
		var password = frm.elements['password'].value;
		if(!user){
			msg +='帐号不能为空！\n';
		}
		if(!password){
			msg +='密码不能为空！\n';
		
		}
	}
	

	if(msg){
		alert(msg);
		return false;
	}else{
		location.href='index.html';
		return false;
	}

	
}


/*验证注册*/
function registerCheck2 (obj) {
	var frm = $(obj)[0];
	var isMobile = frm.elements['mobile'];
	
	var password = frm.elements['password'].value;
	var msg='';
	if(isMobile){
		var mobile = frm.elements['mobile'].value;
		var mobile_code = frm.elements['mobile-code'].value;
		if(!mobile){
			msg +='手机号码不能为空！\n';
		}
		if(!mobile_code){
			msg +='校验码不能为空！\n';
			
		}

	}else{
		var email = frm.elements['email'].value;
		var email_code = frm.elements['email-code'].value;
		if(!email){
			msg +='邮箱不能为空！\n';
		}
		if(!email_code){
			msg +='校验码不能为空！\n';
			
		}
	}
	
	if(!password){
		msg +='密码不能为空！\n';
		
	}
	
	if(msg){
		alert(msg);
		return false;
	}else{
		location.href='index.html';
		return false;
	}

	
}
