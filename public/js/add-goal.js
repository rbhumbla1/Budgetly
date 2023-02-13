const formNewGoal = document.getElementById('form-new-goal');


const newFormHandler = async (e) => {
    e.preventDefault();

  const category = document.getElementById('category').value.trim(); 
  const amount = document.getElementById('amount').value.trim(); 

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
    alert('Failed to add goal');
  }
}

formNewGoal.addEventListener('submit', newFormHandler);

