import React from 'react';

interface ReviewFormProps {
  onSubmit: (data: { status: 'approved' | 'needs_edits'; notes: string }) => void;
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      status: formData.get('status') as 'approved' | 'needs_edits',
      notes: formData.get('notes') as string
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2 text-[#737373]">
          Review Status
        </label>
        <select
          name="status"
          className="w-full px-4 py-2 rounded-lg border"
          style={{ borderColor: "#cec4c1" }}
          required
        >
          <option value="">Select status...</option>
          <option value="approved">Approve Email</option>
          <option value="needs_edits">Request Changes</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-[#737373]">
          Notes
        </label>
        <textarea
          name="notes"
          rows={4}
          className="w-full px-4 py-2 rounded-lg border"
          style={{ borderColor: "#cec4c1" }}
          placeholder="Add any feedback or notes here..."
        />
      </div>

      <button
        type="submit"
        className="w-full px-8 py-3 rounded-lg text-white bg-[#b48f8f] hover:bg-[#a07f7f] transition-colors"
      >
        Submit Review
      </button>
    </form>
  );
}