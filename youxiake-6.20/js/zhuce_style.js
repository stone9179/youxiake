$(function() {
	//验证码
	$('#yzm').click(function() {
		var a = '';
		for(var i = 0; i < 4; i++) {
			a += parseInt(Math.random() * 10);

		}
		$('#yzm').html(a);
	});

	//密码可视
	var bt = true;
	$('#password').click(function() {
		if(bt) {
			$('#password').css({
				'background': 'url(img/zc-5.png) no-repeat 0 center',
				'backgroundSize': 'contain'
			});
			$('.password input').attr('type', 'text');
			bt = false;
		} else {
			$('#password').css({
				'background': 'url(img/zc-4.png) no-repeat 0 center',
				'backgroundSize': 'contain'
			});
			$('.password input').attr('type', 'password');
			bt = true;
		}
	});

	//正则表达验证
	function blur1() {
		var p = document.createElement('p');
		var reg = /^1[34578]\d{9}$/;
		$('.username input').blur(function() {

			if($('.username input').val().length == 11) {
				if(reg.test($('.username input').val())) {
					p.className = 'right';
					p.innerHTML = '电话号码输入正确';

				}
			} else {
				p.className = 'error';
				p.innerHTML = '电话号码输入错误';
			}
			$('.username').after(p);
		})
	}
	blur1();

	function on() {
		var p = document.createElement('p');
		$('.yanzhengma input').blur(function() {

			if($('.yanzhengma input').val() == parseInt($('#yzm').html())) {
				p.className = 'right';
				p.innerHTML = '验证码输入正确';

			} else {
				p.className = 'error';
				p.innerHTML = '验证码输入错误';
			}
			$('.yanzhengma').after(p);
		})
	}
	on();

	function blur2() {
		var p = document.createElement('p');
		var reg = /^[a-zA-Z]\w{5,19}$/;
		$('.password input').blur(function() {

			if($('.password input').val().length < 21 && $('.password input').val().length > 5) {
				if(reg.test($('.password input').val())) {
					p.className = 'right';
					p.innerHTML = '输入正确';
				}
			} else {
				p.className = 'error';
				p.innerHTML = '请输入6-20位密码';
			}
			$('.password').after(p);
		})
	}
	blur2();
	
	//注册
	var db=openDatabase('stonedb','1.0','text db','1024*1024');
	db.transaction(function(contex){
		contex.executeSql('create table if not exists user(id integer primary key AutoIncrement,name,password)');
		contex.executeSql('create table if not exists denglu(id integer primary key AutoIncrement,state)');
	});
	
	
	var oD=document.createElement('em');
	$('#btn').click(function(){
		console.log($('p').attr('class'))
		if ($('p').attr('class')=='right') {
			db.transaction(function(contex){
				contex.executeSql('select*from user where name="'+$('.username input').val()+'"',[],function(contex,data){
					var rows=data.rows.length,i;
					if(rows==0){
						contex.executeSql('insert into user(name,password) values("'+$('.username input').val()+'","'+$('.password input').val()+'")');
						db.transaction(function(contex){
							contex.executeSql('insert into denglu(state) values("1")');
							window.location.href='zhuce2.html';
						});
					}else{
						oD.innerHTML='该手机号已被注册!';
						oD.className='info';
						$('form').append(oD);
						$('.username input').val('');
						$('.password input').val('');
					}
				});
			});
		}else{
			oD.innerHTML='请填写正确后再提交!';
			oD.className='info';
			$('form').append(oD);
			$('.username input').val('');
			$('.password input').val('');
		}
	});
	
	
	
	
	
	
	
});