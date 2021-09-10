'use strict';

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
};


function chooseExpenses() {
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
}
chooseExpenses();


function detectLevel() {
  if (appData.moneyPerDay < 100) {
    console.log("Минимальный уровень достатка");
  } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
    console.log("Средний уровень достатка");
  } else if (appData.moneyPerDay > 2000) {
    console.log("Высокий уровень достатка");
  } else {
    console.log("Ошибка");
  }
}
detectLevel();

function chooseOptExpenses() {
  for (let i = 1; i <= 3; i++) {
    let a = prompt("Статья необязательных расходов?", "");
    appData.optionalExpenses[i] = a;
  }
}
chooseOptExpenses()

function detectDayBudget() {
  appData.moneyPerDay = (appData.budget / 30).toFixed();
  alert(`Ежедневный бюджет: ${appData.moneyPerDay}`);
}
detectDayBudget();


function checkSavings() {
  if (appData.savings == true) {
    let save = +prompt("Какова сумма накоплений?", ""),
      percent = +prompt("Под какой процент?", "");

    appData.mouthIncome = save / 100 / 12 * percent;
    alert('Доход в месяц с вашего депозита: ' + appData.mouthIncome);
  }
}

checkSavings();