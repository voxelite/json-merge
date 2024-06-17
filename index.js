const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

const inFile = core.getInput('in-file');
const inDirectory = core.getInput('in-directory');
const outFile = core.getInput('out-file');

try
{
    core.info("inFile: " + inFile);
    core.info("inDirectory: " + inDirectory);
    core.info("outFile: " + outFile);

    let outputJson = JSON.constructor();

    if(typeof inFile === "string" && inFile !== '')
    {
        const fileData = fs.readFileSync(inFile, 'utf8');
        outputJson = JSON.parse(fileData);
    }

    if(typeof inDirectory === "string" && inDirectory !== '')
    {
        fs.readdirSync(inDirectory).forEach(filename => {
            if(!filename.endsWith(".json"))
                return;

            const filenameWithoutExtension = filename.substring(0, filename.length - ".json".length);
            if(outputJson[filenameWithoutExtension] !== undefined)
            {
                core.error(filenameWithoutExtension + " is already defined (in " + inFile + ")");
                return;
            }

            const fileData = fs.readFileSync(inDirectory + '/' + filename, { encoding: 'utf8', flag: 'r' });
            outputJson[filenameWithoutExtension] = JSON.parse(fileData);
        });
    }

    if(outputJson.length > 0)
    {
        fs.writeFileSync(
            outFile,
            JSON.stringify(outputJson, null, null),
            { encoding: 'utf8', flag: 'w' }
        );
    }

}
catch(error)
{
    core.setFailed(error.message);
}
