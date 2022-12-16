const loginForm = document.getElementById('login');

function loginUsers(e){
    e.preventDefault();

    let email = e.target.email.value;
    let password = e.target.password.value;
 
    if(!email || !password){
        alert('All Fields Requireed');
        return;
    }

    let userObj = {
        email,
        password,
    };

    fetchAPI(userObj, 'users/login', 'POST').then((data) =>{
        console.log(data)
        if(data.message === "Login Success"){
            alert(data.message);
            setTimeout(() => {
                window.location.href = '../Dashboard/Dashboard.html';
            }, 1500);
        }
    });
}


loginForm.addEventListener('submit', loginUsers);