const addNewExp = document.getElementById('saveButton');
const savedExpenses = document.getElementById('savedExpenses');

var cardBlockDiv = '';
var cardTextDiv = '';
var dateEl = '';
var catEl = '';
var noteEl = '';
var priceEl = '';


// For adding a new expense given an expense category and amount for the expense
const addNewExpense = async (category, note, amount_spent) => {

  const response = await fetch(`/api/expenses`, {
    method: 'POST',
    body: JSON.stringify({
      category,
      note,
      amount_spent,
      // date,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/expenses');
  } else {
    alert('Failed to add expense. Make sure you select a category.');
  }
};

//Event handler
const newFormHandler = async (e) => {
  e.preventDefault();

     //Display today's date
     var today = new Date();
     var dd = String(today.getDate()).padStart(2, '0');
     var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0
     var yyyy = today.getFullYear();
     today = mm + '/' + dd + '/' + yyyy;

     console.log("IN newForm");
 
     const savedExpenses = JSON.parse(localStorage.getItem("savedExpenses")) || [];
     const expenseSums = JSON.parse(localStorage.getItem("expenseSums")) || [];
 
     if(savedExpenses.length == 50){
         savedExpenses.shift();
     }
 
     const category = document.getElementById('category').value.trim();
     const note = document.getElementById('note').value.trim();
     const amount = document.getElementById('amount').value.trim();
     const date = today;

    addNewExpense(category, note, amount, date);
};

addNewExp.addEventListener('click', newFormHandler);

//Clicking on Goals button will take the user to expense page
const goals = document.getElementById("goals-button")

goals.addEventListener("click",  async ()=> {
    const response = await fetch("/api/budgets/goals", {
        method:'GET',
        header: {
             'Content-Type': 'application/json' 
        }
    })
    if (response.ok) {
      document.location.replace('/api/budgets/goals');
      } else {
        alert(response.statusText);
      }
})


