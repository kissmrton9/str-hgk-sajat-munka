const productFactory = function(id=0, name='A new product', price=0, count=0){
    return {
        id: id,
        name: name,
        price: price,
        count: count
    }
};

const generateProducts = function(n){
    let products = new Array(n);
    for(let i=0; i<n; i++){
        products.push(productFactory(i+1, `prod_${i+1}`, Math.floor(1000*Math.random())+1, Math.floor(1000*Math.random())+1));
    }
    return products;
};

// generate product with the following:
// const products = generateProducts(5);
const products = [ 
    { id: 1, name: 'prod_1', price: 329, count: 944 },
    { id: 2, name: 'prod_2', price: 464, count: 991 },
    { id: 3, name: 'prod_3', price: 599, count: 652 },
    { id: 4, name: 'prod_4', price: 515, count: 912 },
    { id: 5, name: 'prod_5', price: 365, count: 39 }
];


//console.log(products);

module.exports = products;