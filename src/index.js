const app = require('express')()
const consign = require('consign')
const path = require('path');

const port = 3333

consign({ verbose: true, locale: 'pt-br', cwd: 'src' })
  .include('middlewares')
  .into(app)

app.listen(port);