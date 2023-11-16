const fs = require("fs");
const path = require("path");
const glob = require("glob");

const DIST_DIR = "./dist";
const FILES = [
  "./src/**/*.html",
  "./src/**/*.js",
  "./src/**/*.css",
  "./src/**/*.png",
];

function main() {
  removeDistWithinFiles(DIST_DIR);

  FILES.forEach(async (file) => {
    const paths = await glob.glob(file);

    paths.forEach((p) => {
      const rootDirName = path.dirname(p).split(path.sep, 1)[0];
      const distDirName = path.dirname(p).replace(rootDirName, DIST_DIR);
      const fileName = path.basename(p);
      const distPath = path.join(distDirName, fileName);

      if (!fs.existsSync(distDirName)) {
        fs.mkdirSync(distDirName);
        console.log(`create ${distDirName}`);
      }

      fs.copyFileSync(p, distPath);
      console.log(`copy   ${distPath}`);
    });
  });
}

function removeDistWithinFiles(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true });
    console.log(`remove ${dir}`);
  }
  fs.mkdirSync(dir);
  console.log(`create ${dir}`);
}

main();
