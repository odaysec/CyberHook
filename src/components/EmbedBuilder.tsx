import React, { useState } from 'react';
import { Plus, Minus, Hash, Type, Link, Calendar, User, Image, FileText } from 'lucide-react';
import { DiscordEmbed } from '../types';
import { hexToDecimal } from '../utils/discord';

interface EmbedBuilderProps {
  embeds: DiscordEmbed[];
  onEmbedsChange: (embeds: DiscordEmbed[]) => void;
  className?: string;
}

export const EmbedBuilder: React.FC<EmbedBuilderProps> = ({
  embeds,
  onEmbedsChange,
  className = '',
}) => {
  const [showBuilder, setShowBuilder] = useState(false);

  const addEmbed = () => {
    const newEmbed: DiscordEmbed = {
      title: '',
      description: '',
      color: 0x7B68EE,
      fields: [],
    };
    onEmbedsChange([...embeds, newEmbed]);
  };

  const updateEmbed = (index: number, updates: Partial<DiscordEmbed>) => {
    const newEmbeds = [...embeds];
    newEmbeds[index] = { ...newEmbeds[index], ...updates };
    onEmbedsChange(newEmbeds);
  };

  const removeEmbed = (index: number) => {
    onEmbedsChange(embeds.filter((_, i) => i !== index));
  };

  const addField = (embedIndex: number) => {
    const newEmbeds = [...embeds];
    if (!newEmbeds[embedIndex].fields) {
      newEmbeds[embedIndex].fields = [];
    }
    newEmbeds[embedIndex].fields!.push({
      name: 'Field Name',
      value: 'Field Value',
      inline: false,
    });
    onEmbedsChange(newEmbeds);
  };

  const updateField = (embedIndex: number, fieldIndex: number, updates: any) => {
    const newEmbeds = [...embeds];
    newEmbeds[embedIndex].fields![fieldIndex] = {
      ...newEmbeds[embedIndex].fields![fieldIndex],
      ...updates,
    };
    onEmbedsChange(newEmbeds);
  };

  const removeField = (embedIndex: number, fieldIndex: number) => {
    const newEmbeds = [...embeds];
    newEmbeds[embedIndex].fields = newEmbeds[embedIndex].fields!.filter((_, i) => i !== fieldIndex);
    onEmbedsChange(newEmbeds);
  };

  return (
    <div className={`bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-colors duration-300 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
          <span className="text-gray-900 dark:text-gray-200 font-medium">Embed Builder</span>
          {embeds.length > 0 && (
            <span className="bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 px-2 py-1 rounded text-sm">
              {embeds.length}
            </span>
          )}
        </div>
        <button
          onClick={() => setShowBuilder(!showBuilder)}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
        >
          {showBuilder ? 'Hide' : 'Show'}
        </button>
      </div>

      {showBuilder && (
        <div className="space-y-4">
          <button
            onClick={addEmbed}
            className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-cyan-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Embed
          </button>

          {embeds.map((embed, embedIndex) => (
            <div key={embedIndex} className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-3 transition-colors duration-300">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Embed {embedIndex + 1}</span>
                <button
                  onClick={() => removeEmbed(embedIndex)}
                  className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Type className="w-4 h-4 inline mr-1" />
                    Title
                  </label>
                  <input
                    type="text"
                    value={embed.title || ''}
                    onChange={(e) => updateEmbed(embedIndex, { title: e.target.value })}
                    placeholder="Embed title"
                    className="w-full bg-white dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Hash className="w-4 h-4 inline mr-1" />
                    Color
                  </label>
                  <input
                    type="color"
                    value={`#${embed.color?.toString(16).padStart(6, '0') || '7B68EE'}`}
                    onChange={(e) => updateEmbed(embedIndex, { color: hexToDecimal(e.target.value) })}
                    className="w-full bg-white dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 h-10 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Link className="w-4 h-4 inline mr-1" />
                    URL
                  </label>
                  <input
                    type="url"
                    value={embed.url || ''}
                    onChange={(e) => updateEmbed(embedIndex, { url: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full bg-white dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Image className="w-4 h-4 inline mr-1" />
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={embed.image?.url || ''}
                    onChange={(e) => updateEmbed(embedIndex, { 
                      image: e.target.value ? { url: e.target.value } : undefined 
                    })}
                    placeholder="https://example.com/image.png"
                    className="w-full bg-white dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  value={embed.description || ''}
                  onChange={(e) => updateEmbed(embedIndex, { description: e.target.value })}
                  placeholder="Embed description"
                  rows={3}
                  className="w-full bg-white dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none transition-colors duration-300"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Fields</span>
                  <button
                    onClick={() => addField(embedIndex)}
                    className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors text-sm flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    Add Field
                  </button>
                </div>

                {embed.fields?.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="bg-white dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600 rounded p-3 space-y-2 transition-colors duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 dark:text-gray-400">Field {fieldIndex + 1}</span>
                      <button
                        onClick={() => removeField(embedIndex, fieldIndex)}
                        className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={field.name}
                        onChange={(e) => updateField(embedIndex, fieldIndex, { name: e.target.value })}
                        placeholder="Field name"
                        className="w-full bg-gray-50 dark:bg-gray-600/50 border border-gray-200 dark:border-gray-500 rounded px-2 py-1 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-sm transition-colors duration-300"
                      />
                      <input
                        type="text"
                        value={field.value}
                        onChange={(e) => updateField(embedIndex, fieldIndex, { value: e.target.value })}
                        placeholder="Field value"
                        className="w-full bg-gray-50 dark:bg-gray-600/50 border border-gray-200 dark:border-gray-500 rounded px-2 py-1 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-sm transition-colors duration-300"
                      />
                    </div>
                    
                    <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <input
                        type="checkbox"
                        checked={field.inline || false}
                        onChange={(e) => updateField(embedIndex, fieldIndex, { inline: e.target.checked })}
                        className="rounded border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-600 text-cyan-600 focus:ring-cyan-500"
                      />
                      Inline
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {!showBuilder && embeds.length > 0 && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {embeds.length} embed{embeds.length > 1 ? 's' : ''} configured
        </div>
      )}
    </div>
  );
};