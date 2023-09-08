import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import type { store, RootState } from "../core/redux/store";
import booksReducer from "../../src/core/redux/slices/booksSlice";
import bookReducer from "../../src/core/redux/slices/bookSlice";

// Интерфейс этого типа расширяет параметры по умолчанию для рендеринга из RTL,
// а также позволяет пользователю указывать другие вещи, такие как initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: typeof store;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Автоматически создать экземпляр store, если store не был передан
    store = configureStore({
      reducer: {
        booksReduser: booksReducer,
        bookReduser: bookReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  // Возвращаем объект с хранилищем и всеми функциями RTL-запроса 
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
