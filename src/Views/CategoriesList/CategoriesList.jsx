import React, { useEffect, useState, useRef } from 'react';
import styles from './CategoriesList.module.css';
import { Table, Button, Input, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { FcFullTrash } from 'react-icons/fc';
import { TailSpin } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import { deleteCategory, getAllCategories } from '../../Features/Categories/CategoriesSlice';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const CategoryList = () => {
  const state = useSelector((state) => state);
  const { categories, message } = state.categories;
  const dispatch = useDispatch();

  // Estados y funciones para la búsqueda
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

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

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      defaultSortOrder: "ascend",
      sorter: (a, b)=>{
        if(a.id < b.id){
          return -1;
        }
        if(a.id > b.id){
          return 1;
        }
        return 0
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'), // Habilita la búsqueda en esta columna
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
