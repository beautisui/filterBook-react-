import React, { Component } from "react";

class SearchBar extends Component {
  render() {
    const { filterField, onFilterChange, searchText, onSearchChange } =
      this.props;

    return (
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={onSearchChange}
        />
        <select value={filterField} onChange={onFilterChange}>
          <option value="Title">Title</option>
          <option value="Author">Author</option>
          <option value="Year">Year</option>
        </select>
      </div>
    );
  }
}

class Library extends Component {
  constructor(props) {
    super(props);
    this.books = [
      { Title: "Great Expectations", Author: "Charles Dickens", Year: 1860 },
      { Title: "War and Peace", Author: "Leo Tolstoy", Year: 1869 },
      { Title: "The Great Gatsby", Author: "F. Scott Fitzgerald", Year: 1925 },
      { Title: "To Kill a Mockingbird", Author: "Harper Lee", Year: 1960 },
      { Title: "Pride and Prejudice", Author: "Jane Austen", Year: 1813 },
      { Title: "1984", Author: "George Orwell", Year: 1949 },
      { Title: "The Catcher in the Rye", Author: "J.D. Salinger", Year: 1951 },
      {
        Title: "One Hundred Years of Solitude",
        Author: "Gabriel García Márquez",
        Year: 1967,
      },
      { Title: "Brave New World", Author: "Aldous Huxley", Year: 1932 },
      { Title: "The Lord of the Rings", Author: "J.R.R. Tolkien", Year: 1954 },
      {
        Title: "Crime and Punishment",
        Author: "Fyodor Dostoevsky",
        Year: 1866,
      },
      { Title: "The Hobbit", Author: "J.R.R. Tolkien", Year: 1937 },
      { Title: "Moby-Dick", Author: "Herman Melville", Year: 1851 },
      { Title: "Jane Eyre", Author: "Charlotte Brontë", Year: 1847 },
      { Title: "Wuthering Heights", Author: "Emily Brontë", Year: 1847 },
      { Title: "Don Quixote", Author: "Miguel de Cervantes", Year: 1605 },
      { Title: "The Odyssey", Author: "Homer", Year: "800 BCE" },
      { Title: "Anna Karenina", Author: "Leo Tolstoy", Year: 1877 },
      {
        Title: "The Brothers Karamazov",
        Author: "Fyodor Dostoevsky",
        Year: 1880,
      },
      {
        Title: "The Picture of Dorian Gray",
        Author: "Oscar Wilde",
        Year: 1890,
      },
      { Title: "Frankenstein", Author: "Mary Shelley", Year: 1818 },
      { Title: "Dracula", Author: "Bram Stoker", Year: 1897 },
      {
        Title: "The Count of Monte Cristo",
        Author: "Alexandre Dumas",
        Year: 1844,
      },
      { Title: "Les Misérables", Author: "Victor Hugo", Year: 1862 },
    ];

    this.state = {
      books: this.books,
      searchText: "",
      filterField: "Title",
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleSearchChange(event) {
    this.setState({ searchText: event.target.value });
  }

  handleFilterChange(event) {
    this.setState({ filterField: event.target.value });
  }

  getFilteredBooks() {
    const { searchText, filterField } = this.state;
    if (!searchText) return this.books;

    return this.books.filter((book) =>
      book[filterField]
        .toString()
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }

  render() {
    const { searchText, filterField } = this.state;
    const filteredBooks = this.getFilteredBooks();

    return (
      <div>
        <h2>Search Book</h2>

        <SearchBar
          searchText={searchText}
          filterField={filterField}
          onSearchChange={this.handleSearchChange}
          onFilterChange={this.handleFilterChange}
        />

        <table border="1" cellPadding="5" cellSpacing="0">
          <caption>
            <strong>Book Collection</strong>
          </caption>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book, index) => (
              <tr key={index}>
                <td>{book.Title}</td>
                <td>{book.Author}</td>
                <td>{book.Year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Library;
