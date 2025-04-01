module.exports = (res, data) => {
  res.setHeader('Content-Type', 'text/html')
  res.write('<html>')
  res.write('<head><title>Shop - Newest product</title></head>')
  res.write('<body>')
  res.write('<h1>Newest product</h1>')
  res.write(
    '<nav><a href="/">Home</a><br /><a href="/product/add">Add product</a><br /><a href="/logout">Logout</a></nav>'
  )

  if (!data || data.trim() === '') {
    // Obsługuje przypadek, gdy plik jest pusty lub nie zawiera danych
    res.write('<br /><div>No new products available.</div>')
  } else {
    const productData = data
      .split(',')
      .map((item) => item.trim())
      .join('<br />')
    res.write(`<br /><div>New product data: <br />${productData}</div>`)
  }

  res.write('</body>')
  res.write('</html>')

  res.end()
}
