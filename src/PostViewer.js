import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Table } from 'reactstrap';

export const GET_POSTS = gql`
  query{
    Players{
        _id
        name
        club
        position
        nationality
    }
  }
`;
const rowStyles = (post, canEdit) => canEdit(post)
? { cursor: 'pointer', fontWeight: 'bold' }
: {};
const PostViewer = ({ canEdit, onEdit }) => (
  <Query query={GET_POSTS}>
    {({ loading, data }) => !loading && (
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Club</th>
          </tr>
        </thead>
        <tbody>
          {data.Players.map(post => (
            <tr
            key={post._id}
            style={rowStyles(post, canEdit)}
            onClick={() => canEdit(post) && onEdit(post)}
            >
              <td>{post.name}</td>
              <td>{post.club}</td>
            </tr>
          ))}
          
        </tbody>
      </Table>
    )}
  </Query>
);

PostViewer.defaultProps = {
    canEdit: () => false,
    onEdit: () => null,
};
  
  export default PostViewer;