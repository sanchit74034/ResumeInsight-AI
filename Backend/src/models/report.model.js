const mpngoose = require('mongoose');

/*
* Report Schema
* This schema defines the structure of the report document in the MongoDB database.
* jobdescription: type - String, required - true
* resume: type - String
* matchScore: type - Number, required - false, min - 0, max - 100
* selfdescription: type - String

* Technical questions:({
    question: type - String, required - true
    intention: type - String, required - true
    answer: type - String, required - true
})
* Behavioral questions:({
    question: type - String, required - true
    intention: type - String, required - true
    answer: type - String, required - true
})
* Skillgaps:({
    skill: type - String, required - true
    severity: {
        type - String, 
        required - true, 
        enum: ['low', 'medium', 'high']}
}) 
*  Preparation suggestions:({
    day:{
        type: Number,
        required: true,
    },
    focusArea: {
        type: String,
        required: true,
    },
    task: {
        type: [String],
        required: true,
    }
})     
*/
const technicalQuestionSchema = new mpngoose.Schema({
    question: {
        type: String,
        required: [true, 'Technical question is required']
    },
    intention: {
        type: String,
        required: [true, 'Intention is required']
    },
    answer: {
        type: String,
        required: [true, 'Answer is required']
    }
},{ _id: false });

const behavioralQuestionSchema = new mpngoose.Schema({
    question: {
        type: String,
        required: [true, 'Behavioral question is required']
    },
    intention: {
        type: String,
        required: [true, 'Intention is required']
    },
    answer: {
        type: String,
        required: [true, 'Answer is required']
    }
},{ _id: false });

const skillGapSchema = new mpngoose.Schema({
    skill: {
        type: String,
        required: [true, 'Skill is required']
    },
    severity: {
        type: String,
        required: [true, 'Severity is required'],
        enum: ['low', 'medium', 'high']
    }
},{ _id: false });

const preparationSuggestionSchema = new mpngoose.Schema({
    day: {
        type: Number,
        required: [true, 'Day is required']
    },
    focusArea: {
        type: String,
        required: [true, 'Focus area is required']
    },
    task: {
        type: String,
        required: [true, 'Task is required']
    }
},{ _id: false });  


const reportSchema = new mpngoose.Schema({
    jobdescription: {
        type: String,
        required: [true, 'Job description is required']
    },
    resume: {
        type: String,
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
    },
    selfdescription: {
        type: String,
    },
    title: {
        type: String,
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationSuggestions: [preparationSuggestionSchema],
    user:{
        type: mpngoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    }
}, { timestamps: true });

const Reportmodel = mpngoose.model('Report', reportSchema);

module.exports = Reportmodel;    

     