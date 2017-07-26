$(function(){
	
	//验证账号和密码格式
	function blur1() {
		var p = document.createElement('p');
		var reg = /^1[34578]\d{9}$/;
		$('#username').blur(function() {
			if($('#username').val().length == 11) {
				if(reg.test($('#username').val())) {
					p.className = 'right';
					p.innerHTML = '电话号码输入正确';
				}
			} else {
				p.className = 'error';
				p.innerHTML = '电话号码输入错误';
			}
			$('#user').after(p);
		})
	}
	blur1();
	
	function blur2() {
		var p = document.createElement('p');
		var reg = /^[a-zA-Z]\w{5,19}$/;
		$('#password').blur(function() {

			if($('#password').val().length < 21 && $('#password').val().length > 5) {
				if(reg.test($('#password').val())) {
					p.className = 'right';
					p.innerHTML = '输入正确';
				}
			} else {
				p.className = 'error';
				p.innerHTML = '请输入6-20位密码';
			}
			$('#pass').after(p);
		})
	}
	blur2();
	
	//登录
	var db=openDatabase('stonedb','1.0','text db','1024*1024');
	db.transaction(function(contex){
		contex.executeSql('create table if not exists denglu(id integer primary key AutoIncrement,state)');
	});	
	var oD=document.createElement('em');
	var blogin=true;
	$('#btn').click(function(){
		if ($('p').attr('class')=='right') {
			db.transaction(function(contex){
				contex.executeSql('select*from user',[],function(contex,data){
					var rows=data.rows.length,i;
					for (var i=0;i<rows;i++) {
						if($('#username').val()==data.rows.item(i).name&&$('#password').val()==data.rows.item(i).password){
							blogin=false;
							break;
						}
					}
					if (blogin) {
						oD.innerHTML='请输入正确的账号和密码!';
						oD.className='info';
						$('form').append(oD);
						
					}else{
						db.transaction(function(contex){
							contex.executeSql('insert into denglu(state) values("1")');
							window.location.href='information.html';
						});
						
					}
			
			});
			});
		}else{
			
		}
	});
	
});
