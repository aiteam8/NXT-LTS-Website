let currentLang = 'en';

const serviceNames = {
    en: ['Chatbots & Voice Agents', 'Sentiment Analysis', 'Dashboards & Reporting', 'Workflow Automation', 'Computer Vision'],
    ar: ["روبوتات الدردشة والوكلاء الصوتيون", "تحليل المشاعر", "لوحات التحكم والتقارير", "أتمتة سير العمل", "الرؤية الحاسوبية"]
};

const serviceDescsHome = {
    en: [
        "AI-driven conversations that engage, qualify, and delight your customers 24/7.",
        "Understand how your customers truly feel with real-time, multilingual sentiment intelligence.",
        "Clear, visual, live dashboards that turn raw data into decisions.",
        "Eliminate manual bottlenecks with intelligent process automation that scales with your team.",
        "See, detect, and act. Visual AI that automates inspection, recognition, and monitoring."
    ],
    ar: [
        "محادثات مدعومة بالذكاء الاصطناعي تُشرك عملاءك وتؤهلهم وتُسعدهم على مدار الساعة طوال أيام الأسبوع.",
        "افهم كيف يشعر عملاؤك حقًا من خلال تحليل المشاعر الفوري ومتعدد اللغات.",
        "لوحات تحكم واضحة ومرئية ومباشرة تحول البيانات الخام إلى قرارات.",
        "تخلّص من الاختناقات اليدوية عبر أتمتة ذكية للعمليات تتوسع مع فريقك.",
        "شاهد واكتشف وتصرّف. ذكاء بصري يؤتمت الفحص والتعرّف والمراقبة."
    ]
}

const serviceDescs = {
    en: [
        'Move beyond generic chatbots. Our AI communication layer understands context, intent, and tone, enabling meaningful, personalized conversations at every touchpoint. From <span class="emphasis">first inquiry</span> to <span class="emphasis">post-sale</span> support, your customers always feel heard and helped. Seamlessly integrates with your website, messaging platforms, and support tools.',
        'Your customers are talking, are you listening? Our sentiment engine processes reviews, support tickets, surveys, and social signals in real-time, surfacing what people love, what frustrates them, and where you can <span class="emphasis">act</span>. Supports <span class="emphasis>Arabic</span> and <span class=" emphasis">English</span>, with industry-specific fine-tuning for precision that generic models can\'t match.',
        'Decision-makers shouldn\'t have to hunt for data. We build custom, interactive dashboards that surface your most critical KPIs in <span class="emphasis">real-time</span>, from operations to customer experience. Whether you need executive overviews or deep-dive analyst views, we design reporting experiences that people actually use and trust.',
        'Repetitive tasks drain your team\'s potential. We map your processes, identify <span class="emphasis">automation opportunities</span>, and build intelligent workflows that execute reliably. Routing requests, triggering actions, updating systems, and notifying the right people at the right moment. Less manual work, fewer errors, faster outcomes.',
        'Train AI to <span class="emphasis">see</span> what matters. Our computer vision solutions handle object detection, quality inspection, face recognition, document processing, and visual search. Deployed in the cloud or at the edge. From manufacturing floors to retail environments, we build <span class="emphasis">vision systems</span> that scale with your operations.'
    ],
    ar: [
        'تجاوز روبوتات الدردشة التقليدية. طبقة الذكاء الاصطناعي لدينا تفهم السياق والنية والنبرة، مما يتيح محادثات هادفة ومخصصة في كل نقطة تواصل. من الاستفسار الأول حتى دعم ما بعد البيع، يشعر عملاؤك دائمًا بأنهم مسموعون.',
        'عملاؤك يتحدثون، هل تستمع؟ محرك المشاعر لدينا يعالج المراجعات وتذاكر الدعم والاستطلاعات وإشارات التواصل الاجتماعي في الوقت الفعلي، ليكشف ما يحبه الناس وما لا يحبوه وأين يمكنك التصرف. يدعم العربية والإنجليزية.',
        'لا ينبغي لصانعي القرار البحث عن البيانات. نبني لوحات معلومات مخصصة وتفاعلية تعرض أهم مؤشرات الأداء الرئيسية في الوقت الفعلي. سواء احتجت إلى نظرة عامة تنفيذية أو تحليلات متعمقة، نصمم تجارب تقارير يستخدمها الناس فعلاً.',
        'المهام المتكررة تستنزف طاقة فريقك. نخطط عملياتك ونحدد فرص الأتمتة ونبني سير عمل ذكية تعمل بشكل موثوق. توجيه الطلبات وتشغيل الإجراءات وتحديث الأنظمة وإخطار الأشخاص المناسبين في اللحظة المناسبة.',
        'علّم الذكاء الاصطناعي أن يرى ما يهم. حلول الرؤية الحاسوبية لدينا تتعامل مع اكتشاف الأشياء وفحص الجودة والتعرف على الوجوه ومعالجة المستندات والبحث المرئي.'
    ]
};

