import React from "react";
import { Link } from "react-router-dom";

class Book extends React.Component {
    constructor(props) {
      super(props);
      this.state = { book: { author: "" } };
  
      this.addHtmlEntities = this.addHtmlEntities.bind(this);
    }

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
            <div className="container py-5">
              <div className="row">
                <div className="col-sm-12 col-lg-3">
                  <ul className="list-group">
                    <h5 className="mb-2">Author</h5>
                    {authorList}
                  </ul>
                </div>
            <div className="container py-5">
              <div className="row">
                <div className="col-sm-12 col-lg-7">
                    <ul className="list-group">
                    <h5 className="mb-2">About</h5>
                    {book.about}
                    </ul>
                  {/* <div
                    dangerouslySetInnerHTML={{
                      __html: `${book.about}`
                    }}
                  /> */}
            </div>
                    </div>
                        </div>
                <div className="col-sm-12 col-lg-2">
                  <button type="button" className="btn btn-danger">
                    Delete Book
                  </button>
                </div>
              </div>
              <Link to="/books" className="btn btn-link">
                Back to books
              </Link>
            </div>
          </div>
        );
      }
  }
  
  export default Book;