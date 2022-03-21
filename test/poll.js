// We import Chai to use its asserting functions here.
const { expect } = require("chai");

describe("poll contract", function () {

    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    before(async function() {
        Token = await ethers.getContractFactory("Poll");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    
        // To deploy our contract, we just have to call Token.deploy() and await
        // for it to be deployed(), which happens once its transaction has been
        // mined.
        hardhatToken = await Token.deploy();
    });

    describe("vote", function () {
        it("Vote count should be zero" , async function () {
            const res = await hardhatToken.voteCount();
            expect(res).to.equal(0);
        });

        it("Should do a true vote", async function () {
            await hardhatToken.vote(true);
            const res = await hardhatToken.currentStandings();
            expect(res).to.equal(100); 
        });

        it("Should do a false vote", async function () {
            await hardhatToken.connect(addr1).vote(false);
            const res = await hardhatToken.currentStandings();
            expect(res).to.equal(50); 
        });

        it("Voters count should be two" , async function () {
            const res = await hardhatToken.voteCount();
            expect(res).to.equal(2);
        });
    });
});