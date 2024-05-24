import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGetBlog from "../hooks/useGetBlog";
import BlogContent from "../components/BlogContent";
import AuthorDetails from "../components/AuthorDetails";
import Appbar from "../components/Appbar";

const Blog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, blog } = useGetBlog(id!);

  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      navigate("/signin");
    }
  });

  if (loading) {
    return <div>loading.........</div>;
  }
  return (
    <div className="w-screen flex flex-col gap-2">
      <Appbar />
      <div className="w-screen px-20 py-5 grid grid-cols-12 gap-1">
        <div className="col-span-8">
          <BlogContent
            blogTitle={blog ? blog.title : ""}
            blogContent={blog ? blog.content : ""}
          />
        </div>
        <div className="col-span-4">
          <AuthorDetails
            authorName={blog ? blog.author.name : "Amresh Yadav"}
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;
