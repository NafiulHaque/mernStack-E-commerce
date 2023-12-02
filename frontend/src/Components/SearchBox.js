import {React,useState} from 'react'
import { Form, Button, Col,Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {

    const [keyword, setKeyword] = useState('')

    const navigate= useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            navigate(`/search/${keyword}`)
        }else{
           navigate('/')
        }}
  return (
    <div>
        <Form onSubmit={submitHandler} inline>
          <Row>
            <Col>
             <Form.Control

                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search Products...'
                className='mr-sm-2 ml-sm-5 rounded-md'
            ></Form.Control>
            </Col>
            <Col>
            <Button type='submit' variant='outline-success' className='p-2 rounded-md'>
                Search
            </Button>
            </Col>
            </Row>
        </Form>


    </div>
  )
  }


export default SearchBox