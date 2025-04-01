module.exports = (res, data) => {
  res.setHeader('Content-Type', 'text/html')
  res.write('<html>')
  res.write('<head><title>Shop - Newest product</title></head>')
  res.write('<body>')
  res.write('<h1>Newest product</h1>')
  res.write(
    '<nav><a href="/">Home</a><br /><a href="/product/add">Add product</a><br /><a href="/logout">Logout</a></nav>'
  )

  if (data) {
    const productData = data
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
      .join('<br />')
    res.write(`<br /><div>New product data - ${productData}</div>`)
  } else {
    res.write('<br /><div>No new products available.</div>')
  }

  res.write('</body>')
  res.write('</html>')
  res.end()
}
