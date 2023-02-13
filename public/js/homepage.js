const logIn = document.querySelector(".loginbtn")
const create = document.querySelector(".createbtn")


logIn.addEventListener("click", ()=> {
    document.location.replace("/login")
})

create.addEventListener("click",()=> {
    document.location.replace("/signup")
})