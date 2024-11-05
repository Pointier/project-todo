import styles from './App.module.css'
import Header from './Header'
import Footer from './Footer'
import Main from './MainBody'
import Calendar from './Calendar'
import { useState } from 'react'


function App() {
  const today = new Date()
  const [day, setDay] = useState<Date>(today)
  return (
    <div className={styles.app}>
      <Header />
      <Main day={day} />
      <Calendar day={day} setDay={setDay} />
      <Footer />

    </div >
  )
}

export default App
