const { default: mongoose } = require("mongoose");

const TopicSchema=new mongoose.Schema({
    topic_data:{
        topic_name:{
            type:String,
            required:true
        },
        topic_code:{
            type:String,
            required:true
        },
        desc:{
            type:String,
            required:true
        },
        esg_pillar:{
            type:String,
            required:true
        }
    },
    framework_ref:{
        type:Array,
        
    },
    subtopics:{
        type:Array
    }
})

const TopicData=mongoose.model("Topic",TopicSchema)

module.exports=TopicData