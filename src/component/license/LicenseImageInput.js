import { Label } from "@mui/icons-material";
import React, {useState, useEffect} from 'react';

export default function LicenseImageInput(props){

    const {imgFile, setImgFile} = props;
    const [fileUrl, setFileUrl] = useState("");
    const reader = new FileReader();

    const handleFileOnChange = async (e) => {
        let file = e.target.files[0];   //입력받은 파일 객체


        //이미지 resize옵션 설정
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 100
        }

        // try{
            // const compressionFile = await imageCompression(file, options);
            // setImgFile(compressionFile);

            //resize된 이미지의 url을 받아 fileUrl에 저장
            // const promise = imageCompression.getDataUrlFromFile(compressionFile);
            // promise.then(result => {
                // setImgFile(result);
        //     })
        // } catch(error){
        //     console.log(error);
        // }

    }

    // const handleImageUpload = (fileBlob) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(fileBlob);

    //     return new Promise((reslove) => {
    //         reader.onload = () => {
    //             reslove();
    //         };
    //     });
    // };

    return (
        <>
        <form id="license-image-input">

              <label className="RegisterLabel"></label>


            <input
                className="LicenseImageRegister"
                type="file"
                name="image-file"
                accept="image/*"
                onChange={(e) => {

                    const imagefile = e.target.files[0];

                    if(imagefile){
                        reader.readAsDataURL(imagefile);
                        reader.onloadend = () => {
                            
                            setImgFile(reader.result);
                            // const img = e.target.parentNode.children[0].children[0];
                            // img.src = imgFile;
                          };
                    }    
                    
                }}

            />
            <div className="preview">
                {/* {imgFile && <img src={imgFile} src={imgFile} alt="preview"/>} */}
            </div>

           
           

        </form>
       
        <img
                className="image-preview"

                src={imgFile}
                alt=""
            />
        </>
        
    );
}