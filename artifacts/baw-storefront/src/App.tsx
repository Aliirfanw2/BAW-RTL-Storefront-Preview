import { useEffect, useRef, useState } from 'react';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import {
  Banknote,
  Baby,
  CarFront,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Facebook,
  Flame,
  Gift,
  Heart,
  Headphones,
  Home as HomeIcon,
  Instagram,
  Mail,
  MessageCircle,
  Menu,
  Minus,
  PawPrint,
  Phone,
  Plus,
  Package,
  RotateCcw,
  Search,
  FileText,
  Shirt,
  ShieldCheck,
  Sofa,
  ShoppingBag,
  Sparkles,
  Star,
  Clock3,
  Truck,
  Utensils,
  UserRound,
  X,
} from 'lucide-react';
import { type FocusEventHandler, type MouseEventHandler, type ReactNode } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import aromaHero from './assets/aroma-bin-hero.png';
import aromaDetail from './assets/aroma-bin-detail.png';
import aromaHome from './assets/aroma-bin-home.png';

const queryClient = new QueryClient();

type ToastMessage = string | null;

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

function Reveal({ children, className, delay = 0, onMouseEnter, onMouseLeave, onFocusCapture, onBlurCapture }: { children: ReactNode; className?: string; delay?: number; onMouseEnter?: MouseEventHandler<HTMLDivElement>; onMouseLeave?: MouseEventHandler<HTMLDivElement>; onFocusCapture?: FocusEventHandler<HTMLDivElement>; onBlurCapture?: FocusEventHandler<HTMLDivElement> }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.01 } } } : revealVariants;
  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocusCapture={onFocusCapture}
      onBlurCapture={onBlurCapture}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

const categories = [
  { title: 'בית וארגון', caption: 'דברים שעושים סדר', className: 'cat-home', image: aromaHero, icon: HomeIcon },
  { title: 'מטבח', caption: 'קטן, חכם, שימושי', className: 'cat-kitchen', image: aromaHome, icon: Utensils },
  { title: 'ספורט ובריאות', caption: 'להרגיש טוב בבית', className: 'cat-health', image: aromaDetail, icon: Dumbbell },
  { title: 'ילדים ותינוקות', caption: 'בחירות שעובדות', className: 'cat-kids', image: aromaHome, icon: Baby },
  { title: 'אופנה', caption: 'פריטים עם אופי', className: 'cat-fashion', image: aromaDetail, icon: Shirt },
  { title: 'בית וריהוט', caption: 'משדרגים את החלל', className: 'cat-furniture', image: aromaHero, icon: Sofa },
];

const popularProducts = [
  { title: 'פח אשפה חכם עם דלת כפולה דגם AROMA', image: 'https://gjqjvoawvcimvatlwoug.supabase.co/storage/v1/render/image/public/product-images/gallery/shopify-115-1785835871123-max0s.png?width=700&resize=contain&quality=80', rating: '4.8', reviews: '2,700', price: '₪100', oldPrice: '₪150', discount: '33%-', tag: 'הכי נמכר' },
  { title: 'שידת לילה חכמה עם 2 רמקולים, טעינה אלחוטית ותאורת LED', image: 'https://herbeautyshops.myshopify.com/cdn/shop/files/Smart_nightstand_white.png?v=1775553055&width=700', rating: '4.8', reviews: '523', price: '₪350', oldPrice: '₪700', discount: '50%-', tag: null },
  { title: 'ארון אחסון 5 מדפים עם דלתות וגלגלים דגם רומא', image: 'https://gjqjvoawvcimvatlwoug.supabase.co/storage/v1/render/image/public/product-images/gallery/product-1777384317307-1785744493488-h4igx.png?width=700&resize=contain&quality=80', rating: '4.8', reviews: '1,954', price: '₪300', oldPrice: '₪600', discount: '50%-', tag: null },
  { title: 'מכשיר עיסוי OTToman עם 5 פונקציות וחימום', image: 'https://gjqjvoawvcimvatlwoug.supabase.co/storage/v1/render/image/public/product-images/gallery/34-1785839215570-j97e2.png?width=700&resize=contain&quality=80', rating: '4.7', reviews: '892', price: '₪400', oldPrice: '₪800', discount: '50%-', tag: null },
];

