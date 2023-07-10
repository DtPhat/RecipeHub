import { Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import PlusFriendIcon from '../assets/PlusFriendIcon'
import useAuth from '../hooks/useAuth'
import usePrivateAxios from '../hooks/usePrivateAxios'

const AddingFriendButton = ({ friendId, onSuccess }) => {
  const myId = useAuth().auth.user.userId
  if (friendId == myId) return

  const privateAxios = usePrivateAxios()
  const [pendingRequest, setPendingRequest] = useState(null)
  const [loading, setLoading] = useState({
    sentRequests: true,
    receivedRequests: true,
    friends: true,
  })

  console.log(pendingRequest);
  useEffect(() => {
    privateAxios.get(`/api/v1/user/friend/requests`)
      .then(response => {
        if (response.data.filter(request => request.receiver.userId === myId && request.sender.userId == friendId).length > 0) {
          setPendingRequest('received')
        }
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(prevState => { return { ...prevState, receivedRequests: false } }))

    privateAxios.get(`/api/v1/user/friend/sended-requests`)
      .then(response => {
        if (response.data.filter(request => request.receiver.userId == friendId && request.sender.userId === myId).length > 0) {
          setPendingRequest('sent')
        }
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(prevState => { return { ...prevState, sentRequests: false } }))

    privateAxios.get(`/api/v1/user/friends`)
      .then(response => {
        if (response.data.filter(friend => friend.userId == friendId).length > 0) {
          setPendingRequest('already friend')
        }
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(prevState => { return { ...prevState, friends: false } }))
  }, []);

  const addFriend = () => {
    privateAxios.post(`/api/v1/user/request-friend/${friendId}`).then(response => console.log(response))
      .catch(error => console.log(error))
      .finally(() => { setPendingRequest('sent'); onSuccess() })

  }
  console.log(pendingRequest);
  const isLoading = loading.sentRequests || loading.receivedRequests || loading.friends
  return (
    <div>
      <button className={`${pendingRequest ? 'button-outlined-square color-secondary bg-gray-200' : 'button-contained-square '} w-full`}
        onClick={addFriend} disabled={isLoading || pendingRequest}>
        {
          isLoading ?
            <Spinner color='success' />
            : !pendingRequest ?
              <>
                <PlusFriendIcon style='w-7 h-7' />
                <span>Add friend</span>
              </>
              : pendingRequest === 'received' ?
                <span>Waiting your response</span>
                : pendingRequest === 'sent' ?
                  <span>Friend request sent</span> :
                  <span>Already friend</span>
        }
      </button>
    </div>
  )
}

export default AddingFriendButton