const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()

app.use(express.static('public'))

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const superheroes = [
{  id: 1, nombre: 'Batman' ,imagen: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAGIAOAMBIgACEQEDEQH/xAAcAAABBQADAAAAAAAAAAAAAAAGAAMEBQcBAgj/xAA9EAABAwMCAwUGAQkJAAAAAAABAgMEAAURBhIHITETQVFhcRQigZGhsdEVFiMyQlKSssEXJFNicoKTwuH/xAAYAQEAAwEAAAAAAAAAAAAAAAAAAQIDBP/EACIRAAMAAAQHAQAAAAAAAAAAAAABAgMRE1EEEhQhMUFxMv/aAAwDAQACEQMRAD8APOJmtHtIMW0xGmnnpDxU425n3mUAbwOfJWVJAPTyNFlsnx7pb40+E52keS2lxtXikjIrC+OtwU9rFiIkjZGhJGPBS1KJ+gRQnC1Ffo0BuBCukyPEazsaadKQMkk9PMmgPVNdS4gdVp+deU3ZVxkkmTOfdJ/fcKvvTOxz/EVQHrMEHpWd8YtVybHb4dutchUedNWVF1s+822jGSPMkgem6sTQ7Ka5tSXUn/KoimJ02U+UqlPOPKSMJLiiogeAJoD09oy9p1FpqDc8AOOow8lPRLiSUrHpuBx5UqAeAFz7a2XS2rUcsvpfQD3BYwcfFGfjSoDOeJ75kcRL2ok4S8hA/wBraB/SqVpW0cqs9bIclcQrw0wgrdduCm0JHVSiQkD50XT+Elyh2Rya3cmZEtpsuLiIZIBAGSErzzPXqBnyoACC6cGTUdByMin2zQsdiccqhzP1TVpboL9zuMeDFSC/IcDaATgZPefIdaK9YcMZNlsLtzZuKJXs6N77fY7MJ71JO45x4cuXyoQyHwNn+y61RHKsCXHcax4kDeP5D865qg4dSPZNcWVzOMy0N/xnb/2pVBAtSPvwtfXWelCtzF3dcQpQO0lLpIGfhWgXLi7CeszrVuiyEz3WyjLu3Y2SMZyCScd3IfCu942WrXV2gyANr7gmM7gPeQ4Bu+TiV/OrREeA+kFcWOsebaTWN43LWTRvGDzrNMxZGMAJp5lQ6HxNbGuy2R4fpLXCV6sJ/CmBpnT4VkWqH/xA1HUzsW6etzLIFyXablGuDCkh2O4Fp3HkcdQfUcqPr/xGdv8AY3rdabPMU9KaLS17d6UBQwcEdeWeuKImLda4o/u8KM1j9xpI+wpx59pKcJAqr4nZFlw+7MhtVjuFpv2n5ExtLKnrmwlDe7KhhxHXHLvHfSo8tUc6i4kWthpO6NaAqXJV3JUcbB65CD8/Cua3lulmzmtJPJGh6x0hC1S0wp11yLNikmPLaAKkZ6gg/rJPeKB79Z5ekLWZt0vEMx0kJSUtrStxXcEo58/jWlagvMOwWp643BwIZbGAMgFaj0SM95NYJrG4zb9J/KNzdStspJjtJVlppPgnxPirv+AAlxNeRN1PgZ/tJSkcoUg+pSP610VxMV+zbnD6uAVSPRWvY0uxIynXuhRkY9ajNSYu9CHYEneU5KQjnnxA8POq6EF9a9wsicRIrwInMTWD3dg0h77rRR7py0wNWxVvW3VHatJwHW2YvZvNZ6ZClHHQ88YOOVZozAt5tyHXG325P7SFpwn4VdaOuRtEtMq049pRkLYUfdfR3pHgeX08sGdGF6IeJb9m16c07bdNwjFtbJQFq3OuLVuW6rxUrvNc0/ZbpGvFuZmxFZQ4OaT1Qe9J8xXNXMzHOPt07a8Wy2NLCkxGlPuozyC1nCc+YCT/ABedZNIlymmVo3bUOYx/5RPxBiXKDrG7G8IUFyZC3UKV+q40SdhB8AkAeWMd1Dq4EidJYiMlK1KG7kc7MnoflUgJrFa7q7FbeEF5SHEggoAUD8qtvyZOSQpcCSCOWexVn7VHinUFrgJbgXQFxtPJpxlvafIHH3zUJviDqNtP6UQ1JSTncwQQfnXFVcbL7TLX1m6WC13bJ022XN1CwzAkkpT0U2U/fFBUSbNiuusBxTLyHCFEH3kqB54Pr30exrxqS5xy4++wwFp90MMDcB55zQPdID0O5Pe2uFx13KwsjG4k881thPHeeqkvhS9Nfk0zgdfJidSv2l2QtyHJjKeShZzh1JTzB80lWfQeFKgzQtzVbNZ2N9lCifaW2VAftBw9mforOPEUq2My141TPbOJLrfVMNhln6dof56D7TeFW+Wp4N7lHAznGBW4680PpmKzfNU6hfnOOvKCkezubCgkJQlCRzBJOOZ5c/AGsKFreQyX9o2J5q78eRqQFErUjEtvKVlLyk4CVDqfWgd5x4udopaty+ZOetOPOtqSEDYnb4H8TRhprhxdtQWl67OEQrezFU6h5aNxkEAnCE5HLxJ+vPDMES06hRFhIQ4txTg7kiqvUF3XcnypaAkpPI5yar2FpGEEttrHXeeh+PSpiozLnaSFPsvBsBbiELxkZAIyOn1pmDaeAtntkrTxvD8Jly5NS1tJkLG4oASnG0Hkk+8eY50quuB0IRNFKW0rfGky3HmFFQKtpCU4VjvCkqB9M99KoAdTYUWewWJ0ZmSySCW3mwtJPoarvzU03jH5v2nHh7E3+FKlQEuNaLZEx7JbobGOnZMJT9hUvupUqA4UhDgwtKVDzGa6CJGByI7Of9ApUqAdAA5AYHgKVKlQH//Z', descripcion:"Batman es un personaje creado por los estadounidenses Bob Kane y Bill Finger, ​ y propiedad de DC Comics. Apareció por primera vez en la historia titulada «El caso del sindicato químico» de la revista Detective Comics N.º 27, lanzada por la editorial National Publications el 30 de marzo de 1939."},
{  id: 2, nombre: 'Flash' ,imagen: 'https://bit.ly/2P1aJeN', descripcion:"Nueve meses después de que el laboratorio S.T.A.R. explotara, Barry despierta del coma y descubre que tiene el poder de la súper velocidad. Con la ayuda de su nuevo equipo, Barry, denominado ahora `Flash', luchará contra el crimen en Ciudad Central."},
{  id: 3, nombre: 'Superman' ,imagen: 'data:image/jpeg;base64,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', descripcion:"Superman es un personaje ficticio, un superhéroe de los cómics que aparece en las publicaciones de DC Comics.​​​​"},
]

app.post('/superheroes', function (req, res) {
 const nuevoSuperheroe = req.body;

 superheroes.push(nuevoSuperheroe);

 res.json(nuevoSuperheroe);
});

app.get('/', function(req, res) {
	res.send('Ruta principal')
})


app.get('/superheroes', function(req, res) {
	res.json(superheroes)
})

app.listen(process.env.PORT|| 3000, () => console.log("Server iniciado!"))

app.delete('/superheroes/:id', function (req, res) {
	for (let i = 0; i < superheroes.length; i++) {
	  if (superheroes[i].nombre == req.params.id) {
		// elimino el elemento de la posición i
		superheroes.splice(i, 1);
		// me voy de la función porque no debería hacer nada más
		return res.json(superheroes);
	  }
	}
	// si terminó el for y no me fui de la función con el return, es porque el elemento NO EXISTE
	return res.status(404).send();
  });

  var goku = [5,3,5,2,1];

  
  /*
<body style="background-color:#94B4CA ">
      </body>
  */
 /*
 <body background="peli.jpg" >
      </body>
 */