import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Column } from '../../types';

interface ColumnModalProps {
  column?: Column;
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

export function ColumnModal({ column, isOpen, onClose, onSave }: ColumnModalProps) {
  const [name, setName] = useState(column?.name || '');

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(name);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {column ? 'Edit Column' : 'Add New Column'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Column Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter column name"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!name.trim()}>
            {column ? 'Save Changes' : 'Add Column'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}