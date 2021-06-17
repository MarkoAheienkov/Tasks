import classes from "./Section.module.css";
import Button from "../../UI/Button";
import Input from "../../UI/Inputs"
import { ImCross } from 'react-icons/im'

const Section = ({id, section_id, text, title, images, onChange, addImage, onChangeImage, onRemoveSection, onRemoveImage}) => {
  return <section className={classes.Section}>
    <Input
        label="Section Title"
        id={id}
        name={'title'}
        placeholder={'Write Section Title...'}
        onChange={(event) => {
          onChange(event, id || section_id);
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
          onChange(event, id || section_id);
        }}
        value={text}
        type="textarea"
    />
    {images.map(({value, id: imgId, image_id, image_url}) => {
      return <article className={classes.ImageAdd}>
        <Input
          key={imgId || image_id}
          label="Image URL"
          id={imgId || image_id}
          name={'text'}
          placeholder={'Write Image URL...'}
          onChange={(event) => {
            onChangeImage(event, id || section_id, imgId || image_id);
          }}
          value={value || image_url}
          type="text"
        />
        <ImCross className={classes.Cross} onClick={() => {onRemoveImage(id || section_id, imgId || image_id)}}/>
      </article>;
    })}
    <Button 
        type="button"
        click={(event) => {
          addImage(event, id || section_id);
        }}
        btnType="primary">Add Image</Button>
    <ImCross className={classes.Cross} onClick={() => {onRemoveSection(id || section_id)}}/>
    <br/>
  </section>;
};

export default Section;
