import { useEffect, useState } from 'react';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import {
  ArrowLeft,
  Banknote,
  Baby,
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Dumbbell,
  Heart,
  Home as HomeIcon,
  LockKeyhole,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  Utensils,
} from 'lucide-react';
import { type ReactNode } from 'react';
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

const categories = [
  { title: 'בית וארגון', caption: 'דברים שעושים סדר', className: 'cat-home', icon: HomeIcon },
  { title: 'מטבח', caption: 'קטן, חכם, שימושי', className: 'cat-kitchen', icon: Utensils },
  { title: 'ספורט ובריאות', caption: 'להרגיש טוב בבית', className: 'cat-health', icon: Dumbbell },
  { title: 'ילדים ותינוקות', caption: 'בחירות שעובדות', className: 'cat-kids', icon: Baby },
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
  return (
    <>
      <div className="announcement" data-testid="banner-promotion">
        <span><strong>4 ב־3</strong> על פריטים נבחרים לבית</span>
        <span aria-hidden="true">•</span>
        <span>משלוח עד הדלת ותשלום במזומן</span>
      </div>
      <header className="header">
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
            <Link href="/#why-baw" className="nav-link" data-testid="link-why">למה BAW</Link>
          </nav>
          <div className="header-actions">
            <button className="icon-btn" type="button" onClick={onFavorite} aria-label="מועדפים" data-testid="button-favorites">
              <Heart size={19} />
            </button>
            <Link href="/product" className="icon-btn" aria-label="סל קניות" data-testid="link-cart">
              <ShoppingBag size={19} />
              {cartCount > 0 && <span className="cart-count" data-testid="text-cart-count">{cartCount}</span>}
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
          <div className="container" style={{ paddingBottom: 14, display: 'flex', gap: 18, fontWeight: 700, color: '#45605b' }}>
            <Link href="/#categories" data-testid="link-mobile-categories">קטגוריות</Link>
            <Link href="/#discover" data-testid="link-mobile-discover">מומלצים</Link>
            <Link href="/#why-baw" data-testid="link-mobile-why">למה BAW</Link>
          </div>
        )}
      </header>
    </>
  );
}

