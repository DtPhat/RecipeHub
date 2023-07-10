import { Button, Modal } from 'flowbite-react';

export default function ConfirmBox(confirm, setConfirm) {
  if (!confirm.show) {return}
  return (
    <Modal show={confirm.show} size="md" popup onClose={() => setConfirm({ show: false, accept: false })}>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center ">
          {/* <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this product?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={() => setConfirm({ show: true, accept: true })}>
              Yes, I'm sure
            </Button>
            <Button color="gray" onClick={() => setConfirm({ show: true, accept: false })}>
              No, cancel
            </Button>
          </div> */}
          <div>
            Hello
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
