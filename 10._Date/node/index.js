//Object - UTC
console.log(new Date());

//String
console.log(Date());

//Number
console.log(Date.now());

//ISO 8601 - YYYY/MM/DD standard
//ISO 9126 - En anden standard inden for systemintegration

const date = new Date();

const danishDate = new Intl.DateTimeFormat("da-dk").format(date);
console.log(danishDate);

const americanDate = new Intl.DateTimeFormat("en-us").format(date);
console.log(americanDate);
