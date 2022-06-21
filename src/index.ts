import express from "express"

const app = express()
app.listen(8080, () => {
  console.log(`server running on port 8080`)
});

app.get("/", (req, res) => {
  res.send("Hello World!")
})