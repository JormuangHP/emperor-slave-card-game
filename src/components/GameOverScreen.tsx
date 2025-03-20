'use client';

import { Button } from "@/components/ui/button";

interface GameOverScreenProps {
  result: 'user_win' | 'npc_win' | null;
  onPlayAgain: () => void;
}

export default function GameOverScreen({
  result,
  onPlayAgain
}: GameOverScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      {result === 'user_win' ? (
        <div className="text-center">
          <div className="text-5xl mb-6">🎉</div>
          <h2 className="text-3xl font-bold mb-3 text-green-600">恭喜你赢得了游戏！</h2>
          <p className="text-lg mb-4">
            你成功地击败了NPC，赢得了这场皇帝与奴隶的对战！
          </p>
          <div className="py-4 px-6 bg-green-100 text-green-800 rounded-lg mb-6">
            胜利者永远是最有策略的人！
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-5xl mb-6">😢</div>
          <h2 className="text-3xl font-bold mb-3 text-red-600">很遗憾，你输了！</h2>
          <p className="text-lg mb-4">
            NPC成功地击败了你，赢得了这场皇帝与奴隶的对战！
          </p>
          <div className="py-4 px-6 bg-red-100 text-red-800 rounded-lg mb-6">
            失败是成功之母，再接再厉！
          </div>
        </div>
      )}

      <Button
        onClick={onPlayAgain}
        className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-2 rounded-full text-lg"
      >
        再玩一次
      </Button>
    </div>
  );
}
