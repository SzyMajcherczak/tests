/* 
picoAjax: Biblioteka Ajax/JavaScript
------------------------------------------
@@ WWW: http://picoajax.tk
@@ Ostatnia aktualizacja: 4.09.2016 (v2.5)
@@ Licencja: skrypt jest bezpłatny do zastosowań prywatnych jak i komercyjnych (Free For All)
@@ Copyright 2011-2016, Robert J. Kurek
------------------------------------------
NIE usuwaj tego komentarza! (Do NOT remove this comment!)
*/

/*stałe predefiniowane */
  var __picoVer=2.5;
  var __picoAsync=true;
/*--------------------*/
function picoLoad(url,id,k,efekt,loader) {

if(url===undefined || url.trim() =='') {alert("picoAjax\nError: Nie podano źródła danych...");return(false)};  

var roz1=url.toLowerCase().substring(url.length,url.length-3);
var roz2=url.toLowerCase().substring(url.length,url.length-4);
var roz3=url.toLowerCase().substring(url.length,url.length-5);

if ( roz2 =='.jpg' || roz2=='.png' || roz2=='.gif' || roz2=='.bmp' || roz3 =='.jpeg'){
_picoImg(url,id,k,efekt);
} else {


if( roz1 =='.js'){
_picoLoadJS(url);
}

else if (roz2 =='.css'){
_picoLoadCSS(url);
} 

else if (roz2 =='.mp3'){
picoMP3(url,id);
} 

else if (roz2 =='.mp4'){
picoMP4(url,id);
} 


if (window.XMLHttpRequest) { 
  // IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
  
else { // IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
 
 
xmlhttp.onreadystatechange=function() {
   //xmlhttp.overrideMimeType('text/html; charset=ISO-8859-2');
   if (xmlhttp.readyState==4 && xmlhttp.status==404) {
   document.getElementById(id).innerHTML='Brak pliku: <b>'+url+'</b>';
      }
	  
	  
   if (loader!=undefined && loader==true){
	if (xmlhttp.readyState == 1) {
	// document.getElementById(id).innerHTML='Wczytywanie danych...';
    document.getElementById(id).innerHTML='<img title="Ładowanie..." src="ajax-loader.gif" alt="" />';
  }
}
	
	if (xmlhttp.readyState==4 && xmlhttp.status==200) {
	// document.getElementById(id).value=xmlhttp.responseText;
	 

// js script
if (id) {
var divId = document.getElementById(id);
divId.innerHTML=xmlhttp.responseText;

var s = divId.getElementsByTagName("script");
for( var i=0;i<s.length;i++){
var js = document.createElement("script");
js.type="text/javascript";
js.text=s[i].text;
document.getElementsByTagName("head")[0].appendChild(js);
 }
}

	if (efekt!=undefined){ 
	if (efekt==1) { 
	_picoFade2(id,0)
	}
	else if (efekt==2) {
	picoShake(id,0)
	}
}	 
	
	    if (k!=undefined && k!='') {
         document.getElementById(id).className=k;
     
    }
		
//  XML 
    if( url.toLowerCase().indexOf('.xml') !=-1)  {var xml = xmlhttp.responseXML; myXML(xml,id)}
	
  // JSON
   if( url.toLowerCase().indexOf('.json') !=-1) {var tab= JSON.parse(xmlhttp.responseText); myJSON(tab,id)}
      }
    }

//xmlhttp.open("GET",url,false);

if(id) {
document.getElementById(id).style.display='';
document.getElementById(id).style.opacity=1;
}

xmlhttp.open("GET",url,__picoAsync);
//xmlhttp.setRequestHeader( "If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT" );
xmlhttp.send(null);
  } 
 }

 // picoForm - formularze
function picoForm(url,id,k,t,s) {

if (window.XMLHttpRequest) { 
  // IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
  
else { // IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
 
xmlhttp.onreadystatechange=function() {
   //xmlhttp.overrideMimeType('text/html; charset=ISO-8859-2');
   if (xmlhttp.readyState==4 && xmlhttp.status==404) {
   document.getElementById(id).innerHTML='Brak pliku: <b>'+url+'</b>';
    }
	
	if (xmlhttp.readyState==1) {
	// document.getElementById(id).innerHTML='Wczytywanie danych...';
    document.getElementById(id).innerHTML='<img alt="" title="Ładowanie..." src="ajax-loader.gif" />';
    }
	
	
	if (xmlhttp.readyState==4 && xmlhttp.status==200) {
	// document.getElementById(id).value=xmlhttp.responseText;
	
// js script
var divId = document.getElementById(id);
divId.innerHTML=xmlhttp.responseText;
var s = divId.getElementsByTagName("script");
for(var i=0;i<s.length;i++){
var js = document.createElement("script");
js.type="text/javascript";
document.getElementsByTagName("head")[0].appendChild(js);
js.text=s[i].text;
}
	
      }
    }
	
 if (k!=undefined && k!='') {document.getElementById(id).className=k;}	
	
//Spr. pól formularza	
  if (s==true) {
  
for ( var i=0; i<t.length; i++) {

// Tel
   if (document.getElementById(t[i]).value.trim() !='' && document.getElementById(t[i]).getAttribute("rel")=='tel') {
     if (document.getElementById(t[i]).value.length<9 || !parseInt(document.getElementById(t[i]).value) ) {
	alert('Numer telefonu wydaje się być niepoprawny!');
	document.getElementById(t[i]).focus();
	document.getElementById(t[i]).select();
     return false;
	}
  }


//Mail

   if (document.getElementById(t[i]).value.trim() !='' && document.getElementById(t[i]).getAttribute("rel")=='mail') {
     var mail_wzor =/^(.+?)@(([a-z0-9\.-]+?)\.[a-z]{2,5})$/i;
     if (mail_wzor.test(document.getElementById(t[i]).value) == false) {
	alert('Adres e-mail wydaje się być niepoprawny!');
	document.getElementById(t[i]).focus();
	document.getElementById(t[i]).select();
     return false;
	}
  }

//PESEL
  if (document.getElementById(t[i]).value.trim() !='' && document.getElementById(t[i]).getAttribute("rel")=='pesel') {
var pesel=document.getElementById(t[i]).value;
var wagi = new Array(1,3,7,9,1,3,7,9,1,3,1); 
var cKon=0; 

 bug0='22222222222';
 bug1='44444444444';
 bug2='66666666666';
 bug3='88888888888';

for( var j=0; j<=10; j++){ cKon += wagi[j]*parseInt(pesel.charAt(j));} 
if( pesel.split()==bug0 || pesel.split()==bug1 || pesel.split()==bug2 || pesel.split()==bug3 || pesel.split("").length<11 || pesel.split("").length>11 || parseInt(cKon%10)!=0 ){ 
alert("PESEL wydaje się być niepoprawny!"); 
document.getElementById(t[i]).focus();
document.getElementById(t[i]).select();
return false;
  }  
 } 
  
  
// NIP
  if (document.getElementById(t[i]).value.trim() !='' && document.getElementById(t[i]).getAttribute("rel")=='nip') {
var nip=document.getElementById(t[i]).value;

nip+='';
nip=nip.replace(/[^0-9[aA-zZ]+/g,''); 

var nSum=0;
nSum+=parseInt(nip.charAt(0))*6;
nSum+=parseInt(nip.charAt(1))*5;
nSum+=parseInt(nip.charAt(2))*7;
nSum+=parseInt(nip.charAt(3))*2;
nSum+=parseInt(nip.charAt(4))*3;
nSum+=parseInt(nip.charAt(5))*4;
nSum+=parseInt(nip.charAt(6))*5;
nSum+=parseInt(nip.charAt(7))*6;
nSum+=parseInt(nip.charAt(8))*7;
if( nip.length >10 || (nSum%11)!=parseInt(nip.charAt(9)) ) {
alert("NIP wydaje się być niepoprawny!"); 
document.getElementById(t[i]).focus();
document.getElementById(t[i]).select();
return false;
  } 
 }   
  
 
// REGON  9
  if (document.getElementById(t[i]).value.trim() !='' && document.getElementById(t[i]).getAttribute("rel")=='regon') {
var reg=document.getElementById(t[i]).value;
reg+='';
reg=reg.replace(/[^0-9[aA-zZ]+/g,''); 
var rSum=0;
if (reg.length==9) {
rSum+=parseInt(reg.charAt(0))*8;
rSum+=parseInt(reg.charAt(1))*9;
rSum+=parseInt(reg.charAt(2))*2;
rSum+=parseInt(reg.charAt(3))*3;
rSum+=parseInt(reg.charAt(4))*4;
rSum+=parseInt(reg.charAt(5))*5;
rSum+=parseInt(reg.charAt(6))*6;
rSum+=parseInt(reg.charAt(7))*7;
rKon=parseInt(reg.charAt(8));

if (rSum%11==10) rKon=0;

if( rSum%11!=rKon && rSum%11!=10 ) {
alert("REGON wydaje się być niepoprawny!"); 
document.getElementById(t[i]).focus();
document.getElementById(t[i]).select();
return false;
  } 
}

// REGON 14
else if (reg.length==14){
rSum+=parseInt(reg.charAt(0))*2;
rSum+=parseInt(reg.charAt(1))*4;
rSum+=parseInt(reg.charAt(2))*8;
rSum+=parseInt(reg.charAt(3))*5;
rSum+=parseInt(reg.charAt(4))*0;
rSum+=parseInt(reg.charAt(5))*9;
rSum+=parseInt(reg.charAt(6))*7;
rSum+=parseInt(reg.charAt(7))*3;
rSum+=parseInt(reg.charAt(8))*6;
rSum+=parseInt(reg.charAt(9))*1;
rSum+=parseInt(reg.charAt(10))*2;
rSum+=parseInt(reg.charAt(11))*4;
rSum+=parseInt(reg.charAt(12))*8;
rKon=parseInt(reg.charAt(13));

if( (rSum%11)!=rKon ) {
alert("REGON wydaje się być niepoprawny!"); 
document.getElementById(t[i]).focus();
document.getElementById(t[i]).select();
return false;
  } 
 } 

else {
alert("REGON wydaje się być niepoprawny!"); 
document.getElementById(t[i]).focus();
document.getElementById(t[i]).select();
return false;
  } 
}   
 

 if (document.getElementById(t[i]) && document.getElementById(t[i]).value.trim() =='' && document.getElementById(t[i]).getAttribute("rel")!='no'){
 alert('Proszę wypełnić pole formularza.');
 document.getElementById(t[i]).focus();
 // document.getElementById(t[i]).style.border='1px solid red';
 return false;
    }
  }	
}	

for (var k=0; k<t.length; k++) {
 if (document.getElementById(t[k])) {
if (k<1) {
z=t[0]+'='+document.getElementById(t[0]).value;
}
else {
z+='&'+t[k]+'='+document.getElementById(t[k]).value;
   }
 }
}
xmlhttp.open("POST",url,__picoAsync);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send(z)
}

/* Dodatkowe picoFunkcje */

// print id/class
 function picoPrint(ic) {
if (ic) {
var head = document.getElementsByTagName('head')[0];
druk=document.createElement('style');
druk.setAttribute('media','print'); 
head.appendChild(druk);
druk.appendChild(document.createTextNode('body{visibility:hidden}'+ic+'{visibility:visible;position:fixed;left:0;top:0}'));
window.print()} else window.print();	
}

function picoRefresh(){window.location.reload(true)}
function picoGo(url) {window.location.href=url};
function picoBg(k) {document.body.className=k;}
function picoSize(id,c) {document.getElementById(id).style.fontSize=c+'px';}

function picoIE() {
if (document.documentMode<11) {
alert('Uwaga!\n\nTwoja przeglądarka internetowa lub wersja przeglądarki nie jest obsługiwana bądź jest obsługiwana jedynie częściowo.\n\nZalecane przeglądarki to: Microsoft Edge, Firefox (48+), Opera (39+), Chrome (52+)');
 }
}

function picoErr() {
alert('Twoja przeglądarka lub wersja przeglądarki nie obsługuje tej funkcji.');
}

function picoClose(id,s) {
if (s!=undefined && s==true) {
_picoFade1(id,0)}
else document.getElementById(id).style.display ='none'; 
}


function picoIFrame(id,url) {
var r=document.getElementById(id);
if(r) {
r.style.display='';
r.style.opacity=1;
r.style.filter='alpha(opacity=100)';
r.innerHTML='<button id="_bIF999" onmouseover="picoId(\'_bIF999\').style.color=\'red\'" onmouseout="picoId(\'_bIF999\').style.color=\'black\'" title="Zamknij" onclick="picoClose(\''+id+'\',true)">x</button>';
r.innerHTML+='<iframe border="0" frameborder="0" width="100%" height="90%" scrolling="auto" src="'+url+'"></iframe>';
 }
}


function picoRollover(id,k1,k2,t) {
var z=document.getElementById(id);
z.onmouseover=function() {
this.className=k1;
 }
 
z.onmouseout=function() {
this.className=k2;
 }
 
if (t!='') {
//z.title=t;
z.onclick=function() {alert(t)}
 }
}

function picoDivToggle(id,k,s) {

if (document.getElementById(id)) {
document.getElementById(id).className=k;
document.getElementById(id).ondblclick=function() {
this.style.display ='none';
}

if(document.getElementById(id).style.display == 'none'){
if (s!=undefined && s==true) {
_picoFade2(id,0)}
else document.getElementById(id).style.display =''; 
}
else {
if (s!=undefined && s==true) {
_picoFade1(id,0)}
else document.getElementById(id).style.display ='none'; 
  }
 }
 else alert('Id: "'+id+'" - nie istnieje.');
}

function picoWin(url,w,h){
 if (w==undefined && h==undefined) {w=400;h=280}
 myWin = window.open(url, "myWin", "location=1,status=1,scrollbars=1,width="+w+",height="+h+'"');
 myWin.focus();
 //mywindow.moveTo((screen.width-w)/2,150);
}

function picoClock(id,k,sek){
var czas=new Date();
var g=czas.getHours();
var m=czas.getMinutes();
var s=czas.getSeconds();
if (g<10) g='0'+g;
if (m<10) m='0'+m;
if (s<10) s='0'+s;
var gms=g+":"+m+":"+s;
if(s!=undefined && sek==false) {
var gms=g+"<span style='visibility:hidden;'>:</span>"+m;
if (s%2==0) gms=g+":"+m;
}
document.getElementById(id).className=k;
document.getElementById(id).innerHTML=gms;
_tClock=setTimeout(function(){picoClock(id,k,sek)},250);
}


function _picoFade1(id,i) {
var z=document.getElementById(id);
if(z) {
i+=0.2;
z.style.opacity=(1-i);
z.style.filter="alpha(opacity="+(100-i*100)+")";
t1=setTimeout(function(){_picoFade1(id,i)},55);
}
if (i>=1 || i*100>=100) {
z.style.display = 'none';
clearTimeout(t1);
i=0;
 }	
}

function _picoFade2(id,i) {
var z=document.getElementById(id);
if(z) {
z.style.display='';
i+=0.2;
z.style.opacity=i;
z.style.filter="alpha(opacity="+(i*100)+")";
}
t2=setTimeout(function(){_picoFade2(id,i)},50);
if (i>=1 || 100*i>=100) {
clearTimeout(t2);
i=0;
 }			  
}


function picoShake(id,i) {
i++; n=15;
z=document.getElementById(id);
if(z) {
z.style.left=parseInt(1.3*(n-i)*Math.sin(3*i))+'px';
z.style.top= parseInt(0.7*(n-i)*Math.cos(3*i))+'px';	
z.style.position='relative';
}
t3=setTimeout(function(){picoShake(id,i)},50);
		
if (i>=n) {
clearTimeout(t3);
i=0;
 }	
}


function picoFade(id,url) {
var a=0.2;
z=document.getElementById(id);
z.style.opacity=a;
document.getElementById(id).style.filter="alpha(opacity="+(100*a)+")";

function f1(i){
i+=0.2;
document.getElementById(id).style.opacity=i;
document.getElementById(id).style.filter="alpha(opacity="+(100*i)+")";
t1=setTimeout(function() {f1(i)},90);
if (i>=1 ||100*i >=100 ) {
clearTimeout(t1);
i=0;
 }	
}


function f2(i){
i+=0.2;
document.getElementById(id).style.opacity=1-i;
document.getElementById(id).style.filter="alpha(opacity="+(100-100*i)+")";
t2=setTimeout(function() {f2(i)},90);
if ( (1-i)<=a ||(100-100*i) <=100*a) {
document.getElementById(id).style.opacity=a;
document.getElementById(id).style.filter="alpha(opacity="+(100*a)+")";
clearTimeout(t2);
i=0;
 }	
}	  
		  
z.onmouseover=function() {
f1(0);
if(url!=undefined && url!='') {
this.style.cursor='pointer';
this.onclick=function() {
location.href=url;
  }
 }
}

z.onmouseout=function() {
f2(0); clearTimeout(t1);
 }
}


function picoScroll(id,txt,url) {
z1=document.getElementById(id);
n='neon'+Math.random();
z1.innerHTML="<marquee id="+n+">"+txt+"</marquee>";
z2=document.getElementById(n);
if (url!=undefined) {
z2.style.cursor='pointer';
z2.title='Przejdź do strony...';
z2.onclick=function() {location.href=url}
}
z2.onmouseover=function(){this.stop()}
z2.onmouseout=function() {this.start()}
}

function picoTooltip(id,dymekID,fade) {
document.getElementById(id).onmouseover=function() {
document.onmousemove=mouseXY;
if(fade!=undefined && fade==true) {
_picoFade2(dymekID,0)}
else document.getElementById(dymekID).style.display='';
}

document.getElementById(id).onmouseout=function() {
document.onmousemove=null;
if(fade!=undefined && fade==true) {
_picoFade1(dymekID,0)}
else document.getElementById(dymekID).style.display='none';
}

function mouseXY(e) {

if (document.all) {
 pX = event.clientX + document.body.scrollLeft-2;
 pY = event.clientY + document.body.scrollTop+20;
 } else {pX = e.pageX; pY = e.pageY+22;}

if( pX>=(screen.width-parseInt(document.getElementById(dymekID).style.width ))) {
pX-=parseInt(document.getElementById(dymekID).style.width);
}
 document.getElementById(dymekID).style.left = pX+'px';
 document.getElementById(dymekID).style.top = pY+'px';
 }
}

function _picoLoadJS(url) {
var s=document.createElement("script");
s.type="text/javascript";
s.src=url;
//document.body.appendChild(s);
s.async=true;
s.onerror=function() {alert('picoAjax\nError: Nie można załadować pliku: '+url);}
document.getElementsByTagName("head")[0].appendChild(s);
}

function _picoLoadCSS(url) {
var s=document.createElement("link");
s.type="text/css";
s.rel="stylesheet";
s.href=url;
s.onerror=function() {alert('picoAjax\nError: Nie można załadować pliku: '+url);}
document.getElementsByTagName("head")[0].appendChild(s);
}

function picoZebra(id,k) {
var x = document.getElementById(id);
var y = x.getElementsByTagName("tr");
var yy = x.getElementsByTagName("th");
var z= y.length;
var zz= yy.length;


for ( var j=0; j<zz; j++ ) {
yy[j].style.color='#fff';
yy[j].style.background='#666';
}


for (var i=0; i<z; i++) {

if (yy[0]) s=1; else s=0;

if (i%2==s) {

 y[i].style.background='#eaeaea';
 y[i].style.height='25px';
 
 y[i].onmouseover=function() {
 if (k!=undefined)this.style.background=k; 
 else this.style.background='#f4f400';
 }
 
 y[i].onmouseout=function() {
 this.style.background='#eaeaea';
 }
}

else {
 y[i].style.background='#ccc';
 y[i].style.height='25px';
 y[i].onmouseover=function() {
 if (k!=undefined)this.style.background=k; 
 else this.style.background='#f4f400';
 }
 
 y[i].onmouseout=function() {
 this.style.background='#ccc';
   }
  }
 }
}

function picoCancel(t,f) {
if (f==false) {
for (var k=0; k<t.length; k++) {
if (document.getElementById(t[k]).value='') {
  }
 }
}
if (f==true) {
var box = confirm('Czy na pewno chcesz wyczyścić pole(a) formularza?');
if (box) {
for (var k=0; k<t.length; k++) {
document.getElementById(t[k]).value='';
  }
 }
} 
}

function picoClear(id) {
var divID=document.getElementById(id);
if (divID) {
divID.innerHTML='';
divID.removeAttribute("class");
 }
}

function picoRotation(id,n,v,m) {
if (v>0) k=1;
if (v<0) k=-1;
if (v==0||n==0) k=0;
if (n<0 && n!=-1) k=0;
var a=15*k; 
m++;
var div=document.getElementById(id);
div.style.MozTransform+='rotate('+a+'deg)';
div.style.webkitTransform+='rotate('+a+'deg)';
div.style.OTransform+='rotate('+a+'deg)';
div.style.msTransform+='rotate('+a+'deg)';
r=setTimeout(function(){picoRotation(id,n,v,m)},Math.abs(parseInt(150/v)));
if (m==n*24) clearTimeout(r);
}

function picoZoom(id,s,url) {
var z=document.getElementById(id);
z.onmouseover=function() {
if (url!=undefined) {
this.style.cursor='pointer';
//this.style.cursor='zoom-in';
//this.title=url;
this.title='\u00BB';
this.style.zIndex=1;
 }
 
this.style.MozTransform="scale("+s+")";
this.style.webkitTransform="scale("+s+")";
this.style.OTransform="scale("+s+")";
this.style.msTransform="scale("+s+")";
this.style.zIndex=1;
this.onclick=function() {if (url!=undefined) location.href=url}
}

z.onmouseout=function() {
this.style.MozTransform="scale(1.0)";
this.style.webkitTransform="scale(1.0)";
this.style.OTransform="scale(1.0)";
this.style.msTransform="scale(1.0)";
this.style.zIndex=0;
 }
}

function picoTimer(t,url,s,id) {
s++;
if (t>=0) {

var w=parseInt( t+1-s );
if( id !== undefined ) {
var z=document.getElementById(id); 
z.innerHTML=w;
}
_pT=setTimeout(function() {picoTimer(t,url,s,id)},1000)
} else alert('picoAjax\nPodaj t \u22650');

if (w==0) {
if( id!== undefined ) z.innerHTML='';
clearTimeout(_pT);
location.href=url;
 }
}


//Ładowanie grafiki
function _picoImg(p,id,k,e) {

var z = document.createElement("img");
z.id = "loader";
z.title="Ładowanie...";
z.src="ajax-loader.gif";
z.style.display='none';
var div =document.getElementById(id);
div.innerHTML='';
// dla picoClose()
div.style.display='';
div.style.opacity=1;
div.appendChild(z);

var zz = document.createElement("img");
//var uId='foto31415926535';
var uId='foto'+Math.random();
zz.id = uId;
zz.src="";
zz.style.display='none';
zz.style.width='640px';
//zz.style.height='400px';
div.setAttribute("class", k);
div.appendChild(zz);

	var loader = document.getElementById('loader');
	var image = document.getElementById(uId);
	
image.src = p;
loader.style.display='';
image.style.display='none';

if (picoAgent()!='Explorer') {
image.addEventListener('error',img_error);
function img_error() {alert('picoAjax\nError: Nie można wczytać pliku: '+image.src); window.location.reload(true);}
}

image.onload = function(){
  
    image.style.display='';
	loader.style.display='none';
    image.style.cursor='pointer';
	image.style.marginBottom='-4px';
	image.title=image.naturalWidth+" x " +image.naturalHeight;
	image.addEventListener('click', function() {location.href=p});
	
	if (e==1) _picoFade2(uId,false);
	if (e==2)  picoShake(uId, false);
	
  }
}

// Audio .mp3
function picoMP3(src, div) {
var plik = src.substring(src.lastIndexOf('/')+1);
var roz=src.substring(src.length,src.length-4).toLowerCase();
if(roz=='.mp3') {
var ea=document.createElement('audio');
var div=document.getElementById(div);
ea.setAttribute("src", src);
ea.setAttribute("controls", 'controls');
ea.setAttribute("type", "audio/mpeg");
ea.innerHTML='<b style="color:red">HTML5 audio not supported!</b>';
div.appendChild(ea);
  } else alert('Plik: '+ plik + ' nie jest obsługiwany przez picoAjax');
  
    ea.addEventListener('error',a_err);
	
   function a_err() {div.innerHTML='<b style="color:red">Error</b><br>Nie można wczytać pliku: <a target="_blank" href="'+src+'">'+src+'</a>'};;

}


// video .mp4
function picoMP4(src, div, w, h) {
var plik = src.substring(src.lastIndexOf('/')+1);
var roz=src.substring(src.length,src.length-4).toLowerCase();
if(roz=='.mp4') {

var ev=document.createElement('video');
var div=document.getElementById(div);

ev.setAttribute("src", src);
ev.setAttribute("controls", '');
ev.setAttribute("type", "video/mp4");

if(w!=undefined && h!=undefined) {
ev.setAttribute("width", w);
ev.setAttribute("height", h);
} else {
ev.setAttribute("width", "512");
ev.setAttribute("height", "384");
}

ev.innerHTML='<b style="color:red">HTML5 video not supported!</b>';
div.appendChild(ev);
  } else alert('Plik: '+ plik + ' nie jest obsługiwany przez picoAjax');
  
    ev.addEventListener('error',v_err);
    function v_err() {div.innerHTML='<b style="color:red">Error</b><br>Nie można wczytać pliku: <a target="_blank" href="'+src+'">'+src+'</a>'};

}


// SWF - Adobe Flash
function picoSWF(src,div,w,h) {

 var ef=document.createElement('object');
 var div=document.getElementById(div);

	ef.setAttribute("data", src);

if(w!=undefined && h!=undefined) {
	ef.setAttribute("width", w);
	ef.setAttribute("height", h);
	} else {
		
	ef.setAttribute("width", "500");
	ef.setAttribute("height", "310");
}

 div.appendChild(ef);
 
}


// picoUp/Down
/*  old
function picoDown(v) {
window.scrollBy(0,50); 
sd = setTimeout(function() {picoDown(v)},v);  
	window.onscroll = function(ev) {
    //if ( (window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
	if ( (window.innerHeight + window.pageYOffset) >= document.body.scrollHeight) {
        clearTimeout(sd);  
   }
 }
}	
*/
 function picoDown(v) {
	 
   var body = document.body, html = document.documentElement;
   var h = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
	 
   var sY= html.scrollTop || body.scrollTop;
   var Yk=h-(window.innerHeight-v);

   var r=window.requestAnimationFrame(function() {picoDown(v)});
       window.scrollTo (0,sY+(Yk-sY)/v); 

  if(sY>=window.pageYOffset) window.cancelAnimationFrame(r);
	
}


 function picoUp(v) {
   var sY= document.documentElement.scrollTop || document.body.scrollTop;
    if (sY >0) {
	var r=window.requestAnimationFrame(function() {picoUp(v)});
    window.scrollTo (0,sY-Math.ceil(sY/v));
    }
	if(sY<=window.pageYOffset) window.cancelAnimationFrame(r);
}

// Aktualna data/czas oraz d|m|r
function picoDate(f) {
 var d=new Date();
 
 if(f=='y')return d.getFullYear();
 if(f=='m')return d.getMonth()+1;
 if(f=='d')return d.getUTCDate();
return d.toLocaleDateString();
}

//czas oraz g|m|s
function picoTime(f) {
var d=new Date();

if(f=='h') return d.getHours();
if(f=='m') return d.getMinutes();
if(f=='s') return d.getSeconds();

return d.toLocaleTimeString();
}

//data i czas
function picoNow(id) {
var d=new Date();

if(id){
document.getElementById(id).innerHTML=d.toLocaleString();
setTimeout(function() {picoNow(id), 500});
}
return d.toLocaleString();
}


// picoCookie
function picoSetCookie(cn, cv, ced) {

    if (ced =='' || ced=='undefined') {
    document.cookie = cn + "=" + cv;
    } else {
    var d = new Date();
    d.setTime(d.getTime() + (ced*24*60*60*1000));
    var ex = "expires="+ d.toUTCString();
    document.cookie = cn + "=" + cv + "; " + ex;
    }
}

function picoGetCookie(cn) {
    var name = cn + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "null";
}

function picoDelCookie(cn) {
document.cookie = cn+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}

// picoLocalStorage
function picoSetLocalStorage(n,w) {
localStorage.setItem(n,w);
}

function picoGetLocalStorage(n) {
return localStorage.getItem(n);
}

function picoDelLocalStorage(n) {
localStorage.removeItem(n);
}

// picoSessionStorage
function picoSetSessionStorage(n,w) {
sessionStorage.setItem(n,w);
}

function picoGetSessionStorage(n) {
return sessionStorage.getItem(n);
}

function picoDelSessionStorage(n) {
sessionStorage.removeItem(n);
}

//  FullScreen
function picoFullScreen(id) {

var i = document.getElementById(id);

 if (i.requestFullscreen) {
	i.requestFullscreen();
	}
	else if (i.mozRequestFullScreen) {
	i.mozRequestFullScreen();
	} 
	
	else if (i.msRequestFullscreen) {
	i.msRequestFullscreen();
	} 
	
	else if (i.webkitRequestFullScreen) {
	i.webkitRequestFullScreen();
	}
	
}


// exit FullScreen
 function picoExitFullScreen() {
 
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
 }

  // picoGoX i picoGoY - animacja ruchu
  
  function picoGoX(id, Xp, Xk, v, cb) {

  var el = document.getElementById(id);
   
  var krokX=0;
  var id = setInterval(ruch,10);
  var V;
   if (Xk>Xp) V=v;
   if (Xk<Xp) V=-v;
   
	
  function ruch() {
		krokX+=V; 
   el.style.left = krokX+Xp + 'px';
   
    if ( krokX+Xp >=Xk && V>0 ) { el.style.left=Xk; clearInterval(id); if(cb!=undefined); eval(cb)}
    if ( krokX+Xp <=Xk && V<0 ) { el.style.left=Xk; clearInterval(id); if(cb!=undefined); eval(cb)}
  }
}

 
  function picoGoY(id, Yp, Yk, v, cb) {

  var el = document.getElementById(id);
   
  var krokY=0;
  var id = setInterval(ruch,10);
  var V;
  
   if (Yk>Yp) V=v;
   if (Yk<Yp) V=-v;
  
  function ruch() {
		krokY+=V; 
   el.style.top = krokY+Yp + 'px';
    
    if ( krokY+Yp >=Yk && V>0 ) {  el.style.top=Yk; clearInterval(id); if(cb!=undefined); eval(cb)}
    if ( krokY+Yp <=Yk && V<0 ) {  el.style.top=Yk; clearInterval(id); if(cb!=undefined); eval(cb)}
  }
	
}


// Skale temperatur

function picoCK(t) {
if (t >=-273.15) {
return ( Number(t)+273.15).toFixed(2);
 } else return ('Error');
}


function picoKC(T) {
if (T>=0) {
return ( Number(T)-273.15).toFixed(2);
 } else return ('Error');
}

function picoCF(t) {
if (t>=-273.15) {
return ((9/5)*Number(t)+32 ).toFixed(2);
 } else return ('Error');
}

function picoFC(t) {
if (t>=-459.67) {
return ((5/9)*( Number(t)-32)).toFixed(2);
 } else return ('Error');
}

// Wskaźnik BMI
function picoBMI(m,w) {
if ( m>0 && w>0 ) {
return (Number(m/(w*w))).toFixed(2);
 } else return 'Error';
}

// Średnia art.
function picoAVG(c,p) {
var t=c.split(',');
var s=0;
for (var i=0; i<t.length; i++) {
s+=1*t[i];
 }
if(p) return (s/t.length).toFixed(p);
return s/t.length;
}


// Screen resolution 
function picoScreenX() {
var x= window.screen.availWidth;
return x;
}

function picoScreenY() {
var y= window.screen.availHeight;
return y;
}

function picoScreenXY() {
var x= window.screen.availWidth;
var y= window.screen.availHeight;
return x+" x "+y;
}

// User Agent
function picoAgent(f) {
	
if (f == true) return navigator.userAgent;
	

var agent = navigator.userAgent.toLowerCase();

if ( agent.indexOf('mobile')!=-1 || agent.indexOf('Windows Phone')!=-1 || agent.indexOf('android')!=-1 || agent.indexOf('iPhone')!=-1  ) return('Mobile');


var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
if (isOpera) return('Opera');

var isFirefox = typeof InstallTrigger !== 'undefined';
if (isFirefox) return('Firefox');

var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
if (isSafari) return('Safari');

var isIE = /*@cc_on!@*/false || !!document.documentMode;
if (isIE) return('Explorer');

var isEdge = !isIE && !!window.StyleMedia;
if (isEdge) return('Edge');

var isChrome = !!window.chrome && !!window.chrome.webstore;
if (isChrome) return('Chrome');

// Chrome (28+), Opera (15+), Yandex Browser.
var isBlink = (isChrome || isOpera) && !!window.CSS;
if (isBlink) return('Blink');

}

// Zwiń/rozwiń div
function picoDivShow(id,h,v,cb) {
  var el = document.getElementById(id);
  var krok=0;
  var t = setInterval(ruch,15);
  var Xp=0;
  
  function ruch() {
  el.style.display='';
  if (!v) v =15;
    krok+=v; 
    el.style.height = (Xp+krok) + 'px';
    if ( (Xp+krok)>=h ) { 
	el.style.height=h+"px";
	clearInterval(t);
	if (cb) eval(cb);
	}
  }
}


function picoDivHide(id,v,cb) {
  var el = document.getElementById(id);
  var krok=0;
  var Hp= parseInt(el.style.height);
  var t = setInterval(ruch,15);

   if (!v) v =15;
  function ruch() {
   krok+=v; 
   el.style.height = (Hp-krok) + 'px';
   
    if ( (Hp-krok) <=0 ) { 
	el.style.height=0;
	el.style.display='none';
	clearInterval(t);
	if (cb) eval(cb);
	}
  }
}

// Obrazek w oknie Div (GrayBox)
function picoImg(url) {

if(url===undefined || url.trim() =='') {alert("picoAjax\nError: Nie podano źródła obrazu...");return(false)};  

var _i0=document.getElementById('_imgC999');
if (!_i0) { 
var img0=document.createElement('img');
img0.id='_imgC999';
document.body.appendChild(img0); 
}

var img =document.getElementById('_imgC999');

if (img) {img.src=url;}

img.addEventListener('error', img_error);
function img_error() { alert('picoAjax\nError: Nie można wczytać pliku: '+img.src); window.location.reload()}
//function img_error() { alert('picoAjax\nError: Nie można wczytać pliku: '+img.src); return false}
div= document.createElement("div");
div.setAttribute("id", "_imgKurtyna");
div.style.background='#333';
div.style.position='fixed';
div.style.left=0;
div.style.top=0;
div.style.width='100%'
div.style.height='100%'
div.style.overflow='auto';
div.style.zIndex=1000000000;
document.body.appendChild(div); 
d=document.getElementById('_imgKurtyna');
document.body.style.overflow='hidden';


d.innerHTML='<div style="position:absolute;left:50%;top:50%;margin-left:-143px;margin-top:-143px;"><img width="285" alt="" title="Ładowanie..." src= "img-loader.gif" alt=""> </div>';
img.style.display='none';


img.onload = function() {

var w,h,top;
var WH=img.width+' x '+img.height;
 
if ( img.height >=window.screen.availHeight ) {
  h=0; 
  w= -parseInt((img.width/2))+"px";
  top="top:0%";
   } 
  
  else {
 h= -parseInt((img.height/2))+"px";
 w= -parseInt((img.width/2))+"px";
 top="top:50%";
  }
  
d.innerHTML='<div style="position:absolute;left:50%;'+top+';margin-left:'+w+';margin-top:'+h+'"> <img title="'+WH+'" id="_foto999" src= "'+img.src+'"></div>';
d.innerHTML+='<button style="position:fixed; left:0; padding:5px;width:30px" title="Zamknij (Esc)" id="_x999">x</button>';

 _picoFade2('_imgKurtyna',0);
 
  var x=document.getElementById('_x999');
  var y=document.getElementById('_foto999');
  
 
 if(x){
x.addEventListener('click',esc);
x.addEventListener('mouseover', function() {this.style.color='red';   y.style.opacity = 0.7; });
x.addEventListener('mouseout',  function() {this.style.color='black'; y.style.opacity = 1; });
} 
  
  //esc
 document.addEventListener('keyup', function(e) {
if (!e) e = event;
if (e.keyCode == 27) {
 document.body.style.overflow='auto';

if (picoAgent()=='Explorer' ) {
if(d) d.parentNode.removeChild(d);
if (img) img.parentNode.removeChild(img);
} else {d.remove(); img.remove()};
  }
});
} 

  // x
function esc() {
document.body.style.overflow='auto'; 
//d.remove();
d.parentNode.removeChild(d);
//img.remove();
img.parentNode.removeChild(img); //IE
}

}

//Silnia
function picoFactorial(n) {
 if (n<0) return 'Error';
 if (n==0) return '1';
 if (n%1!==0) return 'Error';
var s=1;
for (var i=1; i<=n ;i++) {
s*=i;
 } return s;
}

//Cnk
function picoCnk(n,k) {
if (1*k>1*n) return 'Error';
else  return  picoFactorial(n)/(picoFactorial(k)*picoFactorial(n-k));
}


//AlcoTest
function picoAlcoFree(V,p) {
// Metoda porcji standardowych
if(1*V>0 && (1*p>0 && 1*p<100)) return  Math.ceil((0.8*(V*1000)*(p/100))*(1/10));else return 'Error';
}


function picoAlcoTest(V,p) {
// wzór Erika Widmarka
var A=0.8*(V*1000)*(p/100);
var K=0.65;var W=75;
pm=(A/(K*W)).toFixed(1);
if(1*V>0 && (1*p>0 && 1*p<100)) return  (pm);else return 'Error';
}


// Show page src
function picoPageSrc() {alert(document.documentElement.innerHTML)}

// Validator W3C 
function picoValidCSS(uri) {
location.href='http://jigsaw.w3.org/css-validator/check/referer';
if (uri) location.href='https://jigsaw.w3.org/css-validator/validator?uri='+uri;
}

function picoValidHTML(uri) {
location.href='http://validator.w3.org/check?uri=referer';
if (uri) location.href='https://validator.w3.org/nu/?doc='+uri;
}

// PageSpeed Insights
function picoPageSpeed(uri) {
if(uri) {location.href='https://developers.google.com/speed/pagespeed/insights/?url='+uri;
 } else alert('Error');
}

//Alert Cookie UE
function picoCookieUE() {

if ( picoGetCookie('_ciachoC')=='null' ) {

var div = picoNewTag('div');
var div_txt='<div id="_boxCookie" style="overflow:auto; z-index:999; box-shadow:-3px -3px 10px 0px rgba(50, 50, 50, 0.75);position:fixed; bottom:0; width:100%; background:#333; margin-left:-8px; padding:0"><p style="padding:7px; text-align:center; font:normal 13px verdana; color:yellow">Ta strona używa Cookies. Korzystając ze strony wyrażasz zgodę na używanie plików cookie, zgodnie z aktualnymi ustawieniami przeglądarki. <button title="Akceptacja" id="btn_Cookie">Roznumiem</button></p></div>';
picoTxt(div, div_txt);

var body =picoId('body');
picoAddTag(body,div);
var btn=picoId('btn_Cookie');
picoEvent(btn, 'click', akcja);

function akcja() { picoSetCookie('_ciachoC',true,7); _picoFade1('_boxCookie', 0)}//picoStyle(div, 'display','none')};

   }
 }

// Działania na tablicy (sort,+,*,...)

function picoArrShow(t, i) {
if ( i=== undefined ) {
return t;
} else {

if(i>=0 && i<t.length) {
return t[i];
  } else return 'Error'; 
 } 
}


function picoArrShuff(t) {
var i,j,k;
for (i = t.length; i; i--) {
  j = Math.floor(Math.random() * i);
  k = t[i-1];
  t[i-1] = t[j];
  t[j] = k;
 }
 return t;
}


function picoArrSort(t, p) {
 var s; 
 s=t.sort(); 
 s=t.sort(function(a,b){return a-b});
 if (p==false) {return s.reverse();} 
 return s;
}


function picoArrLen(t) {
return t.length;
}


 function picoArrMin(t) {
var Min=t[0];
for (var i=0; i<t.length; i++) {
if ( t[i]<Min ) Min=t[i];
 } 
 return Min;
}

 function picoArrMax(t) {
var Max=t[0];
for (var i=0; i<t.length; i++) {
if ( t[i]>Max ) Max=t[i];
 } 
 return Max;
}


function picoArrSum(t) {
var s=0;
for (var i=0; i<t.length; i++) {
s+=t[1*i];
 } 
//if ( Number(s) ) return s; else return 'Error';
  return s;
}


function picoArrPrd(t) {
var i=1;
for (var j=0; j<t.length; j++) {
i*=t[j];
 } 
 return i; 
}

 
 function picoArrRange(n, m) {
if (n>=m) return 'Error';
 var t=[];
for (var i=0; i<(m-n); i++) {
 for (var j=n; j<=m; j++) {  
    t[j-n]=1*j;
  }
 }
   return t;
}
 
 
// liczby Lotto k z m
function picoLotto(k,m) {
var n=1;
var t = picoArrRange(n,m);
var m = picoArrShuff(t);
var l=[];

  for (var i=0; i<k; i++) {
	l[i]=picoArrShow(m, i);
  }
return picoArrSort(l); 
 } 
 

 
 //Alert Box
function picoAlert(t, z) {

 if (!div) {
var div = picoNewTag('div');
var div_txt='<div style="overflow:hidden; resize:auto; box-shadow: 8px 8px 4px #888;background:#fff; z-index:9999; border:3px solid #333; width:400px; min-height:220px; position:fixed; top:50%; left:50%; margin-left:-200px; margin-top:-110px">';
div_txt+='<div style="font:bold 14px/18px arial; border-bottom:4px solid #333;padding:5px;background:#555; color:yellow;">'+t+'<button title="Zamknij (Esc)" id="__alertBtn" style="float:right"> x </button></div>';
div_txt+='<div style="overflow:auto;height:150px;font:normal 14px arial; padding:5px;">'+z+'</div></div>';
 
picoTxt(div, div_txt);

var body =picoId('body');
picoAddTag(body,div);

  // maska div
var html=picoId('html');
var d = picoNewTag('div');
picoBC(d,'#bababa');
picoO(d,0.3);
picoCSS(d, 'position', 'fixed');
picoCSS(d, 'top', 0);
picoW(d, '100%');
picoCSS(d, 'margin-left', '-8px');
picoCSS(d, 'margin-top', '0px');

var h = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
picoH(d, h+"pc");
picoAddTag(body,d);
picoCSS(body, 'overflow', 'hidden');
// maska.

 var btn=picoId('__alertBtn');
picoEvent(btn, 'click', akcja0);
picoEvent(btn, 'mouseover', akcja1);
picoEvent(btn, 'mouseout', akcja2);

function akcja0() {picoDelTag(div); picoDelTag(d); picoCSS(body, 'overflow', '')};
function akcja1() {picoCSS(btn, 'color', 'red')};
function akcja2() {picoCSS(btn, 'color', 'black')};
  }
  
document.addEventListener('keyup', function(e) {
if (!e) e = event;
if (e.keyCode == 27) {
if (picoAgent()=='Explorer') {
div.parentNode.removeChild(div);
d.parentNode.removeChild(d);
picoCSS(body, 'overflow', '');
   }
if (div) div.remove(); d.remove(); picoCSS(body, 'overflow', '');
  }
 });
}

//RND()
function picoRND(n,m) {if (m>n)  return Math.floor(Math.random()*(m-n+1)+n); return 'Error'}; 

// date Diff
function picoDateDiff(d1,d2,f) {

if (d2=='now') d2= picoDate();

d11=d1.split('.'); d22=d2.split('.');

var date1 = new Date(d11[2]+'/'+d11[1]+'/'+d11[0] );
var date2 = new Date(d22[2]+'/'+d22[1]+'/'+d22[0] );

var tDiff = date2.getTime() - date1.getTime();
var dDays = Math.ceil( tDiff / (1000*3600*24) ); 

if (f=='m') return Math.ceil( dDays/30.437 );
if (f=='l') return Math.floor( dDays/365.242 );

return dDays;

}


//popUp Box
function picoPopUp(txt, k, t) {
if ( picoGetCookie('_popUpBoxC')=='null' ) {
//_picoFade2('picoPopUp',0);
//picoShake('uri',0);
if (k === undefined && t === undefined) {

  var t=Number(txt.split('|')[3]);
  var k=txt.split('|')[2];
  var url=txt.split('|')[1];
  var txt=txt.split('|')[0];

} else {

var url=txt.split('|')[1];
var txt=txt.split('|')[0];
}

var div = picoNewTag('div');
var div_txt='<div class="'+k+'"id="picoPopUp" style="resize:auto; z-index:1000; box-shadow:3px 3px 10px 0px rgba(50, 50, 50, 0.5); position:fixed; left:50%; top:25%; min-height:100px; width:700px;margin-left:-350px; margin-top:-50px; border-radius:10px;"><div style="min-height:100px;" id="uri">'+txt+'</div><div style="float:right; clear:both;"><button style="margin:5px; width:50px;" title="Zamknij (Esc)" id="btn_popUp"><b> x </b> </button></div></div>';

var body = picoId('body');
picoTxt(div, div_txt);
picoAddTag(body,div);

var btn=picoId('btn_popUp');
var link=picoId('uri');

//picoT(link, url);
picoCur(link, 'pointer');

picoEvent(link, 'click', cel);

function cel() {akcja(); if(url!==undefined && url.trim() !='') picoGo(url)};

picoEvent( btn, 'click', akcja);
picoEvent( btn, 'mouseover', kolor1 );
picoEvent( btn, 'mouseout',  kolor2 );

function akcja()  { picoSetCookie('_popUpBoxC','true',t); _picoFade1('picoPopUp',0)}
function kolor1() { picoC(btn, 'red')};
function kolor2() { picoC(btn, 'black')};
//Esc
document.addEventListener('keyup', function(e) {
if (!e) e = event;
if (e.keyCode == 27) akcja();
});

 }
}

// Expand/Collapse()div...

function picoExpand(id, xk, cb) {
       var X_ruch;
    if (cb) {
	   X_ruch=setInterval(function()      {picoRuch(id, xk, cb)},40);
	}  else X_ruch=setInterval(function() {picoRuch(id, xk)},40);
	
	function picoRuch(id, xk, cb) {
            var a=4; 
      var x=document.getElementById(id);
		x.style.height= Math.floor( parseInt(x.style.height)+(xk-parseInt(x.style.height))/a )+'px'; 
      if ( Math.ceil(parseInt(x.style.height)+5) >= xk) { 
      clearInterval(X_ruch);
      x.style.height=(xk-5)+"px";
      if (cb) eval(cb);
      }
   };	
}


function picoCollapse(id, xk, cb) { 
      var _X_ruch;
    if (cb) {
	_X_ruch=setInterval(function() {_picoRuch(id, xk, cb)},40);
	} else _X_ruch=setInterval(function() {_picoRuch(id, xk)},40);
	
	
	function _picoRuch(id, xk, cb) {
		var a=4; 
	var x=document.getElementById(id);
		x.style.height = Math.floor( parseInt(x.style.height)+(xk-parseInt(x.style.height))/a )+'px'; 
	if ( Math.floor(parseInt(x.style.height)) <= xk+1) {
	clearInterval(_X_ruch);
	x.style.height=xk+"px";
	if (cb) eval(cb);
  }
 };
}


// Warning Box
function picoWarning(t1, t2, k) {

if ( !localStorage.getItem("wiek") )  {

var html = document.documentElement;
var body=document.body;
var d=document.createElement('div');

d.style.background='#000';
d.style.opacity=0.95;
d.style.position='fixed';
d.style.top=0;
d.style.width='100%';
d.style.marginLeft='-8px';
d.style.marginTop='-15px';

var h = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
d.style.height=h+"px";
d.style.zIndex=999;
body.appendChild(d);

// disable right-click
picoDisableRC(true);

// box.

var div=document.createElement('div');
div.style.position='fixed';
div.style.Left='50%';
div.style.zIndex=9999;
div.style.width='500px';
div.style.top='10%';
div.style.left='50%';
div.style.marginLeft='-250px';
div.innerHTML='<div class="'+k+'"><h1>'+t1+'</h1><p>'+t2+'</p><div style="padding:5px;text-align:center"><button id="btn1">Tak</button> <span style="padding-left:15px"></span><button id="btn2">Nie</button> </div></div>';

body.appendChild(div);

var b1=document.getElementById('btn1');
var b2=document.getElementById('btn2');

b1.onclick=function() {
 localStorage.setItem("wiek", true);
 //d.remove(); div.remove() 
 d.parentNode.removeChild(d);
 div.parentNode.removeChild(div);
 picoDisableRC(false);
 }
 
//b2.onclick=function() {location.href='http://google.com'}
b2.addEventListener('click', function() {location.href='http://google.pl'});

 }
 
}

// Disable right-click
function picoDisableRC(s) {
window.addEventListener('contextmenu', __picoHandler, false);
if (s==false) window.removeEventListener("contextmenu", __picoHandler);   
}

var __picoHandler = function(e) {
e.preventDefault();
}

//wsp. myszy
function picoMouseX(event){
return event.clientX;
}

function picoMouseY(event){
return event.clientY;
}

// wsp. - scrollY
 function picoScrollY()  {
 var top=''; var doc = picoId('html');
 top+=(window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0); 
   return top; 
 }

// el. div Drag

function picoDrag(id, id2) {
	zI=0;
	
	var el= document.getElementById(id);
	
	// et. stopujacy
	if (id2!=undefined) {
	    var el2= document.getElementById(id2);
		el2.addEventListener('mousedown', function(e) {akcjaX(e)});
	}	
	
    // stop Drag
    function akcjaX(e) {e.stopPropagation();}
	
	el.addEventListener('mousedown',start);
	//el.addEventListener('mouseup',stop);	
	document.addEventListener('mouseup',stop);
	el.style.zIndex=zI++;
	
function start(event) {
 
	el.style.cursor='move';
	el.style.zIndex=zI++;
   
	var X1 = picoMouseX(event);
	var Y1 = picoMouseY(event);
	event.stopPropagation();
	event.preventDefault();
	  
	var a= X1-(el.offsetLeft);
	var b= Y1-(el.offsetTop);
	  
	  X0=a;
	  Y0=b;

	document.addEventListener("mousemove", _ruch, true);
	
 }; 

function stop(e) {
	document.removeEventListener("mousemove", _ruch, true);
	document.removeEventListener("mouseup", _ruch, true);
	e.stopPropagation();
	e.preventDefault();
	el.style.cursor='default';
};
	
		
function _ruch(event) {

	var X = picoMouseX(event);
	var Y = picoMouseY(event);
	    
	if (X<=X0) X=X0;
	if (Y<=Y0) Y=Y0;
	
	el.style.left=(X-X0)+'px';
	el.style.top=(Y-Y0)+'px';
 
 };
}

// password Gen 10 znaków
function picoPassGen(f) {

var t_a=['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'w', 'y', 'z'];
var t_A=['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'W', 'Y', 'Z'];
var t_N=[0,1,2,3,4,5,6,7,8,9];
var t_Z=['!','@', '#', '$', '%','&'];

picoArrShuff(t_a); picoArrShuff(t_A); picoArrShuff(t_N); picoArrShuff(t_Z);

var h=[];
h[0]=t_a[0]; h[1]=t_a[1]; h[2]=t_a[2]; h[3]=t_A[0]; h[4]=t_A[1]; h[5]=t_N[0]; h[6]=t_N[1]; h[7]=t_Z[0];

var H=[]; H=h;
picoArrShuff(H);
 return (H[0]+H[1]+H[2]+H[3]+H[4]+H[5]+H[6]+H[7])+picoRND(10,99);
}

// disabled true|false
function picoLock(id,f) {
var el=document.getElementById(id);
if (f==true)  el.disabled=true; 
if (f==false) el.disabled=false;
if (f===undefined) return el.disabled; 
}


// zasieg lunety (mag).
function picoAstro(D) {return (7+5*Math.log10(D)).toFixed(1)}


// test kolizji a z b
 function picoHitTest(a,b,f) {
 
	var a=picoId(a);
	var b=picoId(b);
 
 var X1=parseInt(a.style.left);
 var Y1=parseInt(a.style.top);
 
 var X2=parseInt(b.style.left);
 var Y2=parseInt(b.style.top);
 
 var aw= parseInt(a.style.width);
 var ah= parseInt(a.style.height);
 
 var bw= parseInt(b.style.width);
 var bh=parseInt(b.style.height);

 // obiekty typu kolo
 if (f==true) {
	 
	var r1=aw/2;
	var r2=bw/2;
    var d0=r1+r2;

	var d=Math.sqrt(((X2+r2)-(X1+r1))*((X2+r2)-(X1+r1))+((Y2+r2)-(Y1+r1))*((Y2+r2)-(Y1+r1)));
		
     if (d<d0) {
        
		return true;
		
     } else return false;

 }  
 
 else {
 
 if (X1 < X2+ bw && X1 + aw > X2 &&
     Y1 < Y2+ bh && Y1 + ah > Y2) {

		return true; 
  
   } else return false;
 }

};

// alert Right-click
function picoAlertRC(txt) {

 picoEvent(document,'contextmenu', function(e) {akcja(e)});

   function akcja(e) {alert(txt); picoPrevent(e)}
}

// funkcja Right-click dla id
   function picoRC(id,f) {
  
 if(id =='document' || id =='body')  {
	picoEvent(document, 'contextmenu', function(e) {akcja(e)});
 } else {
	 var el=picoId(id);
	 picoEvent(el, 'contextmenu', function(e) {akcja(e)});
 }

   function akcja(e) {eval(f); picoPrevent(e)}
}

// odl. pkt. A od B
function picoDist(x1,y1,x2,y2) {
var d = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
return d;
}


// Obtót: el, kąt, położenie (static, fixed, ...)
function picoRot(id,k,p){
var el=document.getElementById(id);
var obr = "rotate(" + k + "deg)";
 el.style.position=p;
 el.style.MozTransform=obr;
 el.style.WebkitTransform=obr;
 el.style.OTransform=obr;
 el.style.msTransform=obr;
}

// Stoper do 45 min
function picoStoper(id, m,s,ss) {
var T=45;// min 

var el=document.getElementById(id);
_pS=setTimeout(function(){picoStoper(id, m,s,ss)}, 10);

ss++;
if (ss<10) ss='0'+ss;
if (ss>99) ss='0'+0; 

s++;
S=parseInt(s/100);
if (S<10) S="0"+S;
if (S>59) {S="0"+0; s=0}

m++;
M=parseInt(m/(100*60));
if (M<10)  M="0"+M;
if (M==T) clearTimeout(_pS);

 if (ss) {
el.innerHTML = M+":"+S+":"+ss;
 } else el.innerHTML = M+":"+S;

}

 // Timer2 do 60 min
function picoTimer2(t,id,s, cb){
 
 if (t<1)  t=1;
 if (t>60) t=60;

s++;
var el=document.getElementById(id);

_pT=setTimeout(function(){picoTimer2(t,id,s, cb)}, 1000);

var S=60-s;

if (S<10) S="0"+S;	

if (s==60){
 s=0;
 t--;
}


 if ( t==0 && s==0 ) {
 
   clearTimeout(_pT);
   el.innerHTML = '00:00';
    if(cb) eval(cb); 

  } else {
  
  
      if (s>0) {
	     if(t>10) el.innerHTML = (t-1)+":"+S;
	   }  
  
      if (s>0) {
	     if(t==10) el.innerHTML = '0'+(t-1)+":"+S;
	   }  
  
	   if (s>0){
	    if(t<10) el.innerHTML = '0'+(t-1)+":"+S;
	   }


  } else return 'Nie istnieją';

}
function picoTxtContent(el) {return el.textContent}
function picoTXT(id,txt) {picoId(id).innerHTML=txt}
// skocz do id
function picoGoId(id){document.getElementById(id).scrollIntoView({behavior:'smooth'})}


// znak wodny
function picoWatermark(div, w, h, img1, img2){

 var div=document.getElementById(div);
 div.style.width=w+"px";
 div.style.height=h+"px";
 
 div.style.backgroundImage="url("+img2+"), url("+img1+")";
 div.style.backgroundPosition='right bottom, left top';
 div.style.backgroundRepeat='no-repeat';
 div.style.backgroundColor='#ccc';
 div.addEventListener('contextmenu', function(e){e.preventDefault()}, false);
}


// --------- HTML DOM --------

function picoId(id) {

if (id=='' || id==undefined) {
 alert('id = null');
 return false;
 }
 
 else {
  if (id =='body'){
 return (document.body)}
 else if (id =='html'){
 return (document.documentElement)}
 else {
 var el=document.getElementById(id);
 if (el) {
 return el
  } else {
  alert('picoAjax\nError: id='+id +' nie istnieje!');
  return false;
   }
  }
 }
}
function picoTxtContent(el) {return el.textContent}
function picoTXT(id,txt) {picoId(id).innerHTML=txt}
 
function picoQS(s)       {return document.querySelector(s)}
function picoQSA(s)      {return document.querySelectorAll(s)}

function picoTag(z,n)    {if(document.getElementsByTagName(z)[n]) return document.getElementsByTagName(z)[n];alert('picoAjax\nError: Element: '+z+'['+n+'] nie istnieje!')}
function picoNewTag(z)   {return document.createElement(z)}
function picoAddTag(e,z) {if (e=='body') return document.body.appendChild(z);return eval('e.appendChild(z)')}
//function picoDelTag(z) {eval ('z.remove()')} // GC, FF,...
function picoDelTag(z)   {eval ('z.parentNode.removeChild(z)')} // IE
//-------------------------------------------------------------
function picoEvent(e,z,a){eval('e.addEventListener(z,a)')}
//function picoEvent(e,z,a){eval('e.addEventListener(z,function(e) {a(e)})')}
function picoReEvent(e,z,a){eval('e.removeEventListener(z,a)')}
function picoPrevent(e)  {eval('e.preventDefault()')}
//-------------------------------------------------------------
function picoSet(e,a,w)  {eval('e.setAttribute(a,w)')}
function picoGet(e,a)    {return eval('e.getAttribute(a)')}
function picoGetClass(c) {return document.getElementsByClassName(c)}
function picoSetClass(e,k){eval('e.className=k')}
function picoDelClass(e,k){eval('e.className=""')}
function picoDel(e,a)    {eval('e.removeAttribute(a)')}
function picoTxt(e,t)    { if (t!=undefined) eval('e.innerHTML=t'); else return eval('e.innerHTML')}
function picoC(e,k)      {eval('e.style.color=k')}
function picoW(e,w)      {eval('e.style.width=w')}
function picoH(e,h)      {eval('e.style.height=h')}
function picoB(e,b)      {eval('e.style.border=b')}
function picoF(e,f)      {eval('e.style.fontFamily=f')}
function picoFS(e,r)     {eval('e.style.fontSize=r')}
function picoBC(e,k)     {eval('e.style.background=k')}
function picoBS(e,k)     {eval('e.style.boxShadow=k')}
function picoTS(e,k)     {eval('e.style.textShadow=k')}
function picoTA(e,k)     {eval('e.style.textAlign=k')}
function picoBR(e,k)     {eval('e.style.borderRadius=k')}
function picoCur(e,k)    {eval('e.style.cursor=k')}
function picoHide(e,v)   {eval('e.style.display="none"')}
function picoShow(e,v)   {eval('e.style.display=""')}
function picoToggle(e,v) { if (e.style.display =='') eval('e.style.display="none"');else eval('e.style.display=""')}

function picoCSS(e,W,w)  {
if ( W.indexOf('-')!=-1 ){
cp=W.split('-')[0]; ck=W.split('-')[1];
cK= ck.charAt(0).toUpperCase()+ck.slice(1);
W=cp+cK;
}
if (w===undefined) return eval('e.style.'+W);
eval('e.style.'+W+'=w');
}

function picoClone(e,f)  {return(e.cloneNode(f))};
function picoO(e,k)      {eval('e.style.opacity=k')};
function picoT(e,t)      {if (e=='document') eval('document.title=t'); else eval('e.title=t')}
function picoDOM(a)      {eval('document.addEventListener("DOMContentLoaded",a)')}
function picoTxtTag(t)   {return document.createTextNode(t)}
function picoInsert(g, e, newN,refN) {
if ( g =='before' ) eval('e.insertBefore(newN,refN)');
if ( g =='after') eval('e.parentNode.insertBefore(newN, e.nextSibling)');
}

function picoTxtContent(el) {return el.textContent}
function picoTXT(id,txt) {picoId(id).innerHTML=txt}
function picoTxtContent(el) {return el.textContent}
function picoTXT(id,txt) {picoId(id).innerHTML=txt}
// --------- \HTML DOM --------