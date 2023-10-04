import { Box, Typography } from "@mui/material";
import { CardImage, ProductCard } from "../product/styled/Product";

const LicenceItem = ({
  artistName,
  workName,
  stock,
  licenceImageUrl,
  startDate,
  endDate,
}) => {
  return (
    <ProductCard variant="outlined" sx={{ width: 320 }}>
      <CardImage src={licenceImageUrl} loading="lazy" />
      <Box sx={{ display: "flex" }}>
        <div>
          <Typography variant="h5">{artistName}</Typography>
          <Typography variant="h5">{workName}</Typography>
          <Typography variant="h5">{stock}</Typography>
          <Typography variant="h5">
            {startDate} ~ {endDate}
          </Typography>
        </div>
      </Box>
    </ProductCard>
  );
};

export default LicenceItem;
