let startBtn = document.getElementById('start'),
  budgetValue = document.querySelector(".budget-value"),
  daybudgetValue = document.querySelector(".daybudget-value"),
  levelValue = document.querySelector(".level-value"),
  expensesValue = document.querySelector(".expenses-value"),
  optionalexpensesValue = document.querySelector(".optionalexpenses-value"),
  incomeValue = document.querySelector(".income-value"),
  monthsavingsValue = document.querySelector(".monthsavings-value"),
  yearsavingsValue = document.querySelector(".yearsavings-value"),
  expensesItem = document.querySelectorAll('.expenses-item'),
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

function start() {
  money = +prompt('Ваш бюджет на месяц?');
  time = prompt('Введите дату в формате YYYY-MM-DD');

  while (isNaN(money) || money == "" || money == null) {
    money = +prompt('Ваш бюджет на месяц?');
  }

}

start();

let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false,
  chooseExpenses: function () {
    for (let i = 1; i <= 2; i++) {
      let a = prompt("Введите обязательную статью расходов в этом месяце", "");
      let b = prompt("Во сколько обойдется?", "");
      if ((typeof (a)) === 'string' && (typeof (b)) === 'string' && (typeof (a)) != null &&
        (typeof (b)) != null && a != "" && b != "" && a.length < 50) {
        console.log('done');
        appData.expenses[a] = b;
      } else {
        i--;
      }
    }
  },
  detectDayBudget: function () {
    appData.moneyPerDay = (appData.budget / 30).toFixed();
    alert(`Ежедневный бюджет: ${appData.moneyPerDay}`);
  },
  detectLevel: function () {
    if (appData.moneyPerDay < 100) {
      console.log("Минимальный уровень достатка");
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
      console.log("Средний уровень достатка");
    } else if (appData.moneyPerDay > 2000) {
      console.log("Высокий уровень достатка");
    } else {
      console.log("Ошибка");
    }
  },
  checkSavings: function () {
    if (appData.savings == true) {
      let save = +prompt("Какова сумма накоплений?", ""),
        percent = +prompt("Под какой процент?", "");

      appData.mouthIncome = save / 100 / 12 * percent;
      alert('Доход в месяц с вашего депозита: ' + appData.mouthIncome);
    }
  },
  chooseOptExpenses: function () {
    for (let i = 1; i <= 3; i++) {
      let a = prompt("Статья необязательных расходов?", "");
      appData.optionalExpenses[i] = a;
    }
  },
  chooseIncome: function () {
    let items = prompt('Что принесет дополнительный доход? (Перечислите чере запятую)', "");
    if (typeof (items) === 'string' && items != '' && items != null) {
      appData.income = items.split(', ');
      appData.income.push(prompt('Может что-то еще?)', ""));
      appData.income.sort();
    };
    appData.income.forEach(function (item, index) {
      alert("Способы доп. заработка: " + (index + 1) + " - " + item);
    });
  }
};

for (const key in appData) {
  console.log("Наша программа включает в себя данные: " + key + " - " + appData[key]);
}