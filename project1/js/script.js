let startBtn = document.getElementById('start'),
	budgetValue = document.querySelector(".budget-value"),
	daybudgetValue = document.querySelector(".daybudget-value"),
	levelValue = document.querySelector(".level-value"),
	expensesValue = document.querySelector(".expenses-value"),
	optionalexpensesValue = document.querySelector(".optionalexpenses-value"),
	incomeValue = document.querySelector(".income-value"),
	monthsavingsValue = document.querySelector(".monthsavings-value"),
	yearsavingsValue = document.querySelector(".yearsavings-value"),
	expensesItems = document.querySelectorAll('.expenses-item'),
	expensesItemBtn = document.querySelector(".expenses-item-btn"),
	optionalexpensesBtn = document.querySelector(".optionalexpenses-btn"),
	countBudgetBtn = document.querySelector(".count-budget-btn"),
	optionalexpensesItem = document.querySelectorAll('.optionalexpenses-item'),
	chooseIncome = document.querySelector(".choose-income"),
	savings = document.querySelector("#savings"),
	chooseSum = document.querySelector(".choose-sum"),
	choosePercent = document.querySelector(".choose-percent"),
	yearValue = document.querySelector(".year-value"),
	monthValue = document.querySelector(".month-value"),
	dayValue = document.querySelector(".day-value");

let money, time;


let buttons = document.querySelectorAll('button');
buttons.forEach(function (item) {
	if (!item.classList.contains('start')) {
		item.disabled = true;
	}
});



startBtn.addEventListener('click', function () {
	time = prompt('Введите дату в формате YYYY-MM-DD');
	money = +prompt('Ваш бюджет на месяц?');

	while (isNaN(money) || money == "" || money == null) {
		money = +prompt('Ваш бюджет на месяц?');
	}
	appData.budget = money;
	appData.timeData = time;
	budgetValue.textContent = money.toFixed();

	yearValue.value = new Date(Date.parse(time)).getFullYear();
	monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
	dayValue.value = new Date(Date.parse(time)).getDate();

	buttons.forEach(function (item) {
		if (!item.classList.contains('start')) {
			item.disabled = false;
		}
	});
});


expensesItemBtn.addEventListener('click', function () {
	console.log(1);
	let sum = 0;
	for (let i = 0; i < expensesItems.length; i++) {
		let a = expensesItems[i].value;
		let b = expensesItems[++i].value;
		if ((typeof (a)) === 'string' && (typeof (b)) === 'string' && (typeof (a)) != null && (typeof (b)) != null && a != "" && b != "" && a.length < 50) {
			appData.expenses[a] = b;
			sum += +b;
			console.log(sum);
		} else {
			i--;
		}
	}
	expensesValue.textContent = sum;
});

optionalexpensesBtn.addEventListener('click', function () {
	optionalexpensesItem.forEach(function (item) {
		appData.optionalExpenses[item] = item.value;
		optionalexpensesValue.textContent += appData.optionalExpenses[item] + " ";
	})
});


countBudgetBtn.addEventListener('click', function () {
	if (appData.budget != undefined) {
		appData.moneyPerDay = ((appData.budget / 30) - +expensesValue.textContent).toFixed();
		daybudgetValue.textContent = appData.moneyPerDay;

		if (appData.moneyPerDay < 100) {
			levelValue.textContent = "Минимальный уровень достатка";
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
			levelValue.textContent = "Средний уровень достатка";
		} else if (appData.moneyPerDay > 2000) {
			levelValue.textContent = "Высокий уровень достатка";
		} else {
			levelValue.textContent = "Ошибка";
		}
	} else {
		daybudgetValue.textContent = "Произошла ошибка!"
	}
});


chooseIncome.addEventListener('input', function () {
	let items = chooseIncome.value;
	if (typeof (items) === 'string' && items != '' && items != null) {
		appData.income = items.split(', ');
	};
	incomeValue.textContent = appData.income;
});

savings.addEventListener('click', function () {
	if (appData.savings == true) {
		appData.savings = false;
	} else {
		appData.savings = true;
	}
});


chooseSum.addEventListener('input', function () {
	if (appData.savings == true) {
		let sum = +chooseSum.value;
		let percent = +choosePercent.value;
		appData.mouthIncome = sum / 100 / 12 * percent;
		appData.yearIncome = sum / 100 * percent;

		monthsavingsValue.textContent = appData.mouthIncome.toFixed(1);
		yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
	}

});

choosePercent.addEventListener('input', function () {
	if (appData.savings == true) {
		let sum = +chooseSum.value;
		let percent = +choosePercent.value;
		appData.mouthIncome = sum / 100 / 12 * percent;
		appData.yearIncome = sum / 100 * percent;

		monthsavingsValue.textContent = appData.mouthIncome.toFixed(1);
		yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
	}

});


let appData = {
	budget: money,
	timeData: time,
	expenses: {},
	optionalExpenses: {},
	income: [],
	savings: false,
};