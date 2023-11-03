const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

// Dependencies for file uploads
const multer = require("multer");
const Grid = require("gridfs-stream");
const {GridFsStorage} = require("multer-gridfs-storage")
const bodyParser =  require("body-parser")
const methodOverride = require("method-override")
const crypto = require("crypto")
const path = require("path")

const app = express();
const port = process.env.PORT || 4000;

const Form = require("./Model/form");
const User = require("./Model/user");

app.use(cors());
app.use(bodyParser.json());

const dbUrl =
  "mongodb+srv://blester7:yTGJYryN4t2RfVFC@cluster0.hr8ilkr.mongodb.net/IncidentReportingDB?retryWrites=true&w=majority";

// static secretKey for JWT token
const secretKey = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5ODcyNTQ5NCwiaWF0IjoxNjk4NzI1NDk0fQ.qTmMGNgXFJJj2O_Dzpc0_vGeZX_5reMEssHSQF8Uryk";

// Connect to MongoDB
try {
  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.log(error);
}

let bucket;
mongoose.connection.on("connected", () => {
  var db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "uploads"
  });
  //console.log(bucket);
});

//to parse json content
app.use(express.json());
//to parse body from url
app.use(express.urlencoded({
  extended: false
}));

const storage = new GridFsStorage({
  url: dbUrl,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

// Route for uploading file
app.post("/api/upload", upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});

// Routing for form submission

app.post("/api/submit", async (req, res) => {

  console.log("Form object", req.body)

  let {
    incidentTitle,
    incidentLocation,
    witnessName,
    offenderName,
    date,
    description,
    incidentCategory,
    status,
    userId,
    fileName
  } = req.body;

  if (offenderName == "") {
    offenderName = "N/A";
  }

  try {
    const form = new Form({
      incidentTitle,
      incidentLocation,
      witnessName,
      offenderName,
      date,
      description,
      incidentCategory,
      status,
      userId,
      fileName
    });

    await form.save();

    res.json({ message: "Incident submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/image/:fileName", async (req, res) => {
  
  const file = await bucket.find({ filename: req.params.fileName }).toArray();

  console.log("was reached")
  console.log(file)

  // Check if the file exists.
  if (!file || file.length === 0) {
    return res.status(404).json({ err: "no files exist" });
  }

  // Open a read stream for the file.
  const readStream = bucket.openDownloadStreamByName(req.params.fileName);

  // Pipe the read stream to the HTTP response stream.
  readStream.pipe(res);
});


// Routing for Email check
app.post("/api/checkemail", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }
    res.status(200).json({ message: "Email found" });
  } catch (error) {
    console.error(err);
  }
});

//Routing for Password Update
app.post("/api/updatepassword", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    user.password = password;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
  }
});

// Create a route for user registration
app.post("/api/register", async (req, res) => {
  let { firstname, lastname, email, password } = req.body;
  email = email.toLowerCase();

  console.log(email);

  try {
    const newUser = new User({ firstname, lastname, email, password });
    await newUser.save();
    res.json({ message: "User registered successfully" });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "reactapp02@gmail.com", // your Gmail email address
        pass: "sefl hyja xsme brae",
      },
    });

    const mailOptions = {
      from: "reactapp02@gmail.com", // the email address to send from
      to: email,
      subject: "Signup Successful",
      text: "Thank you for signing up to our Incident Reporting System.",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Email send failed:", error);
      } else {
        console.log("Email sent:", info.response);
        res.json({ message: "Signup is complete!" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add routing to Login Page here
app.post("/api/login", async (req, res) => {
  let { email, password } = req.body;

  email = email.toLowerCase();

  try {
    const user = await User.findOne({ email: email, password: password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create a JWT with user information and sign it with the secret key
    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
      expiresIn: "2d", // Token expires 2 Days
    });

    return res.status(200).json({ message: "Login successful", user: user, token: token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

// routing to form display

// Define a GET route to retrieve form data

app.get("/api/getForms", async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/getFormById/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.json(form);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/api/updateForm/:id", async (req, res) => {
  const { id } = req.params;
  const { incidentTitle, offenderName, incidentCategory, date, incidentLocation, incidentDate, description, editNote } =
    req.body;
  console.log(req.body);
  try {
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    form.incidentTitle = incidentTitle;
    form.incidentLocation = incidentLocation;
    form.incidentDate = incidentDate;
    form.description = description;
    form.date = date;
    form.offenderName = offenderName;
    form.incidentCategory = incidentCategory;
    form.editNote = editNote;

    await form.save();

    res.json({ message: "Form updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/getFormsById", async (req, res) => {
  const { userId } = req.query;
  try {
    const forms = await Form.find({ userId });
    res.json(forms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/searchIncidents", async (req, res) => {
  const { searchCriteria, searchTerm, userId } = req.query;

  try {
    let incidents;

    if (
      searchCriteria == undefined &&
      userId !== undefined &&
      searchTerm !== ""
    ) {
      // Byron - Added this for my userArchive to search by title.
      incidents = await Form.find({
        userId: userId,
        incidentTitle: { $regex: searchTerm, $options: "i" },
      });
    }

    if (searchTerm !== "") {
      if (searchCriteria === "incidentLocation") {
        incidents = await Form.find({
          incidentLocation: { $regex: searchTerm, $options: "i" },
        });
      } else if (searchCriteria === "incidentTitle") {
        incidents = await Form.find({
          incidentTitle: { $regex: searchTerm, $options: "i" },
        });
      } else if (searchCriteria === "description") {
        incidents = await Form.find({
          description: { $regex: searchTerm, $options: "i" },
        });
      } else if (searchCriteria === "incidentCategory") {
        incidents = await Form.find({
          incidentCategory: { $regex: searchTerm, $options: "i" },
        });
      } else if (searchCriteria === "status") {
        incidents = await Form.find({
          status: { $regex: searchTerm, $options: "i" },
        });
      }
    } else {
      incidents = await Form.find();
    }
    res.json(incidents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/approveIncident", async (req, res) => {
  const { id, status } = req.body;

  try {
    // Update the status of the incident form with the given ID
    const updatedForm = await Form.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ message: "Incident form not found" });
    }

    res.json({ message: "Incident form approved successfully", updatedForm });
  } catch (error) {
    console.error("Error approving incident:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/user", async (req, res) => {
  const { userId } = req.body;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    console.log("Error");
    return res.status(401).json({ message: "User not found" });
  }

  return res.status(200).json({ message: "User found", user: user });
});

app.delete("/api/incidentdelete/:id", async (req, res) => {
    const { id } = req.params;

    console.log(`Id is: ${id}`);

    try {
      const deletedForm = await Form.findByIdAndDelete(id)
      if(!deletedForm) {
        return res.status(404).json({ message: "Form not found"})
      }

      res.status(200).json({ message : "Form deleted successfully."})

    }
    catch(error) {
      console.error(error)
      res.status(500).json( { message : "Error deleting form"})
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

