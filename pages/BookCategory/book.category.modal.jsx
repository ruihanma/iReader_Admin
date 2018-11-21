import {Modal} from 'antd';

class LocalizedModal extends React.Component {
  state = {
    visible: this.props.visible ? this.props.visible : false,
    toggleVisible: this.props.toggleVisible ? this.props.toggleVisible : () => {
    },
  };

  componentWillReceiveProps(nextProps) {
    // console.log("modal.nextProps", nextProps)
    if(nextProps.visible !== this.props.visible){
      this.setState({visible: nextProps.visible})
    }

  }

  hideModal = () => {
    this.setState({
      visible: false,
    }, () => {
      this.state.toggleVisible(false)
    });
  };

  render() {
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
        >
          <p>Bla bla ...</p>
          <p>Bla bla ...</p>
          <p>Bla bla ...</p>
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