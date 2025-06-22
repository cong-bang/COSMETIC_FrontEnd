import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Function to resize image using canvas
const resizeImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const maxWidth = 1024;
        const scale = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            const resizedReader = new FileReader();
            resizedReader.onload = () => {
              resolve(resizedReader.result);
            };
            resizedReader.onerror = (error) => reject(error);
            resizedReader.readAsDataURL(blob);
          },
          file.type,
          1
        );
      };
      img.onerror = (error) => reject(error);
      img.src = event.target.result;
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

// Custom Image Handler: chèn ảnh base64 vào Quill
const imageHandler = function () {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    if (file) {
      try {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = async () => {
          let imageDataUrl = await resizeImage(file);
          const range = this.quill.getSelection();
          const imgTag = `<img src="${imageDataUrl}" style="display: block; margin: 0 auto; width: 50%;" />`;
          this.quill.clipboard.dangerouslyPasteHTML(range.index, imgTag);
        };
      } catch (error) {
        console.error("Error handling image: ", error);
      }
    }
  };
};

// Add imageHandler to Quill's toolbar
const modules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
    handlers: {
      image: imageHandler,
    },
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const Editor = ({ value, onChange }) => {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      style={{
        backgroundColor: "white",
        borderRadius: "5px",
        overflow: "hidden",
      }}
      modules={modules}
      formats={formats}
    />
  );
};

export default Editor;
