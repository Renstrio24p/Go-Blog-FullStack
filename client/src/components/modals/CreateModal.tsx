import { useState } from "react";

export function CreateModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (data: { title: string; post: string }) => void;
}) {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
      <div className="bg-white p-4 rounded-md max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Create New Post</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border p-2 w-full mb-2 rounded-md"
        />
        <textarea
          placeholder="Content"
          value={post}
          onChange={e => setPost(e.target.value)}
          className="border p-2 w-full mb-4 resize-none rounded-md"
        />
        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded"
            onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={() => onCreate({ title, post })}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
