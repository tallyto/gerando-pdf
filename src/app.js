const express = require("express");
const app = express();
const pdf = require("html-pdf");
const ejs = require("ejs");

app.use(express.json());
app.get("/", (req, res) => {
  ejs.renderFile(
    "./templates/index.ejs",
    { name: "Agil - Render PDF" },
    (error, html) => {
      if (error) {
        return res.status(500).json({ message: "Error in Server" });
      }
      const options = {
        format: "A4",
        border: {
          right: "8",
        },
      };
      pdf.create(html, options).toFile("./uploads/report.pdf", (error, response) => {
        if (!error) {
          return res.json({ message: "PDF Genereted" });
        } else {
          return res.status(500).json({ message: "Fail in Generated PDF" });
        }
      });
    }
  )

  
});

app.get("/downloads",(req, res)=>{
  res.type('pdf')
  res.download("./uploads/report.pdf")
})

app.listen(3333);
