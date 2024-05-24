import { useEffect, useState } from "react";
import BlogType from "../types/BlogType";
import axios from "axios";

const useGetBlog = (id: string) => {
  const [blog, setBlog] = useState<BlogType>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
      .then((response) => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return { loading, blog };
};

export default useGetBlog;
