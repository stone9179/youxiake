$(function(){
/*
 * 头部
 */
//	点击home
	var db=openDatabase('stonedb','1.0','text db','1024*1024');
	db.transaction(function(contex){
		contex.executeSql('create table if not exists denglu(id integer primary key AutoIncrement,state)');
	});
	$('.home').on('touchstart',function(){
		db.transaction(function(contex){
			
			contex.executeSql('select*from denglu',[],function(contex,data){
					var n=data.rows.length,i;
					console.log("n="+n)
					if(n>0){
						window.location.href='information.html';
					}else{
						window.location.href='denglu.html';
					}
					/*console.log(rows)
					for (var k=0;k<rows;k++) {
						alert(1111)
						if (data.rows.item(k).state) {
							window.location.href='information.html';
						}else{
							window.location.href='zhuce.html';
						}
						window.location.href='zhuce.html';
					}*/
//					window.location.href='zhuce.html';
			});
		});
	});
	
//	后退
	$('#back').click(function(){
		window.history.go(-1);
	});
	
	/*
	 * 轮播图
	 */
	var liwidth=$('#picture li').width();
	var n;
	var luleft;
	var timer=setInterval(function(){
		luleft=$('#picture').offset().left;
		n=-(luleft/-liwidth+1);
		var le=n*liwidth;
		if (le==-$('#picture').width()) {
			le=0;
			n=0;
		}
		$('#picture').animate({left:le},'slow');
		$('.nav-bot li').removeClass('active');
		$('.nav-bot li').eq(-n).addClass('active');
	},1000);
	
	//拖拽
	var inow=0;
	$('#picture').on('touchstart',function(e){
		clearInterval(timer);
		e=e.originalEvent.targetTouches[0];
		var dix=e.pageX-this.offsetLeft;
	
		$('#picture').on('touchmove',function(e){
			e=e.originalEvent.targetTouches[0];
			var dix1=e.pageX-dix;
			$('#picture').css('left',dix1);
		});
		
		$('#picture').on('touchend',function(){
			var dix3=$('#picture').offset().left;
			inow=Math.round(dix3/liwidth);
			var le=inow*liwidth;
			$('.nav-bot li').removeClass('active');
			$('.nav-bot li').eq(-inow).addClass('active');
			$('#picture').css({'left':le});
			if (this.offsetLeft>0) {
				$('#picture').css({'left':0});
			}	
			if (this.offsetLeft<$('.carousel').width()-this.offsetWidth) {
				$('#picture').css({'left':$('.carousel').width()-this.offsetWidth});
			}
		});
	});
	
	/*
	 * 内容导航
	 */
	var nliwidth=0;
	var lileft=0;
	for (var i=0;i< $('nav ul li').length;i++) {
		nliwidth+=$('nav ul li').eq(i).outerWidth();
		
			$('nav ul li').eq(i).on('touchstart',function(){
				$('nav ul li').children('a').css({'color':'#000','borderColor':'transparent'});
				var a=$('nav ul li').index(this);
				console.log(a)
				if (a==$('nav ul li').length-1) {
					$('nav ul').animate({'left':0},'100');
					$('nav ul li').eq(0).children('a').css({'color':'#FBC000','borderColor':'#fbc000'});
				}
				else{
					lileft=$(this).offset().left-$('nav ul').offset().left;
					
					$('nav ul').animate({'left':-lileft},'100');
					$(this).children('a').css({'color':'#FBC000','borderColor':'#fbc000'});
				}
				
			});
		
	}
	$('nav ul').width(nliwidth);
	//置顶
	var sa=$('nav').offset().top;
	$(window).scroll(function(){
		if($(window).scrollTop()>sa){
			$('nav').css({'position':'fixed','top':'0','left':0});
		}else{
			$('nav').css({'position':''});
		};
		if($(window).scrollTop()>sa){
			$('.totop').css({'position':'fixed','display':'block'});
		}else{
			$('.totop').css({'position':'','display':'none'});
		};
	});
	//回到顶部
	$('.totop').click(function(){
		$(window).scrollTop(0);
	});
	
	
	
	
})
