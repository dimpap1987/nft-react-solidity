require("dotenv").config();
const { create, globSource } = require("ipfs-http-client");
const { writeToFolder } = require("./utils");

const path = "./src/ipfs/version_1/json";

(async () => {
  try {
    const folder = await upload(path);
    console.log("Files Uploaded Successfully");
    await saveIpfsUrl(folder);
  } catch (e) {
    console.error(e);
  }
})();

function getClient() {
  return create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization:
        "Basic " +
        Buffer.from(
          process.env.PROJECT_ID + ":" + process.env.PROJECT_SECRET
        ).toString("base64"),
    },
  });
}

async function upload(folder) {
  const client = getClient();
  let lastFile;
  for await (const file of client.addAll(globSource(folder, "**/*"), {
    pin: true,
    wrapWithDirectory: true,
  })) {
    lastFile = file;
  }
  return lastFile;
}

async function saveIpfsUrl(folder) {
  // store locally the ipfs metadata
  if (!folder) return;
  await writeToFolder(
    "./src/metadata/ipfs-urls.txt",
    `cid=https://ipfs.io/ipfs/${folder.cid?.toString()}\r\n`,
    null,
    4
  );
}
