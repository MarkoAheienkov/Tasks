import axios from "../../Axios";
import { useEffect, useState } from "react";
import Sections from "../../Components/CreateArticle/Sections";
import Button from "../../Components/UI/Button"
import Input from "../../Components/UI/Inputs";
import { useHistory, useParams } from "react-router";

const UpdateArticle = () => {
  const [title, setTitle] = useState('');
  const [cover, setCover] = useState('');
  const [sections, setSections] = useState([]);
  const history = useHistory();

  const {id} = useParams();

  const getArticle = async (id) => {
    try {
      const res = await axios.get(`/articles/${id}`);
      const article = res.data;
      setTitle(article.title);
      setCover(article.cover);
      setSections(article.sections);
    } catch (err) {
      console.log('[UpdateArticle, getArticle]', err);
    }
  };

  useEffect(() => {
    getArticle(id);
  }, [id]);

  const onSubmit = async (event) => {
    try {
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
      await axios.put(`/articles/${id}`, body);
      history.push('/articles');
    } catch (err) {
      console.log('[UpdateArticle, onSubmit]', err);
    }
  };

  const onAddSection = () => {
    const section = {
      title: '',
      text: '',
      section_id: Math.round(Math.random()*100000),
      images: [],
    };
    const newSections = [...sections];
    newSections.push(section);
    setSections(newSections);
  };

  const addImage = (event, id) => {
    const image = {
      image_url: '',
      image_id: Math.round(Math.random()*100000),
    }
    const newSections = [...sections];
    const idx = newSections.findIndex((section) => section.section_id === id);
    newSections[idx] = {...newSections[idx]};
    newSections[idx].images = [...newSections[idx].images];
    newSections[idx].images.push(image);
    setSections(newSections); 
  };

  const onChangeImage = (event, sectionId, imageId) => {
    const newSections = [...sections];
    const idx = newSections.findIndex((section) => section.section_id === sectionId);
    newSections[idx] = {...newSections[idx]};
    newSections[idx].images = [...newSections[idx].images];
    const imageIdx = newSections[idx].images.findIndex(({image_id}) => image_id === imageId);
    newSections[idx].images[imageIdx] = {...newSections[idx].images[imageIdx]};
    newSections[idx].images[imageIdx].value = event.target.value;
    setSections(newSections);
  };

  const onChangeSection = (event, id) => {
    const newSections = [...sections];
    const idx = newSections.findIndex((section) => section.section_id === id);
    newSections[idx] = {...newSections[idx]};
    newSections[idx][event.target.name] = event.target.value;
    setSections(newSections);
  }

  const onRemoveSection = (id) => {
    const newSections = sections.filter((section) => section.section_id !== id);
    setSections(newSections);
  };

  const onRemoveImage = (sectionId, imageId) => {
    const newSections = [...sections];
    const idx = newSections.findIndex((section) => section.section_id === sectionId);
    newSections[idx] = {...newSections[idx]};
    newSections[idx].images = newSections[idx].images.filter((image) => image.image_id !== imageId);
    setSections(newSections);
  }; 

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

      <Sections
      addImage={addImage}
      onChange={onChangeSection}
      onChangeImage={onChangeImage}
      onRemoveImage={onRemoveImage}
      onRemoveSection={onRemoveSection}
      sections={sections}/>

      <Button btnType={'primary'} type="button" click={onAddSection}>Add Section</Button>
      <br/>
      <Button btnType={'primary'} type="submit" >Submit</Button>
    </form>
  </section>
};

export default UpdateArticle;
