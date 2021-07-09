function capitalizeWord(w){return w === '' ? '' : w[0].toUpperCase() + w.slice(1).toLowerCase()}; //lehetnek üres szavak is!

function capitalize(str){return str.split(/([\. -])/).map(capitalizeWord).join("")}; // a str.split() függvényben ha a separator regex tartalmaz zárójelezett részkifejezést, akkor illeszkedés esetén az is a tömbbe kerül, így átalakítás (capitalizeWord) után üres separatorral lehet összefűzni. Két elválasztó, pl. pont és space jöhet egymás után, ezért lehetnek üres szavak is!

function stringCompare(a, b){ // ignoreCase
  let x = a.toLowerCase();
  let y = b.toLowerCase();
  if (x < y) {return -1;}
  if (x > y) {return 1;}
  return 0;
}

function movieCompare(a, b){ // ignoreCase
  let x = a.category.toLowerCase();
  let y = b.category.toLowerCase();
  if (x < y) {return -1;}
  if (x > y) {return 1;}
  return a.releaseYear - b.releaseYear;
}

// nem kell exportálni, load()-dal tölthető be
/*module.exports{
    capitalize,
    etc,
}*/