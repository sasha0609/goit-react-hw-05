import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <h2>
        Something went wrong! Try again from <Link to="/"> home page</Link>
      </h2>
    </div>
  );
}
