import React from 'react';
import expect from 'expect';
import { render, shallow } from 'enzyme';

import Html from '../../src/helpers/html.js';

describe('<Html /> helper', () => {

  it('should be an html block', () => {
    const html = shallow(<Html />);

    expect(html.type()).toEqual('html');
  });

  it('should render content given as prop', () => {
    const content = <span>test</span>;
    // because of dangerouslySetInnerHTML we need to do static render instead of shallow
    const html = render(<Html component={ content } />);

    expect(html.find('#content').children('span').length).toEqual(1);
    expect(html.find('#content').text()).toEqual('test');
  });

  it('should render stylesheet links in head', () => {
    const html = shallow(<Html />);

    expect(html.find('body link[rel="stylesheet"]').length).toEqual(0);
    expect(html.find('head link[rel="stylesheet"]').length).toEqual(1);
  });

  it('should render title', () => {
    const html = shallow(<Html title="test title"/>);

    expect(html.find('title').text()).toEqual('test title');
  });
});
