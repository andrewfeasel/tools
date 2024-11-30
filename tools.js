/* 
    DOM 
*/
const $ = (x) => document.getElementById(x);

/*
    PIPE
*/

//@example

// const inc = x => x + 1;
// const double = x => x * 2;
// pipe(inc, double)(3); // => 8
// pipe(double, inc)(3); // => 7
const pipe = (...fns) => {
  if (fns.length === 0) {
    return fn => fn;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return fns.reduceRight((a, b) => (...args) => a(b(...args)));
};

/* 
    ERRORS
*/
const logError = (error) => (`${error.name}: ${error.message}.`);

// Event Listener
document.addEventListener("DOMContentLoaded", (event) => {
    const element  = document.getElementById('element');
    element.onclick = () => {
        //insert code here
    };
});

/* 
    HTTP
*/
async function request(url){
    try {
        switch(getProtocol(url)){
            case 'None':
                url = 'https://' + url;
                break;
        }
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (e) {
        return e;
    }
}
const getProtocol = (url) => {
    let proto = url.match(/^([A-Za-z]+):/);
    if (proto) {
        return proto[1].toLowerCase();
    } else {
        return 'None';
    }
}
/*
    STRINGS
*/

// string => camelCase string
const camelCase = subjectString => {
  if (typeof subjectString !== 'string') {
    throw new TypeError('Expected a string for first argument');
  }

  const wordSeparatorRegexp = /[\s\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-./:;<=>?@[\]^_`{|}~]+/;
  const words = subjectString.split(wordSeparatorRegexp);

  return words.filter(Boolean).reduce((accum, word, index) => {
    const firstChar = word.substring(0, 1);
    const restChars = word.substring(1);
    const tempStr = index === 0 ? firstChar.toLowerCase() + restChars : firstChar.toUpperCase() + restChars;
    return accum + tempStr;
  }, '');
};

// HTML tags, begone!
const stripHTML = subjectString => {
  return subjectString.replace(/<[^>]+>/g, '');
};

//string with line breaks => array of those lines
const lines = subjectString => {
  return subjectString.replace(/\r\n/g, '\n').split('\n');
};

// random string
const randomString = (len, chars = '#aA!') => {
  const charsError = 'Expected a string for second argument, that contains one or more of the following characters: "#", "a", "A", "!"';

  if (typeof len !== 'number') {
    throw new TypeError('Expected a number for first argument');
  }

  if (typeof chars !== 'string' || chars === '') {
    throw new TypeError(charsError);
  }

  let mask = '';
  let result = '';

  const mapCharSampleToAllowedChars = {
    'a': 'abcdefghijklmnopqrstuvwxyz',
    'A': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    '#': '0123456789',
    '!': '!#$%&()*+,\\-./:;<=>?@[]^_{|}~'
  };

  for (const key in mapCharSampleToAllowedChars) {
    if (
      Object.prototype.hasOwnProperty.call(mapCharSampleToAllowedChars, key)
      && chars.indexOf(key) > -1
    ) {
      mask += mapCharSampleToAllowedChars[key];
    }
  }

  if (!mask.length) {
    throw new TypeError(charsError);
  }

  for (let i = 0; i < len; i += 1) {
    result += mask[Math.floor(Math.random() * mask.length)];
  }

  return result;
};
// string with words => array of those words
const words = subjectString => {
  if (typeof subjectString !== 'string') {
    throw new TypeError('Expected a string for first argument');
  }

  const punctRegExp = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-./:;<=>?@[\]^_`{|}~]/g;
  const nonSpaceRegExp = /\S+/g;

  return subjectString.replace(punctRegExp, '').match(nonSpaceRegExp) || [];
};

/*
    MATH
*/

// Percentages
function percent01 (a, b, base = 0) {
  if (a > b || base > b) {
    return 1
  } else if (a < base || base > a) {
    return 0
  } else {
    return (a - base) / b
  }
}

//Averages
const average = (...nums) => {
  let sum = 0;
  let count = 0;
  let len = nums.length;

  if (len === 1 && Array.isArray(nums[0])) {
    nums = nums[0];
    len = nums.length;
  }

  while (len--) {
    const num = nums[len];

    if (Number.isFinite(num)) { // equivalent of
      sum += num;
      count += 1;
    }
  }

  return count > 0 ? sum / count : 0;
};

//Is my number in between two other numbers? (inclusive)
const inRange = (value, min, max) => {
  return value >= Math.min(min, max) && value <= Math.max(min, max);
};

// Random Number Generator (inclusive)
const randomInt = (min, max) => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('Expected all arguments to be numbers');
  }

  return Math.floor(
    Math.min(min, max) + Math.random() * (Math.max(min, max) - Math.min(min, max) + 1)
  );
};