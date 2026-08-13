import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Phone } from 'lucide-react';

export default function AuthModal({ initialMode = 'login', onClose }) {
  const [mode, setMode] = useState(initialMode);
  const [submitted, setSubmitted] = useState(false);

  // Close modal when pressing ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleSocialLogin = (provider) => {
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 space-y-6"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          title="닫기 (ESC)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center">
          <img
            src="/images/official_logo.png"
            alt="사단법인 한국외식창업교육원"
            className="h-11 w-auto object-contain mx-auto mb-2"
          />
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            {mode === 'login' ? '로그인' : '회원가입'}
          </h2>
          <p className="text-xs text-gray-500 mt-1 font-medium">
            사단법인 한국외식창업교육원의 맞춤 솔루션을 경험해 보세요.
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              {mode === 'login' ? '성공적으로 로그인되었습니다.' : '가입이 완료되었습니다!'}
            </h3>
            <p className="text-xs text-gray-500">교육원 서비스로 이동합니다.</p>
          </div>
        ) : (
          <div className="space-y-5">
            
            {/* Primary Social Logins: KakaoTalk & Google/Gmail */}
            <div className="space-y-2.5">
              
              {/* KakaoTalk Login */}
              <button
                onClick={() => handleSocialLogin('kakao')}
                className="w-full py-3.5 px-4 bg-[#FEE500] hover:bg-[#FDD800] text-[#191919] font-extrabold text-sm sm:text-base rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-[#FDD800]"
              >
                {/* Kakao Icon */}
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 3C6.477 3 2 6.477 2 10.772c0 2.766 1.83 5.19 4.606 6.55-.202.753-.732 2.723-.837 3.138-.13.518.19.512.4.373.164-.109 2.62-1.782 3.678-2.5.703.1 1.433.153 2.153.153 5.523 0 10-3.477 10-7.714C22 6.477 17.523 3 12 3z" />
                </svg>
                <span>카카오톡으로 시작하기</span>
              </button>

              {/* Google / Gmail Login */}
              <button
                onClick={() => handleSocialLogin('google')}
                className="w-full py-3.5 px-4 bg-white hover:bg-stone-50 text-gray-800 font-extrabold text-sm sm:text-base rounded-2xl border border-gray-300 shadow-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                {/* Google Multicolor G Icon */}
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>지메일(Google)로 시작하기</span>
              </button>

            </div>

            {/* Divider Line */}
            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-gray-200 w-full" />
              <span className="bg-white px-3 text-xs font-bold text-gray-400 shrink-0">
                또는 이메일로 {mode === 'login' ? '로그인' : '회원가입'}
              </span>
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">이름</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="홍길동"
                      className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">이메일 주소</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="user@example.com"
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">비밀번호</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">연락처</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="010-1234-5678"
                      className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#0F5132] hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer mt-1"
              >
                {mode === 'login' ? '이메일 로그인' : '이메일 회원가입'}
              </button>
            </form>

            {/* Bottom Mode Switch Link */}
            <div className="text-center pt-2 border-t border-gray-100">
              {mode === 'login' ? (
                <p className="text-xs text-gray-500 font-medium">
                  아직 계정이 없으신가요?{' '}
                  <button
                    onClick={() => setMode('signup')}
                    className="text-emerald-700 font-extrabold hover:underline cursor-pointer"
                  >
                    회원가입하기
                  </button>
                </p>
              ) : (
                <p className="text-xs text-gray-500 font-medium">
                  이미 계정이 있으신가요?{' '}
                  <button
                    onClick={() => setMode('login')}
                    className="text-emerald-700 font-extrabold hover:underline cursor-pointer"
                  >
                    로그인하기
                  </button>
                </p>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
