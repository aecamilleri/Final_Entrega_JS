//Chequea existencia de usuario en el LocalStorage
const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const Users = JSON.parse(localStorage.getItem('users')) || [];
  const validUser = Users.find((user) => user.email === email && user.password === password);
  if (!validUser) {
    Swal.fire({
      title: "Nombre usuario y/o una contraseña incorrecta",
    });
  } else {
    Swal.fire({
      title: `Bienvenido ${validUser.name}`,
      icon: "success",
      showConfirmButton: false,
      timer: 3000
    }).then(() => {
      localStorage.setItem('login_success', JSON.stringify(validUser));
      window.location.href = 'calculator.html';
    });
  }
});

//"Recordar email" Checkbox usando localStorage
const rmCheck = document.getElementById("rememberMe"),
    emailInput = document.getElementById("email");

if (localStorage.checkbox && localStorage.checkbox !== "") {
  rmCheck.setAttribute("checked", "checked");
  emailInput.value = localStorage.username;
} else {
  rmCheck.removeAttribute("checked");
  emailInput.value = "";
}

function lsRememberMe() {
  if (rmCheck.checked && emailInput.value !== "") {
    localStorage.username = emailInput.value;
    localStorage.checkbox = rmCheck.value;
  } else {
    localStorage.username = "";
    localStorage.checkbox = "";
  }
}