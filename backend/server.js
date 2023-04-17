const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { readdirSync } = require('fs');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');

dotenv.config();

/** ----------- How to Use Cors If You Want Secret Your Site  --------------------- */
// const allowed = ['http://localhost:3000', 'Other Site'];
// function options(req, res) {
//   let tmp;
//   let origin = req.header('Origin');
//   if (allowed.indexOf(origin) > -1) {
//     tmp = {
//       origin: true,
//       useSuccessStatus: 200,
//     };
//   } else {
//     tmp = {
//       origin: 'You cant using this website!',
//     };
//   }
//   res(null, tmp);
// }

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

/** ----------- Better for using Routing  ------------ */
readdirSync('./routes').map((rout) =>
  app.use('/', require('./routes/' + rout))
);

/** ----------- Connection database  ------------ */
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log('database connect successfully!'))
  .catch((err) => console.log('error connecting to database', err));

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server Is Runing In Port : ${PORT}`);
});
