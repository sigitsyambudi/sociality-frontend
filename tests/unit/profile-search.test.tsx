import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProfileSearch } from "@/features/profiles/components/profile-search";

describe("ProfileSearch", () => {
  it("filters preview users and moves focus into results", async () => {
    render(<ProfileSearch />);
    const search = screen.getByRole("searchbox", {
      name: "Search preview users by name or username",
    });

    fireEvent.change(search, { target: { value: "maya" } });
    const result = await screen.findByRole("link", { name: /Maya Chen/i });
    expect(result.getAttribute("href")).toBe("/users/mayachen");

    fireEvent.keyDown(search, { key: "ArrowDown" });
    await waitFor(() => expect(document.activeElement).toBe(result));
  });

  it("shows an empty state for a missing preview user", async () => {
    render(<ProfileSearch />);
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "no matching person" },
    });

    expect(await screen.findByText("No results found")).toBeDefined();
  });
});
