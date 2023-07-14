import React, { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Avatar, Modal, Pagination } from 'flowbite-react';
import ListView from '../../components/view/ListView';
import dummyRecipes from '../../dummyRecipes';
import { useState } from 'react';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import { defaultTagList } from '../recipe';
import Skeleton from '../../components/Skeleton';
import EditingIcon from '../../assets/EditingIcon';
import EditProfile from './EditProfile';
const MyProfile = () => {
  const { auth: { user: { userId, email, fullName, gender, birthday, profileImage } } } = useAuth()
  const privateAxios = usePrivateAxios()
  const navigate = useNavigate()
  const [recipes, setRecipes] = useState([])
  const [chosenTabs, setChosenTabs] = useState('All')
  const [chosenTags, setChosenTags] = useState([])
  const [userTagList, setUserTagList] = useState(defaultTagList)
  const [loading, setLoading] = useState(true)
  const avatarInput = useRef()
  const [editing, setEditing] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalRecipes, setTotalRecipes] = useState(1)
  const pageSize = 4
  const totalPages = Math.ceil(totalRecipes / pageSize)

  useEffect(() => {
    privateAxios.get(`/api/v1/global/tags/${userId}`).then(response => setUserTagList(prevList => [...prevList, ...response.data.map(tag => tag.tagName)]))
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
      privacyStatus: chosenTabs === 'All' ? null : chosenTabs.toUpperCase()
    }

    privateAxios.post(`/api/v1/user/recipes/filter?page=${currentPage - 1}&size=${pageSize}`, requestFilter)
      .then(response => setRecipes(response.data))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))

    privateAxios.post(`/api/v1/user/recipes/filter/total-item?page=${currentPage - 1}&size=${pageSize}`, requestFilter)
      .then((response) => { setTotalRecipes(response.data) })
      .catch((error) => console.log(error))

  }, [chosenTags, chosenTabs, currentPage]);

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
    <section className='flex justify-center sm:py-4 sm:mx-8 gap-6'>
      <div className='border-gray-400 rounded max-w-8xl w-full p-4 gap-4 bg-gray-50 flex flex-col lg:flex-row'>
        <div className='flex flex-col gap-8 font-semibold p-8 bg-gray-100'>
          <div className='flex flex-col md:flex-row lg:flex-col gap-8 '>
            <div className='flex flex-col items-start space-y-4 group'>
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
          <div>
            <button className='button-contained-square'
              onClick={() => setEditing(true)}>
              <EditingIcon style='w-6 h-6' />
              <span>Edit profile</span>
            </button>
            <Modal dismissible show={editing} onClose={() => setEditing(false)}>
              <Modal.Header>Edit profile</Modal.Header>
              <Modal.Body><EditProfile setEditing={setEditing} /></Modal.Body>
            </Modal>
          </div>
          <div className='space-y-2'>
            <h1 className='text-2xl'>Tag Collection</h1>
            <div className='flex flex-wrap gap-2 pt-2'>{tagListElement}</div>
          </div>

        </div>
        <section className='w-full'>
          <div className='flex border-b-2 border-gray-300 mb-4 xs:space-x-4'>
            {displayedTabs.map(tab =>
              <button key={tab} className={`bg-gray-100 p-4 rounded-t-lg hover:bg-gray-200 text-sm xs:text-xl font-semibold sm:w-44 ${chosenTabs === tab ? 'bg-gray-200' : ''}`}
                onClick={() => setChosenTabs(tab)}>{tab} recipes</button>
            )}
          </div>
          {loading ?
            <Skeleton />
            : <div>
              <ListView recipeData={recipes} />
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
        </section>

      </div>
    </section>
  )
}

export default MyProfile