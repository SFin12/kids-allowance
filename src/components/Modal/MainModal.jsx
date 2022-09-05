import React from 'react'
import { Modal } from 'react-bootstrap'
import './MainModal.css'

export default function MainModal({title, show, onHide, children}) {
  return (
    <>
      <Modal show={show} onHide={onHide} backdrop="static" centered>
        <Modal.Title className='text-center'>{title}</Modal.Title>
        <Modal.Body className='text-center'>
          {children}
        </Modal.Body>
      </Modal>
    </>
  )
}
