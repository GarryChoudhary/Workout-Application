const Workout = require('../models/workoutModels')
const mongoose = require('mongoose')

// get all workouts
exports.getAllWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createAt: -1 })

    if (!workouts)
        return res.status(400).json({ error: "No entity found" })

    res.status(200).json({ workouts })
}


// get a single workout by its id
exports.getWorkoutById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: "No such workout" })
    const workout = await Workout.findById(id);

    if (!workout)
        return res.status(404).json({ error: " No such workout" })

    res.status(200).json({ workout })

}


// create a workout
exports.createWorkout = async (req, res) => {

    const { title, reps, load } = req.body;
    try {
        const workout = await Workout.create({ title, reps, load });
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}


// Delete a workout by its id
exports.deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: "No such workout" })

    const workout = await Workout.findOneAndDelete({ _id: id });

    if (!workout)
        return res.status(404).json({ error: "No such workout" })

    res.status(200).json(workout);

}


// Update a workout by its id
exports.updateWorkout = async(req,res)=>{
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: "No such workout" })

    const workout = await Workout.findOneAndUpdate(
        {
            _id:id
        },
        {
            ...req.body
        },
        {
            new:true
        }
    );
    
    if(!workout)
        return res.status(404).json({error: "No such workout"})

    res.status(200).json({workout})
}