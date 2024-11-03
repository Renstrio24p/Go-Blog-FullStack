import { useState } from "react";

export function UpdateModal({
  _id,
  title,
  post,
  onClose,
  onSave,
}: {
  _id: string;
  title: string;
  post: string;
  onClose: () => void;
  onSave: (data: DataRecords["blog_records"][0]) => void;
}) {
  const [newTitle, setNewTitle] = useState(title);
  const [newPost, setNewPost] = useState(post);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Update Post</h2>
        <input
          type="text"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <textarea
          value={newPost}
          onChange={e => setNewPost(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded"
            onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() =>
              onSave({ _id: _id, title: newTitle, post: newPost })
            }>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
