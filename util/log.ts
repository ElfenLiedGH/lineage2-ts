let fs = require("fs");

export function log(text: string) {
  let path = "./log.txt";

  fs.appendFile(path, text + "\n", (err: Error) => {
    if (err) throw err;
  });

  console.log(text);
}
