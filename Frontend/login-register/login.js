
const register=document.getElementById('register')
const login=document.getElementById('login')
const sideBar=document.getElementById('side-bar')
const url='http://localhost:3000'

//Change pages
const changeBtn=document.getElementById('change-btn')
changeBtn.addEventListener('click',(event)=>{
    change(event)
})


const changeBtn2=document.querySelectorAll('.change-btn')
changeBtn2.forEach(para=>{
    para.addEventListener('click',()=>{
        if(para.textContent=='Register')
        {
            register.style.display="inline-block";
            login.style.display="none";
           changeBtn.textContent="Login"
        }
        else
        {
            register.style.display="none";
            login.style.display="inline-block";
            changeBtn.textContent="Register"
        }
    })
})

function change(btn)
{
    if(btn.target.textContent==='Login')
    {
           register.style.display="none";
           login.style.display="inline-block";
           btn.target.textContent="Register"
    }
    else
    {
        register.style.display="inline-block";
        login.style.display="none";
        btn.target.textContent="Login"
    }
}

const totalContainer=document.getElementById('container')//total container

//register
const registerForm = document.getElementById('register-form');

if(registerForm){
registerForm.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const formData = new FormData(registerForm); 
    let data = {};
   
    formData.forEach((value, key) => {
        data[key] = value;  
    })
       
        if(!verifyUserData(data)){return}//verification for user name and password
        regist(data)
});
}


function verifyUserData(data)
{      let ok=true;
       
       if(data.name.length <5 || data.name.length > 12)
       {
          setErrors("User name must be in 5-12 charecters",'name')  
          ok=false;
       }
       else
       {  
           removeErrors('name')
       }
       if(data.password.length < 8)
       {
          setErrors("Password must be in 8 charecters",'psw')
          ok=false;
       } 
        else
       {
            removeErrors('psw')
       }
       if(data.password !=data.confirmpassword)
       {
           setErrors("Password does't match",'cpw')
           ok=false;
       } 
        else
        {
            removeErrors('cpw')

        }
        return ok;
}

function setErrors(message,el)
{  
     let box;
     let errBox;
    switch(el)
    {
         case 'cpw':  //cpw means confirm password
         box=document.getElementById('confirm-password').parentElement;
         errBox=box.querySelector('.err')
         errBox.textContent=message;
         break;

         case 'psw': //psw means password
         box=document.getElementById('password').parentElement;
         errBox=box.querySelector('.err')
         errBox.textContent=message;
         break;

         case 'name': //User name errors
         box=document.getElementById('name').parentElement;
         errBox=box.querySelector('.err')
         errBox.textContent=message;
         break;

         case 'l-name'://login user name error
         box=document.getElementById('login-name').parentElement;
         errBox=box.querySelector('.err')
         errBox.textContent=message;
         break;

         case 'l-psw'://login psw means login password
         box=document.getElementById('login-password').parentElement;
         errBox=box.querySelector('.err')
         errBox.textContent=message;
    };  
    }

function removeErrors(el)
{   let box;
    let errBox;
    switch(el)
    {
         case 'cpw':  //cpw means confirm password
         box=document.getElementById('confirm-password').parentElement;
         errBox=box.querySelector('.err')
         errBox.textContent='';
         break;

         case 'psw': //psw means password
         box=document.getElementById('password').parentElement;
         errBox=box.querySelector('.err')
         errBox.textContent='';
         break;

         case 'name': //User name errors
         box=document.getElementById('name').parentElement;
         errBox=box.querySelector('.err')
         errBox.textContent='';
         break;
         
         case 'l-name'://login user name error
         box=document.getElementById('login-name').parentElement;
         errBox=box.querySelector('.err')
         errBox.textContent='';
         break;

         case 'l-psw'://login psw means login password
         box=document.getElementById('login-password').parentElement;
         errBox=box.querySelector('.err')
         errBox.textContent='';
         
    };  
}

function regist(datas)
{
    fetch(`${url}/register`,{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(datas)
    })
    .then(res=>res.json())
    .then(data=>reloadContent(data))   
}


//Login
const loginForm = document.getElementById('login-form');

if(loginForm){
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();  

    const formData = new FormData(loginForm);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    log(data);  
});
}

function log(data) {
    fetch(`${url}/login/${data.name}/${data.password}`) 
    .then(res=>res.json())
    .then(data=>reloadContent(data))  
}


function reloadContent(data)
{    
    let message=data.msg;
    if(message==="Incorrect Password")
    {
          setErrors(message,'l-psw')//l-name means login  name
    }else{removeErrors('l-psw')}
    if(message==='Cannot find user')
    {
          setErrors(message,'l-name')//l-psw means login password
    }else{removeErrors('l-name')}
    if(message==="User name already exist")
        {
            setErrors(message,'name')
        }
        else
        {
            removeErrors('name')
        }
    if(!message)
    {
        window.localStorage.setItem('User',data._id)
        window.location.href='../index.html'
    }
}
//For mobile Styles



