import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createColor } from "../../../Features/Colors/ColorsSlice";
import styles from "./AddColor.module.css";
import { Toast } from "primereact/toast";

const AddColor = () => {
  const dispatch = useDispatch();
  const refToast = useRef();
  const state = useSelector((state) => state);
  const { isSuccess, isError, message } = state.colors;
  const [newColor, setNewColor] = useState({
    name: "",
  });

  const handleColorChange = (e) => {
    setNewColor({
      ...newColor,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateColor = () => {
    if (!newColor.name) {
      return refToast.current.show({
        life: 3000,
        severity: "warn",
        summary: "Wait!",
        detail: "Please complete all fields",
      });
    }

    dispatch(createColor(newColor));
    setNewColor({
      name: newColor.name,
    });
  };

  useEffect(() => {
    if (message === "Create Color success") {
      refToast.current.show({
        life: 3000,
        severity: "success",
        summary: "Success",
        detail: message,
      });
    } else if (message === "Create Color error") {
      refToast.current.show({
        life: 3000,
        severity: "error",
        summary: "Error",
        detail: "Color already exist",
      });
    }
  }, [isSuccess, message, isError]);

  return (
    <div className={styles.wrapper}>
      <Toast ref={refToast} position="top-left"></Toast>
      <h3>Add Color</h3>

      <div>
        <div className="form-floating mb-1 w-100 p-1">
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleColorChange}
            className="form-control"
            value={newColor.name}
          />
          <label htmlFor="name">
            Name <span className={styles.optional}>(Required)</span>
          </label>
        </div>
      </div>
      <div className={styles.createBtn} onClick={handleCreateColor}>
        <button>Add Color</button>
      </div>
    </div>
  );
};

export default AddColor;
