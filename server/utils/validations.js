function validateUENNumber(uen) {

    let lengthTest = checkLength(uen);

    let characterTest = checkInvalidCharacters(uen);

    if (!lengthTest || !characterTest) {
        return setResponse(false, 'invalidUen', 'Format of UEN number provided is incorrect, check the length and make sure no invalid characters are given');
    }

    return validAcraTypeTest = uen.length == 9 ? validBusinessAcraCheck(uen) : validLocalBusinessOrOtherEntitiesCheck(uen);
    
}

function checkLength(str) {
    return (str.length < 9 || str.length > 10) ? false : true
}

function checkInvalidCharacters(str) {
    return !(/[^A-Z\d:]/.test(str));
}

function validBusinessAcraCheck(str) {

    let test = true;
    let result = {};

    let digits = str.substring(0, 9);
    let alphabet = str[str.length - 1];
    
    test = digitsCheck(digits) && alphabetCheck(alphabet);

    if (test) {
        result = setResponse(test, 'businessUen', 'UEN number Provided matches a business registered with ACRA.');
    } else {
        result = setResponse(test, 'invalidBusinessUen', 'Invalid UEN number format.');
    }

    return result;

}

function validLocalBusinessAcraCheck(str) {

    let test = true;
    let result = {};

    let year = str.substring(0, 4);
    let digits = str.substring(4, 10);
    let alphabet = str[str.length - 1];

    test = digitsCheck(digits) && alphabetCheck(alphabet) && yearCheck(year);

    if (test) {
        result = setResponse(test, 'localBusinessUen', 'UEN number Provided matches a local business registered with ACRA.');
    } else {
        result = setResponse(test, 'invalidLocalBusinessUen', 'Invalid UEN number format.');
    }

    return result;
}

function validOtherEntitiesCheck(str) {
    let test = true;
    let result = {};

    let year = str.substring(1, 3);
    let entity = str.substring(3, 5);
    let digits = str.substring(5, 9);
    let alphabet = str[str.length - 1];

    test = digitsCheck(year) && alphabetCheck(alphabet) && digitsCheck(digits) && entityCheck(entity);

    result['status'] = test;

    if (test) {
        result = setResponse(test, 'otherEntitiesUen', 'UEN number Provided matches new UEN issued for other entities');

    } else {
        result = setResponse(test, 'invalidOtherEntitiesUen', 'Invalid UEN number format');
    }

    return result;
}

function validLocalBusinessOrOtherEntitiesCheck(str) {

    let result = {}

    if (/[R-T]/.test(str[0])) {
        //trigger other entity check
        result = validOtherEntitiesCheck(str);
    } else if (/[0-9]/.test(str[0])) {
        //trigger valid local business check
        result = validLocalBusinessAcraCheck(str);
    } else {
        //it does not fall under the above checks so instantly fail
        result = setResponse(false, 'invalidLocalBusinessOrOtherEntitiesUen', 'UEN number Provided does not match either local business ACRA or other Entities format');
    }

    return result;

}

function yearCheck(str) {

    let test  = true;

    if (/^[0-9]*$/.test(str)) {
        let yearValue = parseInt(str);
        test = new Date().getFullYear() >= yearValue;
    } else {
        test = false;
    }

    return test;

}

function digitsCheck(str) {
    let test = true;

    for (let i = 0; i < str.length - 1; i++) {

        if (isNaN(parseInt(str[i]))) {
            test = false;
            break;
        }

    }

    return test;
}

function alphabetCheck(str) {
    let test = true;

    if(!/[A-Z]/.test(str)) {
        test = false;
    }

    return test;
}

function entityCheck(str) {
    let test = true;

    const entities = ["LP", "LL", "FC", "PF", "RF", "MQ", "MM", "NB", "CC", "CS", "MB", "FM", "GS", "DP", "CP", "NR", "CM", "CD", "MD", "HS", "VH", "CH", "MH", "CL", "XL", "CX", "HC", "RP", "TU", "TC", "FB", "FN", "PA", "PB", "SS", "MC", "SM", "GA", "GB"];

    if (entities.indexOf(str) < 0) {
        test = false;
    } 

    return test;
}

function setResponse(testStatus, type, description) {

    let resp = {}

    resp['status'] = testStatus;
    resp['type'] = type;
    resp['description'] = description;

    return resp;

}

module.exports = { validateUENNumber };