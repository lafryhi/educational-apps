# educational-apps

منصة Web Apps تعليمية خفيفة وسريعة، مبنية بـ `HTML / CSS / JavaScript` فقط، مع توجّه `Mobile First` لتعمل بشكل جيد على الهاتف والحاسوب والمسلاط.

## الهدف

تجميع تطبيقات تعليمية تفاعلية مستقلة داخل منصة واحدة قابلة للتوسع لاحقًا، مع الحفاظ على:

- بنية واضحة ونظيفة
- سهولة التعديل والصيانة
- جاهزية للنشر كمنصة static
- دعم أساسي للعمل بدون إنترنت بعد أول زيارة

الدومين المستهدف:

`apps.lafryhi-elmostafa-school-primary.com`

## البنية العامة

```text
educational-apps/
├── index.html
├── README.md
├── .gitignore
├── sw.js
├── manifest.json
├── css/
│   └── style.css
├── js/
│   └── app.js
├── assets/
│   ├── icons/
│   │   ├── icon-192.svg
│   │   └── icon-512.svg
│   └── images/
└── apps/
    └── verbes/
        ├── index.html
        ├── css/
        │   └── style.css
        └── js/
            └── script.js
```

## التشغيل المحلي

المشروع static ولا يحتاج `npm` أو `build`.

يمكن تشغيله بأي خادم محلي بسيط. مثال باستخدام Python:

```bash
cd educational-apps
python -m http.server 4173
```

ثم افتح:

`http://127.0.0.1:4173/`

ملاحظات:

- الصفحة الرئيسية تعمل من `root`
- تطبيق الأفعال يعمل من `apps/verbes/`
- `manifest.json` و `sw.js` يعملان من `root`

## النشر على GitHub

1. أنشئ مستودعًا جديدًا على GitHub.
2. ارفع ملفات المشروع كما هي بدون أي build step.
3. تأكد أن `index.html` موجود في جذر المشروع.

مثال أوامر:

```bash
git init
git add .
git commit -m "Initial educational-apps structure"
git branch -M main
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
```

## النشر على Vercel

المشروع لا يحتاج `vercel.json` في وضعه الحالي، لأنه موقع static مباشر.

الخطوات:

1. اربط مستودع GitHub مع Vercel.
2. اختر المستودع `educational-apps`.
3. اترك إعدادات Framework على `Other` أو بدون Framework.
4. لا تضف Build Command.
5. اترك Output Directory فارغًا.
6. نفّذ النشر.

بعد ذلك يمكن ربط الدومين:

`apps.lafryhi-elmostafa-school-primary.com`

## ملاحظات تقنية

- التطبيق يستخدم `Service Worker` خفيفًا للعمل بدون إنترنت بعد أول زيارة.
- لا توجد مكتبات خارجية حاليًا.
- كل تطبيق جديد يجب أن يوضع داخل `apps/` كمجلد مستقل.
