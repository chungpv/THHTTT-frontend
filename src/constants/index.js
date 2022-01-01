import DashboardPage from "../containers/DashboardPage/DashboardPage"
import Login from "../containers/Login/Login"
import Signup from "../containers/Signup/Signup"
import Home from "../containers/Home/Home"

const ENDPOINT = "http://localhost:8000/api/v1"
const ACCESS_TOKEN_NAME = "x_access_token"
const EXPIRES = 1000
const STATUS_CODE = {
    SUCCESS: 200,
    CREATED: 201,
    UPDATED: 202
}

const USER_ROUTES = [
    {
        path: "/",
        name: "Home",
        exact: true,
        component: Home
    },
    {
        path: "/auth/signup",
        name: "Sign up",
        exact: true,
        component: Signup
    },
    {
        path: "/auth/login",
        name: "Log in",
        exact: true,
        component: Login
    }
]

const ADMIN_ROUTES = [
    {
        path: "/dashboard",
        name: "dashboard",
        exact: true,
        component: DashboardPage
    }
]

export {
    ENDPOINT,
    ACCESS_TOKEN_NAME,
    EXPIRES,
    STATUS_CODE,
    USER_ROUTES,
    ADMIN_ROUTES
}
