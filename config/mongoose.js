const env = process.env.NODE_ENV || "development";
const config = require("./environments")[env];
const mongoose = require("mongoose");
const idValidator = require("mongoose-id-validator");

module.exports = function() {
    /*
    * When we create a new object, we validate that all reference ids to
    * other objects are valid
    */
    mongoose.plugin(idValidator);
    mongoose.Promise = global.Promise;
    var db = mongoose.connect(
        config.db,
        {
            useNewUrlParser: true
        }
    );
    mongoose.set("useCreateIndex", true);
    mongoose.connection
        .on("error", function(err) {
            console.log(
                "Error: Could not connect to MongoDB. Did you forget to run `mongod`?"
                    .red
            );
        })
        .on("open", function() {
            console.log("MongoDB Connection Established");
        });
    return db;
};
