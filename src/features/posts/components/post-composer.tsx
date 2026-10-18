"use client";

import { ArrowLeft, ImagePlus, Trash2, UploadCloud } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import {
  ACCEPTED_POST_IMAGE_TYPES,
  MAX_POST_IMAGE_BYTES,
} from "@/features/posts/types";

const acceptedTypes = new Set<string>(ACCEPTED_POST_IMAGE_TYPES);

function validateImage(file: File) {
  if (!acceptedTypes.has(file.type)) {
    return "Choose a JPG, PNG, or WEBP image.";
  }

  if (file.size > MAX_POST_IMAGE_BYTES) {
    return "The image must be 5 MB or smaller.";
  }

  return undefined;
}

export function PostComposer() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [caption, setCaption] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File>();
  const [fileError, setFileError] = useState<string>();
  const [previewUrl, setPreviewUrl] = useState<string>();

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function chooseImage(nextFile?: File) {
    if (!nextFile) return;

    const error = validateImage(nextFile);
    if (error) {
      setFileError(error);
      return;
    }

    setPreviewUrl(URL.createObjectURL(nextFile));
    setFile(nextFile);
    setFileError(undefined);
  }

  function handleFileInput(event: ChangeEvent<HTMLInputElement>) {
    chooseImage(event.target.files?.[0]);
    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    chooseImage(event.dataTransfer.files?.[0]);
  }

  function removeImage() {
    setPreviewUrl(undefined);
    setFile(undefined);
    setFileError(undefined);
  }

  return (
    <section className="mx-auto min-h-[calc(100svh-80px)] w-full max-w-[500px] px-4 pb-16 pt-4 sm:px-6 lg:pb-24 lg:pt-10">
      <header className="mb-7 flex items-center gap-3 lg:mb-8">
        <Link
          href="/"
          aria-label="Back to timeline"
          className="-ml-2 rounded-lg p-2 text-white transition hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f51f9]"
        >
          <ArrowLeft aria-hidden="true" size={24} />
        </Link>
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-[#fdfdfd]">
          Add Post
        </h1>
        <div className="relative ml-auto size-10 overflow-hidden rounded-full lg:hidden">
          <Image
            src="/images/timeline/preview-avatar.png"
            alt="Preview profile avatar"
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
      </header>

      <form onSubmit={(event) => event.preventDefault()} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#fdfdfd]" htmlFor="post-image">
            Photo
          </label>
          <input
            ref={inputRef}
            id="post-image"
            className="sr-only"
            tabIndex={-1}
            type="file"
            accept={ACCEPTED_POST_IMAGE_TYPES.join(",")}
            onChange={handleFileInput}
            aria-describedby={fileError ? "post-image-error" : "post-image-help"}
          />

          {previewUrl && file ? (
            <div className="rounded-xl border border-dashed border-[#252a35] bg-[#0a0d12] p-3">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-black">
                <Image
                  src={previewUrl}
                  alt={`Preview of ${file.name}`}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 420px, calc(100vw - 56px)"
                  className="object-cover"
                />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="flex h-10 items-center justify-center gap-2 rounded-full border border-[#292d36] text-sm font-bold text-white transition hover:border-[#6936f2] hover:bg-white/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f51f9]"
                >
                  <ImagePlus aria-hidden="true" size={18} /> Change Image
                </button>
                <button
                  type="button"
                  onClick={removeImage}
                  className="flex h-10 items-center justify-center gap-2 rounded-full border border-[#3c2228] text-sm font-bold text-[#f97066] transition hover:bg-[#2a1217] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f97066]"
                >
                  <Trash2 aria-hidden="true" size={18} /> Delete Image
                </button>
              </div>
            </div>
          ) : (
            <div
              onDragEnter={(event) => {
                event.preventDefault();
                setDragActive(true);
              }}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={`flex min-h-52 flex-col items-center justify-center rounded-xl border border-dashed px-5 text-center transition ${dragActive ? "border-[#7f51f9] bg-[#160f27]" : "border-[#252a35] bg-[#0a0d12]"}`}
            >
              <span className="mb-3 flex size-10 items-center justify-center rounded-lg border border-[#252a35] bg-[#11151c] text-[#a4a7ae]">
                <UploadCloud aria-hidden="true" size={21} />
              </span>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                aria-describedby={fileError ? "post-image-error" : "post-image-help"}
                className="rounded text-sm font-bold text-[#8f68ff] hover:text-[#aa8cff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f51f9]"
              >
                Click to upload
              </button>
              <p className="mt-1 text-sm text-[#a4a7ae]">or drag and drop</p>
              <p id="post-image-help" className="mt-2 text-xs text-[#717680]">
                JPG, PNG, or WEBP (max. 5 MB)
              </p>
            </div>
          )}
          {fileError ? (
            <p id="post-image-error" role="alert" className="mt-2 text-sm text-[#f97066]">
              {fileError}
            </p>
          ) : null}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#fdfdfd]" htmlFor="caption">
            Caption <span className="font-normal text-[#717680]">(optional)</span>
          </label>
          <textarea
            id="caption"
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
            placeholder="Write a caption..."
            className="min-h-28 w-full resize-y rounded-xl border border-[#252a35] bg-[#0a0d12] px-4 py-3 text-sm leading-6 text-white placeholder:text-[#535862] focus:border-[#7f51f9] focus:outline-none focus:ring-2 focus:ring-[#7f51f9]/25"
          />
        </div>

        <div className="rounded-xl border border-[#392b55] bg-[#120d1d] px-4 py-3 text-sm leading-6 text-[#cbbcff]">
          <p className="font-semibold text-white">Preview mode</p>
          <p>
            Posting is disabled until a secure authenticated session is available. Your selected image stays on this device.
          </p>
          <Link href="/login" className="mt-1 inline-block font-bold text-[#9d7cff] underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-[#7f51f9]">
            Login to continue
          </Link>
        </div>

        <button
          type="submit"
          disabled
          className="h-10 w-full cursor-not-allowed rounded-full bg-[#6936f2] text-sm font-bold text-white opacity-55"
        >
          Share
        </button>
      </form>
    </section>
  );
}
