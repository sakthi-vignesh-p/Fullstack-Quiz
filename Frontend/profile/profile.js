url='http://localhost:3000'
const userName=document.getElementById("name")
const aboutUser=document.getElementById('about')
const easyAnswers=document.getElementById('easy-answers')
const mediumAnswers=document.getElementById('medium-answers')
const hardAnswers=document.getElementById('hard-answers')
const veryHardAnswers=document.getElementById('very-hard-answers')

const userId=localStorage.getItem('User')
loadUser(userId)
function loadUser(id)
{
    fetch(`${url}/login?id=${id}`)
    .then(res=>res.json())
    .then(data=>displayUserDetails(data))
}

function displayUserDetails(data)
{  
    userName.textContent=data.name;
    easyAnswers.textContent=data.correctAnswers;
    mediumAnswers.textContent=data.correctAnswers;
    hardAnswers.textContent=data.correctAnswers;
    updateTable(data)
}

//Table 

const category=document.querySelectorAll('.category')
const td=category[1].querySelectorAll('td')

function updateTable(data)
{  console.log(data)
    for(let i=0;i<category.length;i++)
    {
       const td=category[i].querySelectorAll('td')                          
       for(let j=1;j<=4;j++)
       { 
        switch(j)
           {    
            case 1:
                td[j].textContent=data.Category[i][j-1].easy;
                break;
              case 2:
                td[j].textContent=data.Category[i][j-1].medium;
                break;
              case 3:
                td[j].textContent=data.Category[i][j-1].hard;
                break;
              case 4:
                td[j].textContent=data.Category[i][j-1].veryHard;
                break;    
           }
          
       }
       td[0].textContent=(td[1].textContent*1)+
                         (td[2].textContent*1)+
                         (td[3].textContent*1) 
      
    }
}