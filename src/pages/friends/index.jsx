import React, { useEffect, useState } from 'react'
import { Avatar } from 'flowbite-react';
import SearchingIcon from '../../assets/SearchingIcon';
import XCircleIcon from '../../assets/XCircleIcon';
import PlusFriendIcon from '../../assets/PlusFriendIcon';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import Toast from '../../components/Toast';
import useOuterClick from '../../hooks/useOuterClick';
import AddingFriendButton from '../../components/AddingFriendButton';
import { useNavigate } from 'react-router-dom';

const FriendRecipe = () => {
  const privateAxios = usePrivateAxios()
  const navigate = useNavigate()
  const [friendList, setFriendList] = useState([])
  const [keyword, setKeyword] = useState('')
  const [friendId, setFriendId] = useState('')
  const [searchResult, setSearchResult] = useState('')
  const [showingToast, setShowingToast] = useState({
    unfriend: false,
    addFriend: false
  })
  const [newFriendProfile, setNewFriendProfile] = useState()
  useEffect(() => {
    privateAxios.get('/api/v1/user/friends').then(response => setFriendList(response.data))
  }, []);
  const searchByKeyword = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      setSearchResult(keyword)
    }
  }
  const { ref, open, setOpen } = useOuterClick()
  const findFriendById = async (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      if (!friendId) setNewFriendProfile(undefined)
      privateAxios.get(`/api/v1/global/user/profile/${friendId}`).then(response => {
        setNewFriendProfile(response.data)
      })
        .catch(error => {
          if (error.response.status == '404') setNewFriendProfile(null)
        })
        .finally(() => { setFriendId(''); setOpen(true) })
    }
  }

  const unfriend = (friend_id) => {
    setFriendList(prevList => prevList.filter(friend => friend.userId != friend_id))
    privateAxios.delete(`/api/v1/user/remove-friend/${friend_id}`).then(response => console.log(response)).catch(error => console.log(error))
      .finally(() => {
        setShowingToast(prevToast => { return { ...prevToast, unfriend: true } })
      })
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
        <div className=''>
          <div className='flex justify-between py-2'>
            <div className='text-3xl font-semibold text-gray-500'>{!friendList.length ? "You have no friends." : ""}</div>
            <div className='flex justify-between items-center space-y-2'>
              <h1 className='font-semibold text-3xl text-green-accent'>Add new friend:</h1>
              <div className='flex items-center gap-2'>
                <div className='flex items-center w-48 border-2 border-green-accent rounded-xl relative bottom-1 left-4 px-2 mr-4 cursor-pointer'>
                  <label htmlFor='addFriend'>
                    <PlusFriendIcon style='w-8 h-8 text-green-accent' />
                  </label>
                  <input
                    className='bg-transparent focus:outline-none rounded-full w-full text-lg px-4 py-2 text-black'
                    placeholder='User ID' id='addFriend' autoComplete='off'
                    value={friendId} onChange={(e) => setFriendId(e.target.value.match(/^\d+$/) ? e.target.value : '')} onKeyDown={findFriendById} />
                </div>
              </div>
            </div>
          </div>
          {newFriendProfile === null && <div className='text-end px-4 font-semibold text-lg text-gray-500'>User not found</div>}
        </div>
        <div className='grid grid-cols-4 gap-4'>
          {friendList?.map(friend =>
            <div className='flex border-2 border-gray-300 hover:border-green-accent rounded p-4 gap-8 items-center cursor-pointer hover:bg-gray-100 relative'>
              <Avatar img={friend.profileImage} size='lg' rounded bordered />
              <div className='flex flex-col gap-2 over'>
                <h1 className='text-2xl font-bold w-52 truncate'>{friend.fullName}</h1>
                <div className='flex gap-2'>
                  <button className='button-contained-square py-1 w-auto text-base'
                    onClick={() => navigate(`/user/${friend.userId}`)}>
                    View profile
                  </button>
                  <button className='button-outlined-square py-1 w-auto text-base color-secondary'
                    onClick={() => window.confirm() && unfriend(friend.userId)}>Unfriend</button>
                </div>
              </div>
              <span className='absolute text-gray-500 font-semibold text-sm top-1 right-2'>ID: {friend.userId}</span>
            </div>
          )}
        </div>
      </div>
      {open && newFriendProfile &&
        <div className='fixed p-8 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] max-w-xl w-full z-30 border-2 border-gray-300 rounded bg-gray-50 flex flex-col space-y-4 overflow-auto transition ease-in-out'>
          <div className='flex justify-end gap-4'>
            <button className='button-contained-square py-0.5 w-32' onClick={() => navigate(`/user/${newFriendProfile.userId}`)}>View profile</button>
            <button className='button-outlined-square w-10 py-0 color-secondary opacity-50 hover:opacity-100'
              onClick={(e) => { e.stopPropagation(); setOpen(false); setFriendId(''); setNewFriendProfile() }}>X
            </button>
          </div>
          <div className='flex flex-col items-start space-y-4'>
            <Avatar img={newFriendProfile.profileImage} size='xl' stacked />
            <h1 className='text-2xl font-bold'>{newFriendProfile.fullName}</h1>
          </div>
          <div className='flex gap-8'>
            <div className='text-gray-500 flex flex-col space-y-4'>
              <span>User ID</span>
              <span>Email</span>
              <span className='text-gray-500'>Date of birth</span>
              <span className='text-gray-500'>Gender</span>
            </div>
            <div className='flex flex-col space-y-4'>
              <span>{newFriendProfile.userId}</span>
              <span>{newFriendProfile.email}</span>
              <span>{new Date(newFriendProfile.birthday).toLocaleDateString()}</span>
              <span>{newFriendProfile.gender}</span>
            </div>
          </div>
          <AddingFriendButton
            friendId={newFriendProfile.userId}
            onSuccess={() => {
              setShowingToast(prevState => { return { ...prevState, addFriend: true } });
              setNewFriendProfile()
            }} />
        </div>}
      {showingToast.unfriend && <Toast message='Unfriend successfully' />}
      {showingToast.addFriend && <Toast message='Send friend request successfully' />}
    </section >
  )
}

export default FriendRecipe