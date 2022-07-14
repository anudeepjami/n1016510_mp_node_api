const assert = require('assert');
const ganache = require('ganache');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const {abi, evm} = require('../compile');

var accnts, deploy;

beforeEach(async () =>{
    // get unlocked eth wallets
    accnts = await web3.eth.getAccounts();

    //deploy contract
    deploy = await new web3.eth.Contract(abi).deploy({data: evm}).send({from: accnts[0], gas: '1000000'})
});

describe('Sol Testing', () => {
    it('deploy contract success', () => {
        assert.ok(deploy.options.address);
    });
    it('default message', async() => {
        const dMsg = await deploy.methods.message().call();
        console.log(dMsg);
        assert.equal(dMsg, 'Hi World');
    });
    it('change message', async() => {
        await deploy.methods.setMessage('I changed..!!').send({from: accnts[0]});
        const dMsg = await deploy.methods.message().call();
        console.log(dMsg);
        assert.equal(dMsg, 'I changed..!!');
    });
});