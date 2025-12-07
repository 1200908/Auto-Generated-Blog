import React from "react";
import {ArrowLeft, Calendar, Clock, Sparkles, User} from "lucide-react";

export default function ArticleDetail({ article, onBack }) {
    if (!article) return null;

    return (
        <div style={{
            margin: -8,
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f0f4ff 0%, #d9e4ff 50%, #e8d4ff 100%)',
            padding: '40px 20px',
            animation: 'fadeIn 0.4s ease-out',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        }}>
            {/* Container principal */}
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                overflow: 'hidden',
                animation: 'fadeInUp 0.5s ease-out',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}>
                {/* Header com botão back */}
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
                        Back
                    </button>

                    {/* Título do artigo */}
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

                    {/* Metadata */}
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

                {/* Conteúdo do artigo */}
                <div style={{
                    padding: '50px 40px',
                }}>
                    {/* Intro/Summary */}
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

                    {/* Corpo principal */}
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

                    {/* Decoração final */}
                    <div style={{
                        marginTop: '60px',
                        paddingTop: '30px',
                        borderTop: '2px solid #e2e8f0',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '12px 30px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '50px',
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: '600',
                            gap:'16px',
                            letterSpacing: '0.5px'

                        }}
                            onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
                        }}
                            onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                            }}
                             onClick={onBack}
                        >
                            <Sparkles size={15} color="#FFFFFF" />
                            End of Article
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                  ::-webkit-scrollbar { 
                    width: 12px; 
                  }
                  ::-webkit-scrollbar-track { 
                    background: rgba(240, 244, 255, 0.9);
                  }
                  ::-webkit-scrollbar-thumb { 
                    background: linear-gradient(180deg, 
                      rgba(102, 126, 234, 0.4), 
                      rgba(118, 75, 162, 0.4)
                    ); 
                    border-radius: 10px; 
                  }
                  ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(180deg, 
                      rgba(102, 126, 234, 0.9), 
                      rgba(118, 75, 162, 0.9)
                    );
                  }
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
