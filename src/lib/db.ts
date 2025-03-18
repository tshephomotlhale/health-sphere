import mongoose from 'mongoose';

const connectDb = async () => {
    if (mongoose.connection.readyState >= 1) return true;

    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) throw new Error('MONGODB_URI is not defined');
        await mongoose.connect(mongoUri);
        console.log('MongoDB Connected');
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export default connectDb;
