import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Board } from '../../types';

interface BoardModalProps {
  board?: Board;
  isOpen: boolean;
  onClose: () => void;
  onSave: (board: { name: string; description: string }) => void;
}

export function BoardModal({ board, isOpen, onClose, onSave }: BoardModalProps) {
  const [name, setName] = useState(board?.name || '');
  const [description, setDescription] = useState(board?.description || '');

  const handleSave = () => {
    if (!name.trim()) return;
    
    onSave({
      name,
      description,
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {board ? 'Edit Board' : 'Create New Board'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Board Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter board name"
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
              placeholder="Enter board description (optional)"
              rows={3}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!name.trim()}>
            {board ? 'Save Changes' : 'Create Board'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}