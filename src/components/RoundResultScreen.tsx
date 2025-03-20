'use client';

import { Card as CardType, RoundResult } from "@/types/game";
import Card from "@/components/Card";

interface RoundResultScreenProps {
  userCard: CardType | null;
  npcCard: CardType | null;
  result: RoundResult | null;
}

export default function RoundResultScreen({
  userCard,
  npcCard,
  result
}: RoundResultScreenProps) {
  if (!userCard || !npcCard || !result) {
    return null;
  }

  // 获取结果的颜色和文本
  const getResultInfo = () => {
    switch (result) {
      case 'user_win':
        return {
          text: '你赢了！',
          color: 'bg-green-100 text-green-800 border-green-300'
        };
      case 'npc_win':
        return {
          text: '你输了！',
          color: 'bg-red-100 text-red-800 border-red-300'
        };
      case 'draw':
        return {
          text: '平局！',
          color: 'bg-blue-100 text-blue-800 border-blue-300'
        };
      default:
        return {
          text: '',
          color: ''
        };
    }
  };

  const resultInfo = getResultInfo();

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-8">
      <div className={`text-2xl font-bold py-3 px-6 rounded-full ${resultInfo.color} border-2`}>
        {resultInfo.text}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        <div className="flex flex-col items-center space-y-2">
          <div className="text-lg font-semibold">你的卡牌</div>
          <Card card={userCard} isRevealed={true} />
        </div>

        <div className="text-4xl font-bold">VS</div>

        <div className="flex flex-col items-center space-y-2">
          <div className="text-lg font-semibold">NPC的卡牌</div>
          <Card card={npcCard} isRevealed={true} isNPC={true} />
        </div>
      </div>
    </div>
  );
}
