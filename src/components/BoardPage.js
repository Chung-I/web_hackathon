import React, { Component, PropTypes } from 'react';

class BoardTable extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>hi</th>
            <th>hi</th>
            <th>hi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ho</td>
            <td>ho</td>
            <td>ho</td>
          </tr>
          <tr>
            <td>ha</td>
            <td>ha</td>
            <td>ha</td>
          </tr>
          <tr>
            <td>he</td>
            <td>he</td>
            <td>he</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

class BoardPage extends Component {

  constructor() {
    super();
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    // fetch `/api/users` to get users and then set state...
    let url = 'https://www.dcard.tw/_api/forums/' +this.props.params.board + '/posts?popular=false';

    fetch(url).then(res => res.json())
    .then(json => {
      this.setState({ articles: json });
    });
  }

  render() {
    return (
      <table className="table table-responsive">
        <thead>
          <tr>
            <td>文章標題</td>
            <td>大學</td>
            <td>科系</td>
          </tr>
        </thead>
        <tbody>
          {this.state.articles.map(article => {
            const forumName = article.forumName.toLowerCase();
            const school = article.anonymousSchool ? '匿名' : article.school;
            const department = article.anonymousDepartment ? '匿名' : article.department;
            return (
              <tr>
                <td>
                  <a href={`#/${forumName}/${article.id}`}>{article.title}</a>
                </td>
                <td>{school}</td>
                <td>{department}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default BoardPage;
