const addNewExpense = document.getElementById('saveButton');
const savedExpenses = document.getElementById('savedExpenses');

var cardBlockDiv = '';
var cardTextDiv = '';
var dateEl = '';
var catEl = '';
var noteEl = '';
var priceEl = '';

// Display list of expenses
const generateExpenses = async (categoryChoice, note, amount, date) => {
    savedExpenses.textContent = [];
    const expenses = JSON.parse(localStorage.getItem("savedExpenses")) || [];
    
    for (i = 0; i < expenses.length; i++){
        const newExpense = document.createElement("div");
        const expenseList = document.createElement("ul");
        const newDate = document.createElement("li");
        const newCat = document.createElement("li");
        const newPrice = document.createElement("li");
        const newNote = document.createElement("p");

        newExpense.setAttribute('class', 'expenseItem');
        expenseList.setAttribute('class', 'expenseList');
        newNote.setAttribute('class', 'noteItem');

        newDate.append(expenses[i].date);
        newCat.append(expenses[i].category);
        newPrice.append('$'+expenses[i].amount);
        newNote.append(expenses[i].note);

        expenseList.append(newDate);
        expenseList.append(newCat);
        expenseList.append(newPrice);
        newExpense.append(expenseList);
        newExpense.append(newNote);

        savedExpenses.appendChild(newExpense);
    }
};

let foodSum = 0;
let houseSum = 0;
let personalSum = 0;
let savingsSum = 0;
let transportationSum = 0;


//  Save expense input to localStorage
const saveExpenses = async (event) => {
    event.preventDefault();
  
    //Display today's date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    // console.log(today);

    const savedExpenses = JSON.parse(localStorage.getItem("savedExpenses")) || [];
    const expenseSums = JSON.parse(localStorage.getItem("expenseSums")) || [];

    if(savedExpenses.length == 50){
        savedExpenses.shift();
    }

    const category = document.getElementById('category').value.trim();
    const note = document.getElementById('note').value.trim();
    const amount = document.getElementById('amount').value.trim();
    const date = today;

    let price = parseInt(amount);

    if (category == 1){
        console.log('Food')
        categoryChoice = 'Food'
        foodSum += price
        console.log(foodSum)
      }else if (category == 2) {
        console.log('House Loan')
        categoryChoice = 'House Loan'
        houseSum += price
        console.log(houseSum)
      }else if (category == 3) {
        console.log('Personal')
        categoryChoice = 'Personal'
        personalSum += price
        console.log(personalSum)
      }else if (category == 4) {
        console.log('Savings')
        categoryChoice = 'Savings'
        savingsSum += price
        console.log(categoryChoice)
      }else if (category == 5) {
        console.log('Transportation')
        categoryChoice = 'Transportation'
        transportationSum += price
        console.log(transportationSum)
      }else {
        console.log("No category chosen")
        categoryChoice = 'No category chosen'
      }

    const thisExpense = {
        category : categoryChoice,
        note: note,
        amount: amount,
        date: date,
    };

    const sumOfCategories = {
      food: foodSum,
      house: houseSum,
      personal: personalSum,
      savings: savingsSum,
      transportation: transportationSum,
    }
    console.log(sumOfCategories)

    savedExpenses.push(thisExpense);

    localStorage.setItem("savedExpenses", JSON.stringify(savedExpenses));
    localStorage.setItem("expenseSums", JSON.stringify(sumOfCategories));

    generateExpenses();
    // console.log(thisExpense)
};


addNewExpense.addEventListener('click', saveExpenses);