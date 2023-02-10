const emailInput = document.getElementById("email-input")
const passwordInput = document.getElementById("password-input")
const formLogin = document.getElementById("form-login")



////////////=== LOGGG INNNNNN 




console.log("test")

const fetchLogin = (items) =>
    fetch("/login", {
        method:"POST",
        headers: {
            "Content-Type":"Application/json"
        },
        body: JSON.stringify(items)
    })
    



const loginHandler =(e) => {
    e.preventDefault()
    let userInputs = {
        email: emailInput.value.trim(),
        password: passwordInput.value.trim()
    }

    console.log(userInputs)

    fetchLogin(userInputs)
}

formLogin.addEventListener("submit", loginHandler)