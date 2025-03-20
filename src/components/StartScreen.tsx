'use client';

import { Button } from "@/components/ui/button";

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      <h2 className="text-2xl font-bold">欢迎来到皇帝与奴隶卡牌游戏</h2>

      <div className="max-w-lg text-center space-y-4">
        <p>在这个游戏中，你将与NPC进行卡牌对战。游戏规则如下：</p>

        <ul className="text-left list-disc pl-5 space-y-2">
          <li><strong>卡牌：</strong>有两副牌，一副为皇帝牌组（1张皇帝牌+4张平民牌），一副为奴隶牌组（1张奴隶牌+4张平民牌）</li>
          <li><strong>对战规则：</strong>皇帝胜平民，平民胜奴隶，奴隶胜皇帝；平民对平民为平局</li>
          <li><strong>筹码：</strong>每局需要从"10W金币、房子、卖身打工、生命"中选择一个作为筹码</li>
          <li><strong>生命筹码：</strong>如果选择"生命"作为筹码，则一局定胜负</li>
          <li><strong>翻盘机会：</strong>输掉所有筹码后，还有一次翻盘的机会</li>
        </ul>
      </div>

      <Button
        onClick={onStart}
        className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-2 rounded-full text-lg"
      >
        开始游戏
      </Button>
    </div>
  );
}
