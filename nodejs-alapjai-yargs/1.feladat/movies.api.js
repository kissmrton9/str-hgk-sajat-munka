const { readFileSync, writeFile } = require('fs') // inicializáláskor úgyis le kell tölteni mindent, úgyhogy az mehet szinkronban

const MoviesApi = (path, prop) => ({
  initialize () {
    const dataString = readFileSync(path)
    return JSON.parse(dataString)[prop]
  },

  get () { }, // ez meg nem is kell máshol

  save (data) {
    writeFile(path, JSON.stringify({ [prop]: data }), 
        (err) => {
            if (err) throw err;
            console.log('MoviesApi.save() saved data');
        }
    )
  }
})

module.exports = MoviesApi
