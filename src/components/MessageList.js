import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      messages: [],
      message: ''
  }

    this.handleChange = this.handleChange.bind(this);
    this.messagesRef = this.props.firebase.database().ref('messages');

  }

   handleSubmit(e) {
     e.preventDefault();
     var message = {
       user: this.props.user,
       text: this.state.text
     }
     this.props.onMessageSubmit(message);
     this.setState({ text : ''});
   }

   handleChange(e) {
     this.setState({text: e.target.value});
   }

   componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
        const messages = snapshot.val();
        this.setState({ messages: this.state.messages.concat( messages ) });
           });
   }

  render() {
    return (
      <div className = 'messages'>
      <input type="text" value={this.state.message} onChange={this.handleChange.bind(this)} />
      <form onSubmit={ (e) => this.handleSubmit(e) }>
      <button type="submit">Submit</button>
      <label>
        Messages:
       </label>
        <span> {this.state.description} </span>
        </form>
        <ul>
          {
             this.state.messages.map((message, i) => {
               return (
                <div>
                  {message.username}
                </div>
           )
        }
    });
         </ul>
       </div>
    )
}


export default MessageList;