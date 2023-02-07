const http = require("http")


const server = http.createServer((res, req) => {
    console.log(req)
})

server.listen(5500)