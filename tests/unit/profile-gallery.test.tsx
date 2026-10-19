import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProfileGallery } from "@/features/profiles/components/profile-gallery";
import { previewGallery } from "@/features/profiles/preview-data";
import { findPreviewPostDetail } from "@/features/posts/preview-data";

describe("ProfileGallery", () => {
  it("links only gallery items with matching preview post details", () => {
    render(<ProfileGallery posts={previewGallery} />);

    const linkedItems = previewGallery.filter((item) => item.postId);
    expect(linkedItems).toHaveLength(3);

    for (const item of linkedItems) {
      const link = screen.getByRole("link", {
        name: `Open preview post: ${item.alt}`,
      });
      expect(link.getAttribute("href")).toBe(`/posts/${item.postId}`);
      expect(findPreviewPostDetail(item.postId!)).toBeDefined();
    }

    const imageOnlyItem = screen.getByRole("img", {
      name: "A colorful plated lunch",
    });
    expect(imageOnlyItem.closest("a")).toBeNull();
    expect(screen.getAllByText("Preview only")).toHaveLength(6);
  });
});
