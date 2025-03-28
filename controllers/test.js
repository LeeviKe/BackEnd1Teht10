require('../dbconnection');
const Student = require('../models/Student');

async function findAll() {
  try {
    return await Student.find({});
  } catch (err) {
    throw err;
  }
}

console.log(findAll());
