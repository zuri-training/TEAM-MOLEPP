const registerForm = document.getElementById('register');

function registerUsers(e){
    e.preventDefault();

    let username = e.target.username.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
 
    if(!username || !email || !password){
        alert('All Fields Requireed');
        return;
    }

    let userObj = {
        username,
        email,
        password,
    };


    fetchAPI(userObj, 'users/register', 'POST').then((data) =>{
        console.log(data);
    
        if(data.message === "Registered successfully"){
            alert(data.message);
            setTimeout(() => {
                window.location.href = '../Login Page/login.html';
            }, 1500);
        }
    });
}


registerForm.addEventListener('submit', registerUsers);