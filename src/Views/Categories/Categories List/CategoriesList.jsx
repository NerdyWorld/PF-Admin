import React, { useRef, useState } from 'react';
import styles from "./CategoriesList.module.css";
import { Table } from 'antd';
import { FcFullTrash, FcCancel, FcApproval } from "react-icons/fc"

const dummy = [1, 2, 3, 4, 5, 6, 7, 8];

const CategoriesList = () => {


  const handleDelete = () =>{
    // Aca iria el dispatch, por el momento no pongan nada, solo maqueten
  };

  const disableToggle = (e) =>{
    if(e.target.dataset.activate){
      // Disable Category
    }else{
      // Activate Category
    }
  };
  
  
  const columns = [
    {
      title: 'Id', 
      dataIndex: 'id',
      key: "id"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions"
    }
  ];
  // Ahi ya estan establecidas las columnas que va a tener la tabla, ahora hay que llenarlas

  const dataSource = [];
  // Si tuvieras datos reales, mapearias el state de redux, pero para maquetar primero usa un dummy
  
  for(let i = 0; i < dummy.length; i++){
    dataSource.push({
      id: "I82hd8923u89-334d43-d43f43c",
      name: <div className='d-flex align-items-center justify-content-center'> Accessories </div>,
      actions: <div className='d-flex align-items-center gap-3 justify-content-center'>
        <FcFullTrash size={20} onClick={handleDelete}/>
        <FcApproval size={20} data-activate={true} onClick={disableToggle}/>
        {/* <FcCancel size={20} data-disable={true} onClick={disableToggle}/> */}
      </div>
    })
  }


  return ( 
    <div className={styles.wrapper}>
        <h3>Categories List</h3>
       <Table dataSource={dataSource} columns={columns} />
       {/* Esta tabla es de ant design */}
       {/* Columns es el nombre de cada fila de la tabla y datasource los datos con los que llenas esas filas */}
    </div>
   );
}
 
export default CategoriesList;