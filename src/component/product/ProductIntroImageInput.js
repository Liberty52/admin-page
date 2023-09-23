import "./ProductIntroImageInput.css";
import Button from "../common/Button";
import plus from "../../image/icon/plus.png";

export default function ImageInput(props) {
  const { imgFile, setImgFile } = props;

  const reader = new FileReader();
  return (
    <div id="product-intro-image-input">
      <label
        style={{ width: imgFile ? "70%" : 300 }}
        className={imgFile ? "image-input value" : "image-input"}
      >
        <input
          className="image-input-input"
          type="file"
          name="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.currentTarget.files[0];
            if (file) {
              reader.readAsDataURL(file);
              reader.onloadend = () => {
                setImgFile(reader.result);
                const img = e.target.parentNode.children[1].children[1];
                img.src = imgFile;
              };
            }
          }}
        />
        <div className="image-crop">
          <Button
            type="button"
            text="삭제"
            onClick={(e) => {
              const label = e.target.parentNode.parentNode;
              const input = label.children[0];
              input.value = "";
              setImgFile(undefined);
            }}
          />
          <img
            className="image-preview"
            src={imgFile ? imgFile : plus}
            alt="product-introduction-img"
          />
        </div>
      </label>
    </div>
  );
}
