import React, { useEffect } from 'react';
import styles from './BrandList.module.css'
import { Table, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { FcFullTrash } from 'react-icons/fc';
import { TailSpin } from 'react-loader-spinner';
import { deleteBrand, getAllBrands } from '../../Features/Brands/brandsSlice';
import Swal from 'sweetalert2';

const BrandList = () => {
  const state = useSelector((state) => state);
  const { brands, message } = state.brands;
  const dispatch = useDispatch();

  const handleDelete = (brandId) => {
    Swal.fire({
      color: 'whitesmoke',
      icon: 'warning',
      iconColor: 'white',
      background: '#1f1f1f',
      buttonsStyling: false,
      title: `<p>Wait!</p>`,
      html: `
      <p>
        Are you sure you want to delete this brand?
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
        dispatch(deleteBrand(brandId));
        Swal.fire({
          icon: 'success',
          title: 'brand Deleted Successfully!',
          showConfirmButton: false,
          timer: 1000,
        });
      } else if (result.isDenied) {
        return;
      }
    });
  };

  useEffect(() => {
    dispatch(getAllBrands());
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
        <span className="deleteBrand" onClick={() => handleDelete(record.id)}>
          <FcFullTrash size={19} />
        </span>
      ),
    },
  ];

  const data = brands.map((brand) => ({
    key: brand.id,
    id: brand.id,
    name: brand.name,
  }));

  return (
    <div>
      <h3>BRAND LIST</h3>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default BrandList;
