const generateData =  async (dataStream) => {

  //100GB File
  const MAX_SIZE = 1024 * 1024 * 1024 * 100;

  //16 bits
  const text = 'programmertoxico'.repeat(1024*1024*16);
  const step = Buffer.byteLength(text, 'utf8');

  console.log("Size step: ", step , ' bytes');

  let totalBytes = 0;

  while (totalBytes <= MAX_SIZE) {
        totalBytes += step;
        dataStream.push(text,'utf8', false);
        const percent =   Math.round (totalBytes/MAX_SIZE * 100);
        console.log("Progress:", percent, "%", "Total MB: ",  totalBytes / 1024 / 1024 );
  }
  console.log("Total GB: ",MAX_SIZE/1024/1024/1024);
  dataStream.push(null);
}

module.exports = generateData;
