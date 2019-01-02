import React, { Fragment } from "react";
// Main
import { List, Avatar, Icon, Card, Button } from 'antd';
import { message } from "antd/lib/index";

class ProjectListPage extends React.Component {
  static group = "project";

  static keyName = "project.list";

  constructor(props) {
    super(props);
    this.state = {};


  }


  componentDidMount() {
  };

  render() {
    const {data, visible, editing} = this.state;
    return (
      <Fragment>
        <div>Project List</div>
      </Fragment>

    )
  }

}

export default ProjectListPage;
