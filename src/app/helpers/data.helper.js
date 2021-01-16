const isValid = require('date-fns/isValid');

const dateReg = /^\d{4}-\d{2}-\d{2}$/;

const validarData = (data) => {
   if (data.match(dateReg) && isValid(new Date(data))) {
       return true;
   } else {
       return false;
   }
}

module.exports = (value) => { return value ? validarData(value) : true };
