import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CustomEditor({
  EditorId,
  className,
  name,
  onChange,
  editorValue,
  placeholder,
}) {
  const [isHtmlView, setIsHtmlView] = useState(false);
  const editorStyle = { height: "300px" };

  // Modules for ReactQuill
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  // Formats for ReactQuill
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
    "script",
    "indent",
    "direction",
    "color",
    "background",
    "align",
    "link",
    "image",
    "video",
  ];

  // Handle the toggle between editor and HTML view
  const handleToggleView = () => {
    setIsHtmlView(!isHtmlView);
  };

  return (
    <div>
      <div className="mb-1">
        <button
          type="button"
          onClick={handleToggleView}
          className="btn p-0"
          style={{ fontSize: "10px" }}
        >
          {isHtmlView ? "Editor" : "HTML"}
        </button>
      </div>
      {isHtmlView ? (
        <textarea
          className={`form-control mb-5 ${className}`}
          rows="10"
          style={editorStyle}
          onChange={(e) => onChange(e.target.value)} // Manually set field value
          value={editorValue}
          name={name}
          placeholder={placeholder}
        />
      ) : (
        <ReactQuill
          id={EditorId}
          className={`mb-5 ${className}`}
          name={name}
          placeholder={placeholder}
          onChange={onChange} // Manually set field value
          value={editorValue}
          style={editorStyle}
          modules={modules}
          formats={formats}
          theme="snow"
        />
      )}
    </div>
  );
}

export default CustomEditor;
