const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');
const path = require('path');

const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '/images')));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true, useUnifiedTopology: true,
}).then(console.log('Connected to MongoDB')).catch(err => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});


app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/post", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})