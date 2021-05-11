import Section from "../Section";

const Sections = ({sections}) => {
  return sections.map(({title, text, images, id}) => {
    return <Section key={id} title={title} text={text} images={images}/>;
  });
};

export default Sections;
