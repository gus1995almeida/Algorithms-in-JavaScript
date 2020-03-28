class HttpRequest{

	static get(url,params = {}){
		return HttpRequest.request('get',url,params);
	}

	static post(url,params = {}){
		return HttpRequest.request('post',url,params);
	}

	static put(url,params = {}){
		return HttpRequest.request('put',url,params);
	}

	static delete(url,params = {}){
		return HttpRequest.request('delete',url,params);
	}

	static request(method,url,params = {}){

		return new Promise((resolve,reject)=>{
			let ajax = new XMLHttpRequest();

	        ajax.open(method.toUpperCase(),url);

	        ajax.onerror = event=>{
	        	reject(e);
	        };

	        ajax.onload = event=>{

	            let obj = {};

	            try{
	                obj = JSON.parse(ajax.responseText);
	                resolve(obj);
	            }catch(e){
	            	console.error(e);
	                reject(e);
	            }

	        };

	        ajax.send();
		});
		
	}
}