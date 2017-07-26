$(function(){
	$('#back').click(function(){
		window.history.go(-1);
	});
	
	
	//退出登录
	var db=openDatabase('stonedb','1.0','text db','1024*1024');
	$('#out').on('touchstart',function(){
		db.transaction(function(contex){
			contex.executeSql('delete from denglu where state="1"');
		});
		window.location.href='index.html';
//		window.location.replace('index.html')
	});
	
	
	
});
