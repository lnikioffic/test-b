import React, { useState, useEffect } from "react";

// Типы для TypeScript
type CryptoData = {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
};

type Holding = {
  crypto: string;
  symbol: string;
  amount: number;
  avgPrice: number;
};

type Theme = {
  name: string;
  bg: string;
  cardBg: string;
  text: string;
  textMuted: string;
  border: string;
  accent: string;
  hover: string;
};

type Themes = {
  [key: string]: Theme;
};

type ButtonProps = {
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
  onClick?: () => void;
  theme?: Theme;
};

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

type HeaderProps = {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
  theme: Theme;
  currentPage: string;
  onPageChange: (page: string) => void;
};

// Хук для работы с localStorage
const useStoredState = <T,>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

// Mock crypto data
const mockCryptoData: CryptoData[] = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    price: 67234.15,
    change24h: 2.45,
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 3456.78,
    change24h: -1.23,
  },
  {
    id: "cardano",
    symbol: "ADA",
    name: "Cardano",
    price: 0.4523,
    change24h: 5.67,
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    price: 145.32,
    change24h: 3.21,
  },
  {
    id: "polygon",
    symbol: "MATIC",
    name: "Polygon",
    price: 0.8765,
    change24h: -2.15,
  },
];

// Theme configuration
const themes: Themes = {
  stone: {
    name: "Stone",
    bg: "bg-stone-950",
    cardBg: "bg-stone-900",
    text: "text-stone-100",
    textMuted: "text-stone-400",
    border: "border-stone-800",
    accent: "bg-stone-700",
    hover: "hover:bg-stone-800",
  },
  zinc: {
    name: "Zinc",
    bg: "bg-zinc-950",
    cardBg: "bg-zinc-900",
    text: "text-zinc-100",
    textMuted: "text-zinc-400",
    border: "border-zinc-800",
    accent: "bg-zinc-700",
    hover: "hover:bg-zinc-800",
  },
  purple: {
    name: "Purple",
    bg: "bg-purple-950",
    cardBg: "bg-purple-900",
    text: "text-purple-100",
    textMuted: "text-purple-300",
    border: "border-purple-800",
    accent: "bg-purple-700",
    hover: "hover:bg-purple-800",
  },
};

// Components
const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: `bg-zinc-600 text-white hover:bg-zinc-700`,
    outline: `border border-zinc-600 text-zinc-300 hover:bg-zinc-800`,
    ghost: `text-zinc-300 hover:bg-zinc-800`,
  };

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`rounded-lg border shadow-sm ${className}`}>{children}</div>
);

const CardHeader: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

const CardTitle: React.FC<CardProps> = ({ children, className = "" }) => (
  <h3
    className={`text-lg font-semibold leading-none tracking-tight ${className}`}
  >
    {children}
  </h3>
);

const CardContent: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

