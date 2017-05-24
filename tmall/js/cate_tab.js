/*封装start*/
(function () {
	var cateTab = function (options) {
		this.defaults = $.extend(true,$.fn.cateTab.defaults,options || {});
		console.log("test:"+this.defaults.leftCate);
		console.log(options)
		// this.flag = false;
		this._init();
		this._leftClick();
		this._leftScroll();
	};
	cateTab.prototype={
		_init:function () {
			var self = this;

			// var tabs = $(".tab-ul").children();
			this.tabs = $(self.defaults.rightTab).children();
			// var leftCate = $(".cate-left");
			this.leftCate = $(self.defaults.leftCate);
			// var rightCate = $(".cate-right");
			this.rightCate = $(self.defaults.rightCate);
			// var clonShow = $(".cate-clon");
			this.clonShow = $(self.defaults.clonCate);
			// var lActive = leftCate.find(".active");
			this.lActive = this.leftCate.find(self.defaults.active);
			this.lTop = this.lActive.offset().top;
			this.flag = false;
			this.classActive = self.defaults.active.replace(".","");
				console.log(this.classActive)
		},
		_leftClick:function () {
			var self = this;
		 	self.leftCate.on("click",self.defaults.leftTab,function () {
				/*判断是否点击的第一个*/
				self.flag = this.dataset.index == 0 ? false : true; 
				if (!$(this).hasClass(self.classActive)) {
					
					self.clonShow.html($(this).html()).removeClass(self.defaults.clonShow);
					$(this).addClass(self.classActive).siblings().removeClass(self.classActive);
					console.log($(this))
					/*点击切换菜单后把右侧元素的scrollTop恢复为0*/
					self.rightCate.scrollTop(0);
					$(self.tabs[this.dataset.index]).addClass(self.classActive).siblings().removeClass(self.classActive);

					console.log(self.leftCate.find(self.defaults.leftTab+":first-child"));
					/*如果不是第一个，则把第一个显示出来*/

					if (self.flag) {
						self.clonShow.removeClass(self.defaults.clonShow);
						self.leftCate.find(self.defaults.leftTab+":first-child").css("visibility","visible");
					/*如果是第一个，则调出clon元素并把第一个隐藏起来*/
					}else{
						self.clonShow.addClass(self.defaults.clonShow);
						self.leftCate.find(self.defaults.leftTab+":first-child").css("visibility","hidden");
					}
					self.lActive = self.leftCate.find(self.defaults.active);
				}
				
			});
		},
		_leftScroll:function () {
			var self = this;
			/*左侧菜单滚动实现固定当前所选项*/
			self.leftCate.on("scroll", function () {
				// lActive = leftCate.find(".active");
				self.lTop = $(self.lActive[0]).offset().top;
				// if(lActive.dataset){

				if (self.flag) {
					if (self.lTop <= 43) {
						self.clonShow.addClass(self.defaults.clonShow);
					}else{
						self.clonShow.removeClass(self.defaults.clonShow);
					}
				}
			})
		}
	}

	$.fn.cateTab = function (options) {
		
		return this.each(function () {
			// console.log("waimian:"+options)
		 	new cateTab(options);
		});
		
	}
	$.fn.cateTab.defaults = {
			leftCate:".cate-left",
			rightCate:".cate-right",
			leftTab:"li",
			rightTab:".tab-ul",
			clonCate:".cate-clon",
			clonShow:"show",
			active:".active"
		};
	
})()

/*封装END*/