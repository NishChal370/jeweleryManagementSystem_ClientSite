import React from 'react'
import { Modal, Spinner } from 'react-bootstrap'

function LoadingModal({message}) {
      return (
            <Modal
            show={true}
            backdrop="static"
            keyboard={false}
            centered
            fullscreen={'lg-down'}
            size='xxl'
            >
                  <Modal.Body >
                        <h1 style={{color: '#012970', fontFamily:"Poppins", textAlign:'center', fontSize:'1.6rem', marginBottom:'1rem'}}>{message}</h1>
                        <span style={{display:'flex', justifyContent: 'center'}}>
                              <Spinner animation="grow" variant="danger" />
                              <Spinner animation="grow" variant="warning" />
                              <Spinner animation="grow" variant="info" />
                        </span>
                        
                  </Modal.Body>
            </Modal>
      )
}

export default LoadingModal