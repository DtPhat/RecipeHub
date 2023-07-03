import React, { useEffect, useState } from 'react'
import { Avatar } from 'flowbite-react';
import SearchingIcon from '../../assets/SearchingIcon';
import XCircleIcon from '../../assets/XCircleIcon';
import PlusFriendIcon from '../../assets/PlusFriendIcon';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import Toast from '../../components/Toast';

const FriendRecipe = () => {
  const [friendList, setFriendList] = useState()
  const privateAxios = usePrivateAxios()
  const [keyword, setKeyword] = useState('')
  const [friendId, setFriendId] = useState('')
  const [searchResult, setSearchResult] = useState('')
  const [friendRequest, setFriendRequest] = useState([])
  const [showingToast, setShowingToast] = useState(false)
  useEffect(() => {
    privateAxios.get('/api/v1/user/friends').then(response => setFriendList(response.data))
  }, []);
  const searchByKeyword = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      setSearchResult(keyword)
    }
  }
  const addFriendById = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      privateAxios.post(`/api/v1/user/request-friend/${friendId}`).then(response => {
        console.log(response)
      })
    }
  }
  console.log(friendRequest);
  const unfriend = (friend_id) => {
    privateAxios.delete(`/api/v1/user/remove-friend/${friend_id}`)
    setShowingToast(true)
    setFriendList(prevList => prevList.filter(friend => friend.userId != friend_id))
  }
  return (
    <section className='flex justify-center py-4 mx-8'>
      <div className='max-w-8xl w-full flex flex-col rounded space-y-4 bg-gray-50 px-8 py-4'>
        <div className='select-none flex justify-between pb-2 border-b-2 border-green-accent text-green-accent'>
          <h1 className='text-4xl font-semibold text-gray-600 w-1/2'>View friend's recipes</h1>
          <div className='flex items-center w-1/2 border-2 border-green-accent rounded-xl relative bottom-1 left-4 px-2 mr-4 cursor-pointer'>
            <label htmlFor='search'><SearchingIcon style='w-8 h-8 cursor-pointer' /></label>
            <input className='bg-transparent focus:outline-none rounded-full w-full text-lg p-2 text-black'
              placeholder='Search by name' id='search' autoComplete='off'
              value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={searchByKeyword} />
            <button onClick={() => setKeyword('')}><XCircleIcon style='w-8 h-8 text-gray-500 hover:fill-gray-200' /></button>
          </div>
        </div>
        <div className='flex justify-end items-center space-y-2 '>
          <h1 className='font-semibold text-2xl text-green-accent'>ADD NEW FRIEND:</h1>
          <div className='flex items-center gap-2'>
            <div className='flex items-center w-48 border-2 border-green-accent rounded-xl relative bottom-1 left-4 px-2 mr-4 cursor-pointer'>
              <label htmlFor='addFriend'>
                <PlusFriendIcon style='w-8 h-8 text-green-accent' />
              </label>
              <input className='bg-transparent focus:outline-none rounded-full w-full text-lg px-4 py-2 text-black'
                placeholder='Enter ID' id='addFriend' autoComplete='off'
                value={friendId} onChange={(e) => setFriendId(e.target.value)} onKeyDown={addFriendById} />
            </div>
          </div>


        </div>
        <div className='grid grid-cols-4 gap-4'>
          {friendList?.map(friend =>
            <div className='flex border-2 border-gray-300 hover:border-green-accent rounded p-4 gap-8 items-center cursor-pointer hover:bg-gray-100 relative'>
              <Avatar img={friend.profileImage} size='lg' rounded bordered />
              <div className='flex flex-col gap-2 over'>
                <h1 className='text-2xl font-bold w-52 truncate'>{friend.fullName}</h1>
                <div className='flex gap-2'>
                  <button className='button-contained-square py-1 w-auto text-base'>View profile</button>
                  <button className='button-outlined-square py-1 w-auto text-base color-secondary'
                    onClick={() => window.confirm() && unfriend(friend.userId)}>Unfriend</button>
                </div>
                {showingToast && <Toast message='Unfriend successfully' />}
              </div>
              <span className='absolute text-gray-500 font-semibold text-sm top-1 right-2'>ID: {friend.userId}</span>
            </div>
          )}
        </div>
      </div>
    </section >
  )
}

export default FriendRecipe