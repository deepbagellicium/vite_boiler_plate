import * as React from "react";
import { Box, Dialog } from "@mui/material";

interface CustomModal {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  maxWidth?: string;
}
const CustomModal: React.FC<CustomModal> = ({
  open,
  onClose,
  children,
  width,
  maxWidth = "600px",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        border: "none",
        ...(maxWidth && {
          "& .MuiPaper-root": {
            maxWidth,
          },
        }),
      }}
    >
      <Box sx={{ border: "none", ...(width && { width }) }}>{children}</Box>
    </Dialog>
  );
};

export default CustomModal;
