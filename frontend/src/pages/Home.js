import React, { useEffect, useState } from "react";
import { api } from "../api/client";
import ArticleList from "../components/ArticleList";
import ArticleDetail from "../components/ArticleDetail";
import {Sparkles, Loader } from "lucide-react";

export default function Home() {
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchArticles();

    }, []);

    const fetchArticles = async () => {
        console.log("🔹 Tentando acessar backend...");
        try {
            const res = await api.get("/articles");
            console.log("✅ Response Axios:", res);
            const sortedArticles = res.data.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });
            console.log("📅 Artigos ordenados:", sortedArticles);
            setArticles(sortedArticles);
        } catch (err) {
            console.error("❌ Erro de resposta:", err.response);
        }
    };

    const generateArticle = async () => {
        if (!prompt) return;
        if (prompt.length > 100) {
            alert("O prompt não pode ter mais de 50 caracteres.");
            return;
        }
        setLoading(true);
        try {
            const res = await api.post("/articles/generate", { topic: prompt });
            setArticles([res.data, ...articles]);
            setPrompt("");
        } catch (e) {
            console.error(e);
            alert("Failed to generate article");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !loading) {
            generateArticle();
        }
    };

    if (selectedArticle) {
        return <ArticleDetail article={selectedArticle} onBack={() => setSelectedArticle(null)} />;
    }

    return (
        <div style={{
            margin: -8,
            minHeight: '100vh',
            padding: '60px 20px',
            background: 'linear-gradient(135deg, #f0f4ff 0%, #d9e4ff 50%, #e8d4ff 100%)',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

        }}>
            {/* Header */}
            <div style={{
                textAlign: 'center',
                marginBottom: '50px'
            }}>
                <h1 style={{
                    fontSize: '56px',
                    fontWeight: '900',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '16px',
                    lineHeight: '1.2'
                }}>
                    <Sparkles size={36} color="#764ba2" />
                    <span style={{
                        fontSize: '56px',
                        fontWeight: '900',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        marginBottom: '16px',
                        lineHeight: '1.2'
                    }}>
                        </span>
                    Auto-Generated Blog

                </h1>
                <p style={{
                    fontSize: '18px',
                    color: '#64748b',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    Create amazing articles with the power of AIssss
                </p>
            </div>

            {/* Input Section */}
            <div style={{
                maxWidth: '700px',
                margin: '0 auto 60px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                padding: '32px',
                borderRadius: '24px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.5)'
            }}>
                <div style={{
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap'
                }}>
                    <input
                        type="text"
                        value={prompt}
                        maxLength={100}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Write a topic to generate an article..."
                        disabled={loading}
                        style={{
                            flex: '1',
                            minWidth: '250px',
                            padding: '16px 20px',
                            fontSize: '16px',
                            border: '2px solid #e2e8f0',
                            borderRadius: '12px',
                            outline: 'none',
                            transition: 'all 0.3s ease',
                            fontFamily: 'inherit'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#667eea';
                            e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#e2e8f0';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                    <button
                        onClick={generateArticle}
                        disabled={loading || !prompt.trim()}
                        style={{
                            padding: '16px 32px',
                            fontSize: '16px',
                            fontWeight: '600',
                            border: 'none',
                            borderRadius: '12px',
                            background: loading || !prompt.trim()
                                ? '#cbd5e1'
                                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            cursor: loading || !prompt.trim() ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontFamily: 'inherit',
                            whiteSpace: 'nowrap'
                        }}
                        onMouseEnter={(e) => {
                            if (!loading && prompt.trim()) {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {loading ? (
                            <>
                                <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Sparkles size={20} />
                                Generate Articles
                            </>
                        )}
                    </button>
                </div>
            </div>

            <ArticleList articles={articles} onSelect={setSelectedArticle} onRefresh={fetchArticles}/>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>

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
                `}</style>
        </div>
    );
}
