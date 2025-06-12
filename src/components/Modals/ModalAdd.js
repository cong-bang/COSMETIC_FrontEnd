import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import styles from "./ModalAdd.module.scss";

const ModalAdd = ({ title = "Add new item", fields = [], onSubmit, onClose, show }) => {
  if (!show) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h4>{title}</h4>
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <table>
            <tbody>
              {fields.map((field, index) => (
                <tr key={index}>
                  <td className={styles.label}>{field.label}</td>
                  <td>
                    {field.type === "text" && (
                      <input
                        type="text"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={field.placeholder || ""}
                      />
                    )}
                    {field.type === "number" && (
                      <input
                        type="number"
                        value={field.value}
                        onChange={field.onChange}
                        min={field.min || 0}
                        step={field.step || 1}
                      />
                    )}
                    {field.type === "select" && (
                      <select value={field.value} onChange={field.onChange}>
                        <option value="" disabled>
                          Choose
                        </option>
                        {field.options.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.name}
                          </option>
                        ))}
                      </select>
                    )}
                    {field.type === "image" && (
                      <div>
                        <input type="file" onChange={field.onChange} />
                        {field.value && <img src={field.value} alt="" />}
                      </div>
                    )}
                    {field.type === "custom" && field.render && field.render()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.btnClose} onClick={onClose}>
            Close
          </button>
          <button className={styles.btnSave} onClick={onSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAdd;
