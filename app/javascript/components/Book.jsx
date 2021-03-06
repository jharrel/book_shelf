import React from "react";
import { Link } from "react-router-dom";
import Counter from '../components/counter';
class Book extends React.Component {
    constructor(props) {
      super(props);
      this.state = { book: { author: "" } };
      this.addHtmlEntities = this.addHtmlEntities.bind(this);
      this.deleteBook = this.deleteBook.bind(this);
    }


    // state = {
    //   count: 0
    // }


    // incrementMe = () => {
    //   let newCount = this.state.count + 1
    //   this.setState({
    //     count: newCount
    //   })
    //   console.log("like")
    // }

    componentDidMount() {
        const {
          match: {
            params: { id }
          }
        } = this.props;
    
        const url = `/api/v1/show/${id}`;
    
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => this.setState({ book: response }))
          .catch(() => this.props.history.push("/books"));
      }

      addHtmlEntities(str) {
        return String(str)
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">");
      }

      deleteBook() {
        const {
          match: {
            params: { id }
          }
        } = this.props;
        const url = `/api/v1/destroy/${id}`;
        const token = document.querySelector('meta[name="csrf-token"]').content;
    
        fetch(url, {
          method: "DELETE",
          headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
          }
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(() => this.props.history.push("/books"))
          .catch(error => console.log(error.message));
      }

  render() {
    const { book } = this.state;
    let authorList = "No books available";
    
    if (book.author.length > 0) {
      authorList = book.author
      .split(",")
      .map((author, index) => (
          <li key={index} className="list-group-item">
              {author}
          </li>
            ));
        }
        const bookAuthor = this.addHtmlEntities(book.author);
    
        return (
          <div className="">
            <div className="hero position-relative d-flex align-items-center justify-content-center">
              <img
                src={book.image}
                alt={`${book.image} image`}
                className="img-fluid position-absolute"
              />

              <div className="overlay bg-dark position-absolute" />
              <h1 className="display-4 position-relative text-white">
                {book.title}
              </h1>
            </div>

            <div class="row">
              <div class="col-12 px-md-5 col-md-8 p-3 border bg-light">
                <h2 className="mb-2">Author: {book.author}</h2></div>
                <div class="col-12 px-md-5 col-md-8 p-3 border bg-light">
                <h2 className="mb-2">Description</h2>
                {book.about}</div>
              <div class="col-6 col-md-4 p-3 bg-light">
                <img src={book.image} alt={`${book.name}`}/>
              </div>
            </div>
              {/* <button onClick={this.incrementMe}> Likes: {this.state.count} </button> */}
              
              <div className="col-sm-12 col-sm-2">
                <Link to="/books" className="btn btn-lg custom-button" role="button">
                Back to your book list 
                </Link>
                <button type="button" className="btn btn-lg btn-danger" onClick={this.deleteBook}>
                    Delete Book
                </button>
              </div>
          </div>
        );
        
      }
  }
  
  export default Book;