// Header Component
const Header: React.FC<HeaderProps> = ({
  isAuthenticated,
  onLogin,
  onLogout,
  theme,
  currentPage,
  onPageChange,
}) => {
  return (
    <header className={`${theme.cardBg} ${theme.border} border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className={`text-lg md:text-xl font-bold ${theme.text}`}>
              CryptoTracker
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-4 md:space-x-8">
            <button
              onClick={() => onPageChange("market")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === "market"
                  ? `${theme.accent} ${theme.text}`
                  : `${theme.textMuted} ${theme.hover}`
              }`}
            >
              Курсы
            </button>
            <button
              onClick={() => onPageChange("portfolio")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === "portfolio"
                  ? `${theme.accent} ${theme.text}`
                  : `${theme.textMuted} ${theme.hover}`
              }`}
            >
              Портфель
            </button>
          </nav>

          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-1 md:space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs md:text-sm px-2 md:px-3"
                >
                  Профиль
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onLogout}
                  className="text-xs md:text-sm px-2 md:px-3"
                >
                  Выйти
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                onClick={onLogin}
                className="text-xs md:text-sm px-2 md:px-3"
              >
                Войти
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Market Overview Page
const MarketOverview: React.FC<{ theme: Theme }> = ({ theme }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className={`text-3xl font-bold ${theme.text}`}>Обзор рынка</h2>
        <p className={`${theme.textMuted} mt-2`}>
          Актуальные курсы криптовалют
        </p>
      </div>

      <div className="grid gap-4">
        {mockCryptoData.map((crypto) => (
          <Card key={crypto.id} className={`${theme.cardBg} ${theme.border}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-full ${theme.accent} flex items-center justify-center`}
                  >
                    <span className={`text-lg font-bold ${theme.text}`}>
                      {crypto.symbol.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${theme.text}`}>
                      {crypto.name}
                    </h3>
                    <p className={`text-sm ${theme.textMuted}`}>
                      {crypto.symbol}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`text-xl font-bold ${theme.text}`}>
                    ${crypto.price.toLocaleString()}
                  </p>
                  <p
                    className={`text-sm ${
                      crypto.change24h >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {crypto.change24h >= 0 ? "+" : ""}
                    {crypto.change24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Portfolio Page
const Portfolio: React.FC<{ theme: Theme; isAuthenticated: boolean }> = ({
  theme,
  isAuthenticated,
}) => {
  const [holdings, setHoldings] = useStoredState<Holding[]>(
    "portfolio-holdings",
    [
      { crypto: "bitcoin", symbol: "BTC", amount: 0.5, avgPrice: 65000 },
      { crypto: "ethereum", symbol: "ETH", amount: 2.3, avgPrice: 3200 },
    ]
  );

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <h2 className={`text-2xl font-bold ${theme.text} mb-4`}>
          Требуется авторизация
        </h2>
        <p className={`${theme.textMuted} mb-6`}>
          Войдите в систему, чтобы просмотреть свой портфель
        </p>
      </div>
    );
  }

  const calculatePortfolioValue = (): number => {
    return holdings.reduce((total, holding) => {
      const currentPrice =
        mockCryptoData.find((c) => c.id === holding.crypto)?.price || 0;
      return total + holding.amount * currentPrice;
    }, 0);
  };

  const calculateTotalInvested = (): number => {
    return holdings.reduce((total, holding) => {
      return total + holding.amount * holding.avgPrice;
    }, 0);
  };

  const totalValue = calculatePortfolioValue();
  const totalInvested = calculateTotalInvested();
  const totalPnL = totalValue - totalInvested;
  const totalPnLPercent =
    totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className={`text-3xl font-bold ${theme.text}`}>Мой портфель</h2>
        <p className={`${theme.textMuted} mt-2`}>
          Обзор ваших криптовалютных активов
        </p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={`${theme.cardBg} ${theme.border}`}>
          <CardHeader>
            <CardTitle className={theme.text}>Общая стоимость</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${theme.text}`}>
              ${totalValue.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className={`${theme.cardBg} ${theme.border}`}>
          <CardHeader>
            <CardTitle className={theme.text}>Инвестировано</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${theme.text}`}>
              ${totalInvested.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className={`${theme.cardBg} ${theme.border}`}>
          <CardHeader>
            <CardTitle className={theme.text}>P&L</CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className={`text-2xl font-bold ${
                totalPnL >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {totalPnL >= 0 ? "+" : ""}${totalPnL.toLocaleString()}
            </p>
            <p
              className={`text-sm ${
                totalPnL >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {totalPnL >= 0 ? "+" : ""}
              {totalPnLPercent.toFixed(2)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Holdings */}
      <Card className={`${theme.cardBg} ${theme.border}`}>
        <CardHeader>
          <CardTitle className={theme.text}>Активы</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {holdings.map((holding, index) => {
              const currentPrice =
                mockCryptoData.find((c) => c.id === holding.crypto)?.price || 0;
              const currentValue = holding.amount * currentPrice;
              const investedValue = holding.amount * holding.avgPrice;
              const pnl = currentValue - investedValue;
              const pnlPercent =
                investedValue > 0 ? (pnl / investedValue) * 100 : 0;

              return (
                <div key={index} className={`p-4 rounded-lg ${theme.accent}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className={`font-semibold ${theme.text}`}>
                        {holding.symbol}
                      </h4>
                      <p className={`text-sm ${theme.textMuted}`}>
                        {holding.amount} {holding.symbol}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${theme.text}`}>
                        ${currentValue.toLocaleString()}
                      </p>
                      <p
                        className={`text-sm ${
                          pnl >= 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {pnl >= 0 ? "+" : ""}${pnl.toFixed(2)} (
                        {pnl >= 0 ? "+" : ""}
                        {pnlPercent.toFixed(2)}%)
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useStoredState<boolean>(
    "auth-status",
    false
  );
  const [currentTheme, setCurrentTheme] = useStoredState<Theme>(
    "app-theme",
    themes.zinc
  );
  const [currentPage, setCurrentPage] = useStoredState<string>(
    "current-page",
    "market"
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "portfolio":
        return (
          <Portfolio theme={currentTheme} isAuthenticated={isAuthenticated} />
        );
      case "market":
      default:
        return <MarketOverview theme={currentTheme} />;
    }
  };

  return (
    <div className={`min-h-screen ${currentTheme.bg}`}>
      <Header
        isAuthenticated={isAuthenticated}
        onLogin={handleLogin}
        onLogout={handleLogout}
        theme={currentTheme}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentPage()}
      </main>
    </div>
  );
};

export default App;
