import React, { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../db'


import styles from './Menu.module.css'
import AddButton from './layouts/AddButton'
import AddModel from './layouts/AddModel'
import DeleteModel from './layouts/DeleteModel'

function Menu() {

    const [mainMenu, setMainMenu] = useState([])
    const [isModelAddOpen, setModelAddOpen] = useState(false)
    const [newOptionMain, setOptionMain] = useState('')
    const [isModelDeleteOpen, setModelDeleteOpen] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)


    const buscarMenu = async () => {
        const queryMenu = await getDocs(collection(db, 'mainMenu'))

        setMainMenu(queryMenu.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    }

    const addMainOption = async () => {
        if (newOptionMain) {
            const docRef = await addDoc(collection(db, 'mainMenu'), { name: newOptionMain });
            setMainMenu([...mainMenu, { name: newOptionMain, id: docRef.id }]);
            setOptionMain('');
            setModelAddOpen(false); // Fecha o modal após adicionar
        }
    }

    const openDeleteOption = (item) => {
        setModelDeleteOpen(true)
        setItemToDelete(item)
    }

    const deleteOption = async() =>{
        if(itemToDelete){
            await deleteDoc(doc(db, 'mainMenu', itemToDelete.id))
        setMainMenu(mainMenu.filter(itemToDelete => itemToDelete.id !== itemToDelete.id))

        setModelDeleteOpen(false)
        buscarMenu()
        }
    }


    useEffect(() => {
        buscarMenu()
    }, [])



    return (
        <>
            <nav className={styles.navegacao}>
                <ul>
                    {mainMenu.map((option) => (
                        <li key={option.id}>{option.name}<span onClick={() => openDeleteOption(option)}>-</span></li>
                    ))}
                </ul>
                <AddButton onclick={() => setModelAddOpen(true)} />


            </nav>
            {/* Janela para Adcionar Categorias */}
            {
                isModelAddOpen && (
                    <AddModel
                        titulo={"Adicione uma nova categoria"} placeholder={"Digite o nome da categoria"}

                        onChange={(e) => setOptionMain(e.target.value)}
                        nameAddButton={"Adicionar"}
                        onClickAdd={addMainOption}
                        nameCancelButton={"Cancelar"}
                        onClickCancel={() => setModelAddOpen(false)}
                    />
                )
            }
            {/* Janela para remover categorias */}
            {
                isModelDeleteOpen && (
                    <DeleteModel
                        titulo={"Deseja deletar esta categoria?"}
                        onClickDelete={deleteOption}
                        onClickVoltar={() => setModelDeleteOpen(false)}
                    />
                )
            }

        </>
    )
}

export default Menu