import { Button, Modal } from 'flowbite-react';
import useTheme from '../hooks/useTheme';
export default function ConfirmBox({ open, setOpen, callback, message }) {
  const {isDarkMode} = useTheme()
  return (
    <Modal show={open} size="md" popup onClose={() => setOpen(false)} className={isDarkMode ? 'dark' : ''}>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {message}
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={() => { callback(); setOpen(false) }}>
              Yes, I'm sure
            </Button>
            <Button color="gray" className='text-gray' onClick={() => setOpen(false)}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
