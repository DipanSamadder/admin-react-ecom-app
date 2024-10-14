import { useFormik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CustomEditor from "../components/CustomEditor";
import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";
import CustomUpload from "../components/CustomUpload";
import {
  createBlogNew,
  getABlog,
  resetBlogData,
  updateBlog,
} from "../features/blog/blogSlice";
import { blogCategory } from "../features/blogCate/blogCategorySlice";
import { getAllUser } from "../features/customers/customerSlice";

export default function AddBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogCateList = useSelector((state) => state.bcat.data || []);
  const location = useLocation();
  const getEditId = location.pathname.split("/")[3];
  const [action, setAction] = useState("Add");

  useEffect(() => {
    if (getEditId !== undefined) {
      dispatch(getABlog(getEditId));
      setAction("Update");
    } else {
      setAction("Add");
    }
  }, [dispatch, getABlog, getEditId]);

  const customerList = useSelector((state) => state.customer.customers || []);
  const [toastMessage, setTostMessage] = useState(false);

  const authorList = useMemo(
    () =>
      customerList
        .filter((val) => val.role === "admin")
        .map((val) => ({
          key: val._id,
          value: `${val.firstname} ${val.lastname}`,
        })),
    [customerList]
  );

  const blogCatList = useMemo(
    () =>
      blogCateList.map((val) => ({
        key: val._id,
        value: val.title,
      })),
    [blogCateList]
  );

  const addBlog = useSelector((state) => state.blog || []);
  const {
    isSuccess,
    isError,
    message,
    createBlogData,
    EditBlogData,
    UpdateBlogData,
  } = addBlog;

  const defaultData = EditBlogData || UpdateBlogData;
  const selectIndex = [
    { key: "Index", value: "Index" },
    { key: "No Index", value: "No Index" },
    { key: "Index Follow", value: "Index Follow" },
    { key: "No Index No Follow", value: "No Index No Follow" },
  ];

  const statusList = [
    { key: true, value: "Publish" },
    { key: false, value: "Private" },
  ];

  let schemaValidation = Yup.object({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
  });

  const [fileList, setFileList] = useState([]);
  const showImage =
    getEditId !== undefined && defaultData?.images
      ? defaultData.images.map((img) => ({
          publicId: img.public_id,
          url: img.url,
          status: "done",
          uid: img.public_id,
          name: img.url,
        }))
      : [];

  useEffect(() => {
    if (getEditId !== undefined) {
      if (defaultData?.images) {
        const updatedImages = defaultData.images.map((img) => ({
          publicId: img.public_id,
          url: img.url,
          status: "done",
          uid: img.public_id,
          name: img.url,
        }));
        setFileList(updatedImages);
      }
    } else {
      setFileList([]);
    }
  }, [getEditId, defaultData]);
  const formik = useFormik({
    initialValues: {
      title: getEditId !== undefined ? defaultData?.title || "" : "",
      shortDes: getEditId !== undefined ? defaultData?.shortDes || "" : "",
      description:
        getEditId !== undefined ? defaultData?.description || "" : "",
      category: getEditId !== undefined ? defaultData?.category || "" : "",
      brand: getEditId !== undefined ? defaultData?.brand || "" : "",
      color: getEditId !== undefined ? defaultData?.color || "" : "",
      price: getEditId !== undefined ? defaultData?.price || "" : "",
      quantity: getEditId !== undefined ? defaultData?.quantity || "" : "",
      author: getEditId !== undefined ? defaultData?.author || "" : "",
      status: getEditId !== undefined ? defaultData?.status || "" : "",
      metaDes: getEditId !== undefined ? defaultData?.metaDes || "" : "",
      metaKey: getEditId !== undefined ? defaultData?.metaKey || "" : "",
      metaTitle: getEditId !== undefined ? defaultData?.metaTitle || "" : "",
      isIndexed: getEditId !== undefined ? defaultData?.isIndexed || "" : "",
      images: showImage !== undefined ? showImage : [] || [],
    },
    validationSchema: schemaValidation,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      values.images = fileList.map((file) => ({
        public_id: file.uid,
        url: file.url,
      }));
      setTostMessage(true);
      if (getEditId !== undefined) {
        values._id = getEditId;
        dispatch(updateBlog(values));
      } else {
        dispatch(createBlogNew(values));
      }
    },
  });

  useEffect(() => {
    if (toastMessage) {
      if (isSuccess && UpdateBlogData && message !== null) {
        setTostMessage(false);
        toast.success(message);
        formik.resetForm();
        dispatch(resetBlogData());
        setTimeout(navigate("/admin/blog-list"), 1000);
      }

      if (isError && message !== null) {
        setTostMessage(false);
        dispatch(resetBlogData());
        toast.error(message);
      }
    }
  }, [isSuccess, isError, message, UpdateBlogData, dispatch]);

  useEffect(() => {
    dispatch(getAllUser());
    dispatch(blogCategory());
    if (toastMessage) {
      if (isSuccess && createBlogData) {
        setTostMessage(false);
        toast.success(message);
        formik.resetForm();
        dispatch(resetBlogData());
        setTimeout(navigate("/admin/blog-list"), 1000);
      }

      if (isError) {
        setTostMessage(false);
        dispatch(resetBlogData());
        toast.error(message);
      }
    }
  }, [isSuccess, isError, message, createBlogData, dispatch]);

  return (
    <div>
      <h3 className="mb-5">{action} Blog</h3>
      <form onSubmit={formik.handleSubmit}>
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
                    onChange={formik.handleChange}
                    value={formik.values.title}
                  />
                  <small className="text-danger">
                    {formik.touched.title && formik.errors.title ? (
                      <div>{formik.errors.title}</div>
                    ) : null}
                  </small>
                </div>
                <div className="col-md-12">
                  <CustomInput
                    type="text"
                    id="shortDes"
                    label="Blog short des"
                    labelShow={false}
                    onChange={formik.handleChange}
                    value={formik.values.shortDes}
                  />
                </div>
              </div>
            </div>
            <div className="card border-0 px-4 pt-4 pb-5 mb-3">
              <h6>Description</h6>
              <div className="row">
                <div className="col-md-12">
                  <CustomEditor
                    EditorId="description"
                    name="description"
                    placeholder="Start writing..."
                    onChange={(value) =>
                      formik.setFieldValue("description", value)
                    }
                    editorValue={formik.values.description}
                  />
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
                    id="category"
                    label="Category"
                    labelShow={true}
                    dataOption={blogCatList}
                    onChange={formik.handleChange}
                    value={formik.values.category}
                  />
                </div>
                <div className="col-md-12">
                  <CustomSelect
                    id="author"
                    label="Author"
                    labelShow={true}
                    dataOption={authorList}
                    onChange={formik.handleChange}
                    value={formik.values.author}
                  />
                  <small className="text-danger">
                    {formik.touched.author && formik.errors.author ? (
                      <div>{formik.errors.author}</div>
                    ) : null}
                  </small>
                </div>
                <div className="col-md-12">
                  <CustomSelect
                    id="status"
                    label="Status"
                    labelShow={true}
                    dataOption={statusList}
                    onChange={formik.handleChange}
                    value={formik.values.status}
                  />
                </div>

                <div className="col-md-12 d-md-flex justify-content-between ">
                  <button
                    type="submit"
                    className="btn btn-success custom_button text-white mt-3"
                  >
                    {action}
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary custom_button text-white mt-3"
                  >
                    Preview
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger custom_button text-white mt-3"
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
                    onChange={formik.handleChange}
                    value={formik.values.metaTitle}
                  />
                </div>
                <div className="col-md-12">
                  <CustomInput
                    type="text"
                    id="metaDes"
                    label="Meta Des"
                    labelShow={false}
                    onChange={formik.handleChange}
                    value={formik.values.metaDes}
                  />
                </div>
                <div className="col-md-12">
                  <CustomInput
                    type="text"
                    id="metaKey"
                    label="Meta Key"
                    labelShow={false}
                    onChange={formik.handleChange}
                    value={formik.values.metaKey}
                  />
                </div>
                <div className="col-md-12">
                  <CustomSelect
                    id="isIndexed"
                    label="Indexed"
                    labelShow={false}
                    dataOption={selectIndex}
                    onChange={formik.handleChange}
                    value={formik.values.isIndexed}
                  />
                </div>
              </div>
            </div>
            <div className="card border-0 p-4 mb-3">
              <h6>Blog Images</h6>
              <div className="row">
                <div className="col-md-12">
                  <CustomUpload fileList={fileList} setFileList={setFileList} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
