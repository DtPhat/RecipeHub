import { Modal, Spinner } from 'flowbite-react'
import React, { useState } from 'react'
import usePrivateAxios from '../hooks/usePrivateAxios'
import useTheme from '../hooks/useTheme'
import { getStartOfDate } from '../utils/DateUtils'
const RecipePlanner = ({ id, open, setOpen }) => {
  const {isDarkMode} = useTheme()
  const [submitting, setSubmitting] = useState(false)
  const [chosenDate, setChosenDate] = useState('')
  const privateAxios = usePrivateAxios()
  const [chosenMealType, setChosenMealType] = useState('BREAKFAST')
  const uploadMealPlanner = () => {
    if (!chosenDate) return
    setSubmitting(true)
    privateAxios.post(`/api/v1/user/meal-planer`, {
      date: getStartOfDate(new Date(chosenDate)).getTime() ,
      recipeId: id,
      mealType: chosenMealType
    }).then(response => console.log(response))
      .catch(error => console.log(error))
      .finally(() => { setSubmitting(false); setOpen(false) })
  }
  console.log(chosenDate);
  return (
    <Modal dismissible show={open} onClose={() => setOpen(false)} size='5xl' className={isDarkMode ? 'dark' : ''}>
      <Modal.Body >
        {
          <section className='flex flex-col space-y-8 text-dark dark:text-white'>
            <div className='space-y-2'>
              <h1 className='text-xl pl-1 font-semibold'>Choose meal type:</h1>
              <div className='flex justify-between gap-4 flex-col sm:flex-row'>
                <button
                  className={`${chosenMealType === 'BREAKFAST' ? 'button-contained-square opacity-90' : 'button-outlined-square font-bold'} p-1 sm:text-xl`}
                  onClick={() => { setChosenMealType('BREAKFAST') }}>Breakfast</button>
                <button
                  className={`${chosenMealType === 'LUNCH' ? 'button-contained-square opacity-90' : 'button-outlined-square font-bold'} p-1 sm:text-xl`}
                  onClick={() => { setChosenMealType('LUNCH') }}>Lunch</button>
                <button
                  className={`${chosenMealType === 'DINNER' ? 'button-contained-square opacity-90' : 'button-outlined-square font-bold'} p-1 sm:text-xl`}
                  onClick={() => { setChosenMealType('DINNER') }}>Dinner</button>
              </div>
            </div>
            <div className='space-y-2'>
              <h1 className='text-xl pl-1 font-semibold'>Choose date:</h1>
              <input type="date" className='py-2 text-lg px-2 dark:bg-gray-600 border-b-2 focus:outline-green-accent w-full' name='birthday' id='birthdate'
                onChange={(e) => { setChosenDate(e.target.value) }} />
            </div>
            <div className='flex gap-4 justify-end pt-2 pr-4'>
              <button className='button-outlined color-secondary opacity-50 hover:opacity-100 w-32' onClick={() => { setOpen(false) }}>Cancel</button>
              <button className={`button-contained w-32 disabled:opacity-50`} onClick={() => uploadMealPlanner()} disabled={submitting || !chosenDate}>
                {submitting ?
                  <Spinner color='success' />
                  : <span>Plan</span>}
              </button>
            </div>
          </section>
        }
      </Modal.Body>
    </Modal >
  )
}

export default RecipePlanner