const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('./utils/logger')
const homeRoutes = require('./routing/home')
const productRoutes = require('./routing/product')
const logoutRoutes = require('./routing/logout')
const killRoutes = require('./routing/kill')
const { PORT } = require('./config')
const { STATUS_CODE } = require('./constants/statusCode')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  console.log(logger.getInfoLog(req.method, req.url))
  next()
})

app.use('/', homeRoutes)
app.use('/product', productRoutes)
app.use('/logout', logoutRoutes)
app.use('/kill', killRoutes)

app.use((req, res) => {
  console.warn(logger.getErrorLog(req.url))
  res
    .status(STATUS_CODE.NOT_FOUND)
    .sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(PORT, () => {
  console.log(logger.getProcessLog(`Server is running on port ${PORT}`))
})
