import React, { useEffect, useState } from 'react'
import { Avatar, Modal } from 'flowbite-react';
import SearchingIcon from '../../assets/SearchingIcon';
import XCircleIcon from '../../assets/XCircleIcon';
import PlusFriendIcon from '../../assets/PlusFriendIcon';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import Toast from '../../components/Toast';
import useOuterClick from '../../hooks/useOuterClick';
import AddingFriendButton from '../../components/AddingFriendButton';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
import NoFriends from './NoFriends';
import Skeleton from '../../components/Skeleton';
import ConfirmBox from '../../components/ConfirmBox';
import useTheme from '../../hooks/useTheme';

const FriendRecipe = () => {
  const privateAxios = usePrivateAxios()
  const navigate = useNavigate()
  const {isDarkMode} = useTheme()
  const [friendList, setFriendList] = useState([])
  const [keyword, setKeyword] = useState('')
  const [friendId, setFriendId] = useState('')
  const [searchedFriendList, setSearchedFriendList] = useState()
  const [loading, setLoading] = useState(true)
  const [confirmUnfriend, setConfirmUnfriend] = useState(false)
  const [showingToast, setShowingToast] = useState({
    unfriend: false,
    addFriend: false
  })
  const [newFriendProfile, setNewFriendProfile] = useState()
  useEffect(() => {
    privateAxios.get('/api/v1/user/friends').then(response => setFriendList(response.data)).catch(error => console.log(error)).finally(() => setLoading(false))
  }, []);
  const searchByKeyword = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      setSearchedFriendList(friendList.filter(friend => friend.fullName.toUpperCase().includes(keyword.toUpperCase())))
    }
  }
  const [open, setOpen] = useState()
  const findFrienddOnEnter = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      findFriendById()
    }
  }

  const findFriendById = () => {
    if (!friendId) setNewFriendProfile(undefined)
    privateAxios.get(`/api/v1/global/user/profile/${friendId}`).then(response => {
      setNewFriendProfile(response.data)
    })
      .catch(error => {
        if (error.response.status == '404') setNewFriendProfile(null)
      })
      .finally(() => { setFriendId(''); setOpen(true) })
  }
  const unfriend = (friend_id) => {
    setFriendList(prevList => prevList.filter(friend => friend.userId != friend_id))
    privateAxios.delete(`/api/v1/user/remove-friend/${friend_id}`).then(response => console.log(response)).catch(error => console.log(error))
      .finally(() => {
        setShowingToast(prevToast => { return { ...prevToast, unfriend: true } })
      })
  }

  return (
    <section className='flex justify-center py-4 lg:mx-8 min-h-[100vh]'>
      <div className='max-w-8xl w-full flex flex-col rounded space-y-4 bg-container px-8 py-4'>
        <div className='select-none flex flex-col lg:flex-row gap-4 justify-between pb-2 border-b-2 border-accent text-accent'>
          <h1 className='text-4xl font-semibold text-gray-600'>View friend's recipes</h1>
          <div className='lg:max-w-[33rem] w-full'>
            <SearchBar keyword={keyword} setKeyword={setKeyword} handleEnter={searchByKeyword} placeholder='Search friends' />
          </div>
        </div>
        <div className=''>
          <div className='flex py-2'>
            <div className='flex justify-between items-center space-y-2'>
              <h1 className='font-semibold text-2xl sm:text-3xl text-accent'>Add new friend:</h1>
              <div className='flex items-center gap-2'>
                <div className='flex items-center w-48 border-2 border-accent rounded-xl relative bottom-1 left-4 px-2 mr-4 cursor-pointer'>
                  <button onClick={() => findFriendById()} className=''>
                    <PlusFriendIcon style='w-8 h-8 text-accent' />
                  </button>
                  <input
                    className='bg-transparent focus:outline-none rounded-full w-full text-lg px-4 py-2'
                    placeholder='User ID' id='addFriend' autoComplete='off'
                    value={friendId} onChange={(e) => setFriendId(e.target.value.match(/^\d+$/) ? e.target.value : '')} onKeyDown={findFrienddOnEnter} />
                </div>
              </div>
            </div>
          </div>
          {newFriendProfile === null && <div className='px-4 font-semibold text-lg text-gray-500'>User not found</div>}
        </div>
        {/* <div className='text-3xl font-semibold text-gray-500'>{!friendList.length ? "You have no friends." : ""}</div> */}
        {loading ? <Skeleton /> :
          (!friendList.length || searchedFriendList?.length) ?
            <NoFriends />
            : <div className='grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
              {(searchedFriendList || friendList)?.map(friend =>
                <div className='flex border border-gray-300 hover:border-accent rounded p-4 gap-4 items-center cursor-pointer hover:bg-gray-100 relative shadow'>
                  <Avatar img={friend.profileImage} size='lg' rounded bordered />
                  <div className='flex flex-col gap-2 over'>
                    <h1 className='text-2xl font-bold w-52 truncate'>{friend.fullName}</h1>
                    <div className='flex gap-2'>
                      <button className='button-contained-square py-1 w-auto text-base'
                        onClick={() => navigate(`/user/${friend.userId}`)}>
                        View details
                      </button>
                      <button className='button-outlined-square py-1 w-auto text-base color-secondary'
                        // onClick={() => window.confirm('Are you sure to unfriend this user?') && unfriend(friend.userId)}
                        onClick={() => setConfirmUnfriend(true)}
                      >
                        Unfriend
                      </button>
                      <ConfirmBox open={confirmUnfriend} setOpen={setConfirmUnfriend} callback={() => unfriend(friend.userId)} message={`Are you sure you want to unfriend ${friend.fullName}`} />
                    </div>
                  </div>
                  <span className='absolute text-gray-500 font-semibold text-sm top-1 right-2'>ID: {friend.userId}</span>
                </div>
              )}
            </div>
        }
      </div>
      {newFriendProfile &&
        <Modal show={open} size="xl" onClose={() => { setOpen(false); setFriendId(''); setNewFriendProfile() }} className={isDarkMode ? 'dark' : ''}>
          <Modal.Body className='app'>
            <div className='rounded flex flex-col space-y-4 '>
              <div className='flex justify-end gap-4'>
                <button className='button-contained-square py-0.5 w-32' onClick={() => navigate(`/user/${newFriendProfile.userId}`)}>View profile</button>
                <button className='button-outlined-square w-10 py-0 color-secondary opacity-50 hover:opacity-100'
                  onClick={(e) => { setOpen(false); setFriendId(''); setNewFriendProfile() }}>
                  X
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
                  setShowingToast(prevState => ({ ...prevState, addFriend: true }));
                  setNewFriendProfile()
                }} />
            </div>
          </Modal.Body>
        </Modal>}
       
      {showingToast.unfriend && <Toast message='Unfriend successfully' />}
      {showingToast.addFriend && <Toast message='Send friend request successfully' />}
    </section >
  )
}

export default FriendRecipe