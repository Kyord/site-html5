//VARIABLES
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var PPM = 20; //20
var time = 0;
var timeEachEnemy = 2;
var intro = true;
var level = 1;
var levelIndex = 1;
var enemyKilled = 0;
var enemyMission = 0;
var indexSPR = 1;
var record = 0;
var getBaseFloor = function() {
	if(levelIndex == 1) {
		return canvas.height - 60;
	} else if(levelIndex == 2) {
		return canvas.height - 54;
	} else if(levelIndex == 3) {
		return canvas.height - 80;
	}
}
var base_floor = getBaseFloor();

//AUDIO
var jump = document.getElementById('jump');

//SPRITES
//Background1
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {bgReady = true;}

//Player
var playerReady = false;
var playerImageC = new Image();
var playerImageR = "img/rpg/player-r"+indexSPR+".png";
var playerImageL = "img/rpg/player-l1.png";
playerImageC.onload = function() {playerReady = true;}
playerImageC.src = playerImageR;

//Enemy
var enemyReady = false;
var enemyImage = new Image();
enemyImage.onload = function() {enemyReady = true;}
enemyImage.src = "img/rpg/enemy-r.png";
//END-SPRITES

//Variaveis Jogador
var player = {
	x: canvas.width / 2,
	y: getBaseFloor(level),
	base_spd: 100,
	spd_x: 100,
	spd_y: 0,
	time: 0
};

//Variaveis Inimigo
var enemy = {
	y: getBaseFloor(level),
	spd_x: 100,
	spd_y: 0,
	time: 0
};
//Controlando pelo teclado
var keysDown = {};
//END-VARIABLES
//**********************************************************************************
//INTRO
var introDraw = function() {
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.font = "50px Roboto";
	ctx.fillStyle = "#0099CC";
	ctx.textAlign = "center";
	ctx.fillText("HTML5 Game", canvas.width/2, canvas.height/2 - 30);

	ctx.font = "25px Roboto";
	ctx.fillText("Press Enter to Start", canvas.width/2, canvas.height/2 + 15);

	if(record != 0) {
		ctx.font = "25px Roboto";
		ctx.fillText("Highlevel: "+record, canvas.width/2, canvas.height/2 + 80);
	}

	ctx.font = "25px Roboto";
	ctx.fillText("Control: With Keys | Jump: KeyUp or Space | Run: Shift", canvas.width/2, canvas.height-30);
}
//END-INTRO
//**********************************************************************************

//Key Press - Manipulador de evento, verifica o que acontece com o teclado
addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
}, false);

//Key Release - Manipulador de evento, verifica o que acontece com o teclado
addEventListener("keyup", function(e) {
	delete keysDown[e.keyCode];
}, false);

var enemyDie = function() {
	++enemyKilled;
	enemyReset();
	document.getElementById('enemy_hurt').play();
}

var enemyReset = function() {
	//Evitar colisão direta no reset
	do {
		enemy.x = 32 + (Math.random() * (canvas.width - 64));
	} while(!checkColisionX);
}

var playerDie = function() {
	if(level > record)
		record = level;

	intro = true;
	level = 1;
	levelIndex = 1;
	enemyKilled = 0;
	player.x = canvas.width / 2;
	enemyReset();
}

var checkColisionX = function() {
	return (player.x <= (enemy.x + 20) && enemy.x <= (player.x + 20));
}

var checkColisionY = function() {
	return (player.y <= (enemy.y + 32) && enemy.y <= (player.y + 32));
}

var checkColision = function() {
	return (checkColisionX() && checkColisionY());
}

var run = function() {
	player.spd_x = player.base_spd * 2;
}

var jump = function(obj) {
	obj.spd_y = -1.5;
}

var setLevel = function() {
	if(levelIndex >= 4)
		levelIndex = 1;

	enemyKilled = 0;
	enemyMission = 2 * level;
	time = (2 * level) * timeEachEnemy;
	base_floor = getBaseFloor();
	player.y, enemy.y = base_floor;
	bgImage.src = "img/rpg/wallpaper"+levelIndex+".png";
}

//Direction controll
var update = function(delta) {//up=38, down=40, left=37, right=39
	if(!intro)
		time -= delta;

	indexSPR += delta*10;
	if(Math.floor(indexSPR) >= 4)
		indexSPR = 1;

	if((37 in keysDown || 65 in keysDown) && player.x > 0) {//LEFT
		player.x -= player.spd_x * delta;

		playerImageC.src = "img/rpg/player-l"+Math.floor(indexSPR)+".png";
	}
	if((39 in keysDown || 68 in keysDown) && player.x < (canvas.width - 25)) {//RIGHT
		player.x += player.spd_x * delta;
		playerImageC.src = "img/rpg/player-r"+ Math.floor(indexSPR) +".png";
	}

	if((32 in keysDown || 38 in keysDown || 87 in keysDown) && player.y == getBaseFloor(level)) {
		jump(player);
		document.getElementById('jump').play();
	}

		//jump(enemy);

	if(16 in keysDown)
		run();
	else
		player.spd_x = player.base_spd;
	

	//Colision
	if(checkColision()) {
		//Jump Kill Enemy
		if(player.y <= (enemy.y - 26) && player.y >= (enemy.y - 32)) {
			enemyDie();
			jump(player);
		} else { //Player Die
			playerDie();
			document.getElementById('player_hurt').play();
		}	
	}

	if(player.y < base_floor || player.spd_y != 0) {
		gravity(player, delta);
	}

	if(enemy.y < base_floor || enemy.spd_y != 0) {
		gravity(enemy, delta);
	}

	if(enemyKilled >= enemyMission) {
		level++;
		setLevel(levelIndex++);
		document.getElementById('nextlevel').play();
	}

	if(time <= 0)
		playerDie();
};

//Draw
var render = function() {
	if(intro) {
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	} else {
		if(bgReady) {ctx.drawImage(bgImage, 0, 0);}
		if(playerReady) {ctx.drawImage(playerImageC, player.x, player.y);}
		if(enemyReady) {ctx.drawImage(enemyImage, enemy.x, enemy.y);}

		scoreDraw();
		levelDraw();
		timerDraw();
	}
};

var timerDraw = function() {
	ctx.fillStyle = "rgb(20, 20, 20)";
	ctx.font = "22px Verdana";
	ctx.textAlign = "center";
	ctx.fillText("Time: "+time.toFixed(1), canvas.width / 2, 26);
};

var scoreDraw = function() {
	ctx.fillStyle = "rgb(20, 20, 20)";
	ctx.font = "22px Verdana";
	ctx.textAlign = "left";
	ctx.fillText("Enemies: "+enemyKilled+" / "+enemyMission, 8, 52);
};

var levelDraw = function() {
	ctx.fillStyle = "rgb(20, 20, 20)";
	ctx.font = "22px Verdana";
	ctx.textAlign = "left";
	ctx.fillText("Level: "+level, 8, 26);
};

//Gravity
var gravity = function(obj, delta) {
	obj.time += delta;
	obj.spd_y += (2 / PPM) * obj.time;
	
	if((obj.y + obj.spd_y) > getBaseFloor()) {
		obj.y = getBaseFloor();
		obj.time = 0;
		obj.spd_y = 0;
	} else
		obj.y += obj.spd_y;
};

//GameLoop
var main = function() {
	if(intro) {
		introDraw();

		if(13 in keysDown) {
			intro = false;
			setLevel();
		}
	} else {
		var now = Date.now();
		var delta = now - then;
		
		update(delta / 1000);
		render();
		then = now;
	}
};

//InitGame
enemyReset();
var then = Date.now();
setInterval(main, 1);