
A kész feladat feltöltésének helye:

Repo: str-hgk-sajat-munka

Almappa: nodejs-alapjai-events

Például: http://github.com/cherryApp/str-hgk-sajat-munka/nodejs-alapjai-events

Egy webes alkalmazás során mindig szükség van Logger-re. Ennek a megvalósításhoz készítened kell egy Logger class-t, ami kiterjeszti az EventEmitter osztályt! A Logger 2 metódussal rendelkezzen: error, success! Mindegyik metódus egy paraméterként kapott string-et ír ki a konzolra. Az error-t piros, a success-t zöld színnel!

Ezt a Logger class-t kell felhasználod a következő alkalmazás során, melyet szintén neked kell elkészíteni:
Az alkalmazás egy tetszőleges txt fájl tartalmát olvassa be stream segítségével, majd átalakítja úgy, hogy mindegyik szó első karaktere nagybetűs lesz, a kimenetet pedig elmenti egy új fájlba, aminek a neve az eredeti fájl neve összefűzve a Copy string-gel. A kiterjesztés .txt maradjon.
Amennyiben bármi hiba adódott, a Logger error metódusát kell meghívni, paraméterként átadva neki az error object message property-jének az értékét.
Amennyiben nem volt hiba, a Logger success metódusát kell meghívni, paraméterként átadva neki a következő string-et: "File transform successful."
