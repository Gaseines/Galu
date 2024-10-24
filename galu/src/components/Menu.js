import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../db';

import styles from './Menu.module.css';
import AddButton from './layouts/AddButton';
import AddModel from './layouts/AddModel';
import DeleteModel from './layouts/DeleteModel';
import Pastas from './Pastas';

function Menu() {
    // Categorias
    const [mainMenu, setMainMenu] = useState([]);
    const [isModelAddOpen, setModelAddOpen] = useState(false);
    const [newOptionMain, setOptionMain] = useState('');
    const [isModelDeleteOpen, setModelDeleteOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    // Pastas
    const [selectCategoria, setSelectCategoria] = useState(null);
    const [folders, setFolders] = useState([]);
    const [isModelAddFolder, setModelAddFolder] = useState(false);
    const [newFolder, setNewFolder] = useState('');
    const [newFolderType, setNewFolderType] = useState('');
    const [selectFolder, setSelectFolder] = useState(false);
    const [contentFolder, setContentFolder] = useState('');

    // Busca os itens do menu
    const buscarMenu = async () => {
        const queryMenu = await getDocs(collection(db, 'mainMenu'));
        setMainMenu(queryMenu.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        buscarMenu();
    }, []);

    // Adiciona uma nova opção
    const addMainOption = async () => {
        if (newOptionMain) {
            const docRef = await addDoc(collection(db, 'mainMenu'), { name: newOptionMain });
            setMainMenu([...mainMenu, { name: newOptionMain, id: docRef.id }]);
            setOptionMain('');
            setModelAddOpen(false); // Fecha o modal após adicionar
        }
    };

    // Deleta Categorias
    const openDeleteOption = (item) => {
        setModelDeleteOpen(true);
        setItemToDelete(item);
    };

    const deleteOption = async () => {
        if (itemToDelete) {
            await deleteDoc(doc(db, 'mainMenu', itemToDelete.id));
            setMainMenu(mainMenu.filter(option => option.id !== itemToDelete.id));
            setModelDeleteOpen(false);
            buscarMenu();
        }
    };

    // Busca Pastas de cada Categoria
    const buscarFolders = async (categoryId) => {
        const folderCollection = collection(db, 'mainMenu', categoryId, 'pastas');
        const queryFolder = await getDocs(folderCollection);
        setFolders(queryFolder.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    return (
        <>
            <nav className={styles.navegacao}>
                <ul>
                    {mainMenu.map((category) => (
                        <li key={category.id} onClick={() => { setSelectCategoria(category); buscarFolders(category.id); }}>
                            {category.name}
                            <span onClick={(e) => { e.stopPropagation(); openDeleteOption(category); }}>-</span>
                        </li>
                    ))}
                </ul>
                <AddButton onClick={() => setModelAddOpen(true)} />
            </nav>

            {/* Janela para Adicionar Categorias */}
            {isModelAddOpen && (
                <AddModel
                    titulo={"Adicione uma nova categoria"}
                    placeholder={"Digite o nome da categoria"}
                    onChange={(e) => setOptionMain(e.target.value)}
                    nameAddButton={"Adicionar"}
                    onClickAdd={addMainOption}
                    nameCancelButton={"Cancelar"}
                    onClickCancel={() => setModelAddOpen(false)}
                />
            )}

            {/* Janela para remover categorias */}
            {isModelDeleteOpen && (
                <DeleteModel
                    titulo={"Deseja deletar esta categoria?"}
                    onClickDelete={deleteOption}
                    onClickVoltar={() => setModelDeleteOpen(false)}
                />
            )}

            {/* Pastas */}
            {selectCategoria && (
                <div>
                    <h3>Pastas em {selectCategoria.name}</h3>
                    {folders.length === 0 ? (
                        <div>
                            <p>Ainda não tem nada por aqui</p>
                            <button onClick={() => setModelAddFolder(true)}>Adicionar Pasta</button>
                        </div>
                    ) : (
                        <Pastas folders={folders} />
                    )}
                    
                </div>
            )}
        </>
    );
}

export default Menu;
