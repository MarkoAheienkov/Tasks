import classes from './Section.module.css';

const Section = ({title, images=[], text}) => {
  return <section>
    <h2 className={classes.Subtitle}>{title}</h2>
    <p className={classes.Text}>{text}</p>
    <div className={classes.Images}>
      {images.map(({value, id, image_id, image_url}) => {
        return <img className={classes.Img} src={value || image_url} alt={title} key={id || image_id}/>;
      })}
    </div>
  </section>;
};

export default Section;
