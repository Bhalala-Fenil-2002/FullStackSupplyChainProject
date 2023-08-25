const isOwner = artifacts.require("Ownable");

module.exports = function (deployer) {
    deployer.deploy(isOwner);
};
