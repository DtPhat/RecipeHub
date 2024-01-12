import { Modal } from 'flowbite-react';
import React, { useEffect } from 'react'
import { useState } from 'react';
import ArrowCircleIcon from '../../assets/ArrowCircleIcon';
import PlusCircleIcon from '../../assets/PlusCircleIcon';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import useTheme from '../../hooks/useTheme';
import {
  getFilledDaysInMonth,
  getDaysInWeek,
  getMonthYear,
  getDateMonth,
  moveNextMonth,
  movePrevMonth,
  moveNextWeek,
  movePrevWeek,
  areSameDay,
  getStartOfDate,
} from '../../utils/DateUtils'
import RecipeSelections from './RecipeSelections';

const Calendar = ({ chosenDate, setChosenDate, newPlannedRecipe, setNewPlannedRecipe, removedPlannedRecipe }) => {
  const privateAxios = usePrivateAxios()
  const {isDarkMode} = useTheme()
  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const today = new Date((new Date).getFullYear(), (new Date).getMonth(), (new Date).getDate())
  const [navigationDate, setNavigationDate] = useState(chosenDate)
  const [daysDisplay, setDaysDisplay] = useState('month')
  const [openRecipeSelections, setOpenRecipeSelections] = useState(false)

  const daysInWeek = getDaysInWeek(navigationDate)
  const firstDateOfWeek = daysInWeek[0]
  const lastDateOfWeek = daysInWeek[6]
  const firstDateOfMonth = new Date(navigationDate.getFullYear(), navigationDate.getMonth(), 1)
  const lastDateOfMonth = new Date(navigationDate.getFullYear(), navigationDate.getMonth() + 1, 0)

  const [plannerData, setPlannerData] = useState([])
  console.log(plannerData);
  useEffect(() => {
    const firstDate = daysDisplay == 'month' ? firstDateOfMonth : firstDateOfWeek
    const lastDate = daysDisplay == 'month' ? lastDateOfMonth : lastDateOfWeek
    privateAxios.get(`/api/v1/user/meal-planers?from=${firstDate.getTime()}&to=${lastDate.getTime()}`).then(response => setPlannerData(response.data))
  }, [daysDisplay, newPlannedRecipe, removedPlannedRecipe, navigationDate]);

  const style = {
    cell: 'w-full border border-green-900 dark:border-green-300 h-16 p-2 cursor-pointer text-lg relative',
    header: 'w-full border border-green-900 dark:border-green-300 h-16 p-2 sm:text-xl sm:px-4 font-semibold bg-green-800 text-white',
    today: 'rounded-full border bg-green-accent text-white'
  }
  const daysOfWeekElement = DAYS.map(dayOfWeek =>
    <div key={dayOfWeek}
      className={`${style.header} `}>
      {dayOfWeek}
    </div>)

  const countPlannedMeals = (date) => {
    return plannerData.filter(planner => planner.date == Date.parse(date)).length
  }
  const daysInMonth = getFilledDaysInMonth(navigationDate)
  const daysInMonthElement = daysInMonth.map((date, index) =>
    <div key={index}
      className={`${style.cell} flex items-center justify-between
          ${today > date ? 'text-gray-500' : ''}
          ${date && areSameDay(date, chosenDate) ? 'bg-green-100 dark:bg-green-dark' : 'hover:bg-gray'}`}
      onClick={() => { date && setChosenDate(date) }}>
      <span className={`w-5 h-5 sm:w-7 sm:h-7 lg:w-10 lg:h-10 flex justify-center items-center text-sm lg:text-lg
        ${date && areSameDay(date, today) ? style.today : ''} `}>{date && date.getDate()}</span>
      <span className='text-sm md:text-lg lg:text-xl xl:text-2xl text-accent font-bold'>
        {countPlannedMeals(date) > 0 ? `+${countPlannedMeals(date)}` : ''}
      </span>
      {date && today <= date &&
        <button className='rounded-full z-10 absolute top-1 right-1 sm:static' onClick={(e) => { showRecipeSelections() }}>
          <PlusCircleIcon style={`${date && areSameDay(date, chosenDate) ? 'text-accent' : ''} w-5 h-5 sm:w-7 sm:h-7 lg:w-10 lg:h-10 text-gray-300 hover:fill-green-300 dark:hover:fill-green-600 hover:text-accent`} />
        </button>}
    </div>)


  const daysInWeekElement = daysInWeek.map((date) =>
    <div key={date}>
      <div className={`${style.header} text-sm sm:text-base lg:text-xl`}>
        <button className={`px-0 xs:px-1 sm:px-2 py-0 text-center ${areSameDay(date, today) ? style.today : today > date ? 'text-gray-500 ' : ''}`}>
          {DAYS[date.getDay() === 0 ? 6 : date.getDay() - 1]}, {date.getDate()}
        </button>
      </div>
      <div className={`${style.cell} ${areSameDay(date, chosenDate) ? 'bg-green-200 dark:bg-green-dark' : 'hover:bg-gray'} text-xl p-4 w-full flex justify-between`}
        onClick={() => setChosenDate(date)}>
        <span className='text-base md:text-lg lg:text-xl xl:text-2xl text-accent font-bold'>
          {countPlannedMeals(date) > 0 ? `+${countPlannedMeals(date)}` : ''}
        </span>
        <button className='rounded-full z-10 absolute top-1 right-1 sm:static' onClick={(e) => { showRecipeSelections() }}>
          <PlusCircleIcon style={`${date && areSameDay(date, chosenDate) ? 'text-accent' : ''} w-5 h-5 sm:w-7 sm:h-7 lg:w-10 lg:h-10 text-gray-300  dark:hover:fill-green-600 hover:fill-green-300 hover:text-accent`} />
        </button>
      </div>
    </div>)



  const showRecipeSelections = () => {
    setOpenRecipeSelections(true)
  }

  return (
    <section className='font-semibold border border-green-900 dark:border-green-300 rounded'>
      <div className='flex justify-between border border-green-900 dark:border-green-300 items-center rounded-t-sm bg-gray'>
        <div className='flex py-3 px-2'>
          <button className='p-1 rounded'
            onClick={() => {
              daysDisplay === 'month' && movePrevMonth(navigationDate, setNavigationDate)
              daysDisplay === 'week' && movePrevWeek(navigationDate, setNavigationDate)
            }}>
            <ArrowCircleIcon style='hover:fill-green-500 w-8 h-8 text-accent' />
          </button>
          <button className='p-1 rounded'
            onClick={() => {
              daysDisplay === 'month' && moveNextMonth(navigationDate, setNavigationDate)
              daysDisplay === 'week' && moveNextWeek(navigationDate, setNavigationDate)
            }}>
            <ArrowCircleIcon style='hover:fill-green-500 w-8 h-8 text-accent scale-[-1]' />
          </button>
          <button className='px-2'
            onClick={() => setNavigationDate(today)}>
            <span className={`border-2 py-0 px-1 sm:p-1 sm:px-2 rounded 
            ${areSameDay(navigationDate, today) ? 'border-green-accent bg-green-accent text-white dark:bg-green-700' : 'border-green-accent hover:bg-green-accent hover:text-white hover:dark:bg-green-700 text-accent hover:opacity-80'}`}>Today</span>
          </button>
        </div>
        <h1 className='text-base xs:text-xl sm:text-3xl'>
          {daysDisplay === "month" && getMonthYear(navigationDate)}
          {daysDisplay === "week" && `${getDateMonth(firstDateOfWeek)} - ${getDateMonth(lastDateOfWeek)}, ${navigationDate.getFullYear()}`}
        </h1>
        <div className='flex flex-wrap gap-1 sm:gap-2 px-2'>
          <button className={`border-2 py-0 px-1 sm:p-1 sm:px-2 rounded 
          ${daysDisplay === 'month' ? 'border-green-accent bg-green-accent text-white dark:bg-green-700' : 'border-green-accent hover:bg-green-accent hover:text-white hover:dark:bg-green-700 text-accent hover:opacity-80'}`}
            onClick={() => setDaysDisplay('month')}>Month</button>
          <button className={`border-2 py-0 px-1 sm:p-1 sm:px-2 rounded 
          ${daysDisplay === 'week' ? 'border-green-accent bg-green-accent text-white dark:bg-green-700' : 'border-green-accent hover:bg-green-accent hover:text-white hover:dark:bg-green-700 text-accent hover:opacity-80'}`}
            onClick={() => setDaysDisplay('week')}>Week</button>
        </div>
      </div>
      <div>
        {daysDisplay === "month" &&
          <div className='grid grid-cols-7'>
            {daysOfWeekElement}
            {daysInMonthElement}
          </div>
        }
        {daysDisplay === "week" &&
          <div className='grid grid-cols-7'>
            {daysInWeekElement}
          </div>
        }
      </div>
      <Modal dismissible show={openRecipeSelections} onClose={() => setOpenRecipeSelections(false)} size='5xl' className={isDarkMode ? 'dark' : ''}>
        <Modal.Body className='app'>
          <RecipeSelections setOpenRecipeSelections={setOpenRecipeSelections} chosenDate={chosenDate} setNewPlannedRecipe={setNewPlannedRecipe} />
        </Modal.Body>
      </Modal>
    </section>
  )
}

export default Calendar