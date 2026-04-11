import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import AINews from "./pages/AINews";
import AICareers from "./pages/AICareers";
import Tools from "./pages/Tools";
import Research from "./pages/Research";
import Domains from "./pages/Domains";
import Community from "./pages/Community";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/ai-news" component={AINews} />
      <Route path="/ai-careers" component={AICareers} />
      <Route path="/tools" component={Tools} />
      <Route path="/research" component={Research} />
      <Route path="/domains" component={Domains} />
      <Route path="/community" component={Community} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
