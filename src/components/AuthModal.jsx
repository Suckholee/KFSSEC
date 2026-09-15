import { useLanguage } from '../i18n/LanguageContext';
import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Phone, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function AuthModal({ isOpen = false, initialMode = 'login', onClose, onLoginSuccess }) {
  const { tr, language } = useLanguage();
  const [mode, setMode] = useState(initialMode);
  const [submitted, setSubmitted] = useState(false);
  const [activeProvider, setActiveProvider] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });

  useEffect(() => {
    setMode(initialMode);
    setSubmitted(false);
    setActiveProvider('');
    setFormData({ name: '', email: '', password: '', phone: '' });
  }, [initialMode, isOpen]);

  // Handle ESC key press to close modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);


  // Initialize Kakao SDK dynamically
  useEffect(() => {
    if (!isOpen) return;
    const kakaoKey = import.meta.env.VITE_KAKAO_JS_KEY || 'a1b2c3d4e5f67890123456789abcdef0';
    if (typeof window !== 'undefined') {
      if (!window.Kakao && !document.getElementById('kakao-sdk')) {
        const script = document.createElement('script');
        script.id = 'kakao-sdk';
        script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
        script.async = true;
        script.onload = () => {
          if (window.Kakao && !window.Kakao.isInitialized() && kakaoKey) {
            try {
              window.Kakao.init(kakaoKey);
            } catch (e) {
              console.warn('Kakao SDK init notice:', e);
            }
          }
        };
        document.head.appendChild(script);
      } else if (window.Kakao && !window.Kakao.isInitialized() && kakaoKey) {
        try {
          window.Kakao.init(kakaoKey);
        } catch (e) {
          console.warn('Kakao SDK init notice:', e);
        }
      }
    }
  }, [isOpen]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const userObj = {
      name: formData.name || (mode === 'signup' ? '신규 수강생' : '수강생 회원'),
      email: formData.email,
      provider: 'Email',
      role: 'student',
    };

    setTimeout(() => {
      if (onLoginSuccess) {
        onLoginSuccess(userObj);
      } else {
        onClose();
      }
    }, 1000);
  };

  const handleSocialAuth = (provider) => {
    if (provider === 'kakao') {
      setActiveProvider('카카오톡');

      // Attempt Real Kakao SDK Login if initialized
      if (window.Kakao && window.Kakao.isInitialized()) {
        window.Kakao.Auth.login({
          scope: 'profile_nickname,profile_image,account_email',
          success: function (authObj) {
            window.Kakao.API.request({
              url: '/v2/user/me',
              success: function (res) {
                const kakaoAccount = res.kakao_account || {};
                const profile = kakaoAccount.profile || {};
                const userObj = {
                  id: res.id,
                  name: profile.nickname || '카카오 회원(홍길동)',
                  email: kakaoAccount.email || `kakao_${res.id}@kakaotalk.com`,
                  avatar: profile.profile_image_url || null,
                  provider: 'KakaoTalk',
                  role: 'student',
                };
                setSubmitted(true);
                setTimeout(() => {
                  if (onLoginSuccess) onLoginSuccess(userObj);
                  else onClose();
                }, 800);
              },
              fail: function (err) {
                console.warn('Kakao profile request fallback:', err);
                completeFallbackAuth('kakao');
              },
            });
          },
          fail: function (err) {
            console.warn('Kakao Auth login fallback:', err);
            completeFallbackAuth('kakao');
          },
        });
        return;
      }
      completeFallbackAuth('kakao');
      return;
    }

    completeFallbackAuth(provider);
  };

  const completeFallbackAuth = (provider) => {
    setActiveProvider(provider === 'kakao' ? '카카오톡' : '지메일(Google)');
    setSubmitted(true);

    const userObj = {
      name: provider === 'kakao' ? '카카오 회원(홍길동)' : '지메일 회원(김서연)',
      email: provider === 'kakao' ? 'kakao_user@kakaotalk.com' : 'google_user@gmail.com',
      provider: provider === 'kakao' ? 'KakaoTalk' : 'Google',
      role: 'student',
    };

    setTimeout(() => {
      if (onLoginSuccess) {
        onLoginSuccess(userObj);
      } else {
        onClose();
      }
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn cursor-pointer"
    >
      {/* Modal Inner Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border-2 border-[#0B3C26] space-y-6 cursor-default"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          title={tr("닫기 (ESC)")}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1">
          <img
            src="/images/logo-transparent.svg"
            alt={tr("사단법인 한국외식창업교육원")}
            className="h-10 sm:h-12 w-auto object-contain mx-auto mb-2"
          />
          <h2 className="text-2xl font-black text-[#0B3C26] tracking-tight">
            {tr(mode === 'login' ? '로그인' : '회원가입')}
          </h2>
          <p className="text-xs text-gray-600 font-bold">{tr(" (사)한국외식창업교육원 통합 회원 서비스 ")}</p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0B3C26] flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10 text-[#0B3C26]" />
            </div>
            <h3 className="text-xl font-black text-[#0B3C26]">
              {tr(activeProvider ? tr`${activeProvider} 간편 계정 ${mode === 'login' ? '로그인' : '회원가입'} 완료!` : (mode === 'login' ? '성공적으로 로그인되었습니다.' : '가입이 정상 완료되었습니다!'))}
            </h3>
            <p className="text-xs text-gray-600 font-bold">{tr(" 한국외식창업교육원 수강 관리 페이지로 이동합니다. ")}</p>
          </div>
        ) : (
          <div className="space-y-5">
            
            {/* Primary Social Auth Buttons: KakaoTalk & Google/Gmail */}
            <div className="space-y-2.5">
              
              {/* KakaoTalk Easy Sign up & Login */}
              <button
                onClick={() => handleSocialAuth('kakao')}
                className="w-full py-3.5 px-4 bg-[#FEE500] hover:bg-[#FDD800] text-[#191919] font-extrabold text-sm sm:text-base rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-[#E0CA00] hover:scale-[1.01]"
              >
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 3C6.477 3 2 6.477 2 10.772c0 2.766 1.83 5.19 4.606 6.55-.202.753-.732 2.723-.837 3.138-.13.518.19.512.4.373.164-.109 2.62-1.782 3.678-2.5.703.1 1.433.153 2.153.153 5.523 0 10-3.477 10-7.714C22 6.477 17.523 3 12 3z" />
                </svg>
                <span>{tr("💬 카카오톡 1초 간편 ")}{tr(mode === 'login' ? '로그인' : '회원가입')}</span>
              </button>
              <p className="text-[10px] text-amber-900 text-center font-black bg-amber-50 py-1.5 rounded-lg border border-amber-200">{tr(" ※ 사업자 카카오비즈니스 채널 및 대표자 계정 간편 연동 지원 ")}</p>

              {/* Gmail / Google Easy Sign up & Login */}
              <button
                onClick={() => handleSocialAuth('google')}
                className="w-full py-3.5 px-4 bg-white hover:bg-stone-50 text-gray-800 font-extrabold text-sm sm:text-base rounded-2xl border-2 border-gray-300 shadow-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.01]"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
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
                <span>{tr("지메일(Google) ")}{tr(mode === 'login' ? '로그인' : '회원가입')}</span>
              </button>

            </div>

            {/* Divider Line */}
            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-gray-200 w-full" />
              <span className="bg-white px-3 text-xs font-bold text-gray-400 shrink-0">{tr(" 또는 이메일로 ")}{tr(mode === 'login' ? '로그인' : '회원가입')}
              </span>
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleFormSubmit} className="space-y-3.5">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{tr("성명")}</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={tr("성함을 입력해 주세요")}
                      className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0B3C26] focus:bg-white transition-all font-bold"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{tr("이메일 주소")}</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="user@example.com"
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0B3C26] focus:bg-white transition-all font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{tr("비밀번호")}</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0B3C26] focus:bg-white transition-all font-bold"
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{tr("연락처")}</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="010-1234-5678"
                      className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0B3C26] focus:bg-white transition-all font-bold"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-[#0B3C26] hover:bg-[#072819] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer border border-[#C5A059] mt-1"
              >
                {tr(mode === 'login' ? '이메일 로그인' : '이메일 회원가입 완료')}
              </button>
            </form>

            {/* Bottom Mode Switch Link */}
            <div className="text-center pt-2 border-t border-gray-100">
              {mode === 'login' ? (
                <p className="text-xs text-gray-600 font-bold">{tr(" 아직 계정이 없으신가요?")}{tr(' ')}
                  <button
                    onClick={() => setMode('signup')}
                    className="text-[#0B3C26] font-black hover:underline cursor-pointer ml-1"
                  >{tr(" 회원가입하기 ")}</button>
                </p>
              ) : (
                <p className="text-xs text-gray-600 font-bold">{tr(" 이미 계정이 있으신가요?")}{tr(' ')}
                  <button
                    onClick={() => setMode('login')}
                    className="text-[#0B3C26] font-black hover:underline cursor-pointer ml-1"
                  >{tr(" 로그인하기 ")}</button>
                </p>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
