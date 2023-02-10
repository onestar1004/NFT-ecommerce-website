const dotenv = require("dotenv");
dotenv.config();
var express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const mongoConnect = require("./util/database");
const fs = require("fs");
const userroutes = require("./routes/userRoutes");
const adminroutes = require("./routes/adminroutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const generateDocs = require("./swagger");

// const swaggerUi = require("swagger-ui-express");

// generateDocs().then(() => {
//   const swaggerDocs = require("./swagger_output.json");
//   app.use(
//     "/docs",
//     swaggerUi.serve,
//     swaggerUi.setup(swaggerDocs, {
//       customSiteTitle: `Flipkart Grid NFT Backend API`
//     })
//   );
// });

app.use("/api", userroutes);

app.use("/admin", adminroutes);

mongoConnect();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Flipkart Grid (Codedrift)!");
});

app.listen(PORT, () =>
  console.log(`Server Started and running on port ${PORT}`)
);
