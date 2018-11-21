import {Modal} from 'antd';

import UpdateComponent from "./book.category.update";

class LocalizedModal extends React.Component {
  state = {
    source: this.props.source ? this.props.source : null,
    visible: this.props.visible ? this.props.visible : false,
    toggleVisible: this.props.toggleVisible ? this.props.toggleVisible : () => {
    },
  };

  componentWillReceiveProps(nextProps) {
    // console.log("modal.nextProps", nextProps)
    if (nextProps.visible !== this.props.visible && nextProps.source !== this.props.source) {
      this.setState({visible: nextProps.visible, source: nextProps.source}, () => {
        console.log("modal.state", this.state)
      })
    }
  }

  hideModal = () => {
    this.setState({
      visible: false,
      source: null
    }, () => {
      this.state.toggleVisible(false)
    });
  };

  render() {
    const {source} = this.state;
    return (
      <div>
        {/*<Button type="primary" onClick={this.showModal}>Modal</Button>*/}
        <Modal
          title="Modal"
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
          width="1000px"
          destroyOnClose={true}
        >
          <UpdateComponent source={source}/>
        </Modal>
      </div>
    );
  }
}

function confirm() {
  Modal.confirm({
    title: 'Confirm',
    content: 'Bla bla ...',
    okText: '确认',
    cancelText: '取消',
  });
}

export default LocalizedModal