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
    await rock.startInteraction(playerAmount, player1, player2, periodLength, periodCount, charity, {from: accounts[0], value: 20*10**18});
    
    let failureCounts = await rock.getFailureCounts();
    let interactionResults = await rock.getInteractionResults();

    assert.equal(failureCounts[0], 0);
    assert.equal(failureCounts[1], 0);
    assert.equal(interactionResults[0].length, 52);
    assert.equal(interactionResults[1].length, 52);
  });

  it("should be initialized with the correct values", async function() {  
    let owner = await rock.owner()

    assert.equal(owner, accounts[0]);
  });

  it("should be able to enter results for a given period", async function() {  
    let player1Result = true;
    let player2Result = true;
    await rock.nextPeriod(player1Result, player2Result);
    
    let failureCounts = await rock.getFailureCounts();
    let interactionResults = await rock.getInteractionResults();

    assert.equal(failureCounts[0], 0);
    assert.equal(failureCounts[1], 0);

    assert.equal(interactionResults[0][0], true);
    assert.equal(interactionResults[1][0], true);
  });
});
