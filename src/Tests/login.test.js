import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import Login from "../component/login";

test("renders form", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
});