const aboutHeaders = {
    en: [
        "About NXT LTS",
        "Our Vision",
        "Our Mission",
        "Our Track Record"
    ],
    ar: [
        "عن NXT LTS",
        "رؤيتنا",
        "مهمتنا",
        "سجلنا"
    ]
}

const aboutParagraphs = {
    en: [
        "NXT LTS builds intelligent digital solutions that strengthen operations, boost efficiency, and turn data into real value. We deliver advanced AI and automation systems that help businesses stay ahead in a rapidly shifting digital landscape.",
        "The vision of NXT LTS is to help organizations grow through intelligent technology and modern digital solutions, improving operations and enabling smarter decision making.",
        "The mission of NXT LTS is to develop practical technology solutions combining AI, data analysis, and automation to solve real business challenges and enhance efficiency.",
        "Since its foundation, NXT LTS has built practical tools including intelligent communication platforms, automation systems, and data analysis dashboards designed to support better decision making."
    ],
    ar: [
        "تعمل NXT LTS على بناء حلول رقمية ذكية تعزز العمليات، وترفع الكفاءة، وتحول البيانات إلى قيمة حقيقية. نقدم أنظمة متقدمة في الذكاء الاصطناعي والأتمتة لمساعدة الشركات على البقاء في الصدارة ضمن بيئة رقمية سريعة التغير.",
        "تتمثل رؤية NXT LTS في مساعدة المؤسسات على النمو من خلال التكنولوجيا الذكية والحلول الرقمية الحديثة، مع تحسين العمليات وتمكين اتخاذ قرارات أكثر ذكاءً.",
        "تتمثل مهمة NXT LTS في تطوير حلول تقنية عملية تجمع بين الذكاء الاصطناعي وتحليل البيانات والأتمتة، بهدف حل التحديات الحقيقية للأعمال وتعزيز الكفاءة.",
        "منذ تأسيسها، قامت NXT LTS بتطوير أدوات عملية تشمل منصات تواصل ذكية، وأنظمة أتمتة، ولوحات تحليل بيانات مصممة لدعم اتخاذ قرارات أفضل."
    ]
}

