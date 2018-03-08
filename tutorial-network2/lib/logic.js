'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
//  * @param {org.example.biznet.ChangeAssetValue} changeAssetValue
//  * @transaction
//  */
// function onChangeAssetValue(changeAssetValue) {
//     var assetRegistry;
//     var id = changeAssetValue.relatedAsset.assetId;
//     return getAssetRegistry('org.example.biznet.SampleAsset')
//         .then(function(ar) {
//             assetRegistry = ar;
//             return assetRegistry.get(id);
//         })
//         .then(function(asset) {
//             asset.value = changeAssetValue.newValue;
//             return assetRegistry.update(asset);
//         });
// }

/**
 * Track the trade of a commodity from one trader to another
 * @param {org.acme.biznet.Trade} trade - the trade to be processed
 * @transaction
 */

function tradeCommodity(trade) {
    trade.commodity.owner = trade.newOwner;
    return getAssetRegistry('org.acme.biznet.Commodity')
        .then(function (assetRegistry) {
            return assetRegistry.update(trade.commodity);
        });
}