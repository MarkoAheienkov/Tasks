import Section from "../Section";

const Sections = ({sections, onChange, addImage, onChangeImage, onRemoveSection, onRemoveImage}) => {
  return sections.map(({id, title, images, text, section_id}) => {
    return <Section 
                key={id || section_id}
                addImage={addImage}
                images={images}
                id={id || section_id}
                title={title}
                text={text}
                onChange={onChange}
                onChangeImage={onChangeImage}
                onRemoveImage={onRemoveImage}
                onRemoveSection={onRemoveSection}
                />;
  });
};

export default Sections;
