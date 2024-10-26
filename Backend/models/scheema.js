const mongoose=require('mongoose')

const QuestionsScheema=new mongoose.Schema({
    type:{type:String,required:true},
    question:{type:String,required:true},
    options:{type:Array,required:true},
    difficulty:{type:String,required:true},
    Answer:{type:String,required:true}
})


module.exports=QuestionsScheema
