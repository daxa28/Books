import { all } from "redux-saga/effects";
import { booksWatcher } from "./booksSaga";
import { bookWatcher } from "./bookSaga";

export function* rootWatcher() {
  yield all([booksWatcher(), bookWatcher()]);
}
