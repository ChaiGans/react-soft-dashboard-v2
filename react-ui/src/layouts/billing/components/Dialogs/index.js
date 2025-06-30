import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import { useState } from "react";
import BillingApi from "../../../../api/billing";

export function CreateNewBillDialog({ open, onClose, formData, onChange, onSubmit }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add New Billing Info</DialogTitle>
      <DialogContent>
        <SuiBox mb={2}>
          <SuiInput
            fullWidth
            placeholder="Full Name"
            name="full_name"
            value={formData.full_name}
            onChange={onChange}
          />
        </SuiBox>

        <SuiBox mb={2}>
          <SuiInput
            fullWidth
            placeholder="Company Name"
            name="company_name"
            value={formData.company_name}
            onChange={onChange}
          />
        </SuiBox>

        <SuiBox mb={2}>
          <SuiInput
            fullWidth
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={onChange}
          />
        </SuiBox>

        <SuiBox mb={2}>
          <SuiInput
            fullWidth
            placeholder="VAT Number"
            name="vat_number"
            value={formData.vat_number}
            onChange={onChange}
          />
        </SuiBox>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit} variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CreateNewBillDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    full_name: PropTypes.string,
    company_name: PropTypes.string,
    email: PropTypes.string,
    vat_number: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export function DeleteConfirmDialog({ open, onClose, onConfirm, itemName = "this billing entry" }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  itemName: PropTypes.string,
};

export function EditBillDialog({
  open,
  onClose,
  billId,
  default_full_name,
  default_company_name,
  default_email,
  default_vat_number,
  setBills,
}) {
  const [editFormData, setEditFormData] = useState({
    full_name: default_full_name,
    company_name: default_company_name,
    email: default_email,
    vat_number: default_vat_number,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = () => {
    BillingApi.UpdateBillingInfo(billId, editFormData)
      .then((res) => {
        setBills((prev) => prev.map((bill) => (bill.id === billId ? res.data : bill)));
        onClose();
      })
      .catch((err) => console.error("Update failed:", err));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Billing Info</DialogTitle>
      <DialogContent>
        <SuiBox mb={2}>
          <SuiInput
            fullWidth
            placeholder="Full Name"
            name="full_name"
            value={editFormData.full_name}
            onChange={onChange}
          />
        </SuiBox>

        <SuiBox mb={2}>
          <SuiInput
            fullWidth
            placeholder="Company Name"
            name="company_name"
            value={editFormData.company_name}
            onChange={onChange}
          />
        </SuiBox>

        <SuiBox mb={2}>
          <SuiInput
            fullWidth
            placeholder="Email"
            name="email"
            value={editFormData.email}
            onChange={onChange}
          />
        </SuiBox>

        <SuiBox mb={2}>
          <SuiInput
            fullWidth
            placeholder="VAT Number"
            name="vat_number"
            value={editFormData.vat_number}
            onChange={onChange}
          />
        </SuiBox>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EditBillDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  billId: PropTypes.number.isRequired,
  default_full_name: PropTypes.string.isRequired,
  default_company_name: PropTypes.string.isRequired,
  default_email: PropTypes.string.isRequired,
  default_vat_number: PropTypes.string.isRequired,
  setBills: PropTypes.func.isRequired,
};
