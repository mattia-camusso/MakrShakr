const fs = require("fs");
const csv = require("csv-parse");

const file = process.argv[2];
const key = process.argv[3];
const index = process.argv[4];

const csvData = [];
var output = "";

//Creates a stream to read the csv file
fs.createReadStream(file)
  // Ignores everything from ;
  .pipe(csv({ comment: ";" }))
  //Adds every line into the csvData array
  .on("data", (dataRow) => {
    csvData.push(dataRow);
  })
  // At the end of the file filters the csvData array
  .on("end", () => {
    csvData.filter((val) => {
      if (val[index] == key) {
        for (i = 0; i < val.length; i++) {
          //Creates the output String for every match
          output += val[i];
          if (i < val.length - 1) {
            output += " - ";
          }
        }
        console.log(output);
      }
    });
    //If no match was found logs the following message
    if (output == "") {
      console.log("No match found");
    }
  });
