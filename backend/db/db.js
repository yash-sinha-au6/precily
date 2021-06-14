const mongoose =require('mongoose')

   const connectDb=async()=>{
    try {
        const conn=await mongoose.connect(`mongodb+srv://yashsinha:todo@todo.rgt4a.mongodb.net/Todo`,{
            useNewUrlParser:true,
            useCreateIndex:true,
            useUnifiedTopology:true
        })
        console.log(`database connected`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
    }
}
module.exports=connectDb
