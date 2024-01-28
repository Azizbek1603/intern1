import React from 'react'
import Header from '../header/Header'
import "./home.scss"
import Table from '../../layout/table/Table'
const Home = () => {
  return (
    <div className='home'>
      <div className="flex">
        <Header/>
        <Table/>
      </div>
    </div>
  )
}

export default Home