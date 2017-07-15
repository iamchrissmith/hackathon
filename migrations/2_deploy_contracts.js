var ConvertLib = artifacts.require("./ConvertLib.sol");
var Rock = artifacts.require("./Rock.sol");

module.exports = function(deployer) {
  deployer.deploy(Rock);
};
