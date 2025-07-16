const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb+srv://saic06562:Charitha%4015@cluster0.x0ffuer.mongodb.net/');
}

module.exports = main;