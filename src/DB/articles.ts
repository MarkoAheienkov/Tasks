import ArticleData from '../Interfaces/Data/Article';

const articlesDB = {
  articles: [
    {
      id: '1',
      title: 'Article 1',
      body: '<p>Some text for article 1</p>',
      creator: '1',
      approved: true,
    },
    {
      id: '2',
      title: 'Article 2',
      body: '<p>Some text for article 2</p>',
      creator: '2',
      approved: false,
    },
  ],
  setArticles(articles: Array<ArticleData>): void {
    this.articles = [...articles];
  },
};

export default articlesDB;
