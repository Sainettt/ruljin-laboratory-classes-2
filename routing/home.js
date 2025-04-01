const express = require('express')
const path = require('path')

const router = express.Router()

// Obsługa ścieżki '/' dla metody GET
router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '..', 'views', 'home.html') // Ścieżka do pliku home.html
  res.sendFile(filePath) // Wysłanie pliku home.html jako odpowiedź
})

module.exports = router
