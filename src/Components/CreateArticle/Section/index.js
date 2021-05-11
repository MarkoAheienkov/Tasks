import Button from "../../UI/Button";
import Input from "../../UI/Inputs"

const Section = ({id, text, title, images, onChange, addImage, onChangeImage}) => {
  return <>
    <Input
        label="Section Title"
        id={id}
        name={'title'}
        placeholder={'Write Section Title...'}
        onChange={(event) => {
          onChange(event, id);
        }}
        value={title}
        type="text"
    />
    <Input
        label="Section Text"
        id={id}
        name={'text'}
        placeholder={'Write Section Text...'}
        onChange={(event) => {
          onChange(event, id);
        }}
        value={text}
        type="textarea"
    />
    {images.map(({value, id: imgId}) => {
      return <Input
        key={imgId}
        label="Image URL"
        id={imgId}
        name={'text'}
        placeholder={'Write Image URL...'}
        onChange={(event) => {
          onChangeImage(event, id, imgId);
        }}
        value={value}
        type="text"
      />
    })}
    <Button 
        type="button"
        click={(event) => {
          addImage(event, id);
        }}
        btnType="primary">Add Image</Button>
    <br/>
  </>;
};

export default Section;
