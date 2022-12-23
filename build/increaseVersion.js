const fs = require('fs');
fs.readFile('package.json', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    var result = data.replace(/"version": "(\d+).(\d+).(\d+)"/, function (match, major, minor, patch) {
        return `"version": "${major}.${minor}.${++patch}"`;
    });
    fs.writeFile('package.json', result, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});