const translations = {
    en: {
        navHome: 'Home', navServices: 'Services', navContact: 'Contact', navAbout: 'About',
        navCta: 'Book a Meeting', langBtn: 'عربي',
        heroLabel: 'AI-Powered Business Solutions',
        heroH1: '<span class="emphasis">YOUR</span> Next<br><span>Long-Term Solution</span>',
        heroP: 'We help businesses <span class="emphasis">harness</span> the power of AI, from intelligent automation to real-time insights, built to grow with you.',
        heroCta: 'Book a Strategy Meeting →',
        svcLabel: 'What We Do', svcTitle: 'Our Services',
        learnMore: 'Learn more →', getStarted: 'Get Started →',
        svcPageLabel: 'What We Build', svcPageTitle: 'Our Services',
        contactLabel: 'Get In Touch', contactTitle: 'Contact Us',
        lblName: 'Name', lblEmail: 'Email', lblProduct: 'Product of Interest', lblMsg: 'Message',
        placeholderName: 'Your full name', placeholderEmail: 'you@company.com',
        placeholderMsg: 'Tell us about your goals or challenges…',
        selectService: 'Select a service…', other: 'Other',
        btnSend: 'Send Message', reachDirect: 'Or reach us directly', lblSocials: 'Social',
        // aboutTitle: 'About NXT LTS',
        // aboutP: 'This section is coming soon. We\'re working on telling our story — the team, the mission, and what drives us to build smarter solutions every day.',
        formSuccess: '✓ Message sent! We\'ll be in touch shortly.',
        footerSlogan: 'YOUR Next Long-Term Solution.',
        footerTagline: 'AI solutions that grow with your business. Built for the long run.',
        footerServices: 'SERVICES', footerCompany: 'COMPANY',
        footerAbout: 'About Us', footerContact: 'Contact',
        copyright: '© 2025 NXT LTS. All rights reserved.',
        imageLabel: '[ Service Image ]',
        // Chatbot
        chatWel: '<div class="nxt-chatbot-message-content"><strong>Welcome to NXT LTS!</strong><br>Ask me anything about our services, solutions, and how we can help your business.</div>',
        chatInputPH: 'Ask me anything...',
    },
    ar: {
        navHome: 'الرئيسية', navServices: 'الخدمات', navContact: 'اتصل بنا', navAbout: 'عن الشركة',
        navCta: 'احجز اجتماعًا', langBtn: 'English',
        heroLabel: 'حلول أعمال مدعومة بالذكاء الاصطناعي',
        heroH1: 'حلّك طويل الأمد<br><span>القادم</span>',
        heroP: 'نساعد الشركات على تسخير قوة الذكاء الاصطناعي، من الأتمتة الذكية إلى الرؤى الفورية. مبنية لتنمو معك.',
        heroCta: 'احجز اجتماعًا ←',
        svcLabel: 'ما نقدمه', svcTitle: 'خدماتنا',
        learnMore: 'اعرف المزيد ←', getStarted: 'ابدأ الآن ←',
        svcPageLabel: 'ما نبنيه', svcPageTitle: 'خدماتنا',
        contactLabel: 'تواصل معنا', contactTitle: 'اتصل بنا',
        lblName: 'الاسم', lblEmail: 'البريد الإلكتروني', lblProduct: 'الخدمة المطلوبة', lblMsg: 'الرسالة',
        placeholderName: 'اسمك الكامل', placeholderEmail: 'you@company.com',
        placeholderMsg: 'أخبرنا عن أهدافك أو تحدياتك…',
        selectService: 'اختر خدمة…', other: 'أخرى',
        btnSend: 'إرسال', reachDirect: 'أو تواصل معنا مباشرة', lblSocials: 'التواصل الاجتماعي',
        // aboutTitle: 'عن NXT LTS',
        // aboutP: 'هذا القسم قادم قريبًا. نعمل على سرد قصتنا — الفريق والمهمة وما يدفعنا لبناء حلول أذكى كل يوم.',
        formSuccess: '✓ تم إرسال رسالتك! سنتواصل معك قريبًا.',
        footerSlogan: 'حلّك طويل الأمد القادم.',
        footerTagline: 'حلول ذكاء اصطناعي تنمو مع أعمالك. مبنية للمدى البعيد.',
        footerServices: 'الخدمات', footerCompany: 'الشركة',
        footerAbout: 'عن الشركة', footerContact: 'اتصل بنا',
        copyright: '© 2025 NXT LTS. جميع الحقوق محفوظة.',
        imageLabel: '[ صورة الخدمة ]',
        // Chatbot
        chatWel: '<div class="nxt-chatbot-message-content"><strong>أهلاً بكم في NXT LTS!</strong> اسألني عن أي شيء يخص خدماتنا، حلولنا، وكيف يمكننا مساعدة عملك.</div>',
        chatInputPH: 'كيف يمكنني مساعدتك...',
    }
};

function showPage(name) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    document.getElementById('page-' + name).classList.add('active');
    document.getElementById('nav-' + name).classList.add('active');
    window.scrollTo(0, 0);
}

