import { Avatar, Spinner, Tooltip } from 'flowbite-react';
import React, { useRef, useState } from 'react';
import EditingIcon from '../../assets/EditingIcon';
import useAuth from '../../hooks/useAuth';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import { defaultTagList } from '../recipe';
const EditProfile = ({ setEditing }) => {
  const { setAuth, auth: { user: { userId, email, fullName, gender, birthday, profileImage } } } = useAuth()
  const privateAxios = usePrivateAxios()
  const avatarInput = useRef()
  const [newAvatar, setNewAvatar] = useState('')
  const [profileData, setProfileData] = useState({
    fullName: fullName,
    birthday: (new Date(birthday)).toLocaleDateString('en-CA'),
    gender: gender,
  })


  const [submitting, setSubmitting] = useState({
    information: null,
    avatar: null,
  })

  const editing = submitting.avatar || submitting.information
  const handleProfileDataChange = (e) => {
    let { name, value, type } = e.target
    setProfileData(prevData => {
      return { ...prevData, [name]: value }
    })
  }

  const editAvatar = () => {
    setSubmitting(prevState => { return { ...prevState, avatar: true } })
    const formData = new FormData()
    const blobImage = new Blob([newAvatar], { type: "image/jpeg" })
    formData.append('file', blobImage, '.jpg');
    privateAxios.put('/api/v1/user/image/avatar', formData)
      .then(response => {
        response.status === 200 && setAuth(prevAuth => {
          const { fullName, birthday, gender } = profileData
          return {
            ...prevAuth, user: {
              ...prevAuth.user,
              profileImage: response.data
            }
          }
        })
      })
      .catch(error => console.log(error))
      .finally(() => {
        setSubmitting(prevState => { return { ...prevState, avatar: false } })
        setEditing(false)
      })
  }

  const editInformation = () => {
    setSubmitting(prevState => { return { ...prevState, information: true } })
    privateAxios
      .put('/api/v1/user/edit-profile', {
        fullname: profileData.fullName,
        birthday: (new Date(profileData.birthday)).getTime(),
        gender: profileData.gender
      })
      .then(response => console.log(response))
      .catch(error => console.log(error))
      .finally(() => {
        setSubmitting(prevState => { return { ...prevState, information: false } })
        setAuth(prevAuth => {
          const { fullName, birthday, gender } = profileData
          return {
            ...prevAuth, user: {
              ...prevAuth.user,
              fullName: fullName,
              birthday: (new Date(birthday)).getTime(),
              gender: gender
            }
          }
        })
        setEditing(false)
      })
  }

  const editProfile = () => {
    const editedInformation = fullName != profileData.fullName || (new Date(birthday)).toLocaleDateString('en-CA') != profileData.birthday || gender != profileData.gender
    editedInformation && editInformation()
    newAvatar && editAvatar()
  }
  // const completeEditing = (submitting.information !== null) && (newAvatar ? submitting.avatar !== null : true) && !editing
  console.log(profileData);
  const style = {
    input: 'py-2 text-lg px-2 bg-container border-b-2 focus:outline-gray-200 w-full',
    radio: 'space-x-2 border border-gray-400 cursor-pointer flex justify-center w-24 rounded accent-green-600 hover:border-green-600',
  }

  return (
    <section>
      <div className='space-y-4 font-semibold w-full px-4 '>
        <div className='flex flex-col items-start'>
          <h1 className='text-2xl font-bold pb-2'>Avatar</h1>
          <Tooltip content='Upload new avatar'>
            <button className='relative group flex hover:opacity-90' onClick={() => avatarInput.current.click()}>
              <Avatar img={newAvatar ? `${URL.createObjectURL(newAvatar)}` : profileImage} size='xl' stacked />
              <div className='absolute top-1 right-1 bg-container0 opacity-50 group-hover:opacity-100 text-white rounded'>
                <EditingIcon style='w-8 h-8' />
              </div>
              <input type='file' className='hidden' accept="image/*" ref={avatarInput} onChange={(e) => {
                const image = e.target.files[0]
                image && setNewAvatar(image)
              }} />
            </button>
          </Tooltip>
          {newAvatar && <button className='border color-secondary rounded ml-1 mt-2 px-2' onClick={() => setNewAvatar('')}>Clear new avatar</button>}
        </div>
        <div className='flex flex-col '>
          <h1 className='text-2xl font-bold pb-2'>Information</h1>
          <div>
            <span className='pl-2 text-gray-500'>Full name</span>
            <input value={profileData.fullName} type="text" className={style.input} name='fullName' id='fullname' placeholder='Full name' onChange={handleProfileDataChange} />
            <span className='invisible text-sm'>Warning here</span>
          </div>
          <div>
            <span className='pl-2 text-gray-500'>Date of birth</span>
            <input value={profileData.birthday} type="date" className={style.input} name='birthday' id='birthdate' onChange={handleProfileDataChange} />
          </div>
          <div className='py-2'>
            <span className='pl-2 text-gray-500'>Gender</span>
            <div className='flex justify-between px-2 pt-2'>
              <label htmlFor="male" className={style.radio}>
                <span>Male</span>
                <input type='radio' value='MALE' name='gender' id='male' onChange={handleProfileDataChange} checked={profileData.gender == 'MALE'} />
              </label>
              <label htmlFor="female" className={style.radio}>
                <span>Female</span>
                <input type='radio' value='FEMALE' name='gender' id='female' onChange={handleProfileDataChange} checked={profileData.gender == 'FEMALE'} />
              </label>
              <label htmlFor="other" className={style.radio}>
                <span>Other</span>
                <input type='radio' value='OTHER' name='gender' id='other' onChange={handleProfileDataChange} checked={profileData.gender != 'MALE' && profileData.gender != 'FEMALE'} />
              </label>
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <button className='button-contained-square'
            onClick={() => editProfile()} disabled={editing}>
            {
              editing ?
                <Spinner />
                : <span>Save change</span>
            }
          </button>
        </div>
      </div>
    </section>
  )
}

export default EditProfile