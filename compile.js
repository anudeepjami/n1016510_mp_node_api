const solidityCompiler = require('solc');
const path = require('path');
const fs = require('fs-extra');

const solTestingPath = path.resolve(__dirname,'contracts','solTesting.sol');
const solTestingRead = fs.readFileSync(solTestingPath, 'utf-8');

var solInput = {
    language: 'Solidity',
    sources: {
        'solTesting.sol' : {
            content: solTestingRead
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 

let output = JSON.parse(solidityCompiler.compile(JSON.stringify(solInput)));

exports.abi = output.contracts['solTesting.sol']['Testing'].abi;
exports.evm = output.contracts['solTesting.sol']['Testing'].evm.bytecode.object;

// var test;

