const formCreate = document.getElementById('form-create');

const signupForm = async (e) => {
  e.preventDefault();
  const firstName = document.getElementById('firstname-input').value.trim();

  const email = document.getElementById('email-input').value.trim();
  const password = document.getElementById('password-input').value.trim();

  console.log('test');

  const inputs = {
    name: firstName,
    email: email,
    password: password,
  };

  if (inputs) {
    const response = await fetch('/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(inputs),
    });

    if (response.ok) {


      // 30-39 conflict merge here (-Adena):
      //document.location.replace('/api/expenses/spending');
      document.location.replace('/api/budgets/goals');

        //NEEDS FIX,
        // WHEN SUBMIT CLICKED, IT SHOULD GO STRAIGHT TO PROFILE, INSTEAD IT GOES TO LOG IN PAGE

      //go to expense page when a new user signs up to capture their major expenses.
      document.location.replace('/expenses');

    } else {
      alert(response.statusText);
    }
  }
};

formCreate.addEventListener('submit', signupForm);
