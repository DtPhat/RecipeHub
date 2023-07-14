import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Avatar, Pagination } from 'flowbite-react';
import ListView from '../../components/view/ListView';
import dummyRecipes from '../../dummyRecipes';
import { useState } from 'react';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import { defaultTagList } from '../recipe';
import AddingFriendButton from '../../components/AddingFriendButton';
import Toast from '../../components/Toast';
import Skeleton from '../../components/Skeleton';
const UserProfile = () => {
  const { userId } = useParams()
  const myId = useAuth().auth.user.userId
  const privateAxios = usePrivateAxios()
  const [recipes, setRecipes] = useState([])
  const [chosenTabs, setChosenTabs] = useState('Public')
  const [chosenTags, setChosenTags] = useState([])
  const [userTagList, setUserTagList] = useState(defaultTagList)
  const [userProfile, setUserProfile] = useState({})
  const [showingToast, setShowingToast] = useState(false)
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalRecipes, setTotalRecipes] = useState(1)
  const pageSize = 4
  const totalPages = Math.ceil(totalRecipes / pageSize)

  const { email, fullName, gender, birthday, profileImage } = userProfile
  useEffect(() => {
    privateAxios.get(`/api/v1/global/tags/${userId}`).then(response => setUserTagList(prevList => [...prevList, ...response.data.map(tag => tag.tagName)]))
  }, []);
  useEffect(() => {
    privateAxios.get(`/api/v1/global/user/profile/${userId}`).then(response => setUserProfile(response.data))
  }, []);
  useEffect(() => {
    setLoading(true)
    const requestFilter = {
      tags: chosenTags,
      ingredients: [],
      favorite: '',
      sortBy: '',
      direction: 'asc',
      title: '',
      privacyStatus: 'PUBLIC'
    }

    privateAxios.post(`/api/v1/global/recipes/filter/${userId}?page=${currentPage - 1}&size=${pageSize}`, requestFilter)
      .then(response => setRecipes(response.data))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))

    privateAxios.post(`/api/v1/global/recipes/filter/${userId}/total-item?page=${currentPage - 1}&size=${pageSize}`, requestFilter)
      .then((response) => { setTotalRecipes(response.data) })
      .catch((error) => console.log(error))

  }, [chosenTags, currentPage]);
  const tagListElement = userTagList.map(tag => (
    <button key={tag} className={`${chosenTags.includes(tag) ? 'button-contained-square' : 'button-outlined-square'} w-auto py-1`}
      onClick={() => setChosenTags((prevchosenTags) => {
        const newTags = [...prevchosenTags]
        newTags.includes(tag) ? newTags.splice(newTags.indexOf(tag), 1) : newTags.push(tag)
        return newTags
      })}>
      {tag}
    </button>))

  const displayedTabs = ['Public']

  return (
    <section className='flex justify-center xs:py-4 xs:mx-8 gap-6'>
      <div className='border-gray-400 rounded max-w-8xl w-full p-4 gap-4 bg-gray-50 flex flex-col lg:flex-row'>
        <div className='flex flex-col gap-8 font-semibold p-8 bg-gray-100'>
          <div className='flex flex-col md:flex-row lg:flex-col gap-8 '>
            <div className='flex flex-col items-start space-y-4'>
              <Avatar img={profileImage} size='xl' stacked />
              <h1 className='text-2xl font-bold'>{fullName}</h1>
            </div>
            <div className='hidden xs:flex gap-1 sm:gap-8 text-lg'>
              <div className='text-gray-500 flex flex-col space-y-4'>
                <span>User ID</span>
                <span>Email</span>
                <span className='text-gray-500'>Date of birth</span>
                <span className='text-gray-500'>Gender</span>
              </div>
              <div className='flex flex-col space-y-4 overflow-hidden'>
                <span>{userId}</span>
                <span className='break-words'>{email}</span>
                <span>{new Date(birthday).toLocaleDateString()}</span>
                <span>{gender}</span>
              </div>
            </div>
            <div className='flex xs:hidden flex-col gap-1 text-lg overflow-hidden'>
              <span className='text-gray-500'>User ID:</span>
              <span>{userId}</span>
              <span className='text-gray-500'>Email:</span>
              <span className='break-words'>{email}</span>
              <span className='text-gray-500'>Date of birth:</span>
              <span>{new Date(birthday).toLocaleDateString()}</span>
              <span className='text-gray-500'>Gender:</span>
              <span>{gender}</span>
            </div>
          </div>
          <div className='space-y-2'>
            <h1 className='text-2xl'>Tag Collection</h1>
            <div className='flex flex-wrap gap-2 pt-2'>{tagListElement}</div>
          </div>
          <AddingFriendButton friendId={userId} onSuccess={() => setShowingToast(true)} />
        </div>
        <div className='w-full'>
          <div className='flex border-b-2 border-gray-300 mb-4 space-x-4'>
            {displayedTabs.map(tab =>
              <button key={tab} className={`bg-gray-100 p-4 rounded-t-lg hover:bg-gray-200 text-xl font-semibold w-44 cursor-default ${chosenTabs === tab ? 'bg-gray-200' : ''}`}
                disabled onClick={() => setChosenTabs(tab)}>{tab} recipes</button>
            )}
          </div>
          {loading ?
            <Skeleton />
            : <div>
              <ListView recipeData={recipes} global={true} />
              <div className='flex justify-end mt-4'>
                <Pagination
                  currentPage={currentPage}
                  onPageChange={(page) => { setCurrentPage(page) }}
                  showIcons
                  totalPages={totalPages}
                />
              </div>
            </div>
          }
        </div>
      </div>
      {showingToast && <Toast message='Add friend successfully' />}
    </section>
  )
}

export default UserProfile