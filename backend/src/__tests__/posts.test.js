import { describe, expect, test, beforeEach, beforeAll } from "@jest/globals";
import mongoose from "mongoose";
import {
  createPost,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  getPostById,
  updatePost,
  deletePost,
} from "../services/posts.js";
import { Post } from "../db/models/post.js";
import { createUser } from "../services/users.js";

let testUser = null;
//Remove old Sample posts with this one
let samplePosts = [];
let createdSamplePosts = [];
beforeAll(async () => {
  testUser = await createUser({ username: "sample", password: "user" });
  samplePosts = [
    { title: "Learning Redux", author: testUser._id, tags: ["redux"] },
    { title: "Learn React Hooks", author: testUser._id, tags: ["react"] },
    {
      title: "Full-Stack React Projects",
      author: testUser._id,
      tags: ["react", "nodejs"],
    },
  ];
});

beforeEach(async () => {
  await Post.deleteMany({});
  createdSamplePosts = [];
  for (const post of samplePosts) {
    const createdPost = new Post(post);
    createdSamplePosts.push(await createdPost.save());
  }
});

describe("getting a post", () => {
  test("should return the full post", async () => {
    const post = await getPostById(createdSamplePosts[0]._id);
    expect(post.toObject()).toEqual(createdSamplePosts[0].toObject());
  });
  test("should fail if the id does not exist", async () => {
    const post = await getPostById("000000000000000000000000");
    expect(post).toEqual(null);
  });
});
describe("updating posts", () => {
  test("should update the specified property", async () => {
    await updatePost(testUser._id, createdSamplePosts[0]._id, {
      contents: "Some content change",
    });
    const updatedPost = await Post.findById(createdSamplePosts[0]._id);
    expect(updatedPost.contents).toEqual("Some content change");
  });
  test("should not update other properties", async () => {
    await updatePost(testUser._id, createdSamplePosts[0]._id, {
      contents: "Some content change",
    });
    const updatedPost = await Post.findById(createdSamplePosts[0]._id);
    expect(updatedPost.title).toEqual("Learning Redux");
  });
  test("should update the updatedAt timestamp", async () => {
    await updatePost(testUser._id, createdSamplePosts[0]._id, {
      contents: "Some content change",
    });
    const updatedPost = await Post.findById(createdSamplePosts[0]._id);
    expect(updatedPost.updatedAt.getTime()).toBeGreaterThan(
      createdSamplePosts[0].updatedAt.getTime()
    );
  });
  test("should fail if the id does not exist", async () => {
    const post = await updatePost(testUser._id, "000000000000000000000000", {
      contents: "Some content change",
    });
    expect(post).toEqual(null);
  });
});
describe("deleting posts", () => {
  test("should remove the post from the database", async () => {
    const result = await deletePost(testUser._id, createdSamplePosts[0]._id);
    expect(result.deletedCount).toEqual(1);
    const deletedPost = await Post.findById(createdSamplePosts[0]._id);
    expect(deletedPost).toEqual(null);
  });
  test("should fail if the id does not exist", async () => {
    const result = await deletePost("000000000000000000000000");
    expect(result.deletedCount).toEqual(0);
  });
});
describe("creating posts", () => {
  test("with all parameters should succeed", async () => {
    const post = {
      title: "Hello Mongoose!",
      contents: "This post is stored in a MongoDB database using Mongoose.",
      tags: ["mongoose", "mongodb"],
    };

    // create the post with a testUser._id as the author
    const createdPost = await createPost(testUser._id, post);

    // createdPost should have an ObjectId
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId);

    // retrieve it directly from the database
    const foundPost = await Post.findById(createdPost._id);

    // foundPost should contain all the fields of 'post'
    expect(foundPost).toEqual(expect.objectContaining(post));

    // timestamps should be Date instances
    expect(foundPost.createdAt).toBeInstanceOf(Date);
    expect(foundPost.updatedAt).toBeInstanceOf(Date);
  });
});
