
import styles from './Enunciado.module.css'

function Enunciado() {
    return(
        <div className={styles.container_enunciado}>
            <h1>Gabriel e <span>Luiza</span></h1>
            <p>A vida pode estar um <span className={styles.marcado_amarelo}>caos</span></p>
            <p>mas a <span className={styles.marcado_amarelo}>organização</span> está aqui</p>
        </div>
    )
}

export default Enunciado