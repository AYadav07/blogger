import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@dev_ay/blog-common-v1";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const header = c.req.header("Authorization")!;
  if (!header) {
    c.status(403);
    return c.json({ error: "Unauthorized" });
  }
  console.log("token header is : " + header);
  const token = header.split(" ")[1];
  const response = await verify(token, c.env.JWT_SECRET);
  if (!response) {
    c.status(403);
    return c.json({ error: "Unauthorized" });
  }
  c.set("jwtPayload", response.id);
  await next();
});

blogRouter.post("/", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { success } = createBlogInput.safeParse(body);
    if (!success) {
      c.status(403);
      return c.json({ message: "Invalid input" });
    }

    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: c.get("jwtPayload"),
      },
    });
    c.status(200);
    return c.json({ id: blog.id });
  } catch (error) {
    c.status(404);
    return c.json({ error: "Posting failed" });
  }
});

blogRouter.put("/", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
      c.status(403);
      return c.json({ message: "Invalid input" });
    }
    const blog = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    c.status(200);
    return c.json(blog);
  } catch (error) {
    c.status(404);
    return c.json({ error: "Posting failed" });
  }
});

blogRouter.get("/bulk", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.findMany({
      select: {
        id: true,
        content: true,
        title: true,
        published: true,
        author: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
    c.status(200);
    return c.json(blog);
  } catch (error) {
    c.status(404);
    return c.json({ error: "No blog found" });
  }
});

blogRouter.get("/:id", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.findFirst({
      where: {
        id: c.req.param("id"),
      },
      select: {
        id: true,
        content: true,
        title: true,
        published: true,
        author: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
    console.log("All blogs: ");
    console.log(blog);
    c.status(200);
    return c.json(blog);
  } catch (error) {
    c.status(404);
    return c.json({ error: "No blog found" });
  }
});
