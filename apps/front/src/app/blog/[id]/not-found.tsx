export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary">Post Not Found</h1>
        <p className="text-gray-500 mt-2">
          Sorry, we couldn’t find the post you’re looking for.
        </p>
        <a href="/user/posts" className="text-blue-500 underline mt-4 block">
          Go back to all posts
        </a>
      </div>
    </div>
  );
}
