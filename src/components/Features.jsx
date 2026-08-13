import React from 'react';
import { BookOpen, UserCheck, TrendingUp, Share2 } from 'lucide-react';

export default function Features() {
  const features = [
    {
      id: 1,
      title: '실무 중심 교육',
      description: '현장 경험이 풍부한 전문가의 실전 강의',
      icon: BookOpen,
    },
    {
      id: 2,
      title: '창업 맞춤 컨설팅',
      description: '아이템 선정부터 매장 운영까지 1:1 맞춤 컨설팅',
      icon: UserCheck,
    },
    {
      id: 3,
      title: '체계적인 커리큐럼',
      description: '이론부터 실습까지 단계별 학습 과정',
      icon: TrendingUp,
    },
    {
      id: 4,
      title: '창업 성공 네트워크',
      description: '수강생 간 교류와 창업 정보 공유',
      icon: Share2,
    },
  ];

  return (
    <section className="py-12 bg-gray-50 border-b border-gray-100">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md hover:border-brand-200 transition-all group flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-brand-500 flex items-center justify-center shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                  <IconComponent className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1 leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
