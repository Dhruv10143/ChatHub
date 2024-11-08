import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url: `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.sppq3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (request, file) => {
        // Define acceptable file types
        const match = ["image/png", "image/jpg"];
        if(match.indexOf(file.mimeType)===-1){
            return `${Date.now()}-file-${file.originalname}`;
        }

        // Return the file details to be stored in GridFS
        return {
            bucketName: 'photos', // Name of the collection where files will be stored
            filename: `${Date.now()}-file-${file.originalname}` // Set the filename
        };
    }
});

// Export the multer instance with the GridFS storage
export default multer({ storage });
