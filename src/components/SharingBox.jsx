import { Avatar, Modal, Spinner } from 'flowbite-react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import usePrivateAxios from '../hooks/usePrivateAxios'
import NoFriends from '../pages/friends/NoRecipes'
import SearchBar from './SearchBar'
import Skeleton from './Skeleton'

const SharingBox = ({ id, open, setOpen }) => {
  const [emails, setEmails] = useState([])
  const [keyword, setKeyword] = useState('')
  const [friendList, setFriendList] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [chosenFriends, setChosenFriends] = useState()
  const [emailInput, setEmailInput] = useState('')
  const privateAxios = usePrivateAxios()
  const share = () => {
    if (!emails.length) return
    setSubmitting(true)
    privateAxios.post(`/api/v1/user/share-recipe/${id}`, emails).then(response => console.log(response.data))
      .catch(error => console.log(error))
      .finally(() => { setSubmitting(false); setOpen(false) })
  }
  useEffect(() => {
    privateAxios.get('/api/v1/user/friends').then(response => setFriendList(response.data)).catch(error => console.log(error)).finally(() => setLoading(false))
  }, []);

  const addToEmailList = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      setEmails(prevEmails => [...prevEmails, emailInput])
      setEmailInput('')
    }
  }
  const searchedFriendList = [...friendList.filter(friend => friend.fullName.toUpperCase().includes(keyword.toUpperCase()))]
  return (
    <Modal dismissible show={open} onClose={() => setOpen(false)} size='5xl'>
      <Modal.Body >
        {
          <section className='flex flex-col space-y-4'>
            <div className='space-y-2  px-2'>
              <h1 className='text-3xl font-semibold py-1'>Choose friends to share: </h1>
              <SearchBar keyword={keyword} setKeyword={setKeyword} placeholder='Search friends' autoFocus={true} />
              {loading ? <Skeleton /> :
                (!friendList.length) ?
                  <p className='text-2xl font-semibold text-gray-500'>No friends found</p>
                  : <div className='flex flex-col gap-2 max-h-96 overflow-auto'>
                    {(searchedFriendList)?.map(friend =>
                      <div key={friend.userId} className={`${emails?.includes(friend.email) ? 'outline outline-green-accent' : 'hover:border-green-accent'} flex items-center border-2 border-gray-200 rounded space-x-4 py-2 px-4 m-1 bg-gray-50 cursor-pointer relative`}
                        onClick={() => setEmails(prevEmails => emails?.includes(friend.email) ? prevEmails.filter(email => email != friend.email) : [...prevEmails, friend.email])}>
                        <Avatar img={friend.profileImage} size='lg' rounded bordered />
                        <div className='flex flex-col gap-2 overflow-hidden'>
                          <h1 className='text-xl font-bold truncate'>{friend.fullName}</h1>
                          <p className='text-lg font-bold text-gray-500 truncate'>{friend.email}</p>
                        </div>
                        <span className='absolute text-gray-500 font-semibold text-sm top-1 right-2'>ID: {friend.userId}</span>
                      </div>
                    )}
                  </div>
              }
            </div>
            <div className='space-y-2 border-b-2 border-green-accent pb-4 px-2 flex items-center gap-2 flex-col md:flex-row'>
              <h1 className='text-2xl font-semibold'>Add email directly : </h1>
              <SearchBar keyword={emailInput} setKeyword={setEmailInput} placeholder='Enter email' handleEnter={addToEmailList} autoFocus={true} />
            </div>
            <div className='flex flex-wrap gap-2'>
              <h1 className='text-xl font-semibold'>Share to emails:</h1>
              {emails.map((email) => {
                return (
                  <p key={email} className='border rounded-full py-0.5 px-3 space-x-2 border-green-variant text-green-accent font-semibold'>
                    <span>{email}</span>
                    <button className='border rounded-full w-5 h-5 color-secondary text-sm text-center'
                      onClick={() => setEmails(prevEmails => prevEmails.filter(chosenEmail => chosenEmail != email))}>X</button>
                  </p>)
              })}
            </div>
            <div className='flex gap-4 justify-end pt-2 pr-4'>
              <button className='button-outlined color-secondary opacity-50 hover:opacity-100 w-32' onClick={() => { setOpen(false) }}>Cancel</button>
              <button className='button-contained w-32' onClick={() => share()} disabled={submitting}>
                {submitting ?
                  <Spinner color='success' />
                  : <span>Share</span>}
              </button>
            </div>
          </section >
        }
      </Modal.Body>
    </Modal >
  )
}

export default SharingBox