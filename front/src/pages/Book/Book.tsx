import React, { useEffect } from "react";
import * as styles from "./book.module.scss";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../core/redux/hooks";
import { bookSelector, getBookAction } from "../../core/redux/slices/bookSlice";
import MyLoader from "../../components/Loader/MyLoader";
const md5 = require("md5");

function Book() {
  const selectedBook = useAppSelector(bookSelector);
  const dispatch = useAppDispatch();
  const params = useParams();

  const isLoading = selectedBook.isLoading;
  const error = selectedBook.error;
  const book = selectedBook.data;

  useEffect(() => {
    if (!isLoading) {
      dispatch(
        getBookAction({
          id: params.id,
        })
      );
    }
  }, []);

  return (
    <div className={styles.content}>
      {isLoading ? (
        <MyLoader />
      ) : error ? (
        <div className={styles.message}>Error..</div>
      ) : book ? (
        <div className={styles.book}>
          <h3>{book.volumeInfo.categories}</h3>
          <div className={styles.titleContent}>
            <h1>{book.volumeInfo.title}</h1>
            <div className={styles.image}>
              {book.volumeInfo.imageLinks ? (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt="book-image"
                />
              ) : (
                <></>
              )}
            </div>
            <div className={styles.authors}>
              {book.volumeInfo.authors ? (
                book.volumeInfo.authors.map((author: string) => (
                  <div key={md5(JSON.stringify(author))}>{author}</div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className={styles.descriptionContent}>
            <h2>Description</h2>
            {book.volumeInfo.description ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: book.volumeInfo.description,
                }}
              ></div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <p className={styles.message}>Book information not found.</p>
      )}
    </div>
  );
}

export default Book;
