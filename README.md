
# 7 Days Lotto 🎰

A decentralized, automated weekly lottery using Chainlink VRF and Automation. Players pay in USDC and a random winner is selected every 7 days.

## Features
- 79% prize to winner
- 1% reward to referrer of the winner
- 15% for marketing
- 5% for platform/owner fee
- Requires minimum 1000 participants to activate
- Chainlink VRF randomness
- Chainlink Automation for execution

## Setup

### 1. Install dependencies
```bash
npm install --save-dev hardhat ethers @chainlink/contracts @openzeppelin/contracts
```

### 2. Deploy contract
Edit and run:
```bash
npx hardhat run scripts/deploy_7days_lotto.js --network polygon
```

### 3. Register Chainlink Automation
Edit and run:
```bash
node scripts/chainlink_setup.js
```

## Contract Details
- Token: USDC (6 decimals)
- Minimum ticket price: configurable
- Chainlink VRF: for secure randomness
