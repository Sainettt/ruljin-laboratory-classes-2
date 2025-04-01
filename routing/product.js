const express = require('express')
const fs = require('fs')
const path = require('path')
const STATUS_CODE = require('../constants/statusCode')
const renderNewProductPage = require('../views/renderNewProductPage')
const router = express.Router()

router.get('/add', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'))
})

router.post('/add', (req, res) => {
  const body = []

  // Чтение данных из формы
  req.on('data', (chunk) => {
    body.push(chunk)
  })

  req.on('end', () => {
    const parsedBody = Buffer.concat(body).toString()
    const formData = parsedBody
      .split('&')
      .map((entry) => {
        const [key, value] = entry.split('=')
        return `${decodeURIComponent(key)}: ${decodeURIComponent(value)}`
      })
      .join(', ')

    // Добавление новых данных в конец файла
    fs.appendFile(
      path.join(__dirname, '..', 'product.txt'),
      formData + '\n',
      (err) => {
        if (err) {
          console.error('Error writing file', err)
          return res.status(500).send('Internal Server Error')
        }

        // Перенаправление на страницу с новым продуктом
        res.status(302) // Код для перенаправления
        res.setHeader('Location', '/product/new')
        res.end()
      }
    )
  })
})

router.get('/new', (req, res) => {
  fs.readFile(
    path.join(__dirname, '..', 'product.txt'),
    'utf-8',
    (err, data) => {
      if (err || !data) {
        res.send('No new products available.')
      } else {
        renderNewProductPage(res, data)
      }
    }
  )
})

module.exports = router
