const http = require('http')
const fs = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(fs.readFile)
const fileStatAsync = promisify(fs.stat)

const contentTypeMap = {
  html: 'text/html; charset=UTF-8',
  js: 'application/javascript; charset=UTF-8',
  css: 'text/css; charset=UTF-8',
  txt: 'text/plain; charset=UTF-8',
  manifest: 'text/cache-manifest; charset=UTF-8',
}

http
  .createServer(async function(request, response) {
    let filename = request.url.split('?')[0].substring(1)
    let ext = filename.substring(filename.lastIndexOf('.') + 1)

    try {
      await fileStatAsync(filename + '.js')
      filename += '.js'
      ext = 'js'
    } catch (err) {}

    try {
      const content = await readFileAsync(filename)
      const type = contentTypeMap[ext] || 'application/octet-stream'
      response.writeHead(200, { 'Content-Type': type })
      response.write(content)
    } catch (err) {
      response.writeHead(404, {
        'Content-Type': contentTypeMap.txt,
      })
      response.write(err.message)
    }

    response.end()
  })
  .listen(8080)
