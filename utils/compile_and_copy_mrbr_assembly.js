const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
let fileName = "utils/mrbr_assembly_source_files.json";
let contents = fs.readFileSync(fileName);
let json = JSON.parse(contents);
let actions = json.actions;

actions.forEach(action => {
    switch (action.action) {
        case "concat":
            concat(action);
            break;
        case "copy":
            copy(action);
            break;
        case "build":
            build(action);
            break;
        default:
            break;
    }
});

function build(action){
    let command = action.command.app;
    let arguments = action.command.args;
    execSync(`${command} ${arguments}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}
function concat(action) {
    let fileList = action.files;
    let outFile = action.outFile;
    var outPath = path.dirname(outFile);
    if (!fs.existsSync(outPath)) { fs.mkdirSync(outPath); }
    if (fs.existsSync(outFile)) { fs.unlinkSync(outFile); }
    fileList.forEach((file) => {
        if (!fs.existsSync(file) || fs.lstatSync(file).isFile()) {
            fs.appendFileSync(outFile, fs.readFileSync(file).toString());
            fs.appendFileSync(outFile, `\r\n`);
        }
    })
    //console.log(fileList);
}


function RecurseFolders(folder, files) {
    fs.readdirSync(folder).forEach(file => {
        const absolute = path.join(folder, file);
        if (fs.statSync(absolute).isDirectory()) return RecurseFolders(absolute, files);
        else return files.push(absolute);
    });
}
function copy(action) {
    let sources = action.src;
    sources.forEach(source =>{
        let currentPath = path.resolve("./");
        let sourcePath = path.join(currentPath, source.path);
        let destinationPath = path.resolve(action.dest);
        let extensions = source.extensions.map(filter => filter.toLowerCase());
        let files = [];
        RecurseFolders(sourcePath, files);
        //console.log(files)
        const currentPathLen = sourcePath.length;
        files.forEach(file=>{
            let newFileName = path.join(destinationPath, file.substring(currentPathLen));
            let extension = path.extname(newFileName);
            if (source.extensions.includes(extension)){
                console.log(file, newFileName);
                if (!fs.existsSync(path.dirname( newFileName))) { fs.mkdirSync(path.dirname( newFileName)); }
                try {
                    fs.copyFileSync(file, newFileName, fs.constants.COPYFILE_FICLONE);
                    
                } catch (error) {
                    console.log(error)
                }
            }
        });
    })
}