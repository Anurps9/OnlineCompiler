import RequireAuth from "./Components/RequireAuth"
import Home from "./Components/Home"
import Signup from "./Components/Signup"
import Prompt from "./Components/Prompt"

export const routes = [
    {
        path: '/',
        element: <RequireAuth><Home /></RequireAuth>
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/prompt',
        element: <Prompt />
    }
]