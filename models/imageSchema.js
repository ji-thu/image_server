const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema(
    {
        image:String
    },
    {
        collection:"ImageDetails",
    }
);

mongoose.model("ImageDetails", ImageSchema)