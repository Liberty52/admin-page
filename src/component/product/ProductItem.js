import {Box, Rating, Typography} from "@mui/material";
import {CardImage, ProductCard, ProductRatingBox, ProductRatingText} from "../../component/product/styled/Product";
import {useNavigate} from "react-router-dom";


export default function ProductItem({id, name, price, rating, nOfRating, img}){
    const navigate = useNavigate();
    const cardClicked = () => {
        navigate(`/product/${id}`);
    }

    return (
        <ProductCard variant="outlined" sx={{ width: 320 }} onClick={cardClicked}>
            {/*<Typography variant="h5">Liberty52-Frame</Typography>*/}
            <CardImage
                src={img}
                srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
                loading="lazy"
                alt=""
            />
            <Box sx={{ display: 'flex' }}>
                <div>
                    <Typography  variant="h5">{name}</Typography>
                    <Typography fontSize="lg" fontWeight="lg">
                        ￦{price.toLocaleString()}
                    </Typography>
                    <ProductRatingBox>
                        <Rating readOnly name="half-rating" defaultValue={rating} precision={0.5} />
                        <ProductRatingText>({nOfRating})</ProductRatingText>
                    </ProductRatingBox>
                </div>
            </Box>
        </ProductCard>
    )

}