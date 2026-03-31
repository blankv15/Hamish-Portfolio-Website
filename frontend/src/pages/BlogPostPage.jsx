import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { marked } from 'marked';
import './BlogPostPage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const renderBlock = (block, index) => {
    switch (block.type) {
        case 'h2':
            return <h2 key={index} className="post-heading">{block.text}</h2>;
        case 'h3':
            return <h3 key={index} className="post-subheading">{block.text}</h3>;
        case 'p':
            return <p key={index} className="post-paragraph">{block.text}</p>;
        case 'ul':
            return (
                <ul key={index} className="post-list">
                    {block.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            );
        case 'code':
            return <pre key={index} className="post-code"><code>{block.text}</code></pre>;
        default:
            return <p key={index} className="post-paragraph">{block.text}</p>;
    }
};

const BlogPostPage = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/api/blog/${slug}`)
            .then(res => {
                if (res.status === 404) { setNotFound(true); setLoading(false); return null; }
                return res.json();
            })
            .then(data => {
                if (data) {
                    setPost(data);
                    document.title = `${data.title} — Hamish Chhagan`;
                }
                setLoading(false);
            })
            .catch(() => { setNotFound(true); setLoading(false); });
    }, [slug]);

    if (loading) {
        return (
            <main className="post-page">
                <div className="post-loading">
                    <div className="post-loading-spinner"></div>
                </div>
            </main>
        );
    }

    if (notFound || !post) {
        return (
            <main className="post-page">
                <div className="post-not-found">
                    <h2>Post not found</h2>
                    <p>That article doesn't exist or may have moved.</p>
                    <Link to="/blog" className="post-back-link">← Back to Blog</Link>
                </div>
            </main>
        );
    }

    const formattedDate = new Date(post.date).toLocaleDateString('en-NZ', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <main className="post-page">
            <div className="post-container">
                <nav className="post-breadcrumb">
                    <Link to="/">Home</Link>
                    <span>/</span>
                    <Link to="/blog">Blog</Link>
                    <span>/</span>
                    <span>{post.title}</span>
                </nav>

                <article className="post-article">
                    <header className="post-header">
                        <div className="post-tags">
                            {post.tags.map(tag => (
                                <span key={tag} className="blog-tag">{tag}</span>
                            ))}
                        </div>
                        <h1 className="post-title">{post.title}</h1>
                        <div className="post-meta">
                            <span>{formattedDate}</span>
                            <span className="post-meta-dot">·</span>
                            <span>{post.readTime}</span>
                        </div>
                    </header>

                    {post.content_md
                        ? <div className="post-body post-markdown" dangerouslySetInnerHTML={{ __html: marked.parse(post.content_md) }} />
                        : <div className="post-body">
                            {post.content.map((block, i) => renderBlock(block, i))}
                          </div>
                    }
                </article>

                <footer className="post-footer">
                    <Link to="/blog" className="post-back-link">← Back to Blog</Link>
                </footer>
            </div>
        </main>
    );
};

export default BlogPostPage;
