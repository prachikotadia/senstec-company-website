
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useApp, BlogPost } from '@/contexts/AppContext';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

const BlogManager = () => {
  const { blogPosts, setBlogPosts } = useApp();
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    tags: '',
    published: false
  });

  const handleCreate = () => {
    setIsCreating(true);
    setEditingPost(null);
    setFormData({
      title: '',
      content: '',
      author: '',
      tags: '',
      published: false
    });
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsCreating(false);
    setFormData({
      title: post.title,
      content: post.content,
      author: post.author,
      tags: post.tags.join(', '),
      published: post.published
    });
  };

  const handleSave = () => {
    const newPost: BlogPost = {
      id: editingPost?.id || Date.now().toString(),
      title: formData.title,
      content: formData.content,
      author: formData.author,
      publishDate: editingPost?.publishDate || new Date().toISOString().split('T')[0],
      tags: formData.tags.split(',').map(tag => tag.trim()),
      published: formData.published
    };

    if (editingPost) {
      setBlogPosts(blogPosts.map(post => post.id === editingPost.id ? newPost : post));
    } else {
      setBlogPosts([newPost, ...blogPosts]);
    }

    setEditingPost(null);
    setIsCreating(false);
    setFormData({
      title: '',
      content: '',
      author: '',
      tags: '',
      published: false
    });
  };

  const handleDelete = (id: string) => {
    setBlogPosts(blogPosts.filter(post => post.id !== id));
  };

  const handleCancel = () => {
    setEditingPost(null);
    setIsCreating(false);
  };

  if (isCreating || editingPost) {
    return (
      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle>{editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter post title"
            />
          </div>

          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              placeholder="Enter author name"
            />
          </div>

          <div>
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="AI, Sensors, Infrastructure"
            />
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Enter post content"
              rows={10}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            />
            <Label htmlFor="published">Publish immediately</Label>
          </div>

          <div className="flex space-x-3">
            <Button onClick={handleSave} className="gradient-purple">
              {editingPost ? 'Update Post' : 'Create Post'}
            </Button>
            <Button onClick={handleCancel} variant="outline">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Blog Posts</h2>
        <Button onClick={handleCreate} className="gradient-purple">
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      <div className="grid gap-4">
        {blogPosts.map((post) => (
          <Card key={post.id} className="glass-morphism">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-3 line-clamp-2">
                    {post.content.substring(0, 150)}...
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>By {post.author}</span>
                    <span>{post.publishDate}</span>
                    <span className={`px-2 py-1 rounded-full ${
                      post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(post.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogManager;
