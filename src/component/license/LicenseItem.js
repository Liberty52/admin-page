import { Box, Typography } from "@mui/material";
import { CardImage, ProductCard } from "../product/styled/Product";

const LicenseItem = ({
  id,
  artistName,
  artName,
  stock,
  licenseImageUrl,
  startDate,
  endDate,
}) => {
  return (
    <ProductCard variant="outlined" sx={{ width: 320 }}>
      <CardImage src={licenseImageUrl} loading="lazy" />
      <Box sx={{ display: "flex" }}>
        <div key={id}>
          <Typography variant="h5">작가: {artistName}</Typography>
          <Typography variant="h5">작품명: {artName}</Typography>
          <Typography variant="h5">개수: {stock}</Typography>
          <Typography variant="h5">
            {startDate} ~ {endDate}
          </Typography>
        </div>
      </Box>
    </ProductCard>
  );
};

export default LicenseItem;
