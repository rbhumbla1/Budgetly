const formNewGoal = document.getElementById('form-new-goal');
const addGoal = document.getElementById('inlineCheckbox1');
const updateGoal = document.getElementById('inlineCheckbox2');
const deleteGoal = document.getElementById('inlineCheckbox3');
const amtLabel = document.getElementById("amt-label");
const amtDiv = document.getElementById("amt");

const addNewGoal = async (category, amount) => {
  const response = await fetch(`/api/budgets`, {
    method: 'POST',
    body: JSON.stringify({
      category,
      amount,
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
    alert('Failed to update a non-existing code.  Please add a goal for this category.');
  }
}

const deleteExistingGoal = async (category, amount) => {
  
  const response = await fetch(`/api/budgets/${category}`, {
    method: 'DELETE',
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
    alert('Failed to delete the goal.');
  }
}


const newFormHandler = async (e) => {
  e.preventDefault();

  const category = document.getElementById('category').value.trim();
  const amount = document.getElementById('amount').value.trim();

  if (addGoal.checked) {
    addNewGoal(category, amount);
  } else if (updateGoal.checked) {
    updateExistingGoal(category, amount);
  } else {
    alert("Please select one of the actions before clicking the Submit button.");
  }
}

formNewGoal.addEventListener('submit', newFormHandler);


const delBtn = document.querySelectorAll('.del-btn')

for(let i = 0; i < delBtn.length; i++) {
  delBtn[i].addEventListener("click", async (e)=>{
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



