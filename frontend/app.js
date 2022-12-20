const API = 'http://localhost:3000/api/v1';

async function fetchAPI(data, endpoint, method){
    try{
        const response = await fetch(`${API}/${endpoint}`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(data),
        });
        
        const result = await response.json();
        return result;
    }catch(error){
        console.log(error)
    }
}

// sidebar
const sideMenu = document.getElementById('sidemenu')

function openMenu(){
   sideMenu.style.right = '0'
}

function closeMenu(){
   sideMenu.style.right = '-200px'
}