import { EntityRepository, Repository } from 'typeorm';
import Articles from '../../Entities/article';
import Images from '../../Entities/image';
import Sections from '../../Entities/section';
import Users from '../../Entities/user';
import constructLocationError from '../../Helpers/constructLocationError';
import { LOCATIONS } from './constants';

@EntityRepository(Articles)
class ArticleRepository extends Repository<Articles> {
  async getFullArticle(id: string): Promise<any> {
    try {
      const manager = this.manager;
      const articleRepository = manager.getRepository(Articles);
      const article = await articleRepository.findOne({
        where: [{ article_id: id }],
        relations: ['sections', 'sections.images'],
      });
      return article;
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.CREATE_AND_SAVE,
      );
      throw locationError;
    }
  }
  async createAndSave(
    articleData: any,
    creator: Users,
    articleId?: number,
  ): Promise<void> {
    try {
      const manager = this.manager;
      const articleRepository = manager.getRepository(Articles);
      const sectionRepository = manager.getRepository(Sections);
      const imageRepository = manager.getRepository(Images);
      const article = new Articles();
      const { title, cover, sections } = articleData;
      article.approved = false;
      article.cover = cover;
      article.title = title;
      article.creator = creator;
      if (articleId) {
        article.article_id = articleId;
      }
      await articleRepository.save(article);
      const promises: Array<Promise<any>> = sections.map(
        async (sectionData: any) => {
          const { title, text, images } = sectionData;
          const section = new Sections();
          section.article_id = article.article_id;
          section.text = text;
          section.title = title;
          await sectionRepository.save(section);
          const promises: Array<Promise<any>> = images.map((imageData: any) => {
            const { value } = imageData;
            const image = new Images();
            image.image_url = value;
            image.section_id = section.section_id;
            return imageRepository.save(image);
          });
          await Promise.all(promises);
        },
      );
      await Promise.all(promises);
    } catch (err) {
      const locationError = constructLocationError(
        err,
        LOCATIONS.CREATE_AND_SAVE,
      );
      throw locationError;
    }
  }
}

export default ArticleRepository;
