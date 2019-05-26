import React, { Component } from "react";
import axios from "axios";
import "./App.css";


const apiEndPoint = "https://jsonplaceholder.typicode.com/posts";
class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount(){
    //promise as it is async request need more time
    //pending  > resolved (success ) Reject(faliure)
    const {data: posts} = await axios.get(apiEndPoint);
    this.setState({posts});
  }

   handleAdd = async () => {
    const object = {title: 'a', body: "test"};
    const {data: post} = await axios.post(apiEndPoint, object);
    const posts = [post, ...this.state.posts]
    this.setState({posts});
  };

  handleUpdate = async post => {
    post.title = "updated Title";
    await axios.put(apiEndPoint + '/' + post.id, post); //update all objcet
    // axios.patch(apiEndPoint + '/' + post.id , {title: post.title}); //specific item

    const posts = [...this.state.posts];
    const index  = posts.indexOf(post);
    post[index] = {...post};
    this.setState({posts});
  };

  handleDelete = async post => {
    await axios.delete(apiEndPoint + '/' + post.id);
    const posts = this.state.posts.filter( p => p.id !== post.id);
    this.setState({posts});
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
