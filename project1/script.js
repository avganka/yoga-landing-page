'use strict';

let money = +prompt('Ваш бюджет на месяц?'),
  time = prompt('Введите дату в формате YYYY-MM-DD'),
  appData = {
    moneyData: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
  };

for (let i = 1; i <= 2; i++) {
  let znach = prompt("Введите обязательную статью расходов в этом месяце");
  let sum = prompt("Во сколько обойдется?");
  appData.expenses[znach] = sum;
}

alert(appData.moneyData / 30);