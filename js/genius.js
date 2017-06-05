var points = 0;
var sequence = "";
var mySequence = "";

function myClick(n){
	mySequence += n;
	changeBorder(n);
	if(sequence.indexOf(mySequence) == -1){
		points = 0;
		sequence = "";
		document.all.fail.style.display = "block";
		document.all.count.innerHTML = points;
		return;
	}
	if(sequence == mySequence){
		points++;
		mySequence = "";
		document.all.count.innerHTML = points;
		setTimeout ("init()", 1000);
	}
}

function init(){
	document.all.start.style.display = "none";
	document.all.fail.style.display = "none";
	sequence += Math.floor(Math.random() * 4);
	show();
}

function restart(){
	sequence = "";
	mySequence = "";
	init();
}

function changeBorder(n){
	switch(n){
		case 0:
			var elem = document.all.a;
			var color1 = "#1aff00"
			var color2 = "#0b7000"
			var noneElement = "a";
			break
		case 1:
			var elem = document.all.b;
			var color1 = "#ff0b00"
			var color2 = "#c30800"
			var noneElement = "b";
			break
		case 2:
			var elem = document.all.c;
			var color1 = "#ffec00"
			var color2 = "#c3b400"
			var noneElement = "c";
			break
		case 3:
			var elem = document.all.d;
			var color1 = "#29abd0"
			var color2 = "#196d85"
			var noneElement = "d";
			break
	}
	elem.style.borderColor = color1;
	setTimeout("document.all."+noneElement +".style.borderColor= '"+color2+"'",200);
}

function show(){
	var num = "";
	for(n = 0; n < sequence.length; n++){
		num = sequence.substr(n,1);
		setTimeout("changeBorder("+num+")", 500 * n);
	}
}