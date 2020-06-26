// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];



function validateCred(arr) {
    if (arr.length < 1 || !arr.every(Number.isInteger)) {
        console.log('Entered if block', arr)
        return false;
    }
    // Start with last digit; hold that value as is
    let reverseBatch = arr.slice().reverse();

    //starting with the next to last number and every other number after, double and reduce by 9 if > 9. 
    for (let i = 1; i < reverseBatch.length; i += 2) {
        reverseBatch[i] *= 2;
        if (reverseBatch[i] > 9) {
            reverseBatch[i] -= 9;
        }

    }
    let numSum = 0;
    //add the prior to step values together
    for (j = 0; j < reverseBatch.length; j++) {
        numSum += reverseBatch[j];
    }
    if (numSum % 10 !== 0) {
        return false;
    }

    //divide above value by 10. if result is divisible by 10, then valid CC#
    return true;
}




function findInvalidCards(batch) {
    let goodCC = [];
    let badCC = [];
    //checks CC#s for invalid CC#-need to call validateCred fnc
    for (let k = 0; k < batch.length; k++) {
        if (validateCred(batch[k]) === true) {
            goodCC.push(batch[k]); //place good CC# in one array
        } else badCC.push(batch[k]); //place bad cc# in 2nd array and returns them
    }
    console.log("Good CC", goodCC)
    console.log("Bad CC", badCC)
    return badCC;
}

function idInvalidCardCompanies(badCC) {
    let ccCompany = [];
    for (let m = 0; m < badCC.length; m++) {
        switch (badCC[m][0]) {
            case 3:
                if (!ccCompany.includes('AMEX')) ccCompany.push('AMEX');
                break;
            case 4:
                if (!ccCompany.includes('Visa')) ccCompany.push('Visa');
                break;
            case 5:
                if (!ccCompany.includes('MC')) ccCompany.push('MC');
                break;
            case 6:
                if (!ccCompany.includes('Disc')) ccCompany.push('Disc');
                break;
            default:
                if (!ccCompany.includes('Company not found.')) ccCompany.push('Company not found.');
                break;

        }
    }
    return ccCompany;
}



 console.log(idInvalidCardCompanies(findInvalidCards(batch)));




