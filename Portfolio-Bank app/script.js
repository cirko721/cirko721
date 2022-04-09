"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const displayMovements = function (movements, sort = false) {
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  containerMovements.innerHTML = "";
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// CREATING USERNAMES-
const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUserName(accounts);

// SUMMARY VALUES-
const summaryValue = function (movements) {
  const calculationIn = movements
    .filter((mov) => mov > 0)
    .reduce((accu, curr) => accu + curr, 0);
  const calculationOut = movements
    .filter((mov) => mov < 0)
    .reduce((accu, curr) => accu + curr, 0);
  const calculationInterest = movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * 1.2) / 100)
    .filter((mov) => mov >= 1)
    .reduce((accu, int) => accu + int, 0);
  labelSumIn.textContent = `${calculationIn}€`;
  labelSumOut.textContent = `${calculationOut}€`;
  labelSumInterest.textContent = `${calculationInterest}€`;
};

// GLOBAL BALANCE-
const globalBalance = function (acc) {
  acc.balance = acc.movements.reduce((accu, curr) => accu + curr, 0);
  return (labelBalance.textContent = `${acc.balance}€`);
};

// EVENT HANDLER LOGIN-
let currentAcc;

const updateUI = function (acc) {
  displayMovements(acc.movements);
  summaryValue(acc.movements);
  globalBalance(acc);
};

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAcc = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAcc);
  if (currentAcc?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `Welcome back, ${
      currentAcc.owner.split(" ")[0]
    }`;
    updateUI(currentAcc);
  }
  inputLoginUsername.value = inputLoginPin.value = "";
  inputLoginPin.value.blur;
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferTo.value = inputTransferAmount.value = "";
  inputTransferAmount.value.blur;
  if (
    amount > 0 &&
    currentAcc.balance >= amount &&
    recieverAcc &&
    recieverAcc?.username !== currentAcc.username
  ) {
    currentAcc.movements.push(-amount);
    recieverAcc.movements.push(amount);
    updateUI(currentAcc);
  }
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAcc.username &&
    Number(inputClosePin.value) === currentAcc.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAcc.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = "Log in to get started";
  }
  inputCloseUsername.value = inputClosePin.value = "";
  inputClosePin.value.blur;
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0) {
    currentAcc.movements.push(amount);
    updateUI(currentAcc);
  }
  inputLoanAmount.value = "";
  inputLoanAmount.value.blur;
});

