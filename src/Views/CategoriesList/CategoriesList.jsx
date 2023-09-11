import React, { useEffect } from 'react';
import styles from './CategoriesList.module.css';
import { Table, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { FcFullTrash } from 'react-icons/fc';
import { TailSpin } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import { deleteCategory,getAllCategories } from '../../Features/Categories/CategoriesSlice';

const CategoryList = () => {
  const state = useSelector((state) => state);
  const { categories, message } = state.categories;
  const dispatch = useDispatch();

  const handleDelete = (categoryId) => {
    Swal.fire({
      color: 'whitesmoke',
      icon: 'warning',
      iconColor: 'white',
      background: '#1f1f1f',
      buttonsStyling: false,
      title: `<p>Wait!</p>`,
      html: `
      <p>
        Are you sure you want to delete this category?
      </p>
      `,
      showConfirmButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#1f1f1f',
      showDenyButton: true,
      denyButtonText: 'No',
      denyButtonColor: 'grey',
      denyButtonAriaLabel: 'black',
      toast: true,
      customClass: {
        confirmButton: 'confirmSwalCheckout',
        denyButton: 'denySwalCheckout',
        title: 'swalTitle',
        htmlContainer: 'swalHtml',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategory(categoryId));
        Swal.fire({
          icon: 'success',
          title: 'Category Deleted Successfully!',
          showConfirmButton: false,
          timer: 1000,
        });
      } else if (result.isDenied) {
        return;
      }
    });
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => (
        <span className="deleteCategory" onClick={() => handleDelete(record.id)}>
          <FcFullTrash size={19} />
        </span>
      ),
    },
  ];

  const data = categories.map((category) => ({
    key: category.id,
    id: category.id,
    name: category.name,
  }));

  return (
    <div>
      <h3>Categories List</h3>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default CategoryList;

