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
    const payerBal = tx.payer.balance;
    const payeeBal = tx.payee.balance;

    //Save amt to be paid
    const amt = tx.amt;

    //Check if amt is less than balance
    if(amt<= payerBal)
    {
        tx.payer.balance = payerBal - amt;
        tx.payee.balance = payeeBal + amt;
    }

    //Return new payee and payer vals
    // Get the participant registry for the participant.
    const participantRegistry = await getParticipantRegistry('org.vishnuchopra.cryptonet.SampleParticipant');
    // Update the participant in the participant registry.
  
    await participantRegistry.update(tx.payer);
    await participantRegistry.update(tx.payee);

    //Emit event for modified payee + payer
    let event = getFactory().newEvent('org.vishnuchopra.cryptonet', 'PayEvent');
    event.payee = tx.payee;
    event.payer = tx.payer;
    event.amt = amt;
    emit(event);
}
