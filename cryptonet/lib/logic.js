/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.vishnuchopra.cryptonet.SampleTransaction} sampleTransaction
 * @transaction
 */
async function sampleTransaction(tx) {
    // Save the old value of the asset.
    const oldValue = tx.asset.value;

    // Update the asset with the new value.
    tx.asset.value = tx.newValue;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.vishnuchopra.cryptonet.SampleAsset');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.vishnuchopra.cryptonet', 'SampleEvent');
    event.asset = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);
}

/**
 * simplePay
 * @param {org.vishnuchopra.cryptonet.simplePay} simplePay
 * @transaction
 */
async function simplePay(tx) {
    //Save old payer, payee value
    const payerBal = tx.payer.AC.unspentBalance;
    const payeeBal = tx.payee.AC.unspentBalance;

    //Save amt to be paid
    const amt = tx.amt;

    //Check if amt is less than balance
    if(amt<= payerBal && amt>0)
    {
        tx.payer.AC.unspentBalance = payerBal - amt;
        tx.payee.AC.unspentBalance = payeeBal + amt;
    }

    else
    {
        //emit error event   
    }

    //Return new payee and payer vals
    // Get the participant registry for the participant.
    const accountRegistry = await getAssetRegistry('org.vishnuchopra.cryptonet.CryptoBalance');
    // Update the participant in the participant registry.
  
    await accountRegistry.update(tx.payer.AC);
    await accountRegistry.update(tx.payee.AC);

    //Emit event for modified payee + payer
    // let event = getFactory().newEvent('org.vishnuchopra.cryptonet', 'PayEvent');
    // event.payee = tx.payee;
    // event.payer = tx.payer;
    // event.amt = amt;
    // emit(event);
}


/**
 * addValue
 * @param {org.vishnuchopra.cryptonet.addValue} addValue
 * @transaction
 */

 async function addValue(tx) {

    //Save the amt to be added
    var amt = tx.amt;

    //Save adding member
    var AC = tx.adder.AC;
   
   //First get the registry
   const accountRegistry = await getAssetRegistry('org.vishnuchopra.cryptonet.CryptoBalance');
   const coinRegistry = await getAssetRegistry('org.vishnuchopra.cryptonet.CoinBlock');
    const factory = getFactory();
    //Validate addition
    if(amt>0)
    {   
        //Add to unspentbal
        AC.unspentBalance += amt;
        //Append amt to inputs
        const allCoins = await coinRegistry.getAll();
        var coinHash = allCoins.length + 1;
        var newCoin = factory.newResource('org.vishnuchopra.cryptonet', 'CoinBlock', coinHash.toString());
        newCoin.value=amt;
      //Add the new coinBlock to the registry
        coinRegistry.add(newCoin);
          //.then( () => {
          //Add the coin to inputs array
    AC.inputs.push(newCoin);
        //})
        //  .catch( (e) => {
          //throw e;
        //});
        
        
        //AC.inputs.push(amt);
    }

    //Send the updated balance back

    await accountRegistry.update(AC);
 }


/**
 * utxoPay
 * @param {org.vishnuchopra.cryptonet.utxoPay} utxoPay
 * @transaction
 */

async function utxoPay (tx) {

    //Get input array

    //Validate both users are valid and not the same person

    //Sum input array

    //Validate amt -not neg -not more than value total

    //Set payer input to []

}


// /**
//  * safePay
//  * @param {org.vishnuchopra.cryptonet.safePay} safePay
//  * @transaction
//  */

//  async function safePay(tx) {

//     //Get payer priv key
//     const privKey_PYR = tx.payer.privateKey;

//     //Get tx pub key for payee
//     const tx_pubKey_PYE = tx.pubKey_PYE;

//     //Get tx hashcode
//     const tx_hashcode = tx.hashcode;

//     //Get actual payee priv key and pub key for payer
//     const privKey_PYE = tx.payee.privateKey;
//     const tx_pubKey_PYR = tx.pubKey_PYR;

//     //Get actual hashcode
//     var hashcode_actual = ;

//     //Check equality


//     //Sum all the payers inputs

//     //Check if amt is less than Unspent balance

//     //If yes, add amt to payee unspent balance, and sub


//  }