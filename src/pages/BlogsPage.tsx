import React from 'react';
import BlogCard from '../components/BlogCard';
import blogsData from '../data/blogs.json';

const BlogsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Plant Care Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover expert tips, care guides, and inspiration to help your plants thrive. 
            From beginner basics to advanced techniques, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogsData.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;