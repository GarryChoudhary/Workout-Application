import React from 'react'
import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {

  const { dispatch } = useWorkoutsContext()
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState('')
  const [emptyField, setEmptyFiled] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json();

    if (!response.ok) {
      setError(json.error)
      setEmptyFiled(json.emptyField)
    } else {
      setTitle('')
      setLoad('')
      setReps('')
      setError(null)
      setEmptyFiled([])
      console.log('new workout added', json)
      dispatch({type:'CREATE_WORKOUT',payload: json})
    }


  }


  return (
    <>
      <form className='create' onSubmit={handleSubmit}>
        <h3>Add New Workout</h3>

        <label>Excercise Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
        className={emptyField.includes('title') ? 'error2': ''}
         />


        <label>Load (in kg's):</label>
        <input type="number" value={load} onChange={(e) => setLoad(e.target.value)} 
        className={emptyField.includes('load') ? 'error2': ''}
        />


        <label>Reps:</label>
        <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} 
        className={emptyField.includes('reps') ? 'error2': ''}
        />

        <button>Add Workout</button>
        {error && <div className='error'>{error}</div>}


      </form>

    </>
  )
}

export default WorkoutForm
