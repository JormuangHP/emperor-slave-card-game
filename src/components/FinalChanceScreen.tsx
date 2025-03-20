'use client';

import { Button } from "@/components/ui/button";

interface FinalChanceScreenProps {
  onAccept: () => void;
  onChallenge: () => void;
}

export default function FinalChanceScreen({
  onAccept,
  onChallenge
}: FinalChanceScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      <h2 className="text-2xl font-bold">最后的翻盘机会</h2>

      <div className="max-w-lg bg-orange-50 p-6 rounded-lg text-center">
        <p className="mb-4">你已经输掉了所有的筹码！</p>
        <p className="mb-4">你可以选择接受失败结局，或者进行最后的翻盘机会。</p>
        <p className="text-red-600 font-semibold">
          警告：如果你选择挑战，这将是一局生死局。如果你赢了，你将赢得整个游戏；如果你输了，你将彻底失败！
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={onAccept}
          variant="outline"
          className="px-8 py-2"
        >
          接受失败
        </Button>

        <Button
          onClick={onChallenge}
          variant="destructive"
          className="px-8 py-2"
        >
          最后一搏
        </Button>
      </div>
    </div>
  );
}
