require('@nomiclabs/hardhat-truffle5')
require('hardhat-deploy')
require('hardhat-gas-reporter')
require('@nomiclabs/hardhat-solhint')
require('hardhat-spdx-license-identifier')
require('@nomiclabs/hardhat-etherscan')

let secret

try {
  secret = require('./secret.json')
} catch {
  secret = {
    account: '',
    mnemonic: ''
  }
}

module.exports = {
  solidity: {
    version: '0.8.3',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  namedAccounts: {
    deployer: {
      default: 1
    }
  },
  paths: {
    sources: './contracts'
  },
  networks: {
    mainnet: {
      url: 'https://eth-mainnet.alchemyapi.io/v2/pvGDp1uf8J7QZ7MXpLhYs_SnMnsE0TY5',
      chainId: 1,
      from: secret.account,
      accounts: {
        mnemonic: secret.mnemonic
      },
      gas: 'auto',
      gasPrice: 84.0000001e9
    },
    hardhat: {
      forking: {
        url: 'https://eth-mainnet.alchemyapi.io/v2/pvGDp1uf8J7QZ7MXpLhYs_SnMnsE0TY5',
        blockNumber: 12200000
      }
    },
    kovan: {
      url: 'https://eth-kovan.alchemyapi.io/v2/Bm0nm12ihwQoatvltj8hQyvZxFDePVTN',
      chainId: 0x2a,
      from: secret.account,
      accounts: {
        mnemonic: secret.mnemonic
      },
      gas: 'auto',
      gasPrice: 1e9
    }
  },
  spdxLicenseIdentifier: {
    runOnCompile: true
  },
  mocha: {
    timeout: 120000
  },
  etherscan: {
    apiKey: 'SCTNNP3MJK18WV84QIX6WPGMWIS8H1J9W7'
  }
}
