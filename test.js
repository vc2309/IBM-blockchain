function modexp(x,y,N)
{
    if (y===0){
        return 1;
    }
    var z = modexp(x,Math.floor(y/2),N);
    if(y%2===0)
    {
        return Math.pow(z,2)%N;
    }
    else{
        return (x*(Math.pow(z,2)))%N;
    }
}

function safePay(tx) {

    //Get P and G
    const pub_P = tx.pubkeys[0];
    const pub_G = tx.pubkeys[1];

    //Calculate x
    const PYR_pk = tx.pk1;
    console.log(PYR_pk);
    console.log(pub_P);
    const PYE_pk = tx.pk2;
    const x = modexp(pub_G,PYR_pk,pub_P);
// const x = Math.pow(pub_G,PYR_pk)%pub_P;
	console.log(x);
    //Calculate kb and ka
    const ka = modexp(tx.y,PYR_pk,pub_P);
    // const ka = Math.pow(tx.y,PYR_pk)%pub_P;
    const kb = modexp(x,PYE_pk,pub_P);
    // const kb = Math.pow(x,PYE_pk)%pub_P;
	console.log(ka);
	console.log(kb);
    if(ka!=kb)
    {
        throw "Invalid keys. Transaction failed";
    }

    var utxoTX = {
        payer : tx.payer,
        payee : tx.payee,
        amt : tx.amt
    }

    console.log("OK");


 }

safePay({
  "$class": "org.vishnuchopra.cryptonet.safePay",
  "pk1": 4,
  "pk2": 3,
  "amt": 10,
  "y": 16,
  "pubkeys": [23,9]
});
