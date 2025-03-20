'use client';

import { Button } from "@/components/ui/button";
import { Stake, StakeType } from "@/types/game";

interface StakeSelectionScreenProps {
  stakes: Stake[];
  onSelectStake: (stakeType: StakeType) => void;
}

export default function StakeSelectionScreen({
  stakes,
  onSelectStake
}: StakeSelectionScreenProps) {
  // 定义筹码颜色样式
  const stakeColors: Record<StakeType, string> = {
    gold: "bg-yellow-100 border-yellow-400 hover:bg-yellow-200",
    house: "bg-purple-100 border-purple-400 hover:bg-purple-200",
    labor: "bg-blue-100 border-blue-400 hover:bg-blue-200",
    life: "bg-red-100 border-red-400 hover:bg-red-200"
  };

  // 定义筹码图标
  const stakeIcons: Record<StakeType, string> = {
    gold: "💰",
    house: "🏠",
    labor: "👷",
    life: "❤️"
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      <h2 className="text-2xl font-bold">选择本局的筹码</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stakes.map(stake => (
          <div
            key={stake.type}
            className={`p-6 rounded-lg border-2 ${stakeColors[stake.type]} cursor-pointer transition-colors`}
            onClick={() => onSelectStake(stake.type)}
          >
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{stakeIcons[stake.type]}</div>
              <div>
                <h3 className="text-xl font-bold">{stake.name}</h3>
                <p className="text-sm text-gray-600">{stake.description}</p>
              </div>
            </div>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onSelectStake(stake.type);
              }}
              className="mt-4 w-full"
              variant={stake.type === 'life' ? 'destructive' : 'default'}
            >
              选择 {stake.name}
            </Button>
          </div>
        ))}
      </div>

      {stakes.length === 0 && (
        <div className="p-6 bg-red-100 text-red-800 rounded-lg">
          你已经没有可用的筹码了！
        </div>
      )}
    </div>
  );
}
