import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import './CourseCover.css';

const covers = {
  advisor: { name: '외식창업지도사', topics: ['외식창업 전략과 사업 기획', '상권 분석과 점포 운영', '창업 문제 해결 및 전문 컨설팅'] },
  practice: { name: '외식창업실무사', topics: ['외식업과 창업의 기초 지식', '조리·고객 응대·위생 실무', '매장 운영과 경영 의사결정'] },
  kfood: { name: '한국음식능력(K-FOOD)', topics: ['한국 전통 음식과 식문화 이해', '표준 레시피와 한식 조리 실무', '전통·궁중·종가 음식의 이해'] },
  foodtech: { name: '푸드테크 설계사', topics: ['스마트 주방 기기 및 디지털 매장 운영', 'POS·주문 시스템과 매장 데이터 관리', '디지털 운영 설계 및 주방 동선 최적화', '시스템 도입 기획 및 전문 컨설팅'] },
  sommelier: { name: '소믈리에 파티컨설턴트', topics: ['와인·음료 선정과 식음료 페어링', '테이블 코디네이션과 공간 연출', '와인 해설 및 서비스 실무', '고객 응대와 파티 분위기 연출', '프라이빗 파티·기업 행사 기획', '행사 용품·장비 관리 및 배치'] },
};

export default function CourseCover({ course, className = '' }) {
  const { tr } = useLanguage();
  const id = course.qualificationId || course.id;
  const cover = covers[id];
  const defaultImage = `/images/qualifications/${id}.jpg`;
  // Uploaded covers remain exactly as the administrator supplied them.
  if (!cover || (course.image && course.image !== defaultImage)) {
    return <img src={course.image} alt={tr(course.title || course.name)} className={`block w-full h-auto object-contain ${className}`}/>;
  }
  const topics = course.curriculum?.map(module => module.title) || cover.topics;
  const label = [course.grade || course.levelLabel, course.courseLabel].filter(Boolean).join(' · ');
  return (
    <div className={`course-cover ${className}`}>
      <div className="course-cover__poster">
        <div className={`course-cover__photo ${['advisor', 'practice', 'kfood'].includes(id) ? 'course-cover__photo--existing' : ''}`}>
          <img src={defaultImage} alt="" loading="lazy"/>
        </div>
        <div className="course-cover__content">
          <p className="course-cover__brand">{tr('사단법인 한국외식창업교육원')}</p>
          <p className="course-cover__title">{tr(cover.name)}</p>
          <p className="course-cover__level">{tr(label || '전문 자격과정')}</p>
          <p className="course-cover__caption">{tr(course.curriculum?.length ? '교육 커리큘럼' : '주요 교육 내용')}</p>
          <ol className="course-cover__topics">
            {topics.map((topic, index) => <li key={topic}><span>{String(index + 1).padStart(2, '0')}</span><span>{tr(topic)}</span></li>)}
          </ol>
        </div>
      </div>
    </div>
  );
}
