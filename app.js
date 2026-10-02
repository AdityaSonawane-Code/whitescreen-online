(function(){
var s=document.getElementById("screen"),hint=document.getElementById("hint"),hex=document.getElementById("hex");
var cyc=["#ffffff","#000000","#ff0000","#00ff00","#0000ff"],i=0,t;
function set(c){s.style.background=c;if(hex)hex.value=c;var k=cyc.indexOf(c.toLowerCase());if(k>-1)i=k}
function say(m){hint.textContent=m;hint.classList.add("show");clearTimeout(t);t=setTimeout(function(){hint.classList.remove("show")},2500)}
function go(){document.fullscreenElement?document.exitFullscreen():(s.requestFullscreen||s.webkitRequestFullscreen).call(s)}
function next(d){i=(i+d+cyc.length)%cyc.length;set(cyc[i])}
document.getElementById("fs").onclick=go;
s.addEventListener("dblclick",go);
s.addEventListener("click",function(e){if(document.fullscreenElement&&e.target===s)next(1)});
document.addEventListener("keydown",function(e){if(!document.fullscreenElement)return;
if(e.key==="ArrowRight"||e.key===" "){e.preventDefault();next(1)}if(e.key==="ArrowLeft")next(-1)});
document.addEventListener("fullscreenchange",function(){if(document.fullscreenElement)say("Click or press → to change color · Esc to exit")});
document.querySelectorAll(".sw button").forEach(function(b){b.onclick=function(){set(b.dataset.c)}});
var pk=document.getElementById("pick");if(pk)pk.oninput=function(){set(pk.value)};
if(hex)hex.onchange=function(){set(hex.value)};
var br=document.getElementById("bright");if(br)br.oninput=function(){s.style.filter="brightness("+br.value+"%)"};
var dl=document.getElementById("dl");if(dl)dl.onclick=function(){
var c=document.createElement("canvas");c.width=+document.getElementById("w").value||1920;c.height=+document.getElementById("h").value||1080;
var x=c.getContext("2d");x.fillStyle=s.style.background||"#fff";x.fillRect(0,0,c.width,c.height);
c.toBlob(function(b){var a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="screen-"+c.width+"x"+c.height+".png";a.click()})};
set(s.dataset.start||"#ffffff");
})();