let sorted = false;
btnSort.addEventListener("click", function () {
  displayMovements(currentAcc.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
// let arr = ["a", "b", "c", "d", "e"];
// let arr2 = ["j", "k", "l", "m", "n"];
// console.log(arr);
// ==============================================================>
// DOESN'T MUTATE ARR-
// console.log(arr.slice(1,4));
// const letters = arr.concat(arr2)
// console.log(letters)

// ==============================================================>
// IS GONNA MUTATE ARR-
// arr.splice(1,4);
// console.log(arr)
// arr.reverse();
// console.log(arr);

// ARRAY .at() METHOD-
// let abs = [22, 45, 66, 78];
// console.log(abs.at(-1));
// console.log("MILOS".at(2))

// Looping over array with forEach METHOD-
// movements.forEach(function (transakcija, number) {
//   if (transakcija > 0)
//     console.log(
//       `TRANSACTION ${number + 1}: Uplatili ste ${transakcija} dinara na racun!`
//     );
//   else
//     console.log(
//       `TRANSACTION ${number + 1}: Podigli ste ${Math.abs(
//         transakcija
//       )} dinara sa racuna!`
//     );
// });

//   forEach METHOD with MAPS-
// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

//  forEach METHOD with SET-
// const zigulu = new Set([
//   "Bank",
//   "help",
//   "Bank",
//   "Srbija",
//   "Hrvatska",
//   "help",
//   "Bank",
// ]);
// console.log(zigulu)
// zigulu.forEach(function(value, _, map) {
//   console.log(value)
// });

// ===================CODING CHALLENGE=====================>
// const jullieDogs = [9, 16, 6, 8, 3];
// const kateDogs = [10, 5, 6, 1, 4];
// const checkDogs = function (arr1, arr2) {
//   let shallowCopyArr1 = arr1.splice(1);
//   shallowCopyArr1.splice(-2);
//   const arrBoth = shallowCopyArr1.concat(arr2);
//   console.log(arrBoth);
//   arrBoth.forEach(function (value, i) {
//     if (value >= 3)
//       console.log(
//         `Dog number ${i + 1} is an adult, and is ${value} years old 🐕‍🦺`
//       );
//     else console.log(`Dog number ${i + 1} is still a puppy 🐶`);
//   });
// };
// checkDogs(jullieDogs, kateDogs);
// =======================================================>

// const eurToUsd = 1.1;
// const converter = movements.map((mov) => Math.trunc(mov * eurToUsd));
// console.log(converter);

// const withdrawals = movements.filter((mov) => mov < 0);
// console.log(movements);
// console.log(withdrawals);

// const balance = movements.reduce((accu , curr, i, arr) => accu + curr, 0);
// console.log(balance)

// MAXIMUM VALUE-
// const maxValue = movements.reduce(function(accu, curr) {
//     if(accu > curr) return accu;
//     else return curr;
//   }, movements[0]);
// console.log(maxValue);

// ====================CODING CHALLENGE=========================>
// const calcAverageHumanAge = function (arr) {
//   console.log(arr);
//   const humanAge = arr.map((dogAges) =>
//     dogAges <= 2 ? dogAges * 2 : 16 + dogAges * 4
//   );
//   console.log(humanAge);
//   const dogsUntil18 = humanAge.filter((age) => age >= 18);
//   console.log(dogsUntil18);
//   const avg =
//     dogsUntil18.reduce((accu, crr) => accu + crr, 0) / dogsUntil18.length;
//   console.log(avg);
// };
// console.log("-----TEST DATA 1-----");
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// ==============================CODING CHALLENGE===============>
// const calcAverageHuman = (array) => {
//   return array
//     .map((dogAges) => (dogAges <= 2 ? dogAges * 2 : 16 + dogAges * 4))
//     .filter((age) => age >= 18)
//     .reduce((accu, crr, i, arr) => accu + crr / arr.length, 0);
// }
// console.log(calcAverageHuman([16, 6, 10, 5, 6, 1, 4]));
// =============================================================>

//  FIND METHOD-
// console.log(movements.find(mov => mov > 0));
console.log(accounts);
// const account = accounts.find(acc => acc.owner === "Jessica Davis");
// console.log(account);
// for(const acc of accounts) {
//   if(acc.owner === "Sarah Smith") console.log(acc)
// }

// // FLAT METHOD-
// const arr = accounts
//   .map((acc) => acc.movements)
//   .flat()
//   .reduce((accu, curr) => accu + curr, 0);
// console.log(arr);

// // FLATMAP METHOD-
// const arr2 = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce((accu, curr) => accu + curr, 0);
// console.log(arr2);

// ====================CODING CHALLENGE=======================>
// const dogs = [
//   { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
//   { weight: 8, curFood: 200, owners: ["Matilda"] },
//   { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
//   { weight: 32, curFood: 340, owners: ["Michael"] },
// ];

// const calcPortion = dogs.forEach((dog) => {
//   const recFood = dog.weight ** 0.75 * 28;
//   dog.recFood = Math.trunc(recFood);
// });
// console.log(dogs);

// const findingDog = dogs.find((dog) => dog.owners.includes("Sarah"));
// console.log(
//   `Sarah's dog eating too ${
//     findingDog.curFood > findingDog.recFood ? "much" : "little"
//   }`
// );

// const ownersEatTooMuch = dogs
//   .filter((dog) => dog.curFood > dog.recFood)
//   .flatMap((dog) => dog.owners);
// console.log(ownersEatTooMuch);

// const ownersEatTooLittle = dogs
//   .filter((dog) => dog.curFood < dog.recFood)
//   .flatMap((dog) => dog.owners);
// console.log(ownersEatTooLittle);

// console.log(`${ownersEatTooMuch.join("'s and ")} dogs eating too much!`);
// console.log(`${ownersEatTooLittle.join("'s and ")} dogs eating too little!`);

// console.log(dogs.some(dog => dog.curFood === dog.recFood));

// const dogEatOkay = dog => dog.curFood > (dog.recFood * 0.90) && dog.curFood < (dog.recFood * 
//   1.10);

// console.log(dogs.some(dogEatOkay));

// console.log(dogs.filter(dogEatOkay));

// const dogSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
// console.log(dogSorted); 