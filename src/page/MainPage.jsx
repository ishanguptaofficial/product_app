import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VendorModel from "../components/VenderModel";
import { connect } from "react-redux";
import {
  addProduct as addProductAction,
  removeProduct as removeProductAction,
  updateProduct as updateProductAction,
} from "../store/actions";

function MainPage({ products, addProduct, removeProduct, updateProduct }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleTogglePageMargin = (isOpen) => {
    setSidebarOpen(isOpen);
  };

  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [anchorEl, setAnchorEl] = useState({});
  const [modalMethod, setModalMethod] = useState({});
  const [updateId, setUpdateId] = useState()
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setModalMethod({});
    // removeProduct({})
  };

  const handleOpenMenu = (event, rowIndex) => {
    setAnchorEl((prev) => ({ ...prev, [rowIndex]: event.currentTarget }));
  };

  const handleCloseMenu = () => {
    setAnchorEl({});
  };

  const handleDeleteProduct = (productId) => {
    console.log(productId);
    removeProduct({ id: productId });
    handleCloseMenu();
  };

  const handleUpdateProduct = (product) => {
    setSelectedProduct(product);
    handleOpen();
    handleCloseMenu();
  };

  const productsWithId = products.map((product, index) => ({
    ...product,
    id: index + 1, // Assuming that the index starts from 0, you can adjust accordingly
  }));

  const columns = [
    { field: "id", headerName: "Sr no", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "vendor", headerName: "Vendors", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "isMain", headerName: "Is Main", flex: 1 },
    { field: "variant", headerName: "Variant", flex: 1 },
    { field: "number", headerName: "Number", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={(event) => handleOpenMenu(event, params.row.id)}>
            <MoreVertIcon />
          </Button>
          <Menu
            id={`simple-menu-${params.row.id}`}
            anchorEl={anchorEl[params.row.id]}
            keepMounted
            open={Boolean(anchorEl[params.row.id])}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={() => handleDeleteProduct(params.row.id)}>
              Delete
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleUpdateProduct(params.row);
                setModalMethod({ method: "update" });
                setUpdateId(params.row.id)
              }}
            >
              Update
            </MenuItem>
          </Menu>
        </div>
      ),
    },
  ];

  useEffect(() => {
    console.log(">>>>",{products})
  },[products])
  return (
    <>
      <SideBar togglePageMargin={handleTogglePageMargin} />
      <Box
        sx={{
          marginLeft: sidebarOpen ? "240px" : "0",
          fontSize: "14px",
          marginTop: "5rem",
        }}
      >
        <Box>
          <Button onClick={handleOpen}>Add Product</Button>
        </Box>
        <Box>
          <DataGrid
            rows={productsWithId}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            pagination
          />
          <VendorModel
            open={open}
            handleClose={handleClose}
            product={selectedProduct}
            modalMethod={modalMethod}
            setModalMethod={setModalMethod}
            updateProduct={updateProduct}
            updateId={updateId}
          />
        </Box>
      </Box>
    </>
  );
}

const mapStateToProps = (state) => ({
  products: state.products.products,
});

const mapDispatchToProps = {
  addProduct: addProductAction,
  removeProduct: removeProductAction,
  updateProduct: updateProductAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
