import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Upload, Save, Loader, Trash2 } from 'lucide-react';

const AdminPage = () => {
  const [assets, setAssets] = useState([]);
  const [formData, setFormData] = useState({
    pose_category: 'FRONT_FULL_BODY',
    gender: 'MALE',
    preedited_prompt: '',
    admin_notes: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [autoExtract, setAutoExtract] = useState(true);
  const [extracting, setExtracting] = useState(false);

  const { token } = useAuth();

  useEffect(() => {
    if (token) {
        fetchAssets();
    }
  }, [token]);

  const fetchAssets = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/admin/assets', {
        headers: {
            'x-auth-token': token
        }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setAssets(data);
      } else {
        console.error("Expected array but got:", data);
        setAssets([]);
      }
    } catch (err) {
      console.error("Failed to fetch assets", err);
      setAssets([]);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      if (autoExtract) {
        await extractPrompt(file);
      }
    }
  };

  const extractPrompt = async (file) => {
    setExtracting(true);
    try {
        const formData = new FormData();
        formData.append('image', file);

        const res = await fetch('http://localhost:5001/api/admin/extract-prompt', {
            method: 'POST',
            headers: {
                'x-auth-token': token
            },
            body: formData
        });
        const data = await res.json();
        
        if (data.prompt) {
            setFormData(prev => ({ 
                ...prev, 
                preedited_prompt: data.prompt,
                gender: data.gender || prev.gender,
                pose_category: data.pose || prev.pose_category
            }));
        }
    } catch (err) {
        console.error("Extraction failed", err);
    } finally {
        setExtracting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedImage) {
      alert("Please select an image");
      return;
    }

    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('image', selectedImage);
      formDataToSend.append('pose_category', formData.pose_category);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('preedited_prompt', formData.preedited_prompt);
      formDataToSend.append('admin_notes', formData.admin_notes);

      const res = await fetch('http://localhost:5001/api/admin/assets', {
        method: 'POST',
        headers: {
            'x-auth-token': token
        },
        body: formDataToSend
      });
      
      if (res.ok) {
        setFormData({ pose_category: 'FRONT_FULL_BODY', gender: 'MALE', preedited_prompt: '', admin_notes: '' });
        setSelectedImage(null);
        setImagePreview(null);
        fetchAssets();
      } else {
        const error = await res.json();
        alert(`Upload failed: ${error.error}`);
      }
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this asset? This action cannot be undone.")) {
      try {
        const res = await fetch(`http://localhost:5001/api/admin/assets/${id}`, {
          method: 'DELETE',
          headers: {
            'x-auth-token': token
          }
        });
        if (res.ok) {
          fetchAssets();
        } else {
          alert("Failed to delete asset");
        }
      } catch (err) {
        console.error("Delete failed", err);
        alert("Failed to delete asset");
      }
    }
  };

  return (
    <div className="min-h-screen bg-art-black text-white p-10 pt-32">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        
        {/* Upload Form */}
        <div>
          <h1 className="text-4xl font-serif mb-10">Asset Curation</h1>
          <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/10">
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Reference Image</label>
              <div className="relative">
                <input 
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full bg-black border border-white/20 rounded-lg p-3 focus:border-art-accent outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-art-accent file:text-black hover:file:bg-white"
                  required
                />
              </div>
              {imagePreview && (
                <div className="mt-4">
                  <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-white/20" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Pose Category</label>
              <select 
                value={formData.pose_category}
                onChange={(e) => setFormData({...formData, pose_category: e.target.value})}
                className="w-full bg-black border border-white/20 rounded-lg p-3 focus:border-art-accent outline-none"
              >
                {['FRONT_FULL_BODY', 'SIDE_PROFILE', 'BACK_VIEW', 'SITTING', 'CLOSE_UP_PORTRAIT', 'ACTION_SHOT'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Gender</label>
              <select 
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                className="w-full bg-black border border-white/20 rounded-lg p-3 focus:border-art-accent outline-none"
              >
                {['MALE', 'FEMALE', 'NEUTRAL'].map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
                <input 
                    type="checkbox" 
                    id="autoExtract"
                    checked={autoExtract}
                    onChange={(e) => setAutoExtract(e.target.checked)}
                    className="w-4 h-4 accent-art-accent"
                />
                <label htmlFor="autoExtract" className="text-sm text-gray-400 cursor-pointer select-none">
                    Auto-extract prompt from image
                </label>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2 flex justify-between">
                <span>Pre-edited Prompt (Target Style)</span>
                {extracting && <span className="text-art-accent animate-pulse">Extracting prompt...</span>}
              </label>
              <textarea 
                value={formData.preedited_prompt}
                onChange={(e) => setFormData({...formData, preedited_prompt: e.target.value})}
                placeholder="A cyberpunk warrior in neon rain..."
                className="w-full bg-black border border-white/20 rounded-lg p-3 focus:border-art-accent outline-none h-32"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Admin Notes</label>
              <input 
                type="text"
                value={formData.admin_notes}
                onChange={(e) => setFormData({...formData, admin_notes: e.target.value})}
                className="w-full bg-black border border-white/20 rounded-lg p-3 focus:border-art-accent outline-none"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-art-accent text-black font-bold py-4 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <Loader className="animate-spin" /> : <Save size={20} />}
              Save Asset
            </button>
          </form>
        </div>

        {/* Asset List */}
        <div>
          <h2 className="text-2xl font-serif mb-6">Recent Assets</h2>
          <div className="space-y-4 max-h-[1200px] overflow-y-auto pr-4">
            {assets.map((asset) => (
              <div key={asset._id} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <img src={asset.cloudinary_url} alt="Asset" className="w-24 h-24 object-cover rounded-lg bg-gray-800" />
                <div>
                  <div className="flex gap-2 mb-2">
                    <span className="text-xs bg-art-accent text-black px-2 py-1 rounded font-bold">{asset.pose_category}</span>
                    <span className="text-xs bg-white/20 text-white px-2 py-1 rounded font-bold">{asset.gender}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2 line-clamp-2">{asset.preedited_prompt}</p>
                  <p className="text-xs text-gray-600 mt-1">{new Date(asset.createdAt).toLocaleDateString()}</p>
                </div>
                <button 
                    onClick={() => handleDelete(asset._id)}
                    className="ml-auto text-gray-500 hover:text-red-500 transition-colors p-2"
                    title="Delete Asset"
                >
                    <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Community Management */}
        <div className="col-span-1 md:col-span-2 mt-20">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif">Community Management</h2>
                <button 
                    onClick={async () => {
                        if (confirm("Run cleanup to fix base64 URLs? This might take a while.")) {
                            try {
                                const res = await fetch('http://localhost:5001/api/admin/cleanup-community', {
                                    method: 'POST',
                                    headers: { 'x-auth-token': token }
                                });
                                const data = await res.json();
                                alert(data.message);
                                window.location.reload();
                            } catch (err) {
                                alert("Cleanup failed");
                            }
                        }
                    }}
                    className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
                >
                    Fix Base64 URLs
                </button>
            </div>
            <CommunityManager token={token} />
        </div>

      </div>
    </div>
  );
};

const CommunityManager = ({ token }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch('http://localhost:5001/api/user/community');
            const data = await res.json();
            setPosts(data);
        } catch (err) {
            console.error("Failed to fetch community posts", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this community post?")) {
            try {
                const res = await fetch(`http://localhost:5001/api/admin/community/${id}`, {
                    method: 'DELETE',
                    headers: { 'x-auth-token': token }
                });
                if (res.ok) fetchPosts();
            } catch (err) {
                console.error("Failed to delete post", err);
            }
        }
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {posts.map(post => (
                <div key={post._id} className="relative group aspect-[3/4] rounded-lg overflow-hidden border border-white/10">
                    <img src={post.generated_image_url} alt="Community" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                            onClick={() => handleDelete(post._id)}
                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminPage;
