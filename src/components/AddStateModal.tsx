
import { useState } from 'react';
import { X } from 'lucide-react';

// Using interfaces but marking them as used with type references
type PlaceType = {
  name: string;
  image: string;
  description: string;
};

type CuisineType = {
  name: string;
  description: string;
  image: string;
};

interface StateFormData {
  name: string;
  image: string;
  capital: string;
  language: string;
  description: string;
  path: string;
  tags: string[];
  places: PlaceType[];
  cuisine: CuisineType[];
  history: {
    ancient: string;
    medieval: string;
    modern: string;
  };
}

interface AddStateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StateFormData) => void;
}

const AddStateModal = ({ isOpen, onClose, onSubmit }: AddStateModalProps) => {
  const [formData, setFormData] = useState<StateFormData>({
    name: '',
    image: '',
    capital: '',
    language: '',
    description: '',
    path: '',
    tags: [],
    places: [],
    cuisine: [],
    history: {
      ancient: '',
      medieval: '',
      modern: '',
    },
  });

  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tags = event.target.value.split(',').map(tag => tag.trim());
    setFormData(prev => ({
      ...prev,
      tags
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center overflow-auto py-10">
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
        <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-white">Add New State</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">State Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-gray-700 rounded-md px-4 py-2 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">URL Path</label>
              <input
                type="text"
                name="path"
                value={formData.path}
                onChange={handleInputChange}
                className="w-full bg-gray-700 rounded-md px-4 py-2 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Capital</label>
              <input
                type="text"
                name="capital"
                value={formData.capital}
                onChange={handleInputChange}
                className="w-full bg-gray-700 rounded-md px-4 py-2 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Language</label>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="w-full bg-gray-700 rounded-md px-4 py-2 text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags.join(', ')}
              onChange={handleTagsChange}
              className="w-full bg-gray-700 rounded-md px-4 py-2 text-white"
            />
          </div>

          <button
            type="submit"
            className="bg-violet-600 text-white px-6 py-2 rounded-md hover:bg-violet-700 transition-colors"
          >
            Save State
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStateModal;
