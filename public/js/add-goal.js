const formNewGoal = document.getElementById('form-new-goal');
const addGoal = document.getElementById('inlineCheckbox1');
const updateGoal = document.getElementById('inlineCheckbox2');
const deleteGoal = document.getElementById('inlineCheckbox3');

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
    alert('Failed to add the goal.');
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
    alert('Failed to update the  goal.');
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
  } else if (deleteGoal.checked) {
    deleteExistingGoal(category, amount);
  }else{
    alert("Please select one of the actions before clicking the Submit button.");
  }
}

formNewGoal.addEventListener('submit', newFormHandler);

