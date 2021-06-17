const utils = require('./utils');

console.log(utils.generateUserList(utils.userList));
console.log(utils.getUserNames(utils.userList));

// try to reassign to the utils object; this is not possible as it is freezed
//try{
//    utils = 'something else';
//    console.log(utils + ' has been succesfully set to something else');
//}
//catch(err){
//    console.log('It is not possible to redefine' + utils + ':\n' + err);
//}

// try to redefine elements of the utils object; this is not possible too
// but it fails silently without throwing error!
//
//Array.from(Object.keys(utils)).map(item => {
//    try{
//        utils.item = 'something else';
//        console.log(item + ' has been succesfully set to something else');
//    }
//    catch(err){
//        console.log('It is not possible to redefine' + item + ':\n' + err);
//    }    
//});
//
// refactor the above to a function:

function redefine(item){ //import is not a valid variable name
    try{
        const copy = item;
        item = 'something else';
        console.log(copy + ' has been succesfully set to ' + item);
    }
    catch(err){
        console.log('It is not possible to redefine' + item + ':\n' + err);
    }
}

// try to reassign to the utils object; this is not possible as it is freezed
// but it fails silently without throwing an error!
//
redefine(utils);
console.log(utils);
// try to redefine elements of the util object; this is possible of course
// but it fails silently without throwing an error!
//
// Array.from(Object.keys(utils)) is an array containig the keys
Array.from(Object.keys(utils)).map(item => redefine(item));
console.log(utils);
