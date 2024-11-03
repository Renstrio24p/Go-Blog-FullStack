

export function ViewModal({
  title,
  post,
  onClose,
}: {
  title: string;
  post: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Post Details</h2>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm mb-4">{post}</p>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded"
            onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
