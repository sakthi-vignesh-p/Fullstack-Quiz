const type=document.getElementById('type')
 const question=document.getElementById('question')
 const a=document.getElementById('A')
 const b=document.getElementById('B')
 const c=document.getElementById('C')
 const d=document.getElementById('D')
 const difficulty=document.getElementById('difficulty')
const answer=document.getElementById('answer')

function setData()
{


const q = [
    {
      type: 'general',
      question: 'What is the smallest ocean in the world?',
      options: ['Indian Ocean', 'Pacific Ocean', 'Atlantic Ocean', 'Arctic Ocean'],
      difficulty: 'easy',
      Answer: 'D'
    },
    {
      type: 'general',
      question: 'How many planets are there in the solar system?',
      options: ['7', '8', '9', '10'],
      difficulty: 'easy',
      Answer: 'B'
    },
    {
      type: 'general',
      question: 'What do pandas primarily eat?',
      options: ['Bamboo', 'Leaves', 'Grass', 'Fruits'],
      difficulty: 'easy',
      Answer: 'A'
    },
    {
      type: 'general',
      question: 'What is the name of the fairy in Peter Pan?',
      options: ['Tinker Bell', 'Cinderella', 'Wendy', 'Aurora'],
      difficulty: 'easy',
      Answer: 'A'
    },
    {
      type: 'general',
      question: 'How many wings does a bee have?',
      options: ['2', '4', '6', '8'],
      difficulty: 'easy',
      Answer: 'B'
    },
    {
      type: 'general',
      question: 'What is the hardest natural substance on Earth?',
      options: ['Gold', 'Diamond', 'Iron', 'Silver'],
      difficulty: 'easy',
      Answer: 'B'
    },
    {
      type: 'general',
      question: 'How many teeth does a human adult typically have?',
      options: ['28', '30', '32', '36'],
      difficulty: 'easy',
      Answer: 'C'
    },
    {
      type: 'general',
      question: 'What is the name of the longest river in the world?',
      options: ['Amazon River', 'Nile River', 'Yangtze River', 'Mississippi River'],
      difficulty: 'easy',
      Answer: 'B'
    },
    {
      type: 'general',
      question: 'Which animal is known as the Ship of the Desert?',
      options: ['Camel', 'Horse', 'Elephant', 'Llama'],
      difficulty: 'easy',
      Answer: 'A'
    },
    {
      type: 'general',
      question: 'What is the capital of Spain?',
      options: ['Madrid', 'Barcelona', 'Seville', 'Valencia'],
      difficulty: 'easy',
      Answer: 'A'
    },
    {
      type: 'general',
      question: 'How many continents are there on Earth?',
      options: ['5', '6', '7', '8'],
      difficulty: 'easy',
      Answer: 'C'
    },
    {
      type: 'general',
      question: 'What is the currency of the United Kingdom?',
      options: ['Euro', 'Dollar', 'Pound', 'Yen'],
      difficulty: 'easy',
      Answer: 'C'
    },
    {
      type: 'general',
      question: 'Which country is home to the kangaroo?',
      options: ['Australia', 'USA', 'India', 'Brazil'],
      difficulty: 'easy',
      Answer: 'A'
    },
    {
      type: 'general',
      question: 'How many grams are there in a kilogram?',
      options: ['500', '1000', '1500', '2000'],
      difficulty: 'easy',
      Answer: 'B'
    },
    {
      type: 'general',
      question: 'Who invented the telephone?',
      options: ['Thomas Edison', 'Nikola Tesla', 'Alexander Graham Bell', 'Albert Einstein'],
      difficulty: 'easy',
      Answer: 'C'
    },
    {
      type: 'general',
      question: 'Which fruit is famous for keeping the doctor away?',
      options: ['Banana', 'Apple', 'Orange', 'Pineapple'],
      difficulty: 'easy',
      Answer: 'B'
    },
    {
      type: 'general',
      question: 'What is the tallest mountain in the world?',
      options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Makalu'],
      difficulty: 'easy',
      Answer: 'A'
    },
    {
      type: 'general',
      question: 'Which is the closest star to Earth?',
      options: ['Sirius', 'Alpha Centauri', 'Proxima Centauri', 'Sun'],
      difficulty: 'easy',
      Answer: 'D'
    },
    {
      type: 'general',
      question: 'What is the name of the planet famous for its rings?',
      options: ['Mars', 'Jupiter', 'Saturn', 'Neptune'],
      difficulty: 'easy',
      Answer: 'C'
    },
    {
      type: 'general',
      question: 'Who wrote "Romeo and Juliet"?',
      options: ['William Shakespeare', 'Jane Austen', 'Charles Dickens', 'Mark Twain'],
      difficulty: 'easy',
      Answer: 'A'
    },
    {
      type: 'general',
      question: 'How many players are there in a football (soccer) team?',
      options: ['9', '10', '11', '12'],
      difficulty: 'easy',
      Answer: 'C'
    },
    {
      type: 'general',
      question: 'What is the capital of Japan?',
      options: ['Beijing', 'Tokyo', 'Seoul', 'Bangkok'],
      difficulty: 'easy',
      Answer: 'B'
    },
    {
      type: 'general',
      question: 'Which country is famous for tulips and windmills?',
      options: ['Belgium', 'Netherlands', 'Switzerland', 'Germany'],
      difficulty: 'easy',
      Answer: 'B'
    },
    {
      type: 'general',
      question: 'What is the largest planet in our solar system?',
      options: ['Mars', 'Earth', 'Jupiter', 'Saturn'],
      difficulty: 'easy',
      Answer: 'C'
    },
    {
      type: 'general',
      question: 'How many wheels does a tricycle have?',
      options: ['1', '2', '3', '4'],
      difficulty: 'easy',
      Answer: 'C'
    },
    {
      type: 'general',
      question: 'What is the square root of 64?',
      options: ['6', '7', '8', '9'],
      difficulty: 'easy',
      Answer: 'C'
    },
    {
      type: 'general',
      question: 'Which organ pumps blood through the body?',
      options: ['Lungs', 'Kidneys', 'Heart', 'Liver'],
      difficulty: 'easy',
      Answer: 'C'
    },
    {
      type: 'general',
      question: 'What is the capital of Germany?',
      options: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt'],
      difficulty: 'easy',
      Answer: 'A'
    },
    {
      type: 'general',
      question: 'Which planet is known as the Blue Planet?',
      options: ['Mars', 'Venus', 'Earth', 'Jupiter'],
      difficulty: 'easy',
      Answer: 'C'
    },
    {
      type: 'general',
      question: 'What color are bananas when they are ripe?',
      options: ['Green', 'Yellow', 'Red', 'Orange'],
      difficulty: 'easy',
      Answer: 'B'
    },
    {
      type: 'general',
      question: 'How many hours are there in a week?',
      options: ['168', '140', '160', '172'],
      difficulty: 'easy',
      Answer: 'A'
    }
  ];
  



q.forEach(qu=>{
    post(qu)
})
}


function post(questionData){

    fetch('http://localhost:3000/post',
        {
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(questionData)
        }
    )
     .then(res=>res.json())   
     .then((data)=>console.log(data))
}   

function get()
{
    fetch(`http://localhost:3000/get`)
    .then(res=>res.json())
    .then(data=>console.log(data))
}


