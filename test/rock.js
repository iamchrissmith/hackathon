var Rock = artifacts.require("./Rock.sol");

contract('Rock', function(accounts) {
  let rock;

  before(async function() {
    rock = await Rock.new()
  });

  it("should be initialized with the correct values", async function() {  
    let owner = await rock.owner()

    assert.equal(owner, accounts[0]);
  });

  it("should be able to create a struct", async function() {  
    let playerAmount = 100 * 10 ** 18;
    let player1 = accounts[1];
    let player2 = accounts[2];
    let periodLength = 0;
    let periodCount = 52;
    let charity = accounts[3];
    await rock.startInteraction(playerAmount, player1, player2, periodLength, periodCount, charity);
    
    let failureCounts = await rock.getFailureCounts();
    let interactionResults = await rock.getInteractionResults();

    assert.equal(failureCounts[0], 0);
    assert.equal(failureCounts[1], 0);
    assert.equal(interactionResult[0].length, 52);
    assert.equal(interactionResults[1].length, 52);
  });
  // it("should call a function that depends on a linked library", function() {
  //   var meta;
  //   var metaCoinBalance;
  //   var metaCoinEthBalance;

  //   return MetaCoin.deployed().then(function(instance) {
  //     meta = instance;
  //     return meta.getBalance.call(accounts[0]);
  //   }).then(function(outCoinBalance) {
  //     metaCoinBalance = outCoinBalance.toNumber();
  //     return meta.getBalanceInEth.call(accounts[0]);
  //   }).then(function(outCoinBalanceEth) {
  //     metaCoinEthBalance = outCoinBalanceEth.toNumber();
  //   }).then(function() {
  //     assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, "Library function returned unexpected function, linkage may be broken");
  //   });
  // });
  // it("should send coin correctly", function() {
  //   var meta;

  //   // Get initial balances of first and second account.
  //   var account_one = accounts[0];
  //   var account_two = accounts[1];

  //   var account_one_starting_balance;
  //   var account_two_starting_balance;
  //   var account_one_ending_balance;
  //   var account_two_ending_balance;

  //   var amount = 10;

  //   return MetaCoin.deployed().then(function(instance) {
  //     meta = instance;
  //     return meta.getBalance.call(account_one);
  //   }).then(function(balance) {
  //     account_one_starting_balance = balance.toNumber();
  //     return meta.getBalance.call(account_two);
  //   }).then(function(balance) {
  //     account_two_starting_balance = balance.toNumber();
  //     return meta.sendCoin(account_two, amount, {from: account_one});
  //   }).then(function() {
  //     return meta.getBalance.call(account_one);
  //   }).then(function(balance) {
  //     account_one_ending_balance = balance.toNumber();
  //     return meta.getBalance.call(account_two);
  //   }).then(function(balance) {
  //     account_two_ending_balance = balance.toNumber();

  //     assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
  //     assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
  //   });
  // });
});
