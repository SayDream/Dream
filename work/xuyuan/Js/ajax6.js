//版权 北京智能社©, 保留所有权利
//url,data,type,timeout,success,error
function ajax(options){
	//整理options
	options = options || {};
	options.data = options.data || {};
	options.type = options.type || 'get';
	options.timeout = options.timeout || 0;//0永远等下去
	
	//整理data
	options.data.t=Math.random();
	var arr=[];
	for(var key in options.data){
		arr.push(key+'='+encodeURIComponent(options.data[key]));
	}
	var str=arr.join('&');
	
	//创建ajax对象 
	if(window.XMLHttpRequest){
		var oAjax=new XMLHttpRequest();
	}else{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}
	//根据type提交方式
	if(options.type=='get'){
		oAjax.open('get',options.url+'?'+str,true);//建立
		oAjax.send();//发送	
	}else{
		oAjax.open('post',options.url,true);// 创建连接
		//设置请求头
		oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		oAjax.send(str);//发送	
	}
	//超时
	if(options.timeout){
		var timer=setTimeout(function(){
			alert('超时了');	
			//阻止ajax操作
			oAjax.abort();//中断ajax加载
		},options.timeout);	
	}
	
	//监听状态
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			clearInterval(timer);
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
				
				options.success && options.success(oAjax.responseText);
					
			}else{
				options.error && options.error(oAjax.status);
			}
		}
	};
}
