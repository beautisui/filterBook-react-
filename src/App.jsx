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
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="year">Year</option>
        </select>
      </div>
    );
  }
}

class Library extends Component {
  constructor(props) {
    super(props);
    this.books = [
      { title: "Great Expectations", author: "Charles Dickens", year: 1860 },
      { title: "War and Peace", author: "Leo Tolstoy", year: 1869 },
      { title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
      { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
      { title: "Pride and Prejudice", author: "Jane Austen", year: 1813 },
      { title: "1984", author: "George Orwell", year: 1949 },
      { title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951 },
      {
        title: "One Hundred Years of Solitude",
        author: "Gabriel García Márquez",
        year: 1967,
      },
      { title: "Brave New World", author: "Aldous Huxley", year: 1932 },
      { title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954 },
      {
        title: "Crime and Punishment",
        author: "Fyodor Dostoevsky",
        year: 1866,
      },
      { title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 },
      { title: "Moby-Dick", author: "Herman Melville", year: 1851 },
      { title: "Jane Eyre", author: "Charlotte Brontë", year: 1847 },
      { title: "Wuthering Heights", author: "Emily Brontë", year: 1847 },
      { title: "Don Quixote", author: "Miguel de Cervantes", year: 1605 },
      { title: "The Odyssey", author: "Homer", year: "800 BCE" },
      { title: "Anna Karenina", author: "Leo Tolstoy", year: 1877 },
      {
        title: "The Brothers Karamazov",
        author: "Fyodor Dostoevsky",
        year: 1880,
      },
      {
        title: "The Picture of Dorian Gray",
        author: "Oscar Wilde",
        year: 1890,
      },
      { title: "Frankenstein", author: "Mary Shelley", year: 1818 },
      { title: "Dracula", author: "Bram Stoker", year: 1897 },
      {
        title: "The Count of Monte Cristo",
        author: "Alexandre Dumas",
        year: 1844,
      },
      { title: "Les Misérables", author: "Victor Hugo", year: 1862 },
    ];

    this.state = {
      books: this.books,
      searchText: "",
      filterField: "title",
      sortField: "title",
      sortOrder: "asc",
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  handleSearchChange(event) {
    this.setState({ searchText: event.target.value });
  }

  handleFilterChange(event) {
    this.setState({ filterField: event.target.value });
  }

  handleSort(field) {
    const { sortField, sortOrder } = this.state;
    const newOrder =
      field === sortField && sortOrder === "asc" ? "desc" : "asc";
    this.setState({ sortField: field, sortOrder: newOrder });
  }

  getFilteredBooks() {
    const { searchText, filterField, sortField, sortOrder } = this.state;
    let filtered = this.books;

    if (searchText) {
      filtered = filtered.filter((book) =>
        book[filterField]
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    }

    return filtered.sort((bookA, bookB) => {
      const valueA = bookA[sortField].toString().toLowerCase();
      const valueB = bookB[sortField].toString().toLowerCase();

      if (sortOrder === "asc") {
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      }
      return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
    });
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
              <th onClick={() => this.handleSort("title")}>Title</th>
              <th onClick={() => this.handleSort("author")}>Author</th>
              <th onClick={() => this.handleSort("year")}>Year</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book, index) => {
              const { title, author, year } = book;
              return (
                <tr key={index}>
                  <td>{title}</td>
                  <td>{author}</td>
                  <td>{year}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Library;
