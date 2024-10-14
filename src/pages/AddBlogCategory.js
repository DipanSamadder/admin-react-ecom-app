import { useFormik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";
import CustomUpload from "../components/CustomUpload";
import {
  blogCategory,
  createBlogCategory,
  getABlogCategory,
  resetBlogCate,
  updateBlogCategory,
} from "../features/blogCate/blogCategorySlice";
import { getAllUser } from "../features/customers/customerSlice";

export default function AddBlogCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getEditID = location.pathname.split("/")[3];
  const [action, setAction] = useState("Add");

  useEffect(() => {
    if (getEditID !== undefined) {
      dispatch(getABlogCategory(getEditID));
      setAction("Update");
    } else {
      setAction("Add");
    }
  }, [dispatch, getABlogCategory, getEditID]);

  const [toastMessage, setToastMessage] = useState(false);
  const authorList = useSelector((state) => state.customer.customers || []);
  const blogCateList = useSelector((state) => state.bcat.data || []);

  const newBlogCat = useSelector((state) => state.bcat);

  const {
    isSuccess,
    isError,
    message,
    createBlogCateData,
    UpdateBlogCate,
    EditBlogCate,
  } = newBlogCat;
  const defaultData = EditBlogCate || UpdateBlogCate;

  const [fileList, setFileList] = useState([]);

  const authors = useMemo(
    () =>
      authorList
        .filter((val) => val.role === "admin")
        .map((author, i) => ({
          key: author._id,
          value: `${author.firstname} ${author.lastname}`,
        })),
    [authorList]
  );

  const parentList = useMemo(
    () =>
      blogCateList.map((parent, i) => ({
        key: parent._id,
        value: parent.title,
      })),
    [blogCateList]
  );

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
  const showImage =
    getEditID !== undefined && defaultData?.images
      ? defaultData.images.map((img) => ({
          publicId: img.public_id,
          url: img.url,
          status: "done",
          uid: img.public_id,
          name: img.url,
        }))
      : [];

  useEffect(() => {
    if (getEditID !== undefined) {
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
  }, [getEditID, defaultData]);

  let schemaValidation = Yup.object({
    title: Yup.string().required("Title is require"),
    author: Yup.string().required("Author is require"),
  });

  const formik = useFormik({
    initialValues: {
      title: getEditID !== undefined ? defaultData?.title || "" : "",
      parent: getEditID !== undefined ? defaultData?.parent || "" : "",
      author: getEditID !== undefined ? defaultData?.author || "" : "",
      status: getEditID !== undefined ? defaultData?.status || "" : "",
      shortDes: getEditID !== undefined ? defaultData?.shortDes || "" : "",
      metaTitle: getEditID !== undefined ? defaultData?.metaTitle || "" : "",
      metaDes: getEditID !== undefined ? defaultData?.metaDes || "" : "",
      metaKey: getEditID !== undefined ? defaultData?.metaKey || "" : "",
      isIndexed: getEditID !== undefined ? defaultData?.isIndexed || "" : "",
      images: showImage !== undefined ? showImage : [] || [],
    },

    validationSchema: schemaValidation,
    enableReinitialize: true,
    onSubmit: (values) => {
      values.images = fileList.map((file) => ({
        public_id: file.uid,
        url: file.url,
      }));
      setToastMessage(true);
      if (getEditID !== undefined) {
        values._id = getEditID;
        dispatch(updateBlogCategory(values));
      } else {
        dispatch(createBlogCategory(values));
      }
    },
  });

  useEffect(() => {
    if (toastMessage) {
      if (isSuccess && UpdateBlogCate && message !== undefined) {
        toast.success(message);
        setToastMessage(false);
        setTimeout(() => {
          navigate("/admin/blog-category-list");
          dispatch(resetBlogCate());
        }, 1000);
      }

      if (isError && message !== undefined) {
        toast.error(message);
        setToastMessage(false);
        dispatch(resetBlogCate());
      }
    }
  }, [dispatch, isSuccess, isError, message, UpdateBlogCate]);

  useEffect(() => {
    dispatch(getAllUser());
    dispatch(blogCategory());

    if (toastMessage) {
      if (isSuccess && createBlogCategory) {
        toast.success(message);
        setToastMessage(false);
        setTimeout(() => {
          navigate("/admin/blog-category-list");
          dispatch(resetBlogCate());
        }, 1000);
      }

      if (isError) {
        toast.error(message);
        setToastMessage(false);
        dispatch(resetBlogCate());
      }
    }
  }, [dispatch, isSuccess, isError, message, createBlogCateData]);

  return (
    <div>
      <h3 className="mb-5">{action} Blog Category</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-md-8">
            <div className="card border-0 p-4 mb-3">
              <h6>Basic</h6>
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
                      <>{formik.errors.title}</>
                    ) : null}
                  </small>
                </div>
                <div className="col-md-12">
                  <CustomInput
                    type="text"
                    id="shortDes"
                    label="Blog Short Des"
                    labelShow={false}
                    onChange={formik.handleChange}
                    value={formik.values.shortDes}
                  />
                </div>

                <div className="col-md-12">
                  <CustomSelect
                    id="parent"
                    label="Parent"
                    labelShow={false}
                    dataOption={parentList}
                    onChange={formik.handleChange}
                    value={formik.values.parent}
                  />
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
          </div>
          <div className="col-md-4">
            <div className="card border-0 p-4 mb-3">
              <h6>Publish</h6>
              <div className="row">
                <div className="col-md-12">
                  <CustomSelect
                    id="author"
                    label="Author"
                    labelShow={true}
                    dataOption={authors}
                    onChange={formik.handleChange}
                    value={formik.values.author}
                  />
                  <small className="text-danger">
                    {formik.touched.author && formik.errors.author ? (
                      <>{formik.errors.author}</>
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
              <h6>Images</h6>
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
