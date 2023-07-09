const LotteryTicket = artifacts.require("LotteryTicket");

module.exports = function (deployer) {
    deployer.deploy(LotteryTicket);
};
