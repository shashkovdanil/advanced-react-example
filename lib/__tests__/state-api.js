import StateApi from 'state-api';
import { data } from '../test-data';

const store = new StateApi(data);

describe('StateApi', () => {
  it('exposes articles as an object', () => {
    const { articles } = store.getState();
    const articleId = data.articles[0].id;
    const articleTitle = data.articles[0].title;

    expect(articles).toHaveProperty(articleId);
    expect(articles[articleId].title).toBe(articleTitle);
  });
  it('exposes authors as an object', () => {
    const { authors } = store.getState();
    const authorId = data.authors[0].id;
    const authorFirstName = data.authors[0].firstName;

    expect(authors).toHaveProperty(authorId);
    expect(authors[authorId].firstName).toBe(authorFirstName);
  });
});
