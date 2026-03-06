import { useState, useEffect } from 'react';

export default function MongoMessagesPage() {
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await fetch(`${backendUrl}/api/public/mongo-messages`);
            if (res.ok) {
                const data = await res.json();
                setMessages(data);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${backendUrl}/api/public/mongo-messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, message })
            });

            if (res.ok) {
                setName('');
                setMessage('');
                fetchMessages();
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', fontFamily: 'system-ui, sans-serif' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>MongoDB Messages (Test Page)</h1>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>
                This is a simple page that reads and writes from a MongoDB connection made inside <code>index.js</code>.
            </p>

            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Leave a Message</h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '16px' }}
                    />
                    <textarea
                        placeholder="Your Message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows="4"
                        style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '16px', resize: 'vertical' }}
                    ></textarea>
                    <button type="submit" style={{ padding: '14px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold', transition: 'background 0.2s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'} onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}>
                        Submit Message
                    </button>
                </form>
            </div>

            <div className="messages-list">
                <h3 style={{ marginBottom: '20px' }}>Recent Messages ({messages.length})</h3>
                {loading ? <p style={{ color: '#666' }}>Loading messages from MongoDB...</p> :
                    messages.length === 0 ? <p style={{ color: '#666' }}>No messages yet. Be the first!</p> :
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {messages.map((msg, idx) => (
                                <div key={idx} style={{ padding: '20px', backgroundColor: '#fff', borderLeft: '4px solid #2563eb', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <strong style={{ fontSize: '1.1rem', color: '#111' }}>{msg.name}</strong>
                                        <small style={{ color: '#888' }}>{new Date(msg.createdAt).toLocaleString()}</small>
                                    </div>
                                    <p style={{ margin: 0, color: '#444', lineHeight: '1.5' }}>{msg.message}</p>
                                </div>
                            ))}
                        </div>
                }
            </div>
        </div>
    );
}
