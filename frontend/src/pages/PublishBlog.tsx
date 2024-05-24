import { useState } from "react";
import Appbar from "../components/Appbar";
import TextAreaEditor from "../components/TextAreaEditor";
import axios from "axios";
import { CreateBlogInput } from "@dev_ay/blog-common-v1";
import { useNavigate } from "react-router-dom";

const PublishBlog = () => {
  const [blogTitle, setBlogTitle] = useState<string>("");
  const [blogContent, setBlogContent] = useState<string>("");

  const navigate = useNavigate();

  async function handleSubmitBlog(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    try {
      const blogPostInput: CreateBlogInput = {
        title: blogTitle,
        content: blogContent,
      };
      const data = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog`,
        blogPostInput,
        {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        }
      );

      console.log(data);
      navigate(`/blog/${data.data.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-screen h-screen px-10 py-2">
      <Appbar />
      <div className="mt-10 flex flex-col justify-center items-center w-full">
        <div className="w-full pl-20 pr-10">
          <input
            type="text"
            className="px-10 py-5 w-full text-4xl font-bold border-b focus:outline-none"
            placeholder="Title ..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setBlogTitle(e.target.value);
            }}
          />
        </div>
        <div className="w-full">
          <TextAreaEditor
            onChangeHandler={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setBlogContent(e.target.value);
            }}
          />
        </div>
        <div className="w-full pl-24 flex flex-row justify-start items-center">
          <button
            onClick={handleSubmitBlog}
            type="button"
            className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishBlog;
