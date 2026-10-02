import { BookOpen, LogIn, LogOut, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authocontext";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="border-b border-emerald-950/10 bg-[#f5f7f4]/90 px-5 py-4 backdrop-blur md:px-10">
            <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6">
                <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-emerald-950">
                    <BookOpen size={22} strokeWidth={1.8} />
                    SkillConnect
                </Link>
                <div className="flex items-center gap-3 text-sm font-semibold text-emerald-950/70 md:gap-6">
                    <Link className="transition-colors hover:text-orange-700" to="/courses">Courses</Link>
                    <Link className="transition-colors hover:text-orange-700" to="/my-courses">My Courses</Link>
                    {user?.role === "admin" && <Link className="transition-colors hover:text-orange-700" to="/course-management">Manage</Link>}
                {user ? (
                    <div className="flex items-center gap-3 border-l border-emerald-950/10 pl-3">
                        <span className="hidden items-center gap-1.5 text-emerald-950/60 sm:flex">
                            <UserRound size={16} />
                            {user.name}
                        </span>
                        <button className="inline-flex items-center gap-1.5 rounded-full border border-emerald-950/15 px-3 py-1.5 text-emerald-950 transition hover:border-orange-700 hover:text-orange-700" onClick={logout}>
                            <LogOut size={15} />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                ) : (
                    <button className="inline-flex items-center gap-1.5 rounded-full bg-orange-700 px-4 py-2 text-white transition hover:bg-orange-800" onClick={() => navigate("/login")}>
                        <LogIn size={16} />
                        Login
                    </button>
                )}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;