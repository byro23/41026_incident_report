import { render, fireEvent, screen } from "@testing-library/react";
import EditIncident from "../component/editIncident";

test("renders without errors", () => {
  render(<EditIncident />);
});

test("updates form fields correctly", () => {
  const { getByRole } = render(<EditIncident />);
  const titleInput = getByRole("textbox", { name: /title/i });
  const descriptionInput = getByRole("textbox", { name: /description/i });

  fireEvent.change(titleInput, { target: { value: "New Title" } });
  fireEvent.change(descriptionInput, {
    target: { value: "New Description" },
  });

  expect(titleInput.value).toBe("New Title");
  expect(descriptionInput.value).toBe("New Description");
});