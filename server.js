const express = require('express');
const fileupload = require('express-fileupload');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(fileupload());

app.post('/upload',(req,res) => {
    if(req.files == null){
        return res.status(400).json({
            message : "no file uploaded"
        })
    }

    const file = req.files.file;

    file.mv(`${__dirname}/client/public/uploads/${file.name}`,err => {
        if(err){
            console.error('cant upload',err);
            return res.status(500).send(err);
        }

        return res.json({fileName : file.name, filePath : `/uploads/${file.name}`})
    })
})

app.listen(5000, () => console.log('Server started ....'))