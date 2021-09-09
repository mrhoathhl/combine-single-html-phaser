
//requiring path and fs modules
const path = require('path');
const fs = require('fs');
const nameGame = "BL";

//joining path of directory 
const directoryPath = path.join(__dirname, 'source');
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach

    let check = 0
    let index = fs.readFileSync(`${directoryPath}/${files[files.length - 1]}`);
    files.forEach(function (file) {
        // Do whatever you want to do with the file

        const codeOnFile = fs.readFileSync(`${directoryPath}/${file}`);
        let replaced = index.toString().replace(`<script src="${file}"></script>`, `<script> ${codeOnFile}</script>`)
        // .replace(`<script type="text/json" src="${file}"></script>`, `<script> let jsonFile = ${da}</script>`);
        index = replaced;
        check++
    });
    if (check == files.length) {
        fs.writeFile(`${nameGame}.html`, `${index}`, function (err) {
            if (err) return console.log(err);
        });

    }
    //deletefile
    // files.forEach(function (file) {
    //     fs.unlink(`${directoryPath}/${file}`, (err) => {
    //         if (err) {
    //             console.error(err)
    //             return
    //         }
    //     })
    // });
});

