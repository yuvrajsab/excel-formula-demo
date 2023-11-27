const { parse } = require('csv-parse/sync');
const fs = require('fs');
const formula = require('excel-formula');

// validate js
const esprima = require('esprima');

const filePath = './sample formula - product final.csv';
const outputFilePath = './result.json';
const content = fs.readFileSync(filePath);

const records = parse(content, {
    delimiter: ',',
    encoding: 'utf8',
    from: 3,
    columns: [
        'City',
        'State',
        'City Redirected',
        'State Redirected',
        'Ex showroom Price',
        'GST',
        'Compensation Cess',
        'Ex showroom before taxes',
        'Engine Capacity',
        'Fuel Type',
        'Seating Capacity',
        'Car Length (mm)',
        'Road Tax',
        'TCS',
        'Life Tax',
        'Statutory Fees',
        'Reg Charges',
        'Green Tax',
        'Road Safety Tax',
        'Cow Cess',
        'Total Tax',
        'Insurance',
        'On Road Price',
        'blank1',
        'Road Tax formula',
        'TCS formula',
        'Life Tax formula',
        'Statutory Fees formula',
        'Reg Charges formula',
        'Green Tax formula',
        'Road Safety Tax formula',
        'Cow Cess formula',
        'Total Tax formula',
        'Insurance formula',
        'On Road Price formula',
        'blank2',
        'blank3'
    ]
});


const formulaCols = [
    'Road Tax formula',
    'TCS formula',
    'Life Tax formula',
    'Statutory Fees formula',
    'Reg Charges formula',
    'Green Tax formula',
    'Road Safety Tax formula',
    'Cow Cess formula',
    'Total Tax formula',
    'Insurance formula',
    'On Road Price formula'
];



for (let i = 0; i < records.length; i++) {
    for (const formulaCol of formulaCols) {
        const formulaString = records[i][formulaCol];
        const jsCode = formula.toJavaScript(formulaString);
        // console.log('index', i, 'col', formulaCol, 'jscode', jscode);
        records[i][formulaCol] = jsCode;

        try {
            // validate js
            const script = esprima.parseScript(jsCode);
        } catch (e) {
            records[i][formulaCol] = '';
            console.log(`Error column: ${formulaCol} in formula: ${formulaString} ${e.message}`);
        }
    }
}

fs.writeFileSync(outputFilePath, JSON.stringify(records, null, 2));
