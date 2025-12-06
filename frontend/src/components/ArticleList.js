import React, { useState } from "react";
import { ArrowLeft, Calendar, Clock, User, Sparkles, FileText, Loader } from "lucide-react";

export default function ArticleList({ articles, onSelect, onRefresh }) {
        return (
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
            }}>
                <h2 style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '30px',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    cursor: 'pointer'
                }}
                    onClick={onRefresh}
                    title="Click to refresh"
                >
                    Recent Articless
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '24px',
                    padding: '0 20px'
                }}>
                    {articles.length === 0 ? (
                        <div style={{
                            gridColumn: '1 / -1',
                            textAlign: 'center',
                            padding: '60px 20px',
                            background: 'rgba(255, 255, 255, 0.7)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '16px',
                            border: '2px dashed #cbd5e1'
                        }}>
                            <FileText size={48} color="#94a3b8" style={{ marginBottom: '16px' }} />
                            <p style={{ color: '#64748b', fontSize: '16px' }}>
                                No articles yet. Generate your first one!  ✨
                            </p>
                        </div>
                    ) : (
                        articles.map((article, index) => (
                            <div
                                key={article.id}
                                onClick={() => onSelect(article)}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.9)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '16px',
                                    padding: '24px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    border: '1px solid rgba(255, 255, 255, 0.5)',
                                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                                    animation: `fadeInUp 0.5s ease ${index * 0.1}s backwards`
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(102, 126, 234, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                                }}
                            >
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.6) 0%, rgba(118, 75, 162, 0.6) 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '16px'
                                }}>
                                    <Sparkles size={24} color="white" />
                                </div>

                                <h3 style={{
                                    fontSize: '20px',
                                    fontWeight: '700',
                                    color: '#1e293b',
                                    marginBottom: '12px',
                                    lineHeight: '1.4'
                                }}>
                                    {article.title}
                                </h3>

                                <p style={{
                                    fontSize: '14px',
                                    color: '#64748b',
                                    lineHeight: '1.6',
                                    marginBottom: '16px',
                                    display: '-webkit-box',
                                    WebkitLineClamp: '3',
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>
                                    {article.content || article.body || 'Clica para ler mais...'}
                                </p>

                                <div style={{
                                    display: 'flex',
                                    gap: '16px',
                                    fontSize: '12px',
                                    color: '#94a3b8',
                                    flexWrap: 'wrap'
                                }}>
                                    {article.date && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Calendar size={14} />
                                            <span>
                                                {new Date(article.date).toLocaleDateString('en-US', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })} at {new Date(article.date).toLocaleTimeString('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                 })}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
            </div>
        );
    }

// ArticleDetail Component - Aesthetic Version
    function ArticleDetail({ article, onBack }) {
        if (!article) return null;

        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '40px 20px',
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            }}>
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        padding: '30px 40px',
                        position: 'relative'
                    }}>
                        <button
                            onClick={onBack}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'rgba(255, 255, 255, 0.2)',
                                backdropFilter: 'blur(10px)',
                                border: 'none',
                                color: 'white',
                                padding: '12px 24px',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '600',
                                transition: 'all 0.3s ease',
                                marginBottom: '20px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                                e.currentTarget.style.transform = 'translateX(-5px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                                e.currentTarget.style.transform = 'translateX(0)';
                            }}
                        >
                            <ArrowLeft size={20} />
                            Voltar
                        </button>

                        <h1 style={{
                            color: 'white',
                            fontSize: '42px',
                            fontWeight: '800',
                            margin: '0',
                            lineHeight: '1.2',
                            textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
                        }}>
                            {article.title}
                        </h1>

                        <div style={{
                            display: 'flex',
                            gap: '24px',
                            marginTop: '20px',
                            flexWrap: 'wrap'
                        }}>
                            {article.author && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    fontSize: '14px'
                                }}>
                                    <User size={16} />
                                    <span>{article.author}</span>
                                </div>
                            )}
                            {article.date && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    fontSize: '14px'
                                }}>
                                    <Calendar size={16} />
                                    <span>{article.date}</span>
                                </div>
                            )}
                            {article.readTime && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    fontSize: '14px'
                                }}>
                                    <Clock size={16} />
                                    <span>{article.readTime} min read</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={{
                        padding: '50px 40px',
                    }}>
                        {article.content && (
                            <div style={{
                                fontSize: '20px',
                                lineHeight: '1.8',
                                color: '#4a5568',
                                marginBottom: '40px',
                                padding: '24px',
                                background: 'linear-gradient(135deg, #f6f8fb 0%, #eef2f7 100%)',
                                borderRadius: '16px',
                                borderLeft: '4px solid #667eea',
                                fontStyle: 'italic'
                            }}>
                                {article.content}
                            </div>
                        )}

                        {article.body && (
                            <div style={{
                                fontSize: '18px',
                                lineHeight: '1.9',
                                color: '#2d3748',
                                whiteSpace: 'pre-wrap'
                            }}>
                                {article.body}
                            </div>
                        )}

                        <div style={{
                            marginTop: '60px',
                            paddingTop: '30px',
                            borderTop: '2px solid #e2e8f0',
                            textAlign: 'center'
                        }}>
                            <div style={{
                                display: 'inline-block',
                                padding: '12px 30px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                borderRadius: '50px',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: '600',
                                letterSpacing: '0.5px'
                            }}>
                                ✨ Fim do Artigo
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
