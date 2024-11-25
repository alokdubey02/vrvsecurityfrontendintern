const mongoose = require('mongoose');

// Define Role schema
const roleSchema = new mongoose.Schema({
     rolename: {
          type: String,
          required: true,
          unique: true,
     },
     permissions: {
          read: {
               type: Boolean,
               default: false,
          },
          write: {
               type: Boolean,
               default: false,
          },
          delete: {
               type: Boolean,
               default: false,
          },
     },
});

module.exports = mongoose.model('Role', roleSchema);
