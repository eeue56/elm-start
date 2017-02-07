const Git = require("nodegit");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// takes git@github.com:eeue56/elm-ffi.git
// https://github.com/eeue56/elm-ffi.git

var getRepoUrl = (remoteUrl) => {
    if (remoteUrl.startsWith('git')){
        return remoteUrl.replace('git@', 'https://').replace(':', '/');
    }

    return remoteUrl;
};

var askRepoUrl = (url, cb) => { 
    rl.question(`Repository url? [${url}]`, (answer) => {
        var answerUrl = url;
        if (answer !== null || answer !== "y") {
            answerUrl = answer;
        }

        cb({ repository : answerUrl });
    });
};

var askSourceDirectories = (obj, cb) => { 
    rl.question(`Source directories? [src]`, (answer) => {
        var dirs = answer;
        if (answer === null || answer === "y") {
            dirs = "src";
        }

        obj["source-directories"] = answer.split(' ');
        cb(obj);
    });
};


var handleElmPackageJson = () => {
    try {
        fs.readFileSync('elm-package.json');
    } catch (err){
        
    }
};

Git.Repository.open(".").then(function(repo){
    repo.getRemote("origin").then(function(remote){
        var url = getRepoUrl(remote.url());
        
        askRepoUrl(url, askSourceDirectories);
    });
}).catch(function(err){
    console.error(err);
    console.log('Please run this in a Git repo!')

    rl.close();
});


