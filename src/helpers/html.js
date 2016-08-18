import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';

export default class Html extends Component {

  render() {
    const { component } = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';

    return (
      <html lang="en">
        <head>
          <title>{this.props.title}</title>
          <meta name="description" content={this.props.description} />
          <link rel="stylesheet" href="/static/style.css" />
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{ __html: content }}/>
          <script src="/static/bundle.js" />
        </body>
      </html>
    );
  }
}

Html.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  component: PropTypes.node,
  assets: PropTypes.object
};
