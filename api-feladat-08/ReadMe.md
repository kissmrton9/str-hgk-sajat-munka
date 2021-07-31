A kész feladat feltöltésének helye:

Repo: str-hgk-sajat-munka

Almappa: api-feladat-01

Például: http://github.com/cherryApp/str-hgk-sajat-munka/api-feladat-01


Gyakorlófeladat

Készíts egy egyszerű, működő ESZT (Egészségügyi Szuri Tár) API alkalmazást, amellyel nyilvántarthatjuk, melyik személy milyen védőoltást kapott az országban.

    Készíts egy ideiglenes JSON fájl adatbázist, amely a személyeket tartalmazza, minden személy rendelkezzen az alábbi adatokkal:
        id: egyedi azonosító (number)
        firstName: keresztnév (string)
        lastName: vezetéknév (string)
        vaccine: milyen típusú oltást kapott a személy (string) (elhagyható, ha valaki még nem kapott oltást)
    Implementáld a GET /person/count végpontot, amely visszaadja az oltott személyek számát.
    Implementáld a GET /person/vaccinated végpontot, amely csak a beoltott személyek adatait adja vissza.
    Készíts egy egyszerű Swagger dokumentációt az elkészült API alkalmazáshoz.

    Az útvonalválasztást express.Router segítségével oldd meg!
    Az adatbázis egy darab JSON fájl legyen!
    Minden elkészült végpontot tesztelj böngésző segítségével!

