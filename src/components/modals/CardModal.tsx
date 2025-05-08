import { useState } from 'react';
import { X, Calendar, Tag as TagIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, Tag } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface CardModalProps {
  card: Card | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (card: Partial<Card>) => void;
  availableTags: Tag[];
}

export function CardModal({ card, isOpen, onClose, onSave, availableTags }: CardModalProps) {
  const [title, setTitle] = useState(card?.title || '');
  const [description, setDescription] = useState(card?.description || '');
  const [selectedTags, setSelectedTags] = useState<Tag[]>(card?.tags || []);

  const handleSave = () => {
    if (!title.trim()) return;
    
    onSave({
      title,
      description,
      tags: selectedTags,
    });
    
    onClose();
  };

  const toggleTag = (tag: Tag) => {
    if (selectedTags.some(t => t.id === tag.id)) {
      setSelectedTags(selectedTags.filter(t => t.id !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {card ? 'Edit Card' : 'Create New Card'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter card title"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter card description"
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <TagIcon className="h-4 w-4" />
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedTags.some(t => t.id === tag.id)
                      ? 'opacity-100'
                      : 'opacity-60'
                  }`}
                  style={{
                    backgroundColor: `${tag.color}20`,
                    color: tag.color,
                    border: selectedTags.some(t => t.id === tag.id)
                      ? `1px solid ${tag.color}`
                      : '1px solid transparent',
                  }}
                  onClick={() => toggleTag(tag)}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
          
          {card && (
            <div className="text-xs text-gray-500 flex items-center gap-1 pt-2">
              <Calendar className="h-3.5 w-3.5" />
              <span>Created {formatDistanceToNow(new Date(card.createdAt), { addSuffix: true })}</span>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!title.trim()}>
            {card ? 'Save Changes' : 'Create Card'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}