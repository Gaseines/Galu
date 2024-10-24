
import styles from './Menu.module.css' 

function Menu() {
    return(
        <nav className={styles.navegacao}>
            <ul>
                <li>Viagens</li>
                <li>Casa</li>
                <li>Anotações</li>
            </ul>
            <button>+</button>
        </nav>
    )
}

export default Menu