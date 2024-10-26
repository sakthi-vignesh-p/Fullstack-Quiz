const mongoose=require('mongoose')
const QuestionsScheema=require('./scheema')

//Sceemas For Differrent Type of Questions
const GeneralQuestions=mongoose.model('generalQuestions',QuestionsScheema)
const MathsQuestions=mongoose.model('MathsQuestions',QuestionsScheema)
const DSAQuestions=mongoose.model('DSAQuestions',QuestionsScheema)
const SocialQuestions=mongoose.model('SocialQuestions',QuestionsScheema)

function checkType(type)
{
    switch(type)
    {
        case 'GeneralQuestions':
            return GeneralQuestions;
        case 'MathsQuestions':
            return MathsQuestions;
        case 'DSAQuestions' :
            return DSAQuestions;
         case 'SocialQuestions':
            return SocialQuestions;            
    }
}

module.exports=checkType