// Opiskelijoiden reititystiedosto

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentcontroller');
const authorize = require('../verifytoken');

router.get('/', studentController.findAll);

router.get('/:id', studentController.findById);

router.get('/studentcode/:studentcode', studentController.findBySc);

router.post('/', authorize, studentController.add);

router.delete('/:id', authorize, studentController.deleteById);

router.patch('/:id', studentController.updateById);

router.get('/studypoints/:studypoints', studentController.findByStudyPoints);

router.post('/:id/grades', authorize, studentController.addGrade);

router.put(
  '/updategrade/:studentcode/:coursecode',
  authorize,
  studentController.updateGrade
);

router.get('/coursecode/:coursecode', studentController.findByCourse);

module.exports = router;
