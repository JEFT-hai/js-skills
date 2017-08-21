(function($){
	function PreLoad(imgs, options){
		this.imgs = (typeof imgs === 'string') ? [imgs]:imgs;
		this.opts = $.extend({},PreLoad.DEFAULTS,options);

		if(this.opts.order === 'ordered'){
			this._ordered();
		}else{
			this._unordered();
		}

		this._unordered();
	}

	PreLoad.DEFAULTS = {
		order: 'unordered',//无序预加载
		each: null, //每张图片加载完成后执行
		all: null // 所有图片加载完毕后执行
	}

	PreLoad.prototype._ordered = function(){
		var imgs = this.imgs,
		    opts = this.opts,
		    count = 0,
		    len = imgs.length;

		load();

      function load(){
    	var imgObj = new Image();

    	$(imgObj).on('load error',function(){
    		opts.each && opts.each(count);

    		if(count < len){
    			load();
    		}else{
    			//所有
    			opts.all && opts.all();
    		}

    		count++;
    	});

    	imgObj.src = imgs[count];
      }
	}

	PreLoad.prototype._unordered = function(){//无序加载
		var imgs = this.imgs,
		    opts = this.opts,
		    count = 0,
		    len = imgs.length;


		$.each(imgs,function(i,src){
			if(typeof src != 'string') return;

    	var imgObj = new Image();

    	$(imgObj).on('load error',function(){
    		opts.each && opts.each(count);

    		if(count >= (len -1)){
    			opts.all && opts.all();
    		}

    		count++;
    	});

    	imgObj.src = src;
    })
	};

	// $.fn.extend -> $('#img').preload()
	// $.extend -> $.preload();

	$.extend({
		preload:function(imgs,opts){
		   	new PreLoad(imgs, opts);
		}
	});
	 
})(jQuery);