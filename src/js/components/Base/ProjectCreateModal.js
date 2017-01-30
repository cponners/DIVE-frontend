import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createProject } from '../../actions/ProjectActions.js';
import styles from '../App/App.sass';

import { Button, Classes, Dialog } from '@blueprintjs/core';

import RaisedButton from './RaisedButton';
import Input from './Input';
import TextArea from './TextArea';

class ProjectCreateModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectTitle: this.props.projectTitle,
      projectDescription: this.props.projectDescription
    };
  }

  submit = () => {
    const { createProject, closeAction, userId } = this.props;
    const { projectTitle, projectDescription } = this.state;

    createProject(userId, projectTitle, projectDescription);
    closeAction();
  }

  enteredProjectNameInput(event) {
    this.setState({ projectTitle: event.target.value });
  }

  enteredProjectDescriptionInput(event) {
    this.setState({ projectDescription: event.target.value });
  }

  render() {
    const { closeAction, isOpen } = this.props;
    const { projectTitle, projectDescription } = this.state;

    return (
      <Dialog
        onClose={ closeAction }
        title='Create New Project'
        isOpen={ isOpen }
      >
        <div className={ Classes.DIALOG_BODY }>
           <div className={ styles.controlSection }>
              <div className={ styles.label }>Title</div>
              <Input
                type="text"
                placeholder={ projectTitle }
                autofocus={ true }
                onChange={ this.enteredProjectNameInput.bind(this) }/>
            </div>
            <div className={ styles.controlSection }>
              <div className={ styles.label }>Description</div>
              <TextArea
                className='pt-input pt-fill'
                type="textarea"
                placeholder={ projectDescription }
                onChange={ this.enteredProjectDescriptionInput.bind(this) }/>
            </div>
        </div>
        <div className={ Classes.DIALOG_FOOTER }>
            <div className={ Classes.DIALOG_FOOTER_ACTIONS }>
                <Button className="pt-intent-primary" onClick={ this.submit }>Create</Button>
            </div>
        </div>
      </Dialog>
    );
  }
}

ProjectCreateModal.propTypes = {
  userId: PropTypes.number.isRequired,
  projectTitle: PropTypes.string,
  projectDescription: PropTypes.string,
  closeAction: PropTypes.func,
  isOpen: PropTypes.bool
};

ProjectCreateModal.defaultProps = {
  projectTitle: 'Project Title',
  projectDescription: 'Project Description',
  isOpen: false
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, { createProject })(ProjectCreateModal);