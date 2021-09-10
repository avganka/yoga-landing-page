document.getElementById('start');
document.querySelector(".budget-value");
document.querySelector(".daybudget-value");
document.querySelector(".level-value");
document.querySelector(".expenses-value");
document.querySelector(".optionalexpenses-value");
document.querySelector(".income-value");
document.querySelector(".monthsavings-value");
document.querySelector(".yearsavings-value");
document.querySelectorAll('.expenses-item');
document.querySelector(".expenses-item-btn");
document.querySelector(".optionalexpenses-btn");
document.querySelector(".count-budget-btn");
document.querySelectorAll('.optionalexpenses-item');
document.querySelector(".choose-income");
document.querySelector("#savings");
document.querySelector(".choose-sum");
document.querySelector(".choose-percent");
document.querySelector(".year-value");
document.querySelector(".month-value");
document.querySelector(".day-value");

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