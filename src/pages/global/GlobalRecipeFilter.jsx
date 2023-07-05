import { Dropdown } from 'flowbite-react'
import React, { useState } from 'react'

const GlobalRecipeFilter = ({ filter, setFilter }) => {
  const [sortingBy, setSortingBy] = useState("New")
  const tagList = ['breakfast', 'lunch', 'dinner', 'appetizer', 'dessert', 'drink', 'snack']
  const tagListElement = tagList.map(tag => (
    <button key={tag} className={`px-4 py-2 capitalize text-xl font-semibold rounded
      ${filter.tags.includes(tag) ? ' bg-gray-200' : 'text-gray-600 hover:underline underline-offset-2'}`}
      onClick={() => setFilter(preFilter => {
        const tagList = [...preFilter.tags]
        tagList.includes(tag) ? tagList.splice(tagList.indexOf(tag), 1) : tagList.push(tag)
        return { ...preFilter, tags: tagList }
      })}>
      {tag}
    </button>))

  return (
    <div className='flex items-center justify-center border-b-2 pb-2'>
      <div></div>
      <div className='flex items-center gap-2'>
        {/* <h1 className='text-xl font-semibold'>Choose meal type:</h1> */}
        <div className='flex flex-wrap gap-4'>{tagListElement}</div>
      </div>
      {/* <div className='flex text-xl font-semibold '>
        <Dropdown label={<div className=''>{sortingBy}</div>} className='bg-green-900 rounded text-white' color='primary'>
          <Dropdown.Item>
            New
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            Hot
          </Dropdown.Item>
        </Dropdown>
      </div> */}
    </div>
  )
}

export default GlobalRecipeFilter