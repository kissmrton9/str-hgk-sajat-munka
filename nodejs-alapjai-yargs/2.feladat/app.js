const yargs = require('yargs');
const products = require ('./productFactory');

function totalPrice(products){
    let sum = 0;
    products.map(item => {sum += item.price * item.count});
    return sum
}

function totalNumber(products){
    let num = 0;
    products.map(item => {num += item.count});
    return num    
}

function lessThanCountAvailable(products,count){
    console.log('Less than ' + count + ' available:');
    products.map(item => {if(item.count < count) console.log(item)});
}

yargs
    .usage('Usage: $0 <command> [options]')
//    .locale('en') // ezt is lehet, de minek
//    Így is lehetne:
//    .command('sum', 'Count the total price', () => console.log(products))
//    .option('option', { // a global option
        //alias: 'o',
        //describe: "a fine option",
        //demandOption: true
//    })
    .command({
        command: 'sum',
        describe: 'Count the total price',
        handler: () => console.log('Total price:', totalPrice(products))
    })
    .command({
        command: 'avg',
        describe: 'Count the average price',
        handler: () => console.log('Average price:', totalPrice(products)/totalNumber(products))
    })
    .command({
        command: 'lessthan',
        describe: 'List products of which less than count is available',
        builder: {count: {alias: 'c', type: 'number', demandOption: true}}, //local option only for command lessthan
        handler: ({count}) => lessThanCountAvailable(products,count)
    })
//    .middleware(callbacks, [applyBeforeValidation]) // to set environment before command execution
    .strict()
    .help()
//    .argv // last is always .argv or .parse()
    .parse()// args instead of process.argv // see nodejs .process documentation
            // but the structure is different, see in
            //console.log(args) and console.log(process.argv);

