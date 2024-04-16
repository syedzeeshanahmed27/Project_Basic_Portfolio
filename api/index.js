const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { formValidationSchema } = require("../schemas/formvalidation");
const app = express();
const multer = require("multer");
const {
  AddContact,
  DeleteUser,
  UpdateUserInfo,
  GetContact,
} = require("./actions");
const PORT = process.env.PORT || 4000;

app.use(express.static(__dirname + "/../public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", __dirname + "/../views");
app.use(expressLayouts);
app.set("layout", "../views/layouts/layout");
app.set("view engine", "ejs");

app.get("/", async function (req, res) {
  // res.send("Hello this is working");
  res.render("index", {
    title: "Welcome to my portfolio!",
    // Other data
  });
});

app.get("/about", async function (req, res) {
  res.render("about", {
    title: "Welcome to my portfolio!",
    teamMembers: [
      { name: "Syed Zeeshan Ahmed", position: "CEO", image: "zee.png" },
      // Add other team members as needed
    ],
  });
});

app.get("/contact", async function (req, res) {
  res.render("contact", {
    title: "Welcome to my portfolio!",
    // Other data
  });
});

// app.get("/submit", async function (req, res) {
//   const formData = {};
//   res.render("submit", {
//     title: "Welcome to my portfolio!",
//     formData,
//     // Other data
//   });
// });

app.post("/submit", async function (req, res) {
  // Process the form data (e.g., send an email, save to database, etc.)
  // For demonstration purposes, we'll just log the data
  const body = req.body;

  const validatedData = formValidationSchema.safeParse(body);
  if (!validatedData.success) {
    res.render("error", {
      title: "Error Page",
      heading: "Form Validation Failed",
      errorMessage: validatedData.error.errors,
      suggestion: "Go Back And Try Submitting The Form Again",
    });

    return;
  }
  const { name, email, message } = validatedData.data;

  AddContact(name, email, message, (err, row) => {
    if (err) {
      res.render("error", {
        title: "Error Page",
        heading: "Error Creating Database Entry",
        errorMessage: err.message,
        suggestion: "Try To Submit  the form Again",
      });
      return;
    }
    res.render("submit", {
      title: "Welcome to my portfolio!",
      mode: "submitted",
      formData: row,
    });
  });
  // Render the submit.ejs view with the form data
});

// Sample user data (you would use a database in a real application)
let user = {
  name: "Syed Zeeshan Ahmed",
  email: "zee@awispo.com",
  bio: "Digital Marketer.",
  username: "zee123",
  password: "********",
};

app.post("/deleteUser", (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.render("error", {
      title: "Error Page",
      heading: "ID Is Required",
      errorMessage: "This process failed because the id is not provided",
      suggestion: "",
    });
    return;
  }
  GetContact(id, (err, row) => {
    if (err) {
      res.render("error", {
        title: "Error Page",
        heading: "Could not  delete the entry",
        errorMessage: err.message,
        suggestion: "",
      });
      return;
    }

    DeleteUser(id, (err, changes) => {
      if (err) {
        res.render("error", {
          title: "Error Page",
          heading: "Could not  delete the entry",
          errorMessage: err.message,
          suggestion: "Try to Go back",
        });
        return;
      }

      res.render("deletesuccess", {
        title: "Delete was Successful",
      });
    });
  });
});

app.post("/updatemessage", (req, res) => {
  const { id, ...body } = req.body;

  const validatedData = formValidationSchema.safeParse(body);

  if (!validatedData.success) {
    res.render("error", {
      title: "Error Page",
      heading: "Invalid Data is Provided",
      errorMessage: validatedData.error.errors,
      suggestion: "Make Request from This Website",
    });
    return;
  }

  GetContact(id, (err, row) => {
    if (err) {
      res.render("error", {
        title: "Error Page",
        heading: "Could not Update the entry",
        errorMessage: err.message,
        suggestion: "Try to Go back",
      });
      return;
    }
    const { message, name, email } = validatedData.data;

    res.render("updateform", {
      title: "Update Form Page",
      id,
      name,
      email,
      message,
    });
  });
});

app.post("/updateuserinfo", (req, res) => {
  const { id, ...body } = req.body;

  const validatedData = formValidationSchema.safeParse(body);
  if (!validatedData.success) {
    res.render("error", {
      title: "Error Page",
      heading: "Proper Data is Missing",
      errorMessage: validatedData.error.errors,
      suggestion: "Make Request from This Website",
    });

    return;
  }

  const { email, message, name } = validatedData.data;

  UpdateUserInfo(id, name, email, message, (err, row) => {
    if (err) {
      res.render("error", {
        title: "Error Page",
        heading: "Error Updating Your Message",
        errorMessage: err.message,
        suggestion: "Make Request from This Website",
      });

      return;
    }

    res.render("submit", {
      title: "Welcome to my portfolio!",
      mode: "Updated",
      formData: row,
    });
  });
});

// Route to render the projects page
app.get("/projects", (req, res) => {
  res.render("projects", { title: "Welcome to my portfolio!" });
});

// Route to render the login page
app.get("/login", (req, res) => {
  res.render("login", { title: "Welcome to my portfolio!" });
});
app.get("/checkerror", (req, res) => {
  res.render("error", {
    title: "Error Page",
    heading: "Error Creating Database Entry",
    errorMessage: "Checking error",
    suggestion: "Try To Submit  the form Again",
  });
});
app.use((req, res, next) => {
  res.render("wrongroute", { title: "wrong route" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
