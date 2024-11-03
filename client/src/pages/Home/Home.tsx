import { useState } from "react";
import Cards from "@/components/Cards";
import axios from "@/server/api/axios";
import { useQuery } from "@tanstack/react-query";
import { useBlogMutation } from "@/hooks/useBlogMutation";
import { CreateModal } from "@/components/modals/CreateModal";

export default function Home() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  // Fetching posts data
  const { data, isError, isLoading } = useQuery<DataRecords>({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axios.get("/blogs", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  // Mutation to create a new post
  const createMutation = useBlogMutation(["createPost"], async data => {
    const response = await axios.post("/blogs/create", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  });

  // Handle create post action
  const handleCreate = (data: { title: string; post: string }) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setCreateModalOpen(false);
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const records = data?.blog_records ?? [];

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semidbold mb-4">
        React with Go Blog + MySQL Online
      </h1>

      {/* Create New Post Button */}
      <button
        className="bg-green-500 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => setCreateModalOpen(true)}>
        Create New Post
      </button>

      {/* Render Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4 w-full">
        {records?.length > 0 ? (
          records?.map(record => (
            <Cards
              key={record._id}
              _id={record._id}
              title={record.title}
              post={record.post}
            />
          ))
        ) : (
          <div>No posts found</div>
        )}
      </div>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <CreateModal
          onClose={() => setCreateModalOpen(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}
