import React, { useState, useRef, useEffect } from "react";
import { Table } from "antd";
import { FcFullTrash } from "react-icons/fc";
import styles from "./ColorsList.module.css";
import { Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import {
  deleteColor,
  getAllColors,
} from "../../../Features/Colors/ColorsSlice";
import { useDispatch } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Toast } from "primereact/toast";

const ColorList = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { colors, message, isSuccess, isError } = state.colors;
  const refToast = useRef();

  useEffect(() => {
    dispatch(getAllColors());
  }, []);

  useEffect(() => {
    if (message === "Delete color success") {
      refToast.current.show({
        life: 3000,
        severity: "success",
        summary: "Success",
        detail: message,
      });
    } else if (message === "Delete color error") {
      refToast.current.show({
        life: 3000,
        severity: "error",
        summary: "Error",
        detail: "Failed to delete color",
      });
    }
  }, [isError, isSuccess, message]);

  const handleDelete = (colorId) => {
    console.log(colorId);
    Swal.fire({
      color: "whitesmoke",
      icon: "warning",
      iconColor: "white",
      background: "#1f1f1f",
      buttonsStyling: false,
      title: `<p>Wow wow!</p>`,
      html: `
      <p>
        Are you sure you want to delete this product?
      </p>
      `,
      showConfirmButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#1f1f1f",
      showDenyButton: true,
      denyButtonText: "No",
      denyButtonColor: "grey",
      denyButtonAriaLabel: "black",
      toast: true,
      customClass: {
        confirmButton: "confirmSwalCheckout",
        denyButton: "denySwalCheckout",
        title: "swalTitle",
        htmlContainer: "swalHtml",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteColor(colorId));
      } else if (result.isDenied) {
        return;
      }
    });
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          // ref={searchInput} {/* Asigna la referencia al campo de búsqueda */}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      defaultSortOrder: "ascend",
      sorter: (a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      },
      ...getColumnSearchProps("name"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
    },
  ];
  console.log(colors);
  const dataSource = colors
    ? colors.map((color) => ({
        id: color.id,
        name: color.name,
        key: color.id,
        actions: (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(color.id)}
          >
            {message === `Deleting product ${color.id}` ? (
              <TailSpin
                height="20"
                width="20"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              <div className="d-flex align-items-center gap-3">
                <FcFullTrash size={19} />
              </div>
            )}
          </div>
        ),
      }))
    : [];

  return (
    <div className={styles.wrapper}>
      <Toast ref={refToast} position="top-left"></Toast>
      <h3>Colors List</h3>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default ColorList;
