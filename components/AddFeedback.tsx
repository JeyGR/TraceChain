"use client";
import { Cross1Icon } from '@radix-ui/react-icons';
import { IconButton, Theme, Text, TextArea } from '@radix-ui/themes';
import React, {  useState } from 'react'

interface componentProps {
    close: () => void
    handleAddFeedback: (content: string) => void;
}

const AddFeedback: React.FC<componentProps> = ({ close, handleAddFeedback }) => {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!feedback.trim()) return;
    setIsSubmitting(true);
    try {
      await handleAddFeedback(feedback);
      close();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Theme appearance="light">
      <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
          <div className="flex justify-between items-start mb-6">
            <Text size="5" weight="bold" className="text-gray-900">
              Share Your Feedback
            </Text>
            <IconButton 
              size="2" 
              variant="ghost" 
              onClick={close}
              className="text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              <Cross1Icon width={18} height={18} />
            </IconButton>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Text as="label" size="2" weight="medium" className="text-gray-700">
                Your Feedback
              </Text>
              <TextArea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write your detailed feedback here..."
                className="w-full min-h-[120px] p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 resize-none"
              />
              <Text size="1" className="text-gray-500">
                Max 500 characters
              </Text>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={close}
                className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !feedback.trim()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Theme>
  );
}

export default AddFeedback;