import ImageInput from "./ProductIntroImageInput";
import { Button } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { addProductIntroduction } from "../../axios/Product";

export default function ProductIntroPanel({ introductionImageUrl }) {
  const { productId } = useParams();
  const [imgFile, setImgFile] = useState(introductionImageUrl);

  async function upload(productId, imgFile) {
    if (imgFile) {
      const response = await addProductIntroduction(productId, imgFile);
      if (response.status === 201) alert("소개 이미지 변경 성공!");
      else alert(`[${response.status} ERROR] 소개 이미지 변경 실패.`);
    } else alert("소개 이미지를 수정한 후 업로드가 가능합니다.");
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const imgFile = event.target.file.files[0];
        upload(productId, imgFile);
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 10,
        }}
      >
        <Button
          type="button"
          sx={{ marginRight: 1, color: "black", borderColor: "black" }}
          variant="outlined"
          disabled={imgFile === null}
          onClick={() => {
            // [TODO] 상품 소개 미리보기
            window.alert("구현되지 않은 기능입니다.");
            // window.open(
            //   "https://liberty52.com/order",
            //   "_blank",
            //   "noopener, noreferrer"
            // );
          }}
        >
          미리보기
        </Button>
        <Button
          type="submit"
          sx={{ fontWeight: "bold" }}
          variant="outlined"
          disabled={imgFile === null}
        >
          업로드
        </Button>
      </div>
      <ImageInput imgFile={imgFile} setImgFile={setImgFile} />
    </form>
  );
}
