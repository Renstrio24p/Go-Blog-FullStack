export function DeleteModal({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Delete Post</h2>
        <p>Are you sure you want to delete this post?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded"
            onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
