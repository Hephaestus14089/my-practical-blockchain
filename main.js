const SHA256 = require('crypto-js/sha256');

class Block {

    constructor(index, timestamp, data, previousHash = '') {

        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    } // end of constructor

    calculateHash() {
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
    } // end of calculateHash()
} // end of class Block

class Blockchain {

    constructor() {
        this.chain = [this.createGenesisBlock()];
    } // end of constructor

    createGenesisBlock() {
        return new Block(0, "01/01/2021", "genesis-block", null);
    } // end of createGenesisBlock()

    getLatestBlock() { return this.chain[this.chain.length - 1] };

    addBlock(newBlock) {

        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();

        this.chain.push(newBlock);
    } // end of addBlock(Block)

    isChainValid() {

        for (var i = 1; i < this.chain.length; i++) {

            let previousBlock = this.chain[i - 1];
            let currentBlock = this.chain[i];

            if (currentBlock.hash !== currentBlock.calculateHash())
                return false;

            if (previousBlock.hash !== currentBlock.previousHash)
                return false;
        } // end of for loop

        return true;
    } // end of isChainValid()
} // end of class Blockchain

let currencyChain = new Blockchain();

currencyChain.addBlock(
    new Block(
        1,
        "02/02/2021",
        {
            amount: 5000,
            sender: "Donald Trump",
            receiver: "Stormy Daniels"
        }
    )
);

currencyChain.addBlock(
    new Block(
        2,
        "12/04/2021",
        {
            amount: 5000,
            sender: "Donald Trump",
            receiver: "Stormy Daniels"
        }
    )
);

console.log(JSON.stringify(currencyChain));