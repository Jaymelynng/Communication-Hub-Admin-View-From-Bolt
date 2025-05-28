import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Search, Plus, Filter, Download, ExternalLink, Calendar, Clock } from 'lucide-react';

// Types
interface MarketingItem {
  id: number;
  title: string;
  type: 'Sticker' | 'Quarter Sheet' | 'Full Sheet' | 'Poster' | 'Banner';
  thumbnail: string;
  contentUrl: string;
  dimensions?: string;
  notes?: string;
  uploadedAt: string;
  uploadedBy: string;
}

const GalleryView = () => {
  const [marketingItems, setMarketingItems] = useState<MarketingItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedWeek, setSelectedWeek] = useState<string>('2024-12-02');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Mock data - replace with actual Supabase fetch
  useEffect(() => {
    const mockItems: MarketingItem[] = [
      {
        id: 1,
        title: "December Character Stickers",
        type: "Sticker",
        thumbnail: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634",
        contentUrl: "https://example.com/downloads/december-stickers.pdf",
        uploadedAt: "2024-12-02",
        uploadedBy: "Jayme",
        notes: "Character stickers for December promotion"
      },
      {
        id: 2,
        title: "Showcase Poster",
        type: "Full Sheet",
        thumbnail: "https://images.unsplash.com/photo-1518281420975-50db6e5d0a97",
        contentUrl: "https://example.com/downloads/showcase-poster.pdf",
        uploadedAt: "2024-12-02",
        uploadedBy: "Jayme",
        dimensions: "8.5 x 11 in",
        notes: "Full size showcase poster"
      },
      {
        id: 3,
        title: "Showcase Poster - Quarter Sheet",
        type: "Quarter Sheet",
        thumbnail: "https://images.unsplash.com/photo-1518281420975-50db6e5d0a97",
        contentUrl: "https://example.com/downloads/showcase-quarter.pdf",
        uploadedAt: "2024-12-02",
        uploadedBy: "Jayme",
        notes: "Quarter sheet version of showcase poster"
      },
      {
        id: 4,
        title: "December Events",
        type: "Full Sheet",
        thumbnail: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634",
        contentUrl: "https://example.com/downloads/december-events.pdf",
        uploadedAt: "2024-12-02",
        uploadedBy: "Jayme",
        dimensions: "8.5 x 11 in"
      },
      {
        id: 5,
        title: "15% Early Bird Camp Promo",
        type: "Quarter Sheet",
        thumbnail: "https://images.unsplash.com/photo-1472898965229-f9b06b9c9bbe",
        contentUrl: "https://example.com/downloads/early-bird-promo.pdf",
        uploadedAt: "2024-12-02",
        uploadedBy: "Jayme",
        notes: "Early bird promotion for winter camp"
      },
      {
        id: 6,
        title: "Winter Camp Coming Soon",
        type: "Quarter Sheet",
        thumbnail: "https://images.unsplash.com/photo-1472898965229-f9b06b9c9bbe",
        contentUrl: "https://example.com/downloads/winter-camp-soon.pdf",
        uploadedAt: "2024-12-02",
        uploadedBy: "Jayme",
        notes: "Winter camp announcement flyer"
      }
    ];

    setMarketingItems(mockItems);
  }, []);

  // Filter items by search term, type, and week
  const filteredItems = marketingItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (item.notes && item.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'All' || item.type === selectedType;
    const matchesWeek = item.uploadedAt === selectedWeek;
    
    return matchesSearch && matchesType && matchesWeek;
  });

  const weeks = [
    { value: "2024-12-02", label: "December 2-8, 2024" },
    { value: "2024-12-09", label: "December 9-15, 2024" },
    { value: "2024-12-16", label: "December 16-22, 2024" },
    { value: "2024-12-23", label: "December 23-29, 2024" }
  ];

  const types: ('All' | 'Sticker' | 'Quarter Sheet' | 'Full Sheet' | 'Poster' | 'Banner')[] = [
    'All', 'Sticker', 'Quarter Sheet', 'Full Sheet', 'Poster', 'Banner'
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif" style={{ color: "#8b8585" }}>
            In-Gym Marketing Materials
          </h1>
          <p className="text-sm mt-2" style={{ color: "#8b8585" }}>
            Access and manage all your marketing materials in one place
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="px-6 py-3 rounded-lg text-white flex items-center gap-2"
          style={{ background: "#b48f8f" }}
        >
          <Plus className="w-4 h-4" />
          Upload New
        </button>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-4 items-center">
        <select
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(e.target.value)}
          className="w-64 px-4 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-rose-200"
          style={{ borderColor: "#cec4c1" }}
        >
          {weeks.map(week => (
            <option key={week.value} value={week.value}>
              {week.label}
            </option>
          ))}
        </select>

        <div className="flex-1 relative">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" 
            style={{ color: "#737373" }} 
          />
          <input
            type="text"
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-200"
            style={{ borderColor: "#cec4c1" }}
          />
        </div>

        <div className="flex gap-2">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedType === type
                  ? 'text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              style={{ 
                backgroundColor: selectedType === type ? "#b48f8f" : "white",
                border: selectedType === type ? 'none' : '1px solid #cec4c1'
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div>
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-lg border overflow-hidden hover:shadow-md transition-all"
                style={{ borderColor: "#cec4c1" }}
              >
                <div className="aspect-video relative group">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center gap-4">
                    <a
                      href={item.contentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white text-gray-800 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all"
                      title="View"
                    >
                      <ExternalLink size={16} />
                    </a>
                    <a
                      href={item.contentUrl}
                      download
                      className="p-2 rounded-full bg-white text-gray-800 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all"
                      title="Download"
                    >
                      <Download size={16} />
                    </a>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2" style={{ color: "#8b8585" }}>
                    {item.title}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                        {item.type}
                      </span>
                      {item.dimensions && (
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                          {item.dimensions}
                        </span>
                      )}
                    </div>
                    {item.notes && (
                      <p className="text-sm" style={{ color: "#737373" }}>{item.notes}</p>
                    )}
                    <div className="flex items-center justify-between text-xs" style={{ color: "#737373" }}>
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{new Date(item.uploadedAt).toLocaleDateString()}</span>
                      </div>
                      <span>By {item.uploadedBy}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p style={{ color: "#737373" }}>No materials found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Upload Modal (placeholder) */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium" style={{ color: "#8b8585" }}>Upload New Material</h2>
              <button onClick={() => setShowUploadModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#737373" }}>
                  Title
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  style={{ borderColor: "#cec4c1" }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#737373" }}>
                  Material Type
                </label>
                <select
                  className="w-full p-2 border rounded-lg"
                  style={{ borderColor: "#cec4c1" }}
                >
                  <option>Sticker</option>
                  <option>Quarter Sheet</option>
                  <option>Full Sheet</option>
                  <option>Poster</option>
                  <option>Banner</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#737373" }}>
                  Upload File
                </label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center" style={{ borderColor: "#cec4c1" }}>
                  <div className="flex flex-col items-center">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#b48f8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <h3 className="text-lg font-medium mb-2" style={{ color: "#8b8585" }}>
                      Drop files to upload
                    </h3>
                    <p className="text-sm mb-4" style={{ color: "#737373" }}>
                      or click to select files
                    </p>
                    <input
                      type="file"
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="px-6 py-2 rounded-lg text-white cursor-pointer"
                      style={{ background: "#b48f8f" }}
                    >
                      Select File
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#737373" }}>
                  Notes
                </label>
                <textarea
                  className="w-full p-2 border rounded-lg"
                  style={{ borderColor: "#cec4c1" }}
                  rows={3}
                  placeholder="Optional printing instructions or other notes"
                />
              </div>
              
              <button
                className="w-full px-6 py-3 rounded-lg text-white"
                style={{ background: "#b48f8f" }}
              >
                Upload Material
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryView;