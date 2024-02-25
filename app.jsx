const express = require('express');
const tf = require('@tensorflow/tfjs-node');
const multer = require('multer'); 
const upload = multer({ dest: 'uploads/' });

const app = express();


let model;
async function loadModel() {
    model = await tf.loadLayersModel('file://path/to/model/ai_imageclassifier/model.json');
}
loadModel();

app.post('/predict', upload.single('image'), async (req, res) => {
    if (req.file) {
        
        const prediction = await model.predict(processedImage);
    

        res.json({'isReal': true}); 
    } else {
        res.status(400).send('No image uploaded.');
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
