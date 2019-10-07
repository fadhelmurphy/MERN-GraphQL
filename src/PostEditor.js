import React from 'react';
import gql from 'graphql-tag';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { Form as FinalForm, Field } from 'react-final-form';

import client from './apollo';
import { GET_POSTS } from './PostViewer';

const SUBMIT_POST = gql`
  mutation Submit($input: PlayerInput!) {
    AddPlayer(data: $input) {
        _id
        name
        club
        position
        nationality
    }
  }
`

const DELETE_POST = gql`
  mutation Remove($id: ID!) {
    RemovePlayer(id: $id) {
        _id
        name
    }
  }
`
const deleteEvent = (aid,next)=>{
      client.mutate({
        variables: {
            id:aid
        },
        mutation: DELETE_POST,
        refetchQueries: () => [{ query: GET_POSTS }],
      });
      next()
      
}

const PostEditor = ({ post, onClose }) => (
  <FinalForm
    onSubmit={async ({ _id, name, club, position, nationality }) => {
      const input = { _id, name, club, position, nationality };

      console.log(input)

      await client.mutate({
        variables: { input },
        mutation: SUBMIT_POST,
        refetchQueries: () => [{ query: GET_POSTS }],
      });

      onClose();
    }}
    initialValues={post}
    render={({ handleSubmit, pristine, invalid }) => (
      <Modal isOpen toggle={onClose}>
        <Form onSubmit={handleSubmit}>
            {console.log(post._id)}
          <ModalHeader toggle={onClose}>
            {post._id ? 'Edit Post' : 'New Post'}
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Nama</Label>
              <Field
                required
                name="name"
                className="form-control"
                component="input"
              />
            </FormGroup>
            <FormGroup>
              <Label>Club</Label>
              <Field
                required
                name="club"
                className="form-control"
                component="input"
              />
            </FormGroup>
            <FormGroup>
              <Label>Position</Label>
              <Field
                required
                name="position"
                className="form-control"
                component="input"
              />
            </FormGroup>
            <FormGroup>
              <Label>Nationality</Label>
              <Field
                required
                name="nationality"
                className="form-control"
                component="input"
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" disabled={pristine} color="primary">Save</Button>
            <Button type="button" color="danger" onClick={deleteEvent.bind(this, post._id,onClose)}>Delete</Button>
            <Button color="secondary" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )}
  />
);

export default PostEditor;