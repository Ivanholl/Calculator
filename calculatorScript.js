(function () {
	var resultScreen = document.getElementById('ResultScreen'),
		view = document.getElementById('view'),
		forHide = document.getElementsByClassName('hide'),

		clearAll = document.getElementById('clearAll'),
		clearLast = document.getElementById('clearLast'),

		minus = document.getElementById('minus'),
		plus = document.getElementById('plus'),
		multy = document.getElementById('multy'),
		dev = document.getElementById('dev'),
		equal = document.getElementById('equal'),

		plusMinus = document.getElementById('plusMinus'),
		point = document.getElementById('point'),
		turn = document.getElementById('turn'),
		percent = document.getElementById('percent'),
		sqr = document.getElementById('sqr'),

		btnOne = document.getElementById('1'),
		btnTwo = document.getElementById('2'),
		btnThree = document.getElementById('3'),
		btnFour = document.getElementById('4'),
		btnFive = document.getElementById('5'),
		btnSix = document.getElementById('6'),
		btnSeven = document.getElementById('7'),
		btnEight = document.getElementById('8'),
		btnNine = document.getElementById('9'),
		btnZero = document.getElementById('0'),

		memClear = document.getElementById("memClear"),
		memRecall = document.getElementById("memRecall"),
		memStore = document.getElementById("memStore"),
		memAdd = document.getElementById("memAdd"),
		memSubstact = document.getElementById("memSubstact"),

		memory = 0,
		calculationResult = 0,
		decimalPointReset = false,		
		viewChange = false;

	function setResultScreen(forSet, clear, clearLast, equalSing, plusMinus, point){
		var current = resultScreen.value,
			clearBool = clear | false,
			clearLastBool = clearLast | false,
			equalSingBool = equalSing | false,
			plusMinusBool = plusMinus | false;

		if (clearBool) {
			resultScreen.value = '';
			current = '';
		}
		else if (clearLastBool){
			current = current.substring(0, current.length - 1);
			resultScreen.value = current;
			calculationResult = current;
		}
		else if (equalSingBool){
			calculation(current);
			calculationResult = current;	
			decimalPointReset = false;					
		}
		else if (plusMinusBool){
			current = current * (-1);
			resultScreen.value = current;
			calculationResult = current;						
		}
		else {
			if (forSet == "." && decimalPointReset === false) {				
				current += forSet;
				resultScreen.value = current;
				calculationResult = current;
				decimalPointReset = true;
			}
			else if (forSet == "+" || forSet == "-" || forSet == "/" || forSet == "*") {				
				current += forSet;
				resultScreen.value = current;
				calculationResult = current;
				decimalPointReset = false;	
			}
			else {
				current += forSet;
				resultScreen.value = current;
				calculationResult = current;
			}			
		}

	}

	function calculation(equation){
		var formula = equation,
			expression = Parser.parse(formula),
			result = expression.evaluate({ x: 3 });

		resultScreen.value = result;
		calculationResult = result;
	}

	function memorySet(value, MC, MR, Mp, Mm){
		var current = parseInt(value),
			mrBool = MR | false,
			mcBool = MC | false,
			mpBool = Mp | false,
			mmBool = Mm | false;

		if (mcBool) {
			current = 0;
			memory = '';
		}
		else if (mrBool) {
			setResultScreen(memory);
		}
		else if (mpBool) {
			memory += current;
		}
		else if (mmBool) {
			memory -= current;
		}
		else {
			memory = current;
		}
	}

	function sqrtSet(){		
		resultScreen.value = "sqrt(" + calculationResult + ")"
	}

	function percentSet(){
		calculation(calculationResult);		
		var result = calculationResult * calculationResult / 100;
		setResultScreen('', true);
		setResultScreen(result);
	}

	function reciprocSet(){
		calculation(calculationResult);		
		var result = 1 / parseInt(calculationResult);
		setResultScreen('', true);
		setResultScreen(result);
	}


	btnOne.addEventListener("click", function(){setResultScreen(1)}, false);
	btnTwo.addEventListener("click", function(){setResultScreen(2)}, false);
	btnThree.addEventListener("click", function(){setResultScreen(3)}, false);
	btnFour.addEventListener("click", function(){setResultScreen(4)}, false);
	btnFive.addEventListener("click", function(){setResultScreen(5)}, false);
	btnSix.addEventListener("click", function(){setResultScreen(6)}, false);
	btnSeven.addEventListener("click", function(){setResultScreen(7)}, false);
	btnEight.addEventListener("click", function(){setResultScreen(8)}, false);
	btnNine.addEventListener("click", function(){setResultScreen(9)}, false);
	btnZero.addEventListener("click", function(){setResultScreen(0)}, false);
	point.addEventListener("click", function(){setResultScreen('.')}, false);

	clearAll.addEventListener("click", function(){setResultScreen(0, true), false});
	clearLast.addEventListener("click", function(){setResultScreen('', false, true)}, false);

	plus.addEventListener("click", function(){setResultScreen('+')}, false);
	minus.addEventListener("click", function(){setResultScreen('-')}, false);
	multy.addEventListener("click", function(){setResultScreen('*')}, false);
	dev.addEventListener("click", function(){setResultScreen('/')}, false);

	plusMinus.addEventListener("click", function(){setResultScreen("", false, false, false, true)}, false);
	sqr.addEventListener("click", function(){sqrtSet()}, false);
	percent.addEventListener("click", function(){percentSet()}, false);
	turn.addEventListener("click", function(){reciprocSet()}, false);

	memStore.addEventListener("click", function(){memorySet(calculationResult)}, false);
	memClear.addEventListener("click", function(){memorySet(calculationResult, true)}, false);
	memRecall.addEventListener("click", function(){memorySet('', false, true)}, false);
	memAdd.addEventListener("click", function(){memorySet(calculationResult, false, false, true)}, false);
	memSubstact.addEventListener("click", function(){memorySet(calculationResult, false, false, false, true)}, false);

	equal.addEventListener("click", function(){setResultScreen('', false, false, true)}, false);

	view.addEventListener("click", changeView, false);

	function changeView(){
		if (viewChange === false) {

			viewChange = true;

			for (var i = 0; i < forHide.length; i++) {
				forHide[i].classList.add('hideProgramerMode');
			}

			point.disabled = false;
			turn.disabled = false;
			percent.disabled = false;
			sqr.disabled = false;
		}
		else {
			viewChange = false;		

			for (i = 0; i < forHide.length; i++) {
				forHide[i].classList.remove('hideProgramerMode');
			}

			point.disabled = true;
			turn.disabled = true;
			percent.disabled = true;
			sqr.disabled = true;			
		}
	}
})();