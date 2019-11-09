import React from "react";
import { Link } from "react-router-dom";

class NewBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            author: "",
            about: "",
            image: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
    }

    stripHtmlEntities(str) {
        return String(str)
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
      }
    
      onSubmit(event) {
        event.preventDefault();
        const url = "/api/v1/books/create";
        const { title, author, about } = this.state;
    
        if (title.length == 0 || author.length == 0 || about.length == 0)
          return;
    
        const body = {
          title,
          author,
          about: about.replace(/\n/g, "<br> <br>")
        };
    
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
          method: "POST",
          headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => this.props.history.push(`/book/${response.id}`))
          .catch(error => console.log(error.message));
      }

      render() {
        return (
          <div className="container mt-5">
            <div className="row">
              <div className="col-sm-12 col-lg-6 offset-lg-3">
                <h1 className="font-weight-normal mb-5">
                  Add a new book to our awesome book collection.
                </h1>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="bookTitle">Title</label>
                    <input
                      type="text"
                      name="title"
                      id="bookTitle"
                      className="form-control"
                      required
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="bookAuthor">Author</label>
                    <input
                      type="text"
                      name="author"
                      id="bookAuthor"
                      className="form-control"
                      required
                      onChange={this.onChange}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                      type="text"
                      name="image"
                      value={this.state.image}
                      id="image"
                      className="form-control"
                      required
                      onChange={this.onChange}
                    />
                    </div>
                  <label htmlFor="about">Tell us about the book!</label>
                  <textarea
                    className="form-control"
                    id="about"
                    name="about"
                    rows="5"
                    required
                    onChange={this.onChange}
                  />



                  <button type="submit" className="btn custom-button mt-3">
                    Create Book
                  </button>
                  <Link to="/books" className="btn btn-link mt-3">
                    Back to Books
                  </Link>
                </form>
              </div>
            </div>
          </div>
        );
      }
}
export default NewBook;