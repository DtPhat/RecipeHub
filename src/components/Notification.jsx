import { Avatar, Dropdown, Toast } from 'flowbite-react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BellIcon from '../assets/BellIcon'
import usePrivateAxios from '../hooks/usePrivateAxios'
import { getDayMonthYear, getStartOfDate } from '../utils/DateUtils'

const Notification = () => {
  const [loading, setLoading] = useState(true)
  const [friendshipRequests, setFriendshipRequests] = useState([])
  const [todayPlannedMeals, setTodayPlannedMeals] = useState(0)
  const privateAxios = usePrivateAxios()
  useEffect(() => {
    privateAxios.get('/api/v1/user/friend/requests')
      .then(response => setFriendshipRequests(response.data))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))

    const today = new Date((new Date).getFullYear(), (new Date).getMonth(), (new Date).getDate())
    privateAxios.get(`/api/v1/user/meal-planers/${today.getTime()}`)
      .then(response => setTodayPlannedMeals(response.data.length))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, []);

  const navigate = useNavigate()
  const today = new Date()
  const numberOfNotifications = (friendshipRequests?.length || 0) + (todayPlannedMeals > 0 ? 1 : 0)
  const acceptRequest = (accepting, request_id) => {
    setLoading(true)
    privateAxios.post(`/api/v1/user/${accepting ? 'accept-friend' : 'reject-friend'}/${request_id}`).then(response => console.log(response)).catch(error => { console.log })
      .finally(() => { setFriendshipRequests(prevRequests => prevRequests.filter(request => request.friendshipRequestId != request_id)); setLoading(false) })
  }
  return (
    <div className='relative'>
      <Dropdown
        arrowIcon={false}
        inline
        dismissOnClick
        label={
          <div className='hover:bg-gray p-1 rounded'>
            <BellIcon style='w-8 h-8' />
          </div>
        } >
        <Dropdown.Header>
          <div className='font-bold w-96 text-xl'>
            <span>Notifications</span>
          </div>
        </Dropdown.Header>
        {loading ?
          <div role="status" className="max-w-md p-4 space-y-4 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
            <div className="flex items-center justify-between py-4">
              <div className='w-full'>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 max-w-7xl w-full mb-2.5"></div>
                <div className="max-w-6xl w-full h-2 bg-gray rounded-full dark:bg-gray-700"></div>
              </div>
            </div>
          </div>
          : <>
            {friendshipRequests.map((request, i) =>
              <Dropdown.Item key={request.friendshipRequestId}>
                <div>
                  <div className='w-96 break-words text-lg flex items-center gap-2'>
                    <Avatar img={request.sender.profileImage} rounded size='sm' />
                    <p><span className='font-semibold'>{request.sender.fullName}</span> want to be your friend</p>
                  </div>
                  <div className='flex justify-center gap-2 p-2'>
                    <button className='button-outlined color-secondary p-0 w-24' onClick={() => acceptRequest(false, request.friendshipRequestId)}>Reject</button>
                    <button className='button-contained p-0 w-24' onClick={() => acceptRequest(true, request.friendshipRequestId)}>Accept</button>
                  </div>
                </div>
              </Dropdown.Item>)
            }
            {todayPlannedMeals > 0 && <Dropdown.Item>
              <div>
                <div className='w-96 break-words text-lg flex items-center gap-2'>
                  <p>You planned <span className='font-semibold'>{todayPlannedMeals}</span> meals for today, <span className='font-semibold'>{getDayMonthYear(today)}</span></p>
                </div>
                <div className='flex justify-center gap-2 p-2'>
                  <button className='button-outlined-square p-0'
                    onClick={() => navigate('/mealplanner')}>
                    Move to meal planner <span className='px-2'>⮕</span></button>
                </div>
              </div>
            </Dropdown.Item>
            }
          </>}
      </Dropdown>
      {numberOfNotifications > 0 &&
        <div className='rounded-full w-5 h-4 bg-red-500 absolute text-center text-xs text-white font-bold bottom-1 right-[-2px] outline outline-red-200 cursor-pointer pointer-events-none'>
          {numberOfNotifications}
        </div>}
    </div>
  )
}

export default Notification