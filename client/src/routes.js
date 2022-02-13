import RequireAuth from "./Components/RequireAuth"
import Home from "./Components/Home"
import Prompt from "./Components/Prompt"
import {NewProblem, Problem, ProblemList} from "./Components/Problem"
import {NewRoom} from "./Components/Room"
import Dashboard from "./Components/Dashboard"

export const routes = [
    {
        path: '/prompt',
        element: <Prompt />
    },
    {
        path: '/dashboard',
        element: <Dashboard />
    },
    {
        path: '/problem/new',
        element: <NewProblem />
    },
    {
        path: '/room/new',
        element: <NewRoom />
    },
    {
        path: '/problem',
        element: <ProblemList />
    },
    {
        path: '/problem/:id',
        element: <Problem />
    }
]