import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@dev_ay/blog-common-v1";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { success } = signupInput.safeParse(body);
    if (!success) {
      c.status(403);
      return c.json({ message: "Invalid input" });
    }

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    const payload = {
      id: user.id,
      exp: Math.floor(Date.now() / 1000) + 60 * 20, // Token expires in 20 minutes
    };

    const token = await sign(payload, c.env.JWT_SECRET);

    return c.json({ token: "Bearer " + token });
  } catch (error) {
    c.json({ error: "Sign up failed" });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({ message: "Invalid input" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "User not found" });
  }

  if (user?.password !== body.password) {
    c.status(405);
    return c.json({ error: "Invalid credentials" });
  }

  const payload = {
    id: user.id,
    exp: Math.floor(Date.now() / 1000) + 60 * 20, // Token expires in 20 minutes
  };

  const token = await sign(payload, c.env.JWT_SECRET);
  console.log(token);
  return c.json({ token: "Bearer " + token });
});