function TrustStrip() {
  const items = [
    { icon: Truck, title: 'משלוח עד הבית', caption: 'מגיע תוך 3–7 ימי עסקים' },
    { icon: Banknote, title: 'תשלום במזומן', caption: 'משלמים רק כשהחבילה אצלכם' },
    { icon: RotateCcw, title: '14 יום להחליט', caption: 'החזרה פשוטה ונוחה' },
    { icon: ShieldCheck, title: 'קנייה בטוחה', caption: 'אנחנו כאן לכל שאלה' },
  ];
  return (
    <section className="trust-strip" id="why-baw">
      <div className="container trust-grid">
        {items.map(({ icon: Icon, title, caption }) => (
          <div className="trust-item" key={title} data-testid={`trust-item-${title}`}>
            <Icon size={24} strokeWidth={1.8} />
            <div><strong>{title}</strong><span>{caption}</span></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand"><span className="brand-mark" aria-hidden="true" /><span>BAW</span></div>
            <p>מוצאים דברים טובים לבית, לגוף וליום־יום — במחירים שעושים חשק לגלות עוד.</p>
          </div>
          <div><h4>לגלות ב־BAW</h4><Link href="/#categories">כל הקטגוריות</Link><Link href="/#discover">הנבחרים שלנו</Link><Link href="/product">מוצר השבוע</Link></div>
          <div><h4>שירות לקוחות</h4><a href="mailto:hello@baw.co.il">כתבו לנו</a><a href="#why-baw">משלוחים והחזרות</a><a href="#why-baw">שאלות נפוצות</a></div>
          <div><h4>הבטחות קטנות</h4><p style={{ margin: 0 }}>מחירים נגישים. בחירות חכמות. שירות בגובה העיניים.</p></div>
        </div>
        <div className="footer-bottom"><span>© 2024 BAW Marketplace</span><span>נבנה כדי שתמצאו את מה שלא ידעתם שחיפשתם</span></div>
      </div>
    </footer>
  );
}

function HomePage({ onAddToCart, search, showToast }: { onAddToCart: (quantity: number) => void; search: string; showToast: (message: string) => void }) {
  const hasSearch = search.trim().length > 0;
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy fade-in">
            <span className="eyebrow">דברים טובים. מחירים מפתיעים.</span>
            <h1>הבית שלך,<br />רק יותר <em>חכם.</em></h1>
            <p>{hasSearch ? `מחפשים ב־BAW: “${search}”` : 'מרקטפלייס ישראלי של מוצרים שעושים הבדל קטן, כל יום. פחות לחפש. יותר למצוא.'}</p>
            <div className="hero-ctas">
              <a href="#discover" className="btn-primary" data-testid="button-hero-discover">לגלות את הנבחרים <ArrowLeft size={17} /></a>
              <a href="#categories" className="btn-ghost" data-testid="button-hero-categories">לכל הקטגוריות</a>
            </div>
            <div className="hero-notes">
              <span className="hero-note"><Check size={16} /> מחירים הוגנים באמת</span>
              <span className="hero-note"><Check size={16} /> משלוח עד הדלת</span>
            </div>
          </div>
          <div className="hero-visual fade-in delay-2">
            <div className="hero-visual-card">
              <img src={aromaHero} alt="פח אשפה חכם בצבע שמנת" />
            </div>
            <div className="hero-sticker">מוצאים<br />דברים<br />טובים</div>
            <div className="hero-float">
              <small>הנבחר של השבוע</small>
              <b>פח AROMA חכם</b><strong>67%-</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="categories">
        <div className="container">
          <div className="section-heading">
            <div><span className="eyebrow">יש כאן הרבה יותר</span><h2>לפי מה שמתאים לכם</h2></div>
            <p>קטגוריות שנבחרו לחיים האמיתיים</p>
          </div>
          <div className="category-grid">
            {categories.map(({ title, caption, className, icon: Icon }, index) => (
              <a href="#discover" className={`category-card ${className} fade-in delay-${index + 1}`} key={title} data-testid={`link-category-${index}`}>
                <Icon className="category-icon" size={28} strokeWidth={1.7} />
                <h3>{title}</h3><span>{caption}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="spotlight" id="discover">
        <div className="container">
          <div className="section-heading">
            <div><span className="eyebrow">הנבחר של BAW</span><h2>חכם בבית, נעים בעין</h2></div>
            <Link href="/product" className="text-link" data-testid="link-featured-product">לפרטי המוצר <ArrowLeft size={16} /></Link>
          </div>
          <div className="product-feature-grid">
            <div className="feature-photo"><img src={aromaHome} alt="פח אשפה חכם במטבח ביתי" /><span className="feature-photo-label">2,700 ביקורות</span></div>
            <div className="feature-content">
              <span className="eyebrow">AROMA · מוצר שעושה סדר</span>
              <h3>פח אשפה חכם<br />עם דלת כפולה</h3>
              <p>נפתח לבד כשצריך, נשאר סגור כשלא. עיצוב נקי, פעולה שקטה ונפח שמתאים בדיוק לשגרה של בית אמיתי.</p>
              <div className="price-line"><span className="price-now">₪200</span><span className="price-old">₪600</span><span className="discount">67% הנחה</span></div>
              <div><Link href="/product" className="btn-primary" data-testid="button-featured-details">רוצה לראות מקרוב <ArrowLeft size={17} /></Link><button className="btn-ghost" style={{ marginInlineStart: 9, color: '#f8efe0', borderColor: 'rgba(248,239,224,.35)' }} onClick={() => { onAddToCart(1); showToast('המוצר נוסף לסל'); }} data-testid="button-featured-add">הוספה לסל</button></div>
              <div className="benefits">
                <div className="benefit"><PackageCheck size={19} /><strong>נשלח מהר</strong><span>3–7 ימים</span></div>
                <div className="benefit"><CreditCard size={19} /><strong>משלמים בדרך</strong><span>גם במזומן</span></div>
                <div className="benefit"><LockKeyhole size={19} /><strong>קנייה שקטה</strong><span>14 יום להחזיר</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className="editorial">
        <div className="container">
          <div className="section-heading">
            <div><span className="eyebrow">הסיבה לחזור</span><h2>הפתעות עם שימושיות</h2></div>
            <p>לא עוד גלילה אינסופית. רק דברים ששווה לעצור בשבילם.</p>
          </div>
          <div className="editorial-grid">
            <div className="editorial-card editorial-one"><span className="circle" /><span className="line-art" /><h3>קטן במחיר,<br />גדול ביום־יום</h3><p>פריטים מתחת ל־₪100 שמסדרים פינה, משדרגים הרגל או פשוט משמחים.</p></div>
            <div className="editorial-card editorial-two"><span className="circle" /><span className="line-art" /><h3>4 ב־3, כי תמיד<br />יש עוד מקום בבית</h3><p>בוחרים ארבעה פריטים נבחרים ומשלמים על שלושה. זה הזמן לצרף את מה ששמרתם לאחר כך.</p></div>
          </div>
        </div>
      </section>
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
  const images = [aromaHero, aromaDetail, aromaHome];
  const imageAlt = ['פח אשפה חכם AROMA, מבט קדמי', 'מבט מקרוב על הדלת הכפולה', 'פח AROMA במטבח'];

  const addProduct = () => {
    onAddToCart(quantity);
    showToast(quantity > 1 ? `${quantity} פריטים נוספו לסל` : 'המוצר נוסף לסל');
  };

  return (
    <main className="product-page">
      <div className="container">
        <div className="breadcrumbs"><Link href="/" data-testid="link-breadcrumb-home">BAW</Link><ChevronLeft size={14} /><span>בית וארגון</span><ChevronLeft size={14} /><strong>פח אשפה חכם AROMA</strong></div>
        <div className="product-layout">
          <div className="gallery">
            <div className="thumbs" aria-label="תמונות מוצר">
              {images.map((image, index) => (
                <button className={`thumb ${selectedImage === index ? 'active' : ''}`} type="button" key={image} onClick={() => setSelectedImage(index)} data-testid={`button-gallery-thumbnail-${index}`}>
                  <img src={image} alt={imageAlt[index]} />
                </button>
              ))}
            </div>
            <div className="main-photo">
              <span className="gallery-label">67% הנחה</span>
              <img src={images[selectedImage]} alt={imageAlt[selectedImage]} data-testid="img-product-main" />
              <div className="gallery-arrows">
                <button type="button" onClick={() => setSelectedImage((selectedImage + images.length - 1) % images.length)} aria-label="תמונה קודמת" data-testid="button-gallery-previous"><ChevronLeft size={18} /></button>
                <button type="button" onClick={() => setSelectedImage((selectedImage + 1) % images.length)} aria-label="תמונה הבאה" data-testid="button-gallery-next"><ChevronRight size={18} /></button>
              </div>
            </div>
          </div>
          <div className="product-info">
            <span className="product-category">בית וארגון · AROMA</span>
            <h1>פח אשפה חכם<br />עם דלת כפולה</h1>
            <div className="rating"><span className="stars" aria-label="5 מתוך 5 כוכבים">★★★★★</span><span className="review-link">2,700 ביקורות</span><span>·</span><span>נמכר ואהוב</span></div>
            <div className="product-price-box">
              <div className="product-price"><span className="now">₪200</span><span className="old">₪600</span><span className="discount">67% הנחה</span></div>
              <div className="product-price-note">מחיר מיוחד לזמן מוגבל · כולל משלוח עד הדלת</div>
            </div>
            <div className="feature-list">
              <div><Sparkles size={17} />פתיחה אוטומטית ללא מגע</div>
              <div><Check size={17} />דלת כפולה ושקטה</div>
              <div><Check size={17} />עיצוב נקי בצבע שמנת</div>
              <div><Check size={17} />נפח נדיב לבית</div>
            </div>
            <div className="buy-row">
              <div className="quantity" aria-label="בחירת כמות">
                <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="הפחתת כמות" data-testid="button-quantity-decrease"><Minus size={17} /></button>
                <span data-testid="text-quantity">{quantity}</span>
                <button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="הגדלת כמות" data-testid="button-quantity-increase"><Plus size={17} /></button>
              </div>
              <button className="btn-primary" type="button" onClick={addProduct} data-testid="button-add-to-cart"><ShoppingBag size={18} />להוסיף לסל · ₪{quantity * 200}</button>
            </div>
            <button className="favorite-action" type="button" onClick={() => { setFavorite((value) => !value); showToast(favorite ? 'הוסר מהמועדפים' : 'נשמר במועדפים'); }} data-testid="button-product-favorite">
              <Heart size={18} fill={favorite ? 'currentColor' : 'none'} />{favorite ? 'נשמר במועדפים' : 'לשמור למועדפים'}
            </button>
            <div className="product-assurance">
              <div className="assurance"><Truck size={19} /><div><small>הגעה משוערת</small><strong>3–7 ימי עסקים</strong></div></div>
              <div className="assurance"><Banknote size={19} /><div><small>אמצעי תשלום</small><strong>גם במזומן בדלת</strong></div></div>
            </div>
          </div>
        </div>
      </div>
      <section className="detail-band">
        <div className="container detail-band-grid">
          <div>
            <span className="eyebrow">פרטים שעושים הבדל</span>
            <h2>פחות מגע.<br />יותר סדר.</h2>
            <p>AROMA הוא בדיוק מסוג המוצרים שלא שמים לב כמה הם חסרו — עד שהם נכנסים הביתה. חיישן תנועה פותח את המכסה בלי ידיים, הדלת הכפולה שומרת על מראה מסודר, והעיצוב משתלב במקום לבלוט.</p>
            <div className="specs"><div className="spec"><small>סוג</small><b>פח חכם עם חיישן</b></div><div className="spec"><small>מבנה</small><b>דלת כפולה</b></div><div className="spec"><small>צבע</small><b>שמנת מט</b></div><div className="spec"><small>מתאים ל־</small><b>מטבח, משרד וחדר רחצה</b></div></div>
          </div>
          <div className="detail-photo"><img src={aromaDetail} alt="תקריב של מכסה הפח החכם" /></div>
        </div>
      </section>
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

  const showToast = (message: string) => setToast(message);
  const addToCart = (quantity: number) => setCartCount((current) => current + quantity);

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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <div dir="rtl" className="site-shell"><Storefront /></div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;