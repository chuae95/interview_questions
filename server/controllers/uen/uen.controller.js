const validateUENNumber = require('../../utils/validations');

const validateUEN = (req, res) => {

    let providedStr = req.body.value;
    let modified = providedStr.replace(/\s/g, "").toUpperCase();

    let result = validateUENNumber.validateUENNumber(modified);

    res.send(result)

};

module.exports = { validateUEN };