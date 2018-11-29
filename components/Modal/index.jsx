import {Modal} from 'antd';

class LocalizedModal extends React.Component {
  state = {
    source: this.props.source ? this.props.source : null,
    visible: this.props.visible ? this.props.visible : false,
    toggleVisible: this.props.toggleVisible ? this.props.toggleVisible : () => {
    },
    edited: null
  };

  componentWillReceiveProps(nextProps) {
    // console.log("modal.nextProps", nextProps)
    if (nextProps.visible !== this.props.visible && nextProps.source !== this.props.source) {
      this.setState({visible: nextProps.visible, source: nextProps.source}, () => {
        // console.log("modal.state", this.state)
      })
    }
  }

  hideModal = (data) => {
    // console.log('data', data);
    this.setState({
      visible: false,
      source: null,
    }, () => {
      if (data && typeof data === 'object') {
        // 清空掉父级的editing 将更新的数据传回
        // console.log("this.state", this.state)

        this.props.toggleVisible(false, null, data);
      }
      else {
        this.props.toggleVisible(false);
      }
      // console.log("this.state", this.state)
    });
  };

  render() {
    const {source, visible} = this.state;
    return (
      <div>
        <Modal
          title={this.props.source ? `编辑分类 - ` + this.props.source.title : `编辑`}
          visible={visible}
          onCancel={() => this.hideModal()}
          footer={null}
          width="1000px"
          destroyOnClose={true}
        >
          {this.props.children}
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