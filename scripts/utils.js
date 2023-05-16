const fs = require("fs");

async function writeToFolder(folder, content) {
  if (!folder || !content) return;
  return new Promise((resolve, reject) => {
    fs.appendFileSync(folder, content, "utf8", (err) => {
      if (err) {
        console.error(err);
        reject(false);
      }
    });
    console.log(`Successfully wrote to folder/file: '${folder}'`);
    resolve(true);
  });
}

module.exports = { writeToFolder };
