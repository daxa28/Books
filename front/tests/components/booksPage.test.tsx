import { cleanup, screen } from "@testing-library/react";
import Books from "../../src/pages/Books/Books";
import React from "react";
import "@testing-library/jest-dom/extend-expect";

// Использование кастомной функции рендеринга, а не рендеринга RTL, чтобы избежать ошибок с состоянием
import { renderWithProviders } from "../../jest/utils/testUtils";

// Примечание: запуск очистки afterEach выполняется автоматически в @testing-library/react@9.0.0 или выше, размонтируя и очищая DOM после завершения теста.
afterEach(cleanup);

it("Home page shows the text", () => {
  renderWithProviders(<Books />);
  expect(
    screen.getByText<HTMLHeadingElement>("Search for Books")
  ).toBeInTheDocument();
});
