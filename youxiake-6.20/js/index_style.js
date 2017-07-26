$(function() {
	//顶部广告
	$('#close').click(function() {
		$('.ad-top').css('display', 'none');
	});

	//轮播图
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
	
//	拖拽
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

	
	//搜索
	$('.search').on('touchstart',function(){
		$('.search s').css('display','inline-block');
		$('.search s').click(function(){
			$('.search input').eq(0).val("");
			$('.search s').css('display','none');
		});
	});
	
	$('#username').on('input',function(){
		$.ajax({
			type:"get",
			url:"http://app.lulutrip.com/search/searchDataReturn",
			async:true,
			dataType:"json",
//			jsonp:"callback",
			data:{"words":$('#username').val()},
			success:function(str){
				console.log(str.data);
				for(var i=0;i<$('#list li').size();i++){
					$('#list li').remove();
				}
				
				for(var i=0;i<str.data.length;i++){
					var li = '<li> <a href="http://app.lulutrip.com/search/searchDataReturn?words='+str.data[i]+'">'+str.data[i].cnn+'</a>  </li>';
					
					$('#list').append(li);
				}
			}
		});
//		if($('#username').val()==''){
//			for(var i=0;i<$('#list li').size();i++){
//				$('#list li').remove();
//			}
//		}
	});
	
	var hand=setInterval(function(){
		if($('#username').val()==''){
			for(var i=0;i<$('#list li').size();i++){
				$('#list li').remove();
			}
		}
	},100);
	
	
	
	//活动轮播图
	var oUl=document.querySelector('.activity ul');
	oUl.innerHTML+=oUl.innerHTML;
	var liheight=$('.activity ul li').height();
	var handler=setInterval(function(){
		if (oUl.offsetTop==-2*liheight) {
			$('.activity ul').css('top',0);
		}
		$('.activity ul').animate({top:oUl.offsetTop-liheight},'slow');
	},1000);
	
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
	
	
	
	
	//节目推荐
	var inow=0;
	var liwidth1=$('#bottom ul').width();
	$('#bottom ul').on('touchstart',function(e){
		e=e.originalEvent.targetTouches[0];
		var dix=e.pageX-this.offsetLeft;
		
		$('#bottom ul').on('touchmove',function(e){
			e=e.originalEvent.targetTouches[0];
			var dix1=e.pageX-dix;
			$('#bottom ul').css('left',dix1);
		});
		
		$('#bottom ul').on('touchend',function(){
			var dix3=$('#bottom ul').offset().left;
			inow=dix3/liwidth1;
			var le=inow*liwidth1;
			$('#bottom ul').css({'left':le});
			if (this.offsetLeft>0) {
				$('#bottom ul').css({'left':0});
			}	
			if (this.offsetLeft<$('#bottom').width()-this.offsetWidth) {
				$('#bottom ul').css({'left':$('#bottom').width()-this.offsetWidth});
			}	
		});
	});
	
	var date=new Date();
	var month=date.getMonth();
	$('#bottom ul li').eq(month).children('a').css({'background':'#fac000','color':'#fff'});
	
	//目的地精选
	//置顶效果
	var sa=$('.sticky').offset().top;
	$(window).scroll(function(){
		if($(window).scrollTop()>sa){
			$('.sticky').css({'position':'fixed','top':'0','left':0});
		}else{
			$('.sticky').css({'position':''});
		};
		if($(window).scrollTop()>sa){
			$('.totop').css({'position':'fixed','display':'block'});
		}else{
			$('.totop').css({'position':'','display':'none'});
		};
	});
	
	//选项卡
	$('.sticky .top li').click(function(){
		$('.chose .content ul').css('display','none');
		var ind=$('.sticky .top li').index(this);
		$('.sticky .navigate .travel li').removeClass('hot');
		$('.sticky .navigate .travel').eq(ind).children('li').eq(0).addClass('hot');	
		$('.sticky .top li').children('a').removeClass('chosed');
		$(this).children('a').addClass('chosed');
		$('.sticky .navigate .travel').css('display','none');
		$('.sticky .navigate .travel').eq(ind).css('display','block');
		$('.chose .content .hot').css('display','none');
		$('.chose .content .hot').eq(ind).css('display','block');
		travel();
	});
	
	travel();
    function travel(){
		$('#travel1 li').click(function(){
			$(this).siblings().removeClass('hot');
			$(this).addClass('hot');
			var ind1=$('#travel1 li').index(this);
			$('.chose .content .travel1 ul').css('display','none');
			$('.chose .content .travel1 ul').eq(ind1).css('display','block');	
		});
		
		$('#travel2 li').click(function(){
			$(this).siblings().removeClass('hot');
			$(this).addClass('hot');
			var ind2=$('#travel2 li').index(this);
			$('.chose .content .travel2 ul').css('display','none');
			$('.chose .content .travel2 ul').eq(ind2).css('display','block');	
		});
		
		$('#travel3 li').click(function(){
			$(this).siblings().removeClass('hot');
			$(this).addClass('hot');
			var ind3=$('#travel3 li').index(this);
			$('.chose .content .travel3 ul').css('display','none');
			$('.chose .content .travel3 ul').eq(ind3).css('display','block');	
		});
	}
    
//  悬浮电话和回顶部
	
	$('.totop').click(function(){
		$(window).scrollTop(0);
	});
	





});









