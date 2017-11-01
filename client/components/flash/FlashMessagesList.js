import React from 'react';
import PropTypes from 'prop-types';
import FlashMessage from './FlashMessage';
import { connect } from 'react-redux';
import { deleteFlashMessage } from '../../actions/flashMessages';

class FlashMessagesList extends React.Component {
    render() {
        const messages = this.props.messages.map(messages =>
            <FlashMessage key={messages.id} message={message}  deleteFlashMessage={this.props.deleteFlashMessage}/>
        );
        return (
            <div>{messages}</div>
        );
    }
}

FlashMessagesList.propTypes = {
    messages: PropTypes.array.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        messages: state.flashMessages
    }
}

export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessagesList);