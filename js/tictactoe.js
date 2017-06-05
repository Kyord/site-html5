var cont = 0;
var shift = 1;
var O_val = "O";
var X_val = "X";
var E_val = " ";

//Colors
var init_Color = "black";

function round(sqr) {
	if(sqr.value == E_val || sqr.value == "") {
		if(shift == 1) {
			sqr.value = X_val;
			sqr.style.backgroundColor = "red";
		} else {
			sqr.value = O_val;
			sqr.style.backgroundColor = "green";
		}

		shift = shift*(-1);
		validate();
	}
}

function validate() {
	cont = 0;
	var turnValue;

	var sqr1 = document.tictactoe.sqr1.value;
	var sqr2 = document.tictactoe.sqr2.value;
	var sqr3 = document.tictactoe.sqr3.value;
	var sqr4 = document.tictactoe.sqr4.value;
	var sqr5 = document.tictactoe.sqr5.value;
	var sqr6 = document.tictactoe.sqr6.value;
	var sqr7 = document.tictactoe.sqr7.value;
	var sqr8 = document.tictactoe.sqr8.value;
	var sqr9 = document.tictactoe.sqr9.value;

	if(shift == -1) {
		turnValue = X_val;
	} else if (shift == 1) {
		turnValue = O_val;
	}

	if(
	(sqr1 == turnValue && sqr2 == turnValue && sqr3 == turnValue) ||
	(sqr4 == turnValue && sqr5 == turnValue && sqr6 == turnValue) ||
	(sqr7 == turnValue && sqr8 == turnValue && sqr9 == turnValue) ||

	(sqr1 == turnValue && sqr4 == turnValue && sqr7 == turnValue) ||
	(sqr2 == turnValue && sqr5 == turnValue && sqr8 == turnValue) ||
	(sqr3 == turnValue && sqr6 == turnValue && sqr9 == turnValue) ||

	(sqr1 == turnValue && sqr5 == turnValue && sqr9 == turnValue) ||
	(sqr7 == turnValue && sqr5 == turnValue && sqr3 == turnValue)) {
		alert("Jogador " + turnValue + " ganhou!");
		reset();
	} else {
		if(sqr1 != E_val) {
			cont++;
		}

		if(sqr2 != E_val) {
			cont++;
		}

		if(sqr3 != E_val) {
			cont++;
		}

		if(sqr4 != E_val) {
			cont++;
		}

		if(sqr5 != E_val) {
			cont++;
		}

		if(sqr6 != E_val) {
			cont++;
		}

		if(sqr7 != E_val) {
			cont++;
		}

		if(sqr8 != E_val) {
			cont++;
		}

		if(sqr9 != E_val) {
			cont++;
		}

		if(cont >= 9) {
			alert("Houve um empate.");
			reset();
		}
	}
}

function reset() {
	document.tictactoe.sqr1.value = E_val;
	document.tictactoe.sqr2.value = E_val;
	document.tictactoe.sqr3.value = E_val;
	document.tictactoe.sqr4.value = E_val;
	document.tictactoe.sqr5.value = E_val;
	document.tictactoe.sqr6.value = E_val;
	document.tictactoe.sqr7.value = E_val;
	document.tictactoe.sqr8.value = E_val;
	document.tictactoe.sqr9.value = E_val;

	document.tictactoe.sqr1.style.backgroundColor = init_Color;
	document.tictactoe.sqr2.style.backgroundColor = init_Color;
	document.tictactoe.sqr3.style.backgroundColor = init_Color;
	document.tictactoe.sqr4.style.backgroundColor = init_Color;
	document.tictactoe.sqr5.style.backgroundColor = init_Color;
	document.tictactoe.sqr6.style.backgroundColor = init_Color;
	document.tictactoe.sqr7.style.backgroundColor = init_Color;
	document.tictactoe.sqr8.style.backgroundColor = init_Color;
	document.tictactoe.sqr9.style.backgroundColor = init_Color;

	turnValue = 1;
	cont = 0;
}