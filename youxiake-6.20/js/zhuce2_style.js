$(function(){
	//sex
	$('em').click(function(){
		$('em').css({'borderColor':'transparent','color':'#666'});
		$(this).css({'borderColor':'#fbc000','color':'#fbc000'});
	});
	
	//常驻地效果
	$('#place').click(function(){
		$(this).val('广州  天河区').attr('readonly','true');
		$('.address').animate({bottom:0},'slow');
	});
	
	$('.address header a').click(function(){
		var height=$('.address').height();
		$('.address').animate({bottom:-height},'slow');
	})
	
	//sign in 验证
	var db=openDatabase('mydb2','1.0','text db','1024*1024');
	db.transaction(function(contex){
		contex.executeSql('create table if not exists userName(id integer primary key AutoIncrement,username)');
	});
	
	var p=document.createElement('p');
	
	$('#btn').click(function(){
		if ($('#name').val()&&$('#place').val()) {
			db.transaction(function(contex){
				contex.executeSql('select*from userName where username="'+$('#name').val()+'"',[],function(contex,data){
					var rows=data.rows.length,i;
					if (rows==0) {
						contex.executeSql('insert into userName(username) values("'+$('#name').val()+'")');
						window.location.href="information.html";
					}else{
						p.innerHTML='该昵称已被注册';
						p.className='info';
						$('#span').append(p);
					}
				});
			});
		} else{
			p.innerHTML='请将信息填写完整';
			p.className='info';
			$('#span').append(p);
		}
	});
	
	
	
	
	
	
	
});