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
      //go to expense page when a new user signs up to capture their major expenses.
      document.location.replace('/expenses');
    } else {
      alert(response.statusText);
    }
  }
};

formCreate.addEventListener('submit', signupForm);
