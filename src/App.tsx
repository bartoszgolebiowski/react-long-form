import { createBrowserRouter, RouterProvider, NavLink } from "react-router-dom";
import Naive from "./vanilla/Naive";
import { Profiler } from "react";
import Memo from "./vanilla/Memo";
import UseMemo from "./vanilla/UseMemo";
import Debounce from "./vanilla/Debounce";
import Steps from "./vanilla/Steps";

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          Vanilla
          <ul>
            <li>
              <NavLink to="vanilla/naive">Naive</NavLink>
            </li>
            <li>
              <NavLink to="vanilla/memo">React.memo</NavLink>
            </li>
            <li>
              <NavLink to="vanilla/useMemo">useMemo</NavLink>
            </li>
            <li>
              <NavLink to="vanilla/debounce">Debounce</NavLink>
            </li>
            <li>
              <NavLink to="vanilla/wizard">Wizard</NavLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
  },
  {
    path: "/vanilla/naive",
    element: (
      <Profiler id="naive" onRender={callbackToProcessRenderInfo}>
        <Naive />
      </Profiler>
    ),
  },
  {
    path: "/vanilla/memo",
    element: (
      <Profiler id="memo" onRender={callbackToProcessRenderInfo}>
        <Memo />
      </Profiler>
    ),
  },
  {
    path: "/vanilla/useMemo",
    element: (
      <Profiler id="useMemo" onRender={callbackToProcessRenderInfo}>
        <UseMemo />
      </Profiler>
    ),
  },
  {
    path: "/vanilla/debounce",
    element: (
      <Profiler id="debounce" onRender={callbackToProcessRenderInfo}>
        <Debounce />
      </Profiler>
    ),
  },
  {
    path: "/vanilla/wizard",
    element: (
      <Profiler id="wizard" onRender={callbackToProcessRenderInfo}>
        <Steps />
      </Profiler>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

declare global {
  interface Window {
    profiling: {
      [key: string]: {
        mount: {
          actualDuration: number;
          baseDuration: number;
        }[];
        update: {
          actualDuration: number;
          baseDuration: number;
        }[];
      };
    };
  }
}

function callbackToProcessRenderInfo(
  id: string,
  phase: "mount" | "update",
  actualDuration: number,
  baseDuration: number
) {
  window.profiling = window.profiling || {};
  window.profiling = window.profiling || {};
  window.profiling[id] = window.profiling[id] || {};
  window.profiling[id][phase] = window.profiling[id][phase] || [];
  window.profiling[id][phase].push({
    actualDuration,
    baseDuration,
  });
}

export default App;
