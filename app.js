const { parse } = require('csv-parse/sync');
const fs = require('fs');
const formula = require('excel-formula');

// validate js
const esprima = require('esprima');

const filePath = './sample formula - product final.csv';
const content = fs.readFileSync(filePath);

const records = parse(content, {
    delimiter: ',',
    encoding: 'utf8'
});

for (let i = 0; i < records.length; i++) {
    if (i < 2) {
        // header rows
        continue;
    }

    const jscode = formula.toJavaScript(records[i][24]);

    try {
        // validate js
        const script = esprima.parseScript(jscode);

        console.log('jscode', jscode);
    } catch (e) {
        console.log(`Error in jscode: ${e}`);
    }

    // if (i == 10) {
    //     break;
    // }
}
