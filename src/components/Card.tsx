'use client';

import { Card as CardType } from "@/types/game";
import { cn } from "@/lib/utils";

interface CardProps {
  card: CardType;
  onClick?: () => void;
  isSelected?: boolean;
  isRevealed?: boolean;
  isNPC?: boolean;
}

export default function Card({
  card,
  onClick,
  isSelected = false,
  isRevealed = true,
  isNPC = false
}: CardProps) {
  // 根据卡牌类型获取颜色
  const getTypeColor = () => {
    switch (card.type) {
      case "emperor":
        return "bg-yellow-500 border-yellow-600";
      case "slave":
        return "bg-blue-500 border-blue-600";
      case "citizen":
        return "bg-green-500 border-green-600";
      default:
        return "bg-gray-500 border-gray-600";
    }
  };

  // 卡牌内容
  const cardContent = (
    <div className={cn(
      "relative w-32 h-48 rounded-lg border-4 transition-all transform",
      getTypeColor(),
      isSelected && "ring-4 ring-orange-400 shadow-lg scale-110",
      onClick && "cursor-pointer hover:shadow-xl hover:scale-105",
      isNPC && !isRevealed && "bg-red-500 border-red-600"
    )}>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-white">
        {isRevealed ? (
          <>
            <div className="text-3xl font-bold mb-2">
              {card.name}
            </div>
            <div className="text-xs text-center">
              {card.description}
            </div>
          </>
        ) : (
          <div className="text-2xl font-bold">
            {isNPC ? "?" : card.name}
          </div>
        )}
      </div>
    </div>
  );

  // 如果有点击事件，添加点击处理程序
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="focus:outline-none"
        disabled={isSelected}
      >
        {cardContent}
      </button>
    );
  }

  // 否则仅返回卡牌
  return cardContent;
}
