var connection = require("./connection.js");


orm = {
    //selecting everything from a table
    selectAll: function (table, cb) {
        connection.query("SELECT * FROM ??;", table, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    //inserting value into specified table & column
    insertOne: function (table, col, toInsert, cb) {
        connection.query("INSERT INTO ?? (??) VALUES (?);", [table, col, toInsert], (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    //update by id, set col value
    updateOne: function (table, col, value, id, cb) {

        var obj = {};
        obj[col] = value;

        connection.query("UPDATE ?? SET ? WHERE ?", [table, obj, {id: id}], (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    //delete by id
    deleteOne: function (table, id, cb) {

        connection.query("DELETE FROM ?? WHERE ?", [table, {id: id}], (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    //delete by selector = selectorValue
    deleteMany: function (table, selector, selectorValue, cb) {

        var obj = {};
        obj[selector] = selectorValue;

        connection.query("DELETE FROM ?? WHERE ?", [table, obj], (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }
};

module.exports = orm;