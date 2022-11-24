const request = require("request"); 
const fs = require("fs");
const readline = require("readline");

const url = process.argv[2]; 
const localPath = process.argv[3];

//console.log(url);
//console.log(localPath);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(url, (error, reponse, body) => {
  console.log('error:', error); // Print the error if one occurred
  //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body); // Print the HTML for the Google homepage.

  // check if URL is invaild, then exit
  if (!url) {
    console.log('error: URL not found');
    process.exit(1);
    // check if file path is invalid
  } else if (!localPath) {
    console.log('error: File path not found');
    process.exit(1);
    //check if file already exists
  } else if (fs.existsSync(localPath)){
    // ask user wheather overwrite the file or no. 
    rl.question("File already exists! Type 'yes' to overwrite the file, or type 'no' to exit.", (answer) => {
      // if yes
      if (answer === 'yes') {
        console.log("Okay. Overwriting it.");
        // write file
        fs.writeFile(localPath, body, function (err) {
          if (err) {
            console.log("Error.")
          };
          // Get the size of file on local path
          let stats = fs.statSync(localPath);
          var fileSizeInBytes = stats.size;
          //var fileSizeInMegabytes = fileSizeInBytes / (1024*1024);
      
          console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${localPath}`);
          
          process.exit(1); // Exit
        });
        // if no, user wants to quit
      } else if (answer === 'no') {
        console.log("Exit.");
        process.exit(1);
      }
    });
    
    // Normal way: if no error, then write file
  } else {
    fs.writeFile(localPath, body, function (err) {
      if (err) {
        console.log("Error.")
      };
      let stats = fs.statSync(localPath);
      var fileSizeInBytes = stats.size;
      //var fileSizeInMegabytes = fileSizeInBytes / (1024*1024);
  
      console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${localPath}`);
      process.exit(1);
    });

  }
  
});

