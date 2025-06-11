import { Button } from "@mui/material";
import Link from "next/link";
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1b1f3b] text-white px-6 py-12 text-center">
      <h1 className="text-7xl font-extrabold mb-4 animate-bounce">404</h1>

      <p className="text-xl mb-6 max-w-md">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>

      <Button
        LinkComponent={Link}
        href="/"
        variant="contained"
        color="primary"
      >
        Go back home
      </Button>
    </div>
  )
}

