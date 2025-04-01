const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  console.log(
    `PROCESS (${new Date(
      Date.now()
    ).toUTCString()}): logout has been initiated and the application will be closed.`
  )

  process.exit()
})

module.exports = router
