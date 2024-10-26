const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const checkType = require('./models/type');
const bodyParser = require('body-parser');
const app = express();
const port =  process.env.X_ZOHO_CATALYST_LISTEN_PORT||3000;
// const mongoURL = 'mongodb+srv://sakthiprogramming:Sakthi007@cluster0.jgpnm.mongodb.net/QuizDatas';
const mongoURL='mongodb://localhost:27017/quizDatas'
// Middleware
app.use(express.json());
// app.use(cors());
app.use(cors({
  origin: '*', // Adjust this for your frontend's origin
  methods: ['GET', 'POST'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type'], // Allow specific headers
}));
app.use(bodyParser.json())
// app.use(bodyParser.json());

// Mongoose Connection
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connection Success'))
  .catch(err => console.error('MongoDB connection failed:', err));

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies

//Post a Question
app.post('/post', async (req, res) => {
  const type = checkType('GeneralQuestions');
  try {
    
    const newQuestion = new type(req.body);
    const savedQuestion = await newQuestion.save();
    if (!savedQuestion) {
      return res.status(400).json({ msg: "Question not Posted" });
    }
    res.status(201).json(savedQuestion);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get Questions by Type, Page, and Difficulty
app.get('/get/:type/:page/:difficulty', async (req, res) => {
  const { type, page, difficulty } = req.params;
  try {
    const questionType = checkType(type);
    const questions = await questionType.find({ difficulty }).skip(Number(page)).limit(10)
    if (!questions.length) {
      return res.status(404).json({ msg: "No questions found" });
    }
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//  Register a User
const usersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  totalAnswered: { type: Number, default: 0 },
  Category: {
    type: Array,
    default: [
      [{ easy: 0 }, { medium: 0 }, { hard: 0 }, { veryHard: 0 }], // General
      [{ easy: 0 }, { medium: 0 }, { hard: 0 }, { veryHard: 0 }], // Math
      [{ easy: 0 }, { medium: 0 }, { hard: 0 }, { veryHard: 0 }], // DSA
      [{ easy: 0 }, { medium: 0 }, { hard: 0 }, { veryHard: 0 }]  // Social
    ]
  },
  difficultyAns:{type:Array,default:[0,0,0,0]},
  correctAnswers: { type: Number, default: 0 },
  wrongAnswers: { type: Number, default: 0 },
  rank: { type: String, default: 'bronze' },
  image:{type:String,default:''},
  About:{type:String,default:'Hi there!, a quiz enthusiast who loves putting my knowledge to the test. I enjoy tackling challenges across a variety of topics and competing on the leaderboard to improve my skills.'}
});

const usersCollection = mongoose.model('users', usersSchema);


app.post('/register', async (req, res) => {
  try { 
    const newUser = new usersCollection(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Login User by ID
app.get('/userprofile', async (req, res) => {
  const  name  = req.query.name;
  try {
    const user = await usersCollection.findOne({name:name});
    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

app.get('/login', async (req, res) => {
  const { id } = req.query;
  try {
    const user = await usersCollection.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Login User by Name and Password
app.get('/login/:name/:password', async (req, res) => {
  const { name, password } = req.params;
  try {
    const user = await usersCollection.findOne({ name });
    if (!user) {
      return res.status(404).json({ msg: "Cannot find user" });
    }
    if (user.password !== password) {
      return res.status(401).json({ msg: "Incorrect Password" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Update User Details
app.post('/put/:id', async (req, res) => {
  const result = await putData(req.params.id, req.body);
  if (result === false) {
      return res.status(500).json({ message: 'Failed to update user data.' });
  }
  res.status(200).json({ message: 'User data updated successfully.', data: result });
});

async function putData(userID, data) {
  try {
      const {
          categoryIndex,
          difficultyType,
          difficultyIndex,
          incrementValue,
          totalAnsweredIncrement,
          correctAnswersIncrement,
          wrongAnswersIncrement,
          difficultyAns
      } = data;

      if (
          incrementValue === undefined || 
          categoryIndex === undefined || 
          difficultyIndex === undefined || 
          !difficultyType
      ) {
          return false;
      }

      const updateField = `Category.${categoryIndex}.${difficultyIndex}.${difficultyType}`;
      const difficultyField=`difficultyAns.${difficultyIndex}`
      const updateObj = {
          $inc: {
              totalAnswered: Number(totalAnsweredIncrement) || 0,
              correctAnswers: Number(correctAnswersIncrement) || 0,
              wrongAnswers: Number(wrongAnswersIncrement) || 0,
              [updateField]: Number(incrementValue) || 0,
              [difficultyField]:Number(correctAnswersIncrement)  || 0
              
          }
      };
      // Update user in the database
      const updatedUser = await usersCollection.findByIdAndUpdate(userID, updateObj, { new: true });
      if (!updatedUser) {
          return false; 
      }

      return updatedUser; 

  } catch (err) {
      return false; 
  }
}


app.post('/updateuser', async (req, res) => {
  const userId = req.query.id;
  console.log(req.body)
  if (!req.body || Object.keys(req.body).length === 0) {
    console.log("Empty")  
    return
  }

  try {
      const updatedUser = await putImage(userId, req.body);

      if (updatedUser) {
          res.status(200).json({ message: 'User profile updated successfully' });
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ message: 'An error occurred while updating the user profile', error });
  }
});


async function putImage(id, data) {
  const updatedUser = await usersCollection.findByIdAndUpdate(id, data, { new: true });
  return updatedUser;
}


app.get('/getusers', async (req, res) => {
  try {
    const usersData = await usersCollection.find({}).sort({ correctAnswers: -1 });
    if (!usersData.length) {
      return res.status(404).json({ msg: "No users found" });
    }
    res.status(200).json(usersData);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`));
