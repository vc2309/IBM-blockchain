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
    const payerBal = tx.payer.AC.value;
    const payeeBal = tx.payee.AC.value;

    //Save amt to be paid
    const amt = tx.amt;

    //Check if amt is less than balance
    if(amt<= payerBal && amt>0)
    {
        tx.payer.AC.value = payerBal - amt;
        tx.payee.AC.value = payeeBal + amt;
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

    //Validate addition
    if(amt>0)
    {
        AC.value += amt; 
    }

    //Send the updated balance back

    const accountRegistry = await getAssetRegistry('org.vishnuchopra.cryptonet.CryptoBalance');
    await accountRegistry.update(AC);
 }

/**
 * utxoPay
 * @param {org.vishnuchopra.cryptonet.utxoPay} utxoPay
 * @transaction
 */

 async function utxoPay(tx) {

    //Get payer priv key

    //Get tx pub key for payee

    //Get tx hashcode

    //Get actual payee priv key and tx pub key for payer

    //Get actual
 }