function Header({
  cartCount,
  search,
  setSearch,
  onFavorite,
}: {
  cartCount: number;
  search: string;
  setSearch: (value: string) => void;
  onFavorite: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const isHome = location === '/';
  const announcementItems = (
    <>
      <span className="announcement-tag announcement-hot"><Flame size={18} /><span><strong>מחירים הכי זולים בארץ</strong></span></span>
      <span className="announcement-tag"><Gift size={18} /><span><strong>4 ב־3</strong> על פריטים נבחרים</span></span>
      <span className="announcement-tag"><Banknote size={18} /><span>תשלום במזומן לשליח</span></span>
      <span className="announcement-tag"><Truck size={18} /><span>משלוח עד הבית</span></span>
      <a className="announcement-tag announcement-phone" href="tel:0535377780"><Phone size={17} /><span>053-5377780</span></a>
      <span className="announcement-tag announcement-deals"><Star size={18} fill="currentColor" /><span>עד 50% הנחה · <strong>מבצעים חמים</strong></span></span>
    </>
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="announcement" data-testid="banner-promotion">
        <div className="announcement-track">
          <div className="announcement-group">{announcementItems}</div>
          <div className="announcement-group" aria-hidden="true">{announcementItems}</div>
        </div>
      </div>
      <header className={`header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="container header-inner">
          <Link href="/" className="brand" data-testid="link-home-brand">
            <span className="brand-mark" aria-hidden="true" />
            <span>BAW</span>
          </Link>
          <div className="search-wrap">
            <Search size={19} strokeWidth={2.2} aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="מה בא לך למצוא היום?"
              aria-label="חיפוש במרקטפלייס"
              data-testid="input-search"
            />
          </div>
          <nav className="header-nav" aria-label="ניווט ראשי">
            <Link href="/#categories" className="nav-link" data-testid="link-categories">קטגוריות</Link>
            <Link href="/#discover" className="nav-link" data-testid="link-discover">מומלצים</Link>
            <Link href="/#why-buy" className="nav-link" data-testid="link-why">למה BAW</Link>
            <a href="mailto:hello@baw.co.il" className="nav-link" data-testid="link-contact">צור קשר</a>
            <Link href="/#why-buy" className="nav-link" data-testid="link-about">אודותינו</Link>
            <Link href="/#popular" className="nav-link" data-testid="link-products">מוצרים</Link>
            <Link href="/" className={`nav-link ${isHome ? 'active' : ''}`} aria-current={isHome ? 'page' : undefined} data-testid="link-home">דף הבית</Link>
          </nav>
          <div className="header-actions">
            <button className="icon-btn" type="button" onClick={onFavorite} aria-label="מועדפים" data-testid="button-favorites">
              <Heart size={19} />
            </button>
            <button className="icon-btn account-btn" type="button" onClick={() => setMenuOpen(true)} aria-label="החשבון שלי" data-testid="button-account">
              <UserRound size={19} />
            </button>
            <Link href="/product" className="icon-btn" aria-label="סל קניות" data-testid="link-cart">
              <ShoppingBag size={19} />
              {cartCount > 0 && <span key={cartCount} className="cart-count" data-testid="text-cart-count">{cartCount}</span>}
            </Link>
            <button
              className="icon-btn mobile-menu"
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              aria-label="פתיחת תפריט"
              data-testid="button-mobile-menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="תפריט נייד">
            <div className="container mobile-nav-inner">
              <Link href="/#categories" data-testid="link-mobile-categories" onClick={() => setMenuOpen(false)}>קטגוריות</Link>
              <Link href="/#discover" data-testid="link-mobile-discover" onClick={() => setMenuOpen(false)}>מומלצים</Link>
              <Link href="/#why-buy" data-testid="link-mobile-why" onClick={() => setMenuOpen(false)}>למה BAW</Link>
              <a href="mailto:hello@baw.co.il" data-testid="link-mobile-contact" onClick={() => setMenuOpen(false)}>צור קשר</a>
              <Link href="/#why-buy" data-testid="link-mobile-about" onClick={() => setMenuOpen(false)}>אודותינו</Link>
              <Link href="/#popular" data-testid="link-mobile-products" onClick={() => setMenuOpen(false)}>מוצרים</Link>
              <Link href="/" aria-current={isHome ? 'page' : undefined} data-testid="link-mobile-home" onClick={() => setMenuOpen(false)}>דף הבית</Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

function TrustStrip() {
  const items = [
    { icon: Truck, title: 'משלוח עד הבית', caption: '3–7 ימי עסקים' },
    { icon: Banknote, title: 'תשלום במזומן', caption: 'רק כשהמוצר מגיע' },
    { icon: RotateCcw, title: '14 יום להחליט', caption: 'החזרה פשוטה' },
    { icon: ShieldCheck, title: '52,000+ לקוחות', caption: '4.9 דירוג ממוצע' },
  ];
  return (
    <section className="trust-strip" id="why-baw">
      <div className="container trust-grid">
        {items.map(({ icon: Icon, title, caption }, index) => (
          <Reveal className="trust-item" delay={index * 0.07} key={title}>
            <Icon size={18} strokeWidth={1.6} />
            <div><strong>{title}</strong><span>{caption}</span></div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function WhyBuySection() {
  const items = [
    { icon: ShieldCheck, title: 'קנייה בטוחה', caption: '14 יום להחליט על כל רכישה' },
    { icon: Banknote, title: 'תשלום בעת המשלוח', caption: 'משלמים רק כשהמוצר מגיע' },
    { icon: Truck, title: 'משלוח עד הבית', caption: '3–7 ימי עסקים ברחבי הארץ' },
    { icon: Headphones, title: 'שירות אישי', caption: 'זמינים עבורכם בוואטסאפ ובטלפון' },
    { icon: Package, title: 'אריזה מוגנת', caption: 'כל מוצר נארז בקפידה' },
    { icon: Clock3, title: '52,000+ לקוחות', caption: 'לקוחות מרוצים ברחבי הארץ' },
  ];

  return (
    <section className="why-buy-section" id="why-buy">
      <div className="container">
        <div className="why-buy-heading">
          <span className="eyebrow">הסיבה לבחור ב־BAW</span>
          <h2>למה קונים אצלנו?</h2>
          <p>אלפי לקוחות מרוצים, שירות אישי ומוצרים שעושים את החיים פשוטים יותר.</p>
        </div>
        <div className="why-buy-grid">
          {items.map(({ icon: Icon, title, caption }, index) => (
            <Reveal className="why-buy-card" delay={index * 0.06} key={title}>
              <span className="why-buy-icon"><Icon size={24} strokeWidth={1.7} /></span>
              <h3>{title}</h3>
              <p>{caption}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { icon: ShoppingBag, number: '1', title: 'בוחרים מוצר', caption: 'מוצאים את מה שמתאים לכם בקטלוג' },
    { icon: FileText, number: '2', title: 'ממלאים פרטים', caption: 'שם, טלפון וכתובת למשלוח' },
    { icon: MessageCircle, number: '3', title: 'מאשרים בוואטסאפ', caption: 'מקבלים הודעה לאישור ההזמנה' },
    { icon: Truck, number: '4', title: 'מקבלים עד הבית', caption: 'משלוח עד הבית ותשלום בעת הקבלה' },
  ];

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <div className="how-heading">
          <span className="eyebrow">פשוט להזמין</span>
          <h2>איך זה עובד?</h2>
          <p>ארבעה צעדים פשוטים בדרך למוצר החדש שלכם</p>
        </div>
        <div className="how-steps">
          {steps.map(({ icon: Icon, number, title, caption }, index) => (
            <Reveal className="how-step" delay={index * 0.08} key={number}>
              <span className="how-step-icon"><Icon size={25} strokeWidth={1.7} /></span>
              <span className="how-step-number">{number}</span>
              <h3>{title}</h3>
              <p>{caption}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CustomerReviewsSection() {
  const reviewsScrollerRef = useRef<HTMLDivElement>(null);
  const [reviewsPaused, setReviewsPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const reviews = [
    { quote: 'כבר ההזמנה הרביעית שלי. חברה אמינה, מוצרים מצוינים!', name: 'רחל ח.', city: 'רמת גן', time: 'לפני יומיים' },
    { quote: 'חברה ישראלית אמינה. מוצרים טובים, שירות מעולה.', name: 'שי ו.', city: 'נהריה', time: 'לפני 5 ימים' },
    { quote: 'חוויה מצוינת! מוצר פרימיום שמגיע ישר עד הדלת.', name: 'קרן ז.', city: 'רמת גן', time: 'לפני 5 ימים' },
    { quote: 'משלוח מהיר עד הבית, השליח התקשר לתאם. שירות מדהים!', name: 'אדם ז.', city: 'חיפה', time: 'לפני יומיים' },
    { quote: 'שילמתי במזומן בעת המשלוח — פשוט ונוח. המוצר מעולה!', name: 'נועה ז.', city: 'בת ים', time: 'לפני 3 שבועות' },
    { quote: 'המוצר בדיוק כמו בתמונות! איכות מצוינת במחיר מעולה.', name: 'עומר א.', city: 'בת ים', time: 'לפני 5 ימים' },
  ];

  useEffect(() => {
    if (reduceMotion) return undefined;
    let animationFrame = 0;
    let lastTime = performance.now();
    const move = (time: number) => {
      const scroller = reviewsScrollerRef.current;
      const elapsed = time - lastTime;
      lastTime = time;
      if (scroller && !reviewsPaused && scroller.scrollWidth > scroller.clientWidth) {
        const loopWidth = scroller.scrollWidth / 2;
        scroller.scrollLeft += Math.min(elapsed, 50) * 0.025;
        if (scroller.scrollLeft >= loopWidth) scroller.scrollLeft -= loopWidth;
      }
      animationFrame = window.requestAnimationFrame(move);
    };
    animationFrame = window.requestAnimationFrame(move);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [reduceMotion, reviewsPaused]);

  return (
    <section className="reviews-section" id="reviews">
      <div className="container">
        <div className="reviews-heading">
          <span className="eyebrow">הלקוחות מספרים</span>
          <h2>מה הלקוחות שלנו אומרים?</h2>
          <p>חוות דעת אמיתיות מלקוחות מרוצים של BAW</p>
        </div>
        <div className="reviews-scroller" ref={reviewsScrollerRef}>
          {[...reviews, ...reviews].map(({ quote, name, city, time }, index) => (
            <Reveal className="review-card" delay={(index % reviews.length) * 0.06} key={`${name}-${index}`} onMouseEnter={() => setReviewsPaused(true)} onMouseLeave={() => setReviewsPaused(false)} onFocusCapture={() => setReviewsPaused(true)} onBlurCapture={() => setReviewsPaused(false)}>
              <div className="review-stars" aria-label="5 מתוך 5 כוכבים">★★★★★</div>
              <blockquote>“{quote}”</blockquote>
              <div className="review-meta"><span><strong>{name}</strong> · {city}</span><small>{time}</small></div>
              <span className="verified-review"><Check size={13} /> רכישה מאומתת</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand"><span className="brand-mark" aria-hidden="true" /><span>BAW</span></div>
            <p>מרקטפלייס ישראלי של דברים טובים לבית, לגוף וליום־יום — במחירים שעושים חשק לגלות עוד.</p>
          </div>
          <div><h4>קניות</h4><Link href="/#categories">כל הקטגוריות</Link><Link href="/#discover">הנבחרים שלנו</Link><Link href="/product">מוצר השבוע</Link></div>
          <div><h4>שירות לקוחות</h4><a href="mailto:hello@baw.co.il">כתבו לנו</a><a href="/#why-baw">משלוחים והחזרות</a><a href="/#why-baw">שאלות נפוצות</a></div>
          <div className="footer-newsletter">
            <h4>להישאר בעניינים</h4>
            <p>מבצעים חדשים, מוצרים שחזרו למלאי והפתעות קטנות — פעם בשבוע.</p>
            {subscribed ? (
              <div className="newsletter-success"><Check size={16} /> נרשמתם בהצלחה</div>
            ) : (
              <form onSubmit={(event) => { event.preventDefault(); setSubscribed(true); }} className="newsletter-form">
                <div className="newsletter-input"><Mail size={16} /><input type="email" required placeholder="האימייל שלכם" aria-label="האימייל שלכם" /></div>
                <button type="submit" className="newsletter-submit">להצטרף</button>
              </form>
            )}
            <div className="social-links" aria-label="רשתות חברתיות">
              <a href="#footer" aria-label="אינסטגרם"><Instagram size={17} /></a>
              <a href="#footer" aria-label="פייסבוק"><Facebook size={17} /></a>
              <a href="mailto:hello@baw.co.il" aria-label="דוא״ל"><Mail size={17} /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 BAW</span>
          <div className="legal-links">
            <a href="#footer">תנאי שימוש</a>
            <a href="#footer">מדיניות פרטיות</a>
            <a href="#footer">משלוחים והחזרות</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ProductCard({ product, onAddToCart, showToast, index }: {
  product: typeof popularProducts[number];
  onAddToCart: (quantity: number) => void;
  showToast: (message: string) => void;
  index: number;
}) {
  const [favorite, setFavorite] = useState(false);
  const [added, setAdded] = useState(false);
  const addProduct = () => {
    onAddToCart(1);
    setAdded(true);
    showToast('המוצר נוסף לסל');
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <Reveal className="product-card" delay={index * 0.07}>
      <div className="product-card-media">
        <Link href={index === 0 ? '/product' : '#popular'} className="product-card-image">
          <img src={product.image} alt={product.title} />
        </Link>
        {product.tag ? <span className="product-badge">{product.tag}</span> : null}
        <motion.button className={`product-wishlist ${favorite ? 'is-favorite' : ''}`} type="button" whileTap={{ scale: 0.94 }} onClick={() => { setFavorite((value) => !value); showToast(favorite ? 'הוסר מהמועדפים' : 'נשמר במועדפים'); }} aria-label="שמירה למועדפים">
          <motion.span animate={{ scale: favorite ? [1, 1.12, 1] : 1 }} transition={{ duration: 0.22 }}><Heart size={17} fill={favorite ? 'currentColor' : 'none'} /></motion.span>
          <AnimatePresence>{favorite && <motion.span className="favorite-pulse" initial={{ opacity: .65, scale: .5 }} animate={{ opacity: 0, scale: 1.55 }} exit={{ opacity: 0 }} transition={{ duration: .35 }} />}</AnimatePresence>
        </motion.button>
      </div>
      <div className="product-card-body">
        <Link href={index === 0 ? '/product' : '#popular'} className="product-card-title">{product.title}</Link>
        <div className="product-card-rating"><span className="stars"><Star size={13} fill="currentColor" /> {product.rating}</span><span>({product.reviews})</span></div>
        <div className="product-card-price"><strong>{product.price}</strong><del>{product.oldPrice}</del><span className="product-price-discount">{product.discount}</span></div>
        <motion.button className={`product-card-cart ${added ? 'is-added' : ''}`} type="button" whileTap={{ scale: 0.98 }} onClick={addProduct}><AnimateCartIcon added={added} /><span>{added ? 'נוסף לסל' : 'להוסיף לסל'}</span></motion.button>
      </div>
    </Reveal>
  );
}

function AnimateCartIcon({ added }: { added: boolean }) {
  return <motion.span className="cart-action-icon" initial={false} animate={{ scale: added ? [1, 1.15, 1] : 1 }} transition={{ duration: 0.22 }}>{added ? <Check size={16} /> : <ShoppingBag size={16} />}</motion.span>;
}

function HomePage({ onAddToCart, search, showToast }: { onAddToCart: (quantity: number) => void; search: string; showToast: (message: string) => void }) {
  const hasSearch = search.trim().length > 0;
  const reduceMotion = useReducedMotion();
  return (
    <main>
      <section className="hero">
        <div className="hero-grid">
          <motion.div className="hero-copy" initial={reduceMotion ? false : 'hidden'} animate="visible" variants={{ visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.08 } }, hidden: {} }}>
            {[<span className="eyebrow" key="eyebrow">BAW · דברים טובים לחיים</span>, <h1 key="headline">מוצרים שעושים<br />יותר מקום לחיים.</h1>, <p key="supporting">{hasSearch ? `מחפשים ב־BAW: “${search}”` : 'מרקטפלייס ישראלי של מוצרים שנבחרו בקפידה. פחות לחפש. יותר למצוא.'}</p>, <div className="hero-ctas" key="ctas"><a href="#popular" className="btn-primary" data-testid="button-hero-discover">לקנות את הנבחרים <ChevronLeft size={16} /></a><a href="#categories" className="btn-ghost" data-testid="button-hero-categories">לכל הקטגוריות <ChevronLeft size={15} /></a></div>].map((child) => <motion.div key={child.key} variants={reduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.01 } } } : revealVariants}>{child}</motion.div>)}
          </motion.div>
          <motion.figure className="hero-visual" initial={reduceMotion ? false : { opacity: 0, scale: 1.03, x: -12 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: 'easeOut', delay: reduceMotion ? 0 : 0.12 }}>
            <img src={aromaHero} alt="פח אשפה חכם בצבע שמנת" />
            <figcaption><span className="hero-caption-kicker">הנבחר של השבוע</span><strong>פח AROMA חכם</strong><em>-33%</em></figcaption>
          </motion.figure>
        </div>
      </section>

      <section className="section categories-section" id="categories">
        <div className="container">
          <div className="section-heading">
            <div><span className="eyebrow">לגלות את BAW</span><h2>קונים לפי הקטגוריה</h2></div>
          </div>
          <div className="category-grid">
            {categories.map(({ title, caption, className, image, icon: Icon }, index) => (
              <Reveal className="category-reveal" delay={index * 0.06} key={title}>
              <a href="#popular" className={`category-card ${className}`} data-testid={`link-category-${index}`}>
                <img src={image} alt="" className="category-image" />
                <div className="category-card-content">
                  <h3>{title}</h3>
                  <span>{caption}</span><strong>לגלות <ChevronLeft size={13} /></strong>
                </div>
                <Icon className="category-icon" size={18} strokeWidth={1.6} aria-hidden="true" />
              </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="product-discovery" id="popular">
        <div className="container">
          <div className="section-heading">
            <div><span className="eyebrow">הבחירות של הקהילה</span><h2>Best sellers</h2><p>המוצרים שהלקוחות שלנו הכי אוהבים</p></div>
            <a href="#categories" className="text-link">לכל הקטגוריות</a>
          </div>
          <div className="product-grid">
            {popularProducts.map((product, index) => <ProductCard key={product.title} product={product} onAddToCart={onAddToCart} showToast={showToast} index={index} />)}
          </div>
        </div>
      </section>

      <section className="spotlight" id="discover">
        <div className="container">
          <div className="product-feature-grid">
            <div className="feature-photo"><img src={aromaHome} alt="פח אשפה חכם במטבח ביתי" /></div>
            <div className="feature-content">
              <span className="eyebrow">AROMA</span>
              <h3>פח אשפה חכם<br />עם דלת כפולה</h3>
              <p>נפתח לבד כשצריך, נשאר סגור כשלא. עיצוב נקי, פעולה שקטה, ונפח שמתאים לשגרה של בית אמיתי.</p>
              <div className="price-line"><span className="price-now">₪200</span><span className="price-old">₪600</span></div>
              <Link href="/product" className="btn-primary" data-testid="button-featured-details">לקנות את המוצר <ChevronLeft size={16} /></Link>
              <Link href="/product" className="text-link featured-silent-link" data-testid="link-featured-product">לפרטי המוצר</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="editorial">
        <div className="container">
          <article className="campaign">
            <div className="campaign-photo">
              <img src={aromaDetail} alt="מוצרים נבחרים לבית" />
            </div>
            <div className="campaign-copy">
              <span className="eyebrow">הטבת BAW</span>
              <h2>Pick four.<br />Pay for three.</h2>
              <div className="campaign-offer-steps" aria-label="מבצע ארבעה בשלושה">
                <div><small>בוחרים</small><strong>4</strong><span>פריטים</span></div>
                <span className="campaign-offer-arrow">←</span>
                <div><small>משלמים על</small><strong>3</strong><span>בלבד</span></div>
              </div>
              <p><strong>המוצר הזול ביותר חינם.</strong><br />בוחרים ארבעה פריטים נבחרים לבית — וההנחה מחושבת אוטומטית.</p>
              <a href="#popular" className="btn-primary">לגלות את הנבחרים</a>
            </div>
          </article>
        </div>
      </section>

      <WhyBuySection />
      <HowItWorksSection />
      <CustomerReviewsSection />
      <TrustStrip />
    </main>
  );
}

function ProductPage({
  onAddToCart,
  showToast,
}: {
  onAddToCart: (quantity: number) => void;
  showToast: (message: string) => void;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [openDetail, setOpenDetail] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<'7' | '9'>('7');
  const purchaseRef = useRef<HTMLDivElement>(null);
  const purchaseVisible = useInView(purchaseRef, { amount: 0.25 });
  const reduceMotion = useReducedMotion();
  const images = [
    'https://gjqjvoawvcimvatlwoug.supabase.co/storage/v1/render/image/public/product-images/gallery/shopify-115-1785835871123-max0s.png?width=1200&resize=contain&quality=85',
    'https://gjqjvoawvcimvatlwoug.supabase.co/storage/v1/render/image/public/product-images/gallery/shopify-115-1785835870157-het6x.png?width=1200&resize=contain&quality=85',
    'https://gjqjvoawvcimvatlwoug.supabase.co/storage/v1/render/image/public/product-images/gallery/shopify-115-1785835869295-b2vd5.png?width=1200&resize=contain&quality=85',
  ];
  const imageAlt = ['פח אשפה חכם AROMA, מבט קדמי', 'מבט מקרוב על הדלת הכפולה', 'פח AROMA במטבח'];
  const packageDetails = selectedPackage === '7'
    ? { label: '7 ליטרים · חבילה רגילה', price: 100, oldPrice: 150, discount: '33% הנחה' }
    : { label: '9 ליטרים · חבילה רגילה', price: 130, oldPrice: 220, discount: '41% הנחה' };

  const addProduct = () => {
    onAddToCart(quantity);
    setAdded(true);
    showToast(quantity > 1 ? `${quantity} פריטים נוספו לסל` : 'המוצר נוסף לסל');
    window.setTimeout(() => setAdded(false), 1800);
  };

  useEffect(() => {
    if (!lightboxOpen) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxOpen(false);
      if (event.key === 'ArrowLeft') setSelectedImage((value) => (value + images.length - 1) % images.length);
      if (event.key === 'ArrowRight') setSelectedImage((value) => (value + 1) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, images.length]);

  const changeImage = (direction: number) => setSelectedImage((value) => (value + images.length + direction) % images.length);
  const toggleDetail = (detail: string) => setOpenDetail((value) => value === detail ? null : detail);

  return (
    <main className="product-page">
      <div className="container">
        <div className="breadcrumbs"><Link href="/" data-testid="link-breadcrumb-home">BAW</Link><ChevronLeft size={14} /><span>בית וארגון</span><ChevronLeft size={14} /><strong>פח אשפה חכם AROMA</strong></div>
        <div className="product-layout">
          <motion.div className="gallery" initial={reduceMotion ? false : { opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: 'easeOut' }}>
            <div className="thumbs" aria-label="תמונות מוצר">
              {images.map((image, index) => (
                <button className={`thumb ${selectedImage === index ? 'active' : ''}`} type="button" key={image} onMouseEnter={() => setSelectedImage(index)} onClick={() => setSelectedImage(index)} data-testid={`button-gallery-thumbnail-${index}`}>
                  <img src={image} alt={imageAlt[index]} />
                </button>
              ))}
            </div>
            <div className="main-photo" onClick={() => setLightboxOpen(true)} role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setLightboxOpen(true); }} aria-label="פתיחת תמונת מוצר במסך מלא">
              <span className="gallery-label">{packageDetails.discount}</span>
              <AnimatePresence mode="wait">
                <motion.img key={images[selectedImage]} src={images[selectedImage]} alt={imageAlt[selectedImage]} data-testid="img-product-main" initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.015 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reduceMotion ? 0.01 : 0.32 }} />
              </AnimatePresence>
              <div className="gallery-arrows">
                <button type="button" onClick={(event) => { event.stopPropagation(); changeImage(-1); }} aria-label="תמונה קודמת" data-testid="button-gallery-previous"><ChevronLeft size={18} /></button>
                <button type="button" onClick={(event) => { event.stopPropagation(); changeImage(1); }} aria-label="תמונה הבאה" data-testid="button-gallery-next"><ChevronRight size={18} /></button>
              </div>
            </div>
          </motion.div>
          <motion.div className="product-info" ref={purchaseRef} initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0.01 : 0.55, ease: 'easeOut', delay: reduceMotion ? 0 : 0.08 }}>
            <span className="product-category">בית וארגון · AROMA</span>
            <h1>פח אשפה חכם עם דלת כפולה דגם AROMA</h1>
            <p className="product-subtitle">פח אשפה חכם עם דלת כפולה בצבע לבן</p>
            <div className="rating"><span className="stars" aria-label="4.8 מתוך 5 כוכבים">★★★★★</span><span className="review-link">2,700 ביקורות</span><span>·</span><span>מומלץ ע״י לקוחות</span></div>
            <div className="product-price-box">
              <div className="package-options" aria-label="בחירת נפח">
                {(['7', '9'] as const).map((size) => <button type="button" className={selectedPackage === size ? 'selected' : ''} key={size} onClick={() => setSelectedPackage(size)}>{size} ליטרים <small>{size === '7' ? '₪100' : '₪130'}</small></button>)}
              </div>
              <div className="selected-package-label">{packageDetails.label}</div>
              <div className="product-price"><span className="now">₪{packageDetails.price}</span><span className="old">₪{packageDetails.oldPrice}</span><span className="discount">{packageDetails.discount}</span></div>
              <div className="product-price-note">מחיר מיוחד לזמן מוגבל · כולל משלוח עד הדלת</div>
            </div>
            <div className="product-status"><span className="stock-dot" /> במלאי · נותרו 35 יחידות <span className="status-divider" /> משלוח עד הבית</div>
            <div className="feature-list">
              <div><Sparkles size={17} />מטבח נטול ריחות</div>
              <div><Check size={17} />עיצוב מודרני ונקי</div>
              <div><Check size={17} />חיסכון בשקיות</div>
              <div><Check size={17} />קל לניקוי</div>
            </div>
            <motion.div className="product-promotion" initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -8% 0px' }} transition={{ duration: reduceMotion ? 0.01 : 0.45, ease: 'easeOut' }}>
              <span className="promotion-eyebrow">BAW SPECIAL OFFER</span>
              <div className="promotion-visual" aria-label="Buy four, pay for three">
                <div><small>BUY</small><strong>4</strong></div>
                <span className="promotion-arrow">→</span>
                <div><small>PAY FOR</small><strong>3</strong></div>
              </div>
              <div className="promotion-copy"><strong>CHEAPEST ITEM FREE</strong><span>Choose any 4 selected items and the lowest-priced item is free.</span><Link href="/#popular" className="promotion-link">Shop the offer <ChevronLeft size={14} /></Link></div>
            </motion.div>
            <div className="buy-row">
              <div className="quantity" aria-label="בחירת כמות">
                <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="הפחתת כמות" data-testid="button-quantity-decrease"><Minus size={17} /></button>
                <span data-testid="text-quantity">{quantity}</span>
                <button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="הגדלת כמות" data-testid="button-quantity-increase"><Plus size={17} /></button>
              </div>
              <motion.button className={`btn-primary ${added ? 'is-added' : ''}`} type="button" whileTap={{ scale: 0.98 }} onClick={addProduct} data-testid="button-add-to-cart"><AnimatePresence mode="wait" initial={false}><motion.span key={added ? 'added' : 'add'} className="purchase-action-content" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.18 }}>{added ? <Check size={18} /> : <ShoppingBag size={18} />}{added ? 'נוסף לסל' : `להוסיף לסל · ₪${quantity * packageDetails.price}`}</motion.span></AnimatePresence></motion.button>
            </div>
            <motion.button className="favorite-action" type="button" whileTap={{ scale: 0.98 }} onClick={() => { setFavorite((value) => !value); showToast(favorite ? 'הוסר מהמועדפים' : 'נשמר במועדפים'); }} data-testid="button-product-favorite">
              <motion.span className="favorite-icon-wrap" animate={{ scale: favorite ? [1, 1.14, 1] : 1 }} transition={{ duration: 0.22 }}><Heart size={18} fill={favorite ? 'currentColor' : 'none'} /></motion.span>{favorite ? 'נשמר במועדפים' : 'לשמור למועדפים'}
              <AnimatePresence>{favorite && <motion.span className="favorite-pulse favorite-pulse-product" initial={{ opacity: .65, scale: .5 }} animate={{ opacity: 0, scale: 1.7 }} exit={{ opacity: 0 }} transition={{ duration: .35 }} />}</AnimatePresence>
            </motion.button>
            <div className="purchase-reassurance">
              <span><Check size={15} /> מזומן / אשראי / ביט</span>
              <span><Truck size={15} /> 3–7 ימי עסקים</span>
              <span><RotateCcw size={15} /> 14 יום להחליט</span>
            </div>
          </motion.div>
        </div>
      </div>
      <Reveal className="detail-band">
        <div className="container detail-band-grid">
          <div>
            <span className="eyebrow">פרטים שעושים הבדל</span>
            <h2>בלי ריחות.<br />יותר סדר.</h2>
            <p>פח אשפה חכם עם דלת כפולה בצבע לבן דגם AROMA. טכנולוגיית הדלת הכפולה עוזרת לשמור על מטבח נטול ריחות, עם עיצוב מודרני, חיסכון בשקיות ומשטחים חלקים שקל לנקות.</p>
            <div className="specs"><div className="spec"><small>מבנה</small><b>דלת כפולה</b></div><div className="spec"><small>צבע</small><b>לבן</b></div><div className="spec"><small>נפח</small><b>7 או 9 ליטרים</b></div><div className="spec"><small>ניקוי</small><b>משטחים חלקים</b></div></div>
            <div className="detail-accordions">
              {[['description', 'תיאור המוצר', 'פח אשפה חכם עם דלת כפולה בצבע לבן דגם AROMA.'], ['features', 'למה לבחור ב־TwinSeal', 'מטבח נטול ריחות, אסתטיקה מודרנית, חיסכון בשקיות ומשטחים חלקים שקל לנקות.'], ['shipping', 'משלוחים והחזרות', 'משלוח עד הבית בתוך 3–7 ימי עסקים והחזרה בתוך 14 יום.']].map(([key, title, copy]) => (
                <div className={`detail-accordion ${openDetail === key ? 'is-open' : ''}`} key={key}>
                  <button type="button" onClick={() => toggleDetail(key)}><span>{title}</span><ChevronDown size={17} /></button>
                  <AnimatePresence initial={false}>{openDetail === key && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: reduceMotion ? 0.01 : 0.25 }}>{copy}</motion.p>}</AnimatePresence>
                </div>
              ))}
            </div>
          </div>
          <motion.div className="detail-photo" initial={reduceMotion ? false : { opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '0px 0px -10% 0px' }} transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: 'easeOut' }}><img src={images[1]} alt="מבט מקרוב על פח האשפה החכם AROMA" /></motion.div>
        </div>
      </Reveal>
      <AnimatePresence>
        {!purchaseVisible && <motion.div className="sticky-purchase" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }} transition={{ duration: reduceMotion ? 0.01 : 0.25 }}>
          <span className="sticky-product-name">פח אשפה חכם AROMA · {selectedPackage} ליטרים</span><strong>₪{quantity * packageDetails.price}</strong><div className="sticky-quantity">{quantity}</div><button className="btn-primary" type="button" onClick={addProduct}>{added ? 'נוסף לסל ✓' : 'להוסיף לסל'}</button>
        </motion.div>}
      </AnimatePresence>
      <AnimatePresence>
        {lightboxOpen && <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="תמונות מוצר" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightboxOpen(false)}>
          <button className="lightbox-close" type="button" onClick={() => setLightboxOpen(false)} aria-label="סגירת תמונה"><X size={22} /></button>
          <button className="lightbox-arrow lightbox-prev" type="button" onClick={(event) => { event.stopPropagation(); changeImage(-1); }} aria-label="תמונה קודמת"><ChevronLeft size={24} /></button>
          <motion.img src={images[selectedImage]} alt={imageAlt[selectedImage]} initial={{ scale: 0.97 }} animate={{ scale: 1 }} transition={{ duration: reduceMotion ? 0.01 : 0.3 }} onClick={(event) => event.stopPropagation()} />
          <div className="lightbox-thumbs" onClick={(event) => event.stopPropagation()}>
            {images.map((image, index) => <button type="button" className={selectedImage === index ? 'active' : ''} key={image} onClick={() => setSelectedImage(index)} aria-label={`תמונה ${index + 1}`}><img src={image} alt="" /></button>)}
          </div>
          <button className="lightbox-arrow lightbox-next" type="button" onClick={(event) => { event.stopPropagation(); changeImage(1); }} aria-label="תמונה הבאה"><ChevronRight size={24} /></button>
        </motion.div>}
      </AnimatePresence>
    </main>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Storefront() {
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState<ToastMessage>(null);
  const [location] = useLocation();

  const showToast = (message: string) => setToast(message);
  const addToCart = (quantity: number) => setCartCount((current) => current + quantity);

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    return () => {
      if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'auto';
    };
  }, [location]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const favoriteFeedback = () => showToast('אפשר לשמור מוצרים למועדפים');

  return (
    <>
      <Header cartCount={cartCount} search={search} setSearch={setSearch} onFavorite={favoriteFeedback} />
      <RoutedErrorBoundary>
        <Switch>
          <Route path="/">
            <HomePage onAddToCart={addToCart} search={search} showToast={showToast} />
          </Route>
          <Route path="/product">
            <ProductPage onAddToCart={addToCart} showToast={showToast} />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </RoutedErrorBoundary>
      <Footer />
      {toast && <div className="toast" role="status" data-testid="status-toast"><Check size={17} />{toast}</div>}
    </>
  );
}

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(onComplete, reduceMotion ? 120 : 1650);
    return () => window.clearTimeout(timer);
  }, [onComplete, reduceMotion]);

  return (
    <motion.div
      className="splash-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.42, ease: 'easeInOut' }}
      role="status"
      aria-label="BAW נטען"
    >
      <motion.div
        className="splash-brand"
        initial={reduceMotion ? false : { opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        <span className="splash-mark" aria-hidden="true" />
        <span className="splash-word" aria-label="BAW">
          {['B', 'A', 'W'].map((letter, index) => (
            <motion.span
              className="splash-letter"
              key={letter}
              initial={reduceMotion ? false : { opacity: 0, y: 16, scale: .88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.38, delay: reduceMotion ? 0 : index * 0.18, ease: 'easeOut' }}
            >
              {letter}
            </motion.span>
          ))}
        </span>
      </motion.div>
      <motion.span
        className="splash-dot"
        initial={{ opacity: 0, scale: .7 }}
        animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: [0.55, 1, 0.55], scale: [0.85, 1, 0.85] }}
        transition={reduceMotion ? { duration: 0.01 } : { duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <div dir="rtl" className="site-shell"><Storefront /></div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
      <AnimatePresence>{showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}</AnimatePresence>
    </QueryClientProvider>
  );
}

export default App;