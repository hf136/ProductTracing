
/***
*读取指定的Cookie值
*@param {string} cookieName Cookie名称
*/ 
var random = false;
currentPage={};

function ReadCookie(cookieName) {
    var theCookie = "" + document.cookie;
    var ind = theCookie.indexOf(cookieName);
    if(ind==-1 || cookieName=="") return "";
    var ind1 = theCookie.indexOf(';',ind);
    if(ind1==-1) ind1 = theCookie.length;
    /*读取Cookie值*/
    return unescape(theCookie.substring(ind+cookieName.length+1,ind1));
}

currentPage.SendPost  = function(postData)  {
     var curUrl;
     if( postData['tag'] == "light industry")
         curUrl = url  + "lightProduct";
    else curUrl  = url + "merchant";


       $.ajax({
           //提交数据的类型 POST GET
           type:"POST",
           //提交的网址
           url:curUrl,
           //提交的数据
           data:postData,
          contentType:'application/x-www-form-urlencoded; charset=UTF-8',
           //返回数据的格式
           datatype: 'json',//"xml", "html", "script", "json", "jsonp", "text".
     
           //成功返回之后调用的函数             
           success:function(data){
            var recommendProduct = data;
               $("#Merchants").empty();
       

    
                
               if(('merchant' in data[0])){

                  for(var i=0; i<recommendProduct.length; i++){ 
                    recp="<p>Components:";

              for(var x =0 ; x < recommendProduct[i]['components'].length; x++)
                    if(x == 0)
                 recp += recommendProduct[i]['components'][x]['componentName'];
             else recp += "," + recommendProduct[i]['components'][x]['componentName'];




                     recp +=  "</p><p>Merchant: " +  recommendProduct[i]['merchant']['merchantName'] + "</p>";
                        recp +="<p>Address: " +  recommendProduct[i]['merchant']['address'] + "</p>";
                    $( "<div class='order-top' ><li class='im-g'><a href=''><img src='" + url + "imgUpload/" + data[i]['product']['picture'] + "'class='img-responsive' alt=''></a></li><li class='data'><h4>" +  data[i]['product']['productName'] +"</h4>" + recp + "</li><div class='clearfix'></div></div>").appendTo($("#Merchants")); 
    //$("<p>地址：" +  recommendProduct[i]['shop'] + "</p>").appendTo($("#Items")); 

  
  }
                    
                   
                   return;
                   
               }
                
               
             
            
          
                for(var i=0; i<data.length; i++){
                
                  
   
                //  alert("共推荐产品:" + recommendProduct.length);
                 var recp = "<p>recommend: ";
            
                    for(var j = 0; j < data[i]['products'].length; j++)
                        if(j != 0)
                        recp += ",<a href=" + url + "product/" +  data[i]['products'][j]['productID'] + ">" +    data[i]['products'][j]['productName'] + "</a>" ;
                        else 
                            recp += "<a href=" + url + "product/" +  data[i]['products'][j]['productID'] + ">" +    data[i]['products'][j]['productName'] + "</a>" ;
                       recp += "</p>";
                       recp +=  "<p>rate: " +  data[i]['rating'] + "</p>";
                        recp +="<p>price: " +  data[i]['price'] + "</p>";
                      recp += "<p>distance: " +  data[i]['positionX'].toFixed(2) + "km</p>";
                       recp +="<p>address: " +  data[i]['address'] + "</p>";
                      



                    $( "<div class='order-top' ><li class='im-g'><a href=''><img src='" + url + "imgUpload/" + data[i]['picture'] + "'class='img-responsive' alt=''></a></li><li class='data'><h4>" +  data[i]['merchantName'] +"</h4>" + recp + "</li><div class='clearfix'></div></div>").appendTo($("#Merchants")); 
                  //  $("<li class='bt-nn'><a class='morebtn hvr-rectangle-in' href='orders.html'>Explore</a></li>").appendTo($("#Merchants")); 

                   // $("<p>评分: " +  data[i]['rating'] + "</p>").appendTo($("#Merchants")); 
                  //  $("<p>人均价格: " +  data[i]['price'] + "</p>").appendTo($("#Merchants")); 
                 //   $("<p>地址: " +  data[i]['address'] + "</p>").appendTo($("#Merchants")); 
                   
                  //  $("<p>距离: " +  data[i]['positionX'].toFixed(2) + "km</p>").appendTo($("#Merchants")); 
                    //if(recommendProduct[i]['shop'] != 'local')
                    //$("<p>地址：" +  recommendProduct[i]['shop'] + "</p>").appendTo($("#Items")); 

                    

                     
                }
                
           }   
   
        });


}

$(function() {
	
    var tag = ReadCookie('tag');
    /*
        if(tag == "Thailand")
        tag = "Thailand泰国菜";
    else if(tag == "Korea")
        tag = "韩国菜";
    else if(tag =="Middle East" )
        tag = "中东料理";
    else if(tag == "Russia" )
        tag = "俄罗斯菜";
    else if(tag == "France")
        tag = "法国菜";
    else if(tag == "Sichuan")
        tag = "川菜";
    else if(tag == "Hunan")
        tag = "湘菜";
    else if(tag == "Guangzhou")
        tag = "粤菜";
    else if(tag == "Dongbei")
        tag = "东北菜";
    else if(tag == "Jiangzhe")
        tag = "江浙菜";
    else if(tag == "light industry")
        tag = "轻工";
*/


		var postData = {};
    if(ReadCookie('isPrice') == "true"){
		postData['priceLow'] = ReadCookie('priceLow');
		postData['priceHigh'] = ReadCookie('priceHigh');
  }
  if(ReadCookie('isCategory') == "true")
		postData['tag'] = tag;
  if(ReadCookie('neighbor') == "true"){
	  postData['positionX'] = ReadCookie('positionX');
	   postData['positionY'] = ReadCookie('positionY');
	
      
  }
		currentPage.SendPost(postData);
	
});
