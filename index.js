const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const path = require('path');

const inFile = core.getInput('in-file');
const inDirectory = core.getInput('in-directory');
const outFile = core.getInput('out-file');

try
{
    core.info("inFile: " + inFile);
    core.info("inDirectory: " + inDirectory);
    core.info("outFile: " + outFile);

    let outputJson = JSON.constructor();

    // Multi-object file
    if(typeof inFile === "string" && inFile !== '')
    {
        if(fs.existsSync(inFile))
        {
            const fileData = fs.readFileSync(inFile, 'utf8');
            outputJson = JSON.parse(fileData);
        }
        else
            core.error("inDirectory " + inDirectory + " does not exist");
    }

    // Directory of single-object files
    if(typeof inDirectory === "string" && inDirectory !== '')
    {
        if(fs.existsSync(inDirectory))
        {
            fs.readdirSync(inDirectory).forEach(filename => {
                if (!filename.endsWith(".json"))
                    return;

                const filenameWithoutExtension = filename.substring(0, filename.length - ".json".length);
                if (!outputJson.hasOwnProperty(filenameWithoutExtension)) {
                    core.error(filenameWithoutExtension + " is already defined (in " + inFile + ")");
                    return;
                }

                const fileData = fs.readFileSync(inDirectory + '/' + filename, {encoding: 'utf8', flag: 'r'});
                outputJson[filenameWithoutExtension] = JSON.parse(fileData);
            });
        }
        else
            core.error("inDirectory " + inDirectory + " does not exist");
    }

    // Output file
    // Override existing file, create new only if we have data to write
    if(!fs.existsSync(outputJson) || Object.keys(outputJson).length !== 0)
    {
        fs.mkdirSync(path.dirname(outputJson), { recursive: true });

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
