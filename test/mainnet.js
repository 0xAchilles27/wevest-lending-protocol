const { deployments } = require('hardhat')

const EMAOracleKeeperHub = artifacts.require('EMAOracleKeeperHub')

const oracles = [
  '0x4d986F2607A1f54De55ec7fff332A13d076ef160',
  '0xBeC287DEED87b01EB64C8bD2E10558700E3AE156',
  '0xc5161483Fa46ff3C909C9d80135C24Fa5986d66F',
  '0x7acD00D3e1Cf5018D8530f55f9F19910c3358159',
  '0x58CcE424c3098772387C7c7a35011A82569D78c6',
  '0x322C4F9A477f99b3AEc04dE27c8d97FddaD34309',
  '0xdde39fDd51a4783685622984b4c5E757Db6beCb0',
  '0x64eC20abf1760a9D8a2DF69a1a10D2Ee76D7675c',
  '0xCf208972255B9f21B71f7ca2B0b4Df93Ca006150',
  '0x8fB81eB0ee694089Bfe9b58200287cA30422E2B3',
  '0xF38cA0CFFc53A6B6C62c2bE87967fcc13e807751',
  '0x8f70B80ecb1786b21931dD73A8B895d263D52BB5',
  '0x984570fB7eA89a7991E827aA1844753Ed0C27460',
  '0xb0f8FAF712fEa939CAE787DB171661C08DCfA7d8',
  '0x63667C9390Dcb2D9b3f9b8Ac3321d916B4710532',
  '0x0AA404FdDFf7943d8b87089F009a7b98EAFC8f8B'
]

const setupTest = deployments.createFixture(async ({ deployments, getNamedAccounts, web3 }, options) => {
  await deployments.fixture('EMAOracleKeeperHub')
  const { deployer } = await getNamedAccounts()
  const contractDeployment = await deployments.get('EMAOracleKeeperHub')
  const contract = new web3.eth.Contract(contractDeployment.abi, contractDeployment.address)

  // add oracles
  for (const oracle of oracles) {
    await contract.methods.addOracle(oracle).send({ from: deployer })
  }

  return {
    deployer,
    emaOracleKeeperHub: contract
  }
})

describe('EMAOracleKeeperHub', accounts => {
  let deployer
  let emaOracleKeeperHub

  beforeEach(async () => {
    const deployResult = await setupTest()
    deployer = deployResult.deployer
    emaOracleKeeperHub = deployResult.emaOracleKeeperHub
  })

  it('basic test', async () => {
    // call checkUpkeep()
    const { upkeepNeeded, performData } = await emaOracleKeeperHub.methods.checkUpkeep('0x').call()

    console.log(`upkeepNeeded: ${upkeepNeeded}`)
    console.log(`performData: ${performData}`)

    // call performUpkeep()
    if (upkeepNeeded) {
      await emaOracleKeeperHub.methods.performUpkeep(performData).send({ from: deployer })
    }
  })
})
