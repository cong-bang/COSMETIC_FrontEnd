import React, { useState } from "react";
import styles from "./FeedbackForm.module.scss";
import { toast } from "react-toastify";

const FeedbackForm = ({ onSubmit, initialValues = {} }) => {
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState("");
  const [evidence, setEvidence] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [feedbackId, setFeedbackId] = useState(null);

  const handleStarClick = (value) => {
    setStar(value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEvidence(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (star === 0 || comment.trim() === "") {
      toast.warn("Vui lòng chọn sao và nhập bình luận!");
      return;
    }

    const formData = new FormData();
    formData.append("Id", feedbackId);
    formData.append("Star", star);
    formData.append("Comment", comment);
    if (evidence) {
    formData.append("EvidenceImg", evidence);
    }

    onSubmit(formData);

    // Reset form sau khi submit
    setStar(0);
    setComment("");
    setEvidence(null);
    setPreviewImg(null);
  };

  return (
    <form className={styles.feedbackForm} onSubmit={handleSubmit}>
      <div className={styles.starRating}>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={value <= star ? styles.activeStar : styles.star}
            onClick={() => handleStarClick(value)}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        className={styles.commentBox}
        placeholder="Nhập bình luận của bạn..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows="4"
      ></textarea>

      <div className={styles.uploadSection}>
        <label className={styles.uploadLabel}>
          Tải ảnh lên: {" "}
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>

        {previewImg && (
          <div className={styles.preview}>
            <img src={previewImg} alt="Preview" />
          </div>
        )}
      </div>

      <div className={styles.buttonWrapper}>
        <button type="submit" className={styles.submitButton}>
            Gửi đánh giá
        </button>
      </div>

    </form>
  );
};

export default FeedbackForm;
