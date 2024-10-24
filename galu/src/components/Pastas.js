
import styles from './Pastas.module.css'

function Pastas({titulo, anotName}){
    return(
        <div className={styles.container_pastas}>
            <h2 className={styles.titulo}>Pastas da categoria {titulo}</h2>
            <ul className={styles.lista_pastas}>
                <li className={styles.pasta}>{anotName}Anotações sobre conisas e talz</li>
            </ul>
        </div>
    )
}

export default Pastas