const fs = require('fs')
const stream = require('stream');

const generateData = require('./generateData')

const  {Storage} = require('@google-cloud/storage');
const storage = new Storage({keyFilename: "key.json"});
const mybucket = storage.bucket('storge-5tb-test');

//reference
const fileName = 'toxico.txt';
const file = mybucket.file(fileName);

//dataStream
const dataStream = new stream.Readable();
dataStream._read = () => {}

generateData (dataStream);

dataStream.on('data' , (chunk) => {
    console.log('uploading....');
})

dataStream.pipe(file.createWriteStream({
      resumable: false,
      validation: false,
      contentType: 'text/plain',
}))
.on('error',(error) => {
      console.error(error);
})
.on('finish', () => {
      console.log("Upload complete");
});
