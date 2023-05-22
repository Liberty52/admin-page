import request from "./axios";
import {
    ADD_PRODUCT_OPTION_DETAIL,
    DELETE_PRODUCT_OPTION_DETAIL,
    PRODUCT_DETAIL,
    PRODUCT_LIST,
    PRODUCT_OPTION_LIST
} from "../constants/api";
import {ACCESS_TOKEN} from "../constants/token";

export  const retrieveProduct = () =>{
    return request.get(PRODUCT_LIST(),{
        headers : {
            Authorization : sessionStorage.getItem(ACCESS_TOKEN)
        }
    })
}

export  const retrieveProductDetail = (productId) =>{
    return request.get(PRODUCT_DETAIL(productId),{
        headers : {
            Authorization : sessionStorage.getItem(ACCESS_TOKEN)
        }
    })
}

export const retrieveProductOptionList = (productId)=>{
    return request.get(PRODUCT_OPTION_LIST(productId),{
        headers : {
            Authorization : sessionStorage.getItem(ACCESS_TOKEN)
        }
    })
}

export const addOptionDetail = (optionId, data) => {
    return request.post(ADD_PRODUCT_OPTION_DETAIL(optionId),
        data
        ,{
        headers : {
            Authorization : sessionStorage.getItem(ACCESS_TOKEN)
        }
    })
}

export const deleteOptionDetail = (optionDetailId, data) => {
    return request.delete(DELETE_PRODUCT_OPTION_DETAIL(optionDetailId),{
        data : data,
        headers : {
            Authorization : sessionStorage.getItem(ACCESS_TOKEN)
        }
    })

}