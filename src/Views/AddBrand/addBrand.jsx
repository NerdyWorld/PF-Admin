// import React, { useState, useRef, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createBrand } from "../../Features/Brands/brandsSlice";
// import styles from "./addBrand.module.css";
// import { Toast } from "primereact/toast";

// const AddBrand = () => {
//   const dispatch = useDispatch();
//   const refToast = useRef();
//   const state = useSelector((state) => state);
//   const { isSuccess, isError, message } = state.brands;
//   const [newBrand, setNewBrand] = useState({
//     name: "",
//   });

 
//   const handleCreateBrand = () => {
//     if (!newBrand.name) {
//       return refToast.current.show({
//         life: 3000,
//         severity: "warn",
//         summary: "Wait!",
//         detail: "Please complete all fields",
//       });
//     }

//     dispatch(createBrand(newBrand));
//     setNewBrand({
//       name: newBrand.name,
//     });
//   };

//   useEffect(() => {
//     if (message === "Creating Brand Success") {
//       refToast.current.show({
//         life: 3000,
//         severity: "success",
//         summary: "Success",
//         detail: message,
//       });
//     } else if (message === "Creating Brand rror") {
//       refToast.current.show({
//         life: 3000,
//         severity: "error",
//         summary: "Error",
//         detail: "Brand already exist",
//       });
//     }
//   }, [isSuccess, message, isError]);

//   return (
//     <div className={styles.wrapper}>
//       <Toast ref={refToast} position="top-left"></Toast>
//       <h3>Add Brand</h3>

//       <div>
//         <div className="form-floating mb-1 w-100 p-1">
//           <input
//             type="text"
//             id="name"
//             name="name"
//             onChange={handleBrandChange}
//             className="form-control"
//             value={newBrand.name}
//           />
//           <label htmlFor="name">
//             Name <span className={styles.optional}>(Required)</span>
//           </label>
//         </div>
//       </div>
//       <div className={styles.createBtn} onClick={handleCreateBrand}>
//         <button>Add Brand</button>
//       </div>
//     </div>
//   );
// };

// export default AddBrand;

import React, { useEffect, useRef, useState } from 'react';
import styles from "./addbrand.module.css";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 
import { Toast } from 'primereact/toast';
import { createBrand } from '../../Features/Brands/brandsSlice';
import { useDispatch, useSelector } from 'react-redux';

const initialState = {
  name: "",
}


const AddBrand = () => {

  const refToast = useRef();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { message } = state.products;
  const [newBrand, setNewBrand] = useState(initialState);


  

  const handleChange = (e) =>{
    setNewBrand({
      ...newBrand,
      [e.target.name]: e.target.value
    })
  };

  const handleCreate = () =>{
    if(!newBrand.id || !newBrand.name ){
      // Top Level information missing
      return refToast.current.show({life: 3000, severity: "warn", summary: "Wait!", detail: "Please complete all fields"});
    };

    const finalNewBrand = {
      id: newBrand.id,
      name: newBrand.name,
    }
    
    dispatch(createBrand({
      ...finalNewBrand,
    }))
  };

  useEffect(() => {
    setNewBrand({
      ...newBrand,
    })
  }, []);

  return ( 
    <div className={styles.wrapper}>
      <Toast ref={refToast} position='top-left'></Toast>
      <h3>Add Brand</h3>
      <div className={styles.formContainer}>
        <div className={styles.form}>
          <div className='form-floating mb-1 flex-grow-1 p-1'>
            <input type="text" id='name' name="name" onChange={handleChange} className='form-control' value={newBrand.name} />
            <label htmlFor="name">Name <span className={styles.optional}>(Required)</span></label>
          </div>
        
          <div className={styles.createBtn} onClick={handleCreate}>
            <button>Create</button>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default AddBrand;
