import { useState } from "react";
import { Map } from "lucide-react";
import styles from "./Address.module.scss";

const Address = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    region: "",
    detailAddress: "",
  });
  
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = () => {
    
  };
  
  return (
    <div className={styles.addressContainer}>
      <h2 className={styles.title}>Địa chỉ</h2>
      <p className={styles.subtitle}>Thông tin này sẽ xuất hiện trên hóa đơn của bạn</p>
      
      <div className={styles.formWrapper}>
        <div className={styles.inputGroup}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Tên"
              value={formData.name}
              onChange={handleInputChange}
              className={styles.inputField}
            />
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={handleInputChange}
              className={styles.inputField}
            />
          </div>
        </div>
        
        <div className={styles.dropdownContainer}>
          <div 
            className={styles.dropdownField}
            onClick={() => setShowRegionDropdown(!showRegionDropdown)}
          >
            <span className={formData.region ? styles.textBlack : styles.textGray}>
              {formData.region || "Tỉnh/Thành phố, Huyện/Quận, Phường/Xã"}
            </span>
            <svg 
              className={`${styles.dropdownIcon} ${showRegionDropdown ? styles.rotateIcon : ""}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          {showRegionDropdown && (
            <div className={styles.dropdownMenu}>
              <ul className={styles.optionsList}>
                <li className={styles.option} onClick={() => {
                  setFormData({...formData, region: "Hà Nội"});
                  setShowRegionDropdown(false);
                }}>
                  Hà Nội
                </li>
                <li className={styles.option} onClick={() => {
                  setFormData({...formData, region: "Hồ Chí Minh"});
                  setShowRegionDropdown(false);
                }}>
                  Hồ Chí Minh
                </li>
                <li className={styles.option} onClick={() => {
                  setFormData({...formData, region: "Đà Nẵng"});
                  setShowRegionDropdown(false);
                }}>
                  Đà Nẵng
                </li>
                <li className={styles.option} onClick={() => {
                  setFormData({...formData, region: "Cần Thơ"});
                  setShowRegionDropdown(false);
                }}>
                  Cần Thơ
                </li>
              </ul>
            </div>
          )}
        </div>
        
        <div>
          <input
            type="text"
            name="detailAddress"
            placeholder="Địa chỉ cụ thể"
            value={formData.detailAddress}
            onChange={handleInputChange}
            className={styles.inputField}
          />
        </div>
        
        <div className={styles.mapContainer}>
          <div className={styles.mapCenterContent}>
            <div className={styles.mapPlaceholder}>
              <Map className={styles.mapIcon} size={24} />
              <button type="button" className={styles.addLocationBtn}>
                <span> + Thêm vị trí</span>
              </button>
            </div>
          </div>
          <div className={styles.locationLabel}>
            <div>Hà Nội</div>
          </div>
        </div>
        
        <div className={styles.buttonContainer}>
          <button
            type="button"
            onClick={handleSubmit}
            className={styles.saveButton}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Address;