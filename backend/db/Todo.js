const mongoose=require('mongoose')

const todoSchema=mongoose.Schema({
    blog:{
        type:String,
        require:true,   
    }
})
const Todo=mongoose.model("Todo",todoSchema)
module.exports=Todo