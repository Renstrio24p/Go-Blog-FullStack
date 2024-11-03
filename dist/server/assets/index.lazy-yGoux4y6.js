import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios$1 from "axios";
import { toast } from "react-toastify";
import { createLazyFileRoute } from "@tanstack/react-router";
function useBlogMutation(mutationKey, mutationFn, options) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey,
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    ...options
  });
}
function UpdateModal({
  _id,
  title,
  post,
  onClose,
  onSave
}) {
  const [newTitle, setNewTitle] = useState(title);
  const [newPost, setNewPost] = useState(post);
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-md max-w-md w-full", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-4", children: "Update Post" }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        value: newTitle,
        onChange: (e) => setNewTitle(e.target.value),
        className: "border p-2 w-full mb-2"
      }
    ),
    /* @__PURE__ */ jsx(
      "textarea",
      {
        value: newPost,
        onChange: (e) => setNewPost(e.target.value),
        className: "border p-2 w-full mb-4"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "bg-gray-500 text-white py-2 px-4 rounded",
          onClick: onClose,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "bg-blue-500 text-white py-2 px-4 rounded",
          onClick: () => onSave({ _id, title: newTitle, post: newPost }),
          children: "Save"
        }
      )
    ] })
  ] }) });
}
function DeleteModal({
  onClose,
  onConfirm
}) {
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-md max-w-sm w-full", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-4", children: "Delete Post" }),
    /* @__PURE__ */ jsx("p", { children: "Are you sure you want to delete this post?" }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2 mt-4", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "bg-gray-500 text-white py-2 px-4 rounded",
          onClick: onClose,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "bg-red-500 text-white py-2 px-4 rounded",
          onClick: onConfirm,
          children: "Delete"
        }
      )
    ] })
  ] }) });
}
function ViewModal({
  title,
  post,
  onClose
}) {
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-md max-w-md w-full", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-4", children: "Post Details" }),
    /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2", children: title }),
    /* @__PURE__ */ jsx("p", { className: "text-sm mb-4", children: post }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
      "button",
      {
        className: "bg-gray-500 text-white py-2 px-4 rounded",
        onClick: onClose,
        children: "Close"
      }
    ) })
  ] }) });
}
const baseURL = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8080";
const axios = axios$1.create({
  baseURL
});
function Cards({
  title,
  post,
  _id
}) {
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const updateMutation = useBlogMutation(["updatePost"], async (data) => {
    const res = await axios.put(`/blogs/update/${_id}`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return res.data;
  });
  const deleteMutation = useBlogMutation(["deletePost"], async () => {
    const res = await axios.delete(`/blogs/delete/${_id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return res.data;
  });
  const handleUpdate = async (data) => {
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
      await deleteMutation.mutateAsync({ _id });
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error("Failed to delete post");
    }
    setDeleteModalOpen(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "border-2 p-4 rounded-md bg-white text-black bg-opacity-60", children: [
    /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl", children: title }),
    /* @__PURE__ */ jsx("p", { className: "text-sm", children: post }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-6", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
          onClick: () => setViewModalOpen(true),
          children: "View"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded",
          onClick: () => setUpdateModalOpen(true),
          children: "Update"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
          onClick: () => setDeleteModalOpen(true),
          children: "Delete"
        }
      )
    ] }),
    isViewModalOpen && /* @__PURE__ */ jsx(
      ViewModal,
      {
        title,
        post,
        onClose: () => setViewModalOpen(false)
      }
    ),
    isUpdateModalOpen && /* @__PURE__ */ jsx(
      UpdateModal,
      {
        _id,
        title,
        post,
        onClose: () => setUpdateModalOpen(false),
        onSave: handleUpdate
      }
    ),
    isDeleteModalOpen && /* @__PURE__ */ jsx(
      DeleteModal,
      {
        onClose: () => setDeleteModalOpen(false),
        onConfirm: handleDelete
      }
    )
  ] });
}
function CreateModal({
  onClose,
  onCreate
}) {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-md max-w-md w-full", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-4", children: "Create New Post" }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        placeholder: "Title",
        value: title,
        onChange: (e) => setTitle(e.target.value),
        className: "border p-2 w-full mb-2 rounded-md"
      }
    ),
    /* @__PURE__ */ jsx(
      "textarea",
      {
        placeholder: "Content",
        value: post,
        onChange: (e) => setPost(e.target.value),
        className: "border p-2 w-full mb-4 resize-none rounded-md"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "bg-gray-500 text-white py-2 px-4 rounded",
          onClick: onClose,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "bg-green-500 text-white py-2 px-4 rounded",
          onClick: () => onCreate({ title, post }),
          children: "Create"
        }
      )
    ] })
  ] }) });
}
function Home() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const { data, isError, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axios.get("/blogs", {
        headers: {
          "Content-Type": "application/json"
        }
      });
      return res.data;
    },
    refetchOnWindowFocus: false
  });
  const createMutation = useBlogMutation(["createPost"], async (data2) => {
    const response = await axios.post("/blogs/create", data2, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  });
  const handleCreate = (data2) => {
    createMutation.mutate(data2, {
      onSuccess: () => {
        setCreateModalOpen(false);
      }
    });
  };
  if (isLoading) return /* @__PURE__ */ jsx("div", { children: "Loading..." });
  if (isError) return /* @__PURE__ */ jsx("div", { children: "Error" });
  const records = (data == null ? void 0 : data.blog_records) ?? [];
  return /* @__PURE__ */ jsxs("div", { className: "w-full max-w-7xl mx-auto flex flex-col justify-center items-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-semidbold mb-4", children: "React with Go Blog + MySQL Online" }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "bg-green-500 text-white font-bold py-2 px-4 rounded mb-4",
        onClick: () => setCreateModalOpen(true),
        children: "Create New Post"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4 w-full", children: (records == null ? void 0 : records.length) > 0 ? records == null ? void 0 : records.map((record) => /* @__PURE__ */ jsx(
      Cards,
      {
        _id: record._id,
        title: record.title,
        post: record.post
      },
      record._id
    )) : /* @__PURE__ */ jsx("div", { children: "No posts found" }) }),
    isCreateModalOpen && /* @__PURE__ */ jsx(
      CreateModal,
      {
        onClose: () => setCreateModalOpen(false),
        onCreate: handleCreate
      }
    )
  ] });
}
const Route = createLazyFileRoute("/")({
  component: () => /* @__PURE__ */ jsx(Home, {})
});
export {
  Route
};
