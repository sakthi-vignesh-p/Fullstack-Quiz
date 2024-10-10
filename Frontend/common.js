let navBar;
let sideBar;
document.addEventListener('DOMContentLoaded',()=>{
   navBar=document.getElementById('navbar-cont')
   sideBar=document.getElementById('nav-popup-cont')
    addNavigation()
    if(localStorage.getItem('User'))
    {
        changeNavContent()
    }
})


function changeNavContent()
{
const profile = document.querySelectorAll('.profile');
const login = document.querySelectorAll('.login');
const logout = document.querySelectorAll('.logout');

profile.forEach(el => {
    el.style.display = 'inline-block';
});
login.forEach(el => {
    el.style.display = 'none';
});
logout.forEach(el => {
    el.addEventListener('click', () => {
        if (confirm("You want to logout")) {
            localStorage.removeItem('User');
            window.location.href = '/login-register/login.html';
        }
    });
    el.style.display = 'inline-block';
});
}


function addNavigation()
{
      navBar.innerHTML=
      `<div id="title">
            <h1>Quiz</h1>
         </div>
         <button id="nav-popup-open-btn" onclick="openMenu()">=</button>
            <div id="nav">
                 <p><a href="../index.html">Home</a></p>
                 <p><a href="../leaderBoard/leaderBoard.html">LearderBoard</a></p>
                 <p class="login"><a href="../login-register/login.html">Login</a></p>
                 <p class="logout">logout</p>
                 <p><a href="../About/About.html">About</a></p>
                 <p class="profile"><a href="../profile/profile.html">profile</a></p>
                 <p>Dark</p>
            </div>`
    
            sideBar.innerHTML=
      `<div id="nav-popup">
        <button id="nav-popup-close-btn" onclick="closeMenu()">X</button>
        <p><a href="../index.html">Home</a></p>
        <p class="login"><a href="../login-register/login.html">Login</a></p>
        <p><a href="../leaderBoard/leaderBoard.html">LearderBoard</a></p>
        <p class="logout">logout</p>
        <p><a href="../About/About.html">About</a></p>
        <p class="profile"><a href="../profile/profile.html">profile</a></p>
         </div>`
}

// Popup handling
function  openMenu()
{
    sideBar.style.display = 'inline-block';
}

function closeMenu()
{
    sideBar.style.display = 'none';
}