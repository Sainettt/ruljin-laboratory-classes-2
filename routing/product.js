const express = require('express')
const fs = require('fs')
const path = require('path')
const renderNewProductPage = require('../views/renderNewProductPage')
const { STATUS_CODE } = require('../constants/statusCode')
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
        return `${key}: ${decodeURIComponent(value)}`
      })
      .join(', ')

    fs.appendFile(
      path.join(__dirname, '..', 'product.txt'),
      formData,
      (err) => {
        if (err) {
          console.error('Error writing file', err)
          return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).end()
        }

        res.status(STATUS_CODE.FOUND)
        res.setHeader('Location', '/product/new')
        res.end()
      }
    )
  })
})

router.get('/new', (req, res) => {
  renderNewProductPage(res)
})

module.exports = router
