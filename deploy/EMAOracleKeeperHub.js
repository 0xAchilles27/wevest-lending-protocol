module.exports = async ({ web3, getNamedAccounts, deployments, getChainId, artifacts }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const deployResult = await deploy('EMAOracleKeeperHub', {
    from: deployer
  })
  if (deployResult.newlyDeployed) {
    log(`EMAOracleKeeperHub deployed at ${deployResult.address}`)
  }
}
module.exports.tags = ['EMAOracleKeeperHub']
module.exports.dependencies = []
