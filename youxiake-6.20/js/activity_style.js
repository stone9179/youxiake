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
	
	
	/*//轮播图
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
	});*/
	
	
	
	//留言板
	
	db.transaction(function(contex){
		contex.executeSql('create table if not exists user(id integer primary key AutoIncrement,name,password)');
	});
	
	if (window.localStorage.getItem('content')) {
		createli();
	};
	
	$('#btn').on('touchstart',function(){
		var loc=window.localStorage;
		if(loc.content){
			loc.content+='/'+$('#text').val();
		}
		else{
			loc.content=$('#text').val();
		}
		
		if ($('#text').val()) {
		$('#text').val('');
		createli();
		}		
	});
	
	function createli(){
			db.transaction(function(contex){
				contex.executeSql('select*from user',[],function(contex,data){
					var row=data.rows.length,i;
					var na=data.rows.item(0).name;
					
					var auser=window.localStorage.getItem('content').split('/');
					
					for (var j= 0;j<auser.length;j++) {
						var li=document.createElement('li');
						var span=document.createElement('span');
						span.innerHTML='<em>'+na+'</em>'+' :';
						li.appendChild(span);
						var i=document.createElement('i');
						i.innerHTML=auser[j];
						li.appendChild(i);
						$('#liuyan').prepend(li);
					}
					
					
				
				});		
			});
		}
	
//		db.transaction(function(contex){
			
			/*contex.executeSql('select*from denglu',[],function(contex,data){
					var n=data.rows.length,i;
					console.log("n="+n)
					if(n>0){*/
						
						/*contex.executeSql('select*from user',[],function(contex,data){
							var row=data.rows.length,i;
							var na=data.rows.item(0).name;
							var tex=window.localStorage.getItem('content');
							
							

							var li=document.createElement('li');
							var span=document.createElement('span');
							
							span.innerHTML='<em>'+na+'</em>'+':';
							
							
							var i=document.createElement('i');
							i.innerHTML=tex;
							
							li.appendChild(span);
							li.appendChild(i);
							$('#liuyan').append(li);
						
						})
						
						
					/*}else{
//						window.location.href='denglu.html';
						alert(111)
					}*/
					
//			});
		
		
		
		
		
		
		
		
//	});
	
	
	
	
	
	
	
});
