import Section from "../Section";

const Sections = ({sections = []}) => {
  return sections.map(({title, text, images, id, section_id}) => {
    return <Section key={id | section_id} title={title} text={text} images={images}/>;
  });
};

export default Sections;
