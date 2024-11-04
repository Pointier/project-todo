import styles from './App.module.css'
import Header from './Header'
import Footer from './Footer'
import Main from './MainBody'
import Calendar from './Calendar'


function App() {

  return (
    <div className={styles.app}>
      <Header />
      <Main />
      <Calendar />
      <Footer />

    </div >
  )
}

export default App
