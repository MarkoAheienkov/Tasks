import axios from "../../Axios";
import { useState } from "react";
import Sections from "../../Components/CreateArticle/Sections";
import Button from "../../Components/UI/Button"
import Input from "../../Components/UI/Inputs";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [cover, setCover] = useState('');
  const [sections, setSections] = useState([]);
  const token = useSelector((state) => state.token);
  const history = useHistory();

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = {
      title,
      cover,
      sections,
    }
    const body = {
      title: data.title,
      cover: data.cover,
      sections: data.sections,
    };
    await axios.post(`/articles?auth=${token}`, body);
    history.push('/articles');
  };

  const onAddSection = () => {
    const section = {
      title: '',
      text: '',
      id: Math.round(Math.random()*100000),
      images: [],
    };
    const newSections = [...sections];
    newSections.push(section);
    setSections(newSections);
  };

  const addImage = (event, id) => {
    const image = {
      value: '',
      id: Math.round(Math.random()*100000),
    }
    const newSections = [...sections];
    const idx = newSections.findIndex((section) => section.id === id);
    newSections[idx] = {...newSections[idx]};
    newSections[idx].images = [...newSections[idx].images];
    newSections[idx].images.push(image);
    setSections(newSections); 
  };

  const onChangeImage = (event, sectionId, imageId) => {
    const newSections = [...sections];
    const idx = newSections.findIndex((section) => section.id === sectionId);
    newSections[idx] = {...newSections[idx]};
    newSections[idx].images = [...newSections[idx].images];
    const imageIdx = newSections[idx].images.findIndex(({id}) => id === imageId);
    newSections[idx].images[imageIdx] = {...newSections[idx].images[imageIdx]};
    newSections[idx].images[imageIdx].value = event.target.value;
    setSections(newSections);
  };

  const onChangeSection = (event, id) => {
    const newSections = [...sections];
    const idx = newSections.findIndex((section) => section.id === id);
    newSections[idx] = {...newSections[idx]};
    newSections[idx][event.target.name] = event.target.value;
    setSections(newSections);
  }

  return <section className='container'>
    <form onSubmit={onSubmit}>
      <Input 
          type="text"
          label="Title"
          name="title"
          placeholder="Write your title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          value={title}
      />
      <Input
          type="text"
          label="Cover"
          name="cover"
          placeholder="Write your cover"
          onChange={(event) => {
            setCover(event.target.value);
          }}
          value={cover}
      />

      <Sections addImage={addImage} onChange={onChangeSection} onChangeImage={onChangeImage} sections={sections}/>

      <Button btnType={'primary'} type="button" click={onAddSection}>Add Section</Button>
      <br/>
      <Button btnType={'primary'} type="submit" >Submit</Button>
    </form>
  </section>
};

export default CreateArticle;
