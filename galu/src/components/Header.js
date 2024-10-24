
import styles from './Header.module.css'

import monograma from '../images/MONOGRAMA.png'

function Header(){
    return(
        <header>
            <img src={monograma} alt="GL" />
        </header>
    )
}

export default Header