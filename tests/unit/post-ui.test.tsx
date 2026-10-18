import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PostComposer } from "@/features/posts/components/post-composer";
import { PostDetail } from "@/features/posts/components/post-detail";
import { previewPostDetails } from "@/features/posts/preview-data";
import { MAX_POST_IMAGE_BYTES } from "@/features/posts/types";

function getFileInput(container: HTMLElement) {
  const input = container.querySelector<HTMLInputElement>('input[type="file"]');
  if (!input) throw new Error("Post image input was not rendered.");
  return input;
}

describe("PostComposer image validation", () => {
  it("rejects unsupported image formats", () => {
    const { container } = render(<PostComposer />);
    fireEvent.change(getFileInput(container), {
      target: { files: [new File(["gif"], "preview.gif", { type: "image/gif" })] },
    });

    expect(screen.getByRole("alert").textContent).toBe(
      "Choose a JPG, PNG, or WEBP image.",
    );
  });

  it("rejects files larger than the documented five-megabyte limit", () => {
    const { container } = render(<PostComposer />);
    const oversized = new File(
      [new Uint8Array(MAX_POST_IMAGE_BYTES + 1)],
      "large.png",
      { type: "image/png" },
    );

    fireEvent.change(getFileInput(container), { target: { files: [oversized] } });

    expect(screen.getByRole("alert").textContent).toBe(
      "The image must be 5 MB or smaller.",
    );
  });
});

describe("PostDetail comment validation", () => {
  it("requires non-whitespace comment text", () => {
    render(<PostDetail detail={previewPostDetails[0]} />);
    const comment = screen.getByLabelText("Add a preview comment");

    fireEvent.change(comment, { target: { value: "   " } });
    fireEvent.blur(comment);

    expect(screen.getByRole("alert").textContent).toBe(
      "Write a comment before posting.",
    );
    expect(comment.getAttribute("aria-invalid")).toBe("true");
  });
});
