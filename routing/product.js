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

    fs.appendFile(
      path.join(__dirname, '..', 'product.txt'),
      formData + '\n',
      (err) => {
        if (err) {
          console.error('Error writing to file:', err)
          return res
            .status(STATUS_CODE.FOUND)
            .setHeader('Location', '/product/new')
            .end()
        }

        res
          .status(STATUS_CODE.FOUND)
          .setHeader('Location', '/product/new')
          .end()
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
        renderNewProductPage(res, null)
      } else {
        renderNewProductPage(res, data)
      }
    }
  )
})

module.exports = router
