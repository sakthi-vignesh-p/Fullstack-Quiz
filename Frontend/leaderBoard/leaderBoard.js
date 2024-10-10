const table=document.getElementById('table')
const url = 'http://localhost:3000';

updateBoard()

function updateBoard()
{
      fetch(`${url}/getusers`)
      .then(res=>res.json())
      .then(data=>addToHtml(data))
}

function addToHtml(data)
{
     data.forEach(user=> {
        const tr=document.createElement('tr')
        tr.innerHTML=
       `  
           <td>${user.name}</td>
           <td>${user.totalAnswerd}</td>
           <td>${user.correctAnswers}</td>
           <td>${user.wrongAnswers}</td>
        ` 
        table.append(tr)
     });
   
   

}