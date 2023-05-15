import { Paper, IconButton, InputBase, Divider } from "@mui/material";

export const CustomerSearch = () => {
  return (
    <Paper
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        width: 1,
        mb: 3,
        py: 1,
      }}
    >
      <InputBase sx={{ pl: 2, flex: 1 }} placeholder="검색" />
    </Paper>
  );
};
