# سوالف الأولين — Salef Al-Awaleen

**عبودين قيمز — ABODEN GAMES**

راوٍ سعودي كبير بالسن تحادثه بصوتك، بالذكاء الاصطناعي. يعمل على Meta Quest (VR/MR) وعلى iPhone.

## الحالة

- **المرحلة الأولى (الأساس): مكتملة.** الشايب في ثلاثة أماكن (المجلس، الفريج، البر)، ووضعا VR وMR، ومعاينة الآيفون، وبناء APK تلقائي.
- **المرحلة الثانية (المحادثة الصوتية): مبنية، وتحتاج أسرار المالك للتشغيل.** Gemini Live المجاني عبر خادم Cloudflare آمن. التفاصيل في [خطوات التشغيل](docs/PHASE2_SETUP_AR.md).

الرابط: https://3wasfnjd.github.io/Salef-AlAwaleen/

- [التقرير التقني](docs/TECHNICAL_REPORT_AR.md)
- [التحكم في Meta Quest](docs/QUEST_CONTROLS_AR.md)
- [حالة المرحلة الأولى](docs/PHASE1_AR.md)
- [تشغيل المحادثة الصوتية (المرحلة الثانية)](docs/PHASE2_SETUP_AR.md)
- [سجل تنظيف المستودع](docs/CLEANUP_AR.md)

## البنية

| المسار | المحتوى |
|---|---|
| `src/voice/` | جلسة Gemini Live: الميكروفون (AudioWorklet)، تشغيل الصوت، المقاطعة، إعادة الاتصال |
| `server/` | خادم المفاتيح المؤقتة (Cloudflare Worker) |
| `persona/` | شخصية الشايب «أبو ناصر» |
| `src/core/` | آلة حالات سلوك الشخصية، واجهة جلسة الصوت (بدون اعتماد على العرض) |
| `src/scene/` | Three.js: المجلس الإجرائي، الشايب الإجرائي خلف واجهة `CharacterRig` |
| `src/xr/` | جلسات WebXR، التبديل VR/MR، وضع الشايب في الغرفة، لوحة التحكم داخل XR |
| `src/ui/`, `src/i18n/`, `locales/` | الواجهة ثنائية الأبعاد والترجمة (عربي افتراضي + إنجليزي) |
| `android/` | قالب تغليف Quest (أداة Meta الرسمية Bubblewrap) |
| `.github/workflows/` | فحص، نشر GitHub Pages، بناء APK والتحقق منه |

## للمطوّرين

```bash
npm ci
npm run dev        # خادم تطوير
npm test           # اختبارات الوحدة
npm run build      # فحص الأنواع + بناء الإنتاج
```
