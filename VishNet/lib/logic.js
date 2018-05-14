'use strict';
/**
 * Write your transction processor functions here
 */

async function tradeCommodity(trade) {
    trade.commodity.owner = trade.newOwner;
    let assetRegistry = await getAssetRegistry('org.vishnuchopra.vishnet.Commodity');
    await assetRegistry.update(trade.commodity);
}