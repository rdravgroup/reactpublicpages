import React, { useState, useEffect } from "react";
import "./ReactStudyPage.css";

/**
 * ReactStudyPage
 * Single-file study guide component covering 20 React topics.
 * Drop this file and the CSS into src/components and import in App.
 */

const topics = [
  {
    id: "intro",
    title: "Introduction to React",
    content: (
      <>
        <p>React is a JavaScript library for building user interfaces. It encourages building UI as small, reusable components.</p>
        <pre>{`function App() {
  return <h1>Hello React!</h1>;
}`}</pre>
      </>
    ),
  },
  {
    id: "jsx",
    title: "JSX (JavaScript XML)",
    content: (
      <>
        <p>JSX is a syntax extension that looks like HTML inside JavaScript. It compiles to React.createElement calls.</p>
        <pre>{`const element = <h2>Welcome to JSX!</h2>;`}</pre>
      </>
    ),
  },
  {
    id: "components",
    title: "Components",
    content: (
      <>
        <p>Components are reusable UI pieces. Use functional components for most cases; class components are legacy but still supported.</p>
        <pre>{`function Welcome() {
  return <p>Hello User!</p>;
}`}</pre>
      </>
    ),
  },
  {
    id: "props",
    title: "Props (Properties)",
    content: (
      <>
        <p><strong>What props are:</strong> Props are read-only inputs passed from parent to child components.</p>
        <p><strong>Key point:</strong> Child components should not mutate props.</p>
        <pre>{`function Greeting(props) {
  return <h3>Hello, {props.name}</h3>;
}

function App() {
  return <Greeting name="Ram" />;
}`}</pre>
        <p>In the example, <code>name="Ram"</code> is a prop. The child reads it via <code>props.name</code>.</p>
      </>
    ),
  },
  {
    id: "state",
    title: "State",
    content: (
      <>
        <p><strong>What state is:</strong> State is internal data a component manages and can change over time.</p>
        <pre>{`import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}`}</pre>
        <p>Use state for values that change and affect rendering.</p>
      </>
    ),
  },
  {
    id: "events",
    title: "Event Handling",
    content: (
      <>
        <p>Attach handlers to elements using camelCase props like <code>onClick</code>, <code>onChange</code>.</p>
        <pre>{`function Button() {
  function handleClick() {
    alert("Clicked");
  }
  return <button onClick={handleClick}>Click</button>;
}`}</pre>
      </>
    ),
  },
  {
    id: "conditional",
    title: "Conditional Rendering",
    content: (
      <>
        <p>Render different UI based on conditions using ternary, &&, or separate functions.</p>
        <pre>{`function UserStatus({ isLoggedIn }) {
  return isLoggedIn ? <p>Welcome back!</p> : <p>Please log in.</p>;
}`}</pre>
      </>
    ),
  },
  {
    id: "lists",
    title: "Lists & Keys",
    content: (
      <>
        <p>Render arrays with <code>map()</code>. Provide a stable <code>key</code> for each item.</p>
        <pre>{`const items = ["Apple", "Banana", "Cherry"];
function List() {
  return (
    <ul>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}`}</pre>
        <p>Prefer unique IDs for keys; index is acceptable for static lists.</p>
      </>
    ),
  },
  {
    id: "forms",
    title: "Forms & Controlled Components",
    content: (
      <>
        <p>Controlled inputs keep the value in state and update via <code>onChange</code>.</p>
        <pre>{`import { useState } from "react";

function Form() {
  const [name, setName] = useState("");
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <p>You typed: {name}</p>
    </form>
  );
}`}</pre>
      </>
    ),
  },
  {
    id: "lifecycle",
    title: "Lifecycle Methods (Class Components)",
    content: (
      <>
        <p>Class components have lifecycle methods like <code>componentDidMount</code>, <code>componentDidUpdate</code>, <code>componentWillUnmount</code>.</p>
        <pre>{`class MyComponent extends React.Component {
  componentDidMount() {
    // runs once after mount
  }
  componentWillUnmount() {
    // cleanup
  }
  render() {
    return <div>Hello</div>;
  }
}`}</pre>
      </>
    ),
  },
  {
    id: "hooks",
    title: "Hooks (useState, useEffect)",
    content: (
      <>
        <p>Hooks let functional components use state and lifecycle features.</p>
        <pre>{`import { useState, useEffect } from "react";

function Timer() {
  const [sec, setSec] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSec(s => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return <p>Seconds: {sec}</p>;
}`}</pre>
        <p><strong>useEffect</strong> runs after render; return a cleanup function for unmounting.</p>
      </>
    ),
  },
  {
    id: "context",
    title: "Context API",
    content: (
      <>
        <p>Context shares values across many components without prop drilling.</p>
        <pre>{`const ThemeContext = React.createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}`}</pre>
        <p>Consume with <code>useContext(ThemeContext)</code> or <code>ThemeContext.Consumer</code>.</p>
      </>
    ),
  },
  {
    id: "router",
    title: "React Router",
    content: (
      <>
        <p>React Router manages client-side navigation. Use <code>BrowserRouter</code>, <code>Routes</code>, and <code>Link</code>.</p>
        <pre>{`import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav><Link to="/">Home</Link> | <Link to="/about">About</Link></nav>
      <Routes>
        <Route path="/" element={<h2>Home</h2>} />
        <Route path="/about" element={<h2>About</h2>} />
      </Routes>
    </BrowserRouter>
  );
}`}</pre>
      </>
    ),
  },
  {
    id: "performance",
    title: "Performance Optimization",
    content: (
      <>
        <p>Use <code>React.memo</code> to memoize components, <code>useCallback</code> and <code>useMemo</code> to memoize functions and values.</p>
        <pre>{`const Child = React.memo(function Child({ value }) {
  return <p>{value}</p>;
});`}</pre>
        <p>Profile before optimizing; premature optimization can add complexity.</p>
      </>
    ),
  },
  {
    id: "custom-hooks",
    title: "Custom Hooks",
    content: (
      <>
        <p>Custom hooks extract reusable logic. They are regular functions that use hooks.</p>
        <pre>{`import { useState } from "react";

function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const inc = () => setCount(c => c + 1);
  return { count, inc };
}`}</pre>
      </>
    ),
  },
  {
    id: "error-boundaries",
    title: "Error Boundaries",
    content: (
      <>
        <p>Error boundaries catch render errors in child components (class components only).</p>
        <pre>{`class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error(error, info); }
  render() {
    return this.state.hasError ? <h3>Something went wrong.</h3> : this.props.children;
  }
}`}</pre>
      </>
    ),
  },
  {
    id: "api",
    title: "React with APIs",
    content: (
      <>
        <p>Fetch data in effects and handle loading and errors.</p>
        <pre>{`import { useState, useEffect } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    let mounted = true;
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(r => r.json())
      .then(data => { if (mounted) setPosts(data.slice(0,5)); });
    return () => { mounted = false; };
  }, []);
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}`}</pre>
      </>
    ),
  },
  {
    id: "patterns",
    title: "Advanced Patterns",
    content: (
      <>
        <p>Patterns like HOCs, render props, and compound components help reuse behavior.</p>
        <pre>{`// HOC example
function withLogger(Wrapped) {
  return function(props) {
    console.log("props", props);
    return <Wrapped {...props} />;
  };
}`}</pre>
      </>
    ),
  },
  {
    id: "typescript",
    title: "React with TypeScript",
    content: (
      <>
        <p>TypeScript adds static types. Use interfaces or types for props and state.</p>
        <pre>{`type GreetingProps = { name: string };
function Greeting({ name }: GreetingProps) {
  return <h3>Hello, {name}</h3>;
}`}</pre>
      </>
    ),
  },
  {
    id: "best-practices",
    title: "Best Practices & Project Structure",
    content: (
      <>
        <p>Keep components small, name clearly, separate concerns, use hooks for logic, and write tests. Organize files by feature or domain for larger apps.</p>
        <ul>
          <li>Prefer functional components and hooks</li>
          <li>Keep state minimal and lift it up when needed</li>
          <li>Use ESLint and Prettier</li>
          <li>Write small, focused components</li>
        </ul>
      </>
    ),
  },
];

export default function ReactStudyPage() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    function onHashChange() {
      setActive(window.location.hash.replace("#", "") || null);
    }
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <div className="study-container">
      <header className="study-header">
        <h1>React Study Guide</h1>
        <p className="intro-text">
          A concise guide covering core to advanced React topics. Click a topic to jump to it.
        </p>
      </header>

      <nav className="toc">
        <h3>Topics</h3>
        <ul>
          {topics.map(t => (
            <li key={t.id}>
              <a
                href={`#${t.id}`}
                className={active === t.id ? "active" : ""}
                onClick={() => setActive(t.id)}
              >
                {t.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main className="content">
        {topics.map(t => (
          <section id={t.id} key={t.id} className="topic">
            <h2>{t.title}</h2>
            <div className="topic-body">{t.content}</div>
            <div className="back-top"><a href="#top">Back to top</a></div>
          </section>
        ))}
      </main>
    </div>
  );
}
