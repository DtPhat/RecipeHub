import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Avatar } from 'flowbite-react';
import ListView from '../../components/view/ListView';
import dummyRecipes from '../../dummyRecipes';
import { useState } from 'react';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import { defaultTagList } from '../recipe';
const Profile = () => {
  const { auth: { user: { userId, email, fullName, gender, birthday, profileImage } } } = useAuth()
  const privateAxios = usePrivateAxios()
  const [chosenTabs, setChosenTabs] = useState('All')
  const [chosenTags, setChosenTags] = useState([])
  const [userTagList, setUserTagList] = useState(defaultTagList)
  useEffect(() => {
    privateAxios.get(`/api/v1/global/tags/${userId}`).then(response => setUserTagList(prevList => [...prevList, ...response.data.map(tag => tag.tagName)]))
  }, []);
  const tagListElement = userTagList.map(tag => (
    <button key={tag} className={`${chosenTags.includes(tag) ? 'button-contained-square' : 'button-outlined-square'} w-auto py-1`}
      onClick={() => setChosenTags((prevchosenTags) => {
        const newTags = [...prevchosenTags]
        newTags.includes(tag) ? newTags.splice(newTags.indexOf(tag), 1) : newTags.push(tag)
        return newTags
      })}>
      {tag}
    </button>))

  const displayedTabs = ['All', 'Public', 'Private']

  return (
    <section className='flex justify-center py-4 mx-8 gap-6'>
      <div className='border-gray-400 rounded max-w-8xl w-full space-y-4 bg-gray-50 space-x-4 py-4 px-8 flex'>
        <div className='w-1/2 space-y-8 font-semibold mt-4 p-8 bg-gray-100'>
          <div className='flex flex-col items-start space-y-4'>
            <Avatar img={profileImage} size='xl' stacked />
            <h1 className='text-2xl font-bold'>{fullName}</h1>
          </div>
          <div className='flex space-x-8'>
            <div className='text-gray-500 flex flex-col space-y-4'>
              <span>User ID</span>
              <span>Email</span>
              <span className='text-gray-500'>Date of birth</span>
              <span className='text-gray-500'>Gender</span>
            </div>
            <div className='flex flex-col space-y-4'>
              <span>{userId}</span>
              <span>{email}</span>
              <span>{new Date(birthday).toLocaleDateString()}</span>
              <span>{gender}</span>
            </div>
          </div>
          <div className='space-y-2'>
            <h1 className='text-2xl'>Tag Collection</h1>
            <div className='flex flex-wrap gap-2 pt-2'>{tagListElement}</div>
          </div>
          <div className='pt-4'><button className='button-contained-square'>Edit profile</button></div>
        </div>
        <div className='w-full'>
          <div className='flex border-b-2 border-gray-300 mb-4 space-x-4'>
            {displayedTabs.map(tab =>
              <button key={tab} className={`bg-gray-100 p-4 rounded-t-lg hover:bg-gray-200 text-lg font-semibold w-44 ${chosenTabs === tab ? 'bg-gray-300' : ''}`}
                onClick={() => setChosenTabs(tab)}>{tab} recipes</button>
            )}
          </div>
          <ListView recipeData={dummyRecipes} />
        </div>
      </div>
    </section>
  )
}

export default Profile