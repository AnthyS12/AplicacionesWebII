const mongoose = require('mongoose');
const { MONGO_URI } = require("./config");
const axios = require("axios").default;
const cheerio = require("cheerio");
const cron = require("node-cron");

const conexion = MONGO_URI


mongoose.connect(conexion, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const  Noticias  = require("./models/noticias");
const Usuario = mongoose.model("Usuario", { nombre:String  });



// Luis Anthony Moreira Lucas 6"A"
// El siguiente código recolecta tituos de noticias en la página La Marea y los guarda 
// en una BD creada en MongoDB Atlas 

//para correr el programa "npm i" para instalar la carpeta node_modules si no se encuentra instalada
//"npm run start" para coorer el programa

cron.schedule("* * * * * *", async () => {
    console.log("Ejecutado correctamente!");
    const html = await axios.get("https://www.eldiario.ec/lamarea/cultura-sociedad/");
    const $ = cheerio.load(html.data);
    const titles = $(".entry-title");
    titles.each((index, element) => {
      const noticia = {
        titulo: $(element)
          .text()
          .toString(),
        enlace: $(element).children()
        .attr("href")
    };
    Noticias.create([noticia]);
    // console.log("Guardado");

  });
});
