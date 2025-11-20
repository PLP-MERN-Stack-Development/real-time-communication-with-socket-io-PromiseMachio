import mongoose, { connect } from 'mongoose';

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongodb connected successfully...")
        
    } catch (error) {
        console.error("Error connecting MongoDB:", error)
    }
}

export default connectDB