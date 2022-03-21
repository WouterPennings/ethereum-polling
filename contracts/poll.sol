pragma solidity ^0.7.0;

contract Poll {
    // The thing that people are voting on:
    // I.E: "Should be built a new mainstreet".
    string public viewPoint;
    // at he index of votes is the same af the index of the votee
    address[] public voted;
    bool[] public votes;
    uint trueVotes = 0;

    // Instantiates the smart contract
    constructor() {
        viewPoint = "1";
    }

    // Returns "true" if vote has succeeded.
    function vote(bool _vote) external {
        // Check if person has not voted yet
        require(!alreadyVoted(msg.sender), "Unga bunga");

        // Keeps track of the votes and who voted.
        voted.push(msg.sender);  // Register voters addres
        votes.push(_vote);       // Register vote of votee

        // Incremenets "true" votes.
        if(_vote) {
            trueVotes += 1;
        }
    }

    // Returns a sum of all the votes
    function voteCount() external view returns(uint) {
        return voted.length;
    }

    // Returns the percentages of true voteso
    function currentStandings() external view returns(uint) {
        return (trueVotes * 100 / votes.length * 100) / 100;
    }

    function alreadyVoted(address x) internal returns(bool) {
        // part/complete * 100, but will floor when a float so this garbage is needed
        for(uint i = 0; i < voted.length; i++) {
            if (voted[i] == x) {
                return true;
            }
        }
        return false;
    }
}