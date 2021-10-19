const url = require('url');
const http = require('http')
const { v4: uuidv4 } = require('uuid');
const { enviar } = require('./script');

http
  .createServer( (req, res) => {
    let { correos, asunto, contenido} = url.parse(req.url, true). query

    if (req.url.startsWith('/')) {
      enviar(correos, asunto, contenido)
      res.end('se envio correo... revisar que haya sido eviado')
    };
  })
  .listen(3000)












