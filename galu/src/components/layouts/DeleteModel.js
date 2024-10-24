
import styles from './DeleteModel.module.css'

import ContainerModel from "./ContainerModel"

function DeleteModel({titulo, onClickDelete, onClickVoltar}){
    return(
        <ContainerModel>
            <h1 className={styles.titulo}>{titulo}</h1>
            <button className={`${styles.button} ${styles.button_delete}`} onClick={onClickDelete}>Deletar</button>
            <button className={`${styles.button} ${styles.button_voltar}`} onClick={onClickVoltar}>Voltar</button>
        </ContainerModel>
    )
}

export default DeleteModel