import gridfsStream from 'gridfs-stream';
import Grid from 'gridfs-stream';
import mongoose from 'mongoose';

const url = 'http://localhost:5000';


const conn = mongoose.createConnection("mongodb+srv://neel0086:neel123@blog.ch6tx.mongodb.net/WriteUp?retryWrites=true&w=majority", {useNewUrlParser:true, useUnifiedTopology:true});

let gfs;
Grid.mongo = mongoose.mongo;
conn.once('open', () => {
    gfs = Grid(conn.db);
    gfs.collection('fs');
});


export const uploadImage = (request, response) => {
    if(!request.file) 
        return response.status(404).json("File not found");
    
    const imageUrl = `${url}/file/${request.file.filename}`;

    response.status(200).json(imageUrl);    
}

export const getImage = async (req, res) => {
    // console.log(gfs.collections)
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        // // const readStream = gfs.createReadStream(file.filename);
        // readStream.pipe(res);
    } catch (error) {
        console.log(error);
    
    }
}