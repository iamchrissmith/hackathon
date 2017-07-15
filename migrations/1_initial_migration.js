var Migrations = artifacts.require("./Migrations.sol");
var Rock = artifacts.require("./Rock.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Rock);
};
