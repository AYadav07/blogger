interface BlogType {
  id: string;
  content: string;
  title: string;
  published: boolean;
  author: {
    name: string;
    id: string;
  };
}

export default BlogType;
