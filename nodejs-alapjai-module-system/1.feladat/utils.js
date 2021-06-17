// icrease date Date by num days; default is 3 days
function increaseDate(date, num=3){
    //Date.prototype.getDate() returns the day of the month
    //Date.prototype.setDate() sets the day of the month (works even out of the month)
    return date.setDate(date.getDate() + num);
}

//console.log(increaseDate(new Date(),7));

// increase each date in arr by 3 days and print it as '2021. július 3.' for example
function increaseAndFormatDate(arr){
    const options = { // here we enumerate what we need from a Date object
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
                //weekday: 'long', //we don't need it
                };
    return arr.map(item => new Date(increaseDate(item)).toLocaleString('hu-HU', options));
}

//console.log(increaseAndFormatDate([new Date()]));

//module.exports = increaseAndFormatDate;
module.exports = Object.freeze({dataFormatter: increaseAndFormatDate});
