import { useState } from "react";
import { useBlogMutation } from "@/hooks/useBlogMutation";
import { UpdateModal } from "./modals/UpdateModal";
import { DeleteModal } from "./modals/DeleteModal";
import { ViewModal } from "./modals/ViewModal"; // Import ViewModal
import axios from "@/server/api/axios";
import { toast } from "react-toastify";

export default function Cards({
  title,
  post,
  _id,
}: DataRecords["blog_records"][0]) {
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const updateMutation = useBlogMutation(["updatePost"], async data => {
    const res = await axios.put(`/blogs/update/${_id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  });

  const deleteMutation = useBlogMutation(["deletePost"], async () => {
    const res = await axios.delete(`/blogs/delete/${_id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  });

  const handleUpdate = async (data: { title: string; post: string }) => {
    try {
      await updateMutation.mutateAsync({ ...data, _id });
      toast.success("Post updated successfully");
    } catch (error) {
      toast.error("Failed to update post");
    }
    setUpdateModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync({ _id }); // Await the delete mutation
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error("Failed to delete post");
    }
    setDeleteModalOpen(false);
  };

  return (
    <div className="border-2 p-4 rounded-md bg-white text-black bg-opacity-60">
      <h2 className="font-semibold text-xl">{title}</h2>
      <p className="text-sm">{post}</p>
      <div className="flex gap-2 mt-6">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setViewModalOpen(true)}>
          View
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setUpdateModalOpen(true)}>
          Update
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setDeleteModalOpen(true)}>
          Delete
        </button>
      </div>

      {isViewModalOpen && (
        <ViewModal
          title={title}
          post={post}
          onClose={() => setViewModalOpen(false)}
        />
      )}

      {isUpdateModalOpen && (
        <UpdateModal
          _id={_id}
          title={title}
          post={post}
          onClose={() => setUpdateModalOpen(false)}
          onSave={handleUpdate}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDelete} // Pass the handleDelete function directly
        />
      )}
    </div>
  );
}
