const fcl = require('@onflow/fcl');
const t = require('@onflow/types');
const { holdingScripts } = require('../holdings/nftholdings');

const checkOwnsCustom = async (customName, user) => {
  const scriptCode = holdingScripts[customName.toLowerCase()];

  try {
    const result = await fcl.send([
      fcl.script(scriptCode),
      fcl.args([
        fcl.arg(user, t.Address),
      ])
    ]).then(fcl.decode);
    console.log(result);
    return result;
  } catch (e) {
    console.log(e)
    return { error: true, message: 'You do not own this Custom entity.' };
  }
}

module.exports = {
  checkOwnsCustom
}