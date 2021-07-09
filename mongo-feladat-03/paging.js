try{
    let db = new Mongo().getDB("videoStore");
// or being more specific
// let db = connect("localhost:27017/videoStore");
}
catch(err){ // to reload safely
    // print ("changing to db videoStore")
    db = new Mongo().getDB("videoStore");
}
cursor = db.movies.find({});
for(let i=0; i<2; i++){ 
    printjson( cursor.next() );
}
while ( cursor.hasNext() ) {
    print("--page over--");
    for(let i=0; i<2; i++){ 
       printjson( cursor.next() );
    }
}