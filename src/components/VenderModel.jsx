import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  addProduct as addProductAction,
  updateProduct
} from "../store/actions";
import {
  Box,
  TextField,
  Card,
  Grid,
  Button,
  FormControlLabel,
  Checkbox,
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const VendorModel = ({ handleClose, open, modalMethod, updateId }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products); // Assuming there's a product object in your state
  console.log({ productList });

  const product =
    productList?.products?.find((it, i) => i === updateId - 1) ?? {};

  console.log("use selecotr", productList?.products, product);
  // const product  =updateId
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      vendors: [
        {
          nameV: "",
          is_main: true,
          variants: [{ variant: "", number: "" }],
        },
      ],
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      vendors: Yup.array().of(
        Yup.object().shape({
          nameV: Yup.string().required("Required"),
          variants: Yup.array().of(
            Yup.object().shape({
              variant: Yup.string().required("Required"),
              number: Yup.number().required("Required"),
            })
          ),
        })
      ),
    }),
    onSubmit: (values) => {
      console.log("valueeeee>>>>>>>>", { ...values, updateId });
      if (modalMethod.method === "update") {
        console.log("hello")
        console.log({ id: updateId - 1, updatedProduct: values });
        checkFn(updateId,values);
      } else {
        dispatch(addProductAction(values));
      }
      formik.resetForm();
      handleClose();
    },
    enableReinitialize: true,
  });

  const  checkFn = (updateId,values)=>{

    console.log('calling dipatch');
    dispatch(
      updateProduct({ id: updateId - 1, updatedProduct: values })
    );
  }
  const handleAddVendor = () => {
    formik.values.vendors.push({
      nameV: "",
      is_main: true,
      variants: [{ variant: "", number: "" }],
    });
    formik.setFieldValue("vendors", formik.values.vendors);
  };

  const handleRemoveVendor = (vendorIndex) => {
    formik.values.vendors.splice(vendorIndex, 1);
    formik.setFieldValue("vendors", formik.values.vendors);
  };

  const handleAddVariant = (vendorIndex) => {
    formik.values.vendors[vendorIndex].variants.push({
      variant: "",
      number: "",
    });
    formik.setFieldValue("vendors", formik.values.vendors);
  };

  const handleRemoveVariant = (vendorIndex, variantIndex) => {
    formik.values.vendors[vendorIndex].variants.splice(variantIndex, 1);
    formik.setFieldValue("vendors", formik.values.vendors);
  };

  useEffect(() => {
    console.log("conosl.elog", product);
    if (product && product.vendors) {
      const mappedVendors = product.vendors.map((vendor) => ({
        nameV: vendor.nameV,
        is_main: vendor.is_main,
        variants: vendor.variants.map((variant) => ({
          variant: variant.variant || "",
          number: variant.number || "",
        })),
      }));

      formik.setValues({
        name: product.name || "",
        description: product.description || "",
        vendors: mappedVendors,
      });
    }
  }, [product]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: 900,
          bgcolor: "background.paper",
          p: 4,
          maxHeight: "80vh", // Set a fixed height
          overflowY: "auto", // Allow overflow
        }}
      >
        <Card>
          <form onSubmit={formik.handleSubmit} sx={{ padding: "1rem" }}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3>Product Information</h3>
                <Button
                  onClick={() => handleClose()}
                  variant="contained"
                  color="error"
                  sx={{ width: "1rem", height: "2rem" }}
                >
                  Close
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product Name"
                  required
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div>{formik.errors.name}</div>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product Description"
                  multiline
                  minRows={3}
                  required
                  {...formik.getFieldProps("description")}
                />
                {formik.touched.description && formik.errors.description ? (
                  <div>{formik.errors.description}</div>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <h3>Vendors Information</h3>
              </Grid>
              {formik.values.vendors.map((vendor, vendorIndex) => (
                <>
                  <Grid
                    container
                    spacing={2}
                    key={vendorIndex}
                    sx={{ padding: "1rem" }}
                  >
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Vendor Name"
                        required
                        {...formik.getFieldProps(
                          `vendors[${vendorIndex}].nameV`
                        )}
                      />
                      {formik.touched[`vendors[${vendorIndex}].nameV`] &&
                      formik.errors[`vendors[${vendorIndex}].nameV`] ? (
                        <div>
                          {formik.errors[`vendors[${vendorIndex}].nameV`]}
                        </div>
                      ) : null}
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...formik.getFieldProps(
                              `vendors[${vendorIndex}].is_main`
                            )}
                          />
                        }
                        label="Main"
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Button
                        onClick={() => handleRemoveVendor(vendorIndex)}
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                      >
                        Remove Vendor
                      </Button>
                    </Grid>
                  </Grid>
                  <>
                    {vendor.variants.map((variant, variantIndex) => (
                      <Grid
                        container
                        spacing={2}
                        key={variantIndex}
                        sx={{ padding: "1rem" }}
                      >
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Variant"
                            required
                            {...formik.getFieldProps(
                              `vendors[${vendorIndex}].variants[${variantIndex}].variant`
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label="Number"
                            required
                            type="number"
                            {...formik.getFieldProps(
                              `vendors[${vendorIndex}].variants[${variantIndex}].number`
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <Button
                            onClick={() =>
                              handleRemoveVariant(vendorIndex, variantIndex)
                            }
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                          >
                            Remove Variant
                          </Button>
                        </Grid>
                      </Grid>
                    ))}
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        onClick={() => handleAddVariant(vendorIndex)}
                      >
                        Add Variant
                      </Button>
                    </Grid>
                  </>
                </>
              ))}
              <Grid item xs={12}>
                <Button variant="contained" onClick={handleAddVendor}>
                  Add Vendor
                </Button>
              </Grid>
              <Grid container spacing={2} style={{ padding: "1rem" }}>
                <Grid item xs={12} sm={6}>
                  {modalMethod?.method === "update" ? (
                    <Button
                      variant="contained"
                      type="submit"
                      fullWidth
                      onClick={() => {}}
                    >
                      Update Product
                    </Button>
                  ) : (
                    <Button variant="contained" type="submit" fullWidth>
                      Save Product
                    </Button>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    color="error"
                    onClick={() => {
                      formik.resetForm();
                      handleClose();
                    }}
                  >
                    Cancel Product
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Box>
    </Modal>
  );
};

export default VendorModel;
