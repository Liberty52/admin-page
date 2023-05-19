import {MainContainer} from "../component/main/MainComponent";
import SideNav from "../component/common/side-nav/SideNav";
import {Box, Container} from "@mui/material";
import ProductItem from "../../component/product/ProductItem";
import {MOCK_PRODUCT_DATA} from "../../utils/MockData";
import {ProductBox} from "../../component/product/styled/Product";


export default function Product(){
    return (
        <>
            <MainContainer>
                <SideNav />
                <Box
                    component="main"
                    sx={{
                        padding: "0 5%",
                        flexGrow: 1,
                        py: 8,
                    }}
                >
                    <Container sx={{ marginLeft: "30px" }} maxWidth="xl">
                        <h1>상품 관리</h1>
                        <ProductBox useFlexGap  flexWrap={"wrap"} direction={"row"} spacing={2}>
                            {MOCK_PRODUCT_DATA.map(p => <ProductItem
                            id={p.id}
                            name={p.name}
                            price={p.price}
                            rating={p.rating}
                            nOfRating={p.nOfRating}
                            img={p.img}
                            />)}
                        </ProductBox>
                    </Container>
                </Box>
            </MainContainer>
        </>
    )
}