import React, { useState } from 'react';
import { Youtube, Image, Save, CheckCircle2, Play, ExternalLink } from 'lucide-react';

export default function AdminContent() {
  const [youtubeTitle, setYoutubeTitle] = useState('한국외식창업교육원 미디어');
  const [youtubeVideoId, setYoutubeVideoId] = useState('rC1sD5sF55E');
  const [youtubeChannelUrl, setYoutubeChannelUrl] = useState(
    'https://www.youtube.com/@%ED%95%9C%EA%B5%AD%EC%99%B8%EC%8B%9D%EC%B0%BD%EC%97%85%EA%B5%90%EC%9C%A1%EC%9C%88'
  );
  const [bannerActive, setBannerActive] = useState(true);
  const [bannerTitle, setBannerTitle] = useState('240203 한국외식창업교육원 정기총회 세미나');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="bg-[#111c16] p-6 rounded-3xl border border-emerald-500/20 shadow-xl">
        <h2 className="text-xl sm:text-2xl font-black text-white">
          유튜브 미디어 & 배너 콘텐츠 관리
        </h2>
        <p className="text-xs sm:text-sm text-emerald-200/70 font-medium mt-1">
          메인 페이지의 "한국외식창업교육원 미디어" 섹션에 노출할 영상 및 상단 이벤트 배너를 관리합니다.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* YouTube Settings Card */}
        <div className="bg-[#111c16] rounded-3xl p-6 sm:p-8 border border-emerald-500/20 shadow-xl space-y-5">
          <div className="flex items-center gap-3 border-b border-emerald-900/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
              <Youtube className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">유튜브 대표 미디어 영상 설정</h3>
              <p className="text-xs text-gray-400">메인 화면 1-Scroll 섹션에 노출할 영상 정보를 수정합니다.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
            <div className="space-y-1.5">
              <label className="font-extrabold text-emerald-300">섹션 제목</label>
              <input
                type="text"
                value={youtubeTitle}
                onChange={(e) => setYoutubeTitle(e.target.value)}
                className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-400 font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-extrabold text-emerald-300">유튜브 Video ID</label>
              <input
                type="text"
                value={youtubeVideoId}
                onChange={(e) => setYoutubeVideoId(e.target.value)}
                className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white font-mono focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="font-extrabold text-emerald-300">공식 유튜브 채널 이동 URL</label>
              <input
                type="text"
                value={youtubeChannelUrl}
                onChange={(e) => setYoutubeChannelUrl(e.target.value)}
                className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>
        </div>

        {/* Banner Settings Card */}
        <div className="bg-[#111c16] rounded-3xl p-6 sm:p-8 border border-emerald-500/20 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-emerald-900/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <Image className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">상단 이벤트/공지 배너 노출 설정</h3>
                <p className="text-xs text-gray-400">메인 최상단 프로모션 배너 텍스트 및 활성화 상태입니다.</p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={bannerActive}
                onChange={(e) => setBannerActive(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              <span className="ml-2 text-xs font-black text-gray-300">
                {bannerActive ? '배너 노출중' : '숨김'}
              </span>
            </label>
          </div>

          <div className="space-y-1.5 text-xs sm:text-sm">
            <label className="font-extrabold text-emerald-300">배너 문구</label>
            <input
              type="text"
              value={bannerTitle}
              onChange={(e) => setBannerTitle(e.target.value)}
              className="w-full bg-[#16241c] border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white font-bold focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        {/* Submit Save Button */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm animate-fadeIn">
              <CheckCircle2 className="w-5 h-5" />
              <span>변경사항이 정상적으로 저장되었습니다!</span>
            </div>
          ) : <div />}

          <button
            type="submit"
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>설정 저장하기</span>
          </button>
        </div>

      </form>

    </div>
  );
}