function goToService(idx) {
    showPage('services');
    setTimeout(() => {
        const details = document.querySelectorAll('.service-detail');
        if (details[idx]) details[idx].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
}

function goToContact(service) {
    showPage('contact');
    setTimeout(() => {
        const sel = document.getElementById('inp-product');
        if (sel) sel.value = service;
    }, 50);
}

function submitForm() {
    const name = document.getElementById('inp-name').value.trim();
    const email = document.getElementById('inp-email').value.trim();
    if (!name || !email) { alert(currentLang === 'ar' ? 'يرجى ملء الاسم والبريد الإلكتروني' : 'Please fill in your name and email.'); return; }
    document.getElementById('contactForm').style.opacity = '0.4';
    document.getElementById('contactForm').style.pointerEvents = 'none';
    document.getElementById('formSuccess').style.display = 'block';
}

function toggleLang() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    const t = translations[currentLang];
    const dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('lang', currentLang);
    document.documentElement.setAttribute('dir', dir);
    // document.getElementById('app-content').setAttribute('lang', currentLang);
    // document.getElementById('app-content').setAttribute('dir', dir);
    // document.getElementById('app-content').setAttribute('dir', dir);
    // document.getElementById('nxt-chatbot-widget').setAttribute('dir', dir);
    document.querySelector('.nxt-chatbot-input-area').setAttribute('dir', 'ltr');
    
    document.getElementById('nav-home').textContent = t.navHome;
    document.getElementById('nav-services').textContent = t.navServices;
    document.getElementById('nav-contact').textContent = t.navContact;
    document.getElementById('nav-about').textContent = t.navAbout;
    document.querySelector('.nav-right .btn-primary').textContent = t.navCta;
    document.querySelector('.lang-btn').textContent = t.langBtn;

    const hero = document.querySelector('.hero');
    hero.querySelector('.hero-label').textContent = t.heroLabel;
    hero.querySelector('h1').innerHTML = t.heroH1;
    hero.querySelector('p').innerHTML = t.heroP;
    hero.querySelector('.hero-cta').textContent = t.heroCta;

    const homeS = document.querySelector('.home-services');
    homeS.querySelector('.section-label').textContent = t.svcLabel;
    homeS.querySelector('.section-title').textContent = t.svcTitle;
    const homeCards = homeS.querySelectorAll('.service-card');
    homeCards.forEach((card, i) => {
        card.querySelector('.card-idle-label').textContent = serviceNames[currentLang][i];
        card.querySelector('h3').textContent = serviceNames[currentLang][i];
        card.querySelector('p').textContent = serviceDescsHome[currentLang][i];
        card.querySelector('.card-learn-btn').textContent = t.learnMore;
    });

    const svcPage = document.querySelector('.services-page');
    svcPage.querySelector('.section-label').textContent = t.svcPageLabel;
    svcPage.querySelector('.section-title').textContent = t.svcPageTitle;
    const details = svcPage.querySelectorAll('.service-detail');
    details.forEach((d, i) => {
        d.querySelector('h2').textContent = serviceNames[currentLang][i];
        d.querySelector('p').innerHTML = serviceDescs[currentLang][i];
        d.querySelector('.btn-outline').textContent = t.getStarted;
        // d.querySelector('.svc-img').textContent = t.imageLabel;
    });

    document.querySelector('.contact-page .section-label').textContent = t.contactLabel;
    document.querySelector('.contact-page .section-title').textContent = t.contactTitle;
    document.getElementById('lbl-name').textContent = t.lblName;
    document.getElementById('lbl-email').textContent = t.lblEmail;
    document.getElementById('lbl-product').textContent = t.lblProduct;
    document.getElementById('lbl-msg').textContent = t.lblMsg;
    document.getElementById('inp-name').placeholder = t.placeholderName;
    document.getElementById('inp-email').placeholder = t.placeholderEmail;
    document.getElementById('inp-msg').placeholder = t.placeholderMsg;
    document.getElementById('btn-send').textContent = t.btnSend;
    document.getElementById('reach-direct').textContent = t.reachDirect;
    // document.getElementById('lbl-socials').textContent = t.lblSocials;
    document.getElementById('formSuccess').textContent = t.formSuccess;
    const sel = document.getElementById('inp-product');
    sel.options[0].text = t.selectService;
    serviceNames[currentLang].forEach((name, i) => { if (sel.options[i + 1]) sel.options[i + 1].text = name; });
    sel.options[6].text = t.other;

    // Translation for the added about page
    const about = document.querySelectorAll('.about-card');
    about.forEach((d, i) => {
        d.querySelector('h2').textContent = aboutHeaders[currentLang][i];
        d.querySelector('p').innerHTML = aboutParagraphs[currentLang][i];
    });
    // document.querySelector('.about-page h2').textContent = t.aboutTitle;
    // document.querySelector('.about-page p').textContent = t.aboutP;

    document.querySelector('.footer-brand .slogan').textContent = t.footerSlogan;
    document.querySelector('.footer-brand p').textContent = t.footerTagline;
    document.querySelectorAll('.footer-col h4')[0].textContent = t.footerServices;
    const fServicesLinks = document.querySelectorAll('.footer-col a')
    for (i = 0; i <= 5; i++) {
        fServicesLinks[i].textContent = serviceNames[currentLang][i]
    }
    document.querySelectorAll('.footer-col h4')[1].textContent = t.footerCompany;
    const fLinks = document.querySelectorAll('.footer-col:last-child a');
    fLinks[0].textContent = t.footerAbout;
    fLinks[1].textContent = t.footerContact;
    document.querySelector('.footer-bottom span').textContent = t.copyright;

    // Translation for chatbot widget
    const chatbot = document.querySelector('#nxt-chatbot-widget')
    try { // try catch block for when user is loading a previous conversation
        chatbot.querySelector('.welcome').innerHTML = t.chatWel
    } catch (error) {
        console.error("An error happened:", error.message);
    }
    chatbot.querySelector('.nxt-chatbot-input').placeholder = t.chatInputPH
}

function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function closeMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
}