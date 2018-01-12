import React from 'react';
import { connect } from 'react-redux';
import FlashMessage from './FlashMessage';
import deleteFlashMessage from '../../actions/flashMessages/deleteFlashMessage';

class FlashMessagesList extends React.Component {
  render() {
    const messages = this.props.messages.map(messages => (
      <FlashMessage
        key={messages.id}
        message={message}
        deleteFlashMessage={this.props.deleteFlashMessage}
      />
    ));
    return <div>{messages}</div>;
  }
}

function mapStateToProps(state) {
  return {
    messages: state.flashMessages
  };
}

export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessagesList);
