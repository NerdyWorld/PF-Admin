import React, { useState, useEffect } from 'react';
import styles from './addbrand.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import { createBrand, getAllBrands } from '../../Features/Brands/brandsSlice';
import Swal from 'sweetalert2';
const AddBrand = () => {
  const dispatch = useDispatch();
  const [newBrand, setNewBrand] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isError, brands } = useSelector((state) => state.brands);

  useEffect(() => {
    dispatch(getAllBrands());
  }, []);

  const handleCreateBrand = () => {
    // Transformar el nuevo nombre a minúsculas sin espacios en blanco
    const newBrandLowerCase = newBrand.trim().toLowerCase();

    if (brands.some((brand) => brand.name.toLowerCase() === newBrandLowerCase)) {
      Swal.fire({
        icon: 'error',
        title: 'Error Creating Brand',
        text: 'Brand already exists',
      });
      return;
    }

    if (newBrandLowerCase === '') {
      alert('It is mandatory to insert a name');
      return;
    }
    setIsLoading(true);
    dispatch(createBrand({ name: newBrand })).then(() => {
      setTimeout(() => {
        setIsLoading(false);
        if (!isError) {
          Swal.fire({  
            icon: 'success',
            title: 'Brand Created Successfully!',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }, 1000);
    });
    // Limpiar el campo de nueva categoría después de crearla
    setNewBrand('');
  };

  return (
    <div className={styles.addBrandWrapper}>
      <h3>Create New Brand</h3>
      <div className={styles.addBrandForm}>
        {isLoading && (
          <div className={styles.loadingOverlay}>
            <TailSpin color="#4fa94d" height={40} width={40} />
          </div>
        )}
        <input
          type="text"
          placeholder="New Brand Name"
          value={newBrand}
          onChange={(e) => setNewBrand(e.target.value)}
        />
        <button className={styles.brandButton} onClick={handleCreateBrand}>Create</button>
      </div>
    </div>
  );
};

export default AddBrand;