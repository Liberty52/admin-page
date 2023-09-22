import ImageInput from "./ProductIntroImageInput";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import example from "../../image/preview-example.png";

export default function ProductIntroPanel() {
  const [imgFile, setImgFile] = useState(undefined);

  useEffect(() => {
    // TODO - 현재 소개 이미지 가져와져 set
    setImgFile(example);
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 10,
        }}
      >
        <Button
          sx={{ marginRight: 1, color: "black", borderColor: "black" }}
          variant="outlined"
          disabled={imgFile === undefined}
          onClick={() => {
            window.alert(
              "구현되지 않은 기능입니다. liberty 52 order 화면을 보여줍니다."
            );
            window.open(
              "https://liberty52.com/order",
              "_blank",
              "noopener, noreferrer"
            );
          }}
        >
          미리보기
        </Button>
        <Button
          sx={{ fontWeight: "bold" }}
          variant="outlined"
          disabled={imgFile === undefined}
          onClick={() => {
            window.alert("구현되지 않은 기능입니다. axios post");
            // 업로드
          }}
        >
          업로드
        </Button>
      </div>
      <ImageInput imgFile={imgFile} setImgFile={setImgFile} />
    </>
  );
}
