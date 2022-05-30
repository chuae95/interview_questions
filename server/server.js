const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post("/uenValidation", (req, res) => {

    let result = validateUENNumber(req.body.value);

    if (result) {
        res.send({status: true})
    } else {
        res.send({status: false})
    }


})

function validateUENNumber(uen) {

    let lengthTest = checkLength(uen);

    let validAcraTypeTest = uen.length == 9 ? validBusinessAcraCheck(uen) : validLocalBusinessOrOtherEntitiesCheck(uen);

    return validAcraTypeTest && lengthTest;
    
}

function checkLength(str) {
    return (str.length < 9 || str.length > 10) ? false : true
}

function validBusinessAcraCheck(str) {

    console.log('test')

    let test = true;

    let digits = str.substring(0, 9);
    let alphabet = str[str.length - 1];
    
    test = digitsCheck(digits) && alphabetCheck(alphabet);

    return test;

}

function validLocalBusinessAcraCheck(str) {

    let test = true;

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

    return test;
}

function validOtherEntitiesCheck(str) {
    let test = true;

    let year = str.substring(1, 3);
    let entity = str.substring(3, 5);
    let digits = str.substring(5, 9);
    let alphabet = str[str.length - 1];

    test = digitsCheck(year) && alphabetCheck(alphabet) && digitsCheck(digits) && entityCheck(entity);
    
    return test;
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

app.listen(5000, () => {
    console.log("Server started on port 5000")
})