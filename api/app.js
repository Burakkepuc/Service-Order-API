import express from 'express'
import router from './routes/index'
import notFound from './middlewares/notFound'
import errorHandler from './middlewares/error'
import swaggerOptions from '../src/config/swaggerOptions'
const app = express()
const port = 3000
const expressSwagger = require('express-swagger-generator')(app);

expressSwagger(swaggerOptions)


// Command line for test spec 
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url} `);
//   next()
// })

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use('/api', router)
// Global Not Found Error(For routes)
app.use(notFound)
// // Error handling
// app.use(errorHandler)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;