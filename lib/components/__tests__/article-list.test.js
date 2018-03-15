import React from 'react';
import ArticleList from '../article-list';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('ArticleList', () => {
  const testProps = {
    articles: {
      a: {
        id: 'a',
        title: 'a',
        date: 'a',
        authorId: 'a',
        body: 'a'
      },
      b: {
        id: 'b',
        title: 'b',
        date: 'b',
        authorId: 'b',
        body: 'b'
      }
    }
  };
  it('renders correctly', () => {
    const wrapper = shallow(
      <ArticleList
        {...testProps}
      />
    );
    expect(wrapper.find('ArticleContainer').length).toBe(2);
    expect(wrapper).toMatchSnapshot();
  });
});
