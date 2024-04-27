import {
  Dialog,
  DialogContent,
  TextField,
  Typography,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

const StyledButton = styled(Button)({
  textTransform: "none",
  color: "#87c750",
});

function EditProduct({
  isEdit,
  handleCloseEditForm,
  formData,
  handleOnChange,
  handleEditSubmit,
}) {
  return (
    <Dialog open={isEdit} onClose={handleCloseEditForm}>
      <div className="table-view-edit-product">
        <div className="table-view-edit-product-with-cross">
          <Typography sx={{ margin: "1rem 1rem 0rem 1rem" }} variant="h4">
            Edit product
          </Typography>
          <IconButton
            onClick={handleCloseEditForm}
            sx={{ "&:hover": { backgroundColor: "#363835" } }}
          >
            <CloseIcon sx={{ color: "#87c750" }} />
          </IconButton>
        </div>
        <Typography sx={{ marginLeft: "1.1rem" }}>{formData?.name}</Typography>
      </div>
      <DialogContent
        sx={{
          padding: "20px 24px",
          display: "flex",
          gap: "1rem",
          color: "white",
        }}
      >
        <div>
          <TextField
            margin="dense"
            label="Category"
            fullWidth
            name="category"
            value={formData?.category}
            onChange={handleOnChange}
            type="text"
          />
          <TextField
            margin="dense"
            label="Price"
            fullWidth
            name="price"
            value={formData?.price}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <TextField
            margin="dense"
            label="Quantity"
            fullWidth
            name="quantity"
            value={formData?.quantity}
            onChange={handleOnChange}
            type="text"
          />
          <TextField
            margin="dense"
            label="Value"
            fullWidth
            name="value"
            value={formData?.value}
            onChange={handleOnChange}
            type="text"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <StyledButton onClick={handleCloseEditForm}>Cancel</StyledButton>
        <StyledButton onClick={(e) => handleEditSubmit(e)}>Save</StyledButton>
      </DialogActions>
    </Dialog>
  );
}
export default EditProduct;
