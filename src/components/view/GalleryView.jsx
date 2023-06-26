import React from 'react'
import ClockIcon from '../../assets/ClockIcon'
import HeartIcon from '../../assets/HeartIcon'
import KnifeForkIcon from '../../assets/KnifeForkIcon'
import LeafIcon from '../../assets/LeafIcon'
import StarIcon from '../../assets/StarIcon'
import {msToTime} from '../../utils/TimeUtil'

const GalleryView = ({ recipeData }) => {

  return (
    <div className='py-2 grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
      {recipeData.map(item => {
        const { imgUrl, title, tags, rating, prepTime, cookTime, recipeYield, ingredients, isFavourite } = item
        const stars = []
        for (let i = 0; i < 5; i++) {
          stars.push(i < rating ? true : false)
        }
        return (
          <div className='w-full h-80 flex flex-col border-2 border-gray-200 rounded p-2 space-y-1 bg-gray-100 hover:border-green-accent cursor-pointer relative'>
            <img src={imgUrl} alt="" className='w-full h-52 object-cover rounded' />
            <h1 className='text-xl font-bold text-green-accent pt-2 truncate'>{title}</h1>
            <div className='flex font-medium space-x-1'><ClockIcon style='w-6 h-6' /><span>{msToTime(300000)}</span></div>
            <div className='flex space-x-1'>
              {stars.map((star, i) => {
                return <StarIcon key={i} style={`w-4 h-4 stroke-transparent ${star ? 'fill-orange-accent' : 'fill-gray-300'}`} />
              })}
            </div>
            {isFavourite && <HeartIcon style='w-8 h-8 absolute fill-red-600 stroke-red-200 right-4 top-44' />}
          </div>)
      })}
    </div>
  )
}

export default GalleryView