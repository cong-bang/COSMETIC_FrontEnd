import { useEffect, useState } from "react";
import { Map } from "lucide-react";
import styles from "./Address.module.scss";
import { getAllProvinces, getDistrictsByProvinceCode, getWardsByDistrictCode } from '../../services/mapApiService';
import { toast } from "react-toastify";
import { putUserAddress } from "../../services/userService";
import { useSelector } from "react-redux";
import { getUserById } from '../../services/userService';

const Address = () => {
    const userFromLocal = useSelector((state) => state.user.user);
    const [user, setUser] = useState({});

  //Convert address
function parseAddress(fullAddress) {
  if (!fullAddress) {
    return {
      streetDetail: "",
      ward: "",
      district: "",
      province: ""
    };
  }

  const parts = fullAddress.split(",").map(item => item.trim());
  const length = parts.length;

  let province = "";
  let district = "";
  let ward = "";
  let streetDetail = "";

  if (length >= 1) province = parts[length - 1];
  if (length >= 2) district = parts[length - 2];
  if (length >= 3) ward = parts[length - 3];
  if (length >= 4) streetDetail = parts.slice(0, length - 3).join(", ");

  return { streetDetail, ward, district, province };
}


  // Map API State
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);

  const [formData, setFormData] = useState({
    province: "",
    district: "",
    ward: "",
    streetDetail: "",
  });

  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [showWardDropdown, setShowWardDropdown] = useState(false);

  // useEffect(() => {
  //   const fetchProvinces = async () => {
  //     const data = await getAllProvinces();
  //     if (data) setProvinceList(data);
  //   };
  //   fetchProvinces();
  // }, []);

  useEffect(() => {
  const fetchUserAndProvinces = async () => {
    const data = await getAllProvinces();
    if (data) setProvinceList(data);

    if (userFromLocal?.id) {
      const res = await getUserById(userFromLocal.id);
      const userData = res.data;
      setUser(userData);

      if (userData.address) {
        const parsedAddress = parseAddress(userData.address);
        setFormData(parsedAddress);

        // Load district và ward theo province nếu có
        const selectedProvince = data.find(item => item.name === parsedAddress.province);
        if (selectedProvince) {
          const districts = await getDistrictsByProvinceCode(selectedProvince.code);
          setDistrictList(districts);

          const selectedDistrict = districts.find(item => item.name === parsedAddress.district);
          if (selectedDistrict) {
            const wards = await getWardsByDistrictCode(selectedDistrict.code);
            setWardList(wards);
          }
        }
      }
    }
  };

  fetchUserAndProvinces();
}, [user.address]);

  // Khi chọn province → fetch district
  const handleSelectProvince = async (province) => {
    setFormData({
      ...formData,
      province: province.name,
      district: "",
      ward: "",
    });
    setShowRegionDropdown(false);

    const districts = await getDistrictsByProvinceCode(province.code);
    if (districts) setDistrictList(districts);
    setWardList([]);
  };

  // Khi chọn district → fetch ward
  const handleSelectDistrict = async (district) => {
    setFormData({
      ...formData,
      district: district.name,
      ward: "",
    });
    setShowDistrictDropdown(false);

    const wards = await getWardsByDistrictCode(district.code);
    if (wards) setWardList(wards);
  };

  // Chọn ward
  const handleSelectWard = (ward) => {
    setFormData({
      ...formData,
      ward: ward.name,
    });
    setShowWardDropdown(false);
  };

  //Input street
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      streetDetail: value,
    });
  };

  //Handle Submit 
  const handleUpdateAddress = async () => {
  try {
    const res = await putUserAddress(formData);
    toast.success(res.message);

    const updatedUser = await getUserById(userFromLocal.id);
    setUser(updatedUser.data);

  } catch (error) {
    toast.error(error.message);
  }
};



  return (
    <div className={styles.addressContainer}>
      <h2 className={styles.title}>Địa chỉ</h2>
      <p className={styles.subtitle}>Thông tin này sẽ xuất hiện trên hóa đơn của bạn</p>

      <div className={styles.formWrapper}>

        {/* MAP API - Province */}
        <div className={styles.dropdownContainer}>
          <div
            className={styles.dropdownField}
            onClick={() => setShowRegionDropdown(!showRegionDropdown)}
          >
            <span className={formData.province ? styles.textBlack : styles.textGray}>
              {formData.province || "Tỉnh/Thành phố"}
            </span>
            <svg className={`${styles.dropdownIcon} ${showRegionDropdown ? styles.rotateIcon : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {showRegionDropdown && (
            <div className={styles.dropdownMenu}>
              {provinceList.length === 0 ? (
                <div className={styles.loadingText}>Đang tải dữ liệu...</div>
              ) : (
                <ul className={styles.optionsList}>
                  {provinceList.map((province) => (
                    <li
                      key={province.code}
                      className={styles.option}
                      onClick={() => handleSelectProvince(province)}
                    >
                      {province.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        
        <div className={styles.ctn_district_ward}>  
        {/* MAP API - District */}
        <div className={styles.dropdownContainer}>
          <div
            className={styles.dropdownField}
            onClick={() => setShowDistrictDropdown(!showDistrictDropdown)}
          >
            <span className={formData.district ? styles.textBlack : styles.textGray}>
              {formData.district || "Quận/Huyện"}
            </span>
            <svg className={`${styles.dropdownIcon} ${showDistrictDropdown ? styles.rotateIcon : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {showDistrictDropdown && (
            <div className={styles.dropdownMenu}>
              {districtList.length === 0 ? (
                <div className={styles.loadingText}>Chọn Tỉnh/Thành phố trước</div>
              ) : (
                <ul className={styles.optionsList}>
                  {districtList.map((district) => (
                    <li
                      key={district.code}
                      className={styles.option}
                      onClick={() => handleSelectDistrict(district)}
                    >
                      {district.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* MAP API - Ward */}
        <div className={styles.dropdownContainer}>
          <div
            className={styles.dropdownField}
            onClick={() => setShowWardDropdown(!showWardDropdown)}
          >
            <span className={formData.ward ? styles.textBlack : styles.textGray}>
              {formData.ward || "Phường/Xã"}
            </span>
            <svg className={`${styles.dropdownIcon} ${showWardDropdown ? styles.rotateIcon : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {showWardDropdown && (
            <div className={styles.dropdownMenu}>
              {wardList.length === 0 ? (
                <div className={styles.loadingText}>Chọn Quận/Huyện trước</div>
              ) : (
                <ul className={styles.optionsList}>
                  {wardList.map((ward) => (
                    <li
                      key={ward.code}
                      className={styles.option}
                      onClick={() => handleSelectWard(ward)}
                    >
                      {ward.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        </div> 

        {/* Địa chỉ cụ thể */}
        {/* <input
          type="text"
          name="streetDetail"
          placeholder="Địa chỉ cụ thể"
          value={formData.streetDetail}
          onChange={handleInputChange}
          className={styles.inputField}
        /> */}

        <input
          type="text"
          name="streetDetail"
          placeholder="Địa chỉ cụ thể"
          value={formData.streetDetail}
          onChange={handleInputChange}
          className={styles.inputField}
          disabled={!formData.ward}
        />
        {!formData.ward && (
          <div className={styles.noteText}>
            * Vui lòng chọn Phường/Xã trước khi nhập địa chỉ cụ thể
          </div>
        )}

        {/* Map Icon */}
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
            <div>{user.address || "Chưa cập nhật"}</div>
          </div>
        </div>

        {/* Nút lưu */}
        <div className={styles.buttonContainer}>
          <button type="button" onClick={handleUpdateAddress} className={styles.saveButton}>
            Lưu
          </button>
        </div>

      </div>
    </div>
  );
};

export default Address;
