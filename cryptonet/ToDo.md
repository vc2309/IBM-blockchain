# To Do

## RESTful user app :
1. set up user auth
2. Get balance
3. Pay to person
4. Send request
5. Check reqs
6. mine
7. listen for events

For admin:
1. View transactions, all members
2. add value to account

## Chaincode :
1. Payment authentications
2. Payment validation
3. Set up events

## Model file 
```
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

/**
 * Write your model definitions here
 */

namespace org.vishnuchopra.cryptonet

participant Member identified by participantId {
  o String participantId
  o String firstName
  o String lastName
  o String passcode
  o String [] pubKeys
  --> CryptoBalance AC
}

asset CryptoBalance identified by ACno {
  o String ACno
  o Double unspentBalance
  o CoinBlock [] inputs
}

asset CoinBlock identified by coinHash{
  o String coinHash
  o Double value
}

asset SampleAsset identified by assetId {
  o String assetId
  --> Member owner
  o String value
}

transaction SampleTransaction {
  --> SampleAsset asset
  o String newValue
}

transaction simplePay {
  --> Member payer
  --> Member payee
  o Double amt
}

transaction addValue {
  --> Member adder
  o Double amt
}

event PayEvent {
  --> Member payer
  --> Member payee
  o Double amt
}

event SampleEvent {
  --> SampleAsset asset
  o String oldValue
  o String newValue
}

```