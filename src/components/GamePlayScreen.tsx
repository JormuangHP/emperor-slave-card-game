'use client';

import { Card as CardType, Stake } from "@/types/game";
import Card from "@/components/Card";

interface GamePlayScreenProps {
  userDeck: CardType[];
  onSelectCard: (card: CardType) => void;
  currentStake: Stake | null;
  round: number;
}

export default function GamePlayScreen({
  userDeck,
  onSelectCard,
  currentStake,
  round
}: GamePlayScreenProps) {
  return (
    <div className="flex flex-col items-center p-4 space-y-6">
      <div className="flex justify-between w-full items-center bg-orange-50 p-3 rounded-lg">
        <div>
          <span className="font-bold">回合:</span> {round + 1}
        </div>
        {currentStake && (
          <div>
            <span className="font-bold">当前筹码:</span> {currentStake.name}
          </div>
        )}
        <div>
          <span className="font-bold">剩余卡牌:</span> {userDeck.length}
        </div>
      </div>

      <div className="w-full">
        <h3 className="text-xl font-bold mb-4 text-center">选择一张卡牌出战</h3>

        <div className="flex flex-wrap justify-center gap-4">
          {userDeck.map(card => (
            <Card
              key={card.id}
              card={card}
              onClick={() => onSelectCard(card)}
            />
          ))}
        </div>

        {userDeck.length === 0 && (
          <div className="text-center p-4 bg-red-100 text-red-800 rounded-lg mt-4">
            你没有可用的卡牌了！
          </div>
        )}
      </div>
    </div>
  );
}
