const url = require('url');
const http = require('http')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const axios = require('axios');
const { enviar } = require('./script');

const PORT = 3000;

http
  .createServer( (req, res) => {
    let { correos, asunto, contenido} = url.parse(req.url, true). query

    if (req.url == '/') {
      res.setHeader('content-type','text/html');
      fs.readFile('index.html','utf8',(err,data) => {
        res.end(data);
      })
    };

    if (req.url.startsWith('/mailing')) {

      let dolar;
      let euro;
      let uf;
      let utm;

      async function getData() {
      
        let { data } = await axios.get('https://mindicador.cl/api');

        dolar = data.dolar.valor;
        euro = data.euro.valor;
        uf = data.uf.valor;
        utm = data.utm.valor;
      }

      getData()
        .then( () => { 
              
          contenido += `\nValor del dólar del día de hoy: ${dolar}
          \nValor del euro del día de hoy: ${euro}
          \nValor de la UF del día de hoy: ${uf}
          \nValor de la UTM del día de hoy: ${utm}
          `
          return correos, asunto, contenido;
        })
        .then( () => { 

          if ( (correos !== '') && (asunto !== '') && (contenido !== '') && (correos.includes(','))) {
            enviar(correos.split(','),asunto,contenido);
            console.log(`Correo enviado a: ${correos}`)
            res.write('Correo enviado');
            res.end()

            let id = uuidv4()

            fs.writeFile(`correos/correo_id_${id}`,`Correos:${correos}\n\nAsunto: ${asunto}\n\nContenido:\n${contenido}`,'utf8', () => {
              console.log(`Archivo para el correo_id_${id} creado con éxito!`);
            })
          } else {
            res.write('Faltan campos por llenar');
            res.end();
          }
        });
    }
  })
  .listen(PORT,() => { console.log(`Escuchando el puerto ${PORT}.`)})
