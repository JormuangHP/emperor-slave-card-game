'use client';

import { Button } from "@/components/ui/button";
import { DeckType } from "@/types/game";

interface DeckSelectionScreenProps {
  onSelectDeck: (deckType: DeckType) => void;
}

export default function DeckSelectionScreen({ onSelectDeck }: DeckSelectionScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      <h2 className="text-2xl font-bold">选择你的牌组</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className="flex flex-col items-center p-6 border-2 border-yellow-400 rounded-lg hover:bg-yellow-50 cursor-pointer transition-colors"
          onClick={() => onSelectDeck('emperor')}
        >
          <div className="w-24 h-36 bg-yellow-500 border-4 border-yellow-600 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">皇帝</span>
          </div>
          <h3 className="text-xl font-bold mb-2">皇帝牌组</h3>
          <p className="text-center text-sm">
            1张皇帝牌 + 4张平民牌<br />
            皇帝可以战胜平民，但会被奴隶击败
          </p>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onSelectDeck('emperor');
            }}
            className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            选择皇帝牌组
          </Button>
        </div>

        <div
          className="flex flex-col items-center p-6 border-2 border-blue-400 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
          onClick={() => onSelectDeck('slave')}
        >
          <div className="w-24 h-36 bg-blue-500 border-4 border-blue-600 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">奴隶</span>
          </div>
          <h3 className="text-xl font-bold mb-2">奴隶牌组</h3>
          <p className="text-center text-sm">
            1张奴隶牌 + 4张平民牌<br />
            奴隶可以战胜皇帝，但会被平民击败
          </p>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onSelectDeck('slave');
            }}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
          >
            选择奴隶牌组
          </Button>
        </div>
      </div>
    </div>
  );
}
