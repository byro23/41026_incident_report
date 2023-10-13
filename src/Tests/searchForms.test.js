import {
  render,
  fireEvent,
  waitFor,
  getByDisplayValue,
} from "@testing-library/react";
import SearchIncidents from "../component/searchForms";
import { MemoryRouter } from "react-router";

test("renders form", () => {
  render(
    <MemoryRouter>
      <SearchIncidents />
    </MemoryRouter>
  );
});

test("displays search criteria dropdown", () => {
  const { container } = render(
    <MemoryRouter>
      <SearchIncidents />
    </MemoryRouter>
  );
  const searchInput = container.querySelector("#search-criteria");
  expect(searchInput).toBeInTheDocument();
});

test("displays search input field", () => {
  const { container } = render(
    <MemoryRouter>
      <SearchIncidents />
    </MemoryRouter>
  );
  const searchInput = container.querySelector("#search-term");
  expect(searchInput).toBeInTheDocument();
});

test("updates search term when typing", () => {
  const { container } = render(
    <MemoryRouter>
      <SearchIncidents />
    </MemoryRouter>
  );
  const searchInput = container.querySelector("#search-term");

  fireEvent.change(searchInput, { target: { value: "Test Search Term" } });
  expect(searchInput.value).toBe("Test Search Term");
});
