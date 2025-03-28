/*
Kontrolleri on olio, joka sisältää metodeja. Se tehty siksi, että
saadaan erotettua reitit ja tietokantahakujen sovelluslogiikka toisistaan.
Se on siis arkkitehtuuriratkaisu. Eli saamme aikaan järkevämmän arkkitehtuurin
kun jaamme eri asioita tekevän koodin eri tiedostoihin ja kansioihin.
*/
require('../dbconnection');
const Student = require('../models/Student'); // haetaan model

// Tietokannan käsittelymetodit tehdään olion sisään
const StudentController = {
  /* findAll -metodi hakee kaikki opiskelijat
  Student-modelin find-metodilla */
  findAll(req, res) {
    Student.find()
      .then((students) => {
        res.json(students);
      })
      .catch((error) => {
        throw error;
      });
  },
  findById(req, res) {
    Student.findOne({ _id: req.params.id })
      .then((student) => {
        res.json(student);
      })
      .catch((error) => {
        throw error;
      });
  },
  // FindByStudentCode
  findBySc(req, res) {
    Student.findOne({ studentcode: req.params.studentcode })
      .then((student) => {
        res.json(student);
      })
      .catch((error) => {
        throw error;
      });
  },

  add(req, res) {
    const newStudent = Student(req.body);
    Student.create(newStudent)
      .then((student) => {
        console.log('Document inserted succesfully: ' + student);
        res.json(student);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  deleteById(req, res) {
    Student.findOneAndDelete({ _id: req.params.id })
      .then((student) => {
        console.log('Document updated succesfully');
        res.json(student);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  updateById(req, res) {
    Student.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((student) => {
        console.log('Document updated succesfully');
        res.json(student);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  findByStudyPoints(req, res) {
    const maxPoints = parseInt(req.params.studypoints, 10);

    Student.find({ studypoints: { $lt: maxPoints } })
      .then((students) => {
        console.log('Document updated succesfully');
        res.json(students);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  addGrade(req, res) {
    const newGrade = req.body.grade;

    Student.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: { grades: newGrade },
        $inc: { studypoints: 5 },
      }
    )
      .then((updatedStudent) => {
        console.log('Document updated succesfully');
        res.json(updatedStudent);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  updateGrade(req, res) {
    Student.findOneAndUpdate(
      {
        studentcode: req.params.studentcode,
        'grades.coursecode': req.params.coursecode,
      },
      { $set: { 'grades.$.grade': req.body.grade } }
    )
      .then((result) => {
        console.log('Document updated succesfully');
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  findByCourse(req, res) {
    const coursecode = req.params.coursecode;

    Student.find({ grades: { $elemMatch: { coursecode: coursecode } } })
      .then((students) => {
        console.log('Document updated succesfully');
        res.json(students);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

module.exports = StudentController;

/*
students.js -reittitiedostossa kontrollerin metodia kutsutaan tällä tavalla:
 
router.get('/', StudentController.findAll);
 
jolloin kaikki opiskelijat saadaan JSON-muodossa osoitteesta http://localhost:3000/students/

*/
