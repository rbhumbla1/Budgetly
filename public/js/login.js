const formLogin = document.getElementById('form-login');
const createBtn = document.querySelector('.create-account');
const incorrect = document.getElementById('incorrect');


const loginHandler = async (e) => {
  e.preventDefault();

  const email = document.getElementById('email-input').value.trim();
  const password = document.getElementById('password-input').value.trim();


  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      //go to the dashboard when a user logs in
      document.location.replace('/api/budgets/goals');
    } else {
      incorrect.innerHTML = 'Incorrect Email/Password';
    }
  }

};


formLogin.addEventListener('submit', loginHandler);



