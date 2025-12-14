import React, { useState, useEffect } from 'react';
import { Upload, Wand2, Download, Loader, Image as ImageIcon } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import { apiFetch } from '../utils/api';

const EditPage = () => {
  const { accessToken } = useAuth();
  const [step, setStep] = useState(1); // 1: Upload, 2: Analyzing, 3: Selection, 4: Generating, 5: Result
  const [userImage, setUserImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [credits, setCredits] = useState(1);
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [poseCategory, setPoseCategory] = useState('');
  const [additionalPrompt, setAdditionalPrompt] = useState('');

  // Fetch credits on load
  useEffect(() => {
    if (accessToken) {
        apiFetch(`${API_URL}/user/credits`, {
            headers: { 'x-auth-token': accessToken }
        })
        .then(res => res.json())
        .then(data => setCredits(data.credits))
        .catch(err => console.error("Failed to fetch credits", err));
    }
  }, [accessToken]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result); // Keep for preview
      };
      reader.readAsDataURL(file);
      
      // Send file to backend
      analyzePose(file);
    }
  };

  const analyzePose = async (file) => {
    setStep(2);
    try {
      const formData = new FormData();
      formData.append('image', file);
      // formData.append('email', 'demo@user.com');

      const res = await apiFetch(`${API_URL}/user/analyze-pose`, {
        method: 'POST',
        headers: { 'x-auth-token': accessToken },
        body: formData // No Content-Type header needed for FormData
      });
      const data = await res.json();
      
      if (data.error) throw new Error(data.error);
      
      setPoseCategory(data.pose);
      setMatches(data.matches);
      setUploadedImageUrl(data.userImageUrl); // Store Cloudinary URL for generation
      setStep(3);
    } catch (err) {
      console.error("Analysis failed", err);
      setStep(1); // Reset on error
    }
  };

  const generateEdit = async () => {
    if (!selectedMatch || credits < 2) return;
    
    setStep(4);
    try {
      const res = await apiFetch(`${API_URL}/user/generate-edit`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'x-auth-token': accessToken
        },
        body: JSON.stringify({ 
          // email: 'demo@user.com',
          preedited_prompt: selectedMatch.preedited_prompt,
          additional_prompt: additionalPrompt,
          userImageUrl: uploadedImageUrl // Use Cloudinary URL, not Base64 
        })
      });
      const data = await res.json();
      setResultImage(data.imageUrl);
      setCredits(data.remainingCredits);
      setStep(5);
    } catch (err) {
      console.error("Generation failed", err);
      setStep(3);
    }
  };

  return (
    <div className="min-h-screen bg-art-black text-white pt-24 md:pt-32 px-4 md:px-10 pb-20">
      <SEO 
        title="Studio" 
        description="Upload your photo and let our AI analyze the pose to suggest outstanding artistic styles."
        keywords="AI studio, pose detection, style transfer, photo editor"
      />
      
      {/* Header & Credits */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center max-w-7xl mx-auto mb-8 md:mb-10 gap-4">
        <h1 className="text-3xl md:text-4xl font-serif">Studio</h1>
        <div className="bg-white/10 px-4 md:px-6 py-2 rounded-full border border-white/20 flex items-center gap-2 text-sm md:text-base">
            <span className="text-art-accent">✦</span>
            <span>{credits} Credit{credits !== 1 ? 's' : ''} Available</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto min-h-[500px] md:min-h-[600px] bg-white/5 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden flex flex-col items-center justify-center p-4 md:p-10">
        
        {/* Step 1: Upload */}
        {step === 1 && (
            <div className="text-center flex flex-col items-center gap-6 md:gap-8 fade-up w-full">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-dashed border-white/30">
                    <Upload size={32} className="text-gray-400 md:w-10 md:h-10" />
                </div>
                <div>
                    <h2 className="text-2xl md:text-3xl font-serif mb-2 md:mb-4">Upload Your Photo</h2>
                    <p className="text-gray-400 max-w-md mx-auto text-sm md:text-base px-4">
                        For best results, use a clear image with good lighting. Our AI will detect your pose automatically.
                    </p>
                </div>
                <label className="cursor-pointer w-full md:w-auto">
                    <MagneticButton>
                        <div className="px-6 py-3 md:px-8 md:py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors w-full md:w-auto text-center">
                            Select Image
                        </div>
                    </MagneticButton>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
            </div>
        )}

        {/* Step 2: Analyzing */}
        {step === 2 && (
            <div className="text-center space-y-4 md:space-y-6 fade-up">
                {/* Show uploaded image preview */}
                {userImage && (
                    <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto rounded-xl overflow-hidden border-2 border-art-accent/50 mb-4 md:mb-6">
                        <img src={userImage} alt="Your upload" className="w-full h-full object-cover" />
                    </div>
                )}
                <Loader size={48} className="animate-spin text-art-accent mx-auto md:w-[60] md:h-[60]" />
                <h2 className="text-xl md:text-2xl font-serif">Analyzing Pose...</h2>
                <p className="text-sm md:text-base text-gray-400">Identifying structure and composition</p>
            </div>
        )}

        {/* Step 3: Selection */}
        {step === 3 && (
            <div className="w-full h-full flex flex-col fade-up">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-serif mb-1 md:mb-2">Select a Style</h2>
                        <p className="text-sm md:text-base text-gray-400">Detected Pose: <span className="text-art-accent font-bold capitalize">{poseCategory?.toLowerCase()}</span></p>
                    </div>
                    {selectedMatch && (
                        <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                            <button 
                                onClick={() => {
                                    if (credits < 2) {
                                        navigate('/pricing');
                                    } else {
                                        generateEdit();
                                    }
                                }}
                                className={`w-full md:w-auto px-6 py-3 md:px-8 md:py-3 rounded-full font-bold flex items-center justify-center gap-2 transition-all ${
                                    credits >= 2 
                                    ? 'bg-art-accent text-black hover:bg-white' 
                                    : 'bg-red-500 text-white hover:bg-red-600'
                                }`}
                            >
                                <Wand2 size={18} className="md:w-5 md:h-5" />
                                {credits >= 2 ? 'Generate (2 Credits)' : 'Buy Credits'}
                            </button>
                        </div>
                    )}
                </div>

                {/* Show user's uploaded image */}
                {userImage && (
                    <div className="mb-4 md:mb-6">
                        <p className="text-xs md:text-sm text-gray-400 mb-2">Your Photo:</p>
                        <div className="relative w-24 h-24 md:w-48 md:h-48 rounded-lg md:rounded-xl overflow-hidden border-2 border-white/20">
                            <img src={userImage} alt="Your upload" className="w-full h-full object-cover" />
                        </div>
                    </div>
                )}
                
                {/* Additional Prompt Input */}
                 <div className="mb-6">
                    <label className="text-xs md:text-sm text-gray-400 mb-2 block">Additional Instructions (Optional, max 100 words):</label>
                    <textarea 
                        value={additionalPrompt}
                        onChange={(e) => {
                            const words = e.target.value.trim().split(/\s+/);
                            if (words.length <= 100) {
                                setAdditionalPrompt(e.target.value);
                            }
                        }}
                        placeholder="e.g., Make the lighting darker, add neon rain..."
                        className="w-full bg-black/40 border border-white/20 rounded-xl p-3 text-sm focus:border-art-accent outline-none resize-none h-20"
                    />
                </div>

                <p className="text-xs md:text-sm text-gray-400 mb-3 md:mb-4">Choose a style to apply:</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6 flex-1 pb-4">
                    {matches.map((match) => (
                        <div 
                            key={match._id}
                            onClick={() => setSelectedMatch(match)}
                            className={`relative aspect-[3/4] rounded-lg md:rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${selectedMatch?._id === match._id ? 'border-art-accent scale-95 md:scale-105' : 'border-transparent hover:border-white/30'}`}
                        >
                            <img src={match.cloudinary_url} alt="Style" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2 md:p-4">
                                <p className="text-[10px] md:text-xs text-gray-300 line-clamp-2">{match.preedited_prompt}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Step 4: Generating */}
        {step === 4 && (
            <div className="text-center space-y-6 md:space-y-8 fade-up">
                <div className="relative w-24 h-24 md:w-40 md:h-40 mx-auto">
                    <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-art-accent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Wand2 size={32} className="text-white animate-pulse md:w-10 md:h-10" />
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl md:text-3xl font-serif mb-2">Creating Masterpiece</h2>
                    <p className="text-sm md:text-base text-gray-400">Applying style transfer and lighting adjustments...</p>
                </div>
            </div>
        )}

        {/* Step 5: Result */}
        {step === 5 && (
            <div className="w-full h-full flex flex-col items-center fade-up pb-10">
                <div className="relative w-full max-w-md md:max-w-2xl aspect-[3/4] rounded-xl overflow-hidden mb-6 md:mb-8 border border-white/20 shadow-2xl shadow-art-accent/20">
                    <img src={resultImage} alt="Generated Art" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto px-4 md:px-0">
                    <button 
                        onClick={() => {
                            setStep(1);
                            setAdditionalPrompt('');
                        }}
                        className="w-full md:w-auto px-6 py-3 border border-white/20 rounded-full hover:bg-white/10 transition-colors text-center"
                    >
                        Start Over
                    </button>
                    <button 
                        onClick={async () => {
                            try {
                                const response = await fetch(resultImage);
                                const blob = await response.blob();
                                const url = window.URL.createObjectURL(blob);
                                const link = document.createElement('a');
                                link.href = url;
                                link.download = `art-ai-generated-${Date.now()}.jpg`;
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                                window.URL.revokeObjectURL(url);
                            } catch (err) {
                                console.error("Download failed", err);
                                window.open(resultImage, '_blank');
                            }
                        }}
                        className="w-full md:w-auto px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                    >
                        <Download size={20} />
                        Download High-Res
                    </button>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default EditPage;
