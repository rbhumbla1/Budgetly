const formNewGoal = document.getElementById('form-new-goal');
const addGoal = document.getElementById('inlineCheckbox1');
const updateGoal = document.getElementById('inlineCheckbox2');
const deleteGoal = document.getElementById('inlineCheckbox3');
const amtLabel = document.getElementById("amt-label");
const amtDiv = document.getElementById("amt");
const clickButton = document.getElementById('clickButton');

// For adding a new goal budget given a budget category and amount for the goal
//For a new goal, fund_remaining will be equal to the initial amount
const addNewGoal = async (category, amount, fund_remaining) => {
  const response = await fetch(`/api/budgets`, {
    method: 'POST',
    body: JSON.stringify({
      category,
      amount,
      fund_remaining,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/api/budgets/goals');
  } else {
    console.log(response);
    alert('Failed to add the goal. If goal for this category already exists, use update action to change the amount.');
  }
}

//For updating an existing goal for a budget category with new amount
const updateExistingGoal = async (category, amount) => {

  const response = await fetch(`/api/budgets/${category}`, {
    method: 'PUT',
    body: JSON.stringify({
      amount,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/api/budgets/goals');
  } else {
    alert('Failed to update a non-existing goal.  Please add a goal for this category.');
  }
}

//For deleting a goal by clickingonthe delte button in the row
const delBtn = document.querySelectorAll('.del-btn')

for (let i = 0; i < delBtn.length; i++) {
  delBtn[i].addEventListener("click", async (e) => {
    let currentCategory = e.target.getAttribute('data-id')

    console.log(currentCategory)
    const response = await fetch(`/api/budgets/${currentCategory}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/api/budgets/goals');
    } else {
      alert('Failed to delete the goal.');
    }
  })
}


//Handler for submit button
const newFormHandler = async (e) => {
  e.preventDefault();

  const category = document.getElementById('category').value.trim();
  const amount = document.getElementById('amount').value.trim();


  if (addGoal.checked) {
    addNewGoal(category, amount, amount);
  } else if (updateGoal.checked) {
    updateExistingGoal(category, amount);
  } else {
    alert("Please select one of the actions before clicking the Submit button.");
  }

};

//event listener for submit button for the form
clickButton.addEventListener('click', newFormHandler);

//Clicking on Expense button in nav bar will take the user to expense page
const expense = document.getElementById("expense-button")

expense.addEventListener("click", async () => {
  // document.location.replace('/api/expenses/spending');
  document.location.replace('/expenses');

})



