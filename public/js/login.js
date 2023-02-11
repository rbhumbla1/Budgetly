const formLogin = document.getElementById('form-login');
const createBtn = document.querySelector('.create-account');

const loginHandler = async (e) => {
  e.preventDefault();

  const email = document.getElementById('email-input').value.trim();
  const password = document.getElementById('password-input').value.trim();

  //   let userInputs = {
  //     email: emailInput.value.trim(),
  //     password: passwordInput.value.trim(),
  //   };

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }

  ////////////=== LOGGG INNNNNN
};

// const signupForm = async (event) => {
//   event.preventDefault();

//   const name = document.querySelector('#name-signup').value.trim();
//   const email = document.querySelector('#email-signup').value.trim();
//   const password = document.querySelector('#password-signup').value.trim();

//   if (name && email && password) {
//     const response = await fetch('/api/users', {
//       method: 'POST',
//       body: JSON.stringify({ name, email, password }),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       alert(response.statusText);
//     }
//   }
// };



createBtn.addEventListener("click", ()=> {
  document.location.replace("/signup")
})

formLogin.addEventListener('submit', loginHandler);
