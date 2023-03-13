import React from 'react'
import { Modal } from 'react-bootstrap'
import './MainModal.css'

export default function MainModal({title, show, onHide, children}) {
  return (
    <>
      <Modal show={show} onHide={onHide} backdrop={true} centered>
        <Modal.Title className="text-center pt-3">{title}</Modal.Title>
        <Modal.Body className="text-center">{children}</Modal.Body>
      </Modal>
    </>
  )
}
