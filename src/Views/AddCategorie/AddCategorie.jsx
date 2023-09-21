import React, { useState, useEffect } from 'react';
import styles from './addCategorie.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import { createNewCategory, getAllCategories } from '../../Features/Categories/CategoriesSlice';
import Swal from 'sweetalert2';

const AddCategory = () => {
  const dispatch = useDispatch();
  const [newCategory, setNewCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isError, categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const handleCreateCategory = () => {
    // Transformar el nuevo nombre a minúsculas sin espacios en blanco
    const newCategoryLowerCase = newCategory.trim().toLowerCase();

    // Verificar si la categoría ya existe
    if (categories.some((category) => category.name.toLowerCase() === newCategoryLowerCase)) {
      Swal.fire({
        icon: 'error',
        title: 'Error Creating Category',
        text: 'Category already exists',
      });
      return;
    }

    // Validar que newCategory no esté vacío u otra validación necesaria
    if (newCategoryLowerCase === '') {
      alert('It is mandatory to insert a name');
      return;
    }
    setIsLoading(true);
    dispatch(createNewCategory({ name: newCategory })).then(() => {
      setTimeout(() => {
        setIsLoading(false);
        if (!isError) {
          Swal.fire({
            icon: 'success',
            title: 'Category Created Successfully!',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }, 1000);
    });
    // Limpiar el campo de nueva categoría después de crearla
    setNewCategory('');
  };

  return (
    <div className={styles.addCategoryWrapper}>
      <h3>Create New Category</h3>
      <div className={styles.addCategoryForm}>
        {isLoading && (
          <div className={styles.loadingOverlay}>
            <TailSpin color="#4fa94d" height={40} width={40} />
          </div>
        )}
        <input
          type="text"
          placeholder="New Category Name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button className={styles.categoryButton} onClick={handleCreateCategory}>Create</button>
      </div>
    </div>
  );
};

export default AddCategory;
