// import React, { useEffect, useRef, useState } from 'react';
// import styles from "./addbrand.module.css";
// import 'primereact/resources/themes/lara-light-indigo/theme.css';
// import "primereact/resources/primereact.min.css";                  //core css
// import "primeicons/primeicons.css"; 
// import { Toast } from 'primereact/toast';
// import { createBrand } from '../../Features/Brands/brandsSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { TailSpin } from 'react-loader-spinner';
// import Swal from 'sweetalert2';
// const initialState = {
//   name: "",
// }


// const AddBrand = () => {

//   const refToast = useRef();
//   const dispatch = useDispatch();
//   const {isError, brands} = useSelector(state => state.brands);
// //   const state = useSelector(state => state);
// //   const { message } = state.brands;
// const {message} = brandsState;
//   const [newBrand, setNewBrand] = useState(initialState);


  

//   const handleChange = (e) =>{
//     setNewBrand({
//       ...newBrand,
//       [e.target.name]: e.target.value
//     })
//   };

//   const handleCreate = () =>{
//     if( !newBrand.name ){
//       // Top Level information missing
//       return refToast.current.show({
//         life: 3000,
//         severity: "warn",
//         summary: "Wait!",
//         detail: "Please complete all fields",
//       });
//     };

//     const finalNewBrand = {
//       id: newBrand.id,
//       name: newBrand.name,
//     }
    
//     dispatch(createBrand({
//       ...finalNewBrand,
//     }))
//   };

//   useEffect(() => {
//     setNewBrand({
//       ...newBrand,
//     })
//   }, []);

//   return ( 
//     <div className={styles.wrapper}>
//       <Toast ref={refToast} position='top-left'></Toast>
//       <h3>Add Brand</h3>
//       <div className={styles.formContainer}>
//         <div className={styles.form}>
//           <div className='form-floating mb-1 flex-grow-1 p-1'>
//             <input type="text" id='name' name="name" onChange={handleChange} className='form-control' value={newBrand.name} />
//             <label htmlFor="name">Name <span className={styles.optional}>(Required)</span></label>
//           </div>
        
//           <div className={styles.createBtn} onClick={handleCreate}>
//             <button>Create</button>
//           </div>
//         </div>
//       </div>
//     </div>
//    );
// }
 
// export default AddBrand;



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

    // Verificar si la categoría ya existe
    if (brands.some((brand) => brand.name.toLowerCase() === newBrandLowerCase)) {
      Swal.fire({
        icon: 'error',
        title: 'Error Creating Brand',
        text: 'Brand already exists',
      });
      return;
    }

    // Validar que newBrand no esté vacío u otra validación necesaria
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