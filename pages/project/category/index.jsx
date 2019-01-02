import React, { Fragment } from "react";
// Main
import { List, Avatar, Icon, Card, Button } from 'antd';
import { message } from "antd/lib/index";

class ProjectCategoryPage extends React.Component {
  static group = "project";

  static keyName = "project.category.list";

  constructor(props) {
    super(props);
    this.state = {};

  }


  componentDidMount() {
  };

  render() {
    return (
      <Fragment>
        <div>Project Category List</div>
      </Fragment>

    )
  }

}

export default ProjectCategoryPage;
