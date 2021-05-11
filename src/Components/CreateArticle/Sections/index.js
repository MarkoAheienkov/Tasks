import Section from "../Section";

const Sections = ({sections, onChange, addImage, onChangeImage}) => {
  return sections.map(({id, title, images, text}) => {
    return <Section 
                key={id}
                addImage={addImage}
                images={images}
                id={id}
                title={title}
                text={text}
                onChange={onChange}
                onChangeImage={onChangeImage}
                />;
  });
};

export default Sections;
