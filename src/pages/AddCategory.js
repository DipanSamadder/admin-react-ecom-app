import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";

export default function AddCategory() {
  const selectOption = [
    { key: "enternentment", value: "Entertainment" },
    { key: "comady", value: "Comedy" },
    { key: "fun", value: "Funny" },
    { key: "romance", value: "Romance" },
  ];
  const [editorValue, setEditorValue] = useState(""); // State to hold editor content
  const [isHtmlView, setIsHtmlView] = useState(false); // State to toggle between editor and HTML view
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
      <h3 className="mb-5">Add Category</h3>
      <form>
        <div className="row">
          <div className="col-md-8">
            <div className="card border-0 p-4 mb-3">
              <h6>Title</h6>
              <div className="row">
                <div className="col-md-12">
                  <CustomInput
                    type="text"
                    id="title"
                    label="Blog Title"
                    labelShow={false}
                  />
                </div>
                <div className="col-md-12">
                  <CustomInput
                    type="text"
                    id="lug"
                    label="Slug"
                    labelShow={false}
                  />
                </div>
                <div className="col-md-12">
                  <CustomInput
                    type="text"
                    id="shortDes"
                    label="Blog short des"
                    labelShow={false}
                  />
                </div>
              </div>
            </div>
            <div className="card border-0 px-4 pt-4 pb-5 mb-3">
              <h6>Description</h6>
              <div className="row">
                <div className="col-md-12">
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
                      className="form-control mb-5"
                      value={editorValue}
                      onChange={(e) => setEditorValue(e.target.value)}
                      rows="10"
                      style={editorStyle}
                    />
                  ) : (
                    <ReactQuill
                      value={editorValue}
                      onChange={setEditorValue}
                      modules={modules}
                      formats={formats}
                      placeholder="Start writing..."
                      theme="snow"
                      style={editorStyle}
                      className="mb-5"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 p-4 mb-3">
              <h6>Publish</h6>
              <div className="row">
                <div className="col-md-12">
                  <CustomSelect
                    id="shortDes"
                    label="Category"
                    labelShow={true}
                    dataOption={selectOption}
                  />
                </div>
                <div className="col-md-12">
                  <CustomSelect
                    id="author"
                    label="Author"
                    labelShow={true}
                    dataOption={selectOption}
                  />
                </div>
                <div className="col-md-12">
                  <CustomSelect
                    id="status"
                    label="Status"
                    labelShow={true}
                    dataOption={selectOption}
                  />
                </div>

                <div className="col-md-12 d-md-flex justify-content-between ">
                  <button
                    type="submit"
                    className="btn btn-success custom_button text-white mb-2"
                  >
                    Publish
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary custom_button text-white mb-2"
                  >
                    Preview
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger custom_button text-white mb-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <div className="card border-0 p-4 mb-3">
              <h6>SEO</h6>
              <div className="row">
                <div className="col-md-12">
                  <CustomInput
                    type="text"
                    id="metaTitle"
                    label="Meta Title"
                    labelShow={false}
                  />
                </div>
                <div className="col-md-12">
                  <CustomInput
                    type="text"
                    id="metaDes"
                    label="Meta Des"
                    labelShow={false}
                  />
                </div>
                <div className="col-md-12">
                  <CustomInput
                    type="text"
                    id="metaKey"
                    label="Meta Key"
                    labelShow={false}
                  />
                </div>
                <div className="col-md-12">
                  <CustomSelect
                    id="isIndexed"
                    label="Indexed"
                    labelShow={false}
                    dataOption={selectOption}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
