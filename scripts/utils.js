const fs = require("fs");

async function writeToFolder(folder, content) {
  if (!folder || !content) return;
  console.log(`Start writing to folder/file: '${folder}'`);

  return new Promise((resolve, reject) => {
    fs.appendFileSync(folder, content, "utf8", (err) => {
      if (err) {
        console.error(err);
        reject();
        return;
      }
      console.log(`Successfully wrote to folder/file: '${folder}'`);
      resolve();
    });
  });
}

module.exports = { writeToFolder };
