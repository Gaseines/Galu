
import styles from './FotoHome.module.css'

import foto from '../../images/image_inicio.png'

function FotoHome() {
    return(
        <div className={styles.container_foto}>
            <img src={foto} alt="Gabriel e Luiza" />
        </div>
    )
}

export default FotoHome