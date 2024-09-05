const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await mongoose.connect(process.env.MONGOURL,{
            
        })

        console.log(`MongoDB connected`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB