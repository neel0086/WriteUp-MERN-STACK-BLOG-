import mongoose from 'mongoose';


const Connection = async () => {
    const URL = `mongodb+srv://neel0086:neel123@blog.ch6tx.mongodb.net/WriteUp?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;