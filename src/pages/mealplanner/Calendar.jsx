import { data } from 'autoprefixer';
import React from 'react'
import { useState } from 'react';
import ArrowCircleIcon from '../../assets/ArrowCircleIcon';
import PlusCircleIcon from '../../assets/PlusCircleIcon';
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
} from '../../utils/DateUtils'

const Calendar = ({ chosenDate, setChosenDate }) => {
  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const today = new Date((new Date).getFullYear(), (new Date).getMonth(), (new Date).getDate())
  const [navigationDate, setNavigationDate] = useState(today)
  const [daysDisplay, setDaysDisplay] = useState('month')
  const [showingPlus, setShowingPlus] = useState(false)
  const style = {
    cell: 'w-full border border-green-900 h-16 p-2 cursor-pointer text-lg relative',
    header: 'w-full border border-green-900 h-16 p-2 text-xl px-4 font-semibold bg-green-variant',
    today: 'rounded-full border bg-green-accent text-white'
  }
  const daysOfWeekElement = DAYS.map(dayOfWeek =>
    <div key={dayOfWeek}
      className={`${style.header} `}>
      {dayOfWeek}
    </div>)
  const daysInMonthElement = getFilledDaysInMonth(navigationDate).map((date, index) =>
    <div key={index} className={` ${style.cell} flex items-center justify-between 
    ${today > date ? 'text-gray-500' : ''}
    ${date && areSameDay(date, chosenDate) ? 'bg-green-200' : 'hover:bg-gray-200'}`}
      onClick={() => date && setChosenDate(date)}>
      <button className={`w-10 h-10 ${date && areSameDay(date, today) ? style.today : ''}`}>{date && date.getDate()}</button>
      {date &&
        <button className='rounded-full z-10' onClick={(e) => { e.stopPropagation(); console.log("show recipe list") }}>
          <PlusCircleIcon style={`${date && areSameDay(date, chosenDate) ? 'text-green-accent' : ''} w-10 h-10 text-gray-300 hover:fill-green-300 hover:text-green-accent`} />
        </button>}
    </div>)
  const daysInWeek = getDaysInWeek(navigationDate)
  const firstDateOfWeek = daysInWeek[0]
  const lastDateOfWeek = daysInWeek[6]
  const daysInWeekElement = daysInWeek.map((date) =>
    <div key={date}>
      <div className={`${style.header} text-xl p-4`}>
        <button className={`w-24 text-center 
        ${areSameDay(date, today) ? style.today : today > date ? 'text-gray-500 ' : ''}`}>
          {DAYS[date.getDay() === 0 ? 6 : date.getDay() - 1]}, {date.getDate()}
        </button>
      </div>
      <div className={`${style.cell} ${areSameDay(date, chosenDate) ? 'bg-green-200' : 'hover:bg-gray-200'} text-xl p-4 w-full flex justify-end`}
        onClick={() => setChosenDate(date)}>
        <button className={`rounded-full z-10 flex justify-end`}
          onClick={(e) => { e.stopPropagation(); console.log("show recipe list") }}>
          <PlusCircleIcon style={`${areSameDay(date, chosenDate) ? 'text-green-accent' : ''} w-10 h-10 text-gray-300 hover:fill-green-300 hover:text-green-accent`} />
        </button>
      </div>
    </div>)
  return (
    <section className='font-semibold border border-green-900 rounded'>
      <div className='flex justify-between border border-green-900 items-center rounded-t-sm bg-green-50'>
        <div className='flex py-3 px-2'>
          <button className='hover:bg-green-100 p-1 rounded'
            onClick={() => {
              daysDisplay === 'month' && movePrevMonth(navigationDate, setNavigationDate)
              daysDisplay === 'week' && movePrevWeek(navigationDate, setNavigationDate)
            }}>
            <ArrowCircleIcon style='w-8 h-8 text-green-accent' />
          </button>
          <button className='hover:bg-green-100 p-1 rounded'
            onClick={() => {
              daysDisplay === 'month' && moveNextMonth(navigationDate, setNavigationDate)
              daysDisplay === 'week' && moveNextWeek(navigationDate, setNavigationDate)
            }}>
            <ArrowCircleIcon style='w-8 h-8 text-green-accent scale-[-1]' />
          </button>
          <button className='px-2'
            onClick={() => setNavigationDate(today)}>
            <span className={`border-2 p-1 rounded px-2 
            ${areSameDay(navigationDate, today) ? 'border-green-accent bg-green-200' : 'border-green-variant hover:bg-green-100 text-green-accent'}`}>Today</span>
          </button>
        </div>
        <h1 className='text-3xl'>
          {daysDisplay === "month" && getMonthYear(navigationDate)}
          {daysDisplay === "week" && `${getDateMonth(firstDateOfWeek)} - ${getDateMonth(lastDateOfWeek)}, ${navigationDate.getFullYear()}`}
        </h1>
        <div className='space-x-2 px-2'>
          <button className={`border-2  p-1 rounded px-2 
          ${daysDisplay === 'month' ? 'border-green-accent bg-green-200' : 'border-green-variant hover:bg-green-100 text-green-accent'}`}
            onClick={() => setDaysDisplay('month')}>Month</button>
          <button className={`border-2 p-1 rounded px-2
          ${daysDisplay === 'week' ? 'border-green-accent bg-green-200' : 'border-green-variant hover:bg-green-100 text-green-accent'}`}
            onClick={() => setDaysDisplay('week')}>Week</button>
        </div>
      </div>
      <div>
        {daysDisplay === "month" &&
          <div className='grid grid-cols-7'>
            {daysOfWeekElement}
            {daysInMonthElement}
          </div>}
        {daysDisplay === "week" &&
          <div className='grid grid-cols-7'>
            {daysInWeekElement}
          </div>
        }
      </div>
    </section>
  )
}

export default Calendar