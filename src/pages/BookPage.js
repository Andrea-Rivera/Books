import React, { useCallback, useState } from "react";
import Button from "../components/Button";
import BooksList from "../components/BookList/index";
import LoadingSpinner from "../components/LoadingSpinner";

const BookPage = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const searchTextHandler = (event) => {
    setSearchText(event.target.value);
  };

  const fetchBooksHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?author=${searchText}`
      );
      console.log(response);
      if (response.status === 404) {
        setError(true);
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      console.log({ data });
      const transformedData = data.docs.map((bookData, index) => {
        return {
          key: bookData.key,
          name: bookData.title,
        };
      });
      setBooks(transformedData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [searchText]);

  let content = <p>No books found</p>;

  if (error) {
    content = <p>{error}</p>;
  }

  if (books.length > 0) {
    content = <BooksList books={books} />;
  }

  if (isLoading) {
    content = <LoadingSpinner />;
  }

  return (
    <section style={{ height: "100vh" }}>
      <h1>Books Database</h1>
      <input
        type="text"
        placeholder="Author's name"
        style={{ padding: "10px 40px" }}
        value={searchText}
        onChange={searchTextHandler}
      />
      <Button onClick={fetchBooksHandler}>Search</Button>
      {content}
    </section>
  );
};

export default BookPage;
