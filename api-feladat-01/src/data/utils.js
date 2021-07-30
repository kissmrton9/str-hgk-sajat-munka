const firstNames = ['Adorján','Aladár','Balázs','Demeter','Dorottya','Piroska','Tihamér'];
const lastNames = ['Sün'];
const vaccines = [null, 'Astra Zeneca', 'Pfizer', 'Sinopharm', 'Sputnik'];

function chooseARandomElement(arr){
    return arr[Math.floor(arr.length * Math.random())];
}

function generatePersonList(n){
    let id = 0;
    return new Array(n).map(item => {id++;
        return{
            id: id,
            firstName : chooseARandomElement(firstNames),
            lastName : chooseARandomElement(lastNames),
            vaccine: chooseARandomElement(vaccines)
        }
    })
}

const data = function(){
    let id = 0;
    return firstNames.map(item => {id++;
        return{
            id: id,
            firstName: item,
            lastName: 'Sün',
            vaccine: chooseARandomElement(vaccines)
        }
    })
}

console.log(vaccines.length * Math.random());
console.log(chooseARandomElement(vaccines));

console.log(JSON.stringify(data(),null,4));
//console.log(personList = generatePersonList(10));

module.exports = Object.freeze({
    generatePersonList:generatePersonList,
    //personList:personList,
    data:data
});
