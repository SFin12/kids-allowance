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
      const centValue = numVal + "0¢"
      return centValue.slice(2)
    } else {
      return (numVal + "¢").slice(2)
    }
    // keep dollar sign but make sure two decimals are present Ex: 1.50¢
  } else if ((numVal % 1).toFixed(2).toString().length > 3) {
    const newVal = "$" + numVal.toFixed(2)
    return newVal
  } else {
    return "$" + numVal
  }
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function convertPointsToDollars(value, conversionRate) {
  return Number((value * conversionRate).toFixed(2))
}

export function convertDollarsToPoints(value, conversionRate) {
  if (conversionRate === 1) return value
  return Number(Math.round(Number(value) * (1 / conversionRate)))
}

export function getPWADisplayMode() {
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches
  if (document.referrer.startsWith("android-app://")) {
    return "twa"
  } else if (navigator.standalone || isStandalone) {
    return "standalone"
  }
  return "browser"
}