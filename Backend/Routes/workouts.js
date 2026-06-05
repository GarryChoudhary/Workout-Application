const express = require('express');
const Workout = require('../models/workoutModels')
const {createWorkout, getAllWorkouts, getWorkoutById, updateWorkout, deleteWorkout} = require('../controllers/workoutController')


const router = express.Router();

/**
 * Route: /api/workouts
 * Method: GET
 * Description: Get all workout docs
 * Access: public
 * Parametera: none
 */
router.get('/',getAllWorkouts)


/**
 * Route: /api/workouts/
 * Method: GET
 * Description: Get a single workout docs by its id
 * Access: public
 * Parametera: id
 */
router.get('/:id',getWorkoutById)



/**
 * Route: /api/workouts
 * Method: POST
 * Description: create a new workout docs
 * Access: public
 * Parametera: none
 */
router.post('/', createWorkout)


/**
 * Route: /api/workouts
 * Method: DELETE
 * Description: delete a single workout docs
 * Access: public
 * Parametera: id
 */
router.delete('/:id',deleteWorkout)


/**
 * Route: /api/workouts
 * Method: PATCH
 * Description: Update a single workout docs
 * Access: public
 * Parametera: id
 */
router.patch('/:id',updateWorkout)

module.exports = router