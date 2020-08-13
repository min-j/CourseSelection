var t = true;
function selected(){
  var b = true;

  var p = document.getElementById("one").value;
  var l = document.getElementById("two").value;
  var m = document.getElementById("three").value;
  var n = document.getElementById("four").value;
  var o = document.getElementById("five").value;
  document.getElementById("di").innerHTML = p;
  document.getElementById("di2").innerHTML = l;
  document.getElementById("di3").innerHTML = m;
  document.getElementById("di4").innerHTML = n;
  document.getElementById("di5").innerHTML = o;
  var a = [p, l, m, n, o];
for(var i = 0; i<a.length; i++){
  if(a[i] == "unselected"){
    b = false;
  }
}
if (b==true) {
  document.getElementById("final").style.opacity = "1";
  }
  else{
    document.getElementById("final").style.opacity = "0";
  }
}
