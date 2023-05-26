import {MainContainer} from "../component/main/MainComponent";
import SideNav from "../component/common/side-nav/SideNav";
import {Box, Container} from "@mui/material";
import ProductItem from "../../component/product/ProductItem";
import {MOCK_IMAGE} from "../../utils/MockData";
import {ProductBox} from "../../component/product/styled/Product";
import {useEffect, useState} from "react";
import {retrieveProduct} from "../../axios/Product";



export default function Product(){

    const [product,setProduct] = useState([]);

    const effect = async () => {

        try{
            const response = await retrieveProduct();
            setProduct(response.data);
        }catch (e){
            console.error(e);
        }
    }

    useEffect(() => {
        effect();
    },[])

    if(product.length === 0)
        return <div>Loading...</div>



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
                            {product !== undefined ? product?.map(p => <ProductItem
                            id={p.id}
                            name={p.name}
                            price={p.price}
                            rating={p.meanRating}
                            nOfRating={p.ratingCount}
                            img={MOCK_IMAGE}
                            />) : <></>}
                        </ProductBox>
                    </Container>
                </Box>
            </MainContainer>
        </>
    )
}