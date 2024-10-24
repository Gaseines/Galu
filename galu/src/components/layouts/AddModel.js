import { BrowserRouter, Router } from "react-router-dom"

import styles from './AddModel.module.css'

import ContainerModel from './ContainerModel'

function AddModel({titulo, placeholder, value, onChange, nameAddButton, onClickAdd, nameCancelButton, onClickCancel}) {
    return (
        <ContainerModel>
            <h1 className={styles.titulo}>{titulo}</h1>
            <input
                className={styles.input}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <button className={`${styles.button} ${styles.button_add}`} onClick={onClickAdd}>{nameAddButton}</button>
            <button className={`${styles.button} ${styles.button_cancel}`} onClick={onClickCancel}>{nameCancelButton}</button>
        </ContainerModel>
    )
}

export default AddModel
