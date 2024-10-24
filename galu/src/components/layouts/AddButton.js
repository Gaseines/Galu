
import styles from './AddButton.module.css'

function AddButton({ onclick }) {
    return <button className={styles.button} onClick={onclick}>+</button>
}

export default AddButton