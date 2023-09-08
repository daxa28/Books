import * as styles from "./books.module.scss";
import bookicon from "../../assets/images/bookicon.svg";
import React, { Fragment, useEffect, useState } from "react";
import MyButton from "../../components/Button/MyButton";
import {
  booksSelector,
  getBooksAction,
  getNextBooksAction,
} from "../../core/redux/slices/booksSlice";
import { useAppDispatch, useAppSelector } from "../../core/redux/hooks";
import MyLoader from "../../components/Loader/MyLoader";
import MySelect from "../../components/Select/MySelect";
import CardBook from "../../components/cardBook/CardBook";
import { getRandomString } from "../../utils/randomValue";
const md5 = require("md5");

export type UserType = {
  id: number;
  email: string;
  name: string;
  updatedAt: string;
};

export default function Books() {
  const [searchBookInput, setSearchBookInput] = useState("");
  const [searchBook, setSearchBook] = useState("");
  const [errorSearchBookInput, setErrorSearchBookInput] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [orderBy, setOrderBy] = useState("relevance");
  const [category, setCategory] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const maxResults = 30;
  const selectedBooks = useAppSelector(booksSelector);

  const isLoading = selectedBooks.isLoading;
  const error = selectedBooks.error;
  const errorNextBook = selectedBooks.errorNextBooks;
  const isLoadingNextBooks = selectedBooks.isLoadingNextBooks;
  const books = selectedBooks.data?.items;
  const totalBooks = selectedBooks.data?.totalItems;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchBook != "") {
      dispatch(
        getBooksAction({
          startIndex,
          maxResults,
          searchBook,
          category: category,
          orderBy: orderBy,
        })
      );
    }
  }, [searchBook, orderBy, category]);

  useEffect(() => {
    if (!isLoading && totalBooks) {
      if (startIndex >= maxResults) {
        dispatch(
          getNextBooksAction({
            startIndex,
            maxResults,
            searchBook,
            category: category,
            orderBy: orderBy,
          })
        );
      }
    }
  }, [startIndex]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      getBooks();
    }
  }
  function getBooks() {
    setIsSearch(true);
    setStartIndex(0);
    setErrorSearchBookInput("");
    if (searchBookInput != "") {
      setSearchBook(searchBookInput);
    } else {
      setErrorSearchBookInput("Enter search text.");
    }
  }
  function getLastBook() {
    if (!errorNextBook) {
      setStartIndex(() => startIndex + maxResults);
    }
  }

  function changeOrderBy(value: string) {
    setOrderBy(value);
    if (searchBook != searchBookInput) {
      setSearchBook(searchBookInput);
    }
  }

  function changeCategory(value: string) {
    setCategory(value);
    if (searchBook != searchBookInput) {
      setSearchBook(searchBookInput);
    }
  }

  function getRandomBooks() {
    setErrorSearchBookInput("");
    changeOrderBy(getRandomString(["relevance", "newest"]));
    changeCategory(
      getRandomString([
        "",
        "art",
        "biography",
        "computers",
        "history",
        "medical",
        "poetry",
      ])
    );
    const randomSearch: string = getRandomString([
      "wagon",
      "shallow",
      "collect",
      "golf",
      "elbow",
      "suffer",
    ]);
    setSearchBookInput(randomSearch);
    setSearchBook(randomSearch);
    setIsSearch(true);
  }

  return (
    <Fragment>
      <h2 className={styles.title}>Search for Books</h2>

      <div className={styles.search}>
        <input
          className={styles.input}
          placeholder="book.."
          value={searchBookInput}
          onChange={(e) => setSearchBookInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <MyButton onClick={getBooks}>Search</MyButton>
      </div>
      <div className={styles.sort}>
        <MySelect
          options={[
            { value: "relevance", name: "relevance" },
            { value: "newest", name: "newest" },
          ]}
          defaultValue={orderBy}
          value={orderBy}
          onChange={changeOrderBy}
        />
        <MySelect
          options={[
            { value: "", name: "all" },
            { value: "art", name: "art" },
            { value: "biography", name: "biography" },
            { value: "computers", name: "computers" },
            { value: "history", name: "history" },
            { value: "medical", name: "medical" },
            { value: "poetry", name: "poetry" },
          ]}
          defaultValue="all"
          value={category}
          onChange={changeCategory}
        />
      </div>
      <div className={styles.random}>
        <MyButton onClick={getRandomBooks}>Random Search</MyButton>
      </div>

      <div className={styles.content}>
        {errorSearchBookInput ? (
          <p className={styles.message}>{errorSearchBookInput}</p>
        ) : isSearch ? (
          isLoading ? (
            <MyLoader />
          ) : error ? (
            <p className={styles.message}>Error.. Status code 404</p>
          ) : books ? (
            <Fragment>
              <p className={styles.message}>
                Number of results found: {totalBooks}
              </p>
              <div className={styles.books}>
                {books.map((book) => (
                  <CardBook key={md5(JSON.stringify(book))} book={book} />
                ))}
              </div>

              {isLoadingNextBooks ? (
                <MyLoader />
              ) : errorNextBook ? (
                <p className={styles.message}>{errorNextBook}</p>
              ) : (
                <div className={styles.loadMore}>
                  <MyButton onClick={getLastBook}>Load more...</MyButton>
                </div>
              )}
            </Fragment>
          ) : (
            <p className={styles.message}>
              No books were found for this request.
            </p>
          )
        ) : (
          <div className={styles.image}>
            <img src={bookicon} alt="book-image" />
          </div>
        )}
      </div>
    </Fragment>
  );
}
