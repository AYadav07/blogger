import { useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import useGetBlogs from "../hooks/useGetBlogs";
import { useEffect } from "react";

const Blogs = () => {
  const { loading, blogs } = useGetBlogs();
  console.log("All blogs are : " + blogs);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      navigate("/signin");
    }
  });

  if (loading) {
    return <div>Loading ............</div>;
  }
  return (
    <div>
      <Appbar />
      <div className="flex flex-col w-screen px-10 py-2 items-center">
        {blogs.map((blog, idx) => {
          return (
            <BlogCard
              authorName={blog.author.name}
              publishTime="19 May 2020"
              blogTitle={blog.title}
              blogContent={blog.content}
              key={idx}
              blogId={blog.id}
            />
          );
        })}

        <BlogCard
          blogId="123"
          authorName="Amresh Yadav"
          publishTime="18 May, 2024"
          blogTitle="Blog on vlog, How to write an interesting blog on vlog. It is for me only."
          blogContent="Creating a vlog (video blog) can be an exciting and creative way to share your thoughts, experiences, and interests with the world. Whether you're a seasoned vlogger or just starting out, there are several key steps you can take to create engaging and successful vlogs. In this blog post, we'll explore what vlogging is, how to get started, and some tips for creating compelling content.

What is a Vlog?

A vlog, short for video blog, is a form of blog or online video content that captures events, experiences, or thoughts and presents them in a video format. Vlogs can cover a wide range of topics, including travel, lifestyle, fashion, cooking, gaming, and more. Vlogs are typically informal and personal, offering viewers a glimpse into the vlogger's life or interests.

Getting Started with Vlogging

Choose c and quiet location for filming your vlogs. Consider the background and ambiance of your filming space, as it can impact the overall look and feel of your videos.

Record and Edit Your Videos: Once you're ready to start filming, capture your footage using your chosen camera and microphone setup. After filming, use video editing software like Adobe Premiere Pro or Final Cut Pro to edit your footage, add music and graphics, and create a polished final product.

Publish and Promote Your Vlogs: Once your vlog is edited and ready to go, upload it to your chosen video hosting platform, such as YouTube or Vimeo. Promote your vlogs on social media, your blog, and other online channels to reach a wider audience.

Tips for Creating Compelling Vlogs

Be Authentic: Authenticity is key to connecting with your audience. Be yourself and share your genuine thoughts and experiences in your vlogs.
Keep it Engaging: Keep your vlogs interesting and engaging by including a variety of content, such as interviews, montages, and behind-the-scenes footage.
Focus on Quality: While you don't need professional equipment to create vlogs, strive for high-quality audio and video to enhance the viewing experience for your audience.
Interact with Your Audience: Engage with your viewers by responding to comments, asking for feedback, and incorporating viewer suggestions into your vlogs.
Stay Consistent: Consistency is key to building a loyal audience. Stick to a regular posting schedule and strive to deliver new vlog content on a consistent basis.
Conclusion

Vlogging is a fun and creative way to share your passions and experiences with the world. Whether you're a seasoned vlogger or just starting out, following these tips can help you create engaging and successful vlogs that resonate with your audience. So grab your camera, hit record, and start sharing your story with the world through the power of vlogging!"
        />
      </div>
    </div>
  );
};

export default Blogs;
