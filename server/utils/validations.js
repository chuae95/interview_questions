function validateUENNumber(uen) {

    let result = {};

    let lengthTest = checkLength(uen);

    let characterTest = checkInvalidCharacters(uen);

    if (!lengthTest || !characterTest) {
        result['status'] = false;
        result['type'] = '';
        return result;
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

    console.log('test')

    let test = true;
    let result = {};

    let digits = str.substring(0, 9);
    let alphabet = str[str.length - 1];
    
    test = digitsCheck(digits) && alphabetCheck(alphabet);

    if (test) {
        result['status'] = test;
        result['type'] = 'businessUen';
    } else {
        result['status'] = test;
        result['type'] = '';
    }

    return result;

}

function validLocalBusinessAcraCheck(str) {

    let test = true;
    let result = {};

    let year = str.substring(0, 4);
    let digits = str.substring(4, 9);
    let alphabet = str[str.length - 1];

    if (/^[0-9]*$/.test(year)) {
        let yearValue = parseInt(year);
        test = new Date().getFullYear() >= yearValue;
    } else {
        test = false;
    }

    test = digitsCheck(digits) && alphabetCheck(alphabet);

    if (test) {
        result['status'] = test;
        result['type'] = 'localBusinessUen';
    } else {
        result['status'] = test;
        result['type'] = '';
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

    if (test) {
        result['status'] = test;
        result['type'] = 'otherEntitiesUen';
    } else {
        result['status'] = test;
        result['type'] = '';
    }

    return result;
}

function validLocalBusinessOrOtherEntitiesCheck(str) {

    let test = true;

    if (/[R-T]/.test(str[0])) {
        //trigger other entity check
        test = validOtherEntitiesCheck(str);
    } else if (/[0-9]/.test(str[0])) {
        //trigger valid local business check
        test = validLocalBusinessAcraCheck(str);
    } else {
        //it does not fall under the above checks so instantly fail
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

    let entities = ["LP", "LL", "FC", "PF", "RF", "MQ", "MM", "NB", "CC", "CS", "MB", "FM", "GS", "DP", "CP", "NR", "CM", "CD", "MD", "HS", "VH", "CH", "MH", "CL", "XL", "CX", "HC", "RP", "TU", "TC", "FB", "FN", "PA", "PB", "SS", "MC", "SM", "GA", "GB"];

    if (entities.indexOf(str) < 0) {
        test = false;
    } 

    return test;
}

module.exports = { validateUENNumber };