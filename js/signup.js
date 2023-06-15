//Selección del formulario de registro de usuarios mediante su ID
const signupForm = document.querySelector('#signupForm')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    //obtención de los valores ingresados por el usuario
    const name = document.querySelector('#name').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    //Se obtiene la lista de usuarios del localStorage y se almacena en la variable Users
    const Users = JSON.parse(localStorage.getItem('users')) || []
    const isUserRegistered = Users.find(user => user.email === email);
    //Si ya esta registrado lanza una alerta
    if (isUserRegistered) {
        Swal.fire({
            title: 'Usuario ya registrado',
            text: 'El usuario ya está registrado',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return;
    }
    //Si el correo electrónico no está registrado, se añade un nuevo objeto.
    Users.push({
        name: name,
        email: email,
        password: password
    });
    //Se actualiza la lista de usuarios en el localStorage convirtiendo el array en una cadena JSON
    localStorage.setItem('users', JSON.stringify(Users));
    Swal.fire({
        title: 'Registro Exitoso',
        text: '¡Tu registro ha sido exitoso!',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
    }).then(() => {
    //Luego del Registro exitoso se redirige al login
        window.location.href = 'index.html';
    });
})