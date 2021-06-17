// transform each {firstName,lastName,age} object into {isAdult,fullName}
function generateUserList(userArr){
    return userArr.map(user => {
        const isAdult = user.age >= 18;
        const fullName = user.firstName + ' ' + user.lastName;
        return {
            isAdult:isAdult,
            fullName:fullName
        }
    })
}

const userList = [
    {
        firstName : 'John',
        lastName : 'Doe',
        age : 23
    },
    {
        firstName : 'Jane',
        lastName : 'Doe',
        age : 16
    }
]

//console.log(generateUserList(userList));

// transform array of {firstName,lastName,age} objects into comma separated fullNames
function getUserNames(arr){
//   Array.prototype.toString() returns comma separated values
    return arr.map(user => user.firstName + ' ' + user.lastName).toString();
}

//console.log(getUserNames(userList));

module.exports = Object.freeze({
    generateUserList:generateUserList,
    getUserNames:getUserNames,
    userList:userList
});
