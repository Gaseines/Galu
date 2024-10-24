import styles from './ContainerModel.module.css'

function ContainerModel(props) {
    return (
            <div className={styles.container_model}>
                <div className={styles.model}>
                    {props.children}
                </div>
            </div>
        
    )
}

export default ContainerModel