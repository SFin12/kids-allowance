export function isFloat(number) {
    // make sure it is converted to a number if it is a string.
    const num = Number(number);
    if (isNaN(num)) {
        return NaN;
    }
    // If there is a remander, it is a float
    if (num % 1 !== 0) {
        return true;
    } else {
        return false;
    }
}

export function convertDecimalsToDollarsAndCents(numVal) {
    if (numVal < 1) {
        // convert to cents format
        if ((numVal % 1).toString().length === 3) {
            const centValue = numVal + "0¢";
            return centValue.slice(2);
        } else {
            return (numVal + "¢").slice(2);
        }
        // keep dollar sign but make sure two decimals are present Ex: 1.50¢
    } else if ((numVal % 1).toString().length === 3) {
        const newVal = "$" + numVal + "0";
        return newVal;
    } else {
        return "$" + numVal;
    }
}


export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}