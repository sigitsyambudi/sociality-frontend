import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProfileView } from "@/features/profiles/components/profile-view";
import { myPreviewProfile } from "@/features/profiles/preview-data";

describe("ProfileView tabs", () => {
  it("switches panels and supports roving keyboard focus", () => {
    render(<ProfileView mode="me" profile={myPreviewProfile} />);
    const gallery = screen.getByRole("tab", { name: "Gallery" });
    const saved = screen.getByRole("tab", { name: "Saved" });

    expect(gallery.getAttribute("aria-selected")).toBe("true");
    fireEvent.keyDown(gallery, { key: "ArrowRight" });

    expect(saved.getAttribute("aria-selected")).toBe("true");
    expect(saved.getAttribute("tabindex")).toBe("0");
    expect(document.activeElement).toBe(saved);
    expect(screen.getByRole("tabpanel").textContent).toContain(
      "Saved content is not available in preview mode.",
    );

    fireEvent.keyDown(saved, { key: "Home" });
    expect(document.activeElement).toBe(gallery);
    expect(gallery.getAttribute("aria-selected")).toBe("true");
  });
});
