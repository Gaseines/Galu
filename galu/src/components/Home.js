
import styles from './Home.module.css'
import Enunciado from './subComponents/Enunciado'
import FotoHome from './subComponents/FotoHome'

function Home() {
    return(
        <div className={styles.home}>
            <Enunciado />
            <FotoHome />
        </div>
    )
}

export